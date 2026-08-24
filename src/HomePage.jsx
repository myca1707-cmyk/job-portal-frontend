import React from "react";
import "./HomePage.css";

export default function HomePage({ onPostJob, onBrowseJobs, onLogin }) {
  return (
    <div className="ct-home">
      <header className="ct-hero">
        <div className="ct-wrap ct-hero-grid">
          <div>
            <div className="ct-eyebrow">
              <span className="ct-dot"></span> LIVE ACROSS 83 CITIES IN TAMIL NADU
            </div>
            <h1 className="ct-h1">
              Hiring, built for{" "}
              <span className="ct-accent">
                how manufacturing
                <br />
                and corporate teams
              </span>{" "}
              actually work.
            </h1>
            <p className="ct-hero-sub">
              CoreTech Talents connects industrial, manufacturing, and corporate
              employers with verified candidates — from shop floor to head
              office — in one pipeline.
            </p>
            <div className="ct-hero-actions">
              <button className="ct-btn ct-btn-primary" onClick={onPostJob}>
                I'm hiring — Post a job
              </button>
              <button className="ct-btn ct-btn-ghost" onClick={onBrowseJobs}>
                I'm job hunting — Browse roles
              </button>
            </div>
            <div className="ct-hero-note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#2E9E6B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="9" stroke="#2E9E6B" strokeWidth="1.5" />
              </svg>
              No fee to apply — free resume builder included
            </div>
          </div>

          <div className="ct-pipeline-card">
            <div className="ct-ph-label">
              <span>YOUR HIRING PIPELINE</span>
              <span>THIS WEEK</span>
            </div>
            <div className="ct-pipeline-track">
              <PipelineRow name="Applied" width="100%" color="#8CA6C4" count={142} />
              <PipelineRow name="Shortlisted" width="58%" color="#5C86AE" count={61} />
              <PipelineRow name="Interview" width="34%" color="#1D5FD6" count={28} />
              <PipelineRow name="Offer" width="18%" color="#4C8DF0" count={12} />
              <PipelineRow name="Hired" width="11%" color="#2E9E6B" count={7} />
            </div>
            <div className="ct-pipeline-foot">
              <span>Avg. time to hire</span>
              <b>9.4 days</b>
            </div>
          </div>
        </div>
      </header>

      <div className="ct-stats-strip">
        <div className="ct-wrap ct-stats-grid">
          <Stat num="12,400+" label="Candidate profiles" />
          <Stat num="340+" label="Hiring companies" />
          <Stat num="83" label="Cities covered in Tamil Nadu" />
          <Stat num="9.4 days" label="Median time to hire" />
        </div>
      </div>

      <section className="ct-section">
        <div className="ct-wrap">
          <div className="ct-section-head">
            <div className="ct-section-eyebrow">Two sides, one platform</div>
            <h2 className="ct-section-title">
              Built for whichever side of the table you're on
            </h2>
            <p className="ct-section-sub">
              Candidates get a clean path to real jobs. Recruiters get a full
              pipeline, not just a resume inbox.
            </p>
          </div>
          <div className="ct-path-grid">
            <div className="ct-path-card ct-candidate">
              <div className="ct-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#1D5FD6" strokeWidth="2" />
                  <path
                    d="M4 20c0-4 3.5-6 8-6s8 2 8 6"
                    stroke="#1D5FD6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>For candidates</h3>
              <p>
                Build a profile once, apply everywhere, and track every
                application in one place.
              </p>
              <ul className="ct-path-list">
                <li>Free resume builder with instant PDF download</li>
                <li>Browse by domain — manufacturing, IT, healthcare &amp; more</li>
                <li>Campus and college explorer for early-career roles</li>
                <li>Personal details stay private until you apply</li>
              </ul>
              <button className="ct-btn ct-btn-ghost ct-btn-sm" onClick={onLogin}>
                Create your profile →
              </button>
            </div>
            <div className="ct-path-card ct-recruiter">
              <div className="ct-icon-badge ct-icon-badge-blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="5" width="16" height="14" rx="2" stroke="#1D5FD6" strokeWidth="2" />
                  <path d="M4 10h16" stroke="#1D5FD6" strokeWidth="2" />
                </svg>
              </div>
              <h3>For recruiters</h3>
              <p>
                Post roles, search verified candidates, and run your pipeline
                stage by stage.
              </p>
              <ul className="ct-path-list">
                <li>Kanban pipeline — Applied → Shortlisted → Interview → Hired</li>
                <li>Candidate search with experience &amp; salary filters</li>
                <li>Campus sourcing across 83 Tamil Nadu cities</li>
                <li>Admin-approved recruiter accounts only</li>
              </ul>
              <button className="ct-btn ct-btn-amber ct-btn-sm" onClick={onPostJob}>
                Post your first job →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="ct-section" style={{ paddingTop: 0 }}>
        <div className="ct-wrap">
          <div className="ct-section-head">
            <div className="ct-section-eyebrow">Why teams choose CoreTech Talents</div>
            <h2 className="ct-section-title">Everything a hiring team actually needs</h2>
          </div>
          <div className="ct-feature-grid">
            <FeatureCard
              title="Live pipeline tracking"
              text="Every applicant moves through a clear kanban — no more guessing where a candidate stands."
              path="M3 17l6-6 4 4 8-8"
            />
            <FeatureCard
              title="Smart candidate search"
              text="Filter by experience, expected salary, domain, and current company in seconds."
              circle
            />
            <FeatureCard
              title="Campus sourcing"
              text="Explore engineering, polytechnic, ITI and arts & science colleges across Tamil Nadu."
              path="M12 3v18M3 12h18"
            />
            <FeatureCard
              title="Free resume builder"
              text="A guided step-by-step builder with live preview — no signup required to get started."
              rect
            />
            <FeatureCard
              title="Verified recruiters"
              text="Every recruiter account is admin-approved before a single job goes live."
              star
            />
            <FeatureCard
              title="Privacy by default"
              text="Candidate phone and email stay hidden in search until they choose to apply."
              clock
            />
          </div>
        </div>
      </section>

      <section className="ct-section" style={{ paddingTop: 0 }}>
        <div className="ct-wrap">
          <div className="ct-section-head">
            <div className="ct-section-eyebrow">How it works</div>
            <h2 className="ct-section-title">From post to hire, in five stages</h2>
          </div>
          <div className="ct-steps-row">
            <Step num="1" title="Post or apply" text="Recruiters post a role, candidates build a profile and apply." />
            <Step num="2" title="Shortlist" text="Filter and shortlist candidates by experience, salary, and domain." />
            <Step num="3" title="Interview" text="Move shortlisted candidates into the interview stage on the pipeline." />
            <Step num="4" title="Offer" text="Extend an offer directly from the candidate's pipeline card." />
            <Step num="5" title="Hire" text="Mark as hired — the pipeline and dashboard update in real time." last />
          </div>
        </div>
      </section>

      <div className="ct-cta-band">
        <h2>Ready to build your pipeline?</h2>
        <p>Free to post your first job. No fee for candidates, ever.</p>
        <div className="ct-cta-actions">
          <button className="ct-btn ct-btn-amber" onClick={onPostJob}>Post a job</button>
          <button className="ct-btn ct-btn-ghost ct-btn-ghost-dark" onClick={onBrowseJobs}>Browse jobs</button>
        </div>
      </div>

      <footer className="ct-footer">
        <div className="ct-wrap">
          <div className="ct-foot-grid">
            <div className="ct-foot-brand">
              <div className="ct-logo">
                <div className="ct-mark">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12h4l2-7 4 14 2-7h4"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                CoreTech Talents
              </div>
              <p>
                Connecting manufacturing, industrial, and corporate employers
                with candidates across Tamil Nadu.
              </p>
            </div>
            <div className="ct-foot-col">
              <h6>Candidates</h6>
              <a href="#">Browse jobs</a>
              <a href="#">Resume builder</a>
              <a href="#">Campus explorer</a>
            </div>
            <div className="ct-foot-col">
              <h6>Recruiters</h6>
              <a href="#">Post a job</a>
              <a href="#">Search candidates</a>
              <a href="#">Pricing</a>
            </div>
            <div className="ct-foot-col">
              <h6>Company</h6>
              <a href="#">Privacy policy</a>
              <a href="#">Terms of service</a>
              <a href="#">Contact support</a>
            </div>
          </div>
          <div className="ct-foot-bottom">
            <span>© 2026 CoreTech Talents. All rights reserved.</span>
            <span className="ct-mono">MADE IN TAMIL NADU</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PipelineRow({ name, width, color, count }) {
  return (
    <div className="ct-stage-row">
      <div className="ct-stage-name">{name}</div>
      <div className="ct-stage-bar-bg">
        <div
          className="ct-stage-bar-fill"
          style={{ width, background: color }}
        >
          <span className="ct-stage-count">{count}</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ num, label }) {
  return (
    <div className="ct-stat">
      <div className="ct-stat-num">{num}</div>
      <div className="ct-stat-label">{label}</div>
    </div>
  );
}

function Step({ num, title, text, last }) {
  return (
    <div className={`ct-step${last ? " ct-step-last" : ""}`}>
      <div className="ct-step-num">{num}</div>
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  );
}

function FeatureCard({ title, text, path, circle, rect, star, clock }) {
  return (
    <div className="ct-feature-card">
      <div className="ct-f-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          {path && (
            <path d={path} stroke="#1D5FD6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {circle && (
            <>
              <circle cx="11" cy="11" r="7" stroke="#1D5FD6" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" stroke="#1D5FD6" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
          {rect && (
            <>
              <rect x="4" y="4" width="16" height="16" rx="3" stroke="#1D5FD6" strokeWidth="2" />
              <path d="M8 9h8M8 13h5" stroke="#1D5FD6" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
          {star && (
            <path
              d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"
              stroke="#1D5FD6"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          )}
          {clock && (
            <>
              <path d="M12 3a9 9 0 100 18 9 9 0 000-18z" stroke="#1D5FD6" strokeWidth="2" />
              <path d="M12 7v5l3 3" stroke="#1D5FD6" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}