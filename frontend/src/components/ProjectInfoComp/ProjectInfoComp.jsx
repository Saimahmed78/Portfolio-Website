import styles from "./projectInfo.module.css";

export function ProjectInfoComp({ project }) {
  return (
    <article className={styles.projectDetail}>
      <header className={styles.projectDetailHeader}>
        <h1 className={styles.projectDetailTitle}>{project.title}</h1>
        <video
          className={styles.projectDetailVideo}
          src={project.video || "https://www.w3schools.com/html/mov_bbb.mp4"}
          controls
          poster={project.image || "https://via.placeholder.com/800x400?text=Preview"}
        />
      </header>

      <section className={styles.projectDetailPreviews}>
        <figure className={styles.previewCard}>
          <img
            src={project.image || "https://via.placeholder.com/600x300/2c3e50/ecf0f1?text=Dark+Mode"}
            alt={`${project.title} dark mode`}
            className={styles.previewCardImg}
          />
          <figcaption className={styles.previewCardCaption}>Dark Mode</figcaption>
        </figure>
      </section>

      <section className={styles.projectDetailInfo}>
        <div className={styles.infoBlock}>
          <h2 className={styles.infoBlockTitle}>Description</h2>
          <p className={styles.infoBlockContent}>
            {project.description ||
              "This project showcases XYZ features and demonstrates best practices in React."}
          </p>
        </div>

        <div className={styles.infoBlock}>
          <h2 className={styles.infoBlockTitle}>Tech Stack</h2>
          <ul className={styles.infoBlockList}>
            {(project.techStack || ["React", "CSS", "Vite"]).map((tech, i) => (
              <li key={i}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className={styles.infoBlock}>
          <h2 className={styles.infoBlockTitle}>Enhancements</h2>
          <ul className={styles.infoBlockList}>
            {(project.enhancementsToMake || ["Improve UI", "Add more features"]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className={styles.projectDetailFooter}>
        <a
          href={project.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          🔗 GitHub
        </a>
        <a
          href={project.vercel || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnSecondary}`}
        >
          🚀 Live Demo
        </a>
      </footer>
    </article>
  );
}
