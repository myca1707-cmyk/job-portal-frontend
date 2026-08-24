import "./AudienceSplit.css";

/**
 * AudienceSplit
 * Two stacked panels on the homepage — one for candidates, one for recruiters —
 * each with a headline, short line of support copy, CTA, and a custom line-art
 * illustration. Panels alternate image/text sides and use a diagonal seam
 * between them, echoing "two paths splitting from one platform."
 *
 * Usage: <AudienceSplit onCandidateClick={...} onRecruiterClick={...} />
 * Both handlers are optional — falls back to no-ops if omitted, so you can
 * drop this in and wire it to your existing signup modals afterward.
 */
export default function AudienceSplit({
  onCandidateClick = () => {},
  onRecruiterClick = () => {},
}) {
  return (
    <section className="audience-split">
      {/* CANDIDATE PANEL */}
      <div className="audience-panel audience-panel--candidate">
        <div className="audience-panel__text">
          <span className="audience-panel__eyebrow">For Candidates</span>
          <h2 className="audience-panel__headline">Want to get placed?</h2>
          <p className="audience-panel__support">
            Build your profile, upload your resume, and get matched with
            manufacturing and corporate roles across India.
          </p>
          <button
            className="audience-panel__cta audience-panel__cta--candidate"
            onClick={onCandidateClick}
          >
            Create your profile
          </button>
        </div>
        <div className="audience-panel__art">
          <CandidateIllustration />
        </div>
      </div>

      {/* DIAGONAL SEAM */}
      <div className="audience-split__seam" aria-hidden="true" />

      {/* RECRUITER PANEL */}
      <div className="audience-panel audience-panel--recruiter">
        <div className="audience-panel__art">
          <RecruiterIllustration />
        </div>
        <div className="audience-panel__text">
          <span className="audience-panel__eyebrow">For Recruiters</span>
          <h2 className="audience-panel__headline">Hire the best talent.</h2>
          <p className="audience-panel__support">
            Post roles, search verified candidates, and manage your entire
            hiring pipeline from one dashboard.
          </p>
          <button
            className="audience-panel__cta audience-panel__cta--recruiter"
            onClick={onRecruiterClick}
          >
            Post a job
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Illustrations (inline SVG, no external image requests) ---------- */

function CandidateIllustration() {
  return (
    <svg viewBox="0 0 320 320" className="audience-illustration" role="img" aria-label="Candidate holding a resume">
      <circle cx="160" cy="160" r="150" className="illus-bg illus-bg--candidate" />
      {/* resume sheet */}
      <rect x="150" y="90" width="90" height="120" rx="4" className="illus-paper" />
      <line x1="164" y1="112" x2="226" y2="112" className="illus-line illus-line--bold" />
      <line x1="164" y1="128" x2="216" y2="128" className="illus-line" />
      <line x1="164" y1="140" x2="220" y2="140" className="illus-line" />
      <line x1="164" y1="158" x2="210" y2="158" className="illus-line" />
      <line x1="164" y1="170" x2="222" y2="170" className="illus-line" />
      <line x1="164" y1="182" x2="200" y2="182" className="illus-line" />
      {/* person */}
      <circle cx="120" cy="128" r="26" className="illus-figure" />
      <path
        d="M70 230 C70 185 100 168 120 168 C140 168 170 185 170 230 Z"
        className="illus-figure"
      />
      {/* arm holding the resume */}
      <path d="M148 200 C160 195 152 175 158 155" className="illus-arm" />
    </svg>
  );
}

function RecruiterIllustration() {
  return (
    <svg viewBox="0 0 320 320" className="audience-illustration" role="img" aria-label="Recruiter working on a laptop">
      <circle cx="160" cy="160" r="150" className="illus-bg illus-bg--recruiter" />
      {/* person */}
      <circle cx="160" cy="118" r="26" className="illus-figure" />
      <path
        d="M108 225 C108 178 140 160 160 160 C180 160 212 178 212 225 Z"
        className="illus-figure"
      />
      {/* laptop base */}
      <rect x="112" y="212" width="96" height="10" rx="3" className="illus-laptop-base" />
      {/* laptop screen */}
      <path d="M126 168 L194 168 L200 212 L120 212 Z" className="illus-laptop-screen" />
      <rect x="134" y="176" width="52" height="30" rx="2" className="illus-paper" />
      <line x1="140" y1="185" x2="176" y2="185" className="illus-line" />
      <line x1="140" y1="193" x2="168" y2="193" className="illus-line" />
    </svg>
  );
}