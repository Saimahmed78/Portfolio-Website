import "../styles/projects.css";
import { Link } from "@tanstack/react-router";

export function Projectcomp({ details }) {
  console.log("✅ Loaded project links:", details.map(p => p.link));

  return (
    <ul className="project-grid">
      {details.map((project) => (
        <li key={project.id || project.link} className="project-card">
          <Link
            to={project.link}
            className="project-link"
          >
            <h2>{project.title}</h2>
            <img src={project.img} alt={project.title} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
