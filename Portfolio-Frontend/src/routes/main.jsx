import { createFileRoute } from "@tanstack/react-router";
import { Mainpage } from "../pages/home";

export const Route = createFileRoute("/main")({
  component: Mainpage,
});


