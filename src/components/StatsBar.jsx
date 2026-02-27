function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T12:00:00');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('eu', options);
}

export default function StatsBar({ stats }) {
  return (
    <div className="stats-bar">
      <div className="stats-info">
        <span className="stats-count">{stats.total} xedapen</span>
        <span className="stats-date">{formatDate(stats.date)}</span>
      </div>
      <div className="stats-note">
        Egunero eguneratua, goizeko 09:00etan
      </div>
    </div>
  );
}
