import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/coretech-logo.png";
import introVideo from "./assets/intro.mp4";
import CookieConsent from "./CookieConsent";
import ResumeServices from "./ResumeServices";
import CampusExploration from "./CampusExploration";


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
// ================= SERVICES PAGE =================
function ResumeConsentModal({ onConfirm, onCancel }) {
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
      onClick={onCancel}
    >
      <div className="form-card" style={{ maxWidth: 420, width: "90%" }} onClick={(e) => e.stopPropagation()}>
        <h2>Leaving to Resume Builder</h2>
        <p className="card-meta" style={{ marginTop: "0.75rem" }}>
          This will open our Resume Building tool in a new tab. Do you want to continue?
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
          <button className="btn-primary" onClick={onConfirm}>Yes, continue</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ onCampusExploration }) {
  const [expanded, setExpanded] = useState(null);
  const [showResumeConsent, setShowResumeConsent] = useState(false);

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
    {
      id: "resumeBuilding",
      title: "Resume Building",
      summary: "Build a professional resume with our guided templates and live preview.",
      isExternalTool: true,
    },
  ];

  function handleClick(service) {
    if (service.isRecruiterOnly) {
      onCampusExploration();
      return;
    }
    if (service.isExternalTool) {
      setShowResumeConsent(true);
      return;
    }
    setExpanded((prev) => (prev === service.id ? null : service.id));
  }

  function handleResumeConfirm() {
    setShowResumeConsent(false);
    window.open("/services/resume-building", "_blank", "noopener,noreferrer");
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

            {service.isExternalTool && (
              <p className="hint" style={{ marginTop: "0.5rem" }}>
                Click to open the Resume Builder →
              </p>
            )}

            {!service.isRecruiterOnly && !service.isExternalTool && expanded === service.id && (
              <p className="card-desc" style={{ marginTop: "0.75rem" }}>{service.body}</p>
            )}

            {!service.isRecruiterOnly && !service.isExternalTool && (
              <p className="hint" style={{ marginTop: "0.5rem" }}>
                {expanded === service.id ? "Click to collapse ↑" : "Click to read more →"}
              </p>
            )}
          </div>
        ))}
      </div>

      {showResumeConsent && (
        <ResumeConsentModal
          onConfirm={handleResumeConfirm}
          onCancel={() => setShowResumeConsent(false)}
        />
      )}
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
        <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", marginBottom: "1rem" }}>
          <a href="http://www.youtube.com/@CoreTech_Talents" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: "var(--text-primary)", opacity: 0.75 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
             <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "var(--text-primary)", opacity: 0.75 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c2.7 0 3.05.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53c.64-.25 1.37-.42 2.43-.47C8.95.01 9.3 0 12 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.17 1.17 0 1 0 0-2.34 1.17 1.17 0 0 0 0 2.34Z" />
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--text-primary)", opacity: 0.75 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
            </svg>
          </a>
        </div>
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

