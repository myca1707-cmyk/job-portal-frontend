import { useState } from "react";
import "./ResumeBuilder.css";

const STEPS = ["Personal", "Experience", "Education", "Skills", "Preview & Download"];

export default function ResumeBuilder() {
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState({
    name: "", title: "", email: "", phone: "", location: "", summary: "", photo: null,
  });
  const [experience, setExperience] = useState([]);
  const [expDraft, setExpDraft] = useState({ role: "", company: "", period: "", summary: "" });
  const [education, setEducation] = useState([]);
  const [eduDraft, setEduDraft] = useState({ degree: "", school: "", year: "" });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  function handlePersonalChange(field, value) {
    setPersonal((prev) => ({ ...prev, [field]: value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPersonal((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleRemovePhoto() {
    setPersonal((prev) => ({ ...prev, photo: null }));
  }

  function handleAddExperience() {
    if (!expDraft.role || !expDraft.company) return;
    setExperience((prev) => [...prev, expDraft]);
    setExpDraft({ role: "", company: "", period: "", summary: "" });
  }

  function handleRemoveExperience(i) {
    setExperience((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleAddEducation() {
    if (!eduDraft.degree || !eduDraft.school) return;
    setEducation((prev) => [...prev, eduDraft]);
    setEduDraft({ degree: "", school: "", year: "" });
  }

  function handleRemoveEducation(i) {
    setEducation((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleAddSkill() {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
  }

  function handleSkillKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  }

  function handleRemoveSkill(skill) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  function canGoNext() {
    if (step === 0) return personal.name.trim() && personal.email.trim();
    return true;
  }

  function goNext() {
    if (!canGoNext()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleDownload() {
    window.print();
  }

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="rb-wrap">
      <div className="rb-noprint">
        <div className="rb-progress">
          {STEPS.map((label, i) => (
            <div key={label} className={`rb-progress-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
              <div className="rb-progress-dot">{i < step ? "✓" : i + 1}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="rb-content">
          <div className="rb-form-panel card">
            {step === 0 && (
              <>
                <h3>Personal details</h3>
                <p className="hint" style={{ marginBottom: "1rem" }}>Let's start with the basics.</p>

                <div className="field">
                  <label>Photo (optional)</label>
                  <div className="rb-photo-upload">
                    {personal.photo ? (
                      <div className="rb-photo-preview-row">
                        <img src={personal.photo} alt="" className="rb-photo-thumb" />
                        <button type="button" className="btn-link" onClick={handleRemovePhoto}>Remove photo</button>
                      </div>
                    ) : (
                      <input type="file" accept="image/*" onChange={handlePhotoChange} />
                    )}
                  </div>
                </div>

                <div className="field">
                  <label>Full name</label>
                  <input value={personal.name} onChange={(e) => handlePersonalChange("name", e.target.value)} required />
                </div>
                <div className="field">
                  <label>Job title / headline</label>
                  <input value={personal.title} onChange={(e) => handlePersonalChange("title", e.target.value)} placeholder="e.g. Mechanical Engineer" />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" value={personal.email} onChange={(e) => handlePersonalChange("email", e.target.value)} required />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input value={personal.phone} onChange={(e) => handlePersonalChange("phone", e.target.value)} />
                </div>
                <div className="field">
                  <label>Location</label>
                  <input value={personal.location} onChange={(e) => handlePersonalChange("location", e.target.value)} placeholder="City, State" />
                </div>
                <div className="field">
                  <label>Profile summary</label>
                  <textarea
                    rows={3}
                    value={personal.summary}
                    onChange={(e) => handlePersonalChange("summary", e.target.value)}
                    placeholder="A short summary of your experience and strengths"
                  />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h3>Work experience</h3>
                <p className="hint" style={{ marginBottom: "1rem" }}>Add roles you've held, most recent first.</p>

                {experience.map((exp, i) => (
                  <div className="rb-list-item" key={i}>
                    <div>
                      <p className="rb-list-title">{exp.role}</p>
                      <p className="hint">{exp.company}{exp.period && ` · ${exp.period}`}</p>
                      {exp.summary && <p className="hint" style={{ marginTop: "4px" }}>{exp.summary}</p>}
                    </div>
                    <button type="button" className="btn-link" onClick={() => handleRemoveExperience(i)}>Remove</button>
                  </div>
                ))}

                <div className="field">
                  <label>Role</label>
                  <input value={expDraft.role} onChange={(e) => setExpDraft((p) => ({ ...p, role: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Company</label>
                  <input value={expDraft.company} onChange={(e) => setExpDraft((p) => ({ ...p, company: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Period</label>
                  <input value={expDraft.period} onChange={(e) => setExpDraft((p) => ({ ...p, period: e.target.value }))} placeholder="e.g. 2022 - Present" />
                </div>
                <div className="field">
                  <label>Summary (optional)</label>
                  <textarea
                    rows={2}
                    value={expDraft.summary}
                    onChange={(e) => setExpDraft((p) => ({ ...p, summary: e.target.value }))}
                    placeholder="Briefly describe your responsibilities or achievements in this role"
                  />
                </div>
                <button type="button" onClick={handleAddExperience}>+ Add experience</button>
              </>
            )}

            {step === 2 && (
              <>
                <h3>Education</h3>
                <p className="hint" style={{ marginBottom: "1rem" }}>Add your degrees or certifications.</p>

                {education.map((edu, i) => (
                  <div className="rb-list-item" key={i}>
                    <div>
                      <p className="rb-list-title">{edu.degree}</p>
                      <p className="hint">{edu.school}{edu.year && ` · ${edu.year}`}</p>
                    </div>
                    <button type="button" className="btn-link" onClick={() => handleRemoveEducation(i)}>Remove</button>
                  </div>
                ))}

                <div className="field">
                  <label>Degree / course</label>
                  <input value={eduDraft.degree} onChange={(e) => setEduDraft((p) => ({ ...p, degree: e.target.value }))} placeholder="e.g. B.E Mechanical" />
                </div>
                <div className="field">
                  <label>Institution</label>
                  <input value={eduDraft.school} onChange={(e) => setEduDraft((p) => ({ ...p, school: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Year</label>
                  <input value={eduDraft.year} onChange={(e) => setEduDraft((p) => ({ ...p, year: e.target.value }))} placeholder="e.g. 2023" />
                </div>
                <button type="button" onClick={handleAddEducation}>+ Add education</button>
              </>
            )}

            {step === 3 && (
              <>
                <h3>Skills</h3>
                <p className="hint" style={{ marginBottom: "1rem" }}>Type a skill and press Enter to add it.</p>
                <div className="field">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. AutoCAD, Python, Communication"
                  />
                </div>
                <div className="tags">
                  {skills.map((s) => (
                    <span className="tag" key={s}>
                      {s} <button type="button" className="rb-tag-remove" onClick={() => handleRemoveSkill(s)}>✕</button>
                    </span>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3>Ready to download</h3>
                <p className="hint" style={{ marginBottom: "1rem" }}>
                  Review your resume in the preview, then download it as a PDF. Only the resume itself will be printed.
                </p>
                <button type="button" className="btn-primary" onClick={handleDownload}>
                  Download Resume (PDF)
                </button>
              </>
            )}

            <div className="rb-nav-buttons">
              {step > 0 && <button type="button" onClick={goBack}>← Back</button>}
              {!isLastStep && (
                <button type="button" className="btn-primary" onClick={goNext} disabled={!canGoNext()}>
                  Next →
                </button>
              )}
            </div>
          </div>

          <div className="rb-preview-panel">
            <ResumePreview personal={personal} experience={experience} education={education} skills={skills} />
          </div>
        </div>
      </div>

      <div className="rb-print-only">
        <ResumePreview personal={personal} experience={experience} education={education} skills={skills} />
      </div>
    </div>
  );
}

function ResumePreview({ personal, experience, education, skills }) {
  return (
    <div className="rb-paper">
      {personal.photo && (
        <div className="rb-paper-photo-wrap">
          <img src={personal.photo} alt="" className="rb-paper-photo" />
        </div>
      )}

      <p className="rb-paper-name">{personal.name || "Your name"}</p>
      <p className="rb-paper-title">{personal.title || "Your job title"}</p>
      <p className="rb-paper-contact">
        {[personal.email, personal.phone, personal.location].filter(Boolean).join(" · ") || "email · phone · location"}
      </p>

      {personal.summary && (
        <div className="rb-paper-section">
          <p className="rb-paper-heading">Profile summary</p>
          <p className="rb-paper-summary">{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <>
          <div className="rb-paper-section">
            <p className="rb-paper-heading">Experience</p>
            {experience.map((exp, i) => (
              <div key={i} className="rb-paper-entry">
                <p className="rb-paper-entry-title">{exp.role}</p>
                <p className="rb-paper-entry-meta">{exp.company}{exp.period && ` · ${exp.period}`}</p>
                {exp.summary && <p className="rb-paper-entry-summary">{exp.summary}</p>}
              </div>
            ))}
          </div>
          <hr className="rb-divider" />
        </>
      )}

      {education.length > 0 && (
        <>
          <div className="rb-paper-section">
            <p className="rb-paper-heading">Education</p>
            {education.map((edu, i) => (
              <div key={i} className="rb-paper-entry">
                <p className="rb-paper-entry-title">{edu.degree}</p>
                <p className="rb-paper-entry-meta">{edu.school}{edu.year && ` · ${edu.year}`}</p>
              </div>
            ))}
          </div>
          <hr className="rb-divider" />
        </>
      )}

      {skills.length > 0 && (
        <div className="rb-paper-section">
          <p className="rb-paper-heading">Skills</p>
          <div className="rb-paper-skills">
            {skills.map((s) => (
              <span key={s} className="rb-paper-skill">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}