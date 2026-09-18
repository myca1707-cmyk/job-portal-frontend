// MachiningSuggestions.jsx
// Machine-shop resume suggestions for the CoreTech Talents resume builder.
// Two drop-in pieces:
//   <MachiningTitleInput />      -> replaces the job title / designation <input>
//   <MachiningSuggestionPanel /> -> shows machines, controls, skills, bullet points and summary for that role
// Plain inline styles (no Tailwind), blue-and-white theme.

import { useMemo, useState } from "react";

// ---------- Shared lists ----------
const INSTRUMENTS = [
  "Vernier caliper", "Outside micrometer", "Bore gauge", "Height gauge",
  "Dial indicator", "Plug & ring gauges", "Thread gauges", "Slip gauges",
];
const SHOPFLOOR = [
  "5S", "Kaizen", "Poka-yoke", "TPM", "Safety practices (PPE)",
  "Daily production reporting", "Reading engineering drawings",
];

// ---------- Role families ----------
// keys: what the candidate might type (lowercase, spaces removed when matching)
export const MACHINING_FAMILIES = [
  {
    id: "vmc",
    label: "VMC (Vertical Machining Centre)",
    keys: ["vmc", "verticalmachining", "machiningcentre", "machiningcenter", "robodrill", "robo", "speedio", "drilltap", "cncmilling"],
    titles: ["VMC Operator", "VMC Setter", "VMC Setter cum Operator", "Senior VMC Setter", "VMC Programmer", "VMC Line Leader"],
    machines: ["Mazak VCN / VTC", "Fanuc Robodrill", "Haas VF series", "DMG Mori", "Makino", "Brother Speedio", "Ace Micromatic (AMS) MCV", "BFW", "Jyoti CNC", "LMW JV series", "Hurco"],
    controls: ["Fanuc 0i-MF", "Siemens 828D / 840D", "Mazatrol", "Heidenhain", "Mitsubishi", "Haas control"],
    skills: ["VMC setting", "VMC operating", "Tool offset setting", "Work offset (G54–G59) setting", "Fixture & job setting", "First-piece approval", "CNC program editing (G & M codes)", "Tool life management", "4th axis operation", "Drilling, tapping & boring", "Cycle time reduction"],
    bullets: [
      "Set and operated VMC machines to produce precision components as per drawing and tolerance",
      "Performed tool offset, work offset and fixture setting for new job changeovers",
      "Carried out first-piece and in-process inspection using vernier, micrometer and bore gauge",
      "Edited CNC programs at the machine to correct dimensions and reduce cycle time",
      "Maintained tool life records, production reports and machine checklists every shift",
    ],
    summary: "VMC Setter cum Operator with hands-on experience in setting and operating vertical machining centres on Fanuc and Siemens controls. Skilled in tool and work offset setting, fixture setting, program editing and first-piece inspection, with a focus on quality, safety and on-time production.",
  },
  {
    id: "hmc",
    label: "HMC (Horizontal Machining Centre)",
    keys: ["hmc", "horizontalmachining", "pallet", "tombstone"],
    titles: ["HMC Operator", "HMC Setter", "HMC Setter cum Operator", "HMC Programmer"],
    machines: ["Makino a51 / a61", "Mazak HCN series", "Okuma MB series", "DMG Mori NHX", "Doosan / DN Solutions HMC", "Toyoda", "BFW HMC"],
    controls: ["Fanuc", "Siemens 840D", "Mazatrol", "Okuma OSP"],
    skills: ["HMC setting", "HMC operating", "Pallet changer operation", "Rotary table (B-axis) setting", "Tombstone fixture setting", "Tool offset setting", "Work offset setting", "Program editing", "Tool life management"],
    bullets: [
      "Set and operated HMC machines with twin pallet changer for high-volume production",
      "Loaded and aligned components on tombstone fixtures and rotary tables",
      "Checked critical dimensions and position tolerances during in-process inspection",
      "Reduced setup time by preparing tools and fixtures before job changeover",
    ],
    summary: "HMC Setter cum Operator experienced in multi-face machining with pallet changers, rotary tables and tombstone fixtures. Strong in offsets, program editing and in-process inspection for high-volume precision parts.",
  },
  {
    id: "turning",
    label: "CNC Turning / Lathe",
    keys: ["cncturning", "turning", "turner", "cnclathe", "lathe", "vtl", "verticalturret", "swiss", "slidinghead", "tsugami", "citizen", "puma", "jobber", "turnmill"],
    titles: ["CNC Turning Operator", "CNC Turning Setter", "CNC Setter cum Operator (Turning)", "VTL Operator", "Sliding Head (Swiss) Operator", "CNC Turning Programmer"],
    machines: ["Ace Jobber / LT series", "LMW LL series", "Mazak Quick Turn (QT)", "Doosan / DN Solutions Puma", "Haas ST series", "Hyundai Wia", "Okuma LB series", "Tsugami (sliding head)", "Citizen (sliding head)", "Star (Swiss)"],
    controls: ["Fanuc 0i-TF", "Siemens 828D", "Mazatrol", "Okuma OSP", "Mitsubishi"],
    skills: ["CNC turning setting", "CNC turning operating", "Soft jaw boring", "Tool nose radius compensation", "Canned cycles (G71, G76)", "Threading", "Bar feeder operation", "Tailstock setting", "Tool offset setting", "Program editing"],
    bullets: [
      "Set and operated CNC turning centres for shafts, flanges and bushes as per drawing",
      "Bored soft jaws and set chuck, tailstock and bar feeder for new components",
      "Adjusted tool wear offsets to hold OD, ID and thread dimensions within tolerance",
      "Inspected parts using micrometer, bore gauge and thread gauges before release",
    ],
    summary: "CNC Turning Setter cum Operator with experience on Fanuc and Siemens controlled lathes. Skilled in soft jaw boring, offset setting, threading and program editing, delivering accurate parts with minimum rejection.",
  },
  {
    id: "fiveaxis",
    label: "5-Axis / Mill-Turn",
    keys: ["5axis", "fiveaxis", "integrex", "millturn", "multitasking", "dmu"],
    titles: ["5-Axis Machinist", "5-Axis Setter cum Operator", "Mill-Turn Operator", "5-Axis CNC Programmer"],
    machines: ["Mazak Integrex", "Mazak Variaxis", "DMG Mori DMU / NT", "Hermle", "Okuma Multus", "Haas UMC"],
    controls: ["Mazatrol SmoothX", "Siemens 840D", "Heidenhain TNC", "Fanuc 31i"],
    skills: ["5-axis setting", "3+2 machining", "Simultaneous 5-axis", "Probing (Renishaw)", "Work coordinate setting", "Complex fixture setting"],
    bullets: [
      "Set and operated 5-axis machines for complex aerospace and die components",
      "Used Renishaw probing for work coordinate setting and in-process checks",
      "Proved out new programs safely with dry runs and single-block operation",
    ],
    summary: "5-Axis Machinist experienced in 3+2 and simultaneous machining on Mazak and DMG Mori machines, with strong skills in probing, setting and proving out new programs.",
  },
  {
    id: "programmer",
    label: "CNC / CAM Programmer",
    keys: ["programmer", "programming", "cam", "mastercam", "nx", "powermill", "hypermill", "fusion", "gcode", "solidcam", "esprit"],
    titles: ["CNC Programmer", "CAM Programmer", "VMC Programmer", "CNC Turning Programmer", "Process Engineer (Machining)"],
    machines: ["VMC", "HMC", "CNC turning centre", "5-axis machine"],
    controls: ["Fanuc", "Siemens", "Mazatrol", "Heidenhain"],
    skills: ["G & M code programming", "Mastercam", "Siemens NX CAM", "Autodesk PowerMill", "Fusion 360", "hyperMILL", "SolidCAM", "Post processor setup", "Cutting tool selection", "Speeds & feeds calculation", "Cycle time optimisation", "Process sheet preparation"],
    bullets: [
      "Prepared CNC programs and setup sheets for new components from 2D drawings and 3D models",
      "Selected cutting tools, speeds and feeds to improve tool life and reduce cycle time",
      "Proved out programs on the machine with setters and resolved first-piece issues",
      "Prepared process sheets and fixture concepts for new product development",
    ],
    summary: "CNC Programmer skilled in Mastercam and NX CAM, with strong knowledge of G & M codes, tooling and process planning. Experienced in proving out programs and reducing cycle times on VMC, HMC and turning centres.",
  },
  {
    id: "conventional",
    label: "Conventional Machinist",
    keys: ["conventional", "manuallathe", "milling", "miller", "machinist", "drilling", "radialdrill", "shaper", "slotting"],
    titles: ["Conventional Lathe Operator", "Milling Machine Operator", "Machinist", "Radial Drill Operator", "Turner"],
    machines: ["HMT lathe", "Conventional milling machine", "Radial drilling machine", "Slotting machine", "Shaping machine"],
    controls: [],
    skills: ["Turning, facing & threading", "Milling & slotting", "Drilling & reaming", "Job setting & centering", "Tool grinding", "Reading engineering drawings"],
    bullets: [
      "Operated conventional lathe and milling machines for job-work and rework components",
      "Set jobs using dial indicator and produced parts within drawing tolerance",
      "Ground single-point cutting tools and maintained machine cleanliness",
    ],
    summary: "Machinist with hands-on experience on conventional lathe, milling and drilling machines. Good at job setting, tool grinding and producing accurate parts from drawings.",
  },
  {
    id: "grinding",
    label: "Grinding",
    keys: ["grind", "grinder", "grinding", "cylindrical", "surfacegrinding", "centerless", "centreless", "studer", "micromatic"],
    titles: ["Cylindrical Grinding Operator", "Surface Grinding Operator", "Centerless Grinding Operator", "CNC Grinding Setter", "Internal Grinding Operator"],
    machines: ["Micromatic Grinding", "Studer", "Jones & Shipman", "Okamoto", "HMT grinding machines"],
    controls: ["Fanuc", "Siemens"],
    skills: ["Wheel dressing", "Wheel balancing", "Cylindrical grinding", "Surface grinding", "Centerless grinding", "Surface finish control (Ra)", "Taper & ovality control"],
    bullets: [
      "Operated cylindrical and surface grinding machines to hold micron-level tolerances",
      "Dressed and balanced grinding wheels and controlled surface finish within Ra limits",
      "Checked size, taper and ovality using micrometer and air gauges",
    ],
    summary: "Grinding Operator experienced in cylindrical, surface and centerless grinding, with strong skills in wheel dressing and holding tight tolerances and surface finish.",
  },
  {
    id: "quality",
    label: "Quality / Inspection / CMM",
    keys: ["qc", "qa", "quality", "inspector", "inspection", "cmm", "calypso", "pcdmis", "metrology", "ppap"],
    titles: ["QC Inspector", "Quality Inspector (Machining)", "CMM Operator", "CMM Programmer", "Final Inspector", "Quality Engineer"],
    machines: ["Zeiss CMM (Calypso)", "Hexagon CMM (PC-DMIS)", "Mitutoyo CMM", "Profile projector", "Surface roughness tester", "Contour tracer"],
    controls: [],
    skills: ["GD&T", "First article inspection (FAI)", "PPAP documents", "SPC", "MSA", "Control plan", "7 QC tools", "Root cause analysis", "Inspection report preparation", "Calibration records"],
    bullets: [
      "Inspected machined components as per drawing and control plan using CMM and hand instruments",
      "Prepared first article, in-process and final inspection reports",
      "Supported root cause analysis and corrective actions for customer complaints",
      "Maintained calibration records for gauges and instruments",
    ],
    summary: "Quality Inspector with experience in machined-component inspection using CMM and precision instruments. Good knowledge of GD&T, PPAP, SPC and inspection reporting.",
  },
  {
    id: "toolroom",
    label: "Tool Room / EDM",
    keys: ["toolroom", "toolmaker", "edm", "wirecut", "wireedm", "sparkerosion", "electronica", "sodick", "diemaker", "jig"],
    titles: ["Tool Room Machinist", "Toolmaker", "Wire Cut EDM Operator", "Spark EDM Operator", "Fixture Maker"],
    machines: ["Electronica wire cut", "Sodick", "Mitsubishi EDM", "Makino EDM", "Jig grinder"],
    controls: [],
    skills: ["Wire cut EDM", "Spark / sinker EDM", "Fixture manufacturing", "Die & mould maintenance", "Jig grinding", "Fitting & assembly"],
    bullets: [
      "Manufactured fixtures, gauges and press tool parts in the tool room",
      "Operated wire cut and spark EDM machines for dies and precision profiles",
      "Maintained and repaired production fixtures to reduce breakdowns",
    ],
    summary: "Tool Room Machinist experienced in wire cut EDM, spark EDM and fixture manufacturing, supporting production with accurate tools and quick repairs.",
  },
  {
    id: "maintenance",
    label: "CNC Maintenance",
    keys: ["maintenance", "breakdown", "technician", "electrician", "electrical", "mechanical", "hydraulic", "pneumatic", "plc", "alarm"],
    titles: ["CNC Maintenance Technician (Mechanical)", "CNC Maintenance Technician (Electrical)", "Maintenance Fitter", "Maintenance Engineer", "Machine Electrician"],
    machines: ["VMC", "HMC", "CNC turning centre", "Compressors & hydraulic power packs"],
    controls: ["Fanuc alarms & diagnostics", "Siemens diagnostics", "PLC (Mitsubishi / Siemens)"],
    skills: ["Breakdown maintenance", "Preventive maintenance", "Fanuc alarm troubleshooting", "Hydraulics & pneumatics", "Spindle & ball screw maintenance", "ATC troubleshooting", "PLC ladder basics", "TPM", "MTTR / MTBF tracking"],
    bullets: [
      "Attended breakdowns on VMC, HMC and CNC lathes and restored machines quickly",
      "Carried out preventive maintenance as per checklist to reduce downtime",
      "Diagnosed Fanuc alarms, ATC, hydraulic and pneumatic faults",
      "Maintained breakdown records and tracked MTTR and MTBF",
    ],
    summary: "CNC Maintenance Technician experienced in breakdown and preventive maintenance of machining centres and lathes, with good skills in Fanuc alarm diagnosis, hydraulics and pneumatics.",
  },
  {
    id: "fabrication",
    label: "Welding / Fabrication / Sheet Metal",
    keys: ["weld", "welder", "welding", "tig", "mig", "arc", "fabrication", "fabricator", "sheetmetal", "laser", "pressbrake", "bending", "trumpf", "amada", "press", "powerpress"],
    titles: ["TIG Welder", "MIG Welder", "Fabricator", "Laser Cutting Operator", "Press Brake (Bending) Operator", "Power Press Operator"],
    machines: ["Trumpf laser", "Amada laser / press brake", "Bystronic", "Power press", "Hydraulic press"],
    controls: [],
    skills: ["TIG welding", "MIG welding", "Arc welding", "Sheet metal bending", "Laser cutting", "Marking & fitting", "Weld inspection", "Fabrication drawing reading"],
    bullets: [
      "Welded MS and SS components using TIG and MIG processes as per drawing",
      "Operated laser cutting and press brake machines for sheet metal parts",
      "Checked weld quality and dimensions before sending parts to next process",
    ],
    summary: "Welder and Fabricator with experience in TIG and MIG welding and sheet metal work, producing strong, accurate fabrications as per drawing.",
  },
  {
    id: "supervisor",
    label: "Production Supervisor",
    keys: ["supervisor", "shiftincharge", "incharge", "lineleader", "production", "foreman", "oee"],
    titles: ["Production Supervisor (Machining)", "Shift In-charge", "Line Leader", "Production Engineer", "Cell Leader"],
    machines: ["VMC & HMC cells", "CNC turning cells"],
    controls: [],
    skills: ["Shift planning", "Manpower handling", "OEE improvement", "Cycle time study", "Line balancing", "Rejection analysis", "Kaizen", "5S", "Daily production reporting"],
    bullets: [
      "Planned daily production and manpower for a machining cell to meet dispatch targets",
      "Improved OEE by reducing setup time and unplanned downtime",
      "Led rejection analysis and implemented poka-yoke to prevent repeat defects",
      "Trained new operators on setting, safety and quality standards",
    ],
    summary: "Production Supervisor with experience running CNC machining cells, handling manpower, OEE improvement and rejection control to meet production and dispatch targets.",
  },
  {
    id: "assembly",
    label: "Assembly / Fitter",
    keys: ["assembly", "fitter", "fitting", "deburr", "deburring"],
    titles: ["Assembly Fitter", "Bench Fitter", "Deburring Operator", "Assembly Technician"],
    machines: ["Torque tools", "Hydraulic press"],
    controls: [],
    skills: ["Mechanical assembly", "Torque tightening", "Deburring", "Bearing fitting", "Leak testing", "Reading assembly drawings"],
    bullets: [
      "Assembled mechanical sub-assemblies as per work instructions and torque standards",
      "Deburred and cleaned machined components before assembly",
      "Performed leak and function testing before final dispatch",
    ],
    summary: "Assembly Fitter experienced in mechanical assembly, torque tightening and deburring, following work instructions carefully to deliver defect-free assemblies.",
  },
  {
    id: "apprentice",
    label: "Apprentice / ITI / Diploma Trainee",
    keys: ["apprentice", "trainee", "iti", "naps", "neem", "diploma", "fresher", "dme", "gat"],
    titles: ["CNC Apprentice", "ITI Machinist Trainee", "ITI Turner Trainee", "ITI Fitter Trainee", "Diploma Trainee (Mechanical)", "NAPS Apprentice"],
    machines: ["VMC", "CNC turning centre", "Conventional lathe"],
    controls: ["Fanuc basics"],
    skills: ["ITI Machinist", "ITI Turner", "ITI Fitter", "Diploma in Mechanical Engineering", "Basic CNC operation", "Measuring instruments", "Reading engineering drawings", "Willing to work in shifts"],
    bullets: [
      "Completed hands-on training on CNC turning and VMC machines during apprenticeship",
      "Learned job loading, basic offsets and part inspection under senior setters",
      "Followed 5S and safety practices on the shop floor",
    ],
    summary: "ITI / Diploma holder eager to start a career in CNC machining. Trained in basic CNC operation, measuring instruments and drawing reading, and willing to work in shifts.",
  },
];

