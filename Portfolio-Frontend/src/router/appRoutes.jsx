import { About } from "../pages/AboutMe";
import { ContactPage } from "../pages/ContactPage";
import { Home } from "../pages/Home";
import { Project } from "../pages/ProjectPage";
import ProjectInfo from "../pages/ProjectDetails";
import { Skills } from "../pages/Skills";

export const appRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "skills",
    element: <Skills />,
  },
  {
    path: "project",
    element: <Project />,
  },
  {
    path: "project/:id",
    element: <ProjectInfo />,
  },
];
