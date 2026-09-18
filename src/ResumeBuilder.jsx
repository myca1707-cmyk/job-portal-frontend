// ResumeBuilder.jsx
// CoreTech Talents resume builder - with machine-shop role suggestions.
// Needs only one other file in src/: MachiningSuggestions.jsx
// The 4 resume designs (Modern, Classic, Minimal, Executive) are built into this file.
// Styles are built in too (class prefixes "rbm-" and "rt-"), so no separate CSS file is needed.

import { useEffect, useMemo, useState } from "react";
import { MachiningTitleInput, MachiningSuggestionPanel } from "./MachiningSuggestions";

const STEPS = ["Personal", "Experience", "Education", "Skills", "Preview & Download"];
const DRAFT_KEY = "ctt_resume_draft_v2";

const EMPTY = {
  fullName: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  photo: "",
  summary: "",
  experience: [{ title: "", company: "", duration: "", description: "" }],
  education: [{ degree: "", institution: "", year: "" }],
  skills: [],
};

const CSS = `
.rbm { max-width: 980px; margin: 0 auto; padding: 24px 16px 60px; font-family: Inter, system-ui, sans-serif; color: #1f2937; }
.rbm h1 { font-family: "Plus Jakarta Sans", Inter, sans-serif; color: #0b2a5b; font-size: 26px; margin: 0 0 4px; }
.rbm-lead { color: #5b6b86; margin: 0 0 20px; font-size: 14.5px; }
.rbm-steps { display: flex; gap: 6px; margin-bottom: 22px; flex-wrap: wrap; }
.rbm-step { display: flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 999px; border: 1px solid #c9d7f2; background: #fff; color: #5b6b86; font-size: 13px; cursor: pointer; }
.rbm-step.active { background: #0b2a5b; border-color: #0b2a5b; color: #fff; }
.rbm-step.done { border-color: #1d4ed8; color: #1d4ed8; }
.rbm-dot { width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; background: #eef4ff; color: #0b2a5b; }
.rbm-step.active .rbm-dot { background: #fff; }
.rbm-card { background: #fff; border: 1px solid #dbe5f6; border-radius: 12px; padding: 20px; }
.rbm-card h2 { font-size: 18px; color: #0b2a5b; margin: 0 0 14px; }
.rbm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.rbm-full { grid-column: 1 / -1; }
.rbm label { display: block; font-size: 13px; font-weight: 600; color: #0b2a5b; margin-bottom: 5px; }
.rbm input, .rbm textarea, .rbm select { width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #c9d7f2; border-radius: 8px; font-size: 14.5px; font-family: inherit; background: #fff; color: #1f2937; }
.rbm input:focus, .rbm textarea:focus { outline: 2px solid #1d4ed8; outline-offset: 0; border-color: #1d4ed8; }
.rbm textarea { min-height: 96px; resize: vertical; }
.rbm-help { font-size: 12px; color: #5b6b86; margin-top: 4px; }
.rbm-block { border: 1px solid #e3ebf8; border-radius: 10px; padding: 14px; margin-bottom: 14px; background: #fbfdff; }
.rbm-block-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.rbm-block-head strong { color: #0b2a5b; font-size: 14px; }
.rbm-btn { border: none; border-radius: 8px; padding: 10px 18px; font-size: 14px; font-weight: 600; cursor: pointer; }
.rbm-btn.primary { background: #1d4ed8; color: #fff; }
.rbm-btn.primary:hover { background: #1740b0; }
.rbm-btn.ghost { background: #fff; color: #1d4ed8; border: 1px solid #1d4ed8; }
.rbm-btn.link { background: none; color: #b42318; padding: 4px 8px; font-weight: 500; }
.rbm-btn:focus-visible { outline: 2px solid #0b2a5b; outline-offset: 2px; }
.rbm-nav { display: flex; justify-content: space-between; margin-top: 18px; gap: 10px; }
.rbm-photo { display: flex; align-items: center; gap: 14px; }
.rbm-photo img { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 2px solid #c9d7f2; }
.rbm-photo-empty { width: 72px; height: 72px; border-radius: 50%; background: #eef4ff; display: flex; align-items: center; justify-content: center; color: #5b6b86; font-size: 12px; }
.rbm-skillrow { display: flex; gap: 8px; }
.rbm-skillrow input { flex: 1; }
.rbm-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.rbm-chip { background: #1d4ed8; color: #fff; border-radius: 999px; padding: 5px 6px 5px 12px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; }
.rbm-chip button { background: rgba(255,255,255,0.25); border: none; color: #fff; width: 20px; height: 20px; border-radius: 50%; cursor: pointer; font-size: 12px; line-height: 1; }
.rbm-error { color: #b42318; font-size: 13px; margin-top: 10px; }
.rbm-preview-wrap { overflow-x: auto; border: 1px solid #dbe5f6; border-radius: 10px; padding: 12px; background: #f5f8fe; margin-top: 14px; }
.rbm-modal-bg { position: fixed; inset: 0; background: rgba(11,42,91,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px; }
.rbm-modal { background: #fff; border-radius: 14px; padding: 24px; max-width: 420px; width: 100%; }
.rbm-modal h3 { margin: 0 0 8px; color: #0b2a5b; }
.rbm-modal p { color: #5b6b86; font-size: 14px; margin: 0 0 18px; }
.rbm-modal-actions { display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; }
@media (max-width: 640px) {
  .rbm-grid { grid-template-columns: 1fr; }
  .rbm-step span.rbm-label { display: none; }
}
@media print {
  body * { visibility: hidden !important; }
  .rbm-print-area, .rbm-print-area * { visibility: visible !important; }
  .rbm-print-area { position: absolute; left: 0; top: 0; width: 100%; }
  .rbm-preview-wrap { border: none !important; padding: 0 !important; background: #fff !important; overflow: visible !important; }
}
`;

