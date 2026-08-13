import { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/coretech-logo.png";
import introVideo from "./assets/intro.mp4";
import CookieConsent from "./CookieConsent";

const API_BASE = "https://job-portal-backend-production-6d9d.up.railway.app";

// ================= ABOUT SECTION (tabbed: About Us / Founder / Vision / Mission / Achievements) =================
function AboutSection() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About Us" },
    { id: "founder", label: "Founder" },
    { id: "vision", label: "Vision" },
    { id: "mission", label: "Mission" },
    { id: "achievements", label: "Achievements" },
  ];

  const content = {
    about: {
      title: "About Us",
      body: "CoreTech Talents is a recruitment and staffing company focused on connecting skilled talent with manufacturing and corporate organizations across India. Built on hands-on industry knowledge and a deep understanding of technical hiring needs, we specialize in sourcing candidates for machining, production, and industrial roles, as well as corporate support functions. As a lean, founder-led operation, we work closely with every client to understand their specific hiring challenges — moving fast without compromising on candidate quality.",
    },
    vision: {
      title: "Vision",
      body: "To become a trusted staffing partner of choice for manufacturing and industrial businesses across India, known for building talent pipelines that are fast, reliable, and built on genuine relationships with candidates and training communities rather than one-off transactions.",
    },
    mission: {
      title: "Mission",
      body: "To bridge the gap between skilled talent and growing manufacturing and corporate businesses by delivering fast, precise, and dependable recruitment — combining industry-specific expertise with a personal, relationship-driven approach to hiring that benefits both clients and candidates.",
    },
    achievements: {
      title: "Achievements",
      body: "PLACEHOLDER — tell me what to put here (years in business, placements made, clients served, notable partnerships, etc.) and I'll fill it in.",
    },
    founder: {
      title: "Meet the Founder",
      paragraphs: [
        "The founder has spent a decade learning exactly what makes hiring work — and what holds businesses and candidates back. That depth of experience isn't just a resume line; it's the foundation this entire platform is built on.",
        "A constant drive to evolve and do better is what led him to build CoreTech Talents' own recruitment portal — a platform designed to ease the job search for candidates and simplify hiring for recruiters. Where traditional recruitment often felt slow and disconnected, he saw an opportunity to make it faster, fairer, and more human.",
        "Hard work, consistency, and a refusal to settle for 'good enough' define how he operates. Every improvement to this platform comes from the same relentless mindset that built his career: show up, solve real problems, and keep pushing forward.",
        "This platform is more than a business — it's a personal commitment to India's growth. By closing the gap between skilled talent and the companies that need them, he hopes this initiative plays its part in building a stronger, more connected, and more opportunity-rich job market for the country.",
      ],
    },
  };

  const active = content[activeTab];

  return (
    <div className="container" id="about-section" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 className="page-title">About</h2>
        <p className="card-desc">Who we are, what drives us, and where we're headed.</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.6rem 1.4rem",
              borderRadius: "999px",
              border: activeTab === tab.id ? "2px solid #1a1a1a" : "1px solid #ccc",
              background: activeTab === tab.id ? "#1a1a1a" : "#fff",
              color: activeTab === tab.id ? "#fff" : "#333",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "founder" ? (
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto 1.5rem",
              background: "rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span className="hint">Founder Photo</span>
          </div>

          <h3 style={{ marginBottom: "1rem" }}>{content.founder.title}</h3>
          {content.founder.paragraphs.map((para, i) => (
            <p key={i} className="card-meta" style={{ marginBottom: "1rem", textAlign: "left" }}>
              {para}
            </p>
          ))}
        </div>
      ) : (
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h3 style={{ marginBottom: "0.75rem" }}>{active.title}</h3>
          <p className="card-meta">{active.body}</p>
        </div>
      )}
    </div>
  );
}

