import React, { useState } from "react";
import "../styles/navbar.css";
import { FaBars, FaTimes, FaRocket } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <FaRocket className="logo-icon" /> My Portfolio
        </div>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/project">Projects</a>
          </li>
          <li>
            <a href="/skills">Skills</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>

        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
