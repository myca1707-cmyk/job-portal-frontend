import { useState } from "react";
import "./ResumeBuilder.css";

const TEMPLATES = ["Modern", "Classic", "Minimal", "Technical"];

export default function ResumeBuilder({ template: initialTemplate }) {
  const [template, setTemplate] = useState(initialTemplate || "Modern");
  const [personal, setPersonal] = useState({ name: "", title: "", email: "", phone: "" });
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [expDraft, setExpDraft] = useState({ role: "", company: "", period: "" });
  const [showExpForm, setShowExpForm] = useState(false);

  function handlePersonalChange(field, value) {
    setPersonal((prev) => ({ ...prev, [field]: value }));
  }

  function handleAddExperience() {
    if (!expDraft.role || !expDraft.company) return;
    setExperience((prev) => [...prev, expDraft]);
    setExpDraft({ role: "", company: "", period: "" });
    setShowExpForm(false);
  }

  function handleRemoveExperience(index) {
    setExperience((prev) => prev.filter((_, i) => i !== index));
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

  function handleSaveDraft() {
    const draft = { template, personal, experience, skills };
    localStorage.setItem("resume_draft", JSON.stringify(draft));
    alert("Draft saved.");
  }

  function handleDownloadPdf() {
    window.print();
  }

  return (
    <div className="resume-builder">
      <div className="rb-topbar">
        <div className="rb-brand">
          <div className="rb-brand-dot" />
          <span>Coretech Talents — Resume Builder</span>
        </div>
        <div className="rb-topbar-links">
          <span className="active">Templates</span>
          <span>My Resume</span>
          <span>Download</span>
        </div>
      </div>

      <div className="rb-template-pills">
        {TEMPLATES.map((t) => (
          <button
            key={t}
            className={`rb-pill ${template === t ? "active" : ""}`}
            onClick={() => setTemplate(t)}
            type="button"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rb-grid">
        <div className="rb-form-card">
          <p className="rb-section-title">Personal details</p>
          <div className="rb-field-col">
            <input
              placeholder="Full name"
              value={personal.name}
              onChange={(e) => handlePersonalChange("name", e.target.value)}
            />
            <input
              placeholder="Job title / headline"
              value={personal.title}
              onChange={(e) => handlePersonalChange("title", e.target.value)}
            />
            <div className="rb-row">
              <input
                placeholder="Email"
                value={personal.email}
                onChange={(e) => handlePersonalChange("email", e.target.value)}
              />
              <input
                placeholder="Phone"
                value={personal.phone}
                onChange={(e) => handlePersonalChange("phone", e.target.value)}
              />
            </div>
          </div>

          <p className="rb-section-title">Experience</p>
          {experience.map((exp, i) => (
            <div className="rb-exp-item" key={i}>
              <div>
                <p className="rb-exp-role">{exp.role}</p>
                <p className="rb-exp-meta">{exp.company}{exp.period && ` · ${exp.period}`}</p>
              </div>
              <button type="button" className="rb-remove-btn" onClick={() => handleRemoveExperience(i)}>✕</button>
            </div>
          ))}

          {showExpForm ? (
            <div className="rb-exp-form">
              <input
                placeholder="Role"
                value={expDraft.role}
                onChange={(e) => setExpDraft((p) => ({ ...p, role: e.target.value }))}
              />
              <input
                placeholder="Company"
                value={expDraft.company}
                onChange={(e) => setExpDraft((p) => ({ ...p, company: e.target.value }))}
              />
              <input
                placeholder="Period (e.g. 2023–present)"
                value={expDraft.period}
                onChange={(e) => setExpDraft((p) => ({ ...p, period: e.target.value }))}
              />
              <div className="rb-row">
                <button type="button" className="rb-btn-primary" onClick={handleAddExperience}>Add</button>
                <button type="button" onClick={() => setShowExpForm(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button type="button" className="rb-add-link" onClick={() => setShowExpForm(true)}>
              + Add experience
            </button>
          )}

          <p className="rb-section-title">Skills</p>
          <div className="rb-skills-row">
            {skills.map((skill) => (
              <span className="rb-skill-tag" key={skill}>
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(skill)}>✕</button>
              </span>
            ))}
            <input
              className="rb-skill-input"
              placeholder="Add skill, press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
            />
          </div>
        </div>

        <div className="rb-preview-wrap">
          <div className={`rb-preview-paper rb-template-${template.toLowerCase()}`}>
            <div className="rb-paper-header">
              <p className="rb-paper-name">{personal.name || "Your name"}</p>
              <p className="rb-paper-title">{personal.title || "Your job title"}</p>
            </div>
            <p className="rb-paper-contact">
              {personal.email || "email@example.com"}
              {personal.phone && ` · ${personal.phone}`}
            </p>

            {experience.length > 0 && (
              <div className="rb-paper-section">
                <p className="rb-paper-heading">Experience</p>
                {experience.map((exp, i) => (
                  <div key={i} className="rb-paper-exp">
                    <p className="rb-paper-exp-role">{exp.role}</p>
                    <p className="rb-paper-exp-meta">{exp.company}{exp.period && ` · ${exp.period}`}</p>
                  </div>
                ))}
              </div>
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
        </div>
      </div>

      <div className="rb-actions">
        <button type="button" onClick={handleSaveDraft}>Save draft</button>
        <button type="button" className="rb-btn-primary" onClick={handleDownloadPdf}>
          Download PDF
        </button>
      </div>
    </div>
  );
}