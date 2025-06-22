import "../styles/projects.css";
export function Projectcomp({ details }) {
  return (
    <ul className="project-grid">
      {details.map((project, index) => (
        <li key={index} className="project-card">
          <h2>{project.title}</h2>
          <img src={project.img} alt={project.title} />
        </li>
      ))}
    </ul>
  );
}
