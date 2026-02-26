import { useState, useRef, useCallback, useEffect } from 'react';
import { EVENTS, PHASES } from './data/events';
import TimelineEvent from './components/TimelineEvent';
import CharacterFilter from './components/CharacterFilter';
import InteractiveMap from './components/InteractiveMap';
import DocumentModal from './components/DocumentModal';
import PhaseNav from './components/PhaseNav';
import 'leaflet/dist/leaflet.css';
import './App.css';

export default function App() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeCharacters, setActiveCharacters] = useState([]);
  const [activePhase, setActivePhase] = useState(null);
  const phaseRefs = useRef({});

  const activeLocations = activeEvent ? activeEvent.locations : [];

  const handleEventClick = useCallback((event) => {
    setActiveEvent(event);
    setSelectedEvent(event);
  }, []);

  const handleCharacterToggle = useCallback((characterId) => {
    setActiveCharacters((prev) =>
      prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]
    );
  }, []);

  const handlePhaseClick = useCallback((phaseKey) => {
    setActivePhase(phaseKey);
    const el = phaseRefs.current[phaseKey];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const groupedEvents = Object.keys(PHASES).map((phaseKey) => ({
    phase: phaseKey,
    ...PHASES[phaseKey],
    events: EVENTS.filter((e) => e.phase === phaseKey),
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-flag">
            <span className="flag-stripe red" />
            <span className="flag-stripe yellow" />
            <span className="flag-stripe red" />
          </div>
          <h1 className="app-title">23-F Orduz Ordu</h1>
          <p className="app-subtitle">
            1981eko otsailaren 23ko Estatu kolpearen kronologia interaktiboa
          </p>
          <p className="app-meta">
            Espainiako Gobernuak 2026an desklasifikatutako 153 dokumentuetan oinarritua
          </p>
        </div>
      </header>

      <PhaseNav activePhase={activePhase} onPhaseClick={handlePhaseClick} />

      <CharacterFilter
        activeCharacters={activeCharacters}
        onToggle={handleCharacterToggle}
      />

      <div className="main-layout">
        <div className="timeline-panel">
          {groupedEvents.map((group) => (
            <div
              key={group.phase}
              className="phase-group"
              ref={(el) => (phaseRefs.current[group.phase] = el)}
            >
              <div className="phase-header" style={{ '--phase-color': group.color }}>
                <div className="phase-line" style={{ backgroundColor: group.color }} />
                <h2 className="phase-label">{group.label}</h2>
              </div>
              {group.events.map((event) => (
                <TimelineEvent
                  key={event.id}
                  event={event}
                  isActive={activeEvent?.id === event.id}
                  onClick={handleEventClick}
                  activeCharacters={activeCharacters}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="map-panel">
          <InteractiveMap activeLocations={activeLocations} />
          <div className="map-legend">
            <h4>Kokalekuak</h4>
            <div className="legend-items">
              <span className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#e74c3c' }} /> Gune nagusiak
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#3498db' }} /> Bigarren mailakoak
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#2c3e50' }} /> Kuartel militarrak
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>
          Iturria:{' '}
          <a
            href="https://www.lamoncloa.gob.es/consejodeministros/paginas/desclasificacion-documentos-23F.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            La Moncloa — Dokumentu desklasifikatuak 23-F
          </a>
        </p>
        <p className="footer-note">
          Hezkuntza-helbururako tresna interaktiboa. 2026ko otsailean desklasifikatutako 153 dokumentuetan oinarritua.
        </p>
      </footer>

      <DocumentModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
