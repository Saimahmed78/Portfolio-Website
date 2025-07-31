import ReactDOM from "react-dom/client";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx"; // The root layout
import { routeObjects } from "./router/routeObject.jsx";
import ErrorBoundary from "./component/ErrorBoundary.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Renders for all child routes
    children: routeObjects,
	errorElement: <ErrorBoundary />, // Error boundary for all child routes
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
