import { useRef, useState, useCallback } from "react";
import { Link } from "react-router";
import { FaGithub, FaEye, FaStar } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

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
    
    // Max rotation 10deg for subtle editorial feel
    const rotateX = (0.5 - y) * 10; 
    const rotateY = (x - 0.5) * 10;
    
    // Directional shadow moving away from cursor
    const shadowX = (0.5 - x) * 30;
    const shadowY = (0.5 - y) * 30;
    
    requestAnimationFrame(() => {
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        boxShadow: `${shadowX}px ${shadowY}px 50px rgba(0,0,0,0.5), inset 0 0 0 1px var(--border-hover)`,
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

function ProjectCard({ project, isFeatured }) {
  const { ref, style, onMouseMove, onMouseLeave } = use3DTilt();
  
  return (
    <article 
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative flex flex-col p-0 overflow-hidden rounded-[var(--radius-card)] bg-[var(--bg-card)] ${isFeatured ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"} min-h-[420px]`}
    >
      {/* Top Accent Brand Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 z-20 transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:h-1.5"
        style={{ backgroundColor: project.brand || "var(--accent-primary)" }}
      />
      
      {/* Large Visual Area (Crossfade on hover simulated via scale/opacity tweaks if multiple images, here we scale) */}
      <div className="absolute inset-0 z-0 bg-[var(--bg-base)]">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />
        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-[var(--bg-void)]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
      </div>
      
      {/* Content Overlay (Glassmorphism-lite) */}
      <div className="relative z-10 flex flex-col h-full justify-end p-6 md:p-8 pt-20 mt-auto backdrop-blur-[2px]">
        {/* Tech Stack Chips */}
        {project.skills && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map((skill) => (
              <span 
                key={skill} 
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-[var(--radius-chip)] bg-[var(--bg-card)]/80 backdrop-blur-md text-[var(--text-primary)] border border-[var(--border-card)] shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        
        {/* Title & Impact */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight group-hover:text-white transition-colors">
          {project.title}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6 max-w-xl group-hover:text-[var(--text-primary)] transition-colors">
          {project.impact}
        </p>
        
        {/* Inline Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-[var(--border-card)]/50">
          <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-muted)]">
            {project.metrics && (
              <>
                <div className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors">
                  <FaStar className="text-[var(--accent-warn)]" />
                  <span>{project.metrics.stars}</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors">
                  <FaEye className="text-[var(--accent-info)]" />
                  <span>{project.metrics.views}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <a href="https://github.com/Saimahmed78" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-card)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-white transition-all hover:scale-110" aria-label="View on GitHub">
              <FaGithub size={16} />
            </a>
            <Link 
              to={`${project.link}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-[var(--accent-primary)] hover:text-white transition-all hover:scale-105"
            >
              <span>Live</span>
              <FiArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectComp({ details }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {details.map((project, idx) => (
        <ProjectCard 
          key={project.link} 
          project={project} 
          isFeatured={idx === 0} 
        />
      ))}
    </div>
  );
}
