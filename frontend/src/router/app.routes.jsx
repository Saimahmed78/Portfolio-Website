import { About } from "../pages/AboutMePage.jsx";
import { ContactPage } from "../pages/ContactPage.jsx";
import { Home } from "../pages/HomePage.jsx";
import { Project } from "../pages/ProjectListPage.jsx";
import ProjectInfo from "../pages/ProjectDetailsPage.jsx";
import { Skills } from "../pages/SkillsPage.jsx";

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
