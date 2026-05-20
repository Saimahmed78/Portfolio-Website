import { useParams } from "react-router";
import { ProjectInfoComp } from "../components/ProjectInfoComp.jsx";
import { projectDetails } from "../data/projectDetails.js";

function ProjectInfo() {
  const { id } = useParams();
  console.log("Id", id);
  if (!id) return <div>❌ Project projectId is missing!</div>;

  const p = projectDetails.find((project) => project.id === id);

  if (!p) return <div>🚫 Project Not Found for ID: {id}</div>;

  return <ProjectInfoComp project={p}  />;
}

export default ProjectInfo;
