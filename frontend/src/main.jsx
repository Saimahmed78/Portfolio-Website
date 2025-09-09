import ReactDOM from "react-dom/client";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { authRoutes } from "./router/auth.routes.jsx";
import { appRoutes } from "./router/app.routes.jsx";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      ...appRoutes, // public pages
      ...authRoutes, // auth pages with shared layout
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
