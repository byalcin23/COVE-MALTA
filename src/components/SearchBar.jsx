import React, { useState, useEffect } from 'react';
import { Search, Sparkles, X, Wand2, ShieldCheck, ArrowDown, RefreshCw } from 'lucide-react';
import { NATURAL_SEARCH_PROMPTS, QUICK_FILTERS } from '../data/prompts';
import { LISTINGS } from '../data/listings';
import MorphingThreadIcon from './MorphingThreadIcon';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  attachedChips = [],
  setAttachedChips,
  onExecuteSearch,
  isCanvasExpanded,
  setIsCanvasExpanded
}) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // In-Page Canvas Expansion internal states
  const [canvasStep, setCanvasStep] = useState(0);
  const [canvasProgress, setCanvasProgress] = useState(0);
  const [isCanvasDone, setIsCanvasDone] = useState(false);
  const [dynamicReasoningTrace, setDynamicReasoningTrace] = useState([]);

  // Character-by-character typewriter loop
  useEffect(() => {
    if (searchQuery || attachedChips.length > 0 || isCanvasExpanded) return;

    let timer;
    const currentPromptObj = NATURAL_SEARCH_PROMPTS[promptIndex];
    const fullText = currentPromptObj.prefix + currentPromptObj.magicHighlight + currentPromptObj.suffix;

    if (isTyping) {
      if (typedLength < fullText.length) {
        timer = setTimeout(() => {
          setTypedLength((prev) => prev + 1);
        }, 32);
      } else {
        timer = setTimeout(() => setIsTyping(false), 2400);
      }
    } else {
      if (typedLength > 0) {
        timer = setTimeout(() => {
          setTypedLength((prev) => prev - 1);
        }, 16);
      } else {
        setPromptIndex((prev) => (prev + 1) % NATURAL_SEARCH_PROMPTS.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [typedLength, isTyping, promptIndex, searchQuery, attachedChips, isCanvasExpanded]);

  // Click quick filter chip
  const handleChipClick = (filter) => {
    const exists = attachedChips.some((c) => c.query === filter.query);
    if (exists) {
      setAttachedChips(attachedChips.filter((c) => c.query !== filter.query));
    } else {
      setAttachedChips([...attachedChips, filter]);
    }
  };

  const removeAttachedChip = (query) => {
    setAttachedChips(attachedChips.filter((c) => c.query !== query));
  };

  // Helper to render prefix, magicHighlight, and suffix
  const renderMagicOverlay = () => {
    const currentObj = NATURAL_SEARCH_PROMPTS[promptIndex];
    const prefixLen = currentObj.prefix.length;
    const highlightLen = currentObj.magicHighlight.length;

    let visiblePrefix = '';
    let visibleHighlight = '';
    let visibleSuffix = '';

    if (typedLength <= prefixLen) {
      visiblePrefix = currentObj.prefix.slice(0, typedLength);
    } else if (typedLength <= prefixLen + highlightLen) {
      visiblePrefix = currentObj.prefix;
      visibleHighlight = currentObj.magicHighlight.slice(0, typedLength - prefixLen);
    } else {
      visiblePrefix = currentObj.prefix;
      visibleHighlight = currentObj.magicHighlight;
      visibleSuffix = currentObj.suffix.slice(0, typedLength - (prefixLen + highlightLen));
    }

    return (
      <>
        <span>{visiblePrefix}</span>
        {visibleHighlight && (
          <span className="magic-rainbow-text">
            {visibleHighlight}
          </span>
        )}
        <span>{visibleSuffix}</span>
      </>
    );
  };

  // Generate customized, dynamic LLM reasoning steps tailored to the user's exact prompt & attached chips!
  const generateDynamicReasoning = (promptText, chips) => {
    const textLower = (promptText || '').toLowerCase();

    let detectedLocation = "Malta Coastline";
    if (textLower.includes('sliema')) detectedLocation = "Sliema Waterfront";
    else if (textLower.includes('st. julian') || textLower.includes('julian')) detectedLocation = "St. Julian's Marina";
    else if (textLower.includes('valletta')) detectedLocation = "Valletta Historic Core";
    else if (textLower.includes('gozo')) detectedLocation = "Gozo Countryside & Citadel";

    const chipLabels = chips.map(c => c.label).join(' + ');
    const detectedAmenities = chipLabels || (
      textLower.includes('garage') ? "Private Garage & Parking" :
      textLower.includes('pool') ? "Swimming Pool & Terrace" :
      textLower.includes('sea') ? "Seafront Mediterranean View" :
      "Luxury Interior & High-Speed Internet"
    );

    let priceConstraint = "standard luxury bracket";
    if (textLower.includes('1500') || textLower.includes('1,500')) priceConstraint = "under €1,500/month cap";
    else if (textLower.includes('2500') || textLower.includes('2,500')) priceConstraint = "under €2,500/month cap";

    return [
      {
        stepTitle: `Parsing intent: Geo-fencing Target Area -> [${detectedLocation}]`,
        detailText: `Extracting semantic tokens: ${promptText ? `"${promptText.slice(0, 45)}..."` : 'Default curated parameters'}`
      },
      {
        stepTitle: `Filtering 120+ registries for mandatory features -> [${detectedAmenities}]`,
        detailText: `Evaluating budget constraint: ${priceConstraint} with verified landlord accreditation.`
      },
      {
        stepTitle: `Cross-referencing live availability in ${detectedLocation} registry...`,
        detailText: `Computing 98.6% affinity match score & calculating direct landlord contact index.`
      },
      {
        stepTitle: `Synthesizing final bespoke residence lineup for your prompt...`,
        detailText: `Finalizing 3D interactive perspectives and map pin coordinates.`
      }
    ];
  };

  const handleSearchClick = () => {
    const queryToUse = searchQuery || NATURAL_SEARCH_PROMPTS[promptIndex].fullText;
    if (!searchQuery) {
      setSearchQuery(queryToUse);
    }

    const customTrace = generateDynamicReasoning(queryToUse, attachedChips);
    setDynamicReasoningTrace(customTrace);

    setIsCanvasExpanded(true);
    setIsCanvasDone(false);
    setCanvasStep(0);
    setCanvasProgress(0);

    const pTimer = setInterval(() => {
      setCanvasProgress((prev) => {
        if (prev >= 100) {
          clearInterval(pTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    setTimeout(() => setCanvasStep(1), 1100);
    setTimeout(() => setCanvasStep(2), 2200);
    setTimeout(() => setCanvasStep(3), 3300);
    
    setTimeout(() => {
      setIsCanvasDone(true);
      onExecuteSearch(queryToUse);
    }, 4200);
  };

  const scrollToResults = () => {
    const resultsElem = document.getElementById('results-section');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2 Top Teaser Mock Match Properties
  const topMockMatches = [
    {
      ...LISTINGS[0],
      matchPercentage: "98.6% Match",
      matchReason: "Matches Sliema seafront, private garage & luxury terrace"
    },
    {
      ...LISTINGS[1],
      matchPercentage: "96.4% Match",
      matchReason: "Matches St. Julian's pool & short walk to office"
    }
  ];

  return (
    <div className="search-container">
      <div className={`search-box ${isCanvasExpanded ? 'canvas-expanded' : ''}`}>
        <div className="search-box-top-row">
          <Search className="search-icon" size={22} />
          
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchClick();
              }}
              placeholder=""
            />

            {!searchQuery && attachedChips.length === 0 && (
              <div 
                className="prompt-overlay" 
                onClick={() => setSearchQuery(NATURAL_SEARCH_PROMPTS[promptIndex].fullText)} 
                style={{ cursor: 'pointer' }}
              >
                {renderMagicOverlay()}
                <span className="typing-cursor"></span>
              </div>
            )}
          </div>

          {(searchQuery || attachedChips.length > 0) && (
            <button 
              className="nav-btn" 
              style={{ padding: '6px 10px', marginRight: '8px', border: 'none', background: 'transparent' }} 
              onClick={() => { setSearchQuery(''); setAttachedChips([]); setIsCanvasExpanded(false); }}
              title="Clear all"
            >
              <X size={16} />
            </button>
          )}

          <button className="search-action-btn" onClick={handleSearchClick}>
            <Sparkles size={16} />
            <span>Search</span>
          </button>
        </div>

        {/* Attached Sparkle Tags Row */}
        {attachedChips.length > 0 && (
          <div className="attached-tags-bottom-row">
            {attachedChips.map((chip, idx) => (
              <div key={idx} className="attached-chip-tag">
                <Sparkles size={12} color="#E5C158" />
                <span>{chip.label}</span>
                <button
                  className="tag-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAttachedChip(chip.query);
                  }}
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CONTINUOUS MORPHING THREAD REASONING CANVAS */}
        {isCanvasExpanded && (
          <div className="inpage-canvas-body">
            <div className="inpage-progress-bar">
              <div className="inpage-progress-fill" style={{ width: `${canvasProgress}%` }}></div>
            </div>

            {!isCanvasDone ? (
              <div className="morph-reasoning-canvas">
                {/* Continuous String Morphing Icon Animation */}
                <MorphingThreadIcon stepIndex={canvasStep} />

                {/* Live Reasoning Trace Text */}
                <div className="inpage-reasoning-list">
                  {dynamicReasoningTrace.map((step, idx) => {
                    const isActive = canvasStep >= idx;

                    return (
                      <div key={idx} className={`inpage-step ${isActive ? 'active' : ''}`}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{step.stepTitle}</span>
                          {isActive && (
                            <span style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                              {step.detailText}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="inpage-results-box">
                <div className="inpage-results-header">
                  <div className="inpage-results-badge">
                    <Sparkles size={14} color="#E5C158" />
                    <span>COVE AI Matched Top 2 Prime Residences</span>
                  </div>
                  <button className="inpage-refine-btn" onClick={() => setIsCanvasExpanded(false)}>
                    <RefreshCw size={12} />
                    <span>Refine Prompt</span>
                  </button>
                </div>

                {/* 2 Top Teaser Match Cards Inside Canvas */}
                <div className="inpage-teaser-grid">
                  {topMockMatches.map((item) => (
                    <div key={item.id} className="inpage-teaser-card" onClick={scrollToResults}>
                      <img src={item.image} alt={item.title} />
                      <div className="teaser-card-info">
                        <div className="teaser-match-tag">
                          <Sparkles size={10} color="#E5C158" />
                          <span>{item.matchPercentage}</span>
                        </div>
                        <h4 className="teaser-title">{item.title}</h4>
                        <div className="teaser-sub-note">{item.matchReason}</div>
                        <div className="teaser-price">{item.currency}{item.price.toLocaleString()}/m</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explore All Matches CTA */}
                <button className="inpage-explore-btn" onClick={scrollToResults}>
                  <span>Explore All COVE Matches Below ↓</span>
                  <ArrowDown size={15} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Filter Chips */}
      <div className="quick-chips-container">
        {QUICK_FILTERS.map((chip, idx) => {
          const isAttached = attachedChips.some((c) => c.query === chip.query);
          return (
            <button
              key={idx}
              className={`chip-btn ${isAttached ? 'active' : ''}`}
              onClick={() => handleChipClick(chip)}
            >
              {isAttached ? `✓ ${chip.label}` : chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
