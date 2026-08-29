import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/coretech-logo.png";
import introVideo from "./assets/intro.mp4";
import CookieConsent from "./CookieConsent";
import ResumeServices from "./ResumeServices";
import CampusExploration from "./CampusExploration";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import AudienceSplit from "./AudienceSplit";

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
  const [activeTab, setActiveTab] = useState("campus");
  const [showResumeConsent, setShowResumeConsent] = useState(false);

  const tabs = [
    { id: "campus", label: "Campus Exploration", icon: "🎓" },
    { id: "tech", label: "Tech & Non-Tech Hiring", icon: "💼" },
    { id: "rpo", label: "Expert Solutions", icon: "🤝" },
    { id: "resume", label: "Resume Building", icon: "📄" },
  ];

  function handleResumeConfirm() {
    setShowResumeConsent(false);
    window.open("/services/resume-building", "_blank", "noopener,noreferrer");
  }

  const roles = [
    { icon: "💻", label: "IT", desc: "Software, infrastructure & IT services", bg: "#E4ECFE", fg: "#123170" },
    { icon: "🎧", label: "ITES", desc: "Support, BPO & IT-enabled services", bg: "#E1F5EE", fg: "#0F6E56" },
    { icon: "🏭", label: "Manufacturing", desc: "Production, plant & shop-floor roles", bg: "#FDECD8", fg: "#8A4B0C" },
    { icon: "✈️", label: "Aerospace", desc: "Aviation & aerospace engineering", bg: "#EEEDFE", fg: "#3C3489" },
    { icon: "🚗", label: "Automobile", desc: "Automotive engineering & production", bg: "#FBEAF0", fg: "#993556" },
    { icon: "🧭", label: "Leadership", desc: "Senior, managerial & leadership hires", bg: "#FAEEDA", fg: "#854F0B" },
  ];

  const pipelineStages = [
    { num: "01", label: "Applied", desc: "Candidate applies through the portal", icon: "📝", cls: "hp-s1" },
    { num: "02", label: "Shortlisted", desc: "Skills matched against the role", icon: "🔎", cls: "hp-s2" },
    { num: "03", label: "Interview", desc: "Recruiter moves candidate forward", icon: "🗣️", cls: "hp-s3" },
    { num: "04", label: "Offer", desc: "Offer extended to the candidate", icon: "📄", cls: "hp-s4" },
    { num: "05", label: "Hired", desc: "Placement confirmed", icon: "✅", cls: "hp-s5" },
  ];

  const rpoSteps = [
    { num: 1, title: "Share your need", desc: "Tell us the roles and volume you're hiring for" },
    { num: 2, title: "Expert deployed", desc: "A dedicated recruiter joins your team in-office" },
    { num: 3, title: "End-to-end hiring", desc: "Sourcing through offer, fully managed for you" },
    { num: 4, title: "Ongoing support", desc: "Support continues as your hiring needs grow" },
  ];

  return (
    <div className="container sv-wrap" id="services-section" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="sv-head">
        <div className="sv-eyebrow">Our services</div>
        <h1 className="sv-title">Everything you need to hire, in one place</h1>
        <p className="sv-sub">From permanent placements to full recruitment support — pick what fits your hiring need.</p>
      </div>

      <div className="sv-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`sv-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="sv-tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ---- CAMPUS ---- */}
      {activeTab === "campus" && (
        <div className="sv-panel">
          <div className="sv-panel-head">
            <div className="sv-panel-badge" style={{ background: "#FDECD8" }}>🎓</div>
            <div>
              <h2>
                Campus Exploration <span className="sv-access-tag recruiters">RECRUITERS ONLY</span>
              </h2>
              <p>Direct access to fresh graduate talent through structured campus drives</p>
            </div>
          </div>
          <div className="sv-locked-card">
            <div className="sv-locked-icon">🔒</div>
            <h3>Available to recruiter accounts</h3>
            <p>
              Register a campus hiring requirement or browse partner colleges by city, domain, and course —
              log in as a recruiter to get started.
            </p>
            <button className="sv-locked-btn" onClick={onCampusExploration}>
              Log in as a recruiter →
            </button>
          </div>
        </div>
      )}

      {/* ---- TECH & NON-TECH ---- */}
      {activeTab === "tech" && (
        <div className="sv-panel">
          <div className="sv-panel-head">
            <div className="sv-panel-badge" style={{ background: "#E4ECFE" }}>💼</div>
            <div>
              <h2>Tech and Non Tech Hiring</h2>
              <p>Permanent placement solutions across technical and non-technical roles</p>
            </div>
          </div>
          <p className="sv-body-text">
            Every candidate moves through the same tracked pipeline — the same one your recruiters see in
            their own dashboard.
          </p>

          <div className="hp-funnel-card">
            <div className="hp-funnel">
              {pipelineStages.map((s) => (
                <div key={s.label} className={`hp-stage ${s.cls}`}>
                  <span className="hp-stage-num">{s.num}</span>
                  <div className="hp-stage-icon">{s.icon}</div>
                  {s.label}
                </div>
              ))}
            </div>
            <div className="hp-desc-row">
              {pipelineStages.map((s) => (
                <div key={s.label} className="hp-desc-item">
                  <span>{s.label}</span>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hp-roles-head">
            <h3>Roles we hire for</h3>
            <p>Across every domain, from entry-level to leadership</p>
          </div>
          <div className="hp-role-grid">
            {roles.map((r) => (
              <div key={r.label} className="hp-role-card">
                <div className="hp-role-icon" style={{ background: r.bg, color: r.fg }}>{r.icon}</div>
                <h4>{r.label}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---- RPO ---- */}
      {activeTab === "rpo" && (
        <div className="sv-panel">
          <div className="sv-panel-head">
            <div className="sv-panel-badge" style={{ background: "#E1F5EE" }}>🤝</div>
            <div>
              <h2>Coretech Expert Solutions</h2>
              <p>RPO-style support with a dedicated recruitment expert working alongside your team</p>
            </div>
          </div>
          <p className="sv-body-text">
            A dedicated recruitment expert works in-office with your team, managing the entire hiring
            process end-to-end — giving you in-house-level support without building an internal team from
            scratch.
          </p>

          <div className="rpo-card">
            <div className="rpo-flow">
              {rpoSteps.map((s, i) => (
                <div key={s.num} className={`rpo-step ${i === rpoSteps.length - 1 ? "last" : ""}`}>
                  <div className="rpo-step-num">{s.num}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---- RESUME BUILDING ---- */}
      {activeTab === "resume" && (
        <div className="sv-panel">
          <div className="sv-panel-head">
            <div className="sv-panel-badge" style={{ background: "#FBEAF0" }}>📄</div>
            <div>
              <h2>
                Resume Building <span className="sv-access-tag free">FREE</span>
              </h2>
              <p>Build a professional resume with guided templates and live preview</p>
            </div>
          </div>
          <div className="rb-card">
            <p className="sv-body-text" style={{ marginBottom: 0 }}>
              No signup required to try it — build a resume in minutes with a live preview as you go.
            </p>
            <div className="rb-features">
              <div className="rb-feature"><span className="rb-check">✓</span> Guided, professional templates</div>
              <div className="rb-feature"><span className="rb-check">✓</span> Live preview as you type</div>
              <div className="rb-feature"><span className="rb-check">✓</span> Download as PDF when you're done</div>
            </div>
            <button className="rb-btn" onClick={() => setShowResumeConsent(true)}>
              Open Resume Builder →
            </button>
          </div>
        </div>
      )}

      {showResumeConsent && (
        <ResumeConsentModal onConfirm={handleResumeConfirm} onCancel={() => setShowResumeConsent(false)} />
      )}

      <style>{`
        .sv-wrap { font-family: 'Inter', sans-serif; }

        .sv-head { text-align: center; max-width: 560px; margin: 0 auto 2rem; }
        .sv-eyebrow { font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; color: #2554E8; text-transform: uppercase; margin-bottom: 0.5rem; }
        .sv-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.6rem; font-weight: 800; color: #0A192F; margin: 0 0 0.6rem; }
        .sv-sub { font-size: 14px; color: #6B7688; margin: 0; line-height: 1.55; }

        .sv-tabs { display: flex; justify-content: center; gap: 8px; margin-bottom: 1.75rem; flex-wrap: wrap; }
        .sv-tab {
          display: flex; align-items: center; gap: 7px; padding: 9px 16px; border-radius: 999px; border: 1px solid #E1E8F5;
          background: #fff; color: #56637D; font-size: 13px; font-weight: 600; cursor: pointer;
        }
        .sv-tab.active { background: #0E2A63; color: #fff; border-color: #0E2A63; }
        .sv-tab-icon { font-size: 15px; }

        .sv-panel { max-width: 720px; margin: 0 auto; }

        .sv-panel-head { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; }
        .sv-panel-badge { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .sv-panel-head h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; font-weight: 700; color: #0A192F; margin: 0 0 2px; }
        .sv-panel-head p { font-size: 13px; color: #6B7688; margin: 0; }
        .sv-access-tag { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; letter-spacing: 0.03em; margin-left: 6px; vertical-align: middle; }
        .sv-access-tag.recruiters { background: #FDECD8; color: #8A4B0C; }
        .sv-access-tag.free { background: #E1F5EE; color: #0F6E56; }

        .sv-body-text { font-size: 14px; color: #4A5468; line-height: 1.65; margin: 0 0 1.5rem; }

        .sv-locked-card { background: #fff; border: 1px solid #E6ECF7; border-radius: 18px; padding: 2rem; text-align: center; }
        .sv-locked-icon { width: 56px; height: 56px; border-radius: 14px; background: #FDECD8; color: #8A4B0C; font-size: 26px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
        .sv-locked-card h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.05rem; font-weight: 700; color: #0A192F; margin: 0 0 0.5rem; }
        .sv-locked-card p { font-size: 13.5px; color: #6B7688; max-width: 420px; margin: 0 auto 1.25rem; line-height: 1.55; }
        .sv-locked-btn { background: #0E2A63; color: #fff; border: none; border-radius: 9px; padding: 11px 22px; font-size: 13.5px; font-weight: 700; cursor: pointer; }

        .hp-funnel-card { background: #fff; border: 1px solid #E6ECF7; border-radius: 18px; padding: 2rem 1.5rem 1.5rem; margin-bottom: 1.5rem; }
        .hp-funnel { display: flex; flex-direction: column; align-items: center; gap: 6px; margin: 0 auto; max-width: 500px; }
        .hp-stage { width: 100%; height: 54px; display: flex; align-items: center; justify-content: center; gap: 10px; border-radius: 10px; color: #fff; font-weight: 700; font-size: 13.5px; position: relative; }
        .hp-stage-icon { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 12px; }
        .hp-stage-num { position: absolute; left: 14px; font-size: 10.5px; font-weight: 700; opacity: 0.7; }
        .hp-s1 { width: 100%; background: #123170; }
        .hp-s2 { width: 88%; background: #1C48A3; }
        .hp-s3 { width: 74%; background: #2554E8; }
        .hp-s4 { width: 60%; background: #4A7BF0; }
        .hp-s5 { width: 46%; background: #F2A93B; color: #4A2E00; }
        .hp-desc-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 1.1rem; }
        .hp-desc-item { text-align: center; }
        .hp-desc-item p { font-size: 11px; color: #7A879C; margin: 0; line-height: 1.4; }
        .hp-desc-item span { display: block; font-size: 11.5px; font-weight: 700; color: #14213D; margin-bottom: 2px; }

        .hp-roles-head { text-align: center; margin: 0 0 1rem; }
        .hp-roles-head h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.05rem; font-weight: 700; color: #0A192F; margin: 0 0 4px; }
        .hp-roles-head p { font-size: 12.5px; color: #7A879C; margin: 0; }
        .hp-role-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .hp-role-card { background: #fff; border: 1px solid #E6ECF7; border-radius: 14px; padding: 1.25rem 1rem; text-align: center; }
        .hp-role-icon { width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 19px; margin: 0 auto 0.65rem; }
        .hp-role-card h4 { font-size: 13px; font-weight: 700; color: #14213D; margin: 0 0 3px; }
        .hp-role-card p { font-size: 11px; color: #7A879C; margin: 0; line-height: 1.4; }

        .rpo-card { background: #fff; border: 1px solid #E6ECF7; border-radius: 18px; padding: 2rem 1.5rem; }
        .rpo-flow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
        .rpo-step { text-align: center; padding: 0 8px; position: relative; }
        .rpo-step::after { content: "→"; position: absolute; top: 22px; right: -12px; color: #C3D5F0; font-size: 18px; font-weight: 700; }
        .rpo-step.last::after { content: ""; }
        .rpo-step-num { width: 44px; height: 44px; border-radius: 50%; background: #E4ECFE; color: #123170; font-weight: 800; font-size: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; }
        .rpo-step h4 { font-size: 13px; font-weight: 700; color: #14213D; margin: 0 0 4px; }
        .rpo-step p { font-size: 11.5px; color: #7A879C; margin: 0; line-height: 1.45; }

        .rb-card { background: #fff; border: 1px solid #E6ECF7; border-radius: 18px; padding: 2rem; }
        .rb-features { display: flex; flex-direction: column; gap: 10px; margin: 1.25rem 0 1.5rem; }
        .rb-feature { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: #4A5468; }
        .rb-check { color: #0F6E56; font-weight: 800; }
        .rb-btn { background: #0E2A63; color: #fff; border: none; border-radius: 9px; padding: 11px 22px; font-size: 13.5px; font-weight: 700; cursor: pointer; }

        @media (max-width: 640px) {
          .hp-desc-row { grid-template-columns: repeat(3, 1fr); row-gap: 12px; }
          .hp-role-grid { grid-template-columns: repeat(2, 1fr); }
          .rpo-flow { grid-template-columns: 1fr 1fr; row-gap: 1.5rem; }
          .rpo-step::after { display: none; }
        }
      `}</style>
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
            <button onClick={onNewsletter}>Career Advancement</button>
            <button onClick={onOpenPortal}>Login / Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= HOME SECTION (candidate-focused, live data) =================
function HomeSection({ onLogin }) {
  const [jobs, setJobs] = useState([]);
  const [jobCount, setJobCount] = useState(null);
  const [companyCount, setCompanyCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE}/jobs/`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();

        const list = Array.isArray(data) ? data : Array.isArray(data.jobs) ? data.jobs : [];
        const activeJobs = list.filter((job) => !job.status || job.status.toLowerCase() === "active");

        setJobs(activeJobs);
        setJobCount(activeJobs.length);

        const uniqueCompanies = new Set(
          activeJobs.map((job) => job.company_name).filter((c) => c && c.trim() !== "")
        );
        setCompanyCount(uniqueCompanies.size);
      } catch (error) {
        console.error("Error loading jobs:", error);
        setJobs([]);
        setJobCount(null);
        setCompanyCount(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  function companyInitials(name) {
    if (!name) return "?";
    return name.trim().slice(0, 2).toUpperCase();
  }

  return (
    <div className="ch-wrap">
      {/* ---- hero ---- */}
      <div className="ch-hero">
        <div className="ch-hero-inner">
          <div className="ch-eyebrow">For job seekers</div>
          <h1 className="ch-title">Everything you need to land your next job — free.</h1>
          <p className="ch-sub">
            Build a profile, get matched to real openings, sharpen your interview skills, and get
            expert career advice — all in one place, at no cost.
          </p>
          <button className="ch-hero-btn" onClick={onLogin}>Create your free profile</button>
          <p className="ch-hero-note">No cost, ever, for candidates.</p>
        </div>
      </div>

      {/* ---- live stats ---- */}
      <div className="ch-stats">
        <div className="ch-stat">
          <div className="ch-stat-num">{loading ? "—" : jobCount ?? "—"}</div>
          <div className="ch-stat-label">Job openings</div>
        </div>
        <div className="ch-stat">
          <div className="ch-stat-num">{loading ? "—" : companyCount ?? "—"}</div>
          <div className="ch-stat-label">Companies hiring</div>
        </div>
      </div>

      {/* ---- live job openings ---- */}
      <div className="ch-section">
        <div className="ch-section-head">
          <div className="ch-section-eyebrow">Open roles right now</div>
          <h2>Live openings on the portal</h2>
          <p>Sign in to view full details and apply — it takes less than a minute.</p>
        </div>

        <div className="ch-jobs">
          {loading && <div className="ch-empty">Loading jobs…</div>}
          {!loading && jobs.length === 0 && <div className="ch-empty">No openings live right now — check back soon.</div>}
          {!loading &&
            jobs.slice(0, 5).map((job) => (
              <div key={job.id} className="ch-job" onClick={onLogin}>
                <div className="ch-job-badge">{companyInitials(job.company_name || "C")}</div>
                <div className="ch-job-info">
                  <p className="ch-job-title">{job.title}</p>
                  <p className="ch-job-meta">{[job.company_name, job.location].filter(Boolean).join(" · ")}</p>
                </div>
                <span className="ch-job-cta">Sign in to apply →</span>
              </div>
            ))}
        </div>

        <div className="ch-jobs-footer">
          <button onClick={onLogin}>View all openings</button>
        </div>
      </div>

      {/* ---- feature grid ---- */}
      <div className="ch-section">
        <div className="ch-section-head">
          <div className="ch-section-eyebrow">What you get</div>
          <h2>Everything you need, free</h2>
          <p>No hidden fees for candidates — ever.</p>
        </div>

        <div className="ch-features">
          <div className="ch-feature" onClick={onLogin}>
            <div className="ch-feature-top">
              <div className="ch-feature-icon" style={{ background: "#E4ECFE", color: "#123170" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
              <span className="ch-feature-badge">FREE</span>
            </div>
            <h3>Free candidate profile</h3>
            <p>Build your profile once and get automatically matched to relevant openings as they go live.</p>
            <span className="ch-feature-link">Create your profile →</span>
          </div>

          <Link to="/services/resume-building" target="_blank" className="ch-feature" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="ch-feature-top">
              <div className="ch-feature-icon" style={{ background: "#FDECD8", color: "#8A4B0C" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="4" y="3" width="16" height="18" rx="2" /><line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="12" y2="16" />
                </svg>
              </div>
              <span className="ch-feature-badge">FREE</span>
            </div>
            <h3>Resume builder</h3>
            <p>Build a professional resume with guided templates and a live preview — no signup needed to try it.</p>
            <span className="ch-feature-link">Build your resume →</span>
          </Link>

          <div className="ch-feature" onClick={onLogin}>
            <div className="ch-feature-top">
              <div className="ch-feature-icon" style={{ background: "#E1F5EE", color: "#0F6E56" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" /><path d="M10 9l5 3-5 3V9Z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="ch-feature-badge">FREE</span>
            </div>
            <h3>Coretech Minis</h3>
            <p>Quick videos on resume mistakes, interview prep, and what recruiters actually look for.</p>
            <span className="ch-feature-link">Watch the tips →</span>
          </div>

          <div className="ch-feature" onClick={onLogin}>
            <div className="ch-feature-top">
              <div className="ch-feature-icon" style={{ background: "#FBEAF0", color: "#993556" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <span className="ch-feature-badge">FREE</span>
            </div>
            <h3>Career counselling</h3>
            <p>Book a 1:1 session with our team for resume review, interview prep, or career-direction advice.</p>
            <span className="ch-feature-link">Book a session →</span>
          </div>
        </div>
      </div>

      {/* ---- why us ---- */}
      <div className="ch-section">
        <div className="ch-why">
          <div className="ch-why-item">
            <div className="ch-why-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h4>Verified companies only</h4>
            <p>Every recruiter account is manually approved before they can post a role.</p>
          </div>
          <div className="ch-why-item">
            <div className="ch-why-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            </div>
            <h4>Fast matching</h4>
            <p>Your profile is matched against openings automatically — no endless scrolling.</p>
          </div>
          <div className="ch-why-item">
            <div className="ch-why-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2 3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5Z" /></svg>
            </div>
            <h4>Always free for candidates</h4>
            <p>Profile, applications, resume builder, and counselling — no cost, ever.</p>
          </div>
        </div>
      </div>

      {/* ---- final CTA ---- */}
      <div className="ch-final">
        <h2>Your next opportunity is one profile away.</h2>
        <p>Join in under a minute — no fees, no catch.</p>
        <button onClick={onLogin}>Create your free profile</button>
      </div>

      {/* ---- footer ---- */}
      <div className="ch-footer">
        <p>© {new Date().getFullYear()} Coretech Talents. All rights reserved.</p>
        <p className="ch-footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          {" · "}
          <Link to="/terms-of-service">Terms of Service</Link>
        </p>
      </div>

      <style>{`
        .ch-wrap { max-width: 1000px; margin: 0 auto; font-family: 'Inter', sans-serif; }

        .ch-hero { background: linear-gradient(160deg, #0E2A63 0%, #123170 100%); padding: 3.25rem 2rem 4.5rem; border-radius: 20px; }
        .ch-hero-inner { max-width: 560px; margin: 0 auto; text-align: center; }
        .ch-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; color: #8FB4FF; text-transform: uppercase; margin-bottom: 0.75rem; }
        .ch-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: clamp(1.9rem, 3.4vw, 2.5rem); color: #fff; margin: 0 0 0.85rem; line-height: 1.22; }
        .ch-sub { font-size: 15px; color: #B7C8EE; margin: 0 auto 1.75rem; max-width: 480px; line-height: 1.6; }
        .ch-hero-btn { background: #fff; color: #0E2A63; border: none; border-radius: 10px; padding: 13px 26px; font-size: 14.5px; font-weight: 700; cursor: pointer; }
        .ch-hero-note { font-size: 12px; color: #8FB4FF; margin-top: 0.75rem; }

        .ch-stats { background: #fff; border-radius: 14px; box-shadow: 0 8px 24px rgba(14,42,99,0.08); display: flex; margin: -2.75rem auto 3rem; max-width: 500px; overflow: hidden; }
        .ch-stat { flex: 1; text-align: center; padding: 1.1rem 0.5rem; }
        .ch-stat + .ch-stat { border-left: 1px solid #EEF2F9; }
        .ch-stat-num { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.5rem; color: #0E2A63; }
        .ch-stat-label { font-size: 11.5px; color: #6B7688; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 2px; }

        .ch-section { margin-bottom: 3rem; padding: 0 0.5rem; }
        .ch-section-head { text-align: center; max-width: 520px; margin: 0 auto 1.5rem; }
        .ch-section-eyebrow { font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; color: #2554E8; text-transform: uppercase; margin-bottom: 0.5rem; }
        .ch-section-head h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.35rem; font-weight: 800; color: #0A192F; margin: 0 0 0.5rem; }
        .ch-section-head p { font-size: 13.5px; color: #6B7688; margin: 0; line-height: 1.5; }

        .ch-jobs { display: flex; flex-direction: column; gap: 10px; }
        .ch-job { background: #fff; border: 1px solid #E6ECF7; border-radius: 12px; padding: 1rem 1.15rem; display: flex; align-items: center; gap: 14px; cursor: pointer; }
        .ch-job:hover { border-color: #C3D5F0; }
        .ch-job-badge { width: 42px; height: 42px; border-radius: 10px; background: #E4ECFE; color: #123170; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; flex-shrink: 0; }
        .ch-job-info { flex: 1; min-width: 0; }
        .ch-job-title { font-size: 14.5px; font-weight: 700; color: #14213D; margin: 0 0 2px; }
        .ch-job-meta { font-size: 12.5px; color: #7A879C; margin: 0; }
        .ch-job-cta { font-size: 12px; font-weight: 700; color: #2554E8; white-space: nowrap; }
        .ch-empty { text-align: center; padding: 2rem; color: #8A96AC; font-size: 13.5px; }
        .ch-jobs-footer { text-align: center; margin-top: 1rem; }
        .ch-jobs-footer button { background: #fff; border: 1px solid #C3D5F0; color: #2554E8; border-radius: 8px; padding: 9px 18px; font-size: 13px; font-weight: 700; cursor: pointer; }

        .ch-features { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
        .ch-feature { background: #fff; border: 1px solid #E6ECF7; border-radius: 16px; padding: 1.5rem; cursor: pointer; display: block; }
        .ch-feature:hover { border-color: #C3D5F0; }
        .ch-feature-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.9rem; }
        .ch-feature-icon { width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center; justify-content: center; }
        .ch-feature-badge { font-size: 10.5px; font-weight: 700; color: #0F6E56; background: #E1F5EE; border-radius: 999px; padding: 3px 9px; letter-spacing: 0.03em; }
        .ch-feature h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.02rem; font-weight: 700; color: #0A192F; margin: 0 0 0.4rem; }
        .ch-feature p { font-size: 13px; color: #6B7688; margin: 0 0 0.9rem; line-height: 1.55; }
        .ch-feature-link { font-size: 12.5px; font-weight: 700; color: #2554E8; }

        .ch-why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .ch-why-item { text-align: center; padding: 0.5rem; }
        .ch-why-icon { width: 44px; height: 44px; border-radius: 12px; background: #F3F7FD; color: #2554E8; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; }
        .ch-why-item h4 { font-size: 13.5px; font-weight: 700; color: #14213D; margin: 0 0 0.3rem; }
        .ch-why-item p { font-size: 12px; color: #7A879C; margin: 0; line-height: 1.5; }

        .ch-final { background: #0E2A63; border-radius: 20px; padding: 2.5rem; text-align: center; }
        .ch-final h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.35rem; font-weight: 800; color: #fff; margin: 0 0 0.6rem; }
        .ch-final p { font-size: 13.5px; color: #B7C8EE; margin: 0 0 1.35rem; }
        .ch-final button { background: #fff; color: #0E2A63; border: none; border-radius: 10px; padding: 12px 26px; font-size: 14px; font-weight: 700; cursor: pointer; }

        .ch-footer { text-align: center; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid #E1E8F5; }
        .ch-footer p { font-size: 12.5px; color: #8A96AC; margin: 0; }
        .ch-footer-links { margin-top: 0.5rem; }
        .ch-footer-links a { color: inherit; }

        @media (max-width: 700px) {
          .ch-features { grid-template-columns: 1fr; }
          .ch-why { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

function CareerCounsellingForm() {
  const [form, setForm] = useState({ name: "", email: "", mobile_number: "", preferred_date: "", query: "" });
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile_number: form.mobile_number,
          query: `[Career Counselling Session Request] Preferred date: ${form.preferred_date || "Not specified"}. Topic: ${form.query}`,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Failed to submit request");

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card" style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <p className="msg-success">
          Thanks, {form.name.split(" ")[0]}! We've received your counselling session request and will reach out to confirm a time.
        </p>
      </div>
    );
  }

  return (
    <div className="form-card" style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Book a Career Counselling Session</h2>
      <p className="card-meta" style={{ marginBottom: "1rem" }}>
        Get one-on-one guidance on your resume, interview prep, or career direction from our team.
      </p>
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
          <label>Preferred date</label>
          <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} />
        </div>
        <div className="field">
          <label>What would you like to discuss?</label>
          <textarea
            name="query"
            rows={3}
            value={form.query}
            onChange={handleChange}
            placeholder="e.g. resume review, interview prep, career change advice"
            required
          />
        </div>
        {error && <p className="msg-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Request Session"}
        </button>
      </form>
    </div>
  );
}

function getYouTubeEmbedId(url) {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Loads the YouTube IFrame Player API once and reuses it for every modal open
let ytApiPromise = null;
function loadYouTubeIframeAPI() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return ytApiPromise;
}

function MiniVideoModal({ mini, onClose }) {
  const videoId = getYouTubeEmbedId(mini.videoUrl);
  const [containerId] = useState(() => `yt-player-${Math.random().toString(36).slice(2)}`);
  const playerRef = useState({ current: null })[0];

  useEffect(() => {
    if (!videoId) return;
    let cancelled = false;

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled) return;
      playerRef.current = new YT.Player(containerId, {
        videoId,
        playerVars: { autoplay: 1, playsinline: 1 },
        events: {
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              onClose();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div style={{ position: "relative", width: "min(360px, 90vw)" }} onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-link"
          onClick={onClose}
          style={{ position: "absolute", top: -40, right: 0, color: "#fff", fontSize: 20 }}
        >
          ✕
        </button>
        {videoId ? (
          <div style={{ aspectRatio: "9/16", borderRadius: 12, overflow: "hidden" }}>
            <div id={containerId} style={{ width: "100%", height: "100%" }} />
          </div>
        ) : (
          <div className="card" style={{ textAlign: "center" }}>
            <p className="card-meta">This video is coming soon.</p>
          </div>
        )}
        <p style={{ color: "#fff", textAlign: "center", marginTop: "0.75rem", fontSize: 14, fontWeight: 600 }}>{mini.title}</p>
      </div>
    </div>
  );
}

function CoretechMinis() {
  const minis = [
    { title: "5 Resume Mistakes to Avoid", tag: "Resume Tips", videoUrl: "https://youtube.com/shorts/lXxusAKZnsw?si=wNxstYNMLrv9ksLH" },
    { title: "What Recruiters Look For in 30 Seconds", tag: "Interview Tips", videoUrl: null },
    { title: "Manufacturing Jobs: What's Hot Right Now", tag: "Job Market", videoUrl: null },
    { title: "How to Negotiate Your Offer", tag: "Career Advice", videoUrl: null },
    { title: "Campus to Career: First Job Tips", tag: "Freshers", videoUrl: null },
    { title: "Reading a Job Description Like a Pro", tag: "Job Market", videoUrl: null },
  ];

  const VISIBLE = 3;
  const DEFAULT_DURATION_MS = 15000; // matches the "Quick 15-second videos" copy below
  const TRANSITION_MS = 260;

  const [order, setOrder] = useState(minis.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  const [openMini, setOpenMini] = useState(null);

  function advance() {
    setLeaving(true);
    setTimeout(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.push(next.shift());
        return next;
      });
      setLeaving(false);
    }, TRANSITION_MS);
  }

  useEffect(() => {
    if (openMini) return; // paused while a video is open — the stack shouldn't move underneath it
    const currentDuration = minis[order[0]].durationMs || DEFAULT_DURATION_MS;
    const timer = setTimeout(advance, currentDuration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, openMini]);

  return (
    <div>
      <p className="card-desc" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Quick 15-second videos on job market trends, resume tips, and interview advice.
      </p>

      <div className="rs-stage">
        {order.slice(0, VISIBLE).map((idx, depth) => {
          const m = minis[idx];
          const isFront = depth === 0;
          const transform = isFront && leaving
            ? "translateX(260px) translateY(-10px) rotate(10deg) scale(0.9)"
            : `translateX(${depth * 10}px) translateY(${depth * 8}px) scale(${1 - depth * 0.06})`;
          const opacity = isFront && leaving ? 0 : depth === 0 ? 1 : depth === 1 ? 0.85 : 0.6;

          return (
            <div
              key={idx}
              className="rs-card"
              style={{ zIndex: VISIBLE - depth, transform, opacity }}
              onClick={isFront ? advance : undefined}
            >
              <span className="rs-tag">{m.tag}</span>

              {isFront && m.videoUrl && (
                <span
                  className="rs-watch"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMini(m);
                  }}
                >
                  ▶ Watch
                </span>
              )}

              <div className="rs-play">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {!m.videoUrl && <span className="rs-soon">Coming soon</span>}

              <div className="rs-title">{m.title}</div>
            </div>
          );
        })}
      </div>

      <p className="hint" style={{ textAlign: "center", marginTop: "0.75rem" }}>
        Each one plays for a bit, then moves on · tap to skip ahead
      </p>

      <div className="rs-dots">
        {minis.map((_, i) => (
          <span key={i} className={`rs-dot ${order[0] === i ? "active" : ""}`} />
        ))}
      </div>

      <p className="hint" style={{ textAlign: "center", marginTop: "1rem" }}>More Coretech Minis dropping soon.</p>

      {openMini && (
        <MiniVideoModal
          mini={openMini}
          onClose={() => {
            setOpenMini(null);
            advance();
          }}
        />
      )}

      <style>{`
        .rs-stage { position: relative; width: 220px; height: 390px; margin: 0 auto 1.25rem; }

        .rs-card {
          position: absolute; inset: 0; border-radius: 16px; overflow: hidden; cursor: pointer;
          background: linear-gradient(155deg, #0A192F 0%, #123170 100%);
          transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.45s ease;
          display: flex; align-items: center; justify-content: center;
        }

        .rs-tag {
          position: absolute; top: 10px; left: 10px; font-size: 10px; font-weight: 700; color: #64FFDA;
          background: rgba(0,0,0,0.35); padding: 3px 8px; border-radius: 5px; letter-spacing: 0.02em;
        }
        .rs-soon {
          position: absolute; bottom: 40px; right: 10px; font-size: 9px; font-weight: 700; color: #fff;
          background: rgba(255,255,255,0.18); padding: 3px 7px; border-radius: 5px;
        }
        .rs-play {
          width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center; z-index: 2;
        }
        .rs-title {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 0.75rem 0.85rem;
          font-size: 12.5px; font-weight: 700; color: #fff; text-align: left;
          background: linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%);
        }
        .rs-watch {
          position: absolute; top: 10px; right: 10px; font-size: 10px; font-weight: 700; color: #0A192F;
          background: #64FFDA; padding: 4px 9px; border-radius: 6px; z-index: 3; cursor: pointer;
        }

        .rs-dots { display: flex; justify-content: center; gap: 6px; }
        .rs-dot { width: 6px; height: 6px; border-radius: 50%; background: #DCE6F5; transition: background 0.3s ease, width 0.3s ease; }
        .rs-dot.active { background: #2554E8; width: 16px; border-radius: 3px; }
      `}</style>
    </div>
  );
}

function CareerAdvancementSection() {
  const [activeTab, setActiveTab] = useState("newsletters");
  const [audienceFilter, setAudienceFilter] = useState("all");

  const newsletters = [
    {
      title: "5 Resume Mistakes That Get You Filtered Out",
      desc: "Most resumes never make it to a human reviewer — they get filtered out before that stage, often for reasons that have nothing to do with your actual experience. Formatting that confuses automated screening, generic bullet points that could apply to any candidate, missing keywords from the job description, unclear job titles, and resumes that try to cover every skill you've ever touched instead of the ones relevant to this role. None of these are fixed by rewriting your whole resume — each one is a small, specific correction. This piece walks through all five, with concrete examples of the wrong way and the fixed version side by side, so you can check your own resume against each point in a few minutes.",
      audience: "candidate",
    },
    {
      title: "How to Negotiate Your First Salary",
      desc: "Negotiating your first salary feels different from every negotiation that comes after it — you don't yet have a track record to point to, and the fear of losing the offer entirely makes most first-timers just accept whatever number comes in. But most initial offers do have room, and the way you ask matters more than how much you ask for. This piece breaks down what to say when an offer arrives below what you expected, how to counter without sounding ungrateful, when it's actually fine to just accept, and a few short scripts you can adapt directly instead of writing your own from scratch under pressure.",
      audience: "candidate",
    },
    {
      title: "Remote vs Hybrid vs On-site: What to Ask Before You Accept",
      desc: "Job listings rarely tell you what day-to-day work actually looks like under a given work arrangement, and \"hybrid\" in particular can mean wildly different things from one company to the next — two days a week, five days that shift by team, or a policy that exists on paper but isn't really enforced. Before accepting an offer, there's a short list of questions that reveal the real answer: who else on the team is remote, how meetings are actually run, what the expectation is for response time outside office hours, and whether the arrangement is written into your offer letter or just a verbal understanding. This piece walks through exactly what to ask and why each answer matters.",
      audience: "candidate",
    },
    {
      title: "What 'Entry-Level' Actually Means Across IT, Manufacturing & ITES",
      desc: "The term \"entry-level\" gets used loosely across job postings, but it means something genuinely different depending on the domain. In IT, entry-level often still assumes some hands-on project experience or a relevant certification. In manufacturing, it can mean a fresh diploma holder learning on the shop floor with close supervision. In ITES, it's frequently about communication skills and trainability more than prior experience at all. Understanding which definition a specific posting is using — and how to tell from the listing itself — helps you avoid applying to roles that assume more than you have, or underselling yourself for roles that would have taken you as you are.",
      audience: "candidate",
    },
    {
      title: "Recruitment Trends 2026",
      desc: "Hiring is shifting toward skills-based assessments over degrees, faster interview cycles, and AI-assisted shortlisting — companies that adapt are seeing stronger candidate pipelines. For candidates, that shift means a portfolio of demonstrated ability is starting to matter as much as a credential on paper, and being ready to show your work in a practical assessment is becoming a normal part of the process rather than the exception. For recruiters, it means the tools for finding and evaluating candidates are evolving quickly, and processes built five years ago may already be filtering out strong candidates for the wrong reasons. This piece looks at what's actually changing and what to do about it, on both sides of the hiring table.",
      audience: "both",
    },
    {
      title: "Understanding the GenZ Mindset",
      desc: "GenZ candidates prioritize purpose, flexibility, and transparency. They expect quick feedback loops, honest job descriptions, and clear growth paths — not just a paycheck. For recruiters used to hiring the previous generation of candidates, some of this can read as a shift in what \"loyalty\" or \"commitment\" even means, but it's better understood as a shift in what candidates need to see before they'll commit at all. This piece looks at what actually drives GenZ candidates to accept an offer and stay past the first year, what kind of job description language tends to attract versus repel them, and small process changes — faster response times, clearer next steps, more candid conversations about role expectations — that make a measurable difference in offer acceptance.",
      audience: "recruiter",
    },
    {
      title: "Evolving Recruitment Strategies",
      desc: "Employer branding, referral-driven hiring, and community-led talent pools are replacing traditional job-board-only approaches as competition for skilled talent increases. Posting a job and waiting for applications is no longer enough in fields where good candidates have several options — the companies winning that competition are the ones building a reputation candidates already know about before they ever see a job listing, and the ones who've built referral pipelines from their own current employees. This piece walks through practical ways to start building that reputation even as a smaller company, how to structure a referral program that people actually use, and where community-led sourcing tends to outperform generic job board postings.",
      audience: "recruiter",
    },
    {
      title: "Technology in Recruitment",
      desc: "AI-powered resume screening, automated interview scheduling, and data-driven candidate matching are reshaping how recruiters find and engage talent faster and more accurately. The upside is real — less time spent on manual shortlisting, fewer scheduling back-and-forths, and matching that improves with more data over time. The risk, equally real, is that automation applied carelessly can filter out strong candidates for superficial reasons, or make the process feel impersonal at exactly the moment a candidate is deciding whether they want to work with you. This piece covers which parts of the process are genuinely worth automating, which parts should stay human, and how to tell the difference.",
      audience: "recruiter",
    },
  ];

  const audienceFilters = [
    { id: "all", label: "All" },
    { id: "candidate", label: "For candidates" },
    { id: "recruiter", label: "For recruiters" },
  ];

  function badgeLabel(a) {
    if (a === "candidate") return "CANDIDATES";
    if (a === "recruiter") return "RECRUITERS";
    return "BOTH";
  }

  const filteredNewsletters =
    audienceFilter === "all"
      ? newsletters
      : newsletters.filter((n) => n.audience === audienceFilter || n.audience === "both");

  const tabs = [
    { id: "newsletters", label: "Newsletters" },
    { id: "counselling", label: "Career Counselling" },
    { id: "minis", label: "Coretech Minis" },
  ];

  return (
    <div className="container" id="career-advancement-section" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 className="page-title">Career Advancement</h2>
        <p className="card-desc">Newsletters, counselling sessions, and quick video tips to help you grow.</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
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

      {activeTab === "newsletters" && (
        <div className="nl-wrap">
          <div className="nl-filters">
            {audienceFilters.map((f) => (
              <button
                key={f.id}
                className={`nl-filter ${audienceFilter === f.id ? "active" : ""}`}
                onClick={() => setAudienceFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="nl-count">
            {filteredNewsletters.length} article{filteredNewsletters.length === 1 ? "" : "s"}
          </p>

          <div className="nl-grid">
            {filteredNewsletters.length === 0 ? (
              <div className="nl-empty">No articles here yet.</div>
            ) : (
              filteredNewsletters.map((item) => (
                <div key={item.title} className="nl-card">
                  <span className={`nl-badge ${item.audience}`}>{badgeLabel(item.audience)}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))
            )}
          </div>

          <style>{`
            .nl-wrap { max-width: 700px; margin: 0 auto; }
            .nl-filters { display: flex; justify-content: center; gap: 8px; margin-bottom: 1rem; flex-wrap: wrap; }
            .nl-filter {
              padding: 8px 16px; border-radius: 999px; border: 1px solid #E1E8F5; background: #fff;
              color: #56637D; font-size: 13px; font-weight: 600; cursor: pointer;
            }
            .nl-filter.active { background: #0E2A63; color: #fff; border-color: #0E2A63; }
            .nl-count { font-size: 12.5px; color: #8A96AC; text-align: center; margin-bottom: 1.25rem; }
            .nl-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
            .nl-card { background: #fff; border: 1px solid #E6ECF7; border-radius: 14px; padding: 1.5rem 1.75rem; transition: border-color 0.15s ease, transform 0.15s ease; }
            .nl-card:hover { border-color: #C3D5F0; transform: translateY(-2px); }
            .nl-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 999px; letter-spacing: 0.03em; margin-bottom: 0.65rem; }
            .nl-badge.candidate { background: #E1F5EE; color: #0F6E56; }
            .nl-badge.recruiter { background: #E4ECFE; color: #123170; }
            .nl-badge.both { background: #FAEEDA; color: #854F0B; }
            .nl-card h3 { font-size: 15.5px; font-weight: 700; color: #14213D; margin: 0 0 0.6rem; line-height: 1.35; }
            .nl-card p { font-size: 13px; color: #6B7688; margin: 0; line-height: 1.75; }
            .nl-empty { text-align: center; padding: 2.5rem; color: #8A96AC; font-size: 13.5px; }
          `}</style>
        </div>
      )}

      {activeTab === "counselling" && <CareerCounsellingForm />}
      {activeTab === "minis" && <CoretechMinis />}
    </div>
  );
}

function ForgotPasswordFlow({ role, onClose }) {
  const [step, setStep] = useState("email"); // "email" | "reset" | "success"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    fetch(`${API_BASE}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.detail || "If an account exists with this email, an OTP has been sent.");
        setStep("reset");
      })
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setLoading(false));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    fetch(`${API_BASE}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role, otp, new_password: newPassword }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.detail || "Failed to reset password");
        setStep("success");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(4,44,83,0.45)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div className="card" style={{ maxWidth: 380, width: "90%" }} onClick={(e) => e.stopPropagation()}>

        {step === "email" && (
          <form onSubmit={handleSendOtp}>
            <h3 style={{ marginTop: 0 }}>Reset your password</h3>
            <p className="hint">Enter your email and we'll send you a 6-digit code.</p>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <p className="msg-error">{error}</p>}

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
              <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send code"}
              </button>
            </div>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword}>
            <h3 style={{ marginTop: 0 }}>Enter your code</h3>
            {info && <p className="hint">{info}</p>}

            <div className="field">
              <label>6-digit code</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>
            <div className="field">
              <label>New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Confirm new password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="msg-error">{error}</p>}

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
              <button type="button" onClick={() => setStep("email")} disabled={loading}>Back</button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Resetting..." : "Reset password"}
              </button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div style={{ textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>Password reset!</h3>
            <p className="hint">You can now log in with your new password.</p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: 8 }}>
              Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginForm({ endpoint, label, onLogin, role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

      <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
        <button type="button" className="btn-link" onClick={() => setShowForgotPassword(true)}>
          Forgot password?
        </button>
      </div>

      {showForgotPassword && (
        <ForgotPasswordFlow role={role} onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
}

const PRIVACY_POLICY_VERSION = "2026-08"; // keep in sync with the "Last updated" date on PrivacyPolicy/TermsOfService

function SignupConsent({ consentRequired, setConsentRequired, consentMarketing, setConsentMarketing, error }) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--blue-600, #2554E8)", textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 0.75rem" }}>
        Your consent
      </p>

      <div
        onClick={() => setInfoOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#56637D",
          background: "#F3F7FD", border: "1px solid #E1E8F5", borderRadius: 8, padding: "8px 12px",
          cursor: "pointer", marginBottom: "0.75rem",
        }}
      >
        <span style={{ transform: infoOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", display: "inline-flex" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#56637D" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
        </span>
        What we collect and why
      </div>

      {infoOpen && (
        <ul style={{ fontSize: 12, color: "#6B7688", lineHeight: 1.7, margin: "-0.4rem 0 0.9rem", paddingLeft: 18 }}>
          <li><strong>Name, email, phone</strong> — to create and secure your account, and let recruiters or candidates contact you.</li>
          <li><strong>Password</strong> — stored securely, used only to log you in.</li>
          <li><strong>Resume, skills, and profile details</strong> you add later — used to match you to relevant jobs.</li>
          <li><strong>Email address</strong> — used to send account and application updates. Newsletter emails only if you opt in below.</li>
        </ul>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: "0.75rem" }}>
        <input
          type="checkbox"
          id="consentRequired"
          checked={consentRequired}
          onChange={(e) => setConsentRequired(e.target.checked)}
          style={{ marginTop: 3, flexShrink: 0 }}
        />
        <label htmlFor="consentRequired" className="card-meta" style={{ margin: 0, fontSize: 13, lineHeight: 1.55 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 7px", borderRadius: 999, letterSpacing: "0.03em", marginRight: 6, background: "#FBEAF0", color: "#993556" }}>
            REQUIRED
          </span>
          I have read and agree to the{" "}
          <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> and{" "}
          <Link to="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</Link>, and consent to
          Coretech Talents processing my personal data to create and manage my account.
        </label>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: "0.75rem" }}>
        <input
          type="checkbox"
          id="consentMarketing"
          checked={consentMarketing}
          onChange={(e) => setConsentMarketing(e.target.checked)}
          style={{ marginTop: 3, flexShrink: 0 }}
        />
        <label htmlFor="consentMarketing" className="card-meta" style={{ margin: 0, fontSize: 13, lineHeight: 1.55 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 7px", borderRadius: 999, letterSpacing: "0.03em", marginRight: 6, background: "#E1F5EE", color: "#0F6E56" }}>
            OPTIONAL
          </span>
          Send me career tips, job alerts, and newsletter updates by email.
        </label>
      </div>

      <p style={{ fontSize: 11, color: "#9AA5B8", lineHeight: 1.6, margin: "0.75rem 0 0", paddingTop: "0.75rem", borderTop: "1px solid #EEF2F9" }}>
        Your consent choices are recorded with a timestamp when you sign up. You can withdraw
        consent, ask what data we hold, or request deletion of your account any time — see{" "}
        <Link to="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service, Section 9</Link>{" "}
        or contact us.
      </p>

      {error && <p className="msg-error" style={{ marginTop: "0.5rem" }}>{error}</p>}
    </div>
  );
}


function CandidateSignupForm({ onSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consentRequired, setConsentRequired] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
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

    if (!consentRequired) {
      setError("Please agree to the required consent to continue");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          phone,
          marketing_consent: consentMarketing,
          consent_given_at: new Date().toISOString(),
          privacy_policy_version: PRIVACY_POLICY_VERSION,
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

        <SignupConsent
          consentRequired={consentRequired}
          setConsentRequired={setConsentRequired}
          consentMarketing={consentMarketing}
          setConsentMarketing={setConsentMarketing}
          error={error}
        />

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
  const [consentRequired, setConsentRequired] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
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

    if (!consentRequired) {
      setError("Please agree to the required consent to continue");
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
          marketing_consent: consentMarketing,
          consent_given_at: new Date().toISOString(),
          privacy_policy_version: PRIVACY_POLICY_VERSION,
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

        <SignupConsent
          consentRequired={consentRequired}
          setConsentRequired={setConsentRequired}
          consentMarketing={consentMarketing}
          setConsentMarketing={setConsentMarketing}
          error={error}
        />

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
    <div className="container" style={{ maxWidth: role ? 480 : "100%" }}>
      {!role && (
        <AudienceSplit
          onCandidateClick={() => chooseRole("candidate")}
          onRecruiterClick={() => chooseRole("recruiter")}
        />
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
              <LoginForm endpoint="/auth/login" label="Candidate Login" onLogin={onCandidateLogin} role="candidate" />
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
              <LoginForm endpoint="/recruiter-auth/login" label="Recruiter Login" onLogin={onRecruiterLogin} role="recruiter" />
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
  const companyInitial = (job.company_name || "C").charAt(0).toUpperCase();

  if (!expanded) {
    return (
      <div className="card" style={{ padding: "1rem 1.25rem", cursor: "pointer" }} onClick={() => setExpanded(true)}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
              background: "var(--blue-100, #E4ECFE)", color: "var(--blue-700, #123170)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 16,
            }}
          >
            {companyInitial}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>{job.title}</p>
            <p className="card-meta" style={{ margin: "2px 0 0" }}>
              {job.company_name} · {job.location} · {job.employment_type}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "1.25rem" }}>
      <button className="btn-link" onClick={() => setExpanded(false)} style={{ marginBottom: "0.75rem" }}>← Back</button>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 }}>
        <div
          style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "var(--blue-100, #E4ECFE)", color: "var(--blue-700, #123170)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 22,
          }}
        >
          {companyInitial}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>{job.title}</p>
          <p className="card-meta" style={{ margin: "4px 0 0" }}>
            {job.company_name} · {job.location} · {job.employment_type}
          </p>
        </div>
      </div>

      {(job.experience_required || job.salary || job.domain) && (
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: "1rem", flexWrap: "wrap" }}>
          {job.experience_required && (
            <div style={{ textAlign: "center" }}>
              <p className="hint" style={{ margin: 0 }}>Experience</p>
              <p style={{ margin: "2px 0 0", fontWeight: 600, fontSize: 14 }}>{job.experience_required}</p>
            </div>
          )}
          {job.salary && (
            <div style={{ textAlign: "center" }}>
              <p className="hint" style={{ margin: 0 }}>Salary</p>
              <p style={{ margin: "2px 0 0", fontWeight: 600, fontSize: 14 }}>{job.salary}</p>
            </div>
          )}
          {job.domain && (
            <div style={{ textAlign: "center" }}>
              <p className="hint" style={{ margin: 0 }}>Domain</p>
              <p style={{ margin: "2px 0 0", fontWeight: 600, fontSize: 14 }}>{job.domain}</p>
            </div>
          )}
        </div>
      )}

      {job.description && (
        <div style={{ marginTop: "1.25rem" }}>
          <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 6px" }}>Job description</p>
          <p className="card-desc">{job.description}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className="tags" style={{ marginTop: "1rem", justifyContent: "center" }}>
          {skills.map((s) => (
            <span className="tag" key={s}>{s}</span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1.5rem" }}>
        <button
          className={isApplied ? "btn-applied" : "btn-primary"}
          onClick={handleApply}
          disabled={status === "applying" || isApplied}
        >
          {status === "applying" ? "Applying..." : isApplied ? "Applied ✓" : "Apply"}
        </button>
        {message && (
          <span className={`status-line ${status === "error" ? "msg-error" : "msg-success"}`} style={{ marginTop: "0.5rem" }}>
            <span className={`status-dot ${status}`}></span>
            {message}
          </span>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "0.75rem" }}>
        <ShareJobButton job={job} />
      </div>
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

function ApplicantDetailModal({ applicant, jobId, token, onClose, onStatusChanged }) {
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
      onClose();
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
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
      onClick={onClose}
    >
      <div className="form-card" style={{ maxWidth: 420, width: "90%" }} onClick={(e) => e.stopPropagation()}>
        <button className="btn-link" style={{ float: "right" }} onClick={onClose}>✕</button>
        <h2>{applicant.name}</h2>
        <p className="card-meta" style={{ marginTop: "0.5rem" }}>
          {applicant.email}
          {applicant.mobile_number && ` · ${applicant.mobile_number}`}
        </p>
        <p className="card-meta" style={{ marginTop: "0.35rem" }}>
          Skills: {applicant.skills} · Relevance: {applicant.relevance}
        </p>
        <p className="hint" style={{ marginTop: "0.5rem" }}>Current stage: {stageLabel(normalizedStatus)}</p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
          {currentIndex > 0 && (
            <button disabled={updating} onClick={() => updateStatus(PIPELINE_STAGES[currentIndex - 1])}>← Back</button>
          )}
          {currentIndex < PIPELINE_STAGES.length - 1 && applicant.status !== "rejected" && (
            <button disabled={updating} onClick={() => updateStatus(PIPELINE_STAGES[currentIndex + 1])} className="btn-primary">Advance →</button>
          )}
          <button disabled={updating || applicant.status === "rejected"} onClick={() => updateStatus("rejected")} style={{ color: "#B3261E" }}>
            {applicant.status === "rejected" ? "Rejected" : "Reject"}
          </button>
          <button onClick={handleDownloadResume} disabled={downloading}>
            {downloading ? "Downloading..." : "Download Resume"}
          </button>
        </div>
        {error && <p className="msg-error" style={{ marginTop: "0.5rem" }}>{error}</p>}
      </div>
    </div>
  );
}

function KanbanCard({ applicant, onOpen }) {
  return (
    <div
      className="card"
      onClick={() => onOpen(applicant)}
      style={{ padding: "0.6rem 0.75rem", marginBottom: "0.5rem", cursor: "pointer" }}
    >
      <p style={{ fontWeight: 600, fontSize: 13, margin: 0 }}>{applicant.name}</p>
    </div>
  );
}

function JobApplicantsPanel({ job, token, onBack }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openApplicant, setOpenApplicant] = useState(null);

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
                  <KanbanCard key={a.application_id} applicant={a} onOpen={setOpenApplicant} />
                ))}
              </div>
            );
          })}
        </div>
      )}

      {openApplicant && (
        <ApplicantDetailModal
          applicant={openApplicant}
          jobId={job.id}
          token={token}
          onClose={() => setOpenApplicant(null)}
          onStatusChanged={handleStatusChanged}
        />
      )}
    </div>
  );
}

function MatchedCandidatesPanel({ job, token, onBack }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/jobs/${job.id}/matches`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setMatches(data.matches || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [job.id, token]);

  return (
    <div>
      <button className="btn-link" onClick={onBack}>← Back to my jobs</button>
      <h2 className="page-title">{job.title} — Suggested candidates</h2>
      <p className="card-desc" style={{ marginBottom: "1rem" }}>
        Ranked by skills, experience, salary, location, and field of study match.
      </p>

      {loading && <p className="empty-state">Finding matches...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && matches.length === 0 && <p className="empty-state">No strong matches found yet.</p>}

      {matches.map((m) => (
        <div key={m.candidate_id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>{m.name}</p>
            <p className="card-meta" style={{ margin: "4px 0 0" }}>
              {m.designation}{m.current_company && ` at ${m.current_company}`}
              {m.location && ` · ${m.location}`}
            </p>
            <p className="card-meta" style={{ margin: "2px 0 0", fontSize: 12.5 }}>
              {m.years_of_experience && `${m.years_of_experience} yrs`}
              {m.expected_ctc && ` · Expects ${m.expected_ctc}`}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: "50%",
                background: m.match_score >= 70 ? "var(--bg-success, #E1F5EE)" : m.match_score >= 40 ? "var(--bg-warning, #FAEEDA)" : "var(--bg, #f3f7fd)",
                color: m.match_score >= 70 ? "#0F6E56" : m.match_score >= 40 ? "#854F0B" : "var(--text-secondary, #666)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14,
              }}
            >
              {m.match_score}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}



function EditJobModal({ job, token, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: job.title || "",
    description: job.description || "",
    company_name: job.company_name || "",
    location: job.location || "",
    employment_type: job.employment_type || "",
    skills_required: job.skills_required || "",
    experience_required: job.experience_required || "",
    salary: job.salary || "",
    domain: job.domain || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSave = () => {
    setSaving(true);
    setError("");
    fetch(`${API_BASE}/jobs/${job.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update job");
        return res.json();
      })
      .then((updated) => {
        onSaved(updated);
        onClose();
      })
      .catch((err) => setError(err.message))
      .finally(() => setSaving(false));
  };

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ maxWidth: 480, width: "90%", maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>Edit Job</h3>

        {error && <p className="msg-error">{error}</p>}

        <label className="hint">Title</label>
        <input value={form.title} onChange={handleChange("title")} style={{ width: "100%", marginBottom: 10 }} />

        <label className="hint">Description</label>
        <textarea
          value={form.description}
          onChange={handleChange("description")}
          rows={4}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label className="hint">Company Name</label>
        <input value={form.company_name} onChange={handleChange("company_name")} style={{ width: "100%", marginBottom: 10 }} />

        <label className="hint">Location</label>
        <input value={form.location} onChange={handleChange("location")} style={{ width: "100%", marginBottom: 10 }} />

        <label className="hint">Employment Type</label>
        <input value={form.employment_type} onChange={handleChange("employment_type")} style={{ width: "100%", marginBottom: 10 }} />

        <label className="hint">Skills Required (comma-separated)</label>
        <input value={form.skills_required} onChange={handleChange("skills_required")} style={{ width: "100%", marginBottom: 10 }} />

        <label className="hint">Experience Required</label>
        <input value={form.experience_required} onChange={handleChange("experience_required")} style={{ width: "100%", marginBottom: 10 }} />

        <label className="hint">Salary</label>
        <input value={form.salary} onChange={handleChange("salary")} style={{ width: "100%", marginBottom: 10 }} />

        <label className="hint">Domain</label>
        <input value={form.domain} onChange={handleChange("domain")} style={{ width: "100%", marginBottom: 16 }} />

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose} disabled={saving}>Cancel</button>
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RecruiterDashboard({ token }) {
  const [myJobs, setMyJobs] = useState([]);
  const [jobStats, setJobStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [matchesJob, setMatchesJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(null);

    if (matchesJob) {
    return <MatchedCandidatesPanel job={matchesJob} token={token} onBack={() => setMatchesJob(null)} />;
  }

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

  const handleToggleStatus = (job) => {
    setStatusUpdating(job.id);
    fetch(`${API_BASE}/jobs/${job.id}/status`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, is_active: result.is_active } : j))
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setStatusUpdating(null));
  };

  const handleJobSaved = (updatedJob) => {
    setMyJobs((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
  };

  if (selectedJob) {
    return <JobApplicantsPanel job={selectedJob} token={token} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div>
      <h2 className="page-title">My Dashboard</h2>

      {loading && <p className="empty-state">Loading your jobs...</p>}
      {error && <p className="msg-error">{error}</p>}
      {!loading && myJobs.length === 0 && <p className="empty-state">You haven't posted any jobs yet.</p>}

      {editingJob && (
        <EditJobModal
          job={editingJob}
          token={token}
          onClose={() => setEditingJob(null)}
          onSaved={handleJobSaved}
        />
      )}

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

            <div
              onClick={(e) => e.stopPropagation()}
              style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}
            >
              <ShareJobButton job={job} />
              <button onClick={() => setEditingJob(job)}>Edit</button>
              <button onClick={() => handleToggleStatus(job)} disabled={statusUpdating === job.id}>
                {statusUpdating === job.id
                  ? "Updating..."
                  : job.is_active === false
                  ? "Reopen"
                  : "Close"}
              </button>
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

function DeleteAccountFlow({ token, endpoint }) {
  const [step, setStep] = useState("closed"); // "closed" | "confirm" | "success"
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleConfirmDelete = () => {
    setDeleting(true);
    setError("");
    fetch(`${API_BASE}${endpoint}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete account");
        setStep("success");
      })
      .catch((err) => setError(err.message))
      .finally(() => setDeleting(false));
  };

  const handleReturnHome = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--line)", paddingTop: "1.25rem" }}>
      <h3 style={{ marginBottom: "0.5rem", color: "#993C1D" }}>Danger zone</h3>
      <p className="hint" style={{ marginBottom: "0.75rem" }}>
        Deleting your account permanently removes your profile, resume, and applications.
      </p>
      <button
        onClick={() => setStep("confirm")}
        style={{ background: "#FFFFFF", border: "0.5px solid #D85A30", color: "#993C1D" }}
      >
        Delete account
      </button>

      {step === "confirm" && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(4,44,83,0.45)", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 1000,
          }}
          onClick={() => setStep("closed")}
        >
          <div className="card" style={{ maxWidth: 380, width: "90%" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Delete your account?</h3>
            <p className="hint">This permanently removes your profile, resume, and applications. This can't be undone.</p>
            {error && <p className="msg-error">{error}</p>}
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
              <button onClick={() => setStep("closed")} disabled={deleting}>Cancel</button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                style={{ background: "#A32D2D", color: "#fff", border: "none" }}
              >
                {deleting ? "Deleting..." : "Delete account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "success" && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(4,44,83,0.45)", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 1000,
          }}
        >
          <div className="card" style={{ maxWidth: 380, width: "90%", textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>Account deleted</h3>
            <p className="hint">Your account and all associated data have been removed. You'll now be signed out.</p>
            <button
              onClick={handleReturnHome}
              style={{ background: "#185FA5", color: "#fff", border: "none", marginTop: 8 }}
            >
              Return to home
            </button>
          </div>
        </div>
      )}
    </div>
  );
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

          <DeleteAccountFlow token={token} endpoint="/candidates/me" />
        </div>
      )}
    </div>
  );
}

function CandidateJobBrowser({ token }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/jobs/`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const employmentTypes = ["All", ...new Set(jobs.map((j) => j.employment_type).filter(Boolean))];

  const filteredJobs = jobs.filter((job) => {
    const matchesType = typeFilter === "All" || job.employment_type === typeFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      job.title?.toLowerCase().includes(q) ||
      job.company_name?.toLowerCase().includes(q) ||
      job.skills_required?.toLowerCase().includes(q) ||
      job.location?.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div>
      <div style={{ background: "#0E2A63", borderRadius: 16, padding: "24px 24px 40px", marginBottom: "-24px" }}>
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#AFC2F0" }}>Welcome back</p>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#fff" }}>Find your next role</h1>
        <div style={{ marginTop: 16, background: "#fff", borderRadius: 12, padding: 6, display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, skill, or company"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, padding: "8px 10px" }}
          />
        </div>
      </div>

      <div style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 14, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {employmentTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={typeFilter === type ? "btn-primary" : ""}
              style={{ borderRadius: 999, padding: "6px 14px", fontSize: 12.5 }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <p className="hint" style={{ marginBottom: "0.75rem" }}>
        {loading ? "Loading..." : `${filteredJobs.length} opening${filteredJobs.length === 1 ? "" : "s"}`}
      </p>

      {error && <p className="msg-error">{error}</p>}
      {!loading && filteredJobs.length === 0 && <p className="empty-state">No jobs match your search.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} token={token} onRequireLogin={() => {}} />
        ))}
      </div>
    </div>
  );
}

function MatchedJobsStrip({ token }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/candidates/me/matched-jobs`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setMatches(data.matches || []))
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading || matches.length === 0) return null;

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 8px" }}>Recommended for you</p>
      <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
        {matches.slice(0, 6).map((job) => (
          <div key={job.job_id} className="card" style={{ minWidth: 220, flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13.5 }}>{job.title}</p>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600, #2554E8)", whiteSpace: "nowrap" }}>{job.match_score}% match</span>
            </div>
            <p className="hint" style={{ margin: "4px 0 0" }}>{job.company_name} · {job.location}</p>
          </div>
        ))}
      </div>
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
  const [view, setView] = useState("dashboard");

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

function AdminAnalytics({ adminKey }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/admin/analytics?days=30`, { headers: { "X-Admin-Key": adminKey } })
      .then((res) => res.json())
      .then((data) => setSeries(data.series || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [adminKey]);

  if (loading) return <p className="hint">Loading analytics...</p>;
  if (error) return <p className="msg-error">{error}</p>;
  if (series.length === 0) return null;

  const width = 700;
  const height = 220;
  const padding = 30;
  const maxVal = Math.max(1, ...series.flatMap((d) => [d.candidates, d.recruiters, d.applications]));

  function pointsFor(key) {
    return series
      .map((d, i) => {
        const x = padding + (i / (series.length - 1)) * (width - padding * 2);
        const y = height - padding - (d[key] / maxVal) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(" ");
  }

  const lines = [
    { key: "candidates", color: "#2554E8", label: "Candidates" },
    { key: "recruiters", color: "#1E8E5A", label: "Recruiters" },
    { key: "applications", color: "#D85A30", label: "Applications" },
  ];

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ marginBottom: "0.25rem" }}>Portal activity — last 30 days</h3>
      <p className="hint" style={{ marginBottom: "1rem" }}>New candidates, recruiters, and applications per day</p>

      <div style={{ display: "flex", gap: "16px", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {lines.map((l) => (
          <div key={l.key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, display: "inline-block" }}></span>
            <span className="hint">{l.label}</span>
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--line, #ddd)" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="var(--line, #ddd)" strokeWidth="1" />

        {lines.map((l) => (
          <polyline key={l.key} points={pointsFor(l.key)} fill="none" stroke={l.color} strokeWidth="2" />
        ))}
      </svg>
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

      <AdminAnalytics adminKey={adminKey} />

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
const CHATBOT_FAQS = [
  {
    keywords: ["hi", "hello", "hey"],
    answer: "Hi! I'm here to help with quick questions about Coretech Talents. Ask me about jobs, signing up, or our services.",
  },
  {
    keywords: ["job", "jobs", "opening", "vacancy", "apply"],
    answer: "You can browse all open jobs on our homepage, or sign up as a candidate to apply directly. Click \"Login / Sign Up\" at the top to get started.",
  },
  {
    keywords: ["recruiter", "hire", "hiring", "post a job", "post job"],
    answer: "Recruiters can sign up, post jobs, search our candidate pool, and even arrange campus hiring drives. Recruiter accounts need admin approval before first login.",
  },
  {
    keywords: ["resume", "cv"],
    answer: "We have a free Resume Builder tool under the Services tab — no signup required to try it out.",
  },
  {
    keywords: ["campus", "college", "drive"],
    answer: "Our Campus Exploration feature helps recruiters connect with colleges across Tamil Nadu for hiring drives. It's available to approved recruiter accounts.",
  },
  {
    keywords: ["contact", "support", "help", "email"],
    answer: "You can reach us through the Contact Us button on the homepage, and our team will get back to you.",
  },
  {
    keywords: ["signup", "sign up", "register", "account"],
    answer: "Click \"Login / Sign Up\" at the top of the page, choose Candidate or Recruiter, then Sign Up. Recruiter accounts require approval before they can log in.",
  },
  {
    keywords: ["free", "cost", "price", "charge"],
    answer: "Coretech Talents is free for candidates. For recruiter services, reach out via Contact Us for details.",
  },
  {
    keywords: ["hi", "hello", "hey"],
    answer: "Hi! I'm here to help with quick questions about Coretech Talents. Ask me about jobs, signing up, or our services.",
  },
  {
    keywords: ["counselling", "counseling", "1:1", "career advice"],
    answer: "You can book a free 1:1 Career Counselling session under Career Advancement — resume review, interview prep, or career-direction advice from our team.",
  },
  {
    keywords: ["mini", "minis", "video", "shorts"],
    answer: "Coretech Minis are quick 15-second videos on resume tips, interview prep, and job market trends — find them under Career Advancement.",
  },
  {
    keywords: ["newsletter", "article", "blog"],
    answer: "We publish newsletters on resume tips, salary negotiation, recruitment trends, and more — check the Newsletters tab under Career Advancement.",
  },
  {
    keywords: ["campus", "college", "drive"],
    answer: "Our Campus Exploration feature helps recruiters connect with colleges across Tamil Nadu for hiring drives. It's available to approved recruiter accounts.",
  },
  {
    keywords: ["rpo", "expert solution", "dedicated recruiter", "outsourc"],
    answer: "Coretech Expert Solutions gives you a dedicated recruiter working in-office with your team, managing hiring end-to-end. Check the Services tab for details.",
  },
  {
    keywords: ["resume", "cv"],
    answer: "We have a free Resume Builder tool under the Services tab — no signup required to try it out.",
  },
  {
    keywords: ["service", "services", "what do you offer", "what do you provide"],
    answer: "We offer job matching, a free Resume Builder, Career Counselling, Coretech Minis, and career newsletters for candidates — check the Services and Career Advancement tabs. For recruiters: job posting, candidate search, Campus Exploration, and Expert Solutions (RPO-style support).",
  },
  {
    keywords: ["recruiter", "hire", "hiring", "post a job", "post job"],
    answer: "Recruiters can sign up, post jobs, search our candidate pool, and even arrange campus hiring drives. Recruiter accounts need admin approval before first login.",
  },
  {
    keywords: ["job", "jobs", "opening", "vacancy", "apply"],
    answer: "You can browse all open jobs on our homepage, or sign up as a candidate to apply directly. Click \"Login / Sign Up\" at the top to get started.",
  },
  {
    keywords: ["status", "application", "applied"],
    answer: "You can track your application status anytime under \"My Applications\" in your candidate dashboard once you're logged in.",
  },
  {
    keywords: ["password", "forgot", "login issue", "can't log in", "cant log in"],
    answer: "For login or password issues, please reach out via the Contact Us button and our team will help you sort it out.",
  },
  {
    keywords: ["pending", "approval", "waiting", "not approved"],
    answer: "New recruiter accounts are manually reviewed for verification — you'll get an email once approved, usually within a business day or two.",
  },
  {
    keywords: ["about", "founder", "who are you", "company"],
    answer: "Coretech Talents is a recruitment and staffing company connecting skilled talent with manufacturing and corporate employers across India. Check the About tab to learn more, including about our founder.",
  },
  {
    keywords: ["privacy", "data", "gdpr", "delete my"],
    answer: "You can review what we collect in our Privacy Policy, and request data access or deletion any time — see Terms of Service, Section 9, or Contact Us.",
  },
  {
    keywords: ["signup", "sign up", "register", "account"],
    answer: "Click \"Login / Sign Up\" at the top of the page, choose Candidate or Recruiter, then Sign Up. Recruiter accounts require approval before they can log in.",
  },
  {
    keywords: ["free", "cost", "price", "charge"],
    answer: "Coretech Talents is free for candidates — profile, applications, resume builder, and counselling, always. Recruiter services aren't cost-based right now either; that may change down the line as the platform grows.",
  },
  {
    keywords: ["contact", "support", "help", "email"],
    answer: "You can reach us through the Contact Us button on the homepage, and our team will get back to you.",
  },
];

const CHATBOT_FALLBACK =
  "I'm not sure about that one — try asking about jobs, signing up, recruiters, resumes, or campus drives. Or use the Contact Us button for anything else.";

function findFaqAnswer(userText) {
  const text = userText.toLowerCase();
  for (const faq of CHATBOT_FAQS) {
    if (faq.keywords.some((kw) => text.includes(kw))) {
      return faq.answer;
    }
  }
  return CHATBOT_FALLBACK;
}

function NatashaAvatar({ size = 28 }) {
  return (
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ width: size, height: size, minWidth: size, minHeight: size, display: "block" }}>
      <circle cx="24" cy="24" r="24" fill="#2554E8" />
      <circle cx="21" cy="17" r="7" fill="#fff" />
      <path d="M8 41c0-9 6-15 13-15s13 6 13 15" fill="#fff" />
      <rect x="26" y="24" width="12" height="15" rx="1.5" fill="#0A192F" />
      <line x1="29" y1="29" x2="35" y2="29" stroke="#fff" strokeWidth="1.2" />
      <line x1="29" y1="32.5" x2="35" y2="32.5" stroke="#fff" strokeWidth="1.2" />
      <line x1="29" y1="36" x2="33" y2="36" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, I'm Natasha! I know what it's like to be job hunting - ask me about jobs, signing up, or our services and I'll help however I can." },
  ]);

  function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const reply = findFaqAnswer(trimmed);
    setMessages((prev) => [...prev, { from: "user", text: trimmed }, { from: "bot", text: reply }]);
    setInput("");
  }

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999 }}>
      {open && (
        <div
          style={{
            width: 300,
            maxHeight: 420,
            background: "#fff",
            borderRadius: 12,
            border: "1px solid var(--line, #ccc)",
            boxShadow: "0 8px 24px rgba(10,25,47,0.18)",
            display: "flex",
            flexDirection: "column",
            marginBottom: 12,
            overflow: "hidden",
          }}
        >
          <div style={{ background: "#0A192F", color: "#fff", padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
            <NatashaAvatar size={30} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Natasha</p>
              <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Here to help with your job search</p>
            </div>
            <button className="btn-link" onClick={() => setOpen(false)} style={{ color: "#fff", padding: 0 }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: 280 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  background: m.from === "user" ? "var(--blue-600, #2554E8)" : "var(--bg, #f3f7fd)",
                  color: m.from === "user" ? "#fff" : "var(--text-primary, #1a1a1a)",
                  padding: "0.5rem 0.75rem",
                  borderRadius: 10,
                  fontSize: 13,
                  maxWidth: "85%",
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ display: "flex", gap: 6, padding: "0.6rem", borderTop: "1px solid var(--line, #eee)" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Natasha a question..."
              style={{ flex: 1, fontSize: 13 }}
            />
            <button type="submit" className="btn-primary" style={{ fontSize: 12, padding: "0 12px" }}>Send</button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "var(--blue-600, #2554E8)",
          color: "#fff",
          border: "none",
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(10,25,47,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Open chat with Natasha"
      >
        {open ? "✕" : <NatashaAvatar size={30} />}
      </button>
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
          document.getElementById("career-advancement-section")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <CookieConsent />

      {!portalOpen && view === "jobs" && <CareerAdvancementSection />}

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

        {view === "home" && !portalOpen && (
          <HomeSection
            onLogin={() => {
              setPortalInitialRole("candidate");
              setPortalInitialMode("signup");
              setPortalOpen(true);
              setView("jobs");
            }}
          />
        )}

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
      {!portalOpen && (view === "jobs" || view === "home") && <ChatbotWidget />}
    </>
  );
}

function App() {
  return (
    <Routes>
     <Route path="/" element={<MainApp />} />
     <Route path="/jobs/:id" element={<JobDetailPage />} />
     <Route path="/services/resume-building" element={<ResumeServices />} />
     <Route path="/privacy-policy" element={<PrivacyPolicy />} />
     <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
}



export default App;