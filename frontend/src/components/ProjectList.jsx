import { useRef, useState, useCallback } from "react";
import { Link } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import { frontendSkills, backendSkills, devOpsSkills } from "../data/skills";

const allSkills = [...frontendSkills, ...backendSkills, ...devOpsSkills];

const getSkillBrand = (skillName) => {
  const normalizedName = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const skill = allSkills.find(s => {
    const sName = s.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return sName.includes(normalizedName) || normalizedName.includes(sName);
  });
  return skill ? skill.brand : "var(--accent-primary)";
};

function use3DTilt() {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 0 0 1px var(--border-card)",
    transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
  });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Max rotation 5deg for subtle editorial feel
    const rotateX = (0.5 - y) * 5;
    const rotateY = (x - 0.5) * 5;

    // Directional shadow moving away from cursor
    const shadowX = (0.5 - x) * 20;
    const shadowY = (0.5 - y) * 20;

    requestAnimationFrame(() => {
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
        boxShadow: `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.3), inset 0 0 0 1px var(--border-hover)`,
        transition: "none",
        zIndex: 20,
      });
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    requestAnimationFrame(() => {
      setStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 0 0 1px var(--border-card)",
        transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        zIndex: 1,
      });
    });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
// Paste in DevTools console

function ProjectCard({ project }) {
  const { ref, style, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      // ✅ REMOVED h-[650px] lg:h-[700px] — card is now auto height
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[var(--bg-card)]"
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-20 transition-all duration-500 opacity-60 group-hover:opacity-100"
        style={{ backgroundColor: "var(--accent-primary)" }}
      />

      {/* Image — padded, rounded, aspect-ratio box, object-contain so nothing crops */}
      <div className="mx-3.5 mt-5 rounded-2xl overflow-hidden bg-[var(--bg-base)] relative shrink-0">
        <div className="w-full relative" style={{ aspectRatio: "16/9" }}>
          <img
            src={project.image || "https://via.placeholder.com/800x450?text=Image+Not+Found"}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 px-5 pt-4 pb-5">

        {/* Tech Stack Badges */}
        {project.techStack && (
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((skill) => {
              const brandColor = getSkillBrand(skill);
              return (
                <span
                  key={skill}
                  className="hero-badge"
                  style={{ borderColor: `${brandColor}50`, color: brandColor }}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        )}

        {/* Title */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight leading-tight group-hover:text-white transition-colors">
          {project.title}
        </h2>

        {/* Button — sits directly under title, no gap stretching */}
        <div className="flex justify-center mt-2">
          <Link
            to={`/project/${project.id}`}
            className="btn-primary no-underline text-white"
          >
            <span >See details</span>
            <FiArrowUpRight size={30} />
          </Link>
        </div>
      </div>
    </article>
  );
}
function FullStackProjectCard({ project }) {
  const { ref, style, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl bg-[var(--bg-card)] w-full"
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-20 transition-all duration-500 opacity-60 group-hover:opacity-100"
        style={{ backgroundColor: "var(--accent-primary)" }}
      />

      {/* Image — Left covering ~30% */}
      <div className="md:w-[30%] shrink-0 overflow-hidden bg-[var(--bg-base)] relative rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none m-3.5 mb-0 md:mb-3.5 flex items-center">
        <div className="w-full relative" style={{ aspectRatio: "16/9" }}>
          <img
            src={project.image || "https://via.placeholder.com/800x450?text=Image+Not+Found"}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Card Body — Right covering ~70% */}
      <div className="flex flex-col gap-4 p-5 md:p-8 flex-grow justify-center">
        {/* Tech Stack Badges */}
        {project.techStack && (
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((skill) => {
              const brandColor = getSkillBrand(skill);
              return (
                <span
                  key={skill}
                  className="hero-badge"
                  style={{ borderColor: `${brandColor}50`, color: brandColor }}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        )}

        {/* Title */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight leading-tight group-hover:text-white transition-colors">
          {project.title}
        </h2>

        {/* Description */}
        {project.description && (
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-3xl">
            {project.description}
          </p>
        )}

        {/* Button */}
        <div className="flex justify-start mt-2">
          <Link
            to={`/project/${project.id}`}
            className="btn-primary no-underline text-white inline-flex items-center"
          >
            <span>See details</span>
            <FiArrowUpRight size={24} className="ml-2" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProjectComp({ details }) {
  const fullStackProjects = details.filter(p => p.isFullStack);
  const basicProjects = details.filter(p => !p.isFullStack);

  return (
    <div className="flex flex-col gap-16 w-full">
      {fullStackProjects.length > 0 && (
        <section className="w-full">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-[var(--text-primary)] mb-10 tracking-tight">
            FULL STACK Projects
          </h2>
          <div className="flex flex-col gap-8 w-full">
            {fullStackProjects.map((project) => (
              <FullStackProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </section>
      )}

      {basicProjects.length > 0 && (
        <section className="w-full">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-[var(--text-primary)] mb-10 tracking-tight">
            Basic Projects
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 w-full">
            {basicProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
