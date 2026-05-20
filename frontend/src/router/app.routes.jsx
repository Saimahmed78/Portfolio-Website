import { Home } from "../pages/HomePage.jsx";
import ProjectInfo from "../pages/ProjectDetailsPage.jsx";

export const appRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "project/:id",
    element: <ProjectInfo />,
  },
];
