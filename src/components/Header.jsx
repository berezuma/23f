export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-wrapper">
          <div className="header-brand">
            <div className="brand-mark">
              <span className="brand-bar bar-ehaa" />
              <span className="brand-bar bar-nao" />
              <span className="brand-bar bar-bao" />
              <span className="brand-bar bar-botha" />
              <span className="brand-bar bar-gao" />
            </div>
            <div className="brand-text">
              <h1 className="brand-title">Aldizkari Ofizialen Ataria</h1>
              <p className="brand-subtitle">EAE eta Nafarroako xedapen eta iragarki ofizialak</p>
            </div>
          </div>

          <div className="header-search">
            <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Bilatu xedapenetan..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => onSearchChange('')}
                aria-label="Garbitu bilaketa"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="header-wrapper">
          <div className="nav-links">
            <a href="https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml" target="_blank" rel="noopener noreferrer" className="nav-link">EHAA</a>
            <a href="https://bon.navarra.es/eu/hasiera" target="_blank" rel="noopener noreferrer" className="nav-link">NAO</a>
            <a href="https://www.bizkaia.eus/eu/bao" target="_blank" rel="noopener noreferrer" className="nav-link">BAO</a>
            <a href="https://www.araba.eus/BOTHA/Inicio/SGBO5001.aspx?Idi=eu" target="_blank" rel="noopener noreferrer" className="nav-link">BOTHA</a>
            <a href="https://egoitza.gipuzkoa.eus/eu/GAO" target="_blank" rel="noopener noreferrer" className="nav-link">GAO</a>
            <span className="nav-separator" />
            <a href="https://www.euskadi.eus/aldizkari-ofizialak/web01-sede/eu/" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-muted">Euskadi.eus</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
