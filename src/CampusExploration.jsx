import { useState, useEffect } from 'react';

const API_BASE = 'https://job-portal-backend-production-6d9d.up.railway.app';

const TYPES = ['all', 'Engineering', 'Polytechnic', 'Arts and Science', 'ITI'];

function typeIcon(type) {
  if (type === 'Engineering') return '🏭';
  if (type === 'Polytechnic') return '🛠️';
  if (type === 'ITI') return '🔧';
  return '📘';
}

export default function CampusExploration() {
  const [city, setCity] = useState('Hosur');
  const [activeType, setActiveType] = useState('all');
  const [colleges, setColleges] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetchColleges(controller.signal);
    }, 300); // debounce typing

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [city, activeType]);

  async function fetchColleges(signal) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (city.trim()) params.append('city', city.trim());
      if (activeType !== 'all') params.append('type', activeType);

      const res = await fetch(`${API_BASE}/colleges?${params.toString()}`, { signal });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setColleges(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Could not load colleges. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="campus-exploration">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city or location"
        className="campus-search-input"
      />

      <div className="campus-type-filters">
        {TYPES.map((t) => (
          <button
            key={t}
            className={`campus-type-btn ${activeType === t ? 'active' : ''}`}
            onClick={() => setActiveType(t)}
          >
            {t === 'all' ? 'All' : t}
          </button>
        ))}
      </div>

      <p className="campus-result-count">
        {loading ? 'Searching…' : `${colleges.length} colleges near ${city || 'your area'}`}
      </p>

      {error && <p className="campus-error">{error}</p>}

      <div className="campus-college-list">
        {colleges.map((c) => {
          const isOpen = openId === c.id;
          return (
            <div key={c.id} className="campus-college-card">
              <button
                className="campus-college-header"
                onClick={() => setOpenId(isOpen ? null : c.id)}
              >
                <span className="campus-college-icon">{typeIcon(c.type)}</span>
                <div className="campus-college-meta">
                  <p className="campus-college-name">{c.name}</p>
                  <p className="campus-college-sub">{c.type} · {c.area}</p>
                </div>
                <span className={`campus-chevron ${isOpen ? 'open' : ''}`}>▾</span>
              </button>

              {isOpen && (
                <div className="campus-college-body">
                  <p className="campus-courses-label">Courses offered</p>
                  <ul className="campus-courses-list">
                    {(c.courses || '').split(',').map((course, i) => (
                      <li key={i}>{course.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {!loading && colleges.length === 0 && !error && (
          <p className="campus-empty">No colleges found for this search. Try a different city or filter.</p>
        )}
      </div>
    </div>
  );
}