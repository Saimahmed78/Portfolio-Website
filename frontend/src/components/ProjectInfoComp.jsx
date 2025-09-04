import "../styles/projectInfo.css";

export function ProjectInfoComp({ project }) {
  return (
    <article className="project-detail">
      <header className="project-detail-header">
        <h1 className="project-detail-title">{project.title}</h1>
        <video
          className="project-detail-video"
          src={project.video || "https://www.w3schools.com/html/mov_bbb.mp4"}
          controls
          poster={project.image || "https://via.placeholder.com/800x400?text=Preview"}
        />
      </header>

      <section className="project-detail-previews">
        <figure className="preview-card">
          <img
            src={project.image || "https://via.placeholder.com/600x300/2c3e50/ecf0f1?text=Dark+Mode"}
            alt={`${project.title} dark mode`}
            className="preview-card-img"
          />
          <figcaption className="preview-card-caption">Dark Mode</figcaption>
        </figure>
        {/* <figure className="preview-card">
          <img
            src={project.lightMode}
            alt={`${project.title} light mode`}
            className="preview-card-img"
          />
          <figcaption className="preview-card-caption">Light Mode</figcaption>
        </figure> */}
      </section>

      <section className="project-detail-info">
        <div className="info-block">
          <h2 className="info-block-title">Description</h2>
          <p className="info-block-content">
            {project.description ||
              "This project showcases XYZ features and demonstrates best practices in React."}
          </p>
        </div>

        <div className="info-block">
          <h2 className="info-block-title">Tech Stack</h2>
          <ul className="info-block-list">
            {(project.techStack || ["React", "CSS", "Vite"]).map((tech, i) => (
              <li key={i}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="info-block">
          <h2 className="info-block-title">Enhancements</h2>
          <ul className="info-block-list">
            {(project.enhancementsToMake || ["Improve UI", "Add more features"]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="project-detail-footer">
        <a
          href={project.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          🔗 GitHub
        </a>
        <a
          href={project.vercel || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary"
        >
          🚀 Live Demo
        </a>
      </footer>
    </article>
  );
}
