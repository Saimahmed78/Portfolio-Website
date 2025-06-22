import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../pages/contactpage";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});
