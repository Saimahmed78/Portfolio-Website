import "../styles/projectInfo.css";

export function ProjectInfoComp({ project }) {
  return (
    <article className="project-detail">
      <header className="project-detail__header">
        <h1 className="project-detail__title">{project.title}</h1>
        <video
          className="project-detail__video"
          src={project.video || "https://www.w3schools.com/html/mov_bbb.mp4"}
          controls
          poster={project.lightMode || "https://via.placeholder.com/800x400?text=Preview"}
        />
      </header>

      <section className="project-detail__previews">
        <figure className="preview-card">
          <img
            src={project.darkMode || "https://via.placeholder.com/600x300/2c3e50/ecf0f1?text=Dark+Mode"}
            alt={`${project.title} dark mode`}
            className="preview-card__img"
          />
          <figcaption className="preview-card__caption">Dark Mode</figcaption>
        </figure>
        <figure className="preview-card">
          <img
            src={project.lightMode || "https://via.placeholder.com/600x300/ecf0f1/2c3e50?text=Light+Mode"}
            alt={`${project.title} light mode`}
            className="preview-card__img"
          />
          <figcaption className="preview-card__caption">Light Mode</figcaption>
        </figure>
      </section>

      <section className="project-detail__info">
        <div className="info-block">
          <h2 className="info-block__title">Description</h2>
          <p className="info-block__content">
            {project.description ||
              "This project showcases XYZ features and demonstrates best practices in React."}
          </p>
        </div>

        <div className="info-block">
          <h2 className="info-block__title">Tech Stack</h2>
          <ul className="info-block__list">
            {(project.techStack || ["React", "CSS", "Vite"]).map((tech, i) => (
              <li key={i}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="info-block">
          <h2 className="info-block__title">Enhancements</h2>
          <ul className="info-block__list">
            {(project.enhancementsToMake || ["Improve UI", "Add more features"]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="project-detail__footer">
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
