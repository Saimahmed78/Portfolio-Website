import { createFileRoute } from "@tanstack/react-router";
import { Mainpage } from "../pages/home.jsx";

export const Route = createFileRoute("/")({
  component: Mainpage,
});


