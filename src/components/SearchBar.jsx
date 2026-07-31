import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, X, Loader2 } from 'lucide-react';
import { NATURAL_SEARCH_PROMPTS, QUICK_FILTERS } from '../data/prompts';

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

  // Ref for typewriter prompt smooth right-scroll
  const promptOverlayRef = useRef(null);

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

  // Smoothly auto-scroll prompt overlay to the right as text types out
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
    if (setIsCanvasExpanded) setIsCanvasExpanded(true);

    setTimeout(() => {
      setIsSearching(false);
      if (setIsCanvasExpanded) setIsCanvasExpanded(false);
      const resultsElem = document.getElementById('results-section');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
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
        <div className="search-input-wrapper">
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
              style={{ padding: '6px 10px', marginRight: '8px', border: 'none', background: 'transparent' }}
              onClick={() => { setSearchQuery(''); setAttachedChips([]); }}
              title="Clear all"
            >
              <X size={16} />
            </button>
          )}

          <button className="search-action-btn" onClick={handleSearchClick} disabled={isSearching}>
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            <span>{isSearching ? 'Curating...' : 'Search'}</span>
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
      </div>

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
