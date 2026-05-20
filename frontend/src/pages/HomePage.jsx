import { useEffect } from "react";
import { useLocation } from "react-router";
import { FaArrowRight, FaCode } from "react-icons/fa";
import profileImg from "../assets/images/profile-image.jpg";

import { About } from "./AboutMePage.jsx";
import { Project } from "./ProjectListPage.jsx";
import { Skills } from "./SkillsPage.jsx";
import { ContactPage } from "./ContactPage.jsx";

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <section className="hero" id="hero">
        {/* Background decorations from index.css */}
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>

        <div className="hero-badge animate-fadeIn">
          <span className="badge-dot"></span>
          Available for Hire
        </div>

        <h1 className="hero-title animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          I am a <span className="hero-title-accent">MERN Stack</span> Developer
        </h1>

        <p className="hero-sub animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Hi, I’m Saim Ahmed — a passionate MERN stack developer who loves
          building clean, functional web apps. I enjoy solving real-world
          problems through code and constantly push myself to learn and improve.
        </p>

        <div className="hero-actions animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <a href="#project" className="btn-primary no-underline text-white">
            View Projects <FaArrowRight size={14} />
          </a>
          <a href="#about" className="btn-ghost no-underline">
            <FaCode size={16} /> About Me
          </a>
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: "0.4s", position: "relative", zIndex: 1 }}>
          <div style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid var(--border-card)",
            boxShadow: "0 0 30px var(--accent-glow-heavy)",
            margin: "0 auto"
          }}>
            <img
              src={profileImg}
              alt="Saim Ahmed"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section id="about">
        <About />
      </section>
      
      <section id="project">
        <Project />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      <section id="contact">
        <ContactPage />
      </section>
    </div>
  );
}
