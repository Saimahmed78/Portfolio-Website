import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes, FaRocket } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        <div className={styles.logo}>
          <FaRocket className={styles["logo-icon"]} /> My Portfolio
        </div>

        <ul className={`${styles["nav-links"]} ${isOpen ? styles.open : ""}`}>
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

        <div className={styles.hamburger} onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