// ================= SERVICES PAGE =================
function ServicesPage({ onCampusExploration }) {
  const [expanded, setExpanded] = useState(null);

  const services = [
    {
      id: "campus",
      title: "Campus Exploration",
      summary: "Direct access to fresh graduate talent through structured campus partnerships and drives.",
      isRecruiterOnly: true,
    },
    {
      id: "techNonTech",
      title: "Tech and Non Tech Hiring",
      summary: "Permanent placement solutions across technical and non-technical roles.",
      body: "From engineering and IT roles to operations, admin, and support functions, we focus on permanent placement solutions — matching candidates to long-term roles rather than short-term or temporary staffing.",
    },
    {
      id: "rpo",
      title: "Coretech Expert Solutions",
      summary: "RPO-style support with a dedicated recruitment expert working alongside your team.",
      body: "Our Coretech Expert Solutions follow an RPO (Recruitment Process Outsourcing) model — a dedicated recruitment expert works in-office with your team, managing the entire hiring process end-to-end, giving you in-house-level support without building an internal team from scratch.",
    },
  ];

  function handleClick(service) {
    if (service.isRecruiterOnly) {
      onCampusExploration();
      return;
    }
    setExpanded((prev) => (prev === service.id ? null : service.id));
  }

  return (
    <div className="container" id="services-section" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 className="page-title">Our Services</h2>
        <p className="card-desc">What we offer, and how we help you hire.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "800px", margin: "0 auto" }}>
        {services.map((service) => (
          <div
            key={service.id}
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(service)}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{service.title}</h3>
            <p className="card-meta">{service.summary}</p>

            {service.isRecruiterOnly && (
              <p className="hint" style={{ marginTop: "0.5rem" }}>
                Available to recruiters — click to log in and explore →
              </p>
            )}

            {!service.isRecruiterOnly && expanded === service.id && (
              <p className="card-desc" style={{ marginTop: "0.75rem" }}>{service.body}</p>
            )}

            {!service.isRecruiterOnly && (
              <p className="hint" style={{ marginTop: "0.5rem" }}>
                {expanded === service.id ? "Click to collapse ↑" : "Click to read more →"}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroVideo({ onFinish }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
      }}
    >
      <video
        src={introVideo}
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function SplashScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A192F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <img
        src={logo}
        alt="Coretech Talents"
        style={{ width: 100, height: 100, marginBottom: "1rem", animation: "pulse 1.2s ease-in-out infinite" }}
      />
      <h1 style={{ color: "#64FFDA", fontSize: "1.5rem", letterSpacing: "0.05em" }}>Coretech Talents</h1>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

function Hero({ onOpenPortal, onAdminAccess, onAbout, onServices, onNewsletter, onHome }) {
  return (
    <div className="hero">
      <svg className="hero-bg" viewBox="0 0 800 240" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="navyGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A192F" />
            <stop offset="60%" stopColor="#0D2141" />
            <stop offset="100%" stopColor="#0A192F" />
          </linearGradient>
          <radialGradient id="mintGlow" cx="80%" cy="20%" r="55%">
            <stop offset="0%" stopColor="#64FFDA" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#64FFDA" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="240" fill="url(#navyGlow)" />
        <rect width="800" height="240" fill="url(#mintGlow)" />
        <path d="M0,200 L100,175 L200,195 L300,165 L400,190 L500,160 L600,185 L700,170 L800,195 L800,240 L0,240 Z" fill="#112240" opacity="0.7" />
        <line x1="0" y1="60" x2="800" y2="60" stroke="#64FFDA" strokeOpacity="0.06" strokeWidth="1" />
        <line x1="0" y1="120" x2="800" y2="120" stroke="#64FFDA" strokeOpacity="0.06" strokeWidth="1" />
      </svg>

      <div className="hero-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div className="brand" onClick={onAdminAccess} style={{ cursor: "pointer" }}>
            <img src={logo} alt="Coretech Talents" className="brand-mark" />
            <div className="brand-name">Coretech Talents</div>
          </div>

          <div className="hero-nav" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button onClick={onHome}>Home</button>
            <button onClick={onAbout}>About</button>
            <button onClick={onServices}>Services</button>
            <button onClick={onNewsletter}>Newsletter</button>
            <button onClick={onOpenPortal}>Login / Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= HOME SECTION (showcase: stats, general info, copyright) =================
function HomeIllustration() {
  return (
    <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="homeIllusBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3F7FE" />
          <stop offset="100%" stopColor="#E8EFFE" />
        </linearGradient>
      </defs>
      <rect width="700" height="260" rx="16" fill="url(#homeIllusBg)" />

      <rect x="60" y="180" width="180" height="10" rx="3" fill="#2554E8" opacity="0.15" />
      <circle cx="120" cy="120" r="22" fill="#2554E8" />
      <rect x="95" y="145" width="50" height="45" rx="14" fill="#12274A" />
      <rect x="90" y="170" width="60" height="14" rx="4" fill="#0A1628" />

      <rect x="290" y="190" width="180" height="10" rx="3" fill="#2554E8" opacity="0.15" />
      <circle cx="350" cy="110" r="22" fill="#1C3FB8" />
      <rect x="325" y="135" width="50" height="55" rx="14" fill="#2554E8" />
      <rect x="365" y="150" width="40" height="12" rx="6" fill="#2554E8" transform="rotate(20 365 150)" />

      <circle cx="530" cy="105" r="22" fill="#12274A" />
      <rect x="505" y="130" width="50" height="55" rx="14" fill="#1C3FB8" />
      <rect x="500" y="115" width="14" height="35" rx="6" fill="#1C3FB8" transform="rotate(-30 500 115)" />
      <rect x="546" y="115" width="14" height="35" rx="6" fill="#1C3FB8" transform="rotate(30 546 115)" />

      <circle cx="600" cy="70" r="26" fill="#1E8E5A" opacity="0.15" />
      <circle cx="600" cy="70" r="18" fill="#1E8E5A" />
      <path d="M591 70 L597 76 L610 62" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="40" y="45" width="34" height="42" rx="4" fill="#FFFFFF" stroke="#2554E8" strokeWidth="2" />
      <line x1="47" y1="58" x2="67" y2="58" stroke="#2554E8" strokeWidth="2" />
      <line x1="47" y1="66" x2="67" y2="66" stroke="#2554E8" strokeWidth="2" />
      <line x1="47" y1="74" x2="60" y2="74" stroke="#2554E8" strokeWidth="2" />
    </svg>
  );
}

function StatsRow() {
  const [jobCount, setJobCount] = useState(null);
  const [companyCount, setCompanyCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/jobs/`)
      .then((res) => res.json())
      .then((data) => {
        const jobs = Array.isArray(data) ? data : [];
        setJobCount(jobs.length);
        const uniqueCompanies = new Set(jobs.map((j) => j.company_name).filter(Boolean));
        setCompanyCount(uniqueCompanies.size);
      })
      .catch(() => {
        setJobCount(null);
        setCompanyCount(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Active Job Openings", value: loading ? "…" : jobCount ?? "—" },
    { label: "Companies Hiring With Us", value: loading ? "…" : companyCount ?? "—" },
    { label: "Candidates", value: "Growing every day" },
  ];

  return (
    <div className="card-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      {stats.map((s) => (
        <div className="card" key={s.label} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--blue-600)" }}>
            {s.value}
          </div>
          <p className="card-meta" style={{ marginTop: "0.4rem", marginBottom: 0 }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function HomeSection() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 className="page-title">Welcome to Coretech Talents</h2>
        <p className="card-desc">
          Connecting skilled candidates with manufacturing, industrial, and corporate employers across India —
          fast, reliable, and built on real relationships.
        </p>
      </div>

      <div className="card" style={{ marginBottom: "2rem", padding: 0, overflow: "hidden" }}>
        <HomeIllustration />
      </div>

      <StatsRow />

      <div className="card" style={{ marginTop: "1.1rem" }}>
        <h3 style={{ marginBottom: "0.6rem" }}>What we do</h3>
        <p className="card-meta">
          We specialize in sourcing candidates for machining, production, and industrial roles, as well as corporate
          support functions — moving fast without compromising on candidate quality. Whether you're a recruiter
          looking for the right hire or a candidate looking for your next opportunity, our portal brings both sides
          together in one place.
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line)" }}>
        <p className="hint">© {new Date().getFullYear()} Coretech Talents. All rights reserved.</p>
      </div>
    </div>
  );
}

function NewsletterSection() {
  const newsletters = [
    { title: "Recruitment Trends 2026", desc: "Hiring is shifting toward skills-based assessments over degrees, faster interview cycles, and AI-assisted shortlisting — companies that adapt are seeing stronger candidate pipelines." },
    { title: "Understanding the GenZ Mindset", desc: "GenZ candidates prioritize purpose, flexibility, and transparency. They expect quick feedback loops, honest job descriptions, and clear growth paths — not just a paycheck." },
    { title: "Evolving Recruitment Strategies", desc: "Employer branding, referral-driven hiring, and community-led talent pools are replacing traditional job-board-only approaches as competition for skilled talent increases." },
    { title: "Technology in Recruitment", desc: "AI-powered resume screening, automated interview scheduling, and data-driven candidate matching are reshaping how recruiters find and engage talent faster and more accurately." },
  ];

  return (
    <div className="container" id="newsletter-section" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 className="page-title">Newsletter</h2>
        <p className="card-desc">Insights on hiring trends, workplace shifts, and what's next in recruitment.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
        {newsletters.map((item) => (
          <div key={item.title} className="card">
            <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
            <p className="card-meta">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginForm({ endpoint, label, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const body = new URLSearchParams();
      body.append("username", email);
      body.append("password", password);

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Login failed");
      }

      const data = await res.json();
      onLogin(data.access_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card login-shell">
      <h2>{label}</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="msg-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

function CandidateSignupForm({ onSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, password, phone }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const detail = data.detail;
        const message = Array.isArray(detail) ? detail.map((d) => d.msg).join(", ") : detail || "Registration failed";
        throw new Error(message);
      }

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card login-shell">
      <h2>Candidate Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} required minLength={2} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="[0-9]{10}" title="Enter a 10-digit mobile number" />
        </div>
        <div className="field">
          <label>Password (min 8 characters)</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </div>
        <div className="field">
          <label>Confirm password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />
        </div>
        {error && <p className="msg-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

function RecruiterSignupForm({ onSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/recruiter-auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          company_name: companyName,
          designation: designation,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const detail = data.detail;
        const message = Array.isArray(detail) ? detail.map((d) => d.msg).join(", ") : detail || "Registration failed";
        throw new Error(message);
      }

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card login-shell">
      <h2>Recruiter Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} required minLength={2} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>Company name</label>
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>
        <div className="field">
          <label>Designation</label>
          <input value={designation} onChange={(e) => setDesignation(e.target.value)} required />
        </div>
        <div className="field">
          <label>Password (min 8 characters)</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </div>
        <div className="field">
          <label>Confirm password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />
        </div>
        {error && <p className="msg-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

function PortalAccess({ onCandidateLogin, onRecruiterLogin, onClose, initialRole = null }) {
  const [role, setRole] = useState(initialRole);
  const [mode, setMode] = useState("login");
  const [candidateSignupDone, setCandidateSignupDone] = useState(false);
  const [recruiterSignupDone, setRecruiterSignupDone] = useState(false);

  function chooseRole(newRole) {
    setRole(newRole);
    setMode("login");
    setCandidateSignupDone(false);
    setRecruiterSignupDone(false);
  }

  function switchMode(newMode) {
    setMode(newMode);
    setCandidateSignupDone(false);
    setRecruiterSignupDone(false);
  }

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      {!role && (
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <button style={{ flex: 1 }} onClick={() => chooseRole("candidate")}>Candidate</button>
          <button style={{ flex: 1 }} onClick={() => chooseRole("recruiter")}>Recruiter</button>
        </div>
      )}

      {role && (
        <>
          <h3 style={{ marginTop: "1rem", marginBottom: "0.75rem" }}>
            {role === "candidate" ? "Candidate" : "Recruiter"}
          </h3>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <button className={mode === "login" ? "btn-applied" : ""} style={{ flex: 1 }} onClick={() => switchMode("login")}>Login</button>
            <button className={mode === "signup" ? "btn-applied" : ""} style={{ flex: 1 }} onClick={() => switchMode("signup")}>Sign Up</button>
          </div>

          {role === "candidate" && mode === "login" && (
            <>
              {candidateSignupDone && <p className="msg-success" style={{ marginBottom: "1rem" }}>Account created successfully — please log in.</p>}
              <LoginForm endpoint="/auth/login" label="Candidate Login" onLogin={onCandidateLogin} />
            </>
          )}

          {role === "candidate" && mode === "signup" && (
            <CandidateSignupForm onSuccess={() => { setCandidateSignupDone(true); setMode("login"); }} />
          )}

          {role === "recruiter" && mode === "login" && (
            <>
              {recruiterSignupDone && (
                <p className="msg-success" style={{ marginBottom: "1rem" }}>
                  Account created. It's pending admin approval — you'll get an email once you're approved and can log in.
                </p>
              )}
              <LoginForm endpoint="/recruiter-auth/login" label="Recruiter Login" onLogin={onRecruiterLogin} />
            </>
          )}

          {role === "recruiter" && mode === "signup" && (
            <RecruiterSignupForm onSuccess={() => { setRecruiterSignupDone(true); setMode("login"); }} />
          )}
        </>
      )}

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button className="btn-link" onClick={onClose}>← Back to home</button>
      </div>
    </div>
  );
}

function JobCard({ job, token, onRequireLogin }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleApply() {
    if (!token) {
      onRequireLogin();
      return;
    }

    setStatus("applying");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/candidates/jobs/${job.id}/apply`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 400 && data.detail?.toLowerCase().includes("already applied")) {
          setStatus("applied");
          setMessage("Already applied");
          return;
        }
        throw new Error(data.detail || "Failed to apply");
      }

      setStatus("applied");
      setMessage("Applied successfully");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  const skills = (job.skills_required || "").split(",").map((s) => s.trim()).filter(Boolean);
  const isApplied = status === "applied";

  return (
    <div className="card">
      <h2>{job.title}</h2>
      <p className="card-meta">{job.company_name} · {job.location} · {job.employment_type}</p>
      <p className="card-desc">{job.description}</p>
      <div className="tags">
        {skills.map((s) => (
          <span className="tag" key={s}>{s}</span>
        ))}
      </div>

      <button className={isApplied ? "btn-applied" : "btn-primary"} onClick={handleApply} disabled={status === "applying" || isApplied}>
        {status === "applying" ? "Applying..." : isApplied ? "Applied ✓" : "Apply"}
      </button>
      {message && (
        <span className={`status-line ${status === "error" ? "msg-error" : "msg-success"}`}>
          <span className={`status-dot ${status}`}></span>
          {message}
        </span>
      )}
    </div>
  );
}

function PostJobForm({ token, onPosted }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/jobs/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title,
          description,
          company_name: companyName || undefined,
          location,
          employment_type: employmentType,
          skills_required: skillsRequired,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to post job");

      setTitle("");
      setDescription("");
      setCompanyName("");
      setLocation("");
      setSkillsRequired("");
      onPosted();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} />
        </div>
        <div className="field">
          <label>Company name (optional — defaults to your profile's company)</label>
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div className="field">
          <label>Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="field">
          <label>Employment type</label>
          <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div className="field">
          <label>Skills required (comma-separated)</label>
          <input value={skillsRequired} onChange={(e) => setSkillsRequired(e.target.value)} placeholder="python, fastapi, postgresql" required />
        </div>

        {error && <p className="msg-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

function PostJobPage({ token }) {
  const [posted, setPosted] = useState(false);

  return (
    <div>
      <h2 className="page-title">Post a Job</h2>
      <PostJobForm token={token} onPosted={() => { setPosted(true); setTimeout(() => setPosted(false), 3000); }} />
      {posted && <p className="msg-success">Job posted successfully.</p>}
    </div>
  );
}

// ================= CAMPUS EXPLORATION (recruiter-only) =================
function RegisterRequirementForm() {
  const [form, setForm] = useState({ date: "", location: "", college: "", course: "", candidateRequirements: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/campus/requirement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          location: form.location,
          college: form.college,
          course: form.course,
          candidate_requirements: form.candidateRequirements,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to submit requirement");

      setSubmitted(true);
      setForm({ date: "", location: "", college: "", course: "", candidateRequirements: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card" style={{ marginTop: "1.5rem" }}>
      <h2>Register Campus Requirement</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Preferred date</label>
          <input type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} required />
        </div>
        <div className="field">
          <label>Location</label>
          <input value={form.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="City / campus location" required />
        </div>
        <div className="field">
          <label>College</label>
          <input value={form.college} onChange={(e) => handleChange("college", e.target.value)} required />
        </div>
        <div className="field">
          <label>Course</label>
          <input value={form.course} onChange={(e) => handleChange("course", e.target.value)} placeholder="e.g. B.E Mechanical, Diploma EEE" required />
        </div>
        <div className="field">
          <label>Candidate requirements</label>
          <textarea value={form.candidateRequirements} onChange={(e) => handleChange("candidateRequirements", e.target.value)} placeholder="Number of candidates, skills, experience level, roles..." rows={3} required />
        </div>

        {error && <p className="msg-error">{error}</p>}
        {submitted && <p className="msg-success">Requirement submitted — an email has been sent to our team to arrange the campus drive.</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Requirement"}
        </button>
      </form>
    </div>
  );
}

function CampusArrangement({ onGoToSupport }) {
  const [needsSupport, setNeedsSupport] = useState(null);
  const [subView, setSubView] = useState(null);

  function handleChoice(choice) {
    setNeedsSupport(choice);
    setSubView(null);
  }

  return (
    <div>
      <div className="card" style={{ maxWidth: 600 }}>
        <h3 style={{ marginBottom: "0.75rem" }}>Do you need campus arrangement support?</h3>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className={needsSupport === "yes" ? "btn-applied" : "btn-primary"} onClick={() => handleChoice("yes")}>Yes</button>
          <button className={needsSupport === "no" ? "btn-applied" : ""} onClick={() => handleChoice("no")}>No</button>
        </div>
      </div>

      {needsSupport === "no" && (
        <p className="hint" style={{ marginTop: "1rem" }}>No problem — you can browse the Campus Support tab any time to see colleges in your area.</p>
      )}

      {needsSupport === "yes" && !subView && (
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <div className="card" style={{ cursor: "pointer", flex: "1 1 220px" }} onClick={() => setSubView("registerRequirement")}>
            <h3 style={{ marginBottom: "0.5rem" }}>Register Requirement</h3>
            <p className="card-meta">Tell us your campus hiring requirement — date, location, college, course, and candidate needs.</p>
            <p className="hint" style={{ marginTop: "0.5rem" }}>Click to fill the form →</p>
          </div>

          <div className="card" style={{ cursor: "pointer", flex: "1 1 220px" }} onClick={onGoToSupport}>
            <h3 style={{ marginBottom: "0.5rem" }}>Campus Support</h3>
            <p className="card-meta">Browse colleges in your area and their websites.</p>
            <p className="hint" style={{ marginTop: "0.5rem" }}>Click to view →</p>
          </div>
        </div>
      )}

      {needsSupport === "yes" && subView === "registerRequirement" && (
        <>
          <button className="btn-link" style={{ marginTop: "1rem" }} onClick={() => setSubView(null)}>← Back to options</button>
          <RegisterRequirementForm />
        </>
      )}
    </div>
  );
}

function CampusSupport() {
  const colleges = [
    { name: "PLACEHOLDER College 1", location: "Add city/area", website: "https://example.edu" },
    { name: "PLACEHOLDER College 2", location: "Add city/area", website: "https://example.edu" },
    { name: "PLACEHOLDER College 3", location: "Add city/area", website: "https://example.edu" },
  ];

  return (
    <div>
      <div className="card" style={{ marginBottom: "1.25rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Colleges in your area</h3>
        <p className="card-meta">Reach out directly to plan campus drives. Let me know the real colleges you work with and I'll fill this list in.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {colleges.map((college) => (
          <div key={college.name} className="card">
            <h3 style={{ marginBottom: "0.25rem" }}>{college.name}</h3>
            <p className="card-meta" style={{ marginBottom: "0.5rem" }}>{college.location}</p>
            <a href={college.website} target="_blank" rel="noopener noreferrer" className="btn-link">Visit website →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampusExplorationPage() {
  const [activeTab, setActiveTab] = useState("arrangement");

  return (
    <div>
      <h2 className="page-title">Campus Exploration</h2>
      <p className="card-desc" style={{ marginBottom: "1.5rem" }}>Explore campus hiring support and nearby college partnerships.</p>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <button className={activeTab === "arrangement" ? "btn-primary" : ""} onClick={() => setActiveTab("arrangement")}>Campus Arrangement</button>
        <button className={activeTab === "support" ? "btn-primary" : ""} onClick={() => setActiveTab("support")}>Campus Support</button>
      </div>

      {activeTab === "arrangement" && <CampusArrangement onGoToSupport={() => setActiveTab("support")} />}
      {activeTab === "support" && <CampusSupport />}
    </div>
  );
}

function ApplicantRow({ applicant, jobId, token, onStatusChanged }) {
  const [updating, setUpdating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  async function updateStatus(newStatus) {
    setUpdating(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/jobs/${jobId}/applicants/${applicant.application_id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to update status");

      onStatusChanged(applicant.application_id, data.status);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }

  async function handleDownloadResume() {
    setError("");
    setDownloading(true);
    try {
      const res = await fetch(`${API_BASE}/jobs/${jobId}/applicants/${applicant.application_id}/resume`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to download resume");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${applicant.name}_resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="applicant-row">
      <p className="name">{applicant.name}</p>
      <p className="meta">
        {applicant.email}
        {applicant.mobile_number && ` · ${applicant.mobile_number}`} · Skills: {applicant.skills} · Relevance: {applicant.relevance}
      </p>
      <span className={`status-line ${applicant.status}`}>
        <span className={`status-dot ${applicant.status}`}></span>
        {applicant.status}
      </span>

      <div className="applicant-actions">
        <button className={applicant.status === "accepted" ? "btn-applied" : "btn-primary"} disabled={updating || applicant.status === "accepted"} onClick={() => updateStatus("accepted")}>
          {applicant.status === "accepted" ? "Accepted ✓" : "Accept"}
        </button>
        <button disabled={updating || applicant.status === "rejected"} onClick={() => updateStatus("rejected")}>Reject</button>
        <button disabled={updating || applicant.status === "pending"} onClick={() => updateStatus("pending")}>Reset to Pending</button>
        <button onClick={handleDownloadResume} disabled={downloading}>
          {downloading ? "Downloading..." : "Download Resume"}
        </button>
      </div>
      {error && <p className="msg-error">{error}</p>}
    </div>
  );
}

function JobApplicantsPanel({ job, token, onBack }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/jobs/${job.id}/applicants`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setApplicants(data.applicants || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [job.id, token]);

  function handleStatusChanged(applicationId, newStatus) {
    setApplicants((prev) => prev.map((a) => (a.application_id === applicationId ? { ...a, status: newStatus } : a)));
  }

  return (
    <div>
      <button className="btn-link" onClick={onBack}>Back to my jobs</button>
      <h2 className="page-title">{job.title} — Applicants</h2>

      {loading && <p className="empty-state">Loading applicants...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && applicants.length === 0 && <p className="empty-state">No applicants yet.</p>}

      {applicants.map((a) => (
        <ApplicantRow key={a.application_id} applicant={a} jobId={job.id} token={token} onStatusChanged={handleStatusChanged} />
      ))}
    </div>
  );
}

function RecruiterDashboard({ token }) {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/jobs/mine/list`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setMyJobs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (selectedJob) {
    return <JobApplicantsPanel job={selectedJob} token={token} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div>
      <h2 className="page-title">My Dashboard</h2>

      {loading && <p className="empty-state">Loading your jobs...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && myJobs.length === 0 && <p className="empty-state">You haven't posted any jobs yet.</p>}

      {myJobs.map((job) => (
        <div key={job.id} className="card job-pick" onClick={() => setSelectedJob(job)}>
          <h3>{job.title}</h3>
          <p className="card-meta">
            {job.company_name} · {job.location} · {job.employment_type}
            {job.is_active === false && " · inactive"}
          </p>
          <p className="hint">Click to view applicants →</p>
        </div>
      ))}
    </div>
  );
}

function MyApplications({ token, onBack }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/candidates/my-applications`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setApplications(data.applications || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      {onBack && <button className="btn-link" onClick={onBack}>← Back to profile</button>}
      <h2 className="page-title">My Applications</h2>

      {loading && <p className="empty-state">Loading your applications...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && applications.length === 0 && <p className="empty-state">You haven't applied to any jobs yet.</p>}

      {applications.map((app) => (
        <div key={app.application_id} className="card">
          <h2>{app.job_title}</h2>
          <p className="card-meta">{app.company_name} · {app.location} · {app.employment_type}</p>
          {app.status ? (
            <span className={`status-line ${app.status}`}>
              <span className={`status-dot ${app.status}`}></span>
              {app.status}
            </span>
          ) : (
            <span className="hint">Status not available yet</span>
          )}
        </div>
      ))}
    </div>
  );
}

function MyResume({ token, onBack }) {
  const [hasResume, setHasResume] = useState(null);
  const [checking, setChecking] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function checkResumeExists() {
    setChecking(true);
    fetch(`${API_BASE}/candidates/me/resume`, { method: "GET", headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { setHasResume(res.ok); })
      .catch(() => setHasResume(false))
      .finally(() => setChecking(false));
  }

  useEffect(() => {
    checkResumeExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    setError("");
    setMessage("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/candidates/me/resume`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to upload resume");

      setMessage("Resume uploaded successfully");
      setFile(null);
      setHasResume(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDownload() {
    setError("");
    setDownloading(true);
    try {
      const res = await fetch(`${API_BASE}/candidates/me/resume`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to download resume");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      {onBack && <button className="btn-link" onClick={onBack}>← Back to profile</button>}
      <h2 className="page-title">My Resume</h2>

      <div className="card">
        {checking ? (
          <p className="hint">Checking your resume status...</p>
        ) : hasResume ? (
          <>
            <p className="card-meta">A resume is currently on file for your account.</p>
            <button className="btn-applied" onClick={handleDownload} disabled={downloading}>
              {downloading ? "Downloading..." : "Download Current Resume"}
            </button>
          </>
        ) : (
          <p className="hint">No resume uploaded yet.</p>
        )}
      </div>

      <div className="form-card">
        <h2>{hasResume ? "Replace Resume" : "Upload Resume"}</h2>
        <form onSubmit={handleUpload}>
          <div className="field">
            <label>PDF file (max 5MB)</label>
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0] || null)} required />
          </div>
          {error && <p className="msg-error">{error}</p>}
          {message && <p className="msg-success">{message}</p>}
          <button type="submit" className="btn-primary" disabled={uploading || !file}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

function calculateProfileCompletion(profile) {
  if (!profile) return 0;
  const fields = [
    profile.full_name,
    profile.email,
    profile.mobile_number,
    profile.location,
    profile.designation,
    profile.current_company,
    profile.years_of_experience,
    profile.current_ctc,
    profile.expected_ctc,
    profile.notice_period,
    profile.resume_headline,
    profile.skills,
    profile.education_level,
    profile.field_of_study,
    profile.has_resume,
  ];
  const filled = fields.filter((f) => f !== null && f !== undefined && f !== "").length;
  return Math.round((filled / fields.length) * 100);
}

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function CandidateProfile({ token }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    location: "",
    designation: "",
    current_company: "",
    years_of_experience: "",
    current_ctc: "",
    expected_ctc: "",
    notice_period: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  function loadProfile() {
    setLoading(true);
    fetch(`${API_BASE}/candidates/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setForm({
          full_name: data.full_name || "",
          email: data.email || "",
          mobile_number: data.mobile_number || "",
          location: data.location || "",
          designation: data.designation || "",
          current_company: data.current_company || "",
          years_of_experience: data.years_of_experience || "",
          current_ctc: data.current_ctc || "",
          expected_ctc: data.expected_ctc || "",
          notice_period: data.notice_period || "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleUploadPicture(e) {
    e.preventDefault();
    if (!file) return;

    setUploadError("");
    setUploadMessage("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/candidates/me/profile-picture`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to upload profile picture");

      setUploadMessage("Profile picture updated");
      setFile(null);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSaveProfile(e) {
    e.preventDefault();
    setSaveError("");
    setSaveMessage("");
    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/candidates/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to update profile");

      setProfile(data);
      setSaveMessage("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="hint">Loading profile...</p>;
  if (error) return <p className="msg-error">{error}</p>;
  if (!profile) return null;

  const completion = calculateProfileCompletion(profile);
  const initials = getInitials(profile.full_name);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 className="page-title">My Profile</h2>

      {!editing && (
        <>
          <div className="card" style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: "1.25rem" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(37, 84, 232, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: "var(--blue-600)" }}>{initials}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{profile.full_name}</p>
              <p className="card-meta" style={{ margin: "2px 0 0" }}>
                {profile.designation}
                {profile.current_company && ` at ${profile.current_company}`}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{completion}%</p>
              <p className="hint" style={{ margin: 0 }}>complete</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: "1.25rem" }}>
            <div className="card" style={{ padding: "0.75rem 1rem" }}>
              <p className="hint" style={{ margin: "0 0 2px" }}>Experience</p>
              <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
                {profile.years_of_experience ? `${profile.years_of_experience} yrs` : "—"}
              </p>
            </div>
            <div className="card" style={{ padding: "0.75rem 1rem" }}>
              <p className="hint" style={{ margin: "0 0 2px" }}>Current CTC</p>
              <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{profile.current_ctc || "—"}</p>
            </div>
            <div className="card" style={{ padding: "0.75rem 1rem" }}>
              <p className="hint" style={{ margin: "0 0 2px" }}>Notice</p>
              <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{profile.notice_period || "—"}</p>
            </div>
          </div>

          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
              <span className="card-meta">Email</span>
              <span className="card-meta" style={{ color: "var(--text-primary)" }}>{profile.email}</span>
            </div>
            {profile.mobile_number && (
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
                <span className="card-meta">Mobile</span>
                <span className="card-meta" style={{ color: "var(--text-primary)" }}>{profile.mobile_number}</span>
              </div>
            )}
            {profile.current_company && (
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
                <span className="card-meta">Current company</span>
                <span className="card-meta" style={{ color: "var(--text-primary)" }}>{profile.current_company}</span>
              </div>
            )}
            {profile.location && (
              <div style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between" }}>
                <span className="card-meta">Location</span>
                <span className="card-meta" style={{ color: "var(--text-primary)" }}>{profile.location}</span>
              </div>
            )}
          </div>

          {profile.skills && (
            <div className="tags" style={{ margin: "1rem 0" }}>
              {profile.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
          )}

          <button className="btn-primary" style={{ width: "100%" }} onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </>
      )}

      {editing && (
        <div className="form-card">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSaveProfile}>
            <div className="field">
              <label>Full name</label>
              <input value={form.full_name} onChange={(e) => handleFormChange("full_name", e.target.value)} required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => handleFormChange("email", e.target.value)} required />
            </div>
            <div className="field">
              <label>Mobile number</label>
              <input value={form.mobile_number} onChange={(e) => handleFormChange("mobile_number", e.target.value)} required pattern="[0-9]{10}" />
            </div>
            <div className="field">
              <label>Location</label>
              <input value={form.location} onChange={(e) => handleFormChange("location", e.target.value)} />
            </div>
            <div className="field">
              <label>Designation</label>
              <input value={form.designation} onChange={(e) => handleFormChange("designation", e.target.value)} />
            </div>
            <div className="field">
              <label>Current company</label>
              <input value={form.current_company} onChange={(e) => handleFormChange("current_company", e.target.value)} placeholder="e.g. Tata Motors" />
            </div>
            <div className="field">
              <label>Years of experience</label>
              <input value={form.years_of_experience} onChange={(e) => handleFormChange("years_of_experience", e.target.value)} />
            </div>
            <div className="field">
              <label>Current CTC</label>
              <input value={form.current_ctc} onChange={(e) => handleFormChange("current_ctc", e.target.value)} />
            </div>
            <div className="field">
              <label>Expected CTC</label>
              <input value={form.expected_ctc} onChange={(e) => handleFormChange("expected_ctc", e.target.value)} />
            </div>
            <div className="field">
              <label>Notice period</label>
              <input value={form.notice_period} onChange={(e) => handleFormChange("notice_period", e.target.value)} />
            </div>

            {saveError && <p className="msg-error">{saveError}</p>}
            {saveMessage && <p className="msg-success">{saveMessage}</p>}

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              <button type="button" onClick={() => { setEditing(false); loadProfile(); }} disabled={saving}>Cancel</button>
            </div>
          </form>

          <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--line)", paddingTop: "1.25rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>Update Profile Picture</h3>
            <form onSubmit={handleUploadPicture}>
              <div className="field">
                <label>JPG or PNG (max 5MB)</label>
                <input type="file" accept="image/jpeg,image/png" onChange={(e) => setFile(e.target.files[0] || null)} required />
              </div>
              {uploadError && <p className="msg-error">{uploadError}</p>}
              {uploadMessage && <p className="msg-success">{uploadMessage}</p>}
              <button type="submit" className="btn-primary" disabled={uploading || !file}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function loadPicture() {
    setPictureLoading(true);
    fetch(`${API_BASE}/candidates/me/profile-picture`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.blob() : null))
      .then((blob) => setPictureUrl(blob ? URL.createObjectURL(blob) : null))
      .catch(() => setPictureUrl(null))
      .finally(() => setPictureLoading(false));
  }

  useEffect(() => {
    loadPicture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleUploadPicture(e) {
    e.preventDefault();
    if (!file) return;

    setUploadError("");
    setUploadMessage("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/candidates/me/profile-picture`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to upload profile picture");

      setUploadMessage("Profile picture updated");
      setFile(null);
      loadPicture();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSaveProfile(e) {
    e.preventDefault();
    setSaveError("");
    setSaveMessage("");
    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/candidates/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to update profile");

      setProfile(data);
      setSaveMessage("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 className="page-title">My Profile</h2>

      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {pictureLoading ? (
            <span className="hint">...</span>
          ) : pictureUrl ? (
            <img src={pictureUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span className="hint">No photo</span>
          )}
        </div>

        {loading && <p className="hint">Loading profile...</p>}
        {error && <p className="msg-error">{error}</p>}
        {profile && !editing && (
          <div style={{ textAlign: "center" }}>
            <h2>{profile.full_name}</h2>
            <p className="card-meta">{profile.email}</p>
            {profile.mobile_number && <p className="card-meta">{profile.mobile_number}</p>}
            {profile.location && <p className="card-meta">{profile.location}</p>}
            {profile.designation && <p className="card-desc">{profile.designation}</p>}
            <p className="card-meta">
              {profile.years_of_experience && `${profile.years_of_experience} yrs exp`}
              {profile.current_ctc && ` · Current CTC: ${profile.current_ctc}`}
              {profile.expected_ctc && ` · Expected CTC: ${profile.expected_ctc}`}
              {profile.notice_period && ` · Notice period: ${profile.notice_period}`}
            </p>
            {profile.resume_headline && <p className="card-desc">{profile.resume_headline}</p>}
            {profile.skills && (
              <div className="tags">
                {profile.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                  <span className="tag" key={s}>{s}</span>
                ))}
              </div>
            )}
            <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>

      {profile && editing && (
        <div className="form-card">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSaveProfile}>
            <div className="field">
              <label>Full name</label>
              <input value={form.full_name} onChange={(e) => handleFormChange("full_name", e.target.value)} required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => handleFormChange("email", e.target.value)} required />
            </div>
            <div className="field">
              <label>Mobile number</label>
              <input value={form.mobile_number} onChange={(e) => handleFormChange("mobile_number", e.target.value)} required pattern="[0-9]{10}" />
            </div>
            <div className="field">
              <label>Location</label>
              <input value={form.location} onChange={(e) => handleFormChange("location", e.target.value)} />
            </div>
            <div className="field">
              <label>Designation</label>
              <input value={form.designation} onChange={(e) => handleFormChange("designation", e.target.value)} />
            </div>
            <div className="field">
              <label>Years of experience</label>
              <input value={form.years_of_experience} onChange={(e) => handleFormChange("years_of_experience", e.target.value)} />
            </div>
            <div className="field">
              <label>Current CTC</label>
              <input value={form.current_ctc} onChange={(e) => handleFormChange("current_ctc", e.target.value)} />
            </div>
            <div className="field">
              <label>Expected CTC</label>
              <input value={form.expected_ctc} onChange={(e) => handleFormChange("expected_ctc", e.target.value)} />
            </div>
            <div className="field">
              <label>Notice period</label>
              <input value={form.notice_period} onChange={(e) => handleFormChange("notice_period", e.target.value)} />
            </div>

            {saveError && <p className="msg-error">{saveError}</p>}
            {saveMessage && <p className="msg-success">{saveMessage}</p>}

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              <button type="button" onClick={() => { setEditing(false); loadProfile(); }} disabled={saving}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="form-card">
        <h2>Update Profile Picture</h2>
        <form onSubmit={handleUploadPicture}>
          <div className="field">
            <label>JPG or PNG (max 5MB)</label>
            <input type="file" accept="image/jpeg,image/png" onChange={(e) => setFile(e.target.files[0] || null)} required />
          </div>
          {uploadError && <p className="msg-error">{uploadError}</p>}
          {uploadMessage && <p className="msg-success">{uploadMessage}</p>}
          <button type="submit" className="btn-primary" disabled={uploading || !file}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

function CandidateJobBrowser({ token }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/jobs/`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="page-title">Job Openings</h2>
      {loading && <p className="empty-state">Loading jobs...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && jobs.length === 0 && <p className="empty-state">No jobs posted yet.</p>}
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} token={token} onRequireLogin={() => {}} />
      ))}
    </div>
  );
}

// ============ small helper: profile picture thumbnail for a card ============
function CandidatePictureThumb({ candidateId, token, size = 56 }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let objectUrl = null;
    fetch(`${API_BASE}/candidates/${candidateId}/profile-picture`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.blob() : null))
      .then((blob) => {
        if (blob) {
          objectUrl = URL.createObjectURL(blob);
          setUrl(objectUrl);
        }
      })
      .catch(() => setUrl(null));

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [candidateId, token]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        background: "rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {url ? (
        <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span className="hint" style={{ fontSize: "0.65rem" }}>No photo</span>
      )}
    </div>
  );
}

// ============ recruiter's full-profile view of one candidate ============
function CandidateProfileDetail({ candidateId, token, onBack }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pictureUrl, setPictureUrl] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/candidates/${candidateId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [candidateId, token]);

  useEffect(() => {
    let objectUrl = null;
    fetch(`${API_BASE}/candidates/${candidateId}/profile-picture`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.blob() : null))
      .then((blob) => {
        if (blob) {
          objectUrl = URL.createObjectURL(blob);
          setPictureUrl(objectUrl);
        }
      })
      .catch(() => setPictureUrl(null));

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [candidateId, token]);

  async function handleDownloadResume() {
    setError("");
    setDownloading(true);
    try {
      const res = await fetch(`${API_BASE}/candidates/${candidateId}/resume`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to download resume");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${profile?.full_name || "candidate"}_resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      <button className="btn-link" onClick={onBack}>← Back to search results</button>

      {loading && <p className="empty-state">Loading candidate profile...</p>}
      {error && <p className="msg-error">{error}</p>}

      {profile && (
        <div className="card" style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                overflow: "hidden",
                background: "rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {pictureUrl ? (
                <img src={pictureUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span className="hint">No photo</span>
              )}
            </div>

            <h2>{profile.full_name}</h2>
            {profile.designation && <p className="card-meta">{profile.designation}</p>}

            {profile.resume_headline && (
              <p className="card-desc" style={{ maxWidth: 500 }}>{profile.resume_headline}</p>
            )}
          </div>

          <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
            <p className="card-meta"><strong>Email:</strong> {profile.email}</p>
            {profile.mobile_number && <p className="card-meta"><strong>Mobile:</strong> {profile.mobile_number}</p>}
            {profile.location && <p className="card-meta"><strong>Location:</strong> {profile.location}</p>}
            {profile.years_of_experience && <p className="card-meta"><strong>Experience:</strong> {profile.years_of_experience} yrs</p>}
            {profile.current_ctc && <p className="card-meta"><strong>Current CTC:</strong> {profile.current_ctc}</p>}
            {profile.expected_ctc && <p className="card-meta"><strong>Expected CTC:</strong> {profile.expected_ctc}</p>}
            {profile.notice_period && <p className="card-meta"><strong>Notice period:</strong> {profile.notice_period}</p>}
            {profile.education_level && (
              <p className="card-meta">
                <strong>Education:</strong> {profile.education_level}
                {profile.field_of_study && ` - ${profile.field_of_study}`}
              </p>
            )}
          </div>

          {profile.skills && (
            <div className="tags" style={{ marginTop: "1rem" }}>
              {profile.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
          )}

          <div style={{ marginTop: "1.5rem" }}>
            {profile.has_resume ? (
              <button className="btn-primary" onClick={handleDownloadResume} disabled={downloading}>
                {downloading ? "Downloading..." : "Download Resume"}
              </button>
            ) : (
              <p className="hint">No resume on file</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ CandidateSearch — recruiter's candidate search page ============
function CandidateSearch({ token }) {
  const [filters, setFilters] = useState({
    q: "",
    min_experience: "",
    max_experience: "",
    min_salary: "",
    max_salary: "",
    education_level: "",
    field_of_study: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailQuery = filters.q.includes("@");
  const isValidEmail = isEmailQuery ? EMAIL_REGEX.test(filters.q) : true;

  function handleChange(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  async function fetchCandidates(filterValues) {
    setError("");
    setLoading(true);

    try {
      const params = new URLSearchParams();
      Object.entries(filterValues).forEach(([key, value]) => {
        if (value !== "") params.append(key, value);
      });

      const res = await fetch(`${API_BASE}/candidates/search?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => []);
      if (!res.ok) throw new Error(data.detail || "Search failed");

      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCandidates({
      q: "",
      min_experience: "",
      max_experience: "",
      min_salary: "",
      max_salary: "",
      education_level: "",
      field_of_study: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleSearch(e) {
    e.preventDefault();
    if (isEmailQuery && !isValidEmail) return;
    fetchCandidates(filters);
  }

  function handleClearFilters() {
    const cleared = {
      q: "",
      min_experience: "",
      max_experience: "",
      min_salary: "",
      max_salary: "",
      education_level: "",
      field_of_study: "",
    };
    setFilters(cleared);
    fetchCandidates(cleared);
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  async function handleDownloadResume(candidate, e) {
    e.stopPropagation();
    setError("");
    setDownloadingId(candidate.id);
    try {
      const res = await fetch(`${API_BASE}/candidates/${candidate.id}/resume`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to download resume");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${candidate.full_name}_resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloadingId(null);
    }
  }

  if (selectedCandidateId) {
    return (
      <CandidateProfileDetail
        candidateId={selectedCandidateId}
        token={token}
        onBack={() => setSelectedCandidateId(null)}
      />
    );
  }

  return (
    <div>
      <h2 className="page-title">Search Candidates</h2>

      <div className="form-card">
        <form onSubmit={handleSearch}>
          <div className="field">
            <label>Search by name, skills, email, or mobile</label>
            <input value={filters.q} onChange={(e) => handleChange("q", e.target.value)} placeholder="e.g. python, name, email, or mobile number" />
            {isEmailQuery && !isValidEmail && (
              <p className="msg-error" style={{ marginTop: "0.25rem" }}>That doesn't look like a valid email address</p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div className="field" style={{ flex: 1 }}>
              <label>Min Experience (yrs)</label>
              <input type="number" value={filters.min_experience} onChange={(e) => handleChange("min_experience", e.target.value)} />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>Max Experience (yrs)</label>
              <input type="number" value={filters.max_experience} onChange={(e) => handleChange("max_experience", e.target.value)} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div className="field" style={{ flex: 1 }}>
              <label>Min Expected Salary</label>
              <input type="number" value={filters.min_salary} onChange={(e) => handleChange("min_salary", e.target.value)} />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>Max Expected Salary</label>
              <input type="number" value={filters.max_salary} onChange={(e) => handleChange("max_salary", e.target.value)} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div className="field" style={{ flex: 1 }}>
              <label>Education Level</label>
              <select value={filters.education_level} onChange={(e) => handleChange("education_level", e.target.value)}>
                <option value="">Any</option>
                <option value="Graduate">Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>Field of Study</label>
              <input value={filters.field_of_study} onChange={(e) => handleChange("field_of_study", e.target.value)} placeholder="e.g. Computer Science" />
            </div>
          </div>

          {error && <p className="msg-error">{error}</p>}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" className="btn-primary" disabled={loading || (isEmailQuery && !isValidEmail)}>
              {loading ? "Searching..." : "Search"}
            </button>
            {hasActiveFilters && (
              <button type="button" onClick={handleClearFilters} disabled={loading}>Clear Filters</button>
            )}
          </div>
        </form>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <p className="card-meta" style={{ marginBottom: "1rem" }}>
          {loading
            ? "Loading candidates..."
            : hasActiveFilters
            ? `${results.length} candidate${results.length === 1 ? "" : "s"} match your filters`
            : `${results.length} candidate${results.length === 1 ? "" : "s"} total`}
        </p>

        {!loading && results.length === 0 && !error && (
          <p className="empty-state">
            {hasActiveFilters ? "No candidates found matching your filters." : "No candidates registered yet."}
          </p>
        )}

        {results.map((candidate) => (
          <div
            key={candidate.id}
            className="card job-pick"
            style={{ cursor: "pointer", display: "flex", gap: "1rem", alignItems: "flex-start" }}
            onClick={() => setSelectedCandidateId(candidate.id)}
          >
            <CandidatePictureThumb candidateId={candidate.id} token={token} />

            <div style={{ flex: 1 }}>
              <h2>{candidate.full_name}</h2>
              <p className="card-meta">
                {candidate.email}
              </p>
              {candidate.resume_headline && <p className="card-desc">{candidate.resume_headline}</p>}
              <p className="card-meta">
                {candidate.years_of_experience != null && `${candidate.years_of_experience} yrs exp`}
                {candidate.expected_ctc != null && ` · Expected CTC: ${candidate.expected_ctc}`}
                {candidate.notice_period && ` · Notice: ${candidate.notice_period}`}
                {candidate.education_level && ` · ${candidate.education_level}`}
                {candidate.field_of_study && ` - ${candidate.field_of_study}`}
              </p>
              {candidate.skills && (
                <div className="tags">
                  {candidate.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                    <span className="tag" key={s}>{s}</span>
                  ))}
                </div>
              )}

              <p className="hint" style={{ marginTop: "0.5rem" }}>Click card to view full profile →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/dashboard`, { headers: { "X-Admin-Key": key } });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Invalid admin key");
      }

      onLogin(key);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card login-shell">
      <h2>Super Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Admin Passkey</label>
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} required />
        </div>
        {error && <p className="msg-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Verifying..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

function RecruiterShell({ token, onLogout }) {
  const [view, setView] = useState("home");

  const tabs = [
    { key: "dashboard", label: "My Dashboard" },
    { key: "searchCandidates", label: "Search Candidates" },
    { key: "postJob", label: "Post a Job" },
    { key: "campusExploration", label: "Campus Exploration" },
  ];

  return (
    <div className="recruiter-shell" style={{ display: "flex", minHeight: "100vh" }}>
      <div className="recruiter-sidebar" style={{ width: 240, borderRight: "1px solid rgba(255,255,255,0.12)", padding: "2rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <div className="brand" style={{ marginBottom: "1rem" }}>
          <img src={logo} alt="Coretech Talents" className="brand-mark" style={{ width: 32, height: 32 }} />
          <div className="brand-name" style={{ fontSize: "1rem" }}>Coretech Talents</div>
        </div>

        {tabs.map((tab) => (
          <button key={tab.key} className={view === tab.key ? "btn-primary" : ""} onClick={() => setView(tab.key)}>
            {tab.label}
          </button>
        ))}

        <button onClick={onLogout} style={{ marginTop: "auto" }}>Recruiter Log out</button>
      </div>

      <div className="recruiter-main" style={{ flex: 1, padding: "2.5rem" }}>
        {view === "home" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "70vh", textAlign: "center" }}>
            <img src={logo} alt="Coretech Talents" style={{ width: 110, height: 110, marginBottom: "1.25rem" }} />
            <h1 className="brand-name" style={{ fontSize: "1.8rem" }}>Coretech Talents</h1>
            <p className="hint">Choose an option from the panel to get started.</p>
          </div>
        )}

        {view === "dashboard" && <RecruiterDashboard token={token} />}
        {view === "searchCandidates" && <CandidateSearch token={token} />}
        {view === "postJob" && <PostJobPage token={token} />}
        {view === "campusExploration" && <CampusExplorationPage />}
      </div>
    </div>
  );
}

function CandidateShell({ token, onLogout }) {
  const [view, setView] = useState("profile");

  const tabs = [
    { key: "profile", label: "My Profile" },
    { key: "browseJobs", label: "Browse Jobs" },
    { key: "myApplications", label: "My Applications" },
    { key: "myResume", label: "My Resume" },
  ];

  return (
    <div className="candidate-shell" style={{ display: "flex", minHeight: "100vh" }}>
      <div className="candidate-sidebar" style={{ width: 240, borderRight: "1px solid rgba(255,255,255,0.12)", padding: "2rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <div className="brand" style={{ marginBottom: "1rem" }}>
          <img src={logo} alt="Coretech Talents" className="brand-mark" style={{ width: 32, height: 32 }} />
          <div className="brand-name" style={{ fontSize: "1rem" }}>Coretech Talents</div>
        </div>

        {tabs.map((tab) => (
          <button key={tab.key} className={view === tab.key ? "btn-primary" : ""} onClick={() => setView(tab.key)}>
            {tab.label}
          </button>
        ))}

        <button onClick={onLogout} style={{ marginTop: "auto" }}>Candidate Log out</button>
      </div>

      <div className="candidate-main" style={{ flex: 1, padding: "2.5rem" }}>
        {view === "profile" && <CandidateProfile token={token} />}
        {view === "browseJobs" && <CandidateJobBrowser token={token} />}
        {view === "myApplications" && <MyApplications token={token} onBack={() => setView("profile")} />}
        {view === "myResume" && <MyResume token={token} onBack={() => setView("profile")} />}
      </div>
    </div>
  );
}

function AdminDashboard({ adminKey, onBack }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/admin/dashboard`, { headers: { "X-Admin-Key": adminKey } })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [adminKey]);

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2>Super Admin Dashboard</h2>
        <button onClick={onBack}>Log out</button>
      </div>

      {loading && <p className="hint">Loading dashboard...</p>}
      {error && <p className="msg-error">{error}</p>}

      {stats && (
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <div className="card"><p className="meta">Total Jobs</p><h3>{stats.total_jobs}</h3></div>
          <div className="card"><p className="meta">Active Jobs</p><h3>{stats.active_jobs}</h3></div>
          <div className="card"><p className="meta">Total Applications</p><h3>{stats.total_applications}</h3></div>
          <div className="card"><p className="meta">Total Recruiters</p><h3>{stats.total_recruiters}</h3></div>
          <div className="card"><p className="meta">Total Candidates</p><h3>{stats.total_candidates}</h3></div>
          <div className="card"><p className="meta">Total Views</p><h3>{stats.total_views}</h3></div>
        </div>
      )}

      <PendingRecruiters adminKey={adminKey} />
      <ContactQueries adminKey={adminKey} />
    </div>
  );
}

function PendingRecruiters({ adminKey }) {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  function loadPending() {
    setLoading(true);
    fetch(`${API_BASE}/admin/recruiters/pending`, { headers: { "X-Admin-Key": adminKey } })
      .then((res) => res.json())
      .then((data) => setPending(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  async function handleApprove(recruiterId) {
    setApprovingId(recruiterId);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/recruiters/${recruiterId}/approve`, {
        method: "POST",
        headers: { "X-Admin-Key": adminKey },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to approve recruiter");

      setPending((prev) => prev.filter((r) => r.id !== recruiterId));
    } catch (err) {
      setError(err.message);
    } finally {
      setApprovingId(null);
    }
  }

  async function handleReject(recruiterId) {
    if (!window.confirm("Reject this recruiter? This cannot be undone.")) return;

    setRejectingId(recruiterId);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/recruiters/${recruiterId}/reject`, {
        method: "POST",
        headers: { "X-Admin-Key": adminKey },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to reject recruiter");

      setPending((prev) => prev.filter((r) => r.id !== recruiterId));
    } catch (err) {
      setError(err.message);
    } finally {
      setRejectingId(null);
    }
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: "0.75rem" }}>Pending Recruiter Approvals</h3>

      {loading && <p className="hint">Loading pending recruiters...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && pending.length === 0 && <p className="empty-state">No recruiters awaiting approval.</p>}

      {pending.map((r) => (
        <div key={r.id} className="applicant-row">
          <p className="name">{r.full_name}</p>
          <p className="meta">
            {r.email} · {r.company_name} · {r.designation}
          </p>
          <div className="applicant-actions">
            <button
              className="btn-primary"
              onClick={() => handleApprove(r.id)}
              disabled={approvingId === r.id || rejectingId === r.id}
            >
              {approvingId === r.id ? "Approving..." : "Approve"}
            </button>
            <button
              onClick={() => handleReject(r.id)}
              disabled={approvingId === r.id || rejectingId === r.id}
            >
              {rejectingId === r.id ? "Rejecting..." : "Reject"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function IntroAnimation({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a1a3c 0%, #0f2557 100%)",
        zIndex: 9999,
      }}
    >
      <img
        src={logo}
        alt="Coretech Talents"
        style={{
          width: 120,
          height: 120,
          animation: "introPop 1s ease-out forwards",
        }}
      />
      <h1
        style={{
          color: "#fff",
          fontSize: "1.8rem",
          marginTop: "1.25rem",
          opacity: 0,
          animation: "introFadeUp 0.8s ease-out 0.5s forwards",
        }}
      >
        Coretech Talents
      </h1>
      <p
        style={{
          color: "#7fe0c9",
          fontSize: "0.95rem",
          marginTop: "0.5rem",
          opacity: 0,
          animation: "introFadeUp 0.8s ease-out 0.9s forwards",
        }}
      >
        Connecting talent with opportunity
      </p>

      <style>{`
        @keyframes introPop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes introFadeUp {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ContactUsModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", mobile_number: "", query: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to submit query");

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div className="form-card" style={{ maxWidth: 420, width: "90%" }} onClick={(e) => e.stopPropagation()}>
        <button className="btn-link" style={{ float: "right" }} onClick={onClose}>✕</button>
        <h2>Contact Us</h2>

        {submitted ? (
          <>
            <p className="msg-success" style={{ marginTop: "1rem" }}>
              Thanks, {form.name.split(" ")[0]}! We've received your query and will get back to you soon.
            </p>
            <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={onClose}>Close</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Mobile Number</label>
              <input type="tel" name="mobile_number" value={form.mobile_number} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Your Query</label>
              <textarea name="query" rows={4} value={form.query} onChange={handleChange} required />
            </div>
            {error && <p className="msg-error">{error}</p>}
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ContactQueries({ adminKey }) {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function loadQueries() {
    setLoading(true);
    fetch(`${API_BASE}/contact/`, { headers: { "X-Admin-Key": adminKey } })
      .then((res) => res.json())
      .then((data) => setQueries(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  async function handleResolve(id) {
    try {
      await fetch(`${API_BASE}/contact/${id}/resolve`, {
        method: "PATCH",
        headers: { "X-Admin-Key": adminKey },
      });
      setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, is_resolved: true } : q)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card" style={{ marginTop: "1.5rem" }}>
      <h3 style={{ marginBottom: "0.75rem" }}>Contact Queries</h3>

      {loading && <p className="hint">Loading queries...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && queries.length === 0 && <p className="empty-state">No queries yet.</p>}

      {queries.map((q) => (
        <div key={q.id} className="applicant-row">
          <p className="name">{q.name} {q.is_resolved && <span style={{ color: "#7fe0c9", fontSize: "0.8rem" }}>(Resolved)</span>}</p>
          <p className="meta">{q.email} · {q.mobile_number}</p>
          <p style={{ margin: "0.5rem 0" }}>{q.query}</p>
          {!q.is_resolved && (
            <div className="applicant-actions">
              <button className="btn-primary" onClick={() => handleResolve(q.id)}>Mark Resolved</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [error, setError] = useState(null);
  const [showSplash, setShowSplash] = useState(false);

  const [candidateToken, setCandidateToken] = useState(() => localStorage.getItem("candidate_token"));
  const [recruiterToken, setRecruiterToken] = useState(() => localStorage.getItem("recruiter_token"));
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("admin_key"));

  const [portalOpen, setPortalOpen] = useState(false);
  const [portalInitialRole, setPortalInitialRole] = useState(null);
  const [view, setView] = useState("jobs");
  const [contactOpen, setContactOpen] = useState(false);

  function handleCandidateLogin(token) {
    localStorage.setItem("candidate_token", token);
    setCandidateToken(token);
    setPortalOpen(false);
    setShowSplash(true);
    setTimeout(() => setShowSplash(false), 3000);
  }

  function handleRecruiterLogin(token) {
    localStorage.setItem("recruiter_token", token);
    setRecruiterToken(token);
    setPortalOpen(false);
    setShowSplash(true);
    setTimeout(() => setShowSplash(false), 3000);
  }

  function handleCandidateLogout() {
    localStorage.removeItem("candidate_token");
    setCandidateToken(null);
    setView("jobs");
  }

  function handleRecruiterLogout() {
    localStorage.removeItem("recruiter_token");
    setRecruiterToken(null);
    setView("jobs");
  }

  function handleAdminLogout() {
    localStorage.removeItem("admin_key");
    setAdminKey(null);
    setView("jobs");
  }

  function openRecruiterPortalForCampus() {
    setPortalInitialRole("recruiter");
    setPortalOpen(true);
    setView("jobs");
  }

  if (!introDone) {
    return <IntroAnimation onFinish={() => setIntroDone(true)} />;
}

  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;

  if (showSplash) {
    return <SplashScreen />;
  }

  if (recruiterToken) {
    return <RecruiterShell token={recruiterToken} onLogout={handleRecruiterLogout} />;
  }

  if (candidateToken) {
    return <CandidateShell token={candidateToken} onLogout={handleCandidateLogout} />;
  }

  return (
    <>
      <Hero
        onOpenPortal={() => { setPortalOpen(true); setView("jobs"); }}
        onAdminAccess={() => { setView("adminLogin"); setPortalOpen(false); }}
        onAbout={() => { setView("about"); setPortalOpen(false); }}
        onServices={() => { setView("services"); setPortalOpen(false); }}
       onHome={() => { setView("home"); setPortalOpen(false); }}
        onNewsletter={() => {
          document.getElementById("newsletter-section")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <CookieConsent />

      {!portalOpen && view === "jobs" && <NewsletterSection />}

      <div className="container">
        {portalOpen && (
          <PortalAccess
            onCandidateLogin={handleCandidateLogin}
            onRecruiterLogin={handleRecruiterLogin}
            initialRole={portalInitialRole}
            onClose={() => { setPortalOpen(false); setPortalInitialRole(null); }}
          />
        )}

        {view === "home" && !portalOpen && <HomeSection />}

        {view === "about" && !portalOpen && (
          <>
            <button className="btn-link" onClick={() => setView("jobs")}>← Back to home</button>
            <AboutSection />
          </>
        )}

        {view === "services" && !portalOpen && (
          <>
            <button className="btn-link" onClick={() => setView("jobs")}>← Back to home</button>
            <ServicesPage onCampusExploration={openRecruiterPortalForCampus} />
          </>
        )}

        {view === "adminLogin" && !portalOpen && (
          <>
            <button className="btn-link" onClick={() => setView("jobs")}>Back to jobs</button>
            <AdminLogin
              onLogin={(key) => {
                localStorage.setItem("admin_key", key);
                setAdminKey(key);
                setView("admin");
              }}
            />
          </>
        )}

        {view === "admin" && !portalOpen && adminKey && (
          <AdminDashboard adminKey={adminKey} onBack={handleAdminLogout} />
        )}

        {!portalOpen && view === "home" && (
          <button className="btn-primary" onClick={() => setContactOpen(true)} style={{ margin: "2rem auto", display: "block" }}>
            Contact Us
          </button>
        )}
      </div>

      {contactOpen && <ContactUsModal onClose={() => setContactOpen(false)} />}
    </>
  );
}

export default App;