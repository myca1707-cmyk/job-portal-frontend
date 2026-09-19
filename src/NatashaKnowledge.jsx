// NatashaKnowledge.js — what Natasha knows about the Resume Builder, roles and qualifications.
// Use: import { natashaAnswer } from "./NatashaKnowledge";
//      const reply = natashaAnswer(userText);   // returns a string, or null if this file has no answer
// If it returns null, Natasha's existing FAQ answers are used as before.
// Role and qualification answers are read live from MachiningSuggestions / EducationSuggestions,
// so Natasha stays up to date whenever those lists grow.

import { MACHINING_FAMILIES, matchFamilies } from "./MachiningSuggestions";
import { EDUCATION_CATEGORIES } from "./EducationSuggestions";

const BUILDER_LINK = "/services/resume-building";

// ---------- helpers ----------
const norm = (s) => " " + String(s || "").toLowerCase().replace(/[^a-z0-9+#.&/ ]/g, " ").replace(/\s+/g, " ").trim() + " ";
const hasAny = (t, words) => words.some((w) => t.includes(w));
const list = (items, n = 8) => items.slice(0, n).map((x) => "• " + x).join("\n");
const uniq = (a) => [...new Set(a)];

const TOTAL_ROLES = MACHINING_FAMILIES.reduce((n, f) => n + f.titles.length, 0);
const TOTAL_QUALS = EDUCATION_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
const DEPTS = uniq(MACHINING_FAMILIES.map((f) => f.dept));

// Industry names people type -> department labels used in the role data
const INDUSTRY_WORDS = [
  { words: [" it jobs", " it roles", " it job", " it role", " for it ", " in it ", " it industry", " it sector", " it company", " it field", "software", "information technology", "tech job", "developer", "coding"], depts: ["IT – Software", "IT – Data", "IT – Infrastructure", "IT – Enterprise Apps", "IT – Design", "IT – Management"] },
  { words: ["bpo", "ites", "call center", "call centre", "customer support"], depts: ["ITES / BPO"] },
  { words: ["pharma", "pharmaceutical", "medicine company", "drug"], depts: ["Pharma", "Pharma / Life Sciences", "Pharma Sales", "Pharma / Healthcare"] },
  { words: ["facility", "facilities", "housekeeping", "facilitation", "fm "], depts: ["Facility Management"] },
  { words: ["security"], ids: ["security", "cyber"] },
  { words: ["safety", "ehs", "hse"], depts: ["EHS"] },
  { words: ["hospital", "healthcare", "health care", "medical", "nurse", "nursing"], depts: ["Healthcare"] },
  { words: ["bank", "banking", "finance", "insurance", "bfsi", "nbfc"], depts: ["Banking & Finance"] },
  { words: ["retail", "shop", "showroom", "store"], depts: ["Retail"] },
  { words: ["delivery", "driver", "driving"], depts: ["Delivery & Driving"] },
  { words: ["hotel", "restaurant", "hospitality", "chef"], depts: ["Hospitality"] },
  { words: ["teach", "school", "college", "education", "trainer"], depts: ["Education"] },
  { words: ["marketing", "digital marketing"], depts: ["Marketing"] },
  { words: ["design", "media", "video", "graphic"], depts: ["Media & Design"] },
  { words: ["construction", "civil", "building"], depts: ["Construction"] },
  { words: ["electronics", "electrical"], depts: ["Electronics / Electrical"] },
  { words: ["textile", "garment", "tailor"], depts: ["Textile & Garments"] },
  { words: ["food", "fmcg"], depts: ["Food & FMCG"] },
  { words: ["chemical", "process plant", "refinery"], depts: ["Chemical / Process"] },
  { words: ["automobile service", "workshop", "mechanic", "car service"], depts: ["Automobile Service"] },
  { words: ["telecom"], depts: ["Telecom"] },
  { words: ["solar", "power", "energy"], depts: ["Energy / Power"] },
  { words: ["legal", "law", "lawyer"], depts: ["Legal"] },
  { words: ["real estate", "property"], depts: ["Real Estate"] },
  { words: ["beauty", "salon", "fitness", "gym", "yoga"], depts: ["Beauty & Wellness"] },
  { words: ["aviation", "airline", "airport"], depts: ["Aviation"] },
  { words: ["data entry", "back office"], depts: ["General Office"] },
  { words: ["ngo", "csr", "social work"], depts: ["Social Sector"] },
  { words: ["machine shop", "machining", "cnc", "manufacturing", "factory", "shop floor", "production"], depts: ["Machining", "Quality", "Assembly", "Tool Crib", "Presetting", "Tool Room", "Maintenance", "Fabrication", "Special Process", "NDT", "Project Engineering"] },
  { words: ["office", "hr ", "human resource", "purchase", "procurement", "accounts", "tax", "gst", "admin", "stores", "logistics", "sales"], depts: ["Human Resources", "Procurement", "Taxation", "Admin", "Stores & Logistics", "Sales", "Business Development"] },
];

function industryFamilies(t) {
  const hits = INDUSTRY_WORDS.filter((g) => hasAny(t, g.words));
  const depts = hits.flatMap((g) => g.depts || []);
  const ids = hits.flatMap((g) => g.ids || []);
  const byId = ids.map((id) => MACHINING_FAMILIES.find((f) => f.id === id)).filter(Boolean);
  return uniq([...byId, ...MACHINING_FAMILIES.filter((f) => depts.includes(f.dept))]);
}

// Pull a role name out of "skills for qc chemist", "work points for staff nurse" etc.
function roleFrom(text) {
  const t = String(text || "").toLowerCase();
  const m = t.match(/(?:for|as|of|in|a|an)\s+(?:a |an |the )?([a-z0-9 .+#/&-]{2,40})\??$/);
  const guess = m ? m[1].trim() : t;
  const fams = matchFamilies(guess);
  return fams.length ? { fams, guess } : null;
}

// ---------- fixed answers about the Resume Builder ----------
const FAQ = [
  {
    any: ["resume builder", "build resume", "build my resume", "create resume", "make resume", "make a resume", "create a resume", "cv maker", "resume maker", "biodata", "make cv", "create cv"],
    answer: () =>
      `Yes! CoreTech Talents has a free Resume Builder. It works for every job — shop floor, IT, pharma, healthcare, office and service roles.\n\nOpen it from Services → Resume Building (or go to ${BUILDER_LINK}). It takes about 5 minutes and you get a ready PDF.`,
  },
  {
    any: ["free", "cost", "charge", "price", "pay "],
    need: ["resume", "builder", "cv"],
    answer: () => "The Resume Builder is 100% free. No payment and no login are needed to build and download your resume.",
  },
  {
    any: ["login", "sign up", "signup", "register", "account"],
    need: ["resume", "builder", "cv"],
    answer: () =>
      "You don't need to log in to build or download your resume. After downloading, you can create a free candidate account to upload it, apply for jobs and get matched with recruiters.",
  },
  {
    any: ["steps", "how does", "how do i use", "how to use", "process", "how it works"],
    need: ["resume", "builder", "cv"],
    answer: () =>
      "The Resume Builder has 5 simple steps:\n• Personal – name, mobile, email, location, photo and profile summary\n• Experience – each job with ready-made work points\n• Education – courses, marks, certifications\n• Skills – tap suggestions or type your own, plus languages known\n• Preview & Download – choose a design and save as PDF",
  },
  {
    any: ["template", "design", "format", "layout", "style"],
    need: ["resume", "builder", "cv", "template", "design"],
    answer: () =>
      "You can choose from 4 resume designs:\n• Modern – blue sidebar with your photo\n• Classic – simple and best for job portals (ATS-friendly)\n• Minimal – clean with a green accent\n• Executive – bold header for senior roles\nYou can switch designs anytime on the Preview step.",
  },
  {
    any: ["photo", "picture", "image"],
    need: ["resume", "builder", "cv", "photo"],
    answer: () => "You can add a profile photo (under 2 MB) in the Personal step. It appears only on the Modern design; the other designs are text-only, which many companies prefer.",
  },
  {
    any: ["download", "pdf", "save as pdf", "print"],
    need: ["resume", "builder", "cv", "download", "pdf"],
    answer: () =>
      "On the last step, tap Download PDF. In the print window, choose \"Save as PDF\" as the printer and save. Only your resume is saved — not the website around it.",
  },
  {
    any: ["save", "saved", "lose", "lost", "continue later", "draft", "come back"],
    need: ["resume", "builder", "cv", "save", "draft"],
    answer: () =>
      "Your details save automatically on your own device as you type. Come back later on the same phone or computer and browser, and everything will still be there. Use \"Start over\" to clear it and begin a new resume.",
  },
  {
    any: ["privacy", "private", "safe", "secure", "data", "share my"],
    need: ["resume", "builder", "cv", "data", "details"],
    answer: () =>
      "While you build, your resume stays only on your device — it isn't sent to our servers. It's shared with recruiters only if you create an account and upload it yourself.",
  },
  {
    any: ["job title", "suggestion", "suggest", "dropdown"],
    need: ["title", "suggest", "role", "dropdown"],
    answer: () =>
      `When you type your job title, you'll see suggestions from ${TOTAL_ROLES}+ job titles across ${DEPTS.length} industries and departments. Pick one, and the builder shows matching skills, tools, software, ready-made work points and a sample profile summary you can add with one tap.`,
  },
  {
    any: ["work point", "work points", "bullet", "responsibilities", "what did you do", "job description", "duties"],
    answer: () =>
      "In the Experience step, type your job title and you'll see ready-made work points for that role. Tap Add to put them into your resume, then edit them to match what you actually did.",
  },
  {
    any: ["summary", "objective", "about me", "profile summary"],
    answer: () =>
      "In the Personal step, type your job title and a sample profile summary for that role appears below the summary box. Tap Use to add it, then change a few words to make it your own.",
  },
  {
    any: ["not listed", "not in the list", "can't find", "cannot find", "missing", "my role is not", "not available"],
    answer: () => "No problem — just type your job title or qualification exactly as you want it. The suggestions are only there to help; you can always write your own.",
  },
  {
    any: ["fresher", "no experience", "first job", "student", "just passed", "just completed"],
    answer: () =>
      "Freshers can skip the Experience step or add apprenticeship, internship or in-plant training there. Focus on Education, Skills and Certifications — the builder suggests skills for the role you want.",
  },
  {
    any: ["certification", "certificate", "training", "course completed"],
    need: ["resume", "builder", "cv", "add", "where"],
    answer: () => "Add certifications and trainings in the Education step, in the \"Certifications & training\" box — one per line. They appear in their own section on your resume.",
  },
  {
    any: ["language", "languages known", "tamil", "hindi"],
    need: ["resume", "builder", "cv", "language"],
    answer: () => "Add the languages you know (for example Tamil, English, Hindi) in the Skills step under \"Languages known\".",
  },
  {
    any: ["percentage", "cgpa", "marks", "grade", "score"],
    answer: () => "In the Education step, each qualification has a \"Percentage / CGPA\" box. It's optional — fill it if your marks are good.",
  },
  {
    any: ["mobile", "phone"],
    need: ["use", "work on", "build on", "from my"],
    answer: () => "Yes, the Resume Builder works on mobile phones as well as computers.",
  },
  {
    any: ["ats", "applicant tracking"],
    answer: () => "For online job portals and ATS systems, choose the Classic design — it's simple and easy for software to read. Use the job title and skill suggestions so your resume has the right keywords.",
  },
  {
    any: ["upload", "attach"],
    need: ["resume", "cv"],
    answer: () =>
      "After downloading your resume, create a free candidate account, then open My Resume and upload the PDF (up to 5 MB). Recruiters can then find you and you can apply for jobs.",
  },
  {
    any: ["industries", "which jobs", "what jobs", "which roles", "what roles", "all jobs", "every job"],
    need: ["resume", "builder", "cover", "support", "roles", "jobs", "industries"],
    answer: () =>
      `The Resume Builder covers ${TOTAL_ROLES}+ job titles, including:\n• Machine shop: VMC, CNC, QC, CMM, NDT, tool crib, presetting, assembly\n• IT: software, testing, data, cloud, IT support, cyber security\n• Pharma: production, QC, QA, regulatory, medical rep\n• Facility management, security and safety\n• Healthcare, banking, retail, hotel, teaching, construction, delivery and many more\nJust type your role to see suggestions.`,
  },
  {
    any: ["qualification", "qualifications", "education", "degree", "courses", "course list"],
    need: ["resume", "builder", "list", "which", "what", "all", "support", "available"],
    answer: () =>
      `The Education step has ${TOTAL_QUALS} qualifications in ${EDUCATION_CATEGORIES.length} categories — from 10th, ITI and diploma to B.E., B.Sc, B.Com, MBA, nursing, pharmacy, Ph.D, IT certifications, licences and Skill India courses. Click the course box to browse by category, or type short forms like "be", "bsc", "mba hr" or "iti".`,
  },
];

// ---------- dynamic answers from the role and education data ----------
function dynamicAnswer(raw, t) {
  // "skills for qc chemist", "what skills should a staff nurse add"
  if (hasAny(t, ["skill", "skills", "keywords", "tools", "software"])) {
    const r = roleFrom(raw);
    if (r) {
      const f = r.fams[0];
      return `Skills for ${f.label} that you can add in the Resume Builder:\n${list(f.skills, 8)}\n\nIn the builder, type your job title and tap these as chips.`;
    }
  }
  // "work points for a delivery executive"
  if (hasAny(t, ["work point", "bullet", "responsibilit", "duties"])) {
    const r = roleFrom(raw);
    if (r) {
      const f = r.fams[0];
      return `Sample work points for ${f.label}:\n${list(f.bullets, 4)}\n\nThe Resume Builder lets you add these with one tap.`;
    }
  }
  // "roles in pharma", "do you have IT jobs in the resume builder", "roles for facility management"
  if (hasAny(t, ["role", "roles", "job title", "titles", "jobs", "positions", "designation"])) {
    const fams = industryFamilies(t);
    if (fams.length) {
      const titles = uniq(fams.flatMap((f) => f.titles));
      if (titles.length) {
        return `Yes! The Resume Builder has ${titles.length} job titles for this area, for example:\n${list(titles, 10)}\n\nType your role in the job title box to get matching skills and work points.`;
      }
    }
  }
  // "qualifications for pharmacy", "nursing courses", "do you have iti trades"
  if (hasAny(t, ["qualification", "course", "courses", "degree", "education", "certification", "certificate", "licence", "license", "trade"])) {
    const hits = EDUCATION_CATEGORIES.filter(
      (c) => t.includes(" " + c.label.toLowerCase().split(/[ (/&]/)[0] + " ") || c.keys.some((k) => k.length > 2 && t.includes(" " + k + " "))
    );
    if (hits.length) {
      const c = hits[0];
      return `${c.label} qualifications in the Resume Builder (${c.items.length} options), for example:\n${list(c.items, 8)}\n\nIn the Education step, click the course box and choose "${c.label}".`;
    }
  }
  return null;
}

// ---------- main entry ----------
export function natashaAnswer(userText) {
  const raw = String(userText || "").trim();
  if (!raw) return null;
  const t = norm(raw);

  // specific data answers first (they name a role, industry or course)
  const dyn = dynamicAnswer(raw, t);
  if (dyn) return dyn;

  // then fixed Resume Builder answers, best match wins
  let best = null;
  let bestScore = 0;
  FAQ.forEach((f) => {
    const hits = f.any.filter((w) => t.includes(w)).length;
    if (!hits) return;
    if (f.need && !hasAny(t, f.need)) return;
    const score = hits + (f.need ? 1 : 0);
    if (score > bestScore) { best = f; bestScore = score; }
  });
  return best ? best.answer() : null;
}

// Quick-reply chips Natasha can show
export const NATASHA_RESUME_QUICK_REPLIES = [
  "Build my resume",
  "Is the resume builder free?",
  "Which jobs does it cover?",
  "Roles for IT",
  "Roles for pharma",
  "Skills for QC chemist",
  "Qualifications for nursing",
  "How do I download PDF?",
];

export default natashaAnswer;