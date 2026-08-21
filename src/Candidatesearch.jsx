import React, { useState, useMemo } from "react";

// ---------- Mock data (replace with your FastAPI candidate search response) ----------
const CANDIDATES = [
  { name: "Ananya Rao", title: "Frontend Engineer", location: "Bengaluru, IN", exp: 4, skills: ["React", "TypeScript", "CSS", "Redux"], availability: "Immediate", workMode: "Remote", match: 96, activeDaysAgo: 1 },
  { name: "Devesh Kulkarni", title: "Backend Engineer", location: "Pune, IN", exp: 6, skills: ["Node.js", "Python", "AWS", "PostgreSQL"], availability: "2 weeks", workMode: "Hybrid", match: 91, activeDaysAgo: 3 },
  { name: "Meera Iyer", title: "UI/UX Designer", location: "Chennai, IN", exp: 3, skills: ["Figma", "UI/UX", "Prototyping"], availability: "Immediate", workMode: "Remote", match: 88, activeDaysAgo: 2 },
  { name: "Rohit Sharma", title: "Sales Operations Lead", location: "Hosur, IN", exp: 7, skills: ["CRM", "Salesforce", "Forecasting"], availability: "1 month", workMode: "Onsite", match: 74, activeDaysAgo: 12 },
  { name: "Priya Natarajan", title: "Data Analyst", location: "Coimbatore, IN", exp: 2, skills: ["SQL", "Python", "Data Analysis", "Excel"], availability: "Immediate", workMode: "Hybrid", match: 83, activeDaysAgo: 5 },
  { name: "Karthik Subramanian", title: "Java Developer", location: "Bengaluru, IN", exp: 9, skills: ["Java", "Spring Boot", "AWS", "Microservices"], availability: "2 weeks", workMode: "Onsite", match: 79, activeDaysAgo: 8 },
  { name: "Sneha Reddy", title: "HR Business Partner", location: "Hyderabad, IN", exp: 5, skills: ["Recruiting", "Onboarding", "HRIS"], availability: "1 month", workMode: "Hybrid", match: 69, activeDaysAgo: 20 },
  { name: "Arjun Menon", title: "DevOps Engineer", location: "Kochi, IN", exp: 4, skills: ["AWS", "Docker", "Kubernetes", "CI/CD"], availability: "Immediate", workMode: "Remote", match: 92, activeDaysAgo: 1 },
  { name: "Divya Krishnan", title: "Content Marketing Manager", location: "Chennai, IN", exp: 6, skills: ["SEO", "Content Strategy", "Analytics"], availability: "2 weeks", workMode: "Remote", match: 65, activeDaysAgo: 15 },
  { name: "Vikram Nair", title: "QA Engineer", location: "Bengaluru, IN", exp: 3, skills: ["Selenium", "Manual Testing", "API Testing"], availability: "Immediate", workMode: "Onsite", match: 81, activeDaysAgo: 4 },
];

const ALL_SKILLS = [...new Set(CANDIDATES.flatMap((c) => c.skills))].sort();

function initials(name) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
function expBucket(exp) {
  if (exp <= 2) return "0-2";
  if (exp <= 5) return "3-5";
  if (exp <= 9) return "6-9";
  return "10+";
}
function availClass(a) {
  if (a === "Immediate") return "avail-immediate";
  if (a === "2 weeks") return "avail-2weeks";
  return "avail-1month";
}

function MatchBars({ match }) {
  const litCount = Math.round(match / 20);
  return (
    <div className="match-bars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= litCount ? "lit" : ""} />
      ))}
    </div>
  );
}

