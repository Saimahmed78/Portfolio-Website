import { About } from "../pages/aboutme";
import { ContactPage } from "../pages/contactpage";
import { HomePage } from "../pages/home";
import { Project } from "../pages/projectPage";
import ProjectInfo from "../pages/projectDetails";
import Skills from "../pages/skills";

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
