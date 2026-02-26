import { CHARACTER_LIST } from '../data/characters';

export default function TimelineEvent({ event, isActive, onClick, activeCharacters }) {
  const eventCharacters = CHARACTER_LIST.filter((c) =>
    event.characters.includes(c.id)
  );

  const isFiltered =
    activeCharacters.length > 0 &&
    event.characters.length > 0 &&
    !event.characters.some((cId) => activeCharacters.includes(cId));

  return (
    <div
      className={`timeline-event ${isActive ? 'active' : ''} ${isFiltered ? 'filtered-out' : ''}`}
      onClick={() => onClick(event)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(event)}
    >
      <div className="event-time-badge">
        <span className="event-time">{event.displayTime}</span>
      </div>

      <div className="event-connector">
        <div className="event-dot" />
        <div className="event-line" />
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>

        <div className="event-meta">
          {eventCharacters.map((c) => (
            <span
              key={c.id}
              className="character-tag"
              style={{ backgroundColor: c.color + '22', color: c.color, borderColor: c.color }}
            >
              {c.name}
            </span>
          ))}
          {event.document && (
            <span className="document-badge">📄 Dokumentua</span>
          )}
        </div>
      </div>
    </div>
  );
}