// Brand words that should create "Title – Brand" suggestions
const BRANDS = ["Mazak", "Fanuc Robodrill", "Haas", "DMG Mori", "Makino", "Okuma", "Doosan", "Ace", "LMW", "BFW", "Jyoti", "Hurco", "Brother", "Tsugami", "Citizen", "Studer", "Zeiss", "Electronica", "Trumpf", "Amada"];

// ---------- Matching helpers ----------
const squash = (s = "") => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

export function matchFamilies(text) {
  const q = squash(text);
  if (q.length < 2) return [];
  const hit = (k) => q.includes(k) || (q.length >= 3 && k.startsWith(q));
  // 1st try: role keywords only (keeps "vmc" from pulling in every family that lists a VMC)
  const byKeys = MACHINING_FAMILIES.filter((f) => f.keys.some(hit));
  if (byKeys.length) return byKeys;
  // 2nd try: job titles and machine / brand names (e.g. "mazak", "robodrill")
  return MACHINING_FAMILIES.filter((f) => [...f.titles, ...f.machines].map(squash).some(hit));
}

export function getTitleSuggestions(text, limit = 8) {
  const q = squash(text);
  if (!q) {
    return ["VMC Setter cum Operator", "CNC Turning Operator", "HMC Operator", "CNC Programmer", "QC Inspector", "CNC Maintenance Technician (Mechanical)", "Production Supervisor (Machining)", "CNC Apprentice"];
  }
  const out = new Set();
  const families = matchFamilies(text);
  const brand = q.length >= 3 && BRANDS.find((b) => { const sb = squash(b); return q.includes(sb) || (q.length >= 4 && sb.includes(q)); });

  // brand-flavoured titles first, e.g. "VMC Setter – Mazak"
  if (brand) families.slice(0, 2).forEach((f) => f.titles.slice(0, 2).forEach((t) => out.add(`${t} – ${brand}`)));
  // titles that contain what was typed
  MACHINING_FAMILIES.forEach((f) => f.titles.forEach((t) => { if (squash(t).includes(q)) out.add(t); }));
  // other titles from the matched role families
  families.forEach((f) => f.titles.forEach((t) => out.add(t)));
  return [...out].slice(0, limit);
}