// ---------- Resume designs ----------
const TEMPLATE_OPTIONS = [
  { id: "modern", name: "Modern", note: "Blue sidebar, photo" },
  { id: "classic", name: "Classic", note: "Simple, ATS-safe" },
  { id: "minimal", name: "Minimal", note: "Clean and light" },
  { id: "executive", name: "Executive", note: "Bold header" },
];

const RT_CSS = `
.rt-picker { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 6px; }
.rt-pick { border: 2px solid #dbe5f6; border-radius: 10px; padding: 10px; background: #fff; cursor: pointer; text-align: center; font-family: inherit; }
.rt-pick.active { border-color: #1d4ed8; background: #f2f7ff; }
.rt-pick strong { display: block; font-size: 13.5px; color: #0b2a5b; }
.rt-pick span { font-size: 11.5px; color: #5b6b86; }
.rt-thumb { height: 46px; border-radius: 5px; margin-bottom: 6px; border: 1px solid #dbe5f6; }
.rt-thumb.modern { background: linear-gradient(90deg, #0b2a5b 0 32%, #fff 32%); }
.rt-thumb.classic { background: repeating-linear-gradient(#fff 0 8px, #e5e7eb 8px 9px); }
.rt-thumb.minimal { background: linear-gradient(#fff 0 10px, #0f766e 10px 12px, #fff 12px); }
.rt-thumb.executive { background: linear-gradient(#1f2937 0 30%, #fff 30%); }
@media (max-width: 640px) { .rt-picker { grid-template-columns: 1fr 1fr; } }

.rt-page { width: 794px; min-height: 1060px; margin: 0 auto; background: #fff; color: #1f2937; box-shadow: 0 2px 10px rgba(11,42,91,0.10); font-size: 13px; line-height: 1.5; box-sizing: border-box; }
.rt-page h3 { font-size: 13px; letter-spacing: 0.04em; margin: 16px 0 6px; }
.rt-desc { white-space: pre-line; margin: 3px 0 0; }
.rt-item { margin-bottom: 10px; }
.rt-item-top { display: flex; justify-content: space-between; gap: 10px; font-weight: 600; }
.rt-item-sub { color: #4b5563; }

.rt-modern { display: grid; grid-template-columns: 250px 1fr; }
.rt-modern .rt-side { background: #0b2a5b; color: #fff; padding: 28px 20px; }
.rt-modern .rt-side img { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; display: block; margin: 0 auto 14px; border: 3px solid #fff; }
.rt-modern .rt-side h3 { color: #9cc2ff; border-bottom: 1px solid rgba(255,255,255,0.25); padding-bottom: 4px; }
.rt-modern .rt-side p { margin: 3px 0; word-break: break-word; }
.rt-modern .rt-side ul { margin: 0; padding-left: 16px; }
.rt-modern .rt-main { padding: 28px 26px; }
.rt-modern .rt-name { font-size: 26px; font-weight: 800; color: #0b2a5b; margin: 0; }
.rt-modern .rt-role { color: #1d4ed8; font-weight: 600; font-size: 15px; margin: 2px 0 0; }
.rt-modern .rt-main h3 { color: #0b2a5b; border-bottom: 2px solid #1d4ed8; padding-bottom: 3px; }

.rt-classic { padding: 40px 48px; font-family: Georgia, "Times New Roman", serif; }
.rt-classic .rt-name { font-size: 26px; text-align: center; margin: 0; }
.rt-classic .rt-role { text-align: center; margin: 2px 0; font-style: italic; }
.rt-classic .rt-contact { text-align: center; color: #374151; margin-bottom: 8px; }
.rt-classic h3 { border-bottom: 1px solid #111827; padding-bottom: 2px; }

.rt-minimal { padding: 40px 48px; font-family: Inter, system-ui, sans-serif; }
.rt-minimal .rt-name { font-size: 28px; font-weight: 300; margin: 0; }
.rt-minimal .rt-bar { width: 60px; height: 3px; background: #0f766e; margin: 8px 0; }
.rt-minimal .rt-role { color: #0f766e; margin: 0; font-weight: 600; }
.rt-minimal .rt-contact { color: #6b7280; margin: 4px 0 6px; }
.rt-minimal h3 { color: #0f766e; font-weight: 600; }

.rt-executive .rt-head { background: #1f2937; color: #fff; padding: 28px 40px; }
.rt-executive .rt-name { font-size: 28px; font-weight: 800; margin: 0; }
.rt-executive .rt-role { color: #fbbf24; margin: 2px 0 6px; font-weight: 600; }
.rt-executive .rt-contact { color: #d1d5db; }
.rt-executive .rt-body { padding: 18px 40px 36px; }
.rt-executive h3 { color: #1f2937; border-left: 4px solid #fbbf24; padding-left: 8px; }

.rt-skills-inline { margin: 0; }
@media print {
  .rt-page { box-shadow: none; width: 100%; }
  .rt-modern .rt-side, .rt-executive .rt-head { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

function TemplatePicker({ selected, onSelect }) {
  return (
    <div className="rt-picker">
      {TEMPLATE_OPTIONS.map((t) => (
        <button type="button" key={t.id} className={`rt-pick ${selected === t.id ? "active" : ""}`} onClick={() => onSelect(t.id)} aria-pressed={selected === t.id}>
          <div className={`rt-thumb ${t.id}`} />
          <strong>{t.name}</strong>
          <span>{t.note}</span>
        </button>
      ))}
    </div>
  );
}

const contactLine = (d) => [d.phone, d.email, d.location].filter(Boolean).join("  |  ");

function ExperienceList({ items }) {
  return items.map((e, i) => (
    <div className="rt-item" key={i}>
      <div className="rt-item-top"><span>{e.title}</span><span>{e.duration}</span></div>
      {e.company && <div className="rt-item-sub">{e.company}</div>}
      {e.description && <p className="rt-desc">{e.description}</p>}
    </div>
  ));
}

function EducationList({ items }) {
  return items.map((e, i) => (
    <div className="rt-item" key={i}>
      <div className="rt-item-top"><span>{e.degree}</span><span>{e.year}</span></div>
      {e.institution && <div className="rt-item-sub">{e.institution}</div>}
    </div>
  ));
}

function MainSections({ d, skillsInline }) {
  return (
    <>
      {d.summary && (<><h3>PROFILE</h3><p className="rt-desc">{d.summary}</p></>)}
      {d.experience.length > 0 && (<><h3>WORK EXPERIENCE</h3><ExperienceList items={d.experience} /></>)}
      {d.education.length > 0 && (<><h3>EDUCATION</h3><EducationList items={d.education} /></>)}
      {skillsInline && d.skills.length > 0 && (<><h3>SKILLS</h3><p className="rt-skills-inline">{d.skills.join(", ")}</p></>)}
    </>
  );
}

function ResumePreview({ templateId, data: d }) {
  if (templateId === "modern") {
    return (
      <div className="rt-page rt-modern">
        <aside className="rt-side">
          {d.photo && <img src={d.photo} alt="" />}
          <h3>CONTACT</h3>
          {d.phone && <p>{d.phone}</p>}
          {d.email && <p>{d.email}</p>}
          {d.location && <p>{d.location}</p>}
          {d.skills.length > 0 && (<><h3>SKILLS</h3><ul>{d.skills.map((s) => <li key={s}>{s}</li>)}</ul></>)}
        </aside>
        <main className="rt-main">
          <p className="rt-name">{d.fullName || "Your Name"}</p>
          {d.headline && <p className="rt-role">{d.headline}</p>}
          <MainSections d={d} />
        </main>
      </div>
    );
  }
  if (templateId === "executive") {
    return (
      <div className="rt-page rt-executive">
        <div className="rt-head">
          <p className="rt-name">{d.fullName || "Your Name"}</p>
          {d.headline && <p className="rt-role">{d.headline}</p>}
          <div className="rt-contact">{contactLine(d)}</div>
        </div>
        <div className="rt-body"><MainSections d={d} skillsInline /></div>
      </div>
    );
  }
  if (templateId === "minimal") {
    return (
      <div className="rt-page rt-minimal">
        <p className="rt-name">{d.fullName || "Your Name"}</p>
        <div className="rt-bar" />
        {d.headline && <p className="rt-role">{d.headline}</p>}
        <div className="rt-contact">{contactLine(d)}</div>
        <MainSections d={d} skillsInline />
      </div>
    );
  }
  return (
    <div className="rt-page rt-classic">
      <p className="rt-name">{d.fullName || "Your Name"}</p>
      {d.headline && <p className="rt-role">{d.headline}</p>}
      <div className="rt-contact">{contactLine(d)}</div>
      <MainSections d={d} skillsInline />
    </div>
  );
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return EMPTY;
    const d = JSON.parse(raw);
    return {
      ...EMPTY,
      ...d,
      experience: d.experience?.length ? d.experience : EMPTY.experience,
      education: d.education?.length ? d.education : EMPTY.education,
      skills: Array.isArray(d.skills) ? d.skills : [],
    };
  } catch {
    return EMPTY;
  }
}

export default function ResumeBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(loadDraft);
  const [template, setTemplate] = useState("modern");
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  // Save draft on this device so operators don't lose work if the page closes
  useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch { /* storage full or blocked */ }
  }, [data]);

  // ---------- update helpers ----------
  const setField = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const updateList = (listKey, index, key, value) =>
    setData((d) => ({ ...d, [listKey]: d[listKey].map((item, i) => (i === index ? { ...item, [key]: value } : item)) }));

  const addListItem = (listKey, blank) => setData((d) => ({ ...d, [listKey]: [...d[listKey], blank] }));

  const removeListItem = (listKey, index) =>
    setData((d) => ({ ...d, [listKey]: d[listKey].length > 1 ? d[listKey].filter((_, i) => i !== index) : d[listKey] }));

  const addSkill = (raw) => {
    const s = String(raw || "").trim();
    if (!s) return;
    setData((d) =>
      d.skills.some((x) => x.toLowerCase() === s.toLowerCase()) ? d : { ...d, skills: [...d.skills, s] }
    );
  };

  const removeSkill = (s) => setData((d) => ({ ...d, skills: d.skills.filter((x) => x !== s) }));

  const addBulletToExperience = (index, bullet) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e, i) => {
        if (i !== index) return e;
        const line = "• " + bullet;
        if ((e.description || "").includes(bullet)) return e;
        return { ...e, description: e.description ? e.description.trimEnd() + "\n" + line : line };
      }),
    }));

  const onPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError("Photo must be under 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => { setField("photo", reader.result); setError(""); };
    reader.readAsDataURL(file);
  };

  // Role used for machining suggestions on the Skills step
  const mainRole = data.headline || data.experience.find((x) => x.title)?.title || "";

  // Data passed to the resume templates
  const resumeData = useMemo(() => ({
    ...data,
    title: data.headline,
    designation: data.headline,
    experience: data.experience.filter((x) => x.title || x.company),
    education: data.education.filter((x) => x.degree || x.institution),
  }), [data]);

  // ---------- navigation ----------
  const validate = (s) => {
    if (s === 0) {
      if (!data.fullName.trim()) return "Enter your full name.";
      if (!data.phone.trim()) return "Enter your mobile number.";
      if (data.phone.replace(/\D/g, "").length < 10) return "Mobile number should have 10 digits.";
    }
    return "";
  };

  const goTo = (target) => {
    if (target > step) {
      const msg = validate(step);
      if (msg) { setError(msg); return; }
    }
    setError("");
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = () => {
    window.print();
    setTimeout(() => setShowSignup(true), 600);
  };

  const handleGoToLogin = () => {
    window.location.href = "/?login=candidate&mode=signup";
  };

  const startOver = () => {
    if (!window.confirm("Clear everything and start a new resume?")) return;
    setData(EMPTY);
    setStep(0);
  };

  // ---------- steps ----------
  const renderPersonal = () => (
    <div className="rbm-card">
      <h2>Personal details</h2>
      <div className="rbm-grid">
        <div className="rbm-full rbm-photo">
          {data.photo ? <img src={data.photo} alt="Your photo" /> : <div className="rbm-photo-empty">Photo</div>}
          <div>
            <label htmlFor="rbm-photo">Profile photo (optional)</label>
            <input id="rbm-photo" type="file" accept="image/*" onChange={onPhoto} />
            <div className="rbm-help">Shows on the Modern template only.</div>
            {data.photo && (
              <button type="button" className="rbm-btn link" onClick={() => setField("photo", "")}>Remove photo</button>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="rbm-name">Full name *</label>
          <input id="rbm-name" value={data.fullName} onChange={(e) => setField("fullName", e.target.value)} placeholder="e.g. Karthik R" />
        </div>
        <div>
          <label htmlFor="rbm-headline">Your job title</label>
          <MachiningTitleInput id="rbm-headline" value={data.headline} onChange={(e) => setField("headline", e.target.value)} />
          <div className="rbm-help">Type your machine or role, e.g. VMC, CNC turning, QC, welder.</div>
        </div>
        <div>
          <label htmlFor="rbm-phone">Mobile number *</label>
          <input id="rbm-phone" type="tel" inputMode="numeric" value={data.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="10-digit mobile number" />
        </div>
        <div>
          <label htmlFor="rbm-email">Email</label>
          <input id="rbm-email" type="email" value={data.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="rbm-full">
          <label htmlFor="rbm-location">Location</label>
          <input id="rbm-location" value={data.location} onChange={(e) => setField("location", e.target.value)} placeholder="e.g. Hosur, Tamil Nadu" />
        </div>
        <div className="rbm-full">
          <label htmlFor="rbm-summary">Profile summary</label>
          <textarea id="rbm-summary" value={data.summary} onChange={(e) => setField("summary", e.target.value)} placeholder="2–3 lines about your experience, machines and strengths." />
          <MachiningSuggestionPanel role={data.headline} onUseSummary={(t) => setField("summary", t)} />
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="rbm-card">
      <h2>Work experience</h2>
      <p className="rbm-help" style={{ marginTop: -8, marginBottom: 14 }}>
        Freshers can skip this step, or add apprenticeship / in-plant training here.
      </p>
      {data.experience.map((exp, i) => (
        <div className="rbm-block" key={i}>
          <div className="rbm-block-head">
            <strong>Job {i + 1}</strong>
            {data.experience.length > 1 && (
              <button type="button" className="rbm-btn link" onClick={() => removeListItem("experience", i)}>Remove</button>
            )}
          </div>
          <div className="rbm-grid">
            <div>
              <label htmlFor={`rbm-exp-title-${i}`}>Job title</label>
              <MachiningTitleInput id={`rbm-exp-title-${i}`} value={exp.title} onChange={(e) => updateList("experience", i, "title", e.target.value)} />
            </div>
            <div>
              <label htmlFor={`rbm-exp-company-${i}`}>Company</label>
              <input id={`rbm-exp-company-${i}`} value={exp.company} onChange={(e) => updateList("experience", i, "company", e.target.value)} placeholder="Company name" />
            </div>
            <div className="rbm-full">
              <label htmlFor={`rbm-exp-dur-${i}`}>Duration</label>
              <input id={`rbm-exp-dur-${i}`} value={exp.duration} onChange={(e) => updateList("experience", i, "duration", e.target.value)} placeholder="e.g. Jun 2021 – Present" />
            </div>
            <div className="rbm-full">
              <label htmlFor={`rbm-exp-desc-${i}`}>What you did in this job</label>
              <textarea id={`rbm-exp-desc-${i}`} value={exp.description} onChange={(e) => updateList("experience", i, "description", e.target.value)} placeholder="Machines, parts, tolerances, setting work, targets you met..." />
              <MachiningSuggestionPanel
                role={exp.title}
                existingSkills={data.skills}
                onAddBullet={(b) => addBulletToExperience(i, b)}
                onAddSkill={addSkill}
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="rbm-btn ghost" onClick={() => addListItem("experience", { title: "", company: "", duration: "", description: "" })}>
        + Add another job
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="rbm-card">
      <h2>Education</h2>
      {data.education.map((ed, i) => (
        <div className="rbm-block" key={i}>
          <div className="rbm-block-head">
            <strong>Qualification {i + 1}</strong>
            {data.education.length > 1 && (
              <button type="button" className="rbm-btn link" onClick={() => removeListItem("education", i)}>Remove</button>
            )}
          </div>
          <div className="rbm-grid">
            <div>
              <label htmlFor={`rbm-ed-deg-${i}`}>Course / trade</label>
              <input id={`rbm-ed-deg-${i}`} list="rbm-degrees" value={ed.degree} onChange={(e) => updateList("education", i, "degree", e.target.value)} placeholder="e.g. ITI Machinist, DME, B.E. Mechanical" />
            </div>
            <div>
              <label htmlFor={`rbm-ed-inst-${i}`}>Institute</label>
              <input id={`rbm-ed-inst-${i}`} value={ed.institution} onChange={(e) => updateList("education", i, "institution", e.target.value)} placeholder="Institute name" />
            </div>
            <div>
              <label htmlFor={`rbm-ed-year-${i}`}>Year of passing</label>
              <input id={`rbm-ed-year-${i}`} inputMode="numeric" value={ed.year} onChange={(e) => updateList("education", i, "year", e.target.value)} placeholder="e.g. 2020" />
            </div>
          </div>
        </div>
      ))}
      <datalist id="rbm-degrees">
        <option value="ITI – Machinist" />
        <option value="ITI – Turner" />
        <option value="ITI – Fitter" />
        <option value="ITI – Welder" />
        <option value="ITI – Electrician" />
        <option value="ITI – Tool & Die Maker" />
        <option value="Diploma in Mechanical Engineering (DME)" />
        <option value="Diploma in Tool & Die Making" />
        <option value="Diploma in Mechatronics" />
        <option value="B.E. Mechanical Engineering" />
        <option value="B.E. Production Engineering" />
        <option value="NAPS Apprenticeship" />
        <option value="12th (HSC)" />
        <option value="10th (SSLC)" />
      </datalist>
      <button type="button" className="rbm-btn ghost" onClick={() => addListItem("education", { degree: "", institution: "", year: "" })}>
        + Add another qualification
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="rbm-card">
      <h2>Skills, machines and controls</h2>
      <label htmlFor="rbm-skill">Add a skill</label>
      <div className="rbm-skillrow">
        <input
          id="rbm-skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); setSkillInput(""); } }}
          placeholder="e.g. Fanuc 0i-MF, tool offset setting"
        />
        <button type="button" className="rbm-btn primary" onClick={() => { addSkill(skillInput); setSkillInput(""); }}>Add</button>
      </div>

      {data.skills.length > 0 ? (
        <div className="rbm-chips">
          {data.skills.map((s) => (
            <span className="rbm-chip" key={s}>
              {s}
              <button type="button" aria-label={`Remove ${s}`} onClick={() => removeSkill(s)}>×</button>
            </span>
          ))}
        </div>
      ) : (
        <p className="rbm-help">No skills added yet. Tap suggestions below or type your own.</p>
      )}

      {mainRole ? (
        <MachiningSuggestionPanel role={mainRole} existingSkills={data.skills} onAddSkill={addSkill} />
      ) : (
        <p className="rbm-help" style={{ marginTop: 14 }}>Add your job title on the Personal step to see machine and skill suggestions.</p>
      )}

    </div>
  );

  const renderPreview = () => (
    <div className="rbm-card">
      <h2>Choose a design and download</h2>
      <TemplatePicker selected={template} onSelect={setTemplate} />
      <div className="rbm-preview-wrap rbm-print-area">
        <ResumePreview templateId={template} data={resumeData} />
      </div>
      <div className="rbm-nav" style={{ justifyContent: "flex-end" }}>
        <button type="button" className="rbm-btn primary" onClick={handleDownload}>Download PDF</button>
      </div>
      <p className="rbm-help" style={{ textAlign: "right" }}>In the print window, choose “Save as PDF”.</p>
    </div>
  );

  const views = [renderPersonal, renderExperience, renderEducation, renderSkills, renderPreview];

  return (
    <div className="rbm">
      <style>{CSS + RT_CSS}</style>
      <h1>Build your resume</h1>
      <p className="rbm-lead">Made for machine shop jobs. Your details save on this device as you type.</p>

      <div className="rbm-steps">
        {STEPS.map((label, i) => (
          <button
            type="button"
            key={label}
            className={`rbm-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
            onClick={() => goTo(i)}
            aria-current={i === step ? "step" : undefined}
          >
            <span className="rbm-dot">{i < step ? "✓" : i + 1}</span>
            <span className="rbm-label">{label}</span>
          </button>
        ))}
      </div>

      {views[step]()}

      {error && <div className="rbm-error" role="alert">{error}</div>}

      <div className="rbm-nav">
        <div>
          {step > 0 && <button type="button" className="rbm-btn ghost" onClick={() => goTo(step - 1)}>Back</button>}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" className="rbm-btn link" onClick={startOver}>Start over</button>
          {step < STEPS.length - 1 && (
            <button type="button" className="rbm-btn primary" onClick={() => goTo(step + 1)}>Next</button>
          )}
        </div>
      </div>

      {showSignup && (
        <div className="rbm-modal-bg" role="dialog" aria-modal="true" aria-labelledby="rbm-signup-title">
          <div className="rbm-modal">
            <h3 id="rbm-signup-title">Resume ready. Get noticed by machine shops.</h3>
            <p>Create a free CoreTech Talents account to apply for jobs and let recruiters find your profile.</p>
            <div className="rbm-modal-actions">
              <button type="button" className="rbm-btn ghost" onClick={() => setShowSignup(false)}>Not now</button>
              <button type="button" className="rbm-btn primary" onClick={handleGoToLogin}>Create account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ResumeBuilder };