import { Link } from "@tanstack/react-router";
import { CTAButton } from "../component/buttons";
import "../styles/home.css";
export function Mainpage() {
  return (
    <>
      <main className="hero">
        <div className="hero-left">
          <h1>I am MERN Stack Developer</h1>
          <p>
            Hi, I’m Saim Ahmed — a passionate MERN stack developer who loves
            building clean, functional web apps. I enjoy solving real-world
            problems through code and constantly push myself to learn and
            improve."
          </p>

          <CTAButton to="/project">Project</CTAButton>
          <CTAButton to="/about">About me</CTAButton>
        </div>
      </main>
    </>
  );
}
