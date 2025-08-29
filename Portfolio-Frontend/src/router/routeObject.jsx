import { About } from "../pages/AboutMe";
import { ContactPage } from "../pages/ContactPage";
import { Home } from "../pages/Home";
import { Project } from "../pages/ProjectPage";
import ProjectInfo from "../pages/ProjectDetails";
import { Skills } from "../pages/Skills";
import RegisterUser from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ResendVerification from "../pages/auth/ResendVerification";
import ChangePass from "../pages/auth/changePassword";
import AccountVerification from "../pages/auth/AccountVerification";

export const routeObjects = [
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
  {
    path: "register",
    element: <RegisterUser />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgotPass",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "resend-verification",
    element: <ResendVerification />,
  },
  {
    path: "verify/:token",
    element: <AccountVerification />,
  },
  {
    path: "changePass",
    element: <ChangePass />,
  },
];