// ---------- Styles ----------
const C = { navy: "#0b2a5b", blue: "#1d4ed8", pale: "#eef4ff", line: "#c9d7f2", text: "#1f2937", muted: "#5b6b86" };
const s = {
  wrap: { position: "relative", width: "100%" },
  list: { position: "absolute", zIndex: 50, top: "100%", left: 0, right: 0, marginTop: 4, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 8, boxShadow: "0 8px 20px rgba(11,42,91,0.12)", maxHeight: 260, overflowY: "auto", padding: 4, listStyle: "none" },
  item: (active) => ({ padding: "8px 10px", borderRadius: 6, cursor: "pointer", fontSize: 14, color: C.text, background: active ? C.pale : "transparent" }),
  hint: { padding: "6px 10px", fontSize: 12, color: C.muted },
  panel: { marginTop: 10, border: `1px solid ${C.line}`, borderRadius: 10, padding: 14, background: "#fbfdff" },
  head: { margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: C.navy },
  sub: { margin: "0 0 10px", fontSize: 12, color: C.muted },
  group: { marginTop: 12 },
  groupTitle: { fontSize: 12.5, fontWeight: 600, color: C.navy, marginBottom: 6 },
  chips: { display: "flex", flexWrap: "wrap", gap: 6 },
  chip: (added) => ({ border: `1px solid ${added ? C.blue : C.line}`, background: added ? C.blue : "#fff", color: added ? "#fff" : C.navy, borderRadius: 999, padding: "5px 11px", fontSize: 12.5, cursor: added ? "default" : "pointer" }),
  bullet: { display: "flex", gap: 8, alignItems: "flex-start", justifyContent: "space-between", padding: "7px 0", borderTop: `1px dashed ${C.line}`, fontSize: 13, color: C.text },
  addBtn: { flexShrink: 0, border: `1px solid ${C.blue}`, background: "#fff", color: C.blue, borderRadius: 6, padding: "3px 10px", fontSize: 12, cursor: "pointer" },
};

