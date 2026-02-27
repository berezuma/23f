import { BULLETINS, BULLETIN_ORDER } from '../data/bulletins';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-wrapper">
        <div className="footer-grid">
          <div className="footer-about">
            <h4 className="footer-heading">Aldizkari Ofizialen Ataria</h4>
            <p className="footer-text">
              Euskal Autonomia Erkidegoko eta Nafarroako bost aldizkari ofizialetako
              xedapen eta iragarki nagusiak leku bakarrean biltzen dituen ataria.
              Informazioa egunero eguneratzen da, goizeko 09:00etan.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Jatorrizko iturriak</h4>
            <ul className="footer-link-list">
              {BULLETIN_ORDER.map(id => {
                const b = BULLETINS[id];
                return (
                  <li key={id}>
                    <a href={b.url} target="_blank" rel="noopener noreferrer">
                      {b.name} -- {b.fullName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-info">
            <h4 className="footer-heading">Informazioa</h4>
            <p className="footer-text">
              Atari honek aldizkari ofizialetako informazioa biltzen du,
              baina ez du jatorrizko argitalpenen ordezko baliorik.
              Dokumentu ofiziala kontsultatzeko, jo jatorrizko estekara.
            </p>
            <p className="footer-text">
              <a
                href="https://www.euskadi.eus/aldizkari-ofizialak/web01-sede/eu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Euskadi.eus -- Aldizkari ofizialak
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Datu irekien ataria. Informazio publikoaren berrerabilpena sustatuz.</p>
        </div>
      </div>
    </footer>
  );
}
