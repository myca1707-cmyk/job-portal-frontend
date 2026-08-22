import { useState, useEffect } from 'react';

const API_BASE = 'https://job-portal-backend-production-6d9d.up.railway.app';

const DOMAINS = ['all', 'Engineering', 'Polytechnic', 'Arts and Science', 'ITI'];

function typeIcon(type) {
  if (type === 'Engineering') return '🏭';
  if (type === 'Polytechnic') return '🛠️';
  if (type === 'ITI') return '🔧';
  return '📘';
}

export default function CampusExploration() {
  const [city, setCity] = useState('');
  const [activeDomain, setActiveDomain] = useState('all');
  const [activeCourse, setActiveCourse] = useState('all');

  const [cityOptions, setCityOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const [colleges, setColleges] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/colleges/meta`)
      .then((res) => res.json())
      .then((data) => {
        setCityOptions(data.cities || []);
        setCourseOptions(data.courses || []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetchColleges(controller.signal);
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [city, activeDomain, activeCourse]);

  async function fetchColleges(signal) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (city.trim()) params.append('city', city.trim());
      if (activeDomain !== 'all') params.append('type', activeDomain);
      if (activeCourse !== 'all') params.append('course', activeCourse);

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

  function clearFilters() {
    setCity('');
    setActiveDomain('all');
    setActiveCourse('all');
  }

  const filtersActive = city.trim() !== '' || activeDomain !== 'all' || activeCourse !== 'all';

  return (
    <div className="campus-exploration">
      <div className="campus-filter-group">
        <label className="campus-filter-label">Location</label>
        <input
          type="text"
          list="campus-city-options"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search or select a city"
          className="campus-search-input"
        />
        <datalist id="campus-city-options">
          {cityOptions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div className="campus-filter-group">
        <label className="campus-filter-label">Domain</label>
        <div className="campus-type-filters">
          {DOMAINS.map((d) => (
            <button
              key={d}
              className={`campus-type-btn ${activeDomain === d ? 'active' : ''}`}
              onClick={() => setActiveDomain(d)}
            >
              {d === 'all' ? 'All' : d}
            </button>
          ))}
        </div>
      </div>

      <div className="campus-filter-group">
        <label className="campus-filter-label">Course</label>
        <select
          value={activeCourse}
          onChange={(e) => setActiveCourse(e.target.value)}
          className="campus-search-input"
        >
          <option value="all">All courses</option>
          {courseOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtersActive && (
        <button className="btn-link campus-clear-btn" onClick={clearFilters}>
          Clear all filters
        </button>
      )}

      <p className="campus-result-count">
        {loading ? 'Searching…' : `${colleges.length} colleges found`}
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
                  <p className="campus-college-sub">{c.type} · {c.city}{c.area ? ` · ${c.area}` : ''}</p>
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
          <p className="campus-empty">No colleges found. Try different filters.</p>
        )}
      </div>
    </div>
  );
}