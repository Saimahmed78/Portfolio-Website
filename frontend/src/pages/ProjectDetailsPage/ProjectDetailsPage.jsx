// pages/projectDetails.jsx

import { useParams } from "react-router";
import { ProjectInfoComp } from "../component/ProjectInfoComp";
import { ProjectDetails } from "../hooks/ProjectDetails";
import "../styles/projectInfo.css";

function ProjectInfo() {
  const { id } = useParams();
  console.log("📦 projectId from URL:", id);

  if (!id) return <div>❌ Project projectId is missing!</div>;

  const p = ProjectDetails.find((project) => project.id === id);

  if (!p) return <div>🚫 Project Not Found for ID: {id}</div>;

  return <ProjectInfoComp project={p} />;
}

export default ProjectInfo;
