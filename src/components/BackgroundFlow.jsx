import React from 'react';
import { LISTINGS } from '../data/listings';

export default function BackgroundFlow() {
  // Pre-calculated organic positions for floating paper sheets in water
  const paperCards = [
    { listing: LISTINGS[0], top: '10%', left: '4%', delay: '0s', duration: '18s', rot: '-3deg' },
    { listing: LISTINGS[1], top: '15%', right: '5%', delay: '4s', duration: '22s', rot: '3deg' },
    { listing: LISTINGS[2], top: '48%', left: '3%', delay: '8s', duration: '20s', rot: '2deg' },
    { listing: LISTINGS[3], top: '52%', right: '4%', delay: '2s', duration: '24s', rot: '-3deg' },
    { listing: LISTINGS[4], top: '76%', left: '10%', delay: '11s', duration: '19s', rot: '-2deg' },
    { listing: LISTINGS[5], top: '80%', right: '12%', delay: '6s', duration: '21s', rot: '4deg' }
  ];

  return (
    <div className="water-paper-container" aria-hidden="true">
      {paperCards.map((card, idx) => (
        <div
          key={`paper-${card.listing.id}-${idx}`}
          className="water-paper-sheet"
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
            animationDelay: card.delay,
            animationDuration: card.duration,
            '--init-rot': card.rot
          }}
        >
          <img src={card.listing.image} alt="" />
          <div className="paper-details">
            <div className="paper-title">{card.listing.title}</div>
            <div className="paper-sub">{card.listing.location} • <span style={{ color: '#E5C158', fontWeight: 700 }}>{card.listing.currency}{card.listing.price.toLocaleString()}/mo</span></div>
            <div className="paper-specs-line">{card.listing.bedrooms} Beds • {card.listing.bathrooms} Baths • {card.listing.area} m²</div>
          </div>
        </div>
      ))}
    </div>
  );
}
