import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar } from "../component/navbar.jsx";
// import styling
import "../styles/global.css";
export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
        <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