function PortalAccess({ onCandidateLogin, onRecruiterLogin, onClose, initialRole = null, initialMode = "login" }) {
  const [role, setRole] = useState(initialRole);
  const [mode, setMode] = useState(initialMode);
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

// ================= SHARE JOB BUTTON (WhatsApp / LinkedIn / SMS / copy link) =================
function ShareJobButton({ job }) {
  const [copied, setCopied] = useState(false);
  const jobUrl = `${window.location.origin}/jobs/${job.id}`;
  const shareText = `Check out this job: ${job.title}${job.company_name ? ` at ${job.company_name}` : ""}`;

  function handleCopy(e) {
    e.stopPropagation();
    navigator.clipboard
      .writeText(jobUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  const shareBtnStyle = {
    padding: "0.4rem 0.85rem",
    borderRadius: "8px",
    border: "1px solid var(--line, #ccc)",
    background: "#fff",
    color: "var(--text-primary, #1a1a1a)",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
  };

  return (
    <div
      style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}
      onClick={(e) => e.stopPropagation()}
    >
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${jobUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle}
        title="Share on WhatsApp"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle}
        title="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <a
        href={`sms:?body=${encodeURIComponent(`${shareText} ${jobUrl}`)}`}
        style={shareBtnStyle}
        title="Share via SMS"
      >
        SMS
      </a>
      <button type="button" onClick={handleCopy} style={shareBtnStyle}>
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}

function JobCard({ job, token, onRequireLogin }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);

  async function handleApply(e) {
    e.stopPropagation();
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

  const skills = (job.skills_required || "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => Boolean(s) && s.toLowerCase() !== "none");
  const isApplied = status === "applied";

  return (
    <div className="card" onClick={() => setExpanded((v) => !v)} style={{ cursor: "pointer" }}>
      <h2>{job.title}</h2>

      {expanded && (
        <>
          <p className="card-meta">{job.company_name} · {job.location} · {job.employment_type}</p>

          {(job.experience_required || job.salary || job.domain) && (
            <p className="card-meta card-meta-secondary">
              {job.experience_required && <span>{job.experience_required}</span>}
              {job.experience_required && (job.salary || job.domain) && " · "}
              {job.salary && <span>{job.salary}</span>}
              {job.salary && job.domain && " · "}
              {job.domain && <span>{job.domain}</span>}
            </p>
          )}

          <p className="card-desc">{job.description}</p>

          {skills.length > 0 && (
            <div className="tags">
              {skills.map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
          )}

          <button
            className={isApplied ? "btn-applied" : "btn-primary"}
            onClick={handleApply}
            disabled={status === "applying" || isApplied}
          >
            {status === "applying" ? "Applying..." : isApplied ? "Applied ✓" : "Apply"}
          </button>
          {message && (
            <span className={`status-line ${status === "error" ? "msg-error" : "msg-success"}`}>
              <span className={`status-dot ${status}`}></span>
              {message}
            </span>
          )}

          <ShareJobButton job={job} />
        </>
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
  const [experienceRequired, setExperienceRequired] = useState("");
  const [salary, setSalary] = useState("");
  const [domain, setDomain] = useState("");
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
          experience_required: experienceRequired || undefined,
          salary: salary || undefined,
          domain: domain || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to post job");

      setTitle("");
      setDescription("");
      setCompanyName("");
      setLocation("");
      setSkillsRequired("");
      setExperienceRequired("");
      setSalary("");
      setDomain("");
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
        <div className="field">
          <label>Experience required</label>
          <input value={experienceRequired} onChange={(e) => setExperienceRequired(e.target.value)} placeholder="e.g. 2-4 years" />
        </div>
        <div className="field">
          <label>Salary</label>
          <input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. 6-8 LPA" />
        </div>
        <div className="field">
          <label>Domain</label>
          <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="e.g. IT, Manufacturing" />
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
  return (
    <div>
      <div className="card" style={{ marginBottom: "1.25rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Colleges in your area</h3>
        <p className="card-meta">Search by city to find engineering, polytechnic, ITI, and arts colleges for campus drives.</p>
      </div>

      <CampusExploration />
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

const PIPELINE_STAGES = ["applied", "shortlisted", "interview", "offer", "hired"];

function stageLabel(status) {
  if (status === "pending") return "Applied";
  if (status === "accepted") return "Hired";
  if (status === "rejected") return "Rejected";
  return status.charAt(0).toUpperCase() + status.slice(1);
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

  const isRejected = applicant.status === "rejected";
  // Treat legacy "pending"/"accepted" values as "applied"/"hired" for stepper position.
  const normalizedStatus =
    applicant.status === "pending" ? "applied" :
    applicant.status === "accepted" ? "hired" :
    applicant.status;
  const currentIndex = PIPELINE_STAGES.indexOf(normalizedStatus);

  return (
    <div className="applicant-row">
      <p className="name">{applicant.name}</p>
      <p className="meta">
        {applicant.email}
        {applicant.mobile_number && ` · ${applicant.mobile_number}`} · Skills: {applicant.skills} · Relevance: {applicant.relevance}
      </p>
      <span className={`status-line ${applicant.status}`}>
        <span className={`status-dot ${applicant.status}`}></span>
        {stageLabel(applicant.status)}
      </span>

      {!isRejected && (
        <div className="pipeline-stepper" style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", margin: "0.6rem 0" }}>
          {PIPELINE_STAGES.map((stage, i) => (
            <button
              key={stage}
              type="button"
              disabled={updating}
              onClick={() => updateStatus(stage)}
              className={i === currentIndex ? "btn-applied" : ""}
              style={{
                padding: "0.35rem 0.7rem",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: i === currentIndex ? 700 : 500,
                border: "1px solid var(--line, #ccc)",
                background: i === currentIndex ? undefined : "#fff",
                cursor: updating ? "default" : "pointer",
                opacity: i < currentIndex ? 0.6 : 1,
              }}
              title={i < currentIndex ? "Move back to this stage" : i > currentIndex ? "Move forward to this stage" : "Current stage"}
            >
              {stageLabel(stage)}
            </button>
          ))}
        </div>
      )}

      <div className="applicant-actions">
        <button
          disabled={updating || isRejected}
          onClick={() => updateStatus("rejected")}
          style={{ color: isRejected ? undefined : "#B3261E" }}
          className={isRejected ? "btn-applied" : ""}
        >
          {isRejected ? "Rejected" : "Reject"}
        </button>
        <button onClick={handleDownloadResume} disabled={downloading}>
          {downloading ? "Downloading..." : "Download Resume"}
        </button>
      </div>
      {error && <p className="msg-error">{error}</p>}
    </div>
  );
}

function KanbanCard({ applicant, jobId, token, onStatusChanged }) {
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
      if (!res.ok) throw new Error("Failed to download resume");
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

  const normalizedStatus =
    applicant.status === "pending" ? "applied" : applicant.status === "accepted" ? "hired" : applicant.status;
  const currentIndex = PIPELINE_STAGES.indexOf(normalizedStatus);

  return (
    <div className="card" style={{ padding: "0.75rem", marginBottom: "0.5rem" }}>
      <p style={{ fontWeight: 600, fontSize: 13, margin: 0 }}>{applicant.name}</p>
      <p className="hint" style={{ margin: "2px 0 6px" }}>{applicant.relevance ? `Relevance: ${applicant.relevance}` : applicant.skills}</p>

      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "6px" }}>
        {currentIndex > 0 && (
          <button disabled={updating} onClick={() => updateStatus(PIPELINE_STAGES[currentIndex - 1])} style={{ fontSize: 11, padding: "2px 6px" }}>
            ← Back
          </button>
        )}
        {currentIndex < PIPELINE_STAGES.length - 1 && applicant.status !== "rejected" && (
          <button disabled={updating} onClick={() => updateStatus(PIPELINE_STAGES[currentIndex + 1])} className="btn-primary" style={{ fontSize: 11, padding: "2px 6px" }}>
            Advance →
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: "6px" }}>
        <button disabled={updating || applicant.status === "rejected"} onClick={() => updateStatus("rejected")} style={{ fontSize: 11, color: "#B3261E" }}>
          Reject
        </button>
        <button onClick={handleDownloadResume} disabled={downloading} style={{ fontSize: 11 }}>
          {downloading ? "..." : "Resume"}
        </button>
      </div>
      {error && <p className="msg-error" style={{ fontSize: 11, margin: "4px 0 0" }}>{error}</p>}
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
      <button className="btn-link" onClick={onBack}>← Back to my jobs</button>
      <h2 className="page-title">{job.title} — Applicants</h2>

      {loading && <p className="empty-state">Loading applicants...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && applicants.length === 0 && <p className="empty-state">No applicants yet.</p>}

      {!loading && applicants.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "12px", marginTop: "1rem" }}>
          {PIPELINE_STAGES.map((stage) => {
            const inStage = applicants.filter((a) => {
              const norm = a.status === "pending" ? "applied" : a.status === "accepted" ? "hired" : a.status;
              return norm === stage;
            });
            return (
              <div key={stage} style={{ background: "var(--bg, #f3f7fd)", borderRadius: "12px", padding: "10px" }}>
                <p className="hint" style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  {stageLabel(stage)} <span>{inStage.length}</span>
                </p>
                {inStage.map((a) => (
                  <KanbanCard key={a.application_id} applicant={a} jobId={job.id} token={token} onStatusChanged={handleStatusChanged} />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RecruiterDashboard({ token }) {
  const [myJobs, setMyJobs] = useState([]);
  const [jobStats, setJobStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/jobs/mine/list`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setMyJobs(data);
        Promise.all(
          data.map((job) =>
            fetch(`${API_BASE}/jobs/${job.id}/applicants`, { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => res.json())
              .then((d) => ({ id: job.id, applicants: d.applicants || [] }))
              .catch(() => ({ id: job.id, applicants: [] }))
          )
        ).then((results) => {
          const stats = {};
          results.forEach((r) => {
            const counts = [0, 0, 0, 0, 0];
            r.applicants.forEach((a) => {
              const norm = a.status === "pending" ? "applied" : a.status === "accepted" ? "hired" : a.status;
              const idx = PIPELINE_STAGES.indexOf(norm);
              if (idx !== -1) counts[idx] += 1;
            });
            stats[r.id] = counts;
          });
          setJobStats(stats);
        });
      })
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

      {myJobs.map((job) => {
        const stages = jobStats[job.id] || [0, 0, 0, 0, 0];
        const total = stages.reduce((a, b) => a + b, 0);
        const max = Math.max(...stages, 1);
        return (
          <div key={job.id} className="card job-pick" onClick={() => setSelectedJob(job)} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <h3 style={{ margin: 0 }}>{job.title}</h3>
                <p className="card-meta" style={{ margin: "4px 0 0" }}>
                  {job.company_name} · {job.location} · {job.employment_type}
                  {job.is_active === false && " · inactive"}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{total}</p>
                <p className="hint" style={{ margin: 0 }}>applicants</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "6px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--line)" }}>
              {PIPELINE_STAGES.map((stage, i) => (
                <div key={stage} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <span className="hint" style={{ fontSize: 11 }}>{stages[i]}</span>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 34,
                      height: Math.round((stages[i] / max) * 32) + 4,
                      borderRadius: "4px 4px 0 0",
                      background: "var(--blue-600, #2554E8)",
                      opacity: 0.4 + (i / PIPELINE_STAGES.length) * 0.6,
                    }}
                  />
                  <span className="hint" style={{ fontSize: 10, textAlign: "center" }}>{stageLabel(stage)}</span>
                </div>
              ))}
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <ShareJobButton job={job} />
            </div>
          </div>
        );
      })}
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
    profile.resume_file,
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
    education_level: "",
    field_of_study: "",
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
          education_level: data.education_level || "",
          field_of_study: data.field_of_study || "",
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
              <label>Education level</label>
              <select value={form.education_level} onChange={(e) => handleFormChange("education_level", e.target.value)}>
                <option value="">Select</option>
                <option value="Graduate">Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Diploma">Diploma</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div className="field">
              <label>Field of study</label>
              <input value={form.field_of_study} onChange={(e) => handleFormChange("field_of_study", e.target.value)} placeholder="e.g. Computer Science" />
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

                        <h2 style={{ color: "var(--blue-700)" }}>{profile.full_name}</h2>
            {profile.designation && <p className="card-meta">{profile.designation}</p>}

            {profile.resume_headline && (
              <p className="card-desc" style={{ maxWidth: 500 }}>{profile.resume_headline}</p>
            )}
          </div>

          <div style={{
            marginTop: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.9rem",
            background: "var(--bg)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-sm)",
            padding: "1.1rem 1.25rem",
          }}>
            <p className="card-meta"><strong style={{ color: "var(--blue-700)" }}>Email:</strong> {profile.email}</p>
            {profile.mobile_number && <p className="card-meta"><strong style={{ color: "var(--blue-700)" }}>Mobile:</strong> {profile.mobile_number}</p>}
            {profile.location && <p className="card-meta"><strong style={{ color: "var(--blue-700)" }}>Location:</strong> {profile.location}</p>}
            {profile.years_of_experience && <p className="card-meta"><strong style={{ color: "var(--blue-700)" }}>Experience:</strong> {profile.years_of_experience} yrs</p>}
            {profile.current_ctc && <p className="card-meta"><strong style={{ color: "var(--blue-700)" }}>Current CTC:</strong> {profile.current_ctc}</p>}
            {profile.expected_ctc && <p className="card-meta"><strong style={{ color: "var(--blue-700)" }}>Expected CTC:</strong> {profile.expected_ctc}</p>}
            {profile.notice_period && <p className="card-meta"><strong style={{ color: "var(--blue-700)" }}>Notice period:</strong> {profile.notice_period}</p>}
            {profile.education_level && (
              <p className="card-meta">
                <strong style={{ color: "var(--blue-700)" }}>Education:</strong> {profile.education_level}
                {profile.field_of_study && ` - ${profile.field_of_study}`}
              </p>
            )}
          </div>

          <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
            <button className="btn-primary" onClick={handleDownloadResume} disabled={downloading}>
              {downloading ? "Downloading..." : "Download Resume"}
            </button>
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
function candidateInitials(name) {
  if (!name) return "?";
  return name.split(" ").filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function CandidateSearchCard({ candidate, token, onViewProfile, onDownloadResume, downloadingId }) {
  const skillList = (candidate.skills || "").split(",").map((s) => s.trim()).filter(Boolean);
  const visibleSkills = skillList.slice(0, 4);
  const extra = skillList.length - visibleSkills.length;

  return (
    <div className="cs-card" onClick={() => onViewProfile(candidate.id)}>
      <div className="cs-card-top">
        <CandidatePictureThumb candidateId={candidate.id} token={token} size={46} />
        <div className="cs-card-id">
          <p className="cs-card-name">{candidate.full_name}</p>
          <p className="cs-card-title">
            {candidate.designation || "—"}
            {candidate.current_company && ` at ${candidate.current_company}`}
          </p>
          {candidate.location && <p className="cs-card-loc">{candidate.location}</p>}
        </div>
        {candidate.years_of_experience != null && (
          <div className="cs-exp-badge">{candidate.years_of_experience}<span>yrs</span></div>
        )}
      </div>

      {candidate.resume_headline && <p className="cs-headline">{candidate.resume_headline}</p>}

      <hr className="cs-divider" />

      {skillList.length > 0 && (
        <div className="cs-skills-row">
          {visibleSkills.map((s) => (
            <span className="cs-skill-tag" key={s}>{s}</span>
          ))}
          {extra > 0 && <span className="cs-skill-tag extra">+{extra} more</span>}
        </div>
      )}

      <div className="cs-meta-row">
        {candidate.expected_ctc != null && <span className="cs-meta-item">Expected: {candidate.expected_ctc}</span>}
        {candidate.notice_period && <span className="cs-meta-item">Notice: {candidate.notice_period}</span>}
        {candidate.education_level && (
          <span className="cs-meta-item">
            {candidate.education_level}{candidate.field_of_study && ` - ${candidate.field_of_study}`}
          </span>
        )}
      </div>

      <div className="cs-card-actions" onClick={(e) => e.stopPropagation()}>
        <button className="cs-btn cs-btn-primary" onClick={() => onViewProfile(candidate.id)}>
          View profile
        </button>
        <button
          className="cs-btn cs-btn-outline"
          onClick={(e) => onDownloadResume(candidate, e)}
          disabled={downloadingId === candidate.id}
        >
          {downloadingId === candidate.id ? "Downloading..." : "Resume"}
        </button>
      </div>
    </div>
  );
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("relevance");
  const PAGE_SIZE = 10;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailQuery = filters.q.includes("@");
  const isValidEmail = isEmailQuery ? EMAIL_REGEX.test(filters.q) : true;

  function handleChange(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  async function fetchCandidates(filterValues) {
    setError("");
    setLoading(true);
    setCurrentPage(1);

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

  const sortedResults = useMemo(() => {
    const list = [...results];
    if (sort === "experience") {
      list.sort((a, b) => (b.years_of_experience || 0) - (a.years_of_experience || 0));
    } else if (sort === "name") {
      list.sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
    }
    return list;
  }, [results, sort]);

  const totalPages = Math.ceil(sortedResults.length / PAGE_SIZE);
  const paginatedResults = sortedResults.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
    <div className="cs-wrap">
      <div className="cs-hero">
        <h1>Find your next hire</h1>
        <p>{loading ? "Loading candidates..." : `${results.length} candidate${results.length === 1 ? "" : "s"} in the pool`}</p>

        <form className="cs-searchbar" onSubmit={handleSearch}>
          <span className="cs-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={filters.q}
            onChange={(e) => handleChange("q", e.target.value)}
            placeholder="Search by name, skills, email, or mobile"
            style={{ color: "var(--ink)", background: "var(--white)" }}
          />
          <button className="cs-search-btn" type="submit" disabled={loading || (isEmailQuery && !isValidEmail)}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {isEmailQuery && !isValidEmail && (
          <p className="cs-inline-error">That doesn't look like a valid email address</p>
        )}
      </div>

      <div className="cs-layout">
        <aside className="cs-panel cs-filters">
          <h3>
            Filters
            {hasActiveFilters && (
              <button className="cs-clear" onClick={handleClearFilters} type="button">Clear all</button>
            )}
          </h3>

          <div className="cs-filter-group">
            <label className="cs-group-label">Experience (yrs)</label>
            <div className="cs-range-row">
              <input type="number" placeholder="Min" value={filters.min_experience} onChange={(e) => handleChange("min_experience", e.target.value)} />
              <input type="number" placeholder="Max" value={filters.max_experience} onChange={(e) => handleChange("max_experience", e.target.value)} />
            </div>
          </div>

          <div className="cs-filter-group">
            <label className="cs-group-label">Expected Salary</label>
            <div className="cs-range-row">
              <input type="number" placeholder="Min" value={filters.min_salary} onChange={(e) => handleChange("min_salary", e.target.value)} />
              <input type="number" placeholder="Max" value={filters.max_salary} onChange={(e) => handleChange("max_salary", e.target.value)} />
            </div>
          </div>

          <div className="cs-filter-group">
            <label className="cs-group-label">Education Level</label>
            <select value={filters.education_level} onChange={(e) => handleChange("education_level", e.target.value)}>
              <option value="">Any</option>
              <option value="Graduate">Graduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          <div className="cs-filter-group">
            <label className="cs-group-label">Field of Study</label>
            <input value={filters.field_of_study} onChange={(e) => handleChange("field_of_study", e.target.value)} placeholder="e.g. Computer Science" />
          </div>

          <button className="cs-btn cs-btn-primary" style={{ width: "100%", marginTop: "0.5rem" }} onClick={handleSearch} disabled={loading}>
            Apply filters
          </button>
        </aside>

        <main>
          <div className="cs-results-bar">
            <div className="cs-results-count">
              <b>{sortedResults.length}</b> candidate{sortedResults.length === 1 ? "" : "s"}
              {hasActiveFilters ? " match your filters" : " total"}
            </div>
            <div className="cs-sort-wrap">
              <label htmlFor="csSortSelect">Sort by</label>
              <select id="csSortSelect" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="experience">Most experienced</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </div>
          </div>

          {error && <p className="msg-error">{error}</p>}

          <div className="cs-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
            {!loading && paginatedResults.length === 0 && !error && (
              <div className="cs-empty-state">
                <div className="cs-empty-big">
                  {hasActiveFilters ? "No candidates match these filters" : "No candidates registered yet"}
                </div>
                {hasActiveFilters && (
                  <>
                    <div>Try widening a range or clearing a filter.</div>
                    <button onClick={handleClearFilters} type="button">Clear all filters</button>
                  </>
                )}
              </div>
            )}

            {paginatedResults.map((candidate) => (
              <CandidateSearchCard
                key={candidate.id}
                candidate={candidate}
                token={token}
                onViewProfile={setSelectedCandidateId}
                onDownloadResume={handleDownloadResume}
                downloadingId={downloadingId}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                ← Previous
              </button>
              <span className="hint">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                Next →
              </button>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .cs-wrap { --cs-bg:#FFFFFF; --cs-surface:#F3F7FD; --cs-ink:#0B1B33; --cs-ink-soft:#56637D; --cs-ink-faint:#8A96AC;
          --cs-line:#DCE6F5; --cs-line-strong:#C3D5F0; --cs-navy:#0E2A63; --cs-navy-800:#123170;
          --cs-blue:#2454E0; --cs-blue-hover:#1A45C4; --cs-blue-100:#E4ECFE; --cs-blue-050:#F3F7FD;
          --cs-radius-sm:8px; --cs-radius-md:12px; --cs-radius-lg:16px;
          --cs-shadow-card:0 1px 2px rgba(14,42,99,0.06), 0 8px 24px rgba(14,42,99,0.05);
          --cs-shadow-card-hover:0 4px 10px rgba(14,42,99,0.08), 0 16px 32px rgba(14,42,99,0.09);
          font-family:'Inter',system-ui,sans-serif; color:var(--cs-ink); }
        .cs-wrap *{ box-sizing:border-box; }
        .cs-hero{ background:linear-gradient(180deg,var(--cs-navy) 0%, var(--cs-navy-800) 100%);
          padding:28px 24px 84px; margin:-2.5rem -2.5rem 0; border-radius: 0 0 var(--cs-radius-lg) var(--cs-radius-lg); }
        .cs-hero h1{ font-family:'Space Grotesk',sans-serif; font-size:24px; font-weight:600; color:#fff; margin:0 0 4px; }
        .cs-hero p{ margin:0; color:#AFC2F0; font-size:13.5px; }
        .cs-searchbar{ margin-top:18px; background:#fff; border-radius:var(--cs-radius-lg); box-shadow:0 12px 32px rgba(4,17,45,0.28);
          padding:8px; display:flex; gap:8px; align-items:center; }
        .cs-searchbar input[type="text"]{ flex:1; border:none; outline:none; font-size:15px; padding:12px 14px; background:transparent; }
        .cs-icon-wrap{ color:var(--cs-ink-faint); padding-left:8px; display:flex; }
        .cs-search-btn{ background:var(--cs-blue); color:#fff; border:none; border-radius:var(--cs-radius-md); padding:12px 22px;
          font-weight:600; font-size:14px; cursor:pointer; white-space:nowrap; }
        .cs-search-btn:hover{ background:var(--cs-blue-hover); }
        .cs-search-btn:disabled{ opacity:0.6; cursor:default; }
        .cs-inline-error{ color:#c0392b; font-size:12.5px; margin:8px 0 0; }
        .cs-layout{ margin-top:-56px; position:relative; display:grid; grid-template-columns:240px 1fr; gap:24px; padding: 0 0.5rem; }
        .cs-panel{ background:#fff; border:1px solid var(--cs-line); border-radius:var(--cs-radius-lg); box-shadow:var(--cs-shadow-card); }
        .cs-filters{ padding:20px; align-self:start; position:sticky; top:24px; }
        .cs-filters h3{ font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:600; margin:0 0 14px;
          display:flex; align-items:center; justify-content:space-between; }
        .cs-clear{ font-size:12px; font-weight:500; color:var(--cs-blue); background:none; border:none; cursor:pointer; padding:0; }
        .cs-filter-group{ margin-bottom:18px; }
        .cs-group-label{ display:block; font-size:12px; font-weight:600; color:var(--cs-ink-soft); text-transform:uppercase;
          letter-spacing:.04em; margin-bottom:8px; }
        .cs-filter-group select, .cs-filter-group input{ width:100%; padding:9px 10px; border:1px solid var(--cs-line);
          border-radius:var(--cs-radius-sm); font-size:13px; color:var(--cs-ink); background:#fff; }
        .cs-range-row{ display:flex; gap:8px; }
        .cs-results-bar{ display:flex; align-items:center; justify-content:space-between; margin:0 0 16px; flex-wrap:wrap; gap:10px; }
        .cs-results-count{ font-size:14px; color:var(--cs-ink-soft); }
        .cs-results-count b{ color:var(--cs-ink); font-weight:600; }
        .cs-sort-wrap{ display:flex; align-items:center; gap:8px; }
        .cs-sort-wrap label{ font-size:13px; color:var(--cs-ink-soft); }
        .cs-sort-wrap select{ padding:8px 10px; border:1px solid var(--cs-line); border-radius:var(--cs-radius-sm); font-size:13px; }
        .cs-grid{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .cs-card{ background:#fff; border:1px solid var(--cs-line); border-radius:var(--cs-radius-lg); padding:18px;
          box-shadow:var(--cs-shadow-card); transition:box-shadow .15s ease, transform .15s ease, border-color .15s ease; cursor:pointer; }
        .cs-card:hover{ box-shadow:var(--cs-shadow-card-hover); transform:translateY(-2px); border-color:var(--cs-line-strong); }
        .cs-card-top{ display:flex; align-items:flex-start; gap:12px; }
        .cs-card-id{ flex:1; min-width:0; }
        .cs-card-name{ font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:16px; margin:0 0 2px;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .cs-card-title{ font-size:13px; color:var(--cs-ink-soft); margin:0; }
        .cs-card-loc{ font-size:12.5px; color:var(--cs-ink-faint); margin:3px 0 0; }
        .cs-exp-badge{ flex-shrink:0; background:var(--cs-blue-100); color:var(--cs-navy); border-radius:var(--cs-radius-sm);
          padding:4px 8px; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:14px; text-align:center; }
        .cs-exp-badge span{ display:block; font-size:9px; font-weight:600; color:var(--cs-ink-soft); }
        .cs-headline{ font-size:12.5px; color:var(--cs-ink-soft); margin:10px 0 0; }
        .cs-divider{ border:none; border-top:1px solid var(--cs-line); margin:14px 0; }
        .cs-skills-row{ display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px; }
        .cs-skill-tag{ font-size:11.5px; font-weight:500; padding:4px 9px; border-radius:999px; background:var(--cs-surface);
          color:var(--cs-navy-800); border:1px solid var(--cs-line); }
        .cs-skill-tag.extra{ color:var(--cs-ink-faint); background:transparent; border-style:dashed; }
        .cs-meta-row{ display:flex; align-items:center; gap:12px; margin-bottom:16px; font-size:12.5px; color:var(--cs-ink-soft); flex-wrap:wrap; }
        .cs-card-actions{ display:flex; gap:8px; }
        .cs-btn{ flex:1; padding:9px 14px; border-radius:var(--cs-radius-sm); font-size:13px; font-weight:600;
          cursor:pointer; text-align:center; border:1px solid transparent; }
        .cs-btn-primary{ background:var(--cs-blue); color:#fff; }
        .cs-btn-primary:hover{ background:var(--cs-blue-hover); }
        .cs-btn-outline{ background:#fff; color:var(--cs-blue); border-color:var(--cs-blue-100); }
        .cs-btn-outline:hover{ background:var(--cs-blue-050); }
        .cs-btn:disabled{ opacity:0.6; cursor:default; }
        .cs-empty-state{ grid-column:1/-1; text-align:center; padding:64px 20px; color:var(--cs-ink-soft); }
        .cs-empty-big{ font-family:'Space Grotesk',sans-serif; font-size:17px; font-weight:600; color:var(--cs-ink); margin-bottom:6px; }
        .cs-empty-state button{ margin-top:14px; background:var(--cs-blue); color:#fff; border:none; border-radius:var(--cs-radius-sm);
          padding:9px 18px; font-weight:600; font-size:13px; cursor:pointer; }
        @media (max-width:820px){
          .cs-layout{ grid-template-columns:1fr; margin-top:0; }
          .cs-grid{ grid-template-columns:1fr; }
          .cs-filters{ position:static; }
        }
      `}</style>
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

function RecruiterProfile({ token }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    designation: "",
    mobile_number: "",
    location: "",
  });

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  function loadProfile() {
    setLoading(true);
    fetch(`${API_BASE}/recruiters/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setForm({
          full_name: data.full_name || "",
          company_name: data.company_name || "",
          designation: data.designation || "",
          mobile_number: data.mobile_number || "",
          location: data.location || "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSaveProfile(e) {
    e.preventDefault();
    setSaveError("");
    setSaveMessage("");
    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/recruiters/me`, {
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

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 className="page-title">My Profile</h2>

      {!editing && (
        <>
          <div className="card" style={{ padding: 0, marginBottom: "1.25rem" }}>
            <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--line)" }}>
              <p style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{profile.full_name}</p>
              <p className="card-meta" style={{ margin: "4px 0 0" }}>
                {profile.designation}
                {profile.company_name && ` at ${profile.company_name}`}
              </p>
            </div>
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
            {profile.company_name && (
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
                <span className="card-meta">Company</span>
                <span className="card-meta" style={{ color: "var(--text-primary)" }}>{profile.company_name}</span>
              </div>
            )}
            {profile.location && (
              <div style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between" }}>
                <span className="card-meta">Location</span>
                <span className="card-meta" style={{ color: "var(--text-primary)" }}>{profile.location}</span>
              </div>
            )}
          </div>

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
              <label>Company name</label>
              <input value={form.company_name} onChange={(e) => handleFormChange("company_name", e.target.value)} />
            </div>
            <div className="field">
              <label>Designation</label>
              <input value={form.designation} onChange={(e) => handleFormChange("designation", e.target.value)} />
            </div>
            <div className="field">
              <label>Mobile number</label>
              <input value={form.mobile_number} onChange={(e) => handleFormChange("mobile_number", e.target.value)} pattern="[0-9]{10}" />
            </div>
            <div className="field">
              <label>Location</label>
              <input value={form.location} onChange={(e) => handleFormChange("location", e.target.value)} />
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
    </div>
  );
}

function RecruiterShell({ token, onLogout }) {
  const [view, setView] = useState("home");

  const tabs = [
    { key: "profile", label: "My Profile" },
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

        {view === "profile" && <RecruiterProfile token={token} />}
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

// ================= JOB DETAIL PAGE (per-job URL, SEO meta + JSON-LD) =================
function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyStatus, setApplyStatus] = useState("idle");
  const [applyMessage, setApplyMessage] = useState("");

  const candidateToken = localStorage.getItem("candidate_token");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Job not found");
        return res.json();
      })
      .then((data) => setJob(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!job) return;

    const previousTitle = document.title;
    document.title = `${job.title}${job.company_name ? ` at ${job.company_name}` : ""} | Coretech Talents`;

    let metaDesc = document.querySelector('meta[name="description"]');
    let createdMetaDesc = false;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
      createdMetaDesc = true;
    }
    const previousDesc = metaDesc.getAttribute("content");
    metaDesc.setAttribute(
      "content",
      job.description ? job.description.slice(0, 155) : `${job.title} - ${job.location} - Apply now on Coretech Talents.`
    );

    const scriptId = "job-jsonld";
    let script = document.getElementById(scriptId);
    let createdScript = false;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
      createdScript = true;
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      title: job.title,
      description: job.description,
      datePosted: job.created_at,
      employmentType: job.employment_type,
      hiringOrganization: {
        "@type": "Organization",
        name: job.company_name || "Coretech Talents",
      },
      jobLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
      },
    });

    return () => {
      document.title = previousTitle;
      if (createdMetaDesc) {
        metaDesc.remove();
      } else if (previousDesc !== null) {
        metaDesc.setAttribute("content", previousDesc);
      }
      if (createdScript) {
        script.remove();
      } else {
        script.textContent = "";
      }
    };
  }, [job]);

  async function handleApply() {
    if (!candidateToken) {
      navigate("/");
      return;
    }

    setApplyStatus("applying");
    setApplyMessage("");

    try {
      const res = await fetch(`${API_BASE}/candidates/jobs/${job.id}/apply`, {
        method: "POST",
        headers: { Authorization: `Bearer ${candidateToken}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 400 && data.detail?.toLowerCase().includes("already applied")) {
          setApplyStatus("applied");
          setApplyMessage("Already applied");
          return;
        }
        throw new Error(data.detail || "Failed to apply");
      }

      setApplyStatus("applied");
      setApplyMessage("Applied successfully");
    } catch (err) {
      setApplyStatus("error");
      setApplyMessage(err.message);
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: "2.5rem" }}>
        <p className="empty-state">Loading job...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container" style={{ paddingTop: "2.5rem" }}>
        <p className="msg-error">{error || "Job not found"}</p>
        <Link to="/" className="btn-link">← Back to home</Link>
      </div>
    );
  }

  const skills = (job.skills_required || "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => Boolean(s) && s.toLowerCase() !== "none");
  const isApplied = applyStatus === "applied";

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <Link to="/" className="btn-link">← Back to home</Link>

      <div className="card" style={{ maxWidth: 700, margin: "1.5rem auto" }}>
        <h2>{job.title}</h2>
        <p className="card-meta">{job.company_name} · {job.location} · {job.employment_type}</p>

        {(job.experience_required || job.salary || job.domain) && (
          <p className="card-meta card-meta-secondary">
            {job.experience_required && <span>{job.experience_required}</span>}
            {job.experience_required && (job.salary || job.domain) && " · "}
            {job.salary && <span>{job.salary}</span>}
            {job.salary && job.domain && " · "}
            {job.domain && <span>{job.domain}</span>}
          </p>
        )}

        <p className="card-desc">{job.description}</p>

        {skills.length > 0 && (
          <div className="tags">
            {skills.map((s) => (
              <span className="tag" key={s}>{s}</span>
            ))}
          </div>
        )}

        <button
          className={isApplied ? "btn-applied" : "btn-primary"}
          onClick={handleApply}
          disabled={applyStatus === "applying" || isApplied}
        >
          {applyStatus === "applying" ? "Applying..." : isApplied ? "Applied ✓" : "Apply"}
        </button>
        {applyMessage && (
          <span className={`status-line ${applyStatus === "error" ? "msg-error" : "msg-success"}`}>
            <span className={`status-dot ${applyStatus}`}></span>
            {applyMessage}
          </span>
        )}

        <ShareJobButton job={job} />
      </div>
    </div>
  );
}

function MainApp() {
  const [introDone, setIntroDone] = useState(false);
  const [error, setError] = useState(null);
  const [showSplash, setShowSplash] = useState(false);

  const [candidateToken, setCandidateToken] = useState(() => localStorage.getItem("candidate_token"));
  const [recruiterToken, setRecruiterToken] = useState(() => localStorage.getItem("recruiter_token"));
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("admin_key"));

  const [portalOpen, setPortalOpen] = useState(false);
  const [portalInitialRole, setPortalInitialRole] = useState(null);
  const [portalInitialMode, setPortalInitialMode] = useState("login");
  const [view, setView] = useState("jobs");
  const [contactOpen, setContactOpen] = useState(false);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("login") === "candidate") {
    setPortalInitialRole("candidate");
    setPortalInitialMode(params.get("mode") === "signup" ? "signup" : "login");
    setPortalOpen(true);
    setView("jobs");
    window.history.replaceState({}, "", "/");
  }
}, []);
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
            initialMode={portalInitialMode}
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

function App() {
  return (
    <Routes>
     <Route path="/" element={<MainApp />} />
     <Route path="/jobs/:id" element={<JobDetailPage />} />
     <Route path="/services/resume-building" element={<ResumeServices />} />
    </Routes>
  );
}

export default App;