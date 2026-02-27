import { CATEGORIES } from '../data/bulletins';

export default function CategoryFilter({ activeCategories, onToggle, onReset }) {
  const allActive = activeCategories.size === Object.keys(CATEGORIES).length;

  return (
    <div className="filter-section">
      <div className="filter-title-row">
        <h3 className="filter-title">Kategoriak</h3>
        {!allActive && (
          <button className="filter-reset" onClick={onReset}>
            Guztiak
          </button>
        )}
      </div>
      <div className="category-filters">
        {Object.entries(CATEGORIES).map(([id, cat]) => {
          const isActive = activeCategories.has(id);
          return (
            <button
              key={id}
              className={`category-filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => onToggle(id)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
