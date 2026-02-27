import { BULLETINS, BULLETIN_ORDER } from '../data/bulletins';

export default function BulletinFilter({ activeBulletins, onToggle, stats }) {
  return (
    <div className="filter-section">
      <h3 className="filter-title">Aldizkariak</h3>
      <div className="bulletin-filters">
        {BULLETIN_ORDER.map(id => {
          const b = BULLETINS[id];
          const isActive = activeBulletins.has(id);
          const count = stats[id] || 0;
          return (
            <button
              key={id}
              className={`bulletin-filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => onToggle(id)}
              style={{
                '--btn-color': b.color,
                '--btn-bg': b.bg,
                '--btn-border': b.border,
              }}
            >
              <span className="bf-indicator" />
              <span className="bf-content">
                <span className="bf-name">{b.name}</span>
                <span className="bf-territory">{b.territory}</span>
              </span>
              <span className="bf-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
