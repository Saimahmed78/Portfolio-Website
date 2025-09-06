import { useParams } from "react-router";
import { ProjectInfoComp } from "../../components/ProjectInfoComp/ProjectInfoComp";
import { projectDetails } from "../../data/projectDetails";
import styles from "./ProjectDetailsPage.module.css"; // CSS module

function ProjectInfo() {
  const { id } = useParams();

  if (!id) return <div>❌ Project projectId is missing!</div>;

  const p = projectDetails.find((project) => project.id === id);

  if (!p) return <div>🚫 Project Not Found for ID: {id}</div>;

  return <ProjectInfoComp project={p} className={styles["project-detail"]} />;
}

export default ProjectInfo;
