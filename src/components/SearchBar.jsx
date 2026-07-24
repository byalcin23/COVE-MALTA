import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, X, ArrowDown, RefreshCw } from 'lucide-react';
import { NATURAL_SEARCH_PROMPTS, QUICK_FILTERS } from '../data/prompts';
import { LISTINGS } from '../data/listings';
import MorphingLab from './MorphingLab';

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
  
  // Asynchronous Organic AI Thought Engine State
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [dynamicThoughtStream, setDynamicThoughtStream] = useState([]);
  const asyncTimerRef = useRef(null);

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

  // Generate Organic Micro-Thoughts with Individual Thinking Weight / Duration
  const generateGranularThoughtStream = (promptText, chips) => {
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

    let priceCap = "under €2,500/month";
    if (textLower.includes('1500') || textLower.includes('1,500')) priceCap = "under €1,500/month";

    return [
      // Phase 0 Thoughts (Status: NEURAL AI CORE)
      {
        title: `Parsing semantic tokens for ${detectedLocation}...`,
        detail: `Tokenizing natural language parameters & spatial intent...`,
        weight: 1200 // Quick initial tokenization
      },
      {
        title: `Extracting key requirement: ${detectedAmenities}...`,
        detail: `Analyzing embedding vectors against Malta rental index...`,
        weight: 2100 // Longer vector embedding calculation
      },

      // Phase 1 Thoughts (Status: MALTA GEO-PIN)
      {
        title: `Geo-fencing target boundary -> ${detectedLocation}`,
        detail: `Calculating 3D GIS spatial overlay & walking radiuses...`,
        weight: 1600
      },
      {
        title: `Applying financial constraint cap: ${priceCap}`,
        detail: `Filtering 120+ verified properties for target price tier...`,
        weight: 2400 // Deep budget matrix scan
      },
      {
        title: `Evaluating proximity to coast & promenade...`,
        detail: `Checking noise levels & sunlight orientation data...`,
        weight: 1500
      },

      // Phase 2 Thoughts (Status: VERIFIED LEASE SHIELD)
      {
        title: `Verifying 100% landlord escrow contracts...`,
        detail: `Cross-referencing Land Registry & deposit guarantees...`,
        weight: 2700 // Deep security & escrow audit (takes longer!)
      },
      {
        title: `Checking Instant Booking & verified availability...`,
        detail: `Validating zero-commission landlord compliance...`,
        weight: 1800
      },

      // Phase 3 Thoughts (Status: BESPOKE VILLA RESIDENCE)
      {
        title: `Computing 98.6% affinity index for top matches...`,
        detail: `Synthesizing interactive 3D virtual tour dossiers...`,
        weight: 2200 // 3D synthesis calculation
      },
      {
        title: `Finalizing tailored residence preview dossier...`,
        detail: `Preparing direct landlord inquiry channels...`,
        weight: 1400
      }
    ];
  };

  const handleSearchClick = () => {
    const queryToUse = searchQuery || NATURAL_SEARCH_PROMPTS[promptIndex].fullText;
    if (!searchQuery) {
      setSearchQuery(queryToUse);
    }

    const thoughtStream = generateGranularThoughtStream(queryToUse, attachedChips);
    setDynamicThoughtStream(thoughtStream);

    setIsCanvasExpanded(true);
    setIsCanvasDone(false);
    setCanvasStep(0);
    setThoughtIndex(0);
    setCanvasProgress(0);

    // Smooth overall progress bar tick (~11.5s total time for rich inspection)
    const pTimer = setInterval(() => {
      setCanvasProgress((prev) => {
        if (prev >= 100) {
          clearInterval(pTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 115);

    // Status Step Progression (~2.8s intervals)
    setTimeout(() => setCanvasStep(1), 2800);
    setTimeout(() => setCanvasStep(2), 5600);
    setTimeout(() => setCanvasStep(3), 8400);

    // ORGANIC VARIABLE DELAY AI THOUGHT REEL ENGINE!
    // Each thought stays on screen for its unique organic weight + random jitter (1200ms - 2700ms)
    let currentThoughtIdx = 0;
    const scheduleNextThought = () => {
      if (currentThoughtIdx < thoughtStream.length - 1) {
        const currentItem = thoughtStream[currentThoughtIdx];
        // Organic delay: base weight + random jitter (+/- 250ms) for authentic AI processing feel!
        const organicJitter = Math.floor(Math.random() * 500) - 250;
        const finalDelay = Math.max(1200, currentItem.weight + organicJitter);

        asyncTimerRef.current = setTimeout(() => {
          currentThoughtIdx += 1;
          setThoughtIndex(currentThoughtIdx);
          scheduleNextThought();
        }, finalDelay);
      }
    };

    scheduleNextThought();

    // Finish Search cleanly after ~11.5 seconds
    setTimeout(() => {
      if (asyncTimerRef.current) clearTimeout(asyncTimerRef.current);
      setIsCanvasDone(true);
      onExecuteSearch(queryToUse);
    }, 11500);
  };

  const scrollToResults = () => {
    const resultsElem = document.getElementById('results-section');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const activeThought = dynamicThoughtStream[thoughtIndex] || {
    title: "Thinking...",
    detail: "Processing search query..."
  };

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

        {/* REASONING CANVAS: ORGANIC VARIABLE DELAY AI THOUGHT REEL */}
        {isCanvasExpanded && (
          <div className="inpage-canvas-body">
            <div className="inpage-progress-bar">
              <div className="inpage-progress-fill" style={{ width: `${canvasProgress}%` }}></div>
            </div>

            {!isCanvasDone ? (
              <div className="morph-reasoning-canvas-slot">
                {/* Clean Status Title (No 01/02 numbers) */}
                <MorphingLab stepIndex={canvasStep} />

                {/* ORGANIC VARIABLE DELAY AI THOUGHT SLOT MACHINE REEL */}
                <div className="slot-machine-reel-container">
                  <div key={thoughtIndex} className="slot-reel-item-box">
                    <span className="slot-reasoning-title">{activeThought.title}</span>
                    <span className="slot-reasoning-detail">{activeThought.detail}</span>
                  </div>
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
