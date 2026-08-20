import React, { useState } from "react";
import ResumeTemplates from "./ResumeTemplates";
import ResumeBuilder from "./ResumeBuilder";

/**
 * ResumeServices — top-level page for the "Resume Building" service.
 * Drop this in as a route, e.g. <Route path="/services/resume-building" element={<ResumeServices />} />
 * and link to it from the Services tab.
 *
 * Assumes Tailwind CSS is available in the project. If not, the classNames
 * below map 1:1 to simple CSS rules — ping me and I'll produce a plain-CSS version.
 */
export default function ResumeServices() {
  const [activeTab, setActiveTab] = useState("templates"); // 'templates' | 'builder'
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    setActiveTab("builder");
  };

  return (
    <div style={{ "--ink": "#1B2430", "--paper": "#F7F5F0", "--brass": "#C08A3E", "--slate": "#4A5568" }}
      className="min-h-screen" >
      <div style={{ backgroundColor: "var(--ink)" }} className="text-white">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-10">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--brass)" }}>
            CoreTech Talents · Services
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Build a resume that gets you shortlisted</h1>
          <p className="max-w-2xl" style={{ color: "#C9CFDA" }}>
            Pick a ready-made template built for shop-floor and corporate roles alike, or use the
            builder below to put one together in minutes — no design skills needed.
          </p>

          {/* Tabs */}
          <div className="mt-8 inline-flex rounded-lg overflow-hidden border border-white/15">
            <button
              onClick={() => setActiveTab("templates")}
              className="px-5 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeTab === "templates" ? "var(--brass)" : "transparent",
                color: activeTab === "templates" ? "var(--ink)" : "#fff",
              }}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab("builder")}
              className="px-5 py-2.5 text-sm font-medium transition-colors border-l border-white/15"
              style={{
                backgroundColor: activeTab === "builder" ? "var(--brass)" : "transparent",
                color: activeTab === "builder" ? "var(--ink)" : "#fff",
              }}
            >
              Build Your Own
            </button>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#EDEAE2" }} className="min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {activeTab === "templates" ? (
            <ResumeTemplates onUseBuilder={handleUseTemplate} />
          ) : (
            <ResumeBuilder template={selectedTemplate} />
          )}
        </div>
      </div>
    </div>
  );
}