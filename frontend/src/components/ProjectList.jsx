import { useRef, useState, useCallback } from "react";
import { Link } from "react-router";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { frontendSkills, backendSkills, devOpsSkills } from "../data/skills";

// ─── Skill brand-color lookup ────────────────────────────────────────────────
const allSkills = [...frontendSkills, ...backendSkills, ...devOpsSkills];
const getSkillBrand = (skillName) => {
  const n = skillName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const hit = allSkills.find((s) => {
    const sn = s.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return sn.includes(n) || n.includes(sn);
  });
  return hit ? hit.brand : "#f97316";
};

// ─── Shared CSS-in-JS style tokens ───────────────────────────────────────────
const S = {
  /* Subsection heading with orange left border */
  subsectionHeading: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#ffffff",
    borderLeft: "3px solid #f97316",
    paddingLeft: "12px",
    marginTop: "64px",
    marginBottom: "32px",
    lineHeight: 1.2,
  },
  /* Pill tech-stack tag */
  tag: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid #2a2a2a",
    background: "#1a1a1a",
    color: "#d4d4d8",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  /* Filled "Live Demo" button */
  btnFilled: {
    background: "#f97316",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 600,
    padding: "9px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    transition: "background 0.2s ease",
  },
  /* Outlined "GitHub" button */
  btnOutlined: {
    background: "transparent",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 600,
    padding: "9px 18px",
    borderRadius: "8px",
    border: "1px solid #2a2a2a",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    transition: "border-color 0.2s ease, color 0.2s ease",
  },
};

// ─── Reusable TechTag component ───────────────────────────────────────────────
function TechTag({ label }) {
  return <span style={S.tag}>{label}</span>;
}

// ─── Reusable card-action buttons ─────────────────────────────────────────────
function CardActions({ liveUrl, githubUrl, detailsId }) {
  const [githubHovered, setGithubHovered] = useState(false);

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "16px", flexWrap: "wrap" }}>
      {/* Live Demo — filled orange */}
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={S.btnFilled}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ea6c0a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f97316")}
        >
          <FiExternalLink size={14} />
          Live Demo
        </a>
      ) : null}

      {/* GitHub — outlined */}
      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...S.btnOutlined,
            borderColor: githubHovered ? "#f97316" : "#2a2a2a",
            color: githubHovered ? "#f97316" : "#ffffff",
          }}
          onMouseEnter={() => setGithubHovered(true)}
          onMouseLeave={() => setGithubHovered(false)}
        >
          <FiGithub size={14} />
          GitHub
        </a>
      ) : null}

      {/* See Details — same filled style as Live Demo */}
      {detailsId ? (
        <Link
          to={`/project/${detailsId}`}
          style={S.btnFilled}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ea6c0a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f97316")}
        >
          See Details
          <FiArrowUpRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}

// ─── 3D Tilt Hook ─────────────────────────────────────────────────────────────
function use3DTilt() {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
  });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const rX = (0.5 - y) * 5;
    const rY = (x - 0.5) * 5;
    requestAnimationFrame(() =>
      setStyle({
        transform: `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.01,1.01,1.01)`,
        transition: "none",
        zIndex: 20,
      })
    );
  }, []);

  const onMouseLeave = useCallback(() =>
    requestAnimationFrame(() =>
      setStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        zIndex: 1,
      })
    ), []);

  return { ref, style, onMouseMove, onMouseLeave };
}

