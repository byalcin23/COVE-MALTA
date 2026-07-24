import React from 'react';
import { X, MapPin, Compass } from 'lucide-react';
import { LISTINGS } from '../data/listings';

export default function MapModal({ isOpen, onClose, onSelectListing }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '1000px', height: '80vh', padding: '0', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '20px 28px', background: 'rgba(9, 14, 26, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Compass size={22} color="#F3C68F" />
            <h3 style={{ fontFamily: 'Cinzel, serif', color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 600 }}>Interactive Malta Property Map</h3>
          </div>
          <button className="modal-close-btn" style={{ position: 'static' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Stylized Liquid Map Container */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: 'calc(100% - 65px)', 
          background: '#090E1A', 
          backgroundImage: 'radial-gradient(rgba(243, 198, 143, 0.08) 1px, transparent 1px)', 
          backgroundSize: '28px 28px' 
        }}>
          {/* Malta Island Graphic Outline */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '60%',
            borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '2px dashed rgba(243, 198, 143, 0.25)',
            pointerEvents: 'none'
          }} />

          {/* Listing Map Pins */}
          {LISTINGS.map((item, idx) => {
            const positions = [
              { top: '35%', left: '55%' }, // Sliema
              { top: '32%', left: '60%' }, // St Julians
              { top: '42%', left: '65%' }, // Valletta
              { top: '18%', left: '25%' }, // Gozo
              { top: '38%', left: '52%' }, // Gzira
              { top: '22%', left: '42%' }  // Mellieha
            ];

            const pos = positions[idx % positions.length];

            return (
              <div
                key={item.id}
                onClick={() => {
                  onClose();
                  onSelectListing(item);
                }}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(9, 14, 26, 0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(243, 198, 143, 0.5)',
                  color: '#FFFFFF',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.25s ease',
                  zIndex: 5
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.12)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.0)'}
              >
                <MapPin size={14} color="#F3C68F" />
                <span>{item.location}: {item.currency}{item.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
