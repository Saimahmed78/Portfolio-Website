import { useState } from "react";
import { frontendSkills, backendSkills, devOpsSkills, softSkills } from "../data/skills.js";
import { SkillMatrix, SoftSkillsTicker } from "../components/Skill.jsx";

export function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");

  const tabs = [
    { id: "Frontend", data: frontendSkills },
    { id: "Backend", data: backendSkills },
    { id: "DevOps", data: devOpsSkills },
  ];

  return (
    <div className="section section-tight animate-fadeIn" style={{ paddingTop: "100px", paddingBottom: "40px" }}>
      <div className="section-label">Technical Competency</div>
      <h1 className="section-title" style={{ fontSize: "var(--text-display)", letterSpacing: "-0.03em" }}>
        Engineering <span className="hero-title-accent">Matrix</span>
      </h1>
      <p className="section-sub mb-12">
        A structured overview of my technical capabilities across the stack, categorized by proficiency.
      </p>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-[var(--border-card)] pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-4 font-display text-lg font-semibold transition-colors relative whitespace-nowrap bg-transparent border-none cursor-pointer outline-none ${
              activeTab === tab.id ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {tab.id}
            {activeTab === tab.id && (
              <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-[var(--accent-primary)] rounded-t-full shadow-[0_0_12px_var(--accent-glow-heavy)]" />
            )}
          </button>
        ))}
      </div>

      {/* Matrix */}
      <div className="min-h-[400px]">
        {tabs.map((tab) => (
          activeTab === tab.id && (
            <SkillMatrix key={tab.id} skills={tab.data} />
          )
        ))}
      </div>

      {/* Soft Skills */}
      <div className="mt-20 pt-16 border-t border-[var(--border-card)]">
        <h2 className="font-display text-2xl font-bold mb-8 text-[var(--text-primary)]">Core Traits</h2>
        <SoftSkillsTicker skills={softSkills} />
      </div>
    </div>
  );
}
