import React, { useState, useRef } from 'react';
import { Heart, MapPin, Bed, Bath, Maximize, Star, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function PropertyCard({ listing, isSaved, onToggleSave, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const tickingRef = useRef(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        setTilt({
          x: rotateX,
          y: rotateY,
          glowX: (x / rect.width) * 100,
          glowY: (y / rect.height) * 100
        });
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  return (
    <div
      className="property-card 3d-tilt-card"
      onClick={() => onClick(listing)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        '--glow-x': `${tilt.glowX}%`,
        '--glow-y': `${tilt.glowY}%`
      }}
    >
      <div className="card-spotlight-glow" />

      <div className="card-image-wrapper">
        <img src={listing.image} alt={listing.title} loading="lazy" />
        <div className="card-badge">{listing.type}</div>
        <button
          className={`card-heart-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(listing.id);
          }}
          title={isSaved ? "Remove from saved" : "Save property"}
        >
          <Heart size={17} fill={isSaved ? "#FF4757" : "none"} color={isSaved ? "#FF4757" : "#94A3B8"} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-location">
          <MapPin size={13} />
          <span>{listing.location}, MALTA</span>
          {listing.isVerified && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#E5C158', marginLeft: 'auto', fontSize: '0.72rem', textTransform: 'none', fontWeight: 600 }}>
              <CheckCircle size={11} /> Verified
            </span>
          )}
        </div>

        <h3 className="card-title">{listing.title}</h3>

        <div className="card-specs">
          <div className="spec-item">
            <Bed size={14} color="#94A3B8" />
            <span>{listing.bedrooms} Beds</span>
          </div>
          <div className="spec-item">
            <Bath size={14} color="#94A3B8" />
            <span>{listing.bathrooms} Baths</span>
          </div>
          <div className="spec-item">
            <Maximize size={14} color="#94A3B8" />
            <span>{listing.area} m²</span>
          </div>
          <div className="spec-item" style={{ marginLeft: 'auto', color: '#E5C158', fontWeight: 600 }}>
            <Star size={13} fill="#E5C158" />
            <span>{listing.rating}</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="price-tag">
            <span className="price-amount">{listing.currency}{listing.price.toLocaleString()}</span>
            <span className="price-period">/{listing.period}</span>
          </div>
          <button className="view-details-btn">
            <span>View</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
