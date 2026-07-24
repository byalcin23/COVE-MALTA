import React from 'react';
import { X, MapPin, Bed, Bath, Maximize, Star, Phone, Mail, Layers } from 'lucide-react';

export default function PropertyModal({ listing, onClose, isSaved, onToggleSave }) {
  if (!listing) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <img src={listing.image} alt={listing.title} className="modal-hero-img" />

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F3C68F', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <MapPin size={16} />
            <span>{listing.address}</span>
          </div>

          <div className="modal-title-row">
            <div>
              <h2 className="modal-title">{listing.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#CBD5E1', marginTop: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F3C68F', fontWeight: 700 }}>
                  <Star size={16} fill="#F3C68F" /> {listing.rating} ({listing.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span>{listing.type}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div className="modal-price">{listing.currency}{listing.price.toLocaleString()}</div>
              <div style={{ color: '#64748B', fontSize: '0.85rem' }}>security deposit: {listing.specs.deposit}</div>
            </div>
          </div>

          <div className="card-specs" style={{ margin: '24px 0', fontSize: '1rem', padding: '20px', background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="spec-item"><Bed size={18} color="#38BDF8" /> <strong>{listing.bedrooms}</strong> Bedrooms</div>
            <div className="spec-item"><Bath size={18} color="#38BDF8" /> <strong>{listing.bathrooms}</strong> Bathrooms</div>
            <div className="spec-item"><Maximize size={18} color="#38BDF8" /> <strong>{listing.area} m²</strong> Living Area</div>
            <div className="spec-item"><Layers size={18} color="#38BDF8" /> {listing.specs.floor}</div>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontFamily: 'Cinzel, serif', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>Residence Highlights</h4>
          <div className="modal-features-grid">
            {listing.features.map((feat, idx) => (
              <span key={idx} className="feature-tag">
                ✓ {feat}
              </span>
            ))}
          </div>

          <h4 style={{ fontSize: '1.2rem', fontFamily: 'Cinzel, serif', fontWeight: 600, color: '#FFFFFF', margin: '24px 0 10px' }}>Property Overview</h4>
          <p style={{ color: '#CBD5E1', lineHeight: '1.8', fontSize: '0.98rem' }}>
            {listing.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px' }}>
              <span style={{ color: '#64748B', fontSize: '0.82rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lease Agreement</span>
              <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>Minimum {listing.specs.minimumLease}</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px' }}>
              <span style={{ color: '#64748B', fontSize: '0.82rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Availability</span>
              <strong style={{ color: '#F3C68F', fontSize: '0.95rem' }}>{listing.specs.availableFrom}</strong>
            </div>
          </div>

          {/* Agent Information & CTA */}
          <div className="agent-box">
            <div className="agent-info">
              <img src={listing.agent.avatar} alt={listing.agent.name} className="agent-avatar" />
              <div>
                <h4 style={{ color: '#FFFFFF', fontWeight: 700 }}>{listing.agent.name}</h4>
                <div style={{ color: '#64748B', fontSize: '0.85rem' }}>{listing.agent.company}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={`tel:${listing.agent.phone}`} className="liquid-btn liquid-btn-primary" style={{ textDecoration: 'none' }}>
                <Phone size={16} />
                <span>Call ({listing.agent.phone})</span>
              </a>
              <button className="liquid-btn" onClick={() => alert(`Enquiry sent to ${listing.agent.name}!`)}>
                <Mail size={16} />
                <span>Enquire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
