import { About } from "../pages/AboutMe";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/Home";
import { Project } from "../pages/ProjectPage";
import ProjectInfo from "../pages/ProjectDetails";
import Skills from "../pages/Skills";

export const routeObjects = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "about",
    element: <About />
  },
  {
    path: "contact",
    element: <ContactPage />
  },
  {
    path: "skills",
    element: <Skills /> 
  },
  {
    path: "project",
    element: <Project />
  },
  {
    path: "project/:id",
    element: <ProjectInfo />,
  },
  
];
