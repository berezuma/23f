import { CATEGORIES } from '../data/bulletins';

export default function EntryCard({ entry, bulletin }) {
  const category = CATEGORIES[entry.category];

  return (
    <article
      className="entry-card"
      style={{
        '--card-color': bulletin.color,
        '--card-bg': bulletin.bg,
        '--card-border': bulletin.border,
      }}
    >
      <div className="entry-card-top">
        <span className="entry-category">{category?.label || entry.category}</span>
        {entry.bulletinNumber && (
          <span className="entry-number">Zk. {entry.bulletinNumber}</span>
        )}
      </div>

      <h3 className="entry-title">{entry.title}</h3>

      <p className="entry-summary">{entry.summary}</p>

      <div className="entry-footer">
        <span className="entry-organism">{entry.organism}</span>
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="entry-link"
        >
          Irakurri gehiago
          <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </article>
  );
}
