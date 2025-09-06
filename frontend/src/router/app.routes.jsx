import { About } from "../pages/AboutMePage/AboutMePage";
import { ContactPage } from "../pages/ContactPage/ContactPage";
import { Home } from "../pages/HomePage/HomePage";
import { Project } from "../pages/ProjectListPage/ProjectListPage";
import ProjectInfo from "../pages/ProjectDetailsPage/ProjectDetailsPage";
import { Skills } from "../pages/SkillsPage/SkillsPage";

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
