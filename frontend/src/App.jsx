import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main>
        <Outlet /> {/* Renders the matched child route */}
      </main>
    </div>
  );
}
// The Outlet component renders the matched child route's element, allowing for nested routing.
