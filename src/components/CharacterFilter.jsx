import { CHARACTER_LIST } from '../data/characters';

export default function CharacterFilter({ activeCharacters, onToggle }) {
  return (
    <div className="character-filter">
      <h3 className="filter-title">Pertsonaiak</h3>
      <div className="filter-chips">
        {CHARACTER_LIST.map((c) => {
          const isActive = activeCharacters.includes(c.id);
          return (
            <button
              key={c.id}
              className={`filter-chip ${isActive ? 'active' : ''}`}
              style={{
                '--chip-color': c.color,
                backgroundColor: isActive ? c.color : 'transparent',
                color: isActive ? '#fff' : c.color,
                borderColor: c.color,
              }}
              onClick={() => onToggle(c.id)}
              title={c.role}
            >
              <span className="chip-dot" style={{ backgroundColor: isActive ? '#fff' : c.color }} />
              {c.name}
            </button>
          );
        })}
        {activeCharacters.length > 0 && (
          <button
            className="filter-chip clear-filter"
            onClick={() => activeCharacters.forEach((id) => onToggle(id))}
          >
            ✕ Garbitu
          </button>
        )}
      </div>
    </div>
  );
}