// ---------- 1) Job title input with dropdown ----------
// Drop-in replacement for <input ...>. Keeps the same value / onChange / name props.
export function MachiningTitleInput({ value = "", onChange, placeholder = "e.g. VMC Setter, CNC Turning Operator", ...rest }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const options = useMemo(() => getTitleSuggestions(value), [value]);

  const pick = (title) => {
    if (onChange) onChange({ target: { value: title, name: rest.name } });
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (e) => {
    if (!open || !options.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % options.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a <= 0 ? options.length - 1 : a - 1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(options[active]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div style={s.wrap}>
      <input
        {...rest}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => { if (onChange) onChange(e); setOpen(true); setActive(-1); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
      />
      {open && options.length > 0 && (
        <ul style={s.list} role="listbox">
          {!value && <li style={s.hint}>Popular machine shop roles</li>}
          {options.map((t, i) => (
            <li
              key={t}
              role="option"
              aria-selected={i === active}
              style={s.item(i === active)}
              onMouseDown={(e) => { e.preventDefault(); pick(t); }}
              onMouseEnter={() => setActive(i)}
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- 2) Suggestion panel ----------
// role:          the job title / designation text the candidate typed
// existingSkills: array OR comma-separated string of skills already added (to show them as added)
// onAddSkill(text), onAddBullet(text), onUseSummary(text): pass only the ones you want to show
export function MachiningSuggestionPanel({ role, existingSkills = [], onAddSkill, onAddBullet, onUseSummary }) {
  const families = useMemo(() => matchFamilies(role), [role]);
  if (!families.length) return null;

  const have = new Set(
    (Array.isArray(existingSkills) ? existingSkills : String(existingSkills).split(","))
      .map((x) => squash(typeof x === "string" ? x : x?.name || ""))
      .filter(Boolean)
  );
  const uniq = (arr) => [...new Set(arr)];
  const machines = uniq(families.flatMap((f) => f.machines));
  const controls = uniq(families.flatMap((f) => f.controls));
  const skills = uniq(families.flatMap((f) => f.skills));
  const bullets = uniq(families.flatMap((f) => f.bullets));
  const summary = families[0].summary;

  const ChipGroup = ({ title, items }) =>
    items.length > 0 && (
      <div style={s.group}>
        <div style={s.groupTitle}>{title}</div>
        <div style={s.chips}>
          {items.map((it) => {
            const added = have.has(squash(it));
            return (
              <button type="button" key={it} style={s.chip(added)} disabled={added} onClick={() => onAddSkill(it)}>
                {added ? `✓ ${it}` : `+ ${it}`}
              </button>
            );
          })}
        </div>
      </div>
    );

  return (
    <div style={s.panel}>
      <p style={s.head}>Suggestions for {families.map((f) => f.label).join(" & ")}</p>
      <p style={s.sub}>Tap to add what you have actually worked on. Machine names and controls help recruiters find you.</p>

      {onAddSkill && (
        <>
          <ChipGroup title="Machines you have worked on" items={machines} />
          <ChipGroup title="Controls / software" items={controls} />
          <ChipGroup title="Skills" items={skills} />
          <ChipGroup title="Measuring instruments" items={INSTRUMENTS} />
          <ChipGroup title="Shop floor practices" items={SHOPFLOOR} />
        </>
      )}

      {onAddBullet && (
        <div style={s.group}>
          <div style={s.groupTitle}>Work points for this role</div>
          {bullets.map((b) => (
            <div key={b} style={s.bullet}>
              <span>• {b}</span>
              <button type="button" style={s.addBtn} onClick={() => onAddBullet(b)}>Add</button>
            </div>
          ))}
        </div>
      )}

      {onUseSummary && summary && (
        <div style={s.group}>
          <div style={s.groupTitle}>Sample profile summary</div>
          <div style={s.bullet}>
            <span>{summary}</span>
            <button type="button" style={s.addBtn} onClick={() => onUseSummary(summary)}>Use</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MachiningSuggestionPanel;