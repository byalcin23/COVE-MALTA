import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import CoveBlueprintMindCanvas from './components/CoveBlueprintMindCanvas';
import CoveProductPanel from './components/CoveProductPanel';
import { LISTINGS, LOCATIONS } from './data/listings';
import { LayoutGrid, Map, Split } from 'lucide-react';

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
    setTimeout(() => {
      setIsCanvasExpanded(false);
      const elem = document.getElementById('results-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 2800);
  };

  const handleToggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredListings = useMemo(() => {
    return LISTINGS.filter((item) => {
      if (selectedLocation !== 'All Malta' && item.location !== selectedLocation) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesDesc = item.description ? item.description.toLowerCase().includes(q) : false;
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }
      return true;
    });
  }, [selectedLocation, searchQuery]);

  return (
    <div className="app-container" data-theme={theme} data-geometry={geometry}>
      <div className="scroll-progress-bar" ref={progressBarRef} />

      {/* 60FPS Organic Liquid Synaptic Mind Canvas Background */}
      <CoveBlueprintMindCanvas />

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
              <span className="dossier-count-badge">({filteredListings.length} verified listings)</span>
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

          {/* FUNCTIONAL SKELETON LOADERS (Triggered directly on property cards during AI computation) */}
          {isCanvasExpanded ? (
            <div className="grid-layout">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="skeleton-card">
                  <div className="skeleton-img-box skeleton-shimmer" />
                  <div className="skeleton-line-long skeleton-shimmer" />
                  <div className="skeleton-line-short skeleton-shimmer" />
                  <div className="skeleton-footer">
                    <div className="skeleton-price skeleton-shimmer" />
                    <div className="skeleton-badge skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid-layout">
              {filteredListings.map((item) => (
                <PropertyCard
                  key={item.id}
                  listing={item}
                  isSaved={savedIds.includes(item.id)}
                  onToggleSave={handleToggleSave}
                  onOpenModal={(data) => setSelectedListing(data)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* PROPERTY MODAL */}
      {selectedListing && (
        <PropertyModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          isSaved={savedIds.includes(selectedListing.id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 COVE Malta. All Rights Reserved. Verified Natural Language Escrow Leases.</p>
      </footer>
    </div>
  );
}
