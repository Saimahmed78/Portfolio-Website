import { Outlet } from "react-router";
import Navbar from "./component/navbar";
import "./styles/global.css"
export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* Renders the matched child route */}
      </main>
    </div>
  );
}
// The Outlet component renders the matched child route's element, allowing for nested routing.