function CandidateCard({ candidate, isShortlisted, onShortlistToggle, onViewProfile }) {
  const visibleSkills = candidate.skills.slice(0, 4);
  const extra = candidate.skills.length - visibleSkills.length;

  return (
    <div className="card">
      <div className="card-top">
        <div className="avatar">{initials(candidate.name)}</div>
        <div className="card-id">
          <p className="card-name">{candidate.name}</p>
          <p className="card-title">{candidate.title}</p>
          <p className="card-loc">
            {candidate.location} &middot; {candidate.workMode}
          </p>
        </div>
        <div className="match">
          <MatchBars match={candidate.match} />
          <span className="match-pct">{candidate.match}% match</span>
        </div>
      </div>

      <hr className="divider" />

      <div className="skills-row">
        {visibleSkills.map((s) => (
          <span className="skill-tag" key={s}>{s}</span>
        ))}
        {extra > 0 && <span className="skill-tag extra">+{extra} more</span>}
      </div>

      <div className="meta-row">
        <span className="meta-item">{candidate.exp} yrs experience</span>
        <span className={`meta-item ${availClass(candidate.availability)}`}>{candidate.availability}</span>
      </div>

      <div className="card-actions">
        <button className="btn btn-primary" onClick={() => onViewProfile(candidate)}>
          View profile
        </button>
        <button
          className={`btn btn-outline ${isShortlisted ? "shortlisted" : ""}`}
          onClick={() => onShortlistToggle(candidate.name)}
        >
          {isShortlisted ? "\u2713 Shortlisted" : "+ Shortlist"}
        </button>
      </div>
    </div>
  );
}

