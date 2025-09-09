import { frontendSkills, backendSkills, softSkills } from "../data/skills.js";
import { SkillCategory } from "../components/Skill.jsx";

export function Skills() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-100 flex flex-col items-center p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-10 text-center drop-shadow-md">
        My Technical Skillset
      </h1>

      <div className="grid gap-8 w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <SkillCategory title="Frontend Skills" skills={frontendSkills} />
        <SkillCategory title="Backend Skills" skills={backendSkills} />
        <SkillCategory title="Soft Skills" skills={softSkills} isSoft />
      </div>
    </section>
  );
}
