import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { BULLETINS, BULLETIN_ORDER, CATEGORIES } from './data/bulletins';
import { generateSampleData } from './data/sampleData';
import Header from './components/Header';
import BulletinFilter from './components/BulletinFilter';
import CategoryFilter from './components/CategoryFilter';
import DateNav from './components/DateNav';
import EntryCard from './components/EntryCard';
import StatsBar from './components/StatsBar';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [activeBulletins, setActiveBulletins] = useState(new Set(BULLETIN_ORDER));
  const [activeCategories, setActiveCategories] = useState(new Set(Object.keys(CATEGORIES)));
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}data/entries.json`);
        if (response.ok) {
          const data = await response.json();
          const fetched = data.entries || [];
          setEntries(fetched.length > 0 ? fetched : generateSampleData());
        } else {
          setEntries(generateSampleData());
        }
      } catch {
        setEntries(generateSampleData());
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const dates = useMemo(() => {
    const dateSet = new Set(entries.map(e => e.date));
    return [...dateSet].sort((a, b) => b.localeCompare(a));
  }, [entries]);

  const initialDateSet = useRef(false);
  if (dates.length > 0 && !selectedDate && !initialDateSet.current) {
    initialDateSet.current = true;
    setSelectedDate(dates[0]);
  }

  const toggleBulletin = useCallback((id) => {
    setActiveBulletins(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleCategory = useCallback((id) => {
    setActiveCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const resetCategories = useCallback(() => {
    setActiveCategories(new Set(Object.keys(CATEGORIES)));
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      if (!activeBulletins.has(entry.bulletinId)) return false;
      if (!activeCategories.has(entry.category)) return false;
      if (selectedDate && entry.date !== selectedDate) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          entry.title.toLowerCase().includes(q) ||
          entry.summary.toLowerCase().includes(q) ||
          entry.organism.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [entries, activeBulletins, activeCategories, selectedDate, searchQuery]);

  const groupedEntries = useMemo(() => {
    const groups = {};
    BULLETIN_ORDER.forEach(id => {
      if (activeBulletins.has(id)) {
        groups[id] = filteredEntries.filter(e => e.bulletinId === id);
      }
    });
    return groups;
  }, [filteredEntries, activeBulletins]);

  const stats = useMemo(() => {
    const byBulletin = {};
    BULLETIN_ORDER.forEach(id => {
      byBulletin[id] = entries.filter(e => e.date === selectedDate && e.bulletinId === id).length;
    });
    return {
      total: filteredEntries.length,
      byBulletin,
      date: selectedDate,
    };
  }, [entries, filteredEntries, selectedDate]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner" />
          <p>Datuak kargatzen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="main-content">
        <div className="content-wrapper">
          <aside className="sidebar">
            <DateNav
              dates={dates}
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />
            <BulletinFilter
              activeBulletins={activeBulletins}
              onToggle={toggleBulletin}
              stats={stats.byBulletin}
            />
            <CategoryFilter
              activeCategories={activeCategories}
              onToggle={toggleCategory}
              onReset={resetCategories}
            />
          </aside>

          <section className="entries-section">
            <StatsBar stats={stats} />

            {Object.entries(groupedEntries).map(([bulletinId, bulletinEntries]) => {
              if (bulletinEntries.length === 0) return null;
              const bulletin = BULLETINS[bulletinId];
              return (
                <div key={bulletinId} className="bulletin-group">
                  <div
                    className="bulletin-group-header"
                    style={{
                      '--bulletin-color': bulletin.color,
                      '--bulletin-bg': bulletin.bg,
                      '--bulletin-border': bulletin.border,
                    }}
                  >
                    <div className="bulletin-indicator" />
                    <div className="bulletin-group-info">
                      <h2 className="bulletin-group-name">{bulletin.name}</h2>
                      <span className="bulletin-group-full">{bulletin.fullName}</span>
                    </div>
                    <a
                      href={bulletin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bulletin-group-link"
                    >
                      Jatorrizko webgunea
                    </a>
                  </div>
                  <div className="bulletin-entries">
                    {bulletinEntries.map(entry => (
                      <EntryCard key={entry.id} entry={entry} bulletin={bulletin} />
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredEntries.length === 0 && (
              <div className="empty-state">
                <h3>Ez da emaitzarik aurkitu</h3>
                <p>Aldatu iragazkiak edo bilaketa hitza emaitzak ikusteko.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
