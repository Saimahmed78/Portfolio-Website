import { ProjectInfoComp } from "../component/projectInfoComp";
import { projectDetails } from "../hooks/Projectdetails";
import { Route } from "../routes/project/$id";

export function projectInfo() {
  const { id } = Route.useParams();
  const p = projectDetails.find((project) => project.id === id);
  if (!p) return <div>Project Not Found!</div>;
  return <ProjectInfoComp project={p} />;
}
