import { SkillCategory } from "../component/skill.jsx";
import "../styles/skills.css";

export function Skills() {
  const frontendSkills = [
    { name: "HTML5", description: "Semantic, accessible structure" },
    {
      name: "CSS3",
      description: "Responsive layouts, transitions, animations",
    },
    {
      name: "JavaScript (Advanced)",
      description: "Async, Event Loop, Execution Order, Polyfills",
    },
    { name: "React.js", description: "Components, Hooks, TanStack Router" },
    { name: "Vite", description: "Fast bundling & modern dev setup" },
    { name: "Pure CSS", description: "Clean component styling" },
    { name: "Responsive Design", description: "Mobile-first & accessible" },
  ];

  const backendSkills = [
    { name: "Node.js", description: "Express middleware & API development" },
    { name: "MongoDB", description: "Mongoose models, queries, schemas" },
    {
      name: "Authentication",
      description: "Register, login, email verification, password reset",
    },
    {
      name: "Docker & Redis",
      description: "For Judge0 setup (custom runners)",
    },
  ];

  const softSkills = [
    "🧠 Curious & Self-Motivated — I explore deeply, not superficially",
    "🗣️ Clear Communicator — I break down complex ideas simply",
    "🛠️ Builder’s Mindset — I learn by building, breaking, and rebuilding",
    "🧱 Structured Thinker — I approach problems like an engineer",
    "🧭 Leadership Potential — I mentor and inspire learning-focused environments",
  ];
  return (
    <>
      <section className="skills-page">
        <h1 className="page-title">My Technical Skillset</h1>

        <div className="skills-grid">
          <SkillCategory title="Frontend Skills" skills={frontendSkills} />
          <SkillCategory title="Backend Skills" skills={backendSkills} />
          <SkillCategory title="Soft Skills" skills={softSkills} />

        </div>
      </section>
    </>
  );
}
