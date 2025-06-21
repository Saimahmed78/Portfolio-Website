import { Link } from "@tanstack/react-router";
import "../styles/navbar.css";
export function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/project">Projects</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/skills">Skills</Link>
        </div>
      </nav>
    </>
  );
}