export default function CandidateSearch({ candidates = CANDIDATES, onViewProfile = () => {} }) {
  const [search, setSearch] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [exp, setExp] = useState("");
  const [avail, setAvail] = useState("");
  const [skills, setSkills] = useState(new Set());
  const [sort, setSort] = useState("match");
  const [shortlisted, setShortlisted] = useState(new Set());

  const toggleSkill = (skill) => {
    setSkills((prev) => {
      const next = new Set(prev);
      next.has(skill) ? next.delete(skill) : next.add(skill);
      return next;
    });
  };

  const toggleShortlist = (name) => {
    setShortlisted((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setWorkMode("");
    setExp("");
    setAvail("");
    setSkills(new Set());
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = candidates.filter((c) => {
      if (q) {
        const hay = (c.name + " " + c.title + " " + c.skills.join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (workMode && c.workMode !== workMode) return false;
      if (exp && expBucket(c.exp) !== exp) return false;
      if (avail && c.availability !== avail) return false;
      if (skills.size > 0) {
        for (const s of skills) if (!c.skills.includes(s)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "match") return b.match - a.match;
      if (sort === "experience") return b.exp - a.exp;
      return a.activeDaysAgo - b.activeDaysAgo; // "active"
    });

    return list;
  }, [candidates, search, workMode, exp, avail, skills, sort]);

  const sortLabel = sort === "match" ? "match" : sort === "experience" ? "experience" : "activity";

  return (
    <div className="ct-candidate-search">
      <div className="topbar">
        <div className="topbar-inner">
          <div className="logo">
            <span className="dot" />CoreTech Talents
          </div>
          <div className="topbar-crumb">
            Recruiter workspace <b>&middot; Candidate search</b>
          </div>
        </div>
      </div>

      <div className="hero">
        <div className="hero-inner">
          <h1>Find your next hire</h1>
          <p>
            {shortlisted.size} candidate{shortlisted.size === 1 ? "" : "s"} shortlisted
          </p>
          <div className="searchbar">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, title, or skill — e.g. React, Sales Ops, UI Designer"
            />
            <select value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
              <option value="">Any work mode</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
            <button className="search-btn" type="button">Search</button>
          </div>
        </div>
      </div>

      <div className="app">
        <div className="layout">
          <aside className="panel filters">
            <h3>
              Filters
              <button className="clear" onClick={resetFilters} type="button">Clear all</button>
            </h3>

            <div className="filter-group">
              <label className="group-label" htmlFor="expSelect">Experience</label>
              <select id="expSelect" value={exp} onChange={(e) => setExp(e.target.value)}>
                <option value="">Any experience</option>
                <option value="0-2">0–2 years</option>
                <option value="3-5">3–5 years</option>
                <option value="6-9">6–9 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="group-label" htmlFor="availSelect">Availability</label>
              <select id="availSelect" value={avail} onChange={(e) => setAvail(e.target.value)}>
                <option value="">Any availability</option>
                <option value="Immediate">Immediate</option>
                <option value="2 weeks">2 weeks notice</option>
                <option value="1 month">1 month notice</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="group-label">Skills</label>
              <div className="chip-row">
                {ALL_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className={`skill-chip ${skills.has(skill) ? "active" : ""}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main>
            <div className="results-bar">
              <div className="results-count">
                <b>{filtered.length}</b> candidates &middot; ranked by <span className="mono">{sortLabel}</span>
              </div>
              <div className="sort-wrap">
                <label htmlFor="sortSelect">Sort by</label>
                <select id="sortSelect" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="match">Best match</option>
                  <option value="experience">Most experienced</option>
                  <option value="active">Recently active</option>
                </select>
              </div>
            </div>

            <div className="grid">
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="big">No candidates match these filters</div>
                  <div>Try widening the skill selection or clearing a filter.</div>
                  <button onClick={resetFilters} type="button">Clear all filters</button>
                </div>
              ) : (
                filtered.map((c) => (
                  <CandidateCard
                    key={c.name}
                    candidate={c}
                    isShortlisted={shortlisted.has(c.name)}
                    onShortlistToggle={toggleShortlist}
                    onViewProfile={onViewProfile}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .ct-candidate-search {
          --bg:#FFFFFF; --surface:#F3F7FD; --surface-hover:#EAF1FC;
          --ink:#0B1B33; --ink-soft:#56637D; --ink-faint:#8A96AC;
          --line:#DCE6F5; --line-strong:#C3D5F0;
          --navy:#0E2A63; --navy-800:#123170;
          --blue:#2454E0; --blue-hover:#1A45C4; --blue-100:#E4ECFE; --blue-050:#F3F7FD;
          --radius-sm:8px; --radius-md:12px; --radius-lg:16px;
          --shadow-card:0 1px 2px rgba(14,42,99,0.06), 0 8px 24px rgba(14,42,99,0.05);
          --shadow-card-hover:0 4px 10px rgba(14,42,99,0.08), 0 16px 32px rgba(14,42,99,0.09);
          background:var(--bg); color:var(--ink);
          font-family:'Inter',system-ui,sans-serif;
        }
        .ct-candidate-search *{box-sizing:border-box;}
        .ct-candidate-search .app{max-width:1180px;margin:0 auto;padding:0 24px 64px;}
        .ct-candidate-search .topbar{background:var(--navy);color:#fff;padding:14px 0;}
        .ct-candidate-search .topbar-inner{max-width:1180px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:20px;}
        .ct-candidate-search .logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;letter-spacing:-0.01em;display:flex;align-items:center;gap:8px;white-space:nowrap;}
        .ct-candidate-search .logo .dot{width:8px;height:8px;border-radius:50%;background:#4E7DFF;display:inline-block;}
        .ct-candidate-search .topbar-crumb{font-size:13px;color:#AFC2F0;font-weight:500;}
        .ct-candidate-search .topbar-crumb b{color:#fff;font-weight:600;}
        .ct-candidate-search .hero{background:linear-gradient(180deg,var(--navy) 0%, var(--navy-800) 100%);padding:28px 0 84px;margin-bottom:-56px;}
        .ct-candidate-search .hero-inner{max-width:1180px;margin:0 auto;padding:0 24px;}
        .ct-candidate-search .hero h1{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:600;color:#fff;margin:0 0 4px;letter-spacing:-0.01em;}
        .ct-candidate-search .hero p{margin:0;color:#AFC2F0;font-size:14px;}
        .ct-candidate-search .searchbar{margin-top:20px;background:#fff;border-radius:var(--radius-lg);box-shadow:0 12px 32px rgba(4,17,45,0.28);padding:8px;display:flex;gap:8px;align-items:center;}
        .ct-candidate-search .searchbar input[type="text"]{flex:1;border:none;outline:none;font-family:'Inter',sans-serif;font-size:15px;color:var(--ink);padding:12px 14px;background:transparent;}
        .ct-candidate-search .searchbar input::placeholder{color:var(--ink-faint);}
        .ct-candidate-search .icon-wrap{color:var(--ink-faint);padding-left:8px;display:flex;}
        .ct-candidate-search .searchbar select{border:none;border-left:1px solid var(--line);font-family:'Inter',sans-serif;font-size:14px;color:var(--ink-soft);padding:12px 10px;background:transparent;outline:none;cursor:pointer;}
        .ct-candidate-search .search-btn{background:var(--blue);color:#fff;border:none;border-radius:var(--radius-md);padding:12px 22px;font-family:'Inter',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:background .15s ease;white-space:nowrap;}
        .ct-candidate-search .search-btn:hover{background:var(--blue-hover);}
        .ct-candidate-search .layout{position:relative;display:grid;grid-template-columns:240px 1fr;gap:24px;}
        .ct-candidate-search .panel{background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow-card);}
        .ct-candidate-search .filters{padding:20px;align-self:start;position:sticky;top:24px;}
        .ct-candidate-search .filters h3{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;margin:0 0 14px;display:flex;align-items:center;justify-content:space-between;}
        .ct-candidate-search .filters .clear{font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:var(--blue);background:none;border:none;cursor:pointer;padding:0;}
        .ct-candidate-search .filter-group{margin-bottom:20px;}
        .ct-candidate-search .filter-group:last-child{margin-bottom:0;}
        .ct-candidate-search .filter-group label.group-label{display:block;font-size:12px;font-weight:600;color:var(--ink-soft);text-transform:uppercase;letter-spacing:.04em;margin-bottom:10px;}
        .ct-candidate-search .filter-group select{width:100%;padding:9px 10px;border:1px solid var(--line);border-radius:var(--radius-sm);font-family:'Inter',sans-serif;font-size:13px;color:var(--ink);background:#fff;cursor:pointer;}
        .ct-candidate-search .chip-row{display:flex;flex-wrap:wrap;gap:6px;}
        .ct-candidate-search .skill-chip{font-family:'Inter',sans-serif;font-size:12.5px;font-weight:500;padding:6px 11px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--ink-soft);cursor:pointer;user-select:none;transition:all .12s ease;}
        .ct-candidate-search .skill-chip:hover{border-color:var(--line-strong);background:var(--surface);}
        .ct-candidate-search .skill-chip.active{background:var(--blue);border-color:var(--blue);color:#fff;}
        .ct-candidate-search .results-bar{display:flex;align-items:center;justify-content:space-between;margin:0 0 16px;flex-wrap:wrap;gap:10px;}
        .ct-candidate-search .results-count{font-size:14px;color:var(--ink-soft);}
        .ct-candidate-search .results-count b{color:var(--ink);font-weight:600;}
        .ct-candidate-search .results-count .mono{font-family:'IBM Plex Mono',monospace;}
        .ct-candidate-search .sort-wrap{display:flex;align-items:center;gap:8px;}
        .ct-candidate-search .sort-wrap label{font-size:13px;color:var(--ink-soft);}
        .ct-candidate-search .sort-wrap select{padding:8px 10px;border:1px solid var(--line);border-radius:var(--radius-sm);font-family:'Inter',sans-serif;font-size:13px;color:var(--ink);background:#fff;cursor:pointer;}
        .ct-candidate-search .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .ct-candidate-search .card{background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);padding:18px;box-shadow:var(--shadow-card);transition:box-shadow .15s ease, transform .15s ease, border-color .15s ease;}
        .ct-candidate-search .card:hover{box-shadow:var(--shadow-card-hover);transform:translateY(-2px);border-color:var(--line-strong);}
        .ct-candidate-search .card-top{display:flex;align-items:flex-start;gap:12px;}
        .ct-candidate-search .avatar{width:46px;height:46px;border-radius:50%;flex-shrink:0;background:var(--blue-100);color:var(--navy);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;}
        .ct-candidate-search .card-id{flex:1;min-width:0;}
        .ct-candidate-search .card-name{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:16px;margin:0 0 2px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .ct-candidate-search .card-title{font-size:13px;color:var(--ink-soft);margin:0;}
        .ct-candidate-search .card-loc{font-size:12.5px;color:var(--ink-faint);margin:3px 0 0;display:flex;align-items:center;gap:4px;}
        .ct-candidate-search .match{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;}
        .ct-candidate-search .match-bars{display:flex;align-items:flex-end;gap:2px;height:20px;}
        .ct-candidate-search .match-bars span{width:4px;border-radius:2px;background:var(--blue-100);}
        .ct-candidate-search .match-bars span:nth-child(1){height:6px;}
        .ct-candidate-search .match-bars span:nth-child(2){height:10px;}
        .ct-candidate-search .match-bars span:nth-child(3){height:14px;}
        .ct-candidate-search .match-bars span:nth-child(4){height:17px;}
        .ct-candidate-search .match-bars span:nth-child(5){height:20px;}
        .ct-candidate-search .match-bars span.lit{background:var(--blue);}
        .ct-candidate-search .match-pct{font-family:'IBM Plex Mono',monospace;font-size:11.5px;font-weight:600;color:var(--blue);}
        .ct-candidate-search .divider{border:none;border-top:1px solid var(--line);margin:14px 0;}
        .ct-candidate-search .skills-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;}
        .ct-candidate-search .skill-tag{font-family:'Inter',sans-serif;font-size:11.5px;font-weight:500;padding:4px 9px;border-radius:999px;background:var(--surface);color:var(--navy-800);border:1px solid var(--line);}
        .ct-candidate-search .skill-tag.extra{color:var(--ink-faint);background:transparent;border-style:dashed;}
        .ct-candidate-search .meta-row{display:flex;align-items:center;gap:14px;margin-bottom:16px;font-size:12.5px;color:var(--ink-soft);flex-wrap:wrap;}
        .ct-candidate-search .avail-immediate{color:#0E7A4F;}
        .ct-candidate-search .avail-2weeks{color:#8A6A0E;}
        .ct-candidate-search .avail-1month{color:var(--ink-faint);}
        .ct-candidate-search .card-actions{display:flex;gap:8px;}
        .ct-candidate-search .btn{flex:1;padding:9px 14px;border-radius:var(--radius-sm);font-family:'Inter',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-align:center;transition:all .12s ease;border:1px solid transparent;}
        .ct-candidate-search .btn-primary{background:var(--blue);color:#fff;}
        .ct-candidate-search .btn-primary:hover{background:var(--blue-hover);}
        .ct-candidate-search .btn-outline{background:#fff;color:var(--blue);border-color:var(--blue-100);}
        .ct-candidate-search .btn-outline:hover{background:var(--blue-050);}
        .ct-candidate-search .btn-outline.shortlisted{background:var(--navy);color:#fff;border-color:var(--navy);}
        .ct-candidate-search .empty-state{grid-column:1/-1;text-align:center;padding:64px 20px;color:var(--ink-soft);}
        .ct-candidate-search .empty-state .big{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:600;color:var(--ink);margin-bottom:6px;}
        .ct-candidate-search .empty-state button{margin-top:14px;background:var(--blue);color:#fff;border:none;border-radius:var(--radius-sm);padding:9px 18px;font-weight:600;font-size:13px;cursor:pointer;}
        @media (max-width:820px){
          .ct-candidate-search .layout{grid-template-columns:1fr;}
          .ct-candidate-search .grid{grid-template-columns:1fr;}
          .ct-candidate-search .filters{position:static;}
          .ct-candidate-search .searchbar{flex-wrap:wrap;}
          .ct-candidate-search .searchbar select{border-left:none;border-top:1px solid var(--line);width:100%;}
        }
      `}</style>
    </div>
  );
}