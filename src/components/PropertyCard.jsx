import React from 'react';
import { Heart, MapPin, Bed, Bath, Maximize, Star, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function PropertyCard({ listing, item, isSaved, onToggleSave, onClick, onOpenModal, onSelect }) {
  const data = listing || item;
  if (!data) return null;

  const handleCardClick = () => {
    if (onSelect) onSelect(data);
    else if (onOpenModal) onOpenModal(data);
    else if (onClick) onClick(data);
  };

  // Determine market value score position (default to 48% for Prime Value center)
  const fpScore = data.advantageScore ? Math.min(85, Math.max(15, 100 - data.advantageScore + 30)) : 48;

  return (
    <div className="property-card" onClick={handleCardClick}>
      <div className="card-image-wrapper">
        <img className="card-image" src={data.image} alt={data.title} loading="lazy" />
        <div className="card-badge">{data.type}</div>
        <button
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(data.id);
          }}
          title={isSaved ? "Remove from saved" : "Save property"}
        >
          <Heart size={16} fill={isSaved ? "var(--luxury-gold)" : "none"} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-location">
          <MapPin size={13} color="var(--luxury-gold)" />
          <span className="truncate-text">{data.location}, MALTA</span>
          {data.isVerified && (
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--luxury-gold)', fontSize: '0.72rem', flexShrink: 0 }}>
              <CheckCircle size={11} /> Verified
            </span>
          )}
        </div>

        <h3 className="card-title truncate-text" title={data.title}>{data.title}</h3>

        <div className="card-features">
          <div className="card-feature-item">
            <Bed size={14} />
            <span>{data.bedrooms} Beds</span>
          </div>
          <div className="card-feature-item">
            <Bath size={14} />
            <span>{data.bathrooms} Baths</span>
          </div>
          <div className="card-feature-item">
            <Maximize size={14} />
            <span>{data.area} m²</span>
          </div>
          {data.rating && (
            <div className="card-feature-item" style={{ marginLeft: 'auto', color: 'var(--luxury-gold)', fontWeight: 600 }}>
              <Star size={13} fill="var(--luxury-gold)" />
              <span>{data.rating}</span>
            </div>
          )}
        </div>

        {/* BORDERLESS FLOATING VALUE SPECTRUM LINE */}
        <div className="floating-value-fp-box">
          <div className="fp-spectrum-track-container">
            <div className="fp-spectrum-track" />
            <div className="fp-indicator-dot" style={{ left: `${fpScore}%` }} />
          </div>

          <div className="fp-zone-labels">
            <span>Standard</span>
            <span className="fp-center-label">Prime Value</span>
            <span>Exclusive</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="price-tag">
            <span className="price-amount">{data.currency}{data.price.toLocaleString()}</span>
            <span className="price-period"> / mo</span>
          </div>

          <button
            className="nav-btn"
            style={{ padding: '6px 14px', fontSize: '0.78rem', flexShrink: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            <span>View Dossier</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
