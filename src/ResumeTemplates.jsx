import React from "react";

export const TEMPLATES = [
  {
    id: "shopfloor",
    name: "Shop Floor Classic",
    bestFor: "Machine operators, technicians, plant staff",
    order: ["summary", "skills", "experience", "education"],
    accent: "#C08A3E",
  },
  {
    id: "trades",
    name: "Skilled Trades",
    bestFor: "Electricians, fitters, supervisors, certified roles",
    order: ["summary", "experience", "skills", "education"],
    accent: "#4A5568",
  },
  {
    id: "corporate",
    name: "Corporate Professional",
    bestFor: "Office, sales, HR, and management roles",
    order: ["summary", "experience", "education", "skills"],
    accent: "#1B2430",
  },
];

/**
 * A small CSS-only "paper" thumbnail so we don't depend on static image assets.
 * Swap for a real <img> once design assets exist.
 */
function TemplateThumb({ accent }) {
  return (
    <div className="bg-white rounded shadow-sm border border-black/5 p-3 h-40 flex flex-col gap-1.5">
      <div className="h-2 w-2/3 rounded-sm" style={{ backgroundColor: accent }} />
      <div className="h-1.5 w-1/3 rounded-sm bg-gray-200 mb-2" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-1 rounded-sm bg-gray-100" style={{ width: `${85 - i * 8}%` }} />
      ))}
    </div>
  );
}

export default function ResumeTemplates({ onUseBuilder }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1" style={{ color: "#1B2430" }}>
        Choose a template
      </h2>
      <p className="text-sm mb-6" style={{ color: "#4A5568" }}>
        Each one loads straight into the builder with the section order that works best for that kind of role —
        you can still rearrange or edit anything.
      </p>

      <div className="grid sm:grid-cols-3 gap-5">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-black/5 p-4 flex flex-col">
            <TemplateThumb accent={t.accent} />
            <h3 className="mt-4 font-medium" style={{ color: "#1B2430" }}>
              {t.name}
            </h3>
            <p className="text-xs mt-1 mb-4 flex-1" style={{ color: "#4A5568" }}>
              {t.bestFor}
            </p>
            <button
              onClick={() => onUseBuilder(t)}
              className="text-sm font-medium py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#C08A3E", color: "#1B2430" }}
            >
              Use this template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}