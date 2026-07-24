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
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(0);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);

  // Search Results Submission state
  const [isSearchResultsActive, setIsSearchResultsActive] = useState(false);

  const progressBarRef = useRef(null);

  // Direct DOM zero-lag 60fps real-time scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!progressBarRef.current) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      progressBarRef.current.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
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

      if (!searchQuery && attachedChips.length === 0) {
        return true;
      }

      const combinedText = `${item.title} ${item.location} ${item.description} ${item.tags.join(' ')}`.toLowerCase();

      const chipQueries = attachedChips.map((c) => c.query.toLowerCase());
      const chipMatch = chipQueries.every((q) => combinedText.includes(q));

      if (!chipMatch) return false;

      if (!searchQuery.trim()) return true;

      const userTokens = searchQuery
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(/\s+/)
        .filter((t) => t.length > 2);

      if (userTokens.length === 0) return true;

      const matchesToken = userTokens.some((token) => combinedText.includes(token));
      return matchesToken;
    });
  }, [searchQuery, attachedChips, selectedLocation]);

  const savedListings = useMemo(() => {
    return LISTINGS.filter((item) => savedIds.includes(item.id));
  }, [savedIds]);

  return (
    <div className="app-container">
      {/* DIRECT DOM 60FPS ZERO-LAG SCROLL PROGRESS BAR */}
      <div ref={progressBarRef} className="scroll-progress-bar" style={{ width: '0%' }} />

      {/* SUBTLE FLOATING AMBIENT BACKGROUND */}
      <div className="ambient-background" />

      {/* FLOATING SUBMERGED WATER PAPERS BACKGROUND (Hidden on Mobile) */}
      <BackgroundFlow />

      {/* NAVBAR WITH LOGO PICKER */}
      <Navbar
        selectedLogoIndex={selectedLogoIndex}
        setSelectedLogoIndex={setSelectedLogoIndex}
        savedCount={savedIds.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* HERO & COVE NATURAL SEARCH HEADER SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">
          Don't Search. <span className="magic-rainbow-text">Just Ask COVE.</span>
        </h1>
        <p className="hero-subtitle">
          Describe your dream residence in natural words. COVE instantly curates verified penthouses, seafront flats, and Gozo villas in Malta.
        </p>

        {/* PROMINENT AI SEARCH INPUT BAR WITH EXPANDABLE CANAL & TYPEWRITER OVERLAY */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          attachedChips={attachedChips}
          setAttachedChips={setAttachedChips}
          onExecuteSearch={handleExecuteSearch}
          isCanvasExpanded={isCanvasExpanded}
          setIsCanvasExpanded={setIsCanvasExpanded}
        />

        {/* HERO TRUST & BRAND PROMISE METRICS GRID BAR */}
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

      {/* CATEGORY LOCATION TABS */}
      <nav className="category-nav">
        {LOCATIONS.map((loc) => (
          <button
            key={loc}
            className={`location-tab ${selectedLocation === loc ? 'active' : ''}`}
            onClick={() => setSelectedLocation(loc)}
          >
            {loc === 'All Malta' ? '🇲🇹 All Malta' : `📍 ${loc}`}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA WITHIN ELEVATED DOSSIER TRAY PLATE */}
      <main className="main-content" id="results-section">
        <div className="results-dossier-plate">
          <div className="section-header">
            <h2 className="results-count">
              COVE's Curated Matches for You
              <span>({filteredListings.length} verified listings)</span>
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

          {/* VIEW MODE CONDITIONAL RENDERS */}
          {viewMode === 'map' && (
            <InlineMap
              listings={filteredListings}
              onSelectListing={(item) => setSelectedListing(item)}
            />
          )}

          {viewMode === 'split' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <InlineMap
                listings={filteredListings}
                onSelectListing={(item) => setSelectedListing(item)}
              />
              <div className="grid-layout">
                {filteredListings.map((item) => (
                  <PropertyCard
                    key={item.id}
                    item={item}
                    isSaved={savedIds.includes(item.id)}
                    onToggleSave={handleToggleSave}
                    onOpenModal={setSelectedListing}
                  />
                ))}
              </div>
            </div>
          )}

          {viewMode === 'grid' && (
            <div className="grid-layout">
              {filteredListings.map((item) => (
                <PropertyCard
                  key={item.id}
                  item={item}
                  isSaved={savedIds.includes(item.id)}
                  onToggleSave={handleToggleSave}
                  onOpenModal={setSelectedListing}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 COVE MALTA. Premium Mediterranean AI Real Estate Concierge.</p>
      </footer>

      {/* PROPERTY MODAL */}
      {selectedListing && (
        <PropertyModal
          item={selectedListing}
          isSaved={savedIds.includes(selectedListing.id)}
          onClose={() => setSelectedListing(null)}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
}
