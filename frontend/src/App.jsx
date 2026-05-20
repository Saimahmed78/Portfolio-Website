import { useEffect } from "react";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import useAuthStore from "./store/authStore";
import FormLoader from "./components/FormLoader.jsx";

export default function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FormLoader message="Loading..." />
      </div>
    );
  }

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
