import React, { useState, useRef } from 'react';
import { Heart, MapPin, Bed, Bath, Maximize, Star, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function PropertyCard({ listing, item, isSaved, onToggleSave, onClick, onOpenModal }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const tickingRef = useRef(false);

  // Safe fallback for listing or item prop
  const data = listing || item;
  if (!data) return null;

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

  const handleCardClick = () => {
    if (onOpenModal) onOpenModal(data);
    else if (onClick) onClick(data);
  };

  return (
    <div
      className="property-card 3d-tilt-card"
      onClick={handleCardClick}
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
        <img src={data.image} alt={data.title} loading="lazy" />
        <div className="card-badge">{data.type}</div>
        <button
          className={`card-heart-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(data.id);
          }}
          title={isSaved ? "Remove from saved" : "Save property"}
        >
          <Heart size={18} fill={isSaved ? "#FF4757" : "none"} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-location">
          <MapPin size={13} color="#E5C158" />
          <span>{data.location}, MALTA</span>
          {data.isVerified && (
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px', color: '#E5C158', fontSize: '0.72rem' }}>
              <CheckCircle size={11} /> Verified
            </span>
          )}
        </div>

        <h3 className="card-title">{data.title}</h3>

        <div className="card-specs">
          <div className="spec-item">
            <Bed size={14} />
            <span>{data.bedrooms} Beds</span>
          </div>
          <div className="spec-item">
            <Bath size={14} />
            <span>{data.bathrooms} Baths</span>
          </div>
          <div className="spec-item">
            <Maximize size={14} />
            <span>{data.area} m²</span>
          </div>
          {data.rating && (
            <div className="spec-item" style={{ marginLeft: 'auto', color: '#E5C158', fontWeight: 600 }}>
              <Star size={13} fill="#E5C158" />
              <span>{data.rating}</span>
            </div>
          )}
        </div>

        <div className="card-footer">
          <div className="price-tag">
            <span className="price-amount">{data.currency}{data.price.toLocaleString()}</span>
            <span className="price-period">/month</span>
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
