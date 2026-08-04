import { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/coretech-logo.png";
import introVideo from "./assets/intro.mp4";

const API_BASE = "https://job-portal-backend-production-6d9d.up.railway.app";

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
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
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
        style={{
          width: 100,
          height: 100,
          marginBottom: "1rem",
          animation: "pulse 1.2s ease-in-out infinite",
        }}
      />
      <h1 style={{ color: "#64FFDA", fontSize: "1.5rem", letterSpacing: "0.05em" }}>
        Coretech Talents
      </h1>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

function Hero({ onOpenPortal, onAdminAccess, onAbout, onServices, onNewsletter }) {
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

function AboutSection() {
  return (
    <div className="container" id="about-section" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="card" style={{ textAlign: "center" }}>
        <h2 className="page-title">About Us</h2>
        <p className="card-desc">
          Coretech Talents was founded in 2023 by an individual entrepreneur with a vision to
          bridge the gap between talent and opportunity. What began as a focused effort in
          recruitment has since grown to include skilling and upskilling initiatives, helping
          both job seekers and companies grow together through reliable, skill-focused support.
        </p>
      </div>
    </div>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Recruitment Support",
      desc: "End-to-end hiring assistance to help companies find the right talent efficiently.",
    },
    {
      title: "Swift Placements",
      desc: "Rapid, efficient matching that connects the right candidates to the right roles — including direct access to fresh graduate talent straight from partner colleges.",
    },
    {
      title: "Industrial Training",
      desc: "Hands-on training programs that prepare candidates with real-world, job-ready skills.",
    },
    {
      title: "Campus Support",
      desc: "Partnering with institutions to connect students and freshers with career opportunities.",
    },
  ];

  return (
    <div className="container" id="services-section" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 className="page-title">Our Services</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }}
      >
        {services.map((service, index) => (
          <div
            key={service.title}
            className="card"
            style={{
              textAlign: "center",
              gridColumn: index === services.length - 1 ? "1 / -1" : "auto",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{service.title}</h3>
            <p className="card-meta">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterSection() {
  const newsletters = [
    {
      title: "Recruitment Trends 2026",
      desc: "Hiring is shifting toward skills-based assessments over degrees, faster interview cycles, and AI-assisted shortlisting — companies that adapt are seeing stronger candidate pipelines.",
    },
    {
      title: "Understanding the GenZ Mindset",
      desc: "GenZ candidates prioritize purpose, flexibility, and transparency. They expect quick feedback loops, honest job descriptions, and clear growth paths — not just a paycheck.",
    },
    {
      title: "Evolving Recruitment Strategies",
      desc: "Employer branding, referral-driven hiring, and community-led talent pools are replacing traditional job-board-only approaches as competition for skilled talent increases.",
    },
    {
      title: "Technology in Recruitment",
      desc: "AI-powered resume screening, automated interview scheduling, and data-driven candidate matching are reshaping how recruiters find and engage talent faster and more accurately.",
    },
  ];

  return (
    <div className="container" id="newsletter-section" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
      <div className="card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 className="page-title">Newsletter</h2>
        <p className="card-desc">Insights on hiring trends, workplace shifts, and what's next in recruitment.</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
        }}
      >
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
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          phone,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const detail = data.detail;
        const message = Array.isArray(detail)
          ? detail.map((d) => d.msg).join(", ")
          : detail || "Registration failed";
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
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="[0-9]{10}"
            title="Enter a 10-digit mobile number"
          />
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
          company_name: companyName || undefined,
          designation: designation || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const detail = data.detail;
        const message = Array.isArray(detail)
          ? detail.map((d) => d.msg).join(", ")
          : detail || "Registration failed";
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
          <label>Company name (optional)</label>
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div className="field">
          <label>Designation (optional)</label>
          <input value={designation} onChange={(e) => setDesignation(e.target.value)} />
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

function PortalAccess({ onCandidateLogin, onRecruiterLogin, onClose }) {
  const [role, setRole] = useState(null);
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
          <button style={{ flex: 1 }} onClick={() => chooseRole("candidate")}>
            Candidate
          </button>
          <button style={{ flex: 1 }} onClick={() => chooseRole("recruiter")}>
            Recruiter
          </button>
        </div>
      )}

      {role && (
        <>
          <h3 style={{ marginTop: "1rem", marginBottom: "0.75rem" }}>
            {role === "candidate" ? "Candidate" : "Recruiter"}
          </h3>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <button
              className={mode === "login" ? "btn-applied" : ""}
              style={{ flex: 1 }}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              className={mode === "signup" ? "btn-applied" : ""}
              style={{ flex: 1 }}
              onClick={() => switchMode("signup")}
            >
              Sign Up
            </button>
          </div>

          {role === "candidate" && mode === "login" && (
            <>
              {candidateSignupDone && (
                <p className="msg-success" style={{ marginBottom: "1rem" }}>
                  Account created successfully — please log in.
                </p>
              )}
              <LoginForm endpoint="/auth/login" label="Candidate Login" onLogin={onCandidateLogin} />
            </>
          )}

          {role === "candidate" && mode === "signup" && (
            <CandidateSignupForm
              onSuccess={() => {
                setCandidateSignupDone(true);
                setMode("login");
              }}
            />
          )}

          {role === "recruiter" && mode === "login" && (
            <>
              {recruiterSignupDone && (
                <p className="msg-success" style={{ marginBottom: "1rem" }}>
                  Account created successfully — please log in.
                </p>
              )}
              <LoginForm endpoint="/recruiter-auth/login" label="Recruiter Login" onLogin={onRecruiterLogin} />
            </>
          )}

          {role === "recruiter" && mode === "signup" && (
            <RecruiterSignupForm
              onSuccess={() => {
                setRecruiterSignupDone(true);
                setMode("login");
              }}
            />
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
          <input
            value={skillsRequired}
            onChange={(e) => setSkillsRequired(e.target.value)}
            placeholder="python, fastapi, postgresql"
            required
          />
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
      <PostJobForm
        token={token}
        onPosted={() => {
          setPosted(true);
          setTimeout(() => setPosted(false), 3000);
        }}
      />
      {posted && <p className="msg-success">Job posted successfully.</p>}
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
      const res = await fetch(
        `${API_BASE}/jobs/${jobId}/applicants/${applicant.application_id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

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
      const res = await fetch(
        `${API_BASE}/jobs/${jobId}/applicants/${applicant.application_id}/resume`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
        <button
          className={applicant.status === "accepted" ? "btn-applied" : "btn-primary"}
          disabled={updating || applicant.status === "accepted"}
          onClick={() => updateStatus("accepted")}
        >
          {applicant.status === "accepted" ? "Accepted ✓" : "Accept"}
        </button>
        <button disabled={updating || applicant.status === "rejected"} onClick={() => updateStatus("rejected")}>
          Reject
        </button>
        <button disabled={updating || applicant.status === "pending"} onClick={() => updateStatus("pending")}>
          Reset to Pending
        </button>
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
    fetch(`${API_BASE}/jobs/${job.id}/applicants`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setApplicants(data.applicants || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [job.id, token]);

  function handleStatusChanged(applicationId, newStatus) {
    setApplicants((prev) =>
      prev.map((a) => (a.application_id === applicationId ? { ...a, status: newStatus } : a))
    );
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
    fetch(`${API_BASE}/jobs/mine/list`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
    fetch(`${API_BASE}/candidates/my-applications`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
    fetch(`${API_BASE}/candidates/me/resume`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setHasResume(res.ok);
      })
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
      const res = await fetch(`${API_BASE}/candidates/me/resume`, {
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
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0] || null)}
              required
            />
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

function CandidateProfile({ token }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pictureUrl, setPictureUrl] = useState(null);
  const [pictureLoading, setPictureLoading] = useState(true);
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
    fetch(`${API_BASE}/candidates/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setForm({
          full_name: data.full_name || "",
          email: data.email || "",
          mobile_number: data.mobile_number || "",
          location: data.location || "",
          designation: data.designation || "",
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

  function loadPicture() {
    setPictureLoading(true);
    fetch(`${API_BASE}/candidates/me/profile-picture`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            overflow: "hidden",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
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
            <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={() => setEditing(true)}>
              Edit Profile
            </button>
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
              <input
                value={form.mobile_number}
                onChange={(e) => handleFormChange("mobile_number", e.target.value)}
                required
                pattern="[0-9]{10}"
              />
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
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={() => { setEditing(false); loadProfile(); }} disabled={saving}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="form-card">
        <h2>Update Profile Picture</h2>
        <form onSubmit={handleUploadPicture}>
          <div className="field">
            <label>JPG or PNG (max 5MB)</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) => setFile(e.target.files[0] || null)}
              required
            />
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
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailQuery = filters.q.includes("@");
  const isValidEmail = isEmailQuery ? EMAIL_REGEX.test(filters.q) : true;

  function handleChange(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (isEmailQuery && !isValidEmail) return;

    setError("");
    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
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

  async function handleDownloadResume(candidate) {
    setError("");
    setDownloadingId(candidate.id);
    try {
      const res = await fetch(`${API_BASE}/candidates/${candidate.id}/resume`, {
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

  return (
    <div>
      <h2 className="page-title">Search Candidates</h2>

      <div className="form-card">
        <form onSubmit={handleSearch}>
          <div className="field">
            <label>Search by name, skills, email, or mobile</label>
            <input
              value={filters.q}
              onChange={(e) => handleChange("q", e.target.value)}
              placeholder="e.g. python, name, email, or mobile number"
            />
            {isEmailQuery && !isValidEmail && (
              <p className="msg-error" style={{ marginTop: "0.25rem" }}>
                That doesn't look like a valid email address
              </p>
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
              <input
                value={filters.field_of_study}
                onChange={(e) => handleChange("field_of_study", e.target.value)}
                placeholder="e.g. Computer Science"
              />
            </div>
          </div>

          {error && <p className="msg-error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading || (isEmailQuery && !isValidEmail)}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {searched && !loading && results.length === 0 && !error && (
        <p className="empty-state">No candidates found matching your filters.</p>
      )}

      {results.map((candidate) => (
        <div key={candidate.id} className="card">
          <h2>{candidate.full_name}</h2>
          <p className="card-meta">
            {candidate.email}
            {candidate.mobile_number && ` · ${candidate.mobile_number}`}
          </p>
          {candidate.resume_headline && <p className="card-desc">{candidate.resume_headline}</p>}
          <p className="card-meta">
            {candidate.years_of_experience != null && `${candidate.years_of_experience} yrs exp`}
            {candidate.expected_ctc != null && ` · Expected CTC: ${candidate.expected_ctc}`}
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
          <button
            className="btn-primary"
            onClick={() => handleDownloadResume(candidate)}
            disabled={downloadingId === candidate.id}
          >
            {downloadingId === candidate.id ? "Downloading..." : "Download Resume"}
          </button>
        </div>
      ))}
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
      const res = await fetch(`${API_BASE}/admin/dashboard`, {
        headers: { "X-Admin-Key": key },
      });

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
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
        </div>
        {error && <p className="msg-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Verifying..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

function AdminDashboard({ adminKey, onBack }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/admin/dashboard`, {
      headers: { "X-Admin-Key": adminKey },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [adminKey]);

  return (
    <div>
      <button className="btn-link" onClick={onBack}>Back to jobs</button>
      <h2 className="page-title">Super Admin Dashboard</h2>

      {loading && <p className="empty-state">Loading stats...</p>}
      {error && <p className="msg-error">{error}</p>}

      {stats && (
        <>
          <div className="card">
            <h3>Overview</h3>
            <p className="card-meta">
              Total jobs: {stats.total_jobs} · Active jobs: {stats.active_jobs} · Total views: {stats.total_views}
            </p>
            <p className="card-meta">
              Recruiters: {stats.total_recruiters} · Candidates: {stats.total_candidates} · Applications: {stats.total_applications}
            </p>
          </div>

          <div className="card">
            <h3>Applications by status</h3>
            <div className="tags">
              {Object.entries(stats.applications_by_status || {}).map(([status, count]) => (
                <span className="tag" key={status}>{status}: {count}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function RecruiterShell({ token, onLogout }) {
  const [view, setView] = useState("home");

  const tabs = [
    { key: "dashboard", label: "My Dashboard" },
    { key: "searchCandidates", label: "Search Candidates" },
    { key: "postJob", label: "Post a Job" },
  ];

  return (
    <div className="recruiter-shell" style={{ display: "flex", minHeight: "100vh" }}>
      <div
        className="recruiter-sidebar"
        style={{
          width: 240,
          borderRight: "1px solid rgba(255,255,255,0.12)",
          padding: "2rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        <div className="brand" style={{ marginBottom: "1rem" }}>
          <img src={logo} alt="Coretech Talents" className="brand-mark" style={{ width: 32, height: 32 }} />
          <div className="brand-name" style={{ fontSize: "1rem" }}>Coretech Talents</div>
        </div>

        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={view === tab.key ? "btn-primary" : ""}
            onClick={() => setView(tab.key)}
          >
            {tab.label}
          </button>
        ))}

        <button onClick={onLogout} style={{ marginTop: "auto" }}>
          Recruiter Log out
        </button>
      </div>

      <div className="recruiter-main" style={{ flex: 1, padding: "2.5rem" }}>
        {view === "home" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minHeight: "70vh",
              textAlign: "center",
            }}
          >
            <img src={logo} alt="Coretech Talents" style={{ width: 110, height: 110, marginBottom: "1.25rem" }} />
            <h1 className="brand-name" style={{ fontSize: "1.8rem" }}>Coretech Talents</h1>
            <p className="hint">Choose an option from the panel to get started.</p>
          </div>
        )}

        {view === "dashboard" && <RecruiterDashboard token={token} />}
        {view === "searchCandidates" && <CandidateSearch token={token} />}
        {view === "postJob" && <PostJobPage token={token} />}
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
      <div
        className="candidate-sidebar"
        style={{
          width: 240,
          borderRight: "1px solid rgba(255,255,255,0.12)",
          padding: "2rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        <div className="brand" style={{ marginBottom: "1rem" }}>
          <img src={logo} alt="Coretech Talents" className="brand-mark" style={{ width: 32, height: 32 }} />
          <div className="brand-name" style={{ fontSize: "1rem" }}>Coretech Talents</div>
        </div>

        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={view === tab.key ? "btn-primary" : ""}
            onClick={() => setView(tab.key)}
          >
            {tab.label}
          </button>
        ))}

        <button onClick={onLogout} style={{ marginTop: "auto" }}>
          Candidate Log out
        </button>
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

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [error, setError] = useState(null);
  const [showSplash, setShowSplash] = useState(false);

  const [candidateToken, setCandidateToken] = useState(() => localStorage.getItem("candidate_token"));
  const [recruiterToken, setRecruiterToken] = useState(() => localStorage.getItem("recruiter_token"));
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("admin_key"));

  const [portalOpen, setPortalOpen] = useState(false);
  const [view, setView] = useState("jobs");

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

  if (!introDone) {
    return <IntroVideo onFinish={() => setIntroDone(true)} />;
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
        onAbout={() => {
          document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        onServices={() => {
          document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        onNewsletter={() => {
          document.getElementById("newsletter-section")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {!portalOpen && view === "jobs" && (
        <>
          <AboutSection />
          <ServicesSection />
          <NewsletterSection />
        </>
      )}

      <div className="container">
        {portalOpen && (
          <PortalAccess
            onCandidateLogin={handleCandidateLogin}
            onRecruiterLogin={handleRecruiterLogin}
            onClose={() => setPortalOpen(false)}
          />
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
      </div>
    </>
  );
}

export default App;