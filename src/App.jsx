import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import CoveBlueprintMindCanvas from './components/CoveBlueprintMindCanvas';
import CoveProductPanel from './components/CoveProductPanel';
import { LISTINGS, LOCATIONS } from './data/listings';
import { LayoutGrid, Map, Split, Sparkles } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('porcelain-light'); // Porcelain Light as default!
  const [geometry, setGeometry] = useState('hybrid'); // Hybrid Curve as default!
  const [searchQuery, setSearchQuery] = useState('');
  const [attachedChips, setAttachedChips] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All Malta');
  const [savedIds, setSavedIds] = useState(['mlt-001']);
  const [selectedListing, setSelectedListing] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);

  const progressBarRef = useRef(null);

  // 60fps real-time scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!progressBarRef.current) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      progressBarRef.current.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExecuteSearch = () => {
    setIsCanvasExpanded(true);
  };

  const handleToggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const { displayListings, isAiFallback } = useMemo(() => {
    const directMatches = LISTINGS.filter((item) => {
      if (selectedLocation !== 'All Malta' && item.location !== selectedLocation) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesDesc = item.description ? item.description.toLowerCase().includes(q) : false;
        const matchesType = item.type ? item.type.toLowerCase().includes(q) : false;
        const matchesFeatures = item.features ? item.features.some(f => f.toLowerCase().includes(q)) : false;
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesType && !matchesFeatures) return false;
      }
      return true;
    });

    if (directMatches.length > 0) {
      return { displayListings: directMatches, isAiFallback: false };
    }

    // AI Fallback: Show curated listings if query doesn't match specific keyword directly
    return {
      displayListings: selectedLocation === 'All Malta' ? LISTINGS : LISTINGS.filter(i => i.location === selectedLocation),
      isAiFallback: searchQuery.trim().length > 0
    };
  }, [selectedLocation, searchQuery]);

  return (
    <div className="app-container" data-theme={theme} data-geometry={geometry}>
      <div className="scroll-progress-bar" ref={progressBarRef} />

      {/* 60FPS Organic Liquid Synaptic Mind Canvas Background */}
      <CoveBlueprintMindCanvas isCanvasExpanded={isCanvasExpanded} />

      {/* NAVBAR WITH 2026 LIVE GEOMETRY & PALETTE SWITCHERS */}
      <Navbar
        savedCount={savedIds.length}
        onOpenMap={() => setViewMode('map')}
        viewMode={viewMode}
        setViewMode={setViewMode}
        theme={theme}
        setTheme={setTheme}
        geometry={geometry}
        setGeometry={setGeometry}
      />

      {/* HERO & PURE SEARCH HEADER SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">
          Don't Search. <span className="luxury-gold-text">Just Ask COVE.</span>
        </h1>
        <p className="hero-subtitle">
          Describe your dream residence in natural words. COVE instantly curates verified penthouses, seafront flats, and Gozo villas in Malta.
        </p>

        {/* PROMINENT AI SEARCH INPUT BAR & SUBTLE NATURAL PROMPT PILLS */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          attachedChips={attachedChips}
          setAttachedChips={setAttachedChips}
          onExecuteSearch={handleExecuteSearch}
          isCanvasExpanded={isCanvasExpanded}
          setIsCanvasExpanded={setIsCanvasExpanded}
        />
      </section>

      {/* BELOW THE FOLD: WHAT IS COVE & PRODUCT INTELLIGENCE PANEL */}
      <CoveProductPanel />

      {/* MAIN RESULTS CONTENT AREA */}
      <main className="main-content" id="results-section">
        <div className="results-dossier-plate">
          <div className="section-header">
            <h2 className="results-count">
              <span className="cove-brand-text">COVE</span>'s Curated Matches for You
              <span className="dossier-count-badge">({displayListings.length} verified listings)</span>
            </h2>

            {/* View Switcher Controls */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`nav-btn ${viewMode === 'grid' ? 'active-view' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                className={`nav-btn ${viewMode === 'split' ? 'active-view' : ''}`}
                onClick={() => setViewMode('split')}
                title="Split Map View"
              >
                <Split size={15} />
              </button>
              <button
                className={`nav-btn ${viewMode === 'map' ? 'active-view' : ''}`}
                onClick={() => setViewMode('map')}
                title="Full Map View"
              >
                <Map size={15} />
              </button>
            </div>
          </div>

          {/* Location Filter Tag Bar */}
          <div className="location-filter-bar">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                className={`loc-tag ${selectedLocation === loc ? 'active' : ''}`}
                onClick={() => setSelectedLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* AI FALLBACK SYNTHESIS NOTICE */}
          {isAiFallback && !isCanvasExpanded && (
            <div className="live-synthesis-status-banner" style={{ background: 'rgba(5, 150, 105, 0.06)' }}>
              <Sparkles size={15} color="var(--luxury-gold)" />
              <span>▶ COVE AI SYNTHESIS: Displaying all {displayListings.length} verified Malta rentals for "{searchQuery}"</span>
            </div>
          )}

          {/* REAL-TIME AI SYNTHESIS STATUS BAR */}
          {isCanvasExpanded && (
            <div className="live-synthesis-status-banner">
              <Sparkles size={16} className="animate-spin" color="var(--luxury-gold)" />
              <span>▶ COVE AI MIND SYNTHESIZING ESCROW LEASE CONTRACTS & 3D SEA VIEWS...</span>
            </div>
          )}

          {/* REAL-TIME SKELETON LOADERS OR VERIFIED PROPERTY CARDS GRID */}
          {isCanvasExpanded ? (
            <div className="grid-layout">
              {[1, 2, 3, 4, 5, 6].map((sk) => (
                <div key={sk} className="skeleton-property-card">
                  <div className="skeleton-image-box" />
                  <div className="skeleton-body-box">
                    <div className="skeleton-line title-line" />
                    <div className="skeleton-line subtitle-line" />
                    <div className="skeleton-line spec-line" />
                    <div className="skeleton-line fp-line" />
                  </div>
                </div>
              ))}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid-layout">
              {displayListings.map((listing) => (
                <PropertyCard
                  key={listing.id}
                  listing={listing}
                  isSaved={savedIds.includes(listing.id)}
                  onToggleSave={handleToggleSave}
                  onSelect={setSelectedListing}
                />
              ))}
            </div>
          ) : (
            <div className="split-view-container">
              <div className="split-list-column">
                {displayListings.map((listing) => (
                  <PropertyCard
                    key={listing.id}
                    listing={listing}
                    isSaved={savedIds.includes(listing.id)}
                    onToggleSave={handleToggleSave}
                    onSelect={setSelectedListing}
                  />
                ))}
              </div>
              <div className="split-map-column">
                <div className="map-placeholder-box">
                  <Map size={32} color="var(--luxury-gold)" />
                  <h4>Interactive Malta Map View</h4>
                  <p>Displaying {displayListings.length} geo-pinned verified rentals across Sliema, Valletta & Gozo</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* PROPERTY DETAILS MODAL */}
      {selectedListing && (
        <PropertyModal
          listing={selectedListing}
          isSaved={savedIds.includes(selectedListing.id)}
          onClose={() => setSelectedListing(null)}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
}
