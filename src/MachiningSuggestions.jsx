// MachiningSuggestions.jsx — role suggestions for the CoreTech Talents resume builder
// Covers shop-floor AND office departments of a machine-shop company.
// Same exports and props as before, so ResumeBuilder.jsx needs no changes:
//   <MachiningTitleInput />      -> job title input with dropdown
//   <MachiningSuggestionPanel /> -> skills, tools, work points and summary for the typed role
// Plain inline styles (no Tailwind), blue-and-white theme.

import { useMemo, useState } from "react";

// ---------- Shared shop-floor lists (used unless a role sets its own) ----------
const INSTRUMENTS = [
  "Vernier caliper", "Outside micrometer", "Bore gauge", "Height gauge",
  "Dial indicator", "Plug & ring gauges", "Thread gauges", "Slip gauges",
];
const SHOPFLOOR = [
  "5S", "Kaizen", "Poka-yoke", "TPM", "Safety practices (PPE)",
  "Daily production reporting", "Reading engineering drawings",
];

// Office roles: no measuring instruments, their own labels
const office = (f) => ({
  instruments: [],
  machinesLabel: "Tools & portals you have used",
  controlsLabel: "Software / ERP",
  practicesLabel: "Laws, standards & practices",
  ...f,
});

// ---------- Role families ----------
// keys: what a candidate might type (lowercase, no spaces).
// Keys of 3 letters or fewer only match a whole word (e.g. "hr", "qc", "ndt").
export const MACHINING_FAMILIES = [
  // ======================= MACHINING =======================
  {
    id: "vmc", dept: "Machining",
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
    id: "hmc", dept: "Machining",
    label: "HMC (Horizontal Machining Centre)",
    keys: ["hmc", "horizontalmachining", "horizontal", "pallet", "hbm", "horizontalboring"],
    titles: ["HMC Operator", "HMC Setter", "HMC Setter cum Operator", "Senior HMC Setter", "HBM Operator"],
    machines: ["Mazak HCN", "Makino a-series", "Okuma MA", "DN Solutions (Doosan) HM / HP", "Mori Seiki NH", "Ace Micromatic HMC", "BFW HMC", "Toshiba BTH"],
    controls: ["Fanuc 31i / 0i", "Siemens 840D", "Mazatrol", "Okuma OSP"],
    skills: ["HMC setting", "Pallet changer operation", "Rotary table / B-axis indexing", "Tombstone fixture setting", "Line boring", "Tool & work offset setting", "Probing cycles", "First-piece approval"],
    bullets: [
      "Set and operated HMC machines with twin-pallet changers for housing and casing components",
      "Loaded tombstone fixtures and set work offsets for multi-face machining in one setup",
      "Held bore position and perpendicularity within tolerance using probing and line boring",
      "Reduced setup time by preparing tools and fixtures offline on the second pallet",
    ],
    summary: "HMC Setter cum Operator experienced in multi-face machining of housings and casings on pallet-change horizontal machining centres, with strong skills in fixture setting, B-axis work and holding tight bore tolerances.",
  },
  {
    id: "turning", dept: "Machining",
    label: "CNC Turning / VTL",
    keys: ["turning", "cncturning", "turningcentre", "turningcenter", "cnclathe", "vtl", "verticalturning", "swiss", "slidinghead", "sliding", "tsugami", "citizen"],
    titles: ["CNC Turning Operator", "CNC Turning Setter", "CNC Turning Setter cum Operator", "VTL Operator", "Swiss-type (Sliding Head) Setter", "Senior CNC Turning Setter"],
    machines: ["Ace Micromatic (Jobber, LT series)", "LMW Smarturn", "Mazak Quick Turn", "DN Solutions (Doosan) Lynx / Puma", "Haas ST series", "Okuma LB", "Citizen / Tsugami (Swiss-type)", "VTL machines"],
    controls: ["Fanuc 0i-TF", "Siemens 828D", "Mazatrol", "Okuma OSP"],
    skills: ["CNC turning setting", "Chuck & jaw boring (soft jaws)", "Tool nose radius compensation", "Threading (G76 / G92)", "Bar feeder operation", "Tailstock setting", "Grooving & parting", "Insert selection", "First-piece approval"],
    bullets: [
      "Set and operated CNC turning centres for shafts, flanges and bushes as per drawing",
      "Bored soft jaws and set chuck pressure for thin-wall components without distortion",
      "Cut external and internal threads and checked them with thread ring and plug gauges",
      "Changed inserts based on tool life and surface finish to reduce rejection",
    ],
    summary: "CNC Turning Setter cum Operator with experience on Fanuc and Siemens turning centres. Skilled in soft-jaw boring, threading, tool offsets and first-piece approval for shafts, flanges and precision turned parts.",
  },
  {
    id: "fiveaxis", dept: "Machining",
    label: "5-Axis / Mill-Turn",
    keys: ["5axis", "fiveaxis", "simultaneous", "millturn", "turnmill", "integrex", "multitasking", "hermle", "dmu"],
    titles: ["5-Axis Machinist", "5-Axis Setter cum Operator", "Mill-Turn Operator", "Multi-tasking Machine Setter", "5-Axis Programmer"],
    machines: ["DMG Mori DMU", "Hermle C series", "Mazak Integrex", "Mazak Variaxis", "Okuma Multus", "Matsuura"],
    controls: ["Siemens 840D", "Heidenhain TNC 640", "Mazatrol SmoothX", "Fanuc 31i"],
    skills: ["3+2 axis machining", "Simultaneous 5-axis machining", "Tool centre point (TCP / TCPM)", "Probing & work alignment", "Mill-turn setting", "Thin-wall & aerospace parts", "Collision checking"],
    bullets: [
      "Set and machined complex aerospace and medical components on 5-axis machines",
      "Aligned parts with machine probing and proved out programs with dry runs and single block",
      "Completed parts in a single setup on mill-turn machines to improve accuracy and lead time",
    ],
    summary: "5-Axis Machinist experienced in 3+2 and simultaneous 5-axis machining and mill-turn setups, with strong skills in probing, program prove-out and complex, tight-tolerance parts.",
  },
  {
    id: "programmer", dept: "Machining",
    label: "CNC / CAM Programmer",
    keys: ["programmer", "programming", "cam", "mastercam", "nxcam", "hypermill", "powermill", "esprit", "gcode", "fusion360"],
    titles: ["CNC Programmer", "CAM Programmer", "VMC / HMC Programmer", "Turning Programmer", "Senior CAM Engineer"],
    machines: ["VMC", "HMC", "CNC turning centre", "5-axis machines"],
    controls: ["Mastercam", "Siemens NX CAM", "hyperMILL", "PowerMill", "ESPRIT", "Fusion 360", "SolidCAM", "Vericut", "AutoCAD"],
    controlsLabel: "CAM / CAD software",
    skills: ["Manual G & M code programming", "CAM programming", "Post-processor editing", "Toolpath strategy", "Cutting data selection", "Fixture & process planning", "Program prove-out", "Cycle time reduction"],
    bullets: [
      "Wrote CNC programs for VMC, HMC and turning centres from 2D drawings and 3D models",
      "Selected tools and cutting data to reduce cycle time while keeping tool life stable",
      "Proved out new programs on the machine and released them with setup sheets and tool lists",
      "Simulated toolpaths to avoid collisions before sending programs to the shop floor",
    ],
    summary: "CNC / CAM Programmer skilled in manual and CAM programming for VMC, HMC and turning centres. Experienced in toolpath strategy, cutting data selection and proving out programs to reduce cycle time.",
  },
  {
    id: "conventional", dept: "Machining",
    label: "Conventional Machinist",
    keys: ["conventional", "manuallathe", "milling", "miller", "machinist", "drilling", "radialdrill", "shaper", "slotting", "turner"],
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
    id: "grinding", dept: "Machining",
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
    id: "gear", dept: "Machining",
    label: "Gear Cutting / Broaching",
    keys: ["gear", "gearcutting", "hobbing", "hob", "gearshaping", "broach", "broaching", "spline", "splines", "gleason", "pfauter"],
    titles: ["Gear Hobbing Operator", "Gear Shaping Operator", "Broaching Operator", "Gear Cutting Setter", "Gear Grinding Operator"],
    machines: ["Gleason-Pfauter", "Liebherr", "Mitsubishi gear hobber", "Hindustan Hobbing", "Broaching machines"],
    controls: ["Fanuc", "Siemens"],
    skills: ["Gear hobbing", "Gear shaping", "Internal & external broaching", "Spline cutting", "Hob & cutter mounting", "Gear inspection (DOP / span)", "Gear tooth profile checking"],
    bullets: [
      "Set and operated gear hobbing and shaping machines for spur and helical gears",
      "Mounted hobs and cutters and set indexing as per gear data",
      "Checked DOP, span and runout and maintained gear inspection records",
    ],
    summary: "Gear Cutting Setter experienced in hobbing, shaping and broaching of spur, helical and spline components, with good knowledge of gear data and gear inspection.",
  },
  {
    id: "supervisor", dept: "Machining",
    label: "Production / Machine Shop Supervisor",
    keys: ["supervisor", "shiftincharge", "incharge", "lineleader", "production", "foreman", "oee", "machineshop", "shopfloor"],
    titles: ["Production Supervisor (Machining)", "Shift In-charge", "Machine Shop In-charge", "Line Leader", "Production Engineer", "Cell Leader", "Production Manager"],
    machines: ["VMC & HMC cells", "CNC turning cells", "Grinding section"],
    controls: [],
    skills: ["Shift planning", "Manpower handling", "OEE improvement", "Cycle time study", "Line balancing", "Rejection analysis", "Kaizen", "5S", "Daily production reporting", "Skill matrix & training"],
    bullets: [
      "Planned daily production and manpower for a machining cell to meet dispatch targets",
      "Improved OEE by reducing setup time and unplanned downtime",
      "Led rejection analysis and implemented poka-yoke to prevent repeat defects",
      "Trained new operators on setting, safety and quality standards",
    ],
    summary: "Production Supervisor with experience running CNC machining cells, handling manpower, OEE improvement and rejection control to meet production and dispatch targets.",
  },
  {
    id: "apprentice", dept: "Machining",
    label: "Apprentice / ITI / Diploma Trainee",
    keys: ["apprentice", "trainee", "iti", "naps", "neem", "diploma", "fresher", "dme", "gat"],
    titles: ["CNC Apprentice", "ITI Machinist Trainee", "ITI Turner Trainee", "ITI Fitter Trainee", "Diploma Trainee (Mechanical)", "NAPS Apprentice", "Graduate Apprentice Trainee"],
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

  // ======================= QUALITY =======================
  {
    id: "qcinspection", dept: "Quality",
    label: "QC Inspection",
    keys: ["qc", "inspector", "inspection", "lineinspector", "finalinspection", "incoming", "pdi", "patrol", "qualitycontrol"],
    titles: ["Quality Inspector", "QC Inspector", "Line Inspector", "Final Inspector", "Incoming Inspector", "Patrol Inspector", "PDI Inspector"],
    machines: ["Profile projector", "Contour tracer", "Surface roughness tester", "Hardness tester (Rockwell / Brinell)", "Air gauges", "Digital height gauge"],
    machinesLabel: "Inspection equipment",
    controls: ["Excel", "SAP QM"],
    skills: ["First-piece inspection", "In-process (patrol) inspection", "Final inspection", "Incoming material inspection", "GD&T reading", "Inspection report preparation", "Non-conformance (NC) tagging", "Gauge calibration tracking"],
    instruments: ["Vernier caliper", "Outside micrometer", "Bore gauge", "Height gauge", "Dial indicator", "Plug & ring gauges", "Thread gauges", "Slip gauges", "Bevel protractor", "Radius gauge"],
    practices: ["7 QC tools", "Control plan", "Red bin / rejection control", "ISO 9001", "IATF 16949", "5S"],
    practicesLabel: "Quality practices",
    bullets: [
      "Performed first-piece, in-process and final inspection of machined components as per control plan",
      "Checked GD&T features such as position, flatness and runout using height gauge and dial indicator",
      "Prepared inspection reports and tagged non-conforming parts for segregation",
      "Maintained gauge calibration status and instrument history cards",
    ],
    summary: "Quality Inspector experienced in first-piece, in-process and final inspection of machined parts. Skilled with precision measuring instruments, GD&T reading and inspection reporting as per control plan.",
  },
  {
    id: "cmm", dept: "Quality",
    label: "CMM Operator / Programmer",
    keys: ["cmm", "coordinatemeasuring", "calypso", "pcdmis", "faro", "vmm", "metrology"],
    titles: ["CMM Operator", "CMM Programmer", "Metrology Engineer", "Senior CMM Programmer", "Metrology Lab In-charge"],
    machines: ["Zeiss Contura / Accura", "Hexagon Global", "Mitutoyo Crysta", "Faro arm", "Vision measuring machine (VMM)", "Contour tracer"],
    machinesLabel: "Measuring machines",
    controls: ["Zeiss Calypso", "Hexagon PC-DMIS", "Mitutoyo MCOSMOS", "PolyWorks"],
    controlsLabel: "CMM software",
    skills: ["CMM programming (offline & online)", "Part alignment", "GD&T interpretation", "CMM report generation", "Probe qualification", "First article inspection (FAI)", "Measurement uncertainty"],
    instruments: ["Height gauge", "Slip gauges", "Dial indicator", "Surface plate"],
    practices: ["MSA (Gauge R&R)", "AS9102 FAI", "ISO 17025 lab practices", "Temperature-controlled lab"],
    practicesLabel: "Quality practices",
    bullets: [
      "Wrote and ran CMM programs for new and running parts from 3D models and drawings",
      "Measured GD&T features such as position, profile and true position and released CMM reports",
      "Completed first article inspection reports for new part approvals",
      "Supported production by quickly measuring setup parts to reduce machine waiting time",
    ],
    summary: "CMM Programmer skilled in Calypso / PC-DMIS programming, GD&T interpretation and first article inspection, supporting new part approvals and running production with accurate, fast measurement.",
  },
  {
    id: "qa", dept: "Quality",
    label: "Quality Assurance / Quality Engineering",
    keys: ["quality", "qa", "qms", "iatf", "as9100", "iso9001", "supplierquality", "sqe", "customerquality", "ppap", "qualityengineer"],
    titles: ["Quality Engineer", "QA Engineer", "Supplier Quality Engineer", "Customer Quality Engineer", "Quality Systems Engineer (QMS)", "Quality Manager", "Head – Quality"],
    machines: ["CMM reports", "Customer portals", "Gauge calibration records"],
    machinesLabel: "Tools & records you have used",
    controls: ["Excel", "Minitab", "SAP QM", "QMS software"],
    skills: ["Root cause analysis", "8D problem solving", "Why-why analysis", "PPAP", "APQP", "PFMEA", "Control plan", "SPC", "MSA", "Internal audits", "Customer complaint handling", "Supplier audits"],
    instruments: [],
    practices: ["ISO 9001", "IATF 16949", "AS9100D", "AS9102 FAI", "7 QC tools", "Core tools (APQP, PPAP, FMEA, SPC, MSA)"],
    practicesLabel: "Standards & systems",
    bullets: [
      "Handled customer complaints with 8D reports and closed them within the committed timeline",
      "Prepared PPAP and FAI documents for new part approvals with automotive and aerospace customers",
      "Led internal audits and closed non-conformities before IATF / AS9100 surveillance audits",
      "Reduced in-house rejection through SPC and why-why analysis on critical characteristics",
      "Audited suppliers and drove corrective actions to improve incoming quality",
    ],
    summary: "Quality Engineer with experience in customer and supplier quality for machined components. Skilled in 8D, PPAP, FMEA, SPC and internal audits under IATF 16949 / AS9100 quality systems.",
  },

  // ======================= ASSEMBLY =======================
  {
    id: "assembly", dept: "Assembly",
    label: "Assembly / Fitter",
    keys: ["assembly", "fitter", "fitting", "deburr", "deburring", "bench"],
    titles: ["Assembly Fitter", "Bench Fitter", "Assembly Technician", "Deburring Operator", "Mechanical Assembler", "Final Assembly Operator"],
    machines: ["Torque wrench / DC nutrunner", "Hydraulic press", "Pneumatic tools", "Leak testing machine", "Bearing heater"],
    machinesLabel: "Tools & equipment",
    controls: [],
    skills: ["Mechanical assembly", "Torque tightening", "Bearing & seal fitting", "Deburring", "Leak testing", "Reading assembly drawings", "Work instruction (SOP) following", "Final visual inspection"],
    bullets: [
      "Assembled mechanical sub-assemblies as per work instructions and torque standards",
      "Fitted bearings, seals and O-rings without damage using press and heating methods",
      "Deburred and cleaned machined components before assembly",
      "Performed leak and function testing before final dispatch",
    ],
    summary: "Assembly Fitter experienced in mechanical assembly, torque tightening, bearing fitting and deburring, following work instructions carefully to deliver defect-free assemblies.",
  },
  {
    id: "assemblyeng", dept: "Assembly",
    label: "Assembly Engineering / Supervision",
    keys: ["assemblyengineer", "assemblysupervisor", "hydraulic", "pneumatic", "gearbox", "wiring", "panelwiring", "testing"],
    titles: ["Assembly Engineer", "Assembly Supervisor", "Hydraulic Assembly Technician", "Pneumatic Assembly Technician", "Gearbox Assembly Technician", "Electrical Wiring Technician", "Testing Engineer"],
    machines: ["Hydraulic test bench", "Torque analyser", "Leak tester", "EOL test rig", "Crimping tools"],
    machinesLabel: "Tools & equipment",
    controls: ["Excel", "SAP PP", "AutoCAD"],
    skills: ["Assembly line balancing", "Hydraulic circuit assembly", "Pneumatic assembly", "Electrical wiring & crimping", "End-of-line testing", "SOP / work instruction preparation", "Assembly fixture design support", "Assembly defect analysis"],
    bullets: [
      "Planned daily assembly output and manpower to meet customer delivery schedules",
      "Prepared SOPs and work instructions for new product assemblies",
      "Tested hydraulic and pneumatic assemblies on test benches and recorded results",
      "Reduced assembly defects through error-proofing and operator training",
    ],
    summary: "Assembly Engineer experienced in mechanical, hydraulic and pneumatic assemblies, line balancing, testing and SOP preparation, focused on first-time-right assemblies and on-time delivery.",
  },

  // ======================= TOOLING =======================
  {
    id: "toolcrib", dept: "Tool Crib",
    label: "Tool Crib",
    keys: ["toolcrib", "crib", "toolstore", "toolstores", "toolissue", "toolvending", "inserts", "tooling"],
    titles: ["Tool Crib Attendant", "Tool Crib In-charge", "Tool Store Keeper", "Tooling Coordinator", "Tool Crib Supervisor"],
    machines: ["Sandvik Coromant", "Kennametal", "Iscar", "TaeguTec", "Walter", "Mitsubishi Materials", "Seco", "Tool vending machine"],
    machinesLabel: "Tool brands & equipment",
    controls: ["SAP MM", "Excel", "Tool management software"],
    skills: ["Tool issue & return", "Tool inventory management", "Reorder level & min-max planning", "Tool life tracking", "Regrind & reconditioning management", "Insert & holder identification", "Tool consumption reporting", "Stock verification"],
    instruments: ["Vernier caliper", "Outside micrometer"],
    practices: ["FIFO", "5S", "Visual management", "Tool cost per part tracking"],
    practicesLabel: "Practices",
    bullets: [
      "Issued and received cutting tools, inserts and holders against shop-floor requisitions",
      "Maintained min-max levels and raised purchase requests before stock-outs",
      "Tracked tool life and regrind cycles to reduce tooling cost per part",
      "Carried out monthly tool stock verification and reconciled with SAP records",
    ],
    summary: "Tool Crib In-charge experienced in cutting tool inventory, issue and return, min-max planning and regrind management, helping reduce tooling cost and machine waiting time.",
  },
  {
    id: "presetting", dept: "Presetting",
    label: "Tool Presetting",
    keys: ["preset", "presetter", "presetting", "zoller", "kelch", "speroni", "toolpresetting", "toolmeasurement"],
    titles: ["Tool Presetter", "Presetting Operator", "Tool Presetting Technician", "Tool Assembly & Presetting In-charge"],
    machines: ["Zoller (Smile / Venturion)", "Kelch", "Speroni", "Shrink-fit machine", "Tool balancing machine"],
    machinesLabel: "Presetting & tool-room equipment",
    controls: ["Zoller software", "Tool data transfer (DNC / RFID)"],
    skills: ["Tool assembly (holder, collet, insert)", "Tool length & radius measurement", "Shrink-fit tool assembly", "Tool balancing", "Tool list reading", "Tool offset data transfer to machine", "Tool runout checking", "Tool identification & labelling"],
    instruments: ["Dial indicator", "Torque wrench"],
    practices: ["5S", "Tool kitting", "Offline setup (SMED)"],
    practicesLabel: "Practices",
    bullets: [
      "Assembled and preset cutting tools on Zoller as per program tool lists",
      "Measured tool length, radius and runout and transferred offsets to machines",
      "Prepared tool kits in advance to reduce machine setup time",
      "Assembled shrink-fit and balanced tools for high-speed machining",
    ],
    summary: "Tool Presetter experienced in tool assembly, presetting on Zoller and Kelch, shrink-fit and balancing, supplying accurate, ready-to-run tools that cut machine setup time.",
  },
  {
    id: "toolroom", dept: "Tool Room",
    label: "Tool Room / EDM",
    keys: ["toolroom", "toolmaker", "dies", "diemaker", "edm", "wirecut", "wireedm", "sparkedm", "jig", "mould", "mold", "fixture"],
    titles: ["Tool & Die Maker", "Tool Room Machinist", "Wire EDM Operator", "Spark EDM Operator", "Fixture Maker", "Tool Room In-charge"],
    machines: ["Wire EDM (Electronica, Mitsubishi, Sodick)", "Spark EDM", "Jig boring", "Surface grinder", "Tool room lathe & milling"],
    controls: ["ELCAM", "Fanuc", "AutoCAD"],
    skills: ["Fixture making", "Jig & gauge making", "Wire EDM", "Spark EDM", "Die maintenance", "Fixture repair", "Fitting & assembly of tools", "Reading tool drawings"],
    bullets: [
      "Made and repaired fixtures, jigs and gauges for machining lines",
      "Operated wire EDM to cut profiles and punches within close tolerances",
      "Supported new part development with quick fixture modifications",
    ],
    summary: "Tool & Die Maker with experience in fixture, jig and gauge making, wire and spark EDM, and tool maintenance supporting machining lines and new part development.",
  },

  // ======================= MAINTENANCE / FABRICATION =======================
  {
    id: "maintenance", dept: "Maintenance",
    label: "Maintenance",
    keys: ["maintenance", "electrician", "mechanic", "breakdown", "plc", "utility", "utilities", "compressor", "cncmaintenance"],
    titles: ["Maintenance Technician (Mechanical)", "Maintenance Technician (Electrical)", "CNC Maintenance Engineer", "Maintenance Engineer", "Utility Technician", "Maintenance In-charge"],
    machines: ["CNC machines (VMC, HMC, turning)", "Air compressors", "DG sets", "Hydraulic power packs", "Chillers"],
    machinesLabel: "Machines & utilities you have maintained",
    controls: ["Fanuc alarms & diagnostics", "Siemens diagnostics", "PLC (Siemens / Allen-Bradley / Mitsubishi)"],
    skills: ["Breakdown maintenance", "Preventive maintenance", "CNC alarm troubleshooting", "Spindle & ballscrew maintenance", "Hydraulic & pneumatic troubleshooting", "Electrical panel wiring", "Spare parts planning", "MTTR / MTBF tracking"],
    instruments: ["Multimeter", "Clamp meter", "Megger", "Dial indicator", "Spirit level"],
    practices: ["TPM", "Preventive maintenance schedule", "Lockout–tagout (LOTO)", "Electrical safety", "Why-why analysis"],
    practicesLabel: "Maintenance practices",
    bullets: [
      "Attended CNC machine breakdowns and resolved alarms to reduce downtime",
      "Carried out preventive maintenance as per schedule and maintained machine history cards",
      "Improved MTBF by analysing repeat breakdowns and fixing root causes",
      "Maintained utilities such as compressors, DG sets and hydraulic power packs",
    ],
    summary: "Maintenance Technician with hands-on experience in CNC machine breakdown and preventive maintenance, alarm troubleshooting and utility upkeep, focused on reducing downtime and improving MTBF.",
  },
  {
    id: "welding", dept: "Fabrication",
    label: "Welding / Fabrication",
    keys: ["weld", "welder", "welding", "fabrication", "fabricator", "sheetmetal", "tig", "mig", "arc", "brazing"],
    titles: ["Welder (TIG / MIG)", "Arc Welder", "Fabricator", "Sheet Metal Fabricator", "Welding Supervisor"],
    machines: ["TIG welding machine", "MIG welding machine", "SMAW (arc)", "Plasma cutting", "Press brake", "Shearing machine"],
    controls: [],
    skills: ["TIG welding", "MIG welding", "Arc welding", "Fit-up & tack welding", "Reading fabrication drawings", "Distortion control", "Sheet metal bending"],
    instruments: ["Measuring tape", "Weld gauge", "Try square", "Vernier caliper"],
    bullets: [
      "Welded MS and SS fabrications using TIG and MIG as per drawings and WPS",
      "Carried out fit-up and tack welding with minimum distortion",
      "Checked weld size and appearance before handing over for inspection",
    ],
    summary: "Welder experienced in TIG, MIG and arc welding of MS and SS fabrications, with good fit-up skills and attention to weld quality and safety.",
  },

  // ======================= SPECIAL PROCESS =======================
  {
    id: "heattreat", dept: "Special Process",
    label: "Heat Treatment",
    keys: ["heattreatment", "heattreat", "ht", "furnace", "hardening", "carburizing", "carburising", "nitriding", "induction", "annealing", "tempering", "vacuumfurnace"],
    titles: ["Heat Treatment Operator", "Heat Treatment Technician", "Heat Treatment Engineer", "Induction Hardening Operator", "Furnace Operator", "Heat Treatment In-charge"],
    machines: ["Sealed quench furnace", "Vacuum furnace", "Induction hardening machine", "Gas nitriding furnace", "Tempering furnace"],
    machinesLabel: "Furnaces & equipment",
    controls: ["Furnace PLC / controllers", "Data loggers"],
    skills: ["Hardening & tempering", "Case carburizing", "Nitriding", "Induction hardening", "Annealing & normalizing", "Furnace loading & fixturing", "Hardness testing", "Case depth checking", "Pyrometry (TUS / SAT)"],
    instruments: ["Rockwell hardness tester", "Vickers / micro-hardness tester", "Thermocouples"],
    practices: ["AMS 2750 pyrometry", "NADCAP heat treatment", "CQI-9", "Process travellers & records"],
    practicesLabel: "Standards & practices",
    bullets: [
      "Operated sealed quench and vacuum furnaces as per approved heat treatment cycles",
      "Checked hardness and case depth and maintained batch records for traceability",
      "Supported TUS and SAT surveys as per AMS 2750 requirements",
      "Reduced distortion by improving loading patterns and fixtures",
    ],
    summary: "Heat Treatment Technician experienced in hardening, carburizing, nitriding and induction hardening, with good knowledge of hardness testing, pyrometry and process records for NADCAP / CQI-9 audits.",
  },
  {
    id: "surface", dept: "Special Process",
    label: "Surface Treatment / Special Process",
    keys: ["specialprocess", "surfacetreatment", "plating", "anodizing", "anodising", "painting", "powdercoating", "shotpeening", "passivation", "chrome", "phosphating", "blackening", "nadcap", "coating"],
    titles: ["Special Process Operator", "Plating Operator", "Anodizing Operator", "Painting / Powder Coating Operator", "Shot Peening Operator", "Special Process Engineer", "Chemical Process Technician"],
    machines: ["Anodizing line", "Electroplating line", "Passivation tanks", "Shot peening machine", "Paint booth", "Powder coating plant"],
    machinesLabel: "Process lines & equipment",
    controls: ["Excel", "Process control charts"],
    skills: ["Anodizing (hard / sulphuric / chromic)", "Zinc & nickel plating", "Hard chrome plating", "Passivation", "Phosphating & blackening", "Shot peening (Almen strip)", "Painting & powder coating", "Bath chemical analysis & titration", "Coating thickness measurement", "Masking"],
    instruments: ["Coating thickness gauge (DFT)", "Almen gauge", "pH meter", "Adhesion test kit"],
    practices: ["NADCAP chemical processing", "AMS / MIL specifications", "Bath analysis records", "Chemical safety & MSDS", "Effluent handling"],
    practicesLabel: "Standards & practices",
    bullets: [
      "Processed aerospace and automotive parts through anodizing, plating and passivation lines as per specification",
      "Analysed bath chemistry by titration and maintained concentration within limits",
      "Carried out shot peening with Almen strip verification and recorded intensity and coverage",
      "Maintained process records to meet NADCAP and customer audit requirements",
    ],
    summary: "Special Process Technician experienced in anodizing, plating, passivation, painting and shot peening, with good knowledge of bath control, coating inspection and NADCAP process records.",
  },

  // ======================= NDT =======================
  {
    id: "ndt", dept: "NDT",
    label: "NDT (Non-Destructive Testing)",
    keys: ["ndt", "ndi", "mpi", "mpt", "mt", "dpt", "lpt", "pt", "penetrant", "magneticparticle", "ultrasonic", "ut", "radiography", "rt", "eddycurrent", "et", "asnt", "level2", "levelii", "nas410"],
    titles: ["NDT Technician", "NDT Level II Technician", "NDT Level III", "MPI Inspector", "Penetrant (FPI / DPT) Inspector", "UT Technician", "NDT Engineer"],
    machines: ["Magnaflux MPI unit", "Fluorescent penetrant line (FPI)", "Ultrasonic flaw detector (Olympus / Evident)", "Eddy current tester", "Yoke", "UV lamp & light meters"],
    machinesLabel: "NDT equipment",
    controls: ["Excel", "Inspection reporting"],
    skills: ["Magnetic particle testing (MT)", "Liquid penetrant testing (PT / FPI)", "Ultrasonic testing (UT)", "Eddy current testing (ET)", "Radiography testing (RT) / film interpretation", "Visual testing (VT)", "Procedure & technique sheet writing", "Defect evaluation & reporting"],
    instruments: ["UV-A light meter", "Gauss meter", "Calibration blocks (IIW / V1 / V2)", "Test pieces (TAM panels)"],
    practices: ["ASNT SNT-TC-1A", "NAS 410 / EN 4179", "ISO 9712", "ASTM E1417 / E1444", "NADCAP NDT"],
    practicesLabel: "Certifications & standards",
    bullets: [
      "Performed MT, PT and UT on machined, forged and welded components as per approved procedures",
      "Evaluated indications against acceptance criteria and issued NDT reports",
      "Carried out daily system checks on MPI and FPI lines and maintained records",
      "Supported NADCAP NDT audits with procedures, technique sheets and personnel records",
    ],
    summary: "NDT Level II Technician certified in MT, PT and UT, experienced in inspecting machined, forged and welded aerospace and industrial components as per ASNT / NAS 410 and NADCAP requirements.",
  },

  // ======================= PROJECT ENGINEERING =======================
  {
    id: "projecteng", dept: "Project Engineering",
    label: "Project / NPD / Process Engineering",
    keys: ["project", "projects", "npd", "newproduct", "newpart", "processengineer", "process", "methods", "industrialengineer", "ie", "apqp", "fixturedesign", "designengineer", "solidworks", "catia", "capex"],
    titles: ["Project Engineer", "NPD Engineer", "Process Engineer (Machining)", "Methods Engineer", "Industrial Engineer", "Design Engineer (Fixtures)", "Project Manager"],
    machines: ["Process sheets", "Timing plans", "Fixture drawings", "Capacity sheets"],
    machinesLabel: "Documents you prepare",
    controls: ["SolidWorks", "Siemens NX", "CATIA", "AutoCAD", "MS Project", "Excel", "SAP PP"],
    skills: ["New part development", "APQP & timing plan", "Process planning & routing", "Fixture design", "Cycle time estimation", "Capacity planning", "Capex & machine selection", "Trial runs & part approval", "Cost reduction (VA/VE)", "Customer drawing review (feasibility)"],
    instruments: [],
    practices: ["APQP", "PPAP", "PFMEA", "Control plan", "Lean manufacturing", "SMED"],
    practicesLabel: "Standards & methods",
    bullets: [
      "Led new part development from RFQ feasibility to PPAP approval within the timing plan",
      "Prepared process sheets, routing and cycle time estimates for new machined components",
      "Designed and validated machining fixtures that reduced setup time",
      "Coordinated with quality, tooling and production teams during trial runs and part approval",
      "Evaluated and installed new machines under capex projects",
    ],
    summary: "Project Engineer experienced in new part development for machined components, from feasibility and process planning to fixture design, trials and PPAP approval, delivered on time through cross-functional coordination.",
  },

  // ======================= BUSINESS DEVELOPMENT / SALES =======================
  office({
    id: "bd", dept: "Business Development",
    label: "Business Development",
    keys: ["businessdevelopment", "bd", "bde", "bdm", "keyaccount", "marketing", "newbusiness", "customeracquisition", "rfq"],
    titles: ["Business Development Executive", "Business Development Manager", "Key Account Manager", "Marketing Executive", "BD Engineer (Machined Components)", "Head – Business Development"],
    machines: ["LinkedIn Sales Navigator", "Customer supplier portals", "Trade shows (IMTEX, Aero India)", "Government e-Marketplace (GeM)"],
    controls: ["Zoho CRM", "Salesforce", "HubSpot", "Excel", "PowerPoint"],
    skills: ["New customer acquisition", "RFQ handling", "Techno-commercial offers", "Part costing & quotation", "Customer visits & presentations", "Negotiation", "Key account management", "Market research", "Export customer development"],
    practices: ["NDA & contract basics", "Incoterms", "Customer onboarding (vendor registration)"],
    bullets: [
      "Added new automotive, aerospace and industrial customers for precision machined components",
      "Handled RFQs end to end, from drawing review and costing to quotation and negotiation",
      "Built a sales pipeline through LinkedIn outreach, trade shows and customer visits",
      "Managed key accounts and grew repeat business year on year",
    ],
    summary: "Business Development professional experienced in winning new customers for precision machined components, handling RFQs, costing and techno-commercial negotiations, and growing key accounts.",
  }),
  office({
    id: "sales", dept: "Sales",
    label: "Sales / Customer Service",
    keys: ["sales", "salesengineer", "salescoordinator", "salesexecutive", "customerservice", "customersupport", "crm", "orderprocessing", "insidesales", "technicalsales"],
    titles: ["Sales Engineer", "Sales Executive", "Sales Coordinator", "Inside Sales Executive", "Customer Service Executive", "Area Sales Manager", "Sales Manager"],
    machines: ["Customer portals", "E-invoice / e-way bill portal"],
    controls: ["SAP SD", "Tally Prime", "Zoho CRM", "Salesforce", "Excel"],
    skills: ["Order processing", "Sales order & invoicing", "Customer follow-up", "Delivery schedule coordination", "Payment collection follow-up", "Sales target achievement", "Technical sales support", "Customer complaint coordination", "Sales MIS reporting"],
    practices: ["GST invoicing basics", "Credit limit control", "Customer satisfaction tracking"],
    bullets: [
      "Achieved monthly and annual sales targets for machined components and assemblies",
      "Processed customer POs into sales orders and coordinated delivery schedules with production",
      "Followed up on payments and reduced overdue receivables",
      "Prepared sales MIS and customer-wise reports for management review",
    ],
    summary: "Sales Engineer experienced in order processing, customer coordination and target achievement for engineering products, with good knowledge of SAP SD, invoicing and receivables follow-up.",
  }),

  // ======================= PROCUREMENT =======================
  office({
    id: "procurement", dept: "Procurement",
    label: "Procurement / Purchase",
    keys: ["purchase", "purchasing", "procurement", "buyer", "sourcing", "vendordevelopment", "vendor", "sapmm", "commodity", "outsourcing", "subcontract"],
    titles: ["Purchase Executive", "Purchase Engineer", "Buyer", "Vendor Development Engineer", "Sourcing Manager", "Procurement Manager", "Subcontract Coordinator"],
    machines: ["GeM portal", "Supplier portals", "IndiaMART / TradeIndia"],
    controls: ["SAP MM", "Oracle", "Tally Prime", "Excel"],
    skills: ["Purchase order creation", "RFQ & quotation comparison", "Price negotiation", "Vendor development", "Vendor evaluation & rating", "Raw material procurement (bars, forgings, castings)", "Subcontract / job-work management", "Import procurement", "Cost reduction", "MRP-based planning"],
    practices: ["Incoterms", "GST basics for purchase", "Job-work (ITC-04) basics", "Supplier quality agreements"],
    bullets: [
      "Procured raw materials, forgings, castings and cutting tools within budget and lead time",
      "Developed new vendors for machining and special process subcontracting",
      "Negotiated prices and payment terms to reduce material cost",
      "Created and tracked purchase orders in SAP MM to avoid line stoppages",
      "Evaluated vendors on quality, delivery and cost and shared monthly ratings",
    ],
    summary: "Purchase Engineer experienced in procuring raw materials, tools and subcontract services for a machine shop, with strong negotiation, vendor development and SAP MM skills.",
  }),

  // ======================= STORES & LOGISTICS =======================
  office({
    id: "stores", dept: "Stores & Logistics",
    label: "Stores / Inventory",
    keys: ["store", "stores", "storekeeper", "inventory", "warehouse", "grn", "materials", "materialhandling", "forklift"],
    titles: ["Storekeeper", "Stores Executive", "Stores Assistant", "Stores In-charge", "Inventory Controller", "Warehouse Supervisor", "Forklift Operator"],
    machines: ["Barcode scanner", "Forklift / stacker", "Hand pallet truck", "Weighing scale"],
    machinesLabel: "Tools & equipment",
    controls: ["SAP MM / WM", "Tally Prime", "Excel", "WMS software"],
    skills: ["Goods receipt (GRN)", "Material issue & return", "Bin location management", "Stock verification & cycle count", "FIFO / FEFO", "Inventory reconciliation", "Non-moving stock reporting", "Scrap & rejection handling", "Material requisition processing"],
    practices: ["FIFO", "5S", "Material handling safety", "Returnable packaging tracking"],
    bullets: [
      "Received materials with GRN in SAP and verified quantity against PO and invoice",
      "Issued materials to production against requisitions and kept bin locations updated",
      "Conducted cycle counts and reconciled stock with system records",
      "Reported non-moving and slow-moving inventory to help reduce stock value",
    ],
    summary: "Stores Executive experienced in GRN, material issue, bin management and stock reconciliation in SAP, keeping inventory accurate and production supplied on time.",
  }),
  office({
    id: "logistics", dept: "Stores & Logistics",
    label: "Logistics / Dispatch / EXIM",
    keys: ["logistics", "dispatch", "shipping", "exim", "export", "import", "transport", "freight", "packing", "supplychain", "scm"],
    titles: ["Dispatch Executive", "Logistics Executive", "Logistics Coordinator", "EXIM Executive", "Packing Supervisor", "Supply Chain Executive", "Logistics Manager"],
    machines: ["E-way bill portal", "E-invoice portal", "ICEGATE", "Transporter / freight forwarder portals"],
    controls: ["SAP SD / MM", "Tally Prime", "Excel"],
    skills: ["Dispatch planning", "Invoice & delivery challan preparation", "E-way bill generation", "Transporter coordination", "Freight negotiation", "Export documentation", "Customs clearance coordination", "Packing standards", "Delivery tracking & POD"],
    practices: ["Incoterms", "GST e-way bill rules", "Export packing (ISPM-15)", "Returnable bin tracking"],
    bullets: [
      "Planned daily dispatches as per customer schedules and ensured on-time delivery",
      "Prepared invoices, delivery challans and e-way bills for every shipment",
      "Coordinated with freight forwarders and CHAs for export and import shipments",
      "Negotiated freight rates with transporters to reduce logistics cost",
    ],
    summary: "Logistics Executive experienced in dispatch planning, e-way bills, transporter coordination and export-import documentation, ensuring on-time, compliant deliveries to customers.",
  }),

  // ======================= TAXATION / ACCOUNTS =======================
  office({
    id: "taxation", dept: "Taxation",
    label: "Taxation / Accounts",
    keys: ["tax", "taxation", "gst", "gstr", "tds", "incometax", "accounts", "accountant", "accounting", "finance", "tally", "sapfico", "fico", "audit", "payable", "receivable"],
    titles: ["Accounts Executive", "GST Executive", "Taxation Executive", "Accounts & Taxation Officer", "Senior Accountant", "Accounts Manager", "Finance Manager"],
    machines: ["GST portal", "TRACES", "Income tax e-filing portal", "E-invoice / e-way bill portal"],
    controls: ["Tally Prime", "SAP FICO", "Zoho Books", "ClearTax", "Excel"],
    skills: ["GST return filing (GSTR-1, GSTR-3B, GSTR-9)", "Input tax credit (ITC) reconciliation with GSTR-2B", "TDS deduction & returns (24Q / 26Q)", "Form 16 / 16A issue", "E-invoicing", "Accounts payable", "Accounts receivable", "Bank reconciliation", "Month-end closing", "Audit support (statutory / tax audit)", "Costing support"],
    practices: ["GST Act", "Income Tax Act (TDS)", "Job-work (ITC-04)", "Ind AS / accounting standards basics"],
    bullets: [
      "Filed monthly GSTR-1 and GSTR-3B and annual GSTR-9 on time without penalties",
      "Reconciled input tax credit with GSTR-2B and followed up vendors on mismatches",
      "Deducted TDS, filed quarterly 24Q / 26Q returns and issued Form 16 / 16A",
      "Handled accounts payable, receivable and bank reconciliation in Tally / SAP",
      "Supported statutory and tax audits with schedules and documents",
    ],
    summary: "Accounts & Taxation professional experienced in GST and TDS compliance, ITC reconciliation, payables, receivables and audit support in Tally and SAP for a manufacturing company.",
  }),

  // ======================= HUMAN RESOURCES =======================
  office({
    id: "hr", dept: "Human Resources",
    label: "Human Resources",
    keys: ["hr", "hrbp", "hrd", "humanresource", "humanresources", "personnel", "payroll", "ir", "industrialrelations", "welfare", "compliance", "statutory", "hrgeneralist", "training"],
    titles: ["HR Executive", "HR Generalist", "Payroll Executive", "HR & IR Officer", "Personnel Officer", "Training Coordinator", "HR Business Partner", "HR Manager"],
    machines: ["EPFO portal", "ESIC portal", "Biometric attendance system"],
    controls: ["greytHR", "Darwinbox", "Keka", "SAP SuccessFactors", "Zoho People", "Excel"],
    skills: ["Payroll processing", "PF & ESI compliance", "Attendance & leave management", "Onboarding & induction", "Employee relations", "Grievance handling", "Contract labour management", "Training need identification", "Performance appraisal coordination", "Exit formalities & F&F settlement", "HR MIS reporting"],
    practices: ["Factories Act", "Contract Labour Act", "Payment of Wages / Bonus / Gratuity", "Industrial Standing Orders", "POSH", "New labour codes"],
    bullets: [
      "Processed monthly payroll for shop-floor and staff employees with PF, ESI and PT deductions",
      "Handled statutory compliance and records under the Factories Act and Contract Labour Act",
      "Managed onboarding, induction and exit formalities including full and final settlement",
      "Resolved employee grievances and maintained harmonious industrial relations",
      "Coordinated training programmes and maintained the skill matrix for operators",
    ],
    summary: "HR Generalist with experience in payroll, PF/ESI compliance, onboarding, employee relations and training in a manufacturing plant, with good knowledge of factory labour laws.",
  }),
  office({
    id: "recruiter", dept: "Human Resources",
    label: "Recruitment / Talent Acquisition",
    keys: ["recruit", "recruiter", "recruitment", "talentacquisition", "ta", "hiring", "staffing", "headhunter", "campushiring"],
    titles: ["Recruiter", "Talent Acquisition Executive", "Talent Acquisition Specialist", "Talent Acquisition Manager", "Campus Hiring Coordinator", "Recruitment Consultant"],
    machines: ["Naukri Resdex", "LinkedIn Recruiter", "Indeed", "apna / WorkIndia", "Job fairs & ITI campuses"],
    controls: ["Naukri RMS", "Darwinbox", "Zoho Recruit", "Excel"],
    skills: ["End-to-end recruitment", "Blue-collar & shop-floor hiring", "Sourcing & screening", "Boolean search", "Interview scheduling", "Offer negotiation", "Campus & ITI hiring", "Apprentice (NAPS / NEEM) hiring", "Recruitment MIS & TAT tracking", "Vendor / consultant management"],
    practices: ["Background verification", "Offer & onboarding process", "Hiring TAT & cost-per-hire tracking"],
    bullets: [
      "Handled end-to-end hiring for machining, quality and staff roles within agreed TAT",
      "Sourced candidates through Naukri, LinkedIn, referrals and ITI / diploma campus drives",
      "Hired apprentices under NAPS / NEEM and coordinated their onboarding",
      "Maintained recruitment MIS on TAT, source mix and cost per hire",
    ],
    summary: "Talent Acquisition professional experienced in end-to-end hiring for manufacturing roles, from shop-floor operators and apprentices to engineers and staff, using job portals, campuses and referrals.",
  }),

  // ======================= ADMIN =======================
  office({
    id: "admin", dept: "Admin",
    label: "Administration / Facilities",
    keys: ["admin", "administration", "administrative", "facility", "facilities", "housekeeping", "security", "canteen", "frontoffice", "frontdesk", "receptionist", "guesthouse", "travel", "officeassistant"],
    titles: ["Admin Executive", "Admin Officer", "Facility Executive", "Front Office Executive", "Office Assistant", "Admin & Facility Manager", "Security Supervisor"],
    machines: ["Access control system", "CCTV", "Visitor management system", "Travel booking portals"],
    controls: ["Excel", "SAP (PR / PO for services)", "Google Workspace / MS Office"],
    skills: ["Facility management", "Housekeeping & security vendor management", "Canteen management", "Employee transport (bus routes)", "Travel & accommodation booking", "Guest & visitor management", "Stationery & asset management", "AMC management", "Statutory license renewals (factory license, fire NOC)", "Vendor bill processing"],
    practices: ["Fire safety & mock drills", "Contract labour compliance for vendors", "5S in office areas"],
    bullets: [
      "Managed housekeeping, security and canteen vendors for a plant of 1,000+ employees",
      "Planned employee bus routes and handled transport vendor billing",
      "Arranged travel, accommodation and guest visits for customers and management",
      "Tracked AMCs and renewed statutory licenses such as factory license and fire NOC on time",
    ],
    summary: "Admin Executive experienced in facility, canteen, transport, security and vendor management for a manufacturing plant, keeping daily operations smooth and statutory renewals on time.",
  }),
];

// ---------- Brands (typing a brand suggests "Title – Brand") ----------
const BRANDS = [
  { k: "mazak", n: "Mazak", f: ["vmc", "hmc", "turning"] },
  { k: "haas", n: "Haas", f: ["vmc", "turning"] },
  { k: "dmgmori", n: "DMG Mori", f: ["fiveaxis", "vmc"] },
  { k: "makino", n: "Makino", f: ["hmc", "vmc"] },
  { k: "okuma", n: "Okuma", f: ["turning", "hmc"] },
  { k: "doosan", n: "Doosan", f: ["turning", "hmc"] },
  { k: "dnsolutions", n: "DN Solutions", f: ["turning", "hmc"] },
  { k: "fanuc", n: "Fanuc", f: ["vmc", "turning"] },
  { k: "siemens", n: "Siemens", f: ["vmc", "turning"] },
  { k: "heidenhain", n: "Heidenhain", f: ["fiveaxis", "vmc"] },
  { k: "acemicromatic", n: "Ace Micromatic", f: ["turning", "vmc"] },
  { k: "ace", n: "Ace Micromatic", f: ["turning", "vmc"] },
  { k: "lmw", n: "LMW", f: ["turning", "vmc"] },
  { k: "jyoti", n: "Jyoti", f: ["vmc", "turning"] },
  { k: "bfw", n: "BFW", f: ["vmc", "hmc"] },
  { k: "hurco", n: "Hurco", f: ["vmc"] },
  { k: "hermle", n: "Hermle", f: ["fiveaxis"] },
  { k: "zeiss", n: "Zeiss", f: ["cmm"] },
  { k: "hexagon", n: "Hexagon", f: ["cmm"] },
];

// ---------- Matching helpers ----------
const squash = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const words = (s) => String(s || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

const TITLE_DEPT = {};
MACHINING_FAMILIES.forEach((f) => f.titles.forEach((t) => { if (!TITLE_DEPT[t]) TITLE_DEPT[t] = f.dept; }));

function brandHits(value) {
  const q = squash(value);
  const w = words(value);
  return BRANDS.filter((b) => (b.k.length <= 3 ? w.includes(b.k) : q.includes(b.k)));
}

function scoreFamily(f, value) {
  const q = squash(value);
  const w = words(value);
  if (!q) return 0;
  let score = 0;
  f.titles.forEach((t) => {
    const st = squash(t);
    if (st === q) score = Math.max(score, 100);
    else if (st.length >= 5 && q.includes(st)) score = Math.max(score, 85);
    else if (q.length >= 3 && st.startsWith(q)) score = Math.max(score, 60);
    else if (q.length >= 4 && st.includes(q)) score = Math.max(score, 45);
  });
  f.keys.forEach((k) => {
    if (k.length <= 3) {
      // short keys must be a whole word: "hr executive", "qc inspector", "ndt level 2"
      if (w.includes(k)) score = Math.max(score, q === k ? 90 : 75);
    } else if (q === k) score = Math.max(score, 90);
    else if (q.includes(k)) score = Math.max(score, 70);
    else if (q.length >= 4 && k.startsWith(q)) score = Math.max(score, 50);
  });
  if (brandHits(value).some((b) => b.f.includes(f.id))) score = Math.max(score, 55);
  return score;
}

// Families that match what was typed (most specific first, at most 2)
export function matchFamilies(value) {
  const scored = MACHINING_FAMILIES
    .map((f) => ({ f, s: scoreFamily(f, value) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  if (!scored.length) return [];
  const top = scored[0].s;
  return scored.filter((x) => x.s >= top * 0.8).slice(0, 2).map((x) => x.f);
}

const POPULAR = [
  "VMC Setter cum Operator", "CNC Turning Setter cum Operator", "Quality Inspector", "CMM Programmer",
  "Assembly Fitter", "Tool Presetter", "Tool Crib Attendant", "NDT Level II Technician",
  "Project Engineer", "Purchase Executive", "Storekeeper", "Dispatch Executive",
  "Sales Engineer", "Business Development Executive", "GST Executive", "HR Executive", "Admin Executive",
];

// Job title suggestions for the dropdown
export function getTitleSuggestions(value, limit = 8) {
  const q = squash(value);
  if (!q) return POPULAR.slice(0, limit);
  const out = new Set();
  // brand combos, e.g. "VMC Setter – Mazak"
  brandHits(value).forEach((b) => {
    b.f.slice(0, 2).forEach((id) => {
      const fam = MACHINING_FAMILIES.find((f) => f.id === id);
      if (fam) fam.titles.slice(0, 2).forEach((t) => out.add(`${t} – ${b.n}`));
    });
  });
  // titles that start with / contain what was typed
  const all = MACHINING_FAMILIES.flatMap((f) => f.titles);
  if (q.length >= 2) all.filter((t) => squash(t).startsWith(q)).forEach((t) => out.add(t));
  if (q.length >= 4) all.filter((t) => squash(t).includes(q)).forEach((t) => out.add(t));
  // other titles from the matched role families
  matchFamilies(value).forEach((f) => f.titles.forEach((t) => out.add(t)));
  return [...out].filter((t) => squash(t) !== q).slice(0, limit);
}

// ---------- Styles ----------
const C = { navy: "#0b2a5b", blue: "#1d5fd1", pale: "#eaf2ff", line: "#d6e2f3", muted: "#5b6b82", text: "#1f2d3d" };
const s = {
  wrap: { position: "relative" },
  list: { position: "absolute", top: "100%", left: 0, right: 0, zIndex: 30, marginTop: 4, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 8, boxShadow: "0 8px 20px rgba(11,42,91,0.12)", maxHeight: 280, overflowY: "auto", padding: 4 },
  listHead: { padding: "6px 10px 4px", fontSize: 11.5, fontWeight: 600, color: C.muted },
  opt: (active) => ({ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 10px", borderRadius: 6, cursor: "pointer", fontSize: 13.5, color: C.navy, background: active ? C.pale : "transparent" }),
  optDept: { fontSize: 11.5, color: C.muted, whiteSpace: "nowrap" },
  hint: { margin: "8px 0 0", fontSize: 12.5, color: C.muted },
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
// Drop-in replacement for <input ...>. Keeps the same value / onChange / name / id props.
export function MachiningTitleInput({ value = "", onChange, placeholder = "e.g. VMC Setter, Quality Inspector, HR Executive", ...rest }) {
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
        onFocus={(e) => { setOpen(true); if (rest.onFocus) rest.onFocus(e); }}
        onBlur={(e) => { setTimeout(() => setOpen(false), 150); if (rest.onBlur) rest.onBlur(e); }}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={open && options.length > 0}
        aria-autocomplete="list"
      />
      {open && options.length > 0 && (
        <div style={s.list} role="listbox">
          {!String(value).trim() && <div style={s.listHead}>Popular roles</div>}
          {options.map((t, i) => (
            <div
              key={t}
              role="option"
              aria-selected={i === active}
              style={s.opt(i === active)}
              onMouseDown={(e) => { e.preventDefault(); pick(t); }}
              onMouseEnter={() => setActive(i)}
            >
              <span>{t}</span>
              {TITLE_DEPT[t] && <span style={s.optDept}>{TITLE_DEPT[t]}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- 2) Suggestion panel ----------
const uniq = (arr) => [...new Set(arr.filter(Boolean))];
const skillName = (x) => (typeof x === "string" ? x : (x && (x.name || x.label)) || "");

export function MachiningSuggestionPanel({ role = "", existingSkills = [], onAddSkill, onAddBullet, onUseSummary }) {
  const families = useMemo(() => matchFamilies(role), [role]);
  const [localAdded, setLocalAdded] = useState([]);

  const have = useMemo(() => {
    const list = Array.isArray(existingSkills) ? existingSkills.map(skillName) : String(existingSkills || "").split(",");
    return new Set([...list, ...localAdded].map((x) => String(x).trim().toLowerCase()).filter(Boolean));
  }, [existingSkills, localAdded]);

  if (!String(role).trim()) {
    return <p style={s.hint}>Type your job title above to see ready-made skills and work points for your role.</p>;
  }
  if (!families.length) {
    return <p style={s.hint}>No ready-made suggestions for this title yet. Pick a title from the list, or describe your work in your own words.</p>;
  }

  const first = families[0];
  const machines = uniq(families.flatMap((f) => f.machines || []));
  const controls = uniq(families.flatMap((f) => f.controls || []));
  const skills = uniq(families.flatMap((f) => f.skills || []));
  const instruments = uniq(families.flatMap((f) => f.instruments ?? INSTRUMENTS));
  const practices = uniq(families.flatMap((f) => f.practices ?? SHOPFLOOR));
  const bullets = uniq(families.flatMap((f) => f.bullets || []));
  const summaries = uniq(families.map((f) => f.summary));

  const add = (it) => {
    if (have.has(it.toLowerCase())) return;
    setLocalAdded((a) => [...a, it]);
    onAddSkill(it);
  };

  const ChipGroup = ({ title, items }) =>
    items.length === 0 ? null : (
      <div style={s.group}>
        <div style={s.groupTitle}>{title}</div>
        <div style={s.chips}>
          {items.map((it) => {
            const added = have.has(it.toLowerCase());
            return (
              <button key={it} type="button" style={s.chip(added)} onClick={() => add(it)} aria-pressed={added}>
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
      <p style={s.sub}>Tap only what you have actually worked on. Specific tools, software and skills help recruiters find you.</p>

      {onAddSkill && (
        <>
          <ChipGroup title={first.machinesLabel || "Machines you have worked on"} items={machines} />
          <ChipGroup title={first.controlsLabel || "Controls / software"} items={controls} />
          <ChipGroup title="Skills" items={skills} />
          <ChipGroup title={first.instrumentsLabel || "Measuring instruments"} items={instruments} />
          <ChipGroup title={first.practicesLabel || "Shop floor practices"} items={practices} />
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

      {onUseSummary && summaries.length > 0 && (
        <div style={s.group}>
          <div style={s.groupTitle}>Sample profile summary</div>
          {summaries.map((t) => (
            <div key={t} style={s.bullet}>
              <span>{t}</span>
              <button type="button" style={s.addBtn} onClick={() => onUseSummary(t)}>Use</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MachiningSuggestionPanel;