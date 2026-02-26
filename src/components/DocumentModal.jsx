import { CHARACTER_LIST } from '../data/characters';
import { LOCATIONS } from '../data/locations';

export default function DocumentModal({ event, onClose }) {
  if (!event) return null;

  const eventCharacters = CHARACTER_LIST.filter((c) =>
    event.characters.includes(c.id)
  );
  const eventLocations = LOCATIONS.filter((l) =>
    event.locations.includes(l.id)
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <span className="modal-time">{event.displayTime}</span>
          <h2 className="modal-title">{event.title}</h2>
        </div>

        <div className="modal-body">
          <p className="modal-description">{event.description}</p>

          {eventCharacters.length > 0 && (
            <div className="modal-section">
              <h4>Inplikatutako pertsonaiak</h4>
              <div className="modal-characters">
                {eventCharacters.map((c) => (
                  <div key={c.id} className="modal-character">
                    <div
                      className="character-avatar"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <strong style={{ color: c.color }}>{c.name}</strong>
                      <br />
                      <small>{c.role}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {eventLocations.length > 0 && (
            <div className="modal-section">
              <h4>Kokalekuak</h4>
              <ul className="modal-locations">
                {eventLocations.map((l) => (
                  <li key={l.id}>
                    <strong>{l.name}</strong> — {l.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.document && (
            <div className="modal-section modal-document">
              <h4>Dokumentu desklasifikatua</h4>
              <div className="document-card">
                <div className="document-icon">📄</div>
                <div className="document-info">
                  <strong>{event.document.title}</strong>
                  <br />
                  <small>Iturria: {event.document.source}</small>
                </div>
                <a
                  href={event.document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="document-link"
                >
                  Ikusi dokumentua ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
