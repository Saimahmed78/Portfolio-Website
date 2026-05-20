import { useEffect, useState } from "react";
import { FaCheckCircle, FaStar, FaLightbulb, FaComments, FaTools, FaProjectDiagram, FaUserTie } from "react-icons/fa";
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiVite, SiNodedotjs, SiMongodb, SiRedis, SiDocker, SiGit, SiGithubactions, SiVercel, SiJsonwebtokens } from "react-icons/si";

const iconMap = {
  "HTML5": SiHtml5,
  "CSS3": SiCss3,
  "JavaScript": SiJavascript,
  "React.js": SiReact,
  "Tailwind CSS": SiTailwindcss,
  "Vite": SiVite,
  "Node.js": SiNodedotjs,
  "MongoDB": SiMongodb,
  "JWT Auth": SiJsonwebtokens,
  "Redis": SiRedis,
  "Docker": SiDocker,
  "Git": SiGit,
  "GitHub Actions": SiGithubactions,
  "Vercel": SiVercel,
};

const traitIconMap = {
  "Curious & Self-Motivated": FaLightbulb,
  "Clear Communicator": FaComments,
  "Builder's Mindset": FaTools,
  "Structured Thinker": FaProjectDiagram,
  "Leadership": FaUserTie,
};

const getProficiencyWidth = (level) => {
  switch (level) {
    case "Expert": return "95%";
    case "Advanced": return "80%";
    case "Proficient": return "65%";
    case "Familiar": return "45%";
    default: return "50%";
  }
};

export function SkillMatrix({ skills }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {skills.map((skill) => {
        const Icon = iconMap[skill.name] || FaCheckCircle;
        const width = getProficiencyWidth(skill.proficiency);
        
        return (
          <div 
            key={skill.name} 
            className="group feature-card !p-5 border border-[var(--border-card)] rounded-[var(--radius-card)] relative overflow-hidden transition-all duration-300"
          >
            {/* Hover border glow */}
            <div className="absolute inset-0 border border-transparent group-hover:border-[var(--border-hover)] rounded-[var(--radius-card)] transition-all duration-300 pointer-events-none z-10 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_20px_var(--accent-glow-light)]" />
            
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-4 relative z-10">
                <div 
                  className="w-12 h-12 rounded-[var(--radius-btn)] flex items-center justify-center text-2xl shadow-sm bg-[var(--bg-base)] border border-[var(--border-card)]"
                  style={{ color: skill.brand }}
                >
                  <Icon />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-sm m-0 tracking-wide">{skill.name}</h3>
                  <p className="text-[var(--text-muted)] text-xs m-0 mt-1">{skill.description}</p>
                </div>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-[var(--radius-chip)] bg-[var(--bg-base)] text-[var(--text-secondary)] border border-[var(--border-card)] z-10">
                {skill.proficiency}
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1.5 bg-[var(--bg-base)] rounded-full overflow-hidden relative z-10 border border-[var(--border-card)]">
              {/* Animated Fill */}
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ 
                  width: mounted ? width : "0%",
                  backgroundColor: skill.brand,
                  boxShadow: `0 0 10px ${skill.brand}80`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SoftSkillsTicker({ skills }) {
  return (
    <div className="w-full overflow-hidden relative flex py-4 mask-edges" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div className="flex gap-6 animate-scrollTicker w-max hover:[animation-play-state:paused]">
        {/* Render twice for infinite loop effect */}
        {[...skills, ...skills].map((skill, idx) => {
          const Icon = traitIconMap[skill.name] || FaStar;
          return (
            <div 
              key={`${skill.name}-${idx}`} 
              className="flex-shrink-0 w-[280px] feature-card !p-6 border border-[var(--border-card)] rounded-[var(--radius-card)] hover:border-[var(--border-hover)] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-[var(--radius-chip)] bg-[var(--accent-glow-light)] text-[var(--accent-primary)] flex items-center justify-center text-lg mb-4 border border-[var(--accent-glow-heavy)]">
                <Icon />
              </div>
              <h4 className="font-bold text-[var(--text-primary)] text-sm mb-2">{skill.name}</h4>
              <p className="text-[var(--text-muted)] text-xs leading-relaxed m-0">{skill.description}</p>
            </div>
          );
        })}
      </div>
      
      <style>{`
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scrollTicker {
          animation: scrollTicker 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
