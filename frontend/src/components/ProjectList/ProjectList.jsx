import styles from "./ProjectList.module.css";
import { Link } from "react-router";

export default function ProjectComp({ details }) {
  return (
    <ul className={styles.projectGrid}>
      {details.map((project) => (
        <li key={project.id || project.link} className={styles.projectCard}>
          <Link to={`/project/${project.id}`} className={styles.projectLink}>
            <h2 className={styles.projectCardTitle}>{project.title}</h2>
            <img
              src={project.img}
              alt={project.title}
              className={styles.projectCardImg}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
