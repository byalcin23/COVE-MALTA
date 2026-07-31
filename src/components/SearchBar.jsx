import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, X, Loader2 } from 'lucide-react';
import { NATURAL_SEARCH_PROMPTS, QUICK_FILTERS } from '../data/prompts';
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
  const [isSearching, setIsSearching] = useState(false);

  // In-Page AI Reasoning internal states
  const [canvasStep, setCanvasStep] = useState(0);
  const [canvasProgress, setCanvasProgress] = useState(0);
  const [thoughtIndex, setThoughtIndex] = useState(0);

  // Ref for typewriter prompt smooth right-scroll
  const promptOverlayRef = useRef(null);

  // Organic Thought Stream Reel Items
  const thoughtStream = [
    { title: "Analyzing natural language prompt query...", detail: "Extracting location, budget, and amenity constraints..." },
    { title: "Geo-fencing target boundary -> Sliema & Valletta", detail: "Calculating 3D spatial sea view radiuses..." },
    { title: "Cross-referencing verified escrow lease contracts...", detail: "Validating direct landlord identity & deposit security..." },
    { title: "COVE AI Synthesis Complete!", detail: "Curating verified penthouse & villa matches..." }
  ];

  // Character-by-character typewriter loop
  useEffect(() => {
    if (searchQuery || attachedChips.length > 0 || isSearching) return;

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
  }, [typedLength, isTyping, promptIndex, searchQuery, attachedChips, isSearching]);

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

  const handleSearchClick = () => {
    setIsSearching(true);
    setCanvasStep(0);
    setCanvasProgress(0);
    setThoughtIndex(0);
    if (setIsCanvasExpanded) setIsCanvasExpanded(true);

    const startTime = performance.now();
    const duration = 3000;

    const animateProgress = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Organic AI Fluid Curve (Surge -> Micro Pause -> Wave -> Asymptotic slowdown -> 100%)
      let p;
      if (t < 0.25) {
        p = (t / 0.25) * 38;
      } else if (t < 0.45) {
        p = 38 + ((t - 0.25) / 0.20) * 8;
      } else if (t < 0.75) {
        p = 46 + ((t - 0.45) / 0.30) * 38;
      } else if (t < 0.95) {
        p = 84 + ((t - 0.75) / 0.20) * 11;
      } else {
        p = 95 + ((t - 0.95) / 0.05) * 5;
      }

      setCanvasProgress(Math.min(Math.round(p), 100));

      // Organic Morphing & Thought Reel Sync
      if (p < 28) {
        setCanvasStep(0);
        setThoughtIndex(0);
      } else if (p < 58) {
        setCanvasStep(1);
        setThoughtIndex(1);
      } else if (p < 86) {
        setCanvasStep(2);
        setThoughtIndex(2);
      } else {
        setCanvasStep(3);
        setThoughtIndex(3);
      }

      if (t < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        setIsSearching(false);
        if (setIsCanvasExpanded) setIsCanvasExpanded(false);
        if (onExecuteSearch) onExecuteSearch();
        const resultsElem = document.getElementById('results-section');
        if (resultsElem) {
          resultsElem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    requestAnimationFrame(animateProgress);
  };

  // Magic rainbow text highlight renderer
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

  return (
    <div className="search-container">
      {/* PURE LUXURY AI SEARCHBAR PILL */}
      <div className="search-bar">
        <div className="search-box-top-row">
          <Search size={20} className="search-icon" />

          <div className="input-relative-box">
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
              style={{ padding: '6px 10px', marginRight: '4px', border: 'none', background: 'transparent' }}
              onClick={() => { setSearchQuery(''); setAttachedChips([]); }}
              title="Clear all"
            >
              <X size={16} />
            </button>
          )}

          <button className="search-action-btn" onClick={handleSearchClick} disabled={isSearching}>
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            <span>{isSearching ? 'Synthesizing...' : 'Search'}</span>
          </button>
        </div>
      </div>

      {/* ATTACHED SPARKLE TAGS ROW (PLACED OUTSIDE & BELOW MAIN SEARCH PILL BOX!) */}
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

      {/* RESTORED MORPHING AI THINKING STREAM (STANDALONE FLOATING HUD BELOW SEARCHBAR) */}
      {isSearching && (
        <div className="floating-ai-hud">
          <div className="hud-progress-bar">
            <div className="hud-progress-fill" style={{ width: `${canvasProgress}%` }} />
          </div>

          <div className="hud-content-row">
            <div className="hud-icon-stage">
              <MorphingLab stepIndex={canvasStep} />
            </div>

            <div className="hud-thought-reel">
              <span className="hud-thought-title">{thoughtStream[thoughtIndex].title}</span>
              <span className="hud-thought-detail">{thoughtStream[thoughtIndex].detail}</span>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Natural Prompt Filter Pills */}
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
