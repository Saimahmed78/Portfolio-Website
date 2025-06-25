import { createFileRoute } from "@tanstack/react-router";
import { projectInfo } from "../../pages/projectDetails";

export const Route = createFileRoute("/project/$id")({
  component: projectInfo,
});
