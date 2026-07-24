import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import InlineMap from './components/InlineMap';
import BackgroundFlow from './components/BackgroundFlow';
import { LISTINGS, LOCATIONS } from './data/listings';
import { MapPin, Sparkles, ShieldCheck, Zap, LayoutGrid, Map, Split, Building2, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [attachedChips, setAttachedChips] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All Malta');
  const [savedIds, setSavedIds] = useState(['mlt-001']);
  const [selectedListing, setSelectedListing] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'split' | 'map'
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(0);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);

  // Search Results Submission state
  const [isSearchResultsActive, setIsSearchResultsActive] = useState(false);

  const tickingRef = useRef(false);

  // Optimized high-performance scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(progress);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Triggered when Search button is clicked or Enter is pressed
  const handleExecuteSearch = (queryText) => {
    setIsSearchResultsActive(true);
  };

  // Toggle saved favorite
  const handleToggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Smart Natural Language & Forgiving Keyword Filter Logic
  const filteredListings = useMemo(() => {
    return LISTINGS.filter((item) => {
      if (selectedLocation !== 'All Malta' && item.location !== selectedLocation) {
        return false;
      }

      const rawQuery = searchQuery.toLowerCase();
      const chipQueries = attachedChips.map((c) => c.query.toLowerCase());
      
      if (!rawQuery && chipQueries.length === 0) {
        return true;
      }

      const itemText = [
        item.title,
        item.location,
        item.description,
        item.type,
        ...item.features
      ].join(' ').toLowerCase();

      const matchesChips = chipQueries.every((cq) => itemText.includes(cq));
      if (!matchesChips) return false;

      if (rawQuery) {
        const keywords = rawQuery
          .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
          .split(/\s+/)
          .filter((w) => w.length > 2 && !['looking', 'for', 'and', 'with', 'the', 'under', 'flat', 'room', 'bed', 'need', 'want'].includes(w));

        if (keywords.length > 0) {
          const matchesKeyword = keywords.some((kw) => itemText.includes(kw));
          if (!matchesKeyword) return false;
        }
      }

      return true;
    });
  }, [searchQuery, attachedChips, selectedLocation]);

  const handleResetSearch = () => {
    setSearchQuery('');
    setAttachedChips([]);
    setSelectedLocation('All Malta');
    setIsCanvasExpanded(false);
    setIsSearchResultsActive(false);
  };

  return (
    <div className="app-container">
      {/* Top Scroll Progress Indicator Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Background Flow */}
      <BackgroundFlow />
      <div className="ambient-background" />

      {/* COVE Navbar */}
      <Navbar
        savedCount={savedIds.length}
        onOpenMap={() => setViewMode('split')}
        onResetSearch={handleResetSearch}
        selectedLogoIndex={selectedLogoIndex}
        setSelectedLogoIndex={setSelectedLogoIndex}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Don't Search. <span className="magic-rainbow-text">Just Ask COVE.</span>
        </h1>

        <p className="hero-subtitle">
          Describe your dream residence in natural words. COVE instantly curates verified penthouses, seafront flats, and Gozo villas in Malta.
        </p>

        {/* Search Focal Point */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          attachedChips={attachedChips}
          setAttachedChips={setAttachedChips}
          onExecuteSearch={handleExecuteSearch}
          isCanvasExpanded={isCanvasExpanded}
          setIsCanvasExpanded={setIsCanvasExpanded}
        />

        {/* PROMINENT BRAND TRUST & METRICS GRID BAR */}
        <div className="cove-trust-metrics-grid">
          <div className="trust-metric-card">
            <div className="trust-icon-box">
              <Building2 size={20} color="#E5C158" />
            </div>
            <div className="trust-text-box">
              <div className="trust-number">120+ Curated Homes</div>
              <div className="trust-sub">Handpicked Mediterranean Penthouses & Villas</div>
            </div>
          </div>

          <div className="trust-metric-card">
            <div className="trust-icon-box">
              <ShieldCheck size={20} color="#38BDF8" />
            </div>
            <div className="trust-text-box">
              <div className="trust-number">100% Verified Landlords</div>
              <div className="trust-sub">Direct Fraud-Free Leases & Escrow Security</div>
            </div>
          </div>

          <div className="trust-metric-card">
            <div className="trust-icon-box">
              <Zap size={20} color="#E5C158" />
            </div>
            <div className="trust-text-box">
              <div className="trust-number">COVE Natural Search</div>
              <div className="trust-sub">Zero Rigid Filters • Instant AI Matching</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Filter Tabs */}
      <nav className="category-nav">
        {LOCATIONS.map((loc) => (
          <button
            key={loc}
            className={`location-tab ${selectedLocation === loc ? 'active' : ''}`}
            onClick={() => {
              setSelectedLocation(loc);
              setIsSearchResultsActive(false);
            }}
          >
            {loc}
          </button>
        ))}
      </nav>

      {/* Main Grid & Inline Map Section */}
      <main className="main-content" id="results-section">
        <div className="results-dossier-plate">
          <div className="section-header">
            <div className="results-count">
              {isSearchResultsActive ? (
                <>
                  <span className="magic-rainbow-text" style={{ fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
                    COVE's Curated Matches for You
                  </span>
                  <span>({filteredListings.length > 0 ? filteredListings.length : LISTINGS.length} verified listings)</span>
                </>
              ) : (
                <>
                  Properties <span>({filteredListings.length} available)</span>
                </>
              )}
            </div>

            {/* Inline View Mode Switcher Controls */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`nav-btn ${viewMode === 'grid' ? 'active-view' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>

              <button
                className={`nav-btn ${viewMode === 'split' ? 'active-view' : ''}`}
                onClick={() => setViewMode('split')}
              >
                <Split size={14} />
                <span>Map + Grid</span>
              </button>

              <button
                className={`nav-btn ${viewMode === 'map' ? 'active-view' : ''}`}
                onClick={() => setViewMode('map')}
              >
                <Map size={14} />
                <span>Full Map</span>
              </button>
            </div>
          </div>

          {/* Render Inline Map when mode is 'split' or 'map' */}
          {(viewMode === 'split' || viewMode === 'map') && (
            <InlineMap onSelectListing={(listing) => setSelectedListing(listing)} />
          )}

          {/* Render Property Cards Grid unless mode is 'map' */}
          {viewMode !== 'map' && (
            (filteredListings.length > 0 ? filteredListings : LISTINGS).map((item) => (
              <PropertyCard
                key={item.id}
                listing={item}
                isSaved={savedIds.includes(item.id)}
                onToggleSave={handleToggleSave}
                onClick={(listing) => setSelectedListing(listing)}
              />
            )).reduce((acc, curr, i, arr) => {
              if (i === 0) return [<div key="grid" className="grid-layout">{arr}</div>];
              return acc;
            }, [])
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 COVE Malta Ltd. Curated Mediterranean Real Estate.</p>
      </footer>

      {/* Property Detail Modal */}
      <PropertyModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        isSaved={selectedListing ? savedIds.includes(selectedListing.id) : false}
        onToggleSave={handleToggleSave}
      />
    </div>
  );
}
