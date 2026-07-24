import React, { useEffect, useRef } from 'react';
import { LISTINGS } from '../data/listings';

export default function InlineMap({ onSelectListing }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Dynamically load Leaflet CSS & JS if not already loaded
    const loadLeaflet = async () => {
      if (!window.L) {
        if (!document.getElementById('leaflet-css')) {
          const cssLink = document.createElement('link');
          cssLink.id = 'leaflet-css';
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(cssLink);
        }

        await new Promise((resolve) => {
          if (window.L) return resolve();
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }

      if (window.L && mapContainerRef.current && !mapInstanceRef.current) {
        // Initialize Leaflet map centered on Malta
        const L = window.L;
        const map = L.map(mapContainerRef.current, {
          center: [35.908, 14.485],
          zoom: 12,
          zoomControl: false
        });

        mapInstanceRef.current = map;

        // Add CartoDB Dark Matter Tile Layer (Authentic dark cartography with real roads & coastlines)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        // Add Zoom Control at top right
        L.control.zoom({ position: 'topright' }).addTo(map);

        // Real coordinates for Malta property listings
        const listingCoords = [
          { id: 'mlt-001', lat: 35.9122, lng: 14.5042 }, // Sliema
          { id: 'mlt-002', lat: 35.9186, lng: 14.4900 }, // St. Julian's
          { id: 'mlt-003', lat: 35.8989, lng: 14.5145 }, // Valletta
          { id: 'mlt-004', lat: 36.0443, lng: 14.2403 }, // Gozo
          { id: 'mlt-005', lat: 35.9050, lng: 14.4950 }, // Gzira
          { id: 'mlt-006', lat: 35.9583, lng: 14.3639 }  // Mellieha
        ];

        // Add custom price badge markers
        listingCoords.forEach((coord) => {
          const listing = LISTINGS.find((l) => l.id === coord.id);
          if (!listing) return;

          const priceText = `${listing.currency}${listing.price.toLocaleString()}`;

          const customIcon = L.divIcon({
            className: 'custom-leaflet-marker',
            html: `<div className="leaflet-price-badge"><span>${priceText}</span></div>`,
            iconSize: [80, 32],
            iconAnchor: [40, 16]
          });

          const marker = L.marker([coord.lat, coord.lng], { icon: customIcon }).addTo(map);

          marker.on('click', () => {
            onSelectListing(listing);
          });
        });
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onSelectListing]);

  return (
    <div className="inline-map-wrapper">
      <div className="map-overlay-header">
        <div className="map-badge">
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 8px #38BDF8' }}></span>
          <span>Live Malta Real Estate Cartography</span>
        </div>
      </div>

      <div ref={mapContainerRef} className="inline-map-leaflet-container" />
    </div>
  );
}
