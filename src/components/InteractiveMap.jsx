import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { LOCATIONS } from '../data/locations';

function createIcon(type, isHighlighted) {
  const colors = {
    primary: '#e74c3c',
    secondary: '#3498db',
    military: '#2c3e50',
  };
  const color = colors[type] || colors.secondary;
  const size = isHighlighted ? 16 : 10;
  const border = isHighlighted ? 4 : 2;

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border: ${border}px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 ${isHighlighted ? 12 : 4}px ${color}${isHighlighted ? 'cc' : '66'};
      transition: all 0.3s ease;
    "></div>`,
    iconSize: [size + border * 2, size + border * 2],
    iconAnchor: [(size + border * 2) / 2, (size + border * 2) / 2],
  });
}

function MapUpdater({ activeLocations }) {
  const map = useMap();

  useEffect(() => {
    if (activeLocations.length > 0) {
      const locs = LOCATIONS.filter((l) => activeLocations.includes(l.id));
      if (locs.length === 1) {
        map.flyTo([locs[0].lat, locs[0].lng], 12, { duration: 1 });
      } else if (locs.length > 1) {
        const bounds = L.latLngBounds(locs.map((l) => [l.lat, l.lng]));
        map.flyToBounds(bounds, { padding: [50, 50], duration: 1 });
      }
    }
  }, [activeLocations, map]);

  return null;
}

export default function InteractiveMap({ activeLocations }) {
  const center = [39.9, -2.5];

  return (
    <div className="map-container">
      <h3 className="map-title">Mapa Interaktiboa</h3>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater activeLocations={activeLocations} />
        {LOCATIONS.map((loc) => {
          const isHighlighted = activeLocations.includes(loc.id);
          return (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createIcon(loc.type, isHighlighted)}
            >
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                <span>{loc.description}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
