import { ContactForm } from "./ContactForm";

export function ProjectInfoComp({ project }) {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'var(--bg-void)',
      paddingTop: '96px',
      paddingBottom: '80px',
      fontFamily: 'var(--font-body)',
      color: 'var(--text-primary)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
      }}>

        {/* ══ HEADER ══════════════════════════════════════════════ */}
        <header style={{ textAlign: 'center', paddingTop: '40px' }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            marginBottom: '20px',
          }}>
            Project Case Study
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '24px',
          }}>
            {project.title}
          </h1>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '12px'
          }}>
            {project.vercel && (
              <a 
                href={project.vercel} 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary"
                style={{
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff',
                }}
              >
                <span>Live Demo</span>
                <span style={{ fontSize: '1.2em', lineHeight: 1 }}>↗</span>
              </a>
            )}
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  padding: '12px 28px',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-card)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <span>GitHub Repo</span>
                <span style={{ fontSize: '1.2em', lineHeight: 1 }}>↗</span>
              </a>
            )}
          </div>
        </header>

        {/* ══ MAIN GRID ════════════════════════════════════════════ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Mockups ─────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Tablet + Mobile */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
              {/* Tablet frame */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '82%', height: '88%',
                background: '#000',
                borderRadius: '20px',
                border: '6px solid #1a1a1a',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
              }}>
                <img
                  src={project.image || 'https://via.placeholder.com/800x600/0e0d0c/ffffff?text=Tablet'}
                  alt="Tablet view"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              </div>
              {/* Mobile frame */}
              <div style={{
                position: 'absolute', bottom: 0, left: '16px',
                width: '30%', height: '82%',
                background: '#000',
                borderRadius: '20px',
                border: '6px solid #1a1a1a',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
                zIndex: 2,
              }}>
                <img
                  src={project.image || 'https://via.placeholder.com/400x800/0e0d0c/ffffff?text=Mobile'}
                  alt="Mobile view"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              </div>
            </div>

            {/* Desktop browser frame */}
            <div style={{
              width: '100%',
              aspectRatio: '16/10',
              background: '#000',
              borderRadius: '12px',
              border: '1px solid var(--border-card)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            }}>
              <div style={{
                height: '36px',
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-card)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                gap: '8px',
                flexShrink: 0,
              }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57', display: 'block' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E', display: 'block' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840', display: 'block' }} />
              </div>
              {project.video ? (
                <video
                  style={{ width: '100%', flex: 1, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  src={project.video}
                  controls
                  poster={project.image}
                />
              ) : (
                <img
                  src={project.image || 'https://via.placeholder.com/1200x800/0e0d0c/ffffff?text=Desktop'}
                  alt="Desktop view"
                  style={{ width: '100%', flex: 1, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              )}
            </div>
          </div>

          {/* ── RIGHT: Info Cards ──────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Description */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-card)', padding: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📄</span> Project Description
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                {project.description || 'A modern web application built to deliver a seamless, fast and intuitive experience. Focuses on clean design principles and practical usability.'}
              </p>
            </div>

            {/* Tech Stack */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-card)', padding: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🥞</span> Tech Stack
              </h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {(project.techStack || ['React', 'Node.js', 'MongoDB']).map((tech, idx) => (
                  <span key={idx} style={{ padding: '6px 14px', borderRadius: 'var(--radius-chip)', background: 'var(--accent-glow-light)', border: '1px solid var(--accent-glow-heavy)', color: 'var(--accent-secondary)', fontSize: '0.8rem', fontWeight: 500 }}>
                    {tech}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>Optimized for speed and low latency</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>Fully responsive across all screen sizes</p>
                </div>
              </div>
            </div>

            {/* Features & Roadmap */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-card)', padding: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>✨</span> Features & Roadmap
              </h3>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-info)', marginBottom: '12px' }}>Core Functionality</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(project.features || project.techStack || ['Instant content generation', 'Seamless user interactions', 'Real-time updates']).map((f, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    <span style={{ color: 'var(--accent-info)', flexShrink: 0 }}>→</span>{f}
                  </li>
                ))}
              </ul>
              <div style={{ height: '1px', background: 'var(--border-card)', marginBottom: '20px' }} />
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-success)', marginBottom: '12px' }}>Roadmap</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(project.enhancementsToMake || ['Integration with external APIs', 'Progressive Web App support', 'Social sharing capabilities']).map((e, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    <span style={{ color: 'var(--accent-success)', flexShrink: 0 }}>→</span>{e}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ══ CONTACT SECTION ══════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-hero)', overflow: 'hidden' }}>

          {/* Orange header banner */}
          <div style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)', padding: '40px clamp(2rem, 5vw, 4rem)' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              Let's Work Together
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Ready to elevate your project's user experience?
            </h2>
          </div>

          {/* Two-column body */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>

            {/* Left — testimonial */}
            <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)', borderRight: '1px solid var(--border-card)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '40px' }}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', fontStyle: 'italic', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                "I am literally amazed at the detail and performance you brought to life. Working together was seamless from start to finish."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: '#fff', flexShrink: 0 }}>SC</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '2px' }}>Satisfied Client</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Collaborator & Partner</p>
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <ContactForm />
          </div>
        </section>

      </div>
    </div>
  );
}