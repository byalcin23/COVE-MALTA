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

  // Ref for typewriter prompt smooth right-scroll
  const promptOverlayRef = useRef(null);

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

  // Smoothly auto-scroll prompt overlay to the right as text types out!
  useEffect(() => {
    if (promptOverlayRef.current) {
      promptOverlayRef.current.scrollLeft = promptOverlayRef.current.scrollWidth;
    }
  }, [typedLength]);

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
      "High-Speed Fiber & Luxury Finishes"
    );

    const priceCap = textLower.includes('1500') ? "€1,500/mo" : "€2,500/mo";

    return [
      // Phase 0 Thoughts (Status: NEURAL AI CORE)
      {
        title: `Analyzing natural query structure...`,
        detail: `Extracting key requirement: ${detectedAmenities}...`,
        weight: 1400
      },
      {
        title: `Parsing intent tokens & spatial preferences...`,
        detail: `Analyzing embedding vectors against Malta rental index...`,
        weight: 2100
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
        weight: 2400
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
        weight: 2700
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
        weight: 2200
      },
      {
        title: `Finalizing tailored residence preview dossier...`,
        detail: `Preparing direct landlord inquiry channels...`,
        weight: 1400
      }
    ];
  };

  const handleSearchClick = () => {
    const finalSearchText = searchQuery || NATURAL_SEARCH_PROMPTS[promptIndex].fullText;

    if (asyncTimerRef.current) clearTimeout(asyncTimerRef.current);

    const stream = generateGranularThoughtStream(finalSearchText, attachedChips);
    setDynamicThoughtStream(stream);

    setIsCanvasExpanded(true);
    setCanvasStep(0);
    setCanvasProgress(0);
    setThoughtIndex(0);
    setIsCanvasDone(false);

    // Smoothly scroll to top of search box so AI Canvas is in view
    const searchElem = document.querySelector('.search-container');
    if (searchElem) searchElem.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Step 0: NEURAL AI CORE (0ms)
    // Step 1: MALTA GEO-PIN (~2400ms)
    const t1 = setTimeout(() => setCanvasStep(1), 2400);

    // Step 2: VERIFIED LEASE SHIELD (~5200ms)
    const t2 = setTimeout(() => setCanvasStep(2), 5200);

    // Step 3: BESPOKE VILLA RESIDENCE (~7600ms)
    const t3 = setTimeout(() => setCanvasStep(3), 7600);

    // Schedule Asynchronous Micro-Thoughts with Organic Variable Delay
    let currentThoughtIdx = 0;

    const scheduleNextThought = () => {
      if (currentThoughtIdx >= stream.length - 1) return;

      const currentThoughtObj = stream[currentThoughtIdx];
      // Organic jitter (+/- 250ms) to feel natural
      const jitter = (Math.random() - 0.5) * 500;
      const delay = Math.max(1000, currentThoughtObj.weight + jitter);

      asyncTimerRef.current = setTimeout(() => {
        currentThoughtIdx++;
        setThoughtIndex(currentThoughtIdx);
        scheduleNextThought();
      }, delay);
    };

    scheduleNextThought();

    // Progress Bar Animation (0% to 100% over 8.8s)
    const startTime = Date.now();
    const totalDuration = 8800;
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      setCanvasProgress(pct);

      if (pct >= 100) {
        clearInterval(progressInterval);
        setIsCanvasDone(true);
        if (onExecuteSearch) onExecuteSearch(finalSearchText);
      }
    }, 50);
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
                ref={promptOverlayRef}
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
                  onClick={() => removeAttachedChip(chip.query)}
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* In-Page Expandable AI Reasoning Canvas */}
        {isCanvasExpanded && (
          <div className="inpage-canvas-body">
            <div className="inpage-progress-bar">
              <div
                className="inpage-progress-fill"
                style={{ width: `${canvasProgress}%` }}
              />
            </div>

            <div className="morph-reasoning-canvas-slot">
              <MorphingLab stepIndex={canvasStep} />

              <div className="slot-machine-reel-container">
                <div key={`thought-reel-${thoughtIndex}`} className="slot-reel-item-box">
                  <span className="slot-reasoning-title">{activeThought.title}</span>
                  <span className="slot-reasoning-detail">{activeThought.detail}</span>
                </div>
              </div>
            </div>

            {/* Results Teaser Row when calculation finishes */}
            {isCanvasDone && (
              <div className="inpage-results-box">
                <div className="inpage-results-header">
                  <div className="inpage-results-badge">
                    <Sparkles size={16} color="#E5C158" />
                    <span>2 Match Teasers Ready</span>
                  </div>
                  <button className="inpage-refine-btn" onClick={() => setIsCanvasExpanded(false)}>
                    <RefreshCw size={12} /> Refine Prompt
                  </button>
                </div>

                <div className="inpage-teaser-grid">
                  {topMockMatches.map((match) => (
                    <div
                      key={`teaser-${match.id}`}
                      className="inpage-teaser-card"
                      onClick={scrollToResults}
                    >
                      <img src={match.image} alt={match.title} />
                      <div className="teaser-card-info">
                        <div className="teaser-match-tag">✨ {match.matchPercentage}</div>
                        <div className="teaser-title">{match.title}</div>
                        <div className="teaser-sub-note">{match.matchReason}</div>
                        <div className="teaser-price">{match.currency}{match.price.toLocaleString()}/mo</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="inpage-explore-btn" onClick={scrollToResults}>
                  <span>Explore Full Verified Listings Below</span>
                  <ArrowDown size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Salt & Flour Filter Chips */}
      <div className="quick-chips-container">
        {QUICK_FILTERS.map((filter) => {
          const isActive = attachedChips.some((c) => c.query === filter.query);
          return (
            <button
              key={filter.query}
              className={`chip-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleChipClick(filter)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