// ─── FEATURED PROJECT CARD (full-width, image left / content right) ───────────
function FeaturedProjectCard({ project }) {
  const { ref, style: tiltStyle, onMouseMove, onMouseLeave } = use3DTilt();
  const [hovered, setHovered] = useState(false);

  return (
    <article
      ref={ref}
      style={{
        ...tiltStyle,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "320px",
        background: "#111111",
        border: `1px solid ${hovered ? "#f97316" : "#1f1f1f"}`,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 8px 48px rgba(249,115,22,0.15)"
          : "0 4px 32px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        width: "100%",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={(e) => { onMouseLeave(e); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
    >
      {/* ── Left: screenshot ── */}
      <div style={{ borderRadius: "16px 0 0 16px", overflow: "hidden", position: "relative", minHeight: "280px" }}>
        <img
          src={project.image || "https://via.placeholder.com/800x450?text=No+Image"}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        />
      </div>

      {/* ── Right: content ── */}
      <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
        {/* Tech tags */}
        {project.techStack?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.techStack.map((t) => <TechTag key={t} label={t} />)}
          </div>
        )}

        {/* Title */}
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.2 }}>
          {project.title}
        </h2>

        {/* Description */}
        {project.description && (
          <p style={{ fontSize: "15px", color: "#a1a1aa", lineHeight: 1.65, margin: 0 }}>
            {project.description}
          </p>
        )}

        {/* Stats row (if present) */}
        {project.stats && (
          <div style={{ display: "flex", gap: "24px", marginTop: "4px" }}>
            {project.stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "#a1a1aa", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <CardActions liveUrl={project.vercel} githubUrl={project.github} detailsId={project.id} />
      </div>
    </article>
  );
}

// ─── STANDARD GRID CARD (React + Frontend Projects) ──────────────────────────
function GridProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [githubHov, setGithubHov] = useState(false);

  return (
    <article
      style={{
        background: "#111111",
        border: `1px solid ${hovered ? "rgba(249,115,22,0.4)" : "#1f1f1f"}`,
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(249,115,22,0.12)" : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={project.image || "https://via.placeholder.com/800x450?text=No+Image"}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        {/* Title */}
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.3 }}>
          {project.title}
        </h3>

        {/* Description — clamped to 2 lines */}
        {project.description && (
          <p
            style={{
              fontSize: "14px",
              color: "#a1a1aa",
              lineHeight: 1.6,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>
        )}

        {/* Tech tags */}
        {project.techStack?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
            {project.techStack.map((t) => <TechTag key={t} label={t} />)}
          </div>
        )}

        {/* Buttons — pushed to bottom via flex */}
        <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "16px", flexWrap: "wrap" }}>
          {project.vercel && (
            <a
              href={project.vercel}
              target="_blank"
              rel="noopener noreferrer"
              style={S.btnFilled}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#ea6c0a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f97316")}
            >
              <FiExternalLink size={13} /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...S.btnOutlined,
                borderColor: githubHov ? "#f97316" : "#2a2a2a",
                color: githubHov ? "#f97316" : "#ffffff",
              }}
              onMouseEnter={() => setGithubHov(true)}
              onMouseLeave={() => setGithubHov(false)}
            >
              <FiGithub size={13} /> GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── FULL-STACK SECTION (wide card, image left / content right) ───────────────
function FullStackSection({ projects }) {
  if (!projects?.length) return null;
  return (
    <section>
      <h2 style={S.subsectionHeading}>Full Stack Projects</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {projects.map((p) => (
          <FeaturedProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

// ─── REACT PROJECTS (responsive 3-col grid) ───────────────────────────────────
function ReactProjectsSection({ projects }) {
  if (!projects?.length) return null;
  return (
    <section>
      <h2 style={S.subsectionHeading}>React Projects</h2>
      <ResponsiveProjectGrid projects={projects} />
    </section>
  );
}

// ─── FRONTEND PROJECTS (replaces "Basic Projects") ───────────────────────────
function FrontendProjectsSection({ projects }) {
  if (!projects?.length) return null;
  return (
    <section>
      <h2 style={S.subsectionHeading}>Frontend Projects</h2>
      <ResponsiveProjectGrid projects={projects} />
    </section>
  );
}

// ─── Responsive 3-col CSS Grid ────────────────────────────────────────────────
function ResponsiveProjectGrid({ projects }) {
  return (
    <>
      {/* Inline responsive grid via a style tag trick using a wrapper class */}
      <style>{`
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 32px;
        }
        @media (max-width: 1024px) {
          .proj-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 768px) {
          .proj-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        /* Featured card responsive: stack on mobile */
        .featured-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .featured-card-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-card-img {
            border-radius: 16px 16px 0 0 !important;
            min-height: 220px !important;
          }
        }
      `}</style>
      <div className="proj-grid">
        {projects.map((p) => (
          <GridProjectCard key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
export default function ProjectComp({ details }) {
  // Split by category, preserving the requested order:
  // Featured (isFullStack) → Full Stack (isFullStack, redundant but clear) → React → Frontend
  const featuredProjects  = details.filter((p) => p.isFullStack && p.isFeatured);
  const fullStackProjects = details.filter((p) => p.isFullStack && !p.isFeatured);
  // If no project has isFeatured, treat ALL fullStack as featured (backwards compat)
  const allFullStack      = details.filter((p) => p.isFullStack);
  const reactProjects     = details.filter((p) => !p.isFullStack && p.isReact);
  const frontendProjects  = details.filter((p) => !p.isFullStack && !p.isReact);

  // Decide what to show as "Featured" vs "Full Stack"
  const hasExplicitFeatured = details.some((p) => p.isFeatured);
  const toFeature   = hasExplicitFeatured ? featuredProjects  : allFullStack;
  const toFullStack = hasExplicitFeatured ? fullStackProjects : [];

  return (
    <>
      {/* Responsive overrides */}
      <style>{`
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 32px;
        }
        @media (max-width: 1024px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 768px) {
          .proj-grid { grid-template-columns: 1fr; gap: 16px; }
        }
        /* Featured card stacks vertically on mobile */
        .featured-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 320px;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .featured-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

        {/* 1. FEATURED / FULL STACK ─────────────────────────────────── */}
        {toFeature.length > 0 && (
          <section>
            {/* The parent page (ProjectListPage) already renders "Selected Works / Featured Projects"
                heading, so we only add sub-headings for additional groups */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {toFeature.map((p) => (
                <MobileAwareFeaturedCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}

        {/* 2. ADDITIONAL FULL STACK (if isFeatured flag is used) ──────── */}
        {toFullStack.length > 0 && <FullStackSection projects={toFullStack} />}

        {/* 3. REACT PROJECTS ─────────────────────────────────────────── */}
        <ReactProjectsSection projects={reactProjects} />

        {/* 4. FRONTEND PROJECTS (was "Basic Projects") ─────────────────── */}
        <FrontendProjectsSection projects={frontendProjects} />
      </div>
    </>
  );
}

// ─── Mobile-aware Featured Card wrapper ──────────────────────────────────────
// Injects the responsive class so the 2-col grid collapses on mobile
function MobileAwareFeaturedCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      style={{
        background: "#111111",
        border: `1px solid ${hovered ? "#f97316" : "#1f1f1f"}`,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 8px 48px rgba(249,115,22,0.15)"
          : "0 4px 32px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        width: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Inner grid collapses on mobile via .featured-inner CSS class */}
      <div className="featured-inner" style={{ minHeight: "320px" }}>
        {/* Left: screenshot */}
        <div style={{ overflow: "hidden", position: "relative", minHeight: "260px" }}>
          <img
            src={project.image || "https://via.placeholder.com/800x450?text=No+Image"}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transform: hovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        </div>

        {/* Right: content */}
        <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
          {project.techStack?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.techStack.map((t) => <TechTag key={t} label={t} />)}
            </div>
          )}

          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.2 }}>
            {project.title}
          </h2>

          {project.description && (
            <p style={{ fontSize: "15px", color: "#a1a1aa", lineHeight: 1.65, margin: 0 }}>
              {project.description}
            </p>
          )}

          {/* Optional stats row */}
          {project.stats && (
            <div style={{ display: "flex", gap: "24px", marginTop: "4px", flexWrap: "wrap" }}>
              {project.stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>{s.value}</div>
                  <div style={{ fontSize: "11px", color: "#a1a1aa", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <CardActions liveUrl={project.vercel} githubUrl={project.github} detailsId={project.id} />
        </div>
      </div>
    </article>
  );
}
