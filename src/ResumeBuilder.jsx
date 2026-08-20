import React, { useState, useMemo } from "react";

const DEFAULT_ORDER = ["summary", "experience", "education", "skills"];
const emptyExperience = () => ({ id: crypto.randomUUID(), role: "", company: "", dates: "", bullets: "" });
const emptyEducation = () => ({ id: crypto.randomUUID(), school: "", degree: "", dates: "" });

/**
 * ResumeBuilder — form + live "paper" preview.
 * `template` (optional) comes from ResumeTemplates and sets section order + accent color.
 *
 * Download uses the browser's native print-to-PDF (no external PDF library needed,
 * so no extra npm install). If the project already has jsPDF/html2canvas elsewhere,
 * swap handleDownload() for that instead — happy to wire it up.
 */
export default function ResumeBuilder({ template }) {
  const order = template?.order || DEFAULT_ORDER;
  const accent = template?.accent || "#C08A3E";

  const [info, setInfo] = useState({ name: "", title: "", phone: "", email: "", location: "" });
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([emptyExperience()]);
  const [education, setEducation] = useState([emptyEducation()]);
  const [skills, setSkills] = useState("");

  const skillList = useMemo(
    () => skills.split(",").map((s) => s.trim()).filter(Boolean),
    [skills]
  );

  const updateExp = (id, field, value) =>
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  const updateEdu = (id, field, value) =>
    setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const handleDownload = () => {
    window.print();
  };

  return (
    <div>
      {template && (
        <p className="text-xs mb-4 px-3 py-2 rounded-lg inline-block" style={{ backgroundColor: "#fff", color: "#4A5568" }}>
          Using the <span className="font-medium">{template.name}</span> layout — sections are ordered for that kind of role.
        </p>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ---------- FORM ---------- */}
        <div className="space-y-5 print:hidden">
          <Section title="Your details">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Full name" value={info.name} onChange={(v) => setInfo({ ...info, name: v })} />
              <Input label="Job title" value={info.title} onChange={(v) => setInfo({ ...info, title: v })} />
              <Input label="Phone" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} />
              <Input label="Email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} />
              <Input label="Location" value={info.location} onChange={(v) => setInfo({ ...info, location: v })} className="col-span-2" />
            </div>
          </Section>

          <Section title="Summary">
            <Textarea
              value={summary}
              onChange={setSummary}
              placeholder="2–3 lines on your experience and what you're looking for."
              rows={3}
            />
          </Section>

          <Section title="Experience">
            {experience.map((exp, i) => (
              <div key={exp.id} className="mb-4 pb-4 border-b border-black/5 last:border-0 last:mb-0 last:pb-0">
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <Input label="Role" value={exp.role} onChange={(v) => updateExp(exp.id, "role", v)} />
                  <Input label="Company" value={exp.company} onChange={(v) => updateExp(exp.id, "company", v)} />
                  <Input label="Dates" value={exp.dates} onChange={(v) => updateExp(exp.id, "dates", v)} className="col-span-2" />
                </div>
                <Textarea
                  value={exp.bullets}
                  onChange={(v) => updateExp(exp.id, "bullets", v)}
                  placeholder="One line per bullet point"
                  rows={3}
                />
                {experience.length > 1 && (
                  <RemoveBtn onClick={() => setExperience((prev) => prev.filter((e) => e.id !== exp.id))} />
                )}
              </div>
            ))}
            <AddBtn label="Add another role" onClick={() => setExperience((prev) => [...prev, emptyExperience()])} />
          </Section>

          <Section title="Education">
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 pb-3 border-b border-black/5 last:border-0 last:mb-0 last:pb-0">
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Degree / Course" value={edu.degree} onChange={(v) => updateEdu(edu.id, "degree", v)} />
                  <Input label="Institution" value={edu.school} onChange={(v) => updateEdu(edu.id, "school", v)} />
                  <Input label="Dates" value={edu.dates} onChange={(v) => updateEdu(edu.id, "dates", v)} className="col-span-2" />
                </div>
                {education.length > 1 && (
                  <RemoveBtn onClick={() => setEducation((prev) => prev.filter((e) => e.id !== edu.id))} />
                )}
              </div>
            ))}
            <AddBtn label="Add another qualification" onClick={() => setEducation((prev) => [...prev, emptyEducation()])} />
          </Section>

          <Section title="Skills">
            <Input
              label="Comma-separated (e.g. CNC operation, Quality control, Team supervision)"
              value={skills}
              onChange={setSkills}
            />
          </Section>

          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-lg font-medium text-sm"
            style={{ backgroundColor: "#1B2430", color: "#fff" }}
          >
            Download as PDF
          </button>
        </div>

        {/* ---------- LIVE PREVIEW ---------- */}
        <div className="lg:sticky lg:top-6 self-start">
          <div
            id="resume-preview"
            className="bg-white shadow-lg mx-auto"
            style={{
              fontFamily: "Georgia, 'Source Serif Pro', serif",
              width: "100%",
              maxWidth: "620px",
              minHeight: "800px",
              padding: "48px 44px",
              color: "#1B2430",
            }}
          >
            <h1 style={{ fontSize: "26px", marginBottom: "2px" }}>{info.name || "Your Name"}</h1>
            <p style={{ fontSize: "14px", color: accent, marginBottom: "10px" }}>{info.title || "Job Title"}</p>
            <p style={{ fontSize: "11px", color: "#4A5568", marginBottom: "22px" }}>
              {[info.phone, info.email, info.location].filter(Boolean).join("  ·  ")}
            </p>

            {order.map((section) => (
              <PreviewSection key={section} section={section} accent={accent}
                summary={summary} experience={experience} education={education} skillList={skillList} />
            ))}
          </div>
        </div>
      </div>

      {/* Print styles: only the paper preview prints, at full page size */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: absolute; top: 0; left: 0; width: 100%; box-shadow: none; }
        }
      `}</style>
    </div>
  );
}

function PreviewSection({ section, accent, summary, experience, education, skillList }) {
  const heading = { summary: "Summary", experience: "Experience", education: "Education", skills: "Skills" }[section];
  const hasContent =
    (section === "summary" && summary) ||
    (section === "experience" && experience.some((e) => e.role || e.company)) ||
    (section === "education" && education.some((e) => e.degree || e.school)) ||
    (section === "skills" && skillList.length > 0);

  if (!hasContent) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: "4px", marginBottom: "10px" }}>
        {heading}
      </h2>

      {section === "summary" && <p style={{ fontSize: "13px", lineHeight: 1.6 }}>{summary}</p>}

      {section === "experience" &&
        experience.filter((e) => e.role || e.company).map((e) => (
          <div key={e.id} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "bold" }}>
              <span>{e.role}{e.company ? ` — ${e.company}` : ""}</span>
              <span style={{ fontWeight: "normal", color: "#4A5568" }}>{e.dates}</span>
            </div>
            {e.bullets && (
              <ul style={{ fontSize: "12.5px", lineHeight: 1.6, marginTop: "4px", paddingLeft: "18px" }}>
                {e.bullets.split("\n").filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </div>
        ))}

      {section === "education" &&
        education.filter((e) => e.degree || e.school).map((e) => (
          <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
            <span>{e.degree}{e.school ? `, ${e.school}` : ""}</span>
            <span style={{ color: "#4A5568" }}>{e.dates}</span>
          </div>
        ))}

      {section === "skills" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {skillList.map((s, i) => (
            <span key={i} style={{ fontSize: "11.5px", border: `1px solid ${accent}`, borderRadius: "3px", padding: "2px 8px" }}>
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- small form primitives ---------- */
function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-black/5 p-4">
      <h3 className="text-sm font-semibold mb-3" style={{ color: "#1B2430" }}>{title}</h3>
      {children}
    </div>
  );
}
function Input({ label, value, onChange, className = "" }) {
  return (
    <label className={`text-xs block ${className}`} style={{ color: "#4A5568" }}>
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full text-sm px-3 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2"
        style={{ "--tw-ring-color": "#C08A3E" }}
      />
    </label>
  );
}
function Textarea({ value, onChange, placeholder, rows }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full text-sm px-3 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2"
      style={{ "--tw-ring-color": "#C08A3E" }}
    />
  );
}
function AddBtn({ label, onClick }) {
  return (
    <button onClick={onClick} className="text-xs font-medium mt-1" style={{ color: "#C08A3E" }}>
      + {label}
    </button>
  );
}
function RemoveBtn({ onClick }) {
  return (
    <button onClick={onClick} className="text-xs mt-2" style={{ color: "#B45454" }}>
      Remove this entry
    </button>
  );
}