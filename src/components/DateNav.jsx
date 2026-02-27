function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('eu', options);
}

function formatDateShort(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('eu', options);
}

function isToday(dateStr) {
  return dateStr === new Date().toISOString().split('T')[0];
}

export default function DateNav({ dates, selectedDate, onSelect }) {
  return (
    <div className="filter-section date-nav">
      <h3 className="filter-title">Data</h3>
      <div className="date-buttons">
        {dates.map(date => (
          <button
            key={date}
            className={`date-btn ${selectedDate === date ? 'active' : ''}`}
            onClick={() => onSelect(date)}
          >
            <span className="date-btn-day">{formatDateShort(date)}</span>
            <span className="date-btn-label">
              {isToday(date) ? 'Gaur' : formatDate(date).split(',')[0]}
            </span>
          </button>
        ))}
      </div>
      {selectedDate && (
        <p className="date-selected">{formatDate(selectedDate)}</p>
      )}
    </div>
  );
}
