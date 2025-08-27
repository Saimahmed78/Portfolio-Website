import { CTAButton } from "../component/buttons";
import "../styles/home.css";
import profileImg from "../assets/Profile Image.jpg";

export function Mainpage() {
  return (
    <main className="hero">
      <div className="hero-left">
        <h1>I am MERN Stack Developer</h1>
        <p>
          Hi, I’m Saim Ahmed — a passionate MERN stack developer who loves
          building clean, functional web apps. I enjoy solving real-world
          problems through code and constantly push myself to learn and
          improve.
        </p>
        <CTAButton className="cta-button" to="/project">Project</CTAButton>
        <CTAButton className="cta-button" to="/about">About me</CTAButton>
      </div>

      <div className="hero-right">
        <div className="profile-img-wrapper">
          <img src={profileImg} alt="Saim Ahmed" />
        </div>
      </div>
    </main>
  );
}
