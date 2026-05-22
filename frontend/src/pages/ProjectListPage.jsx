import ProjectComp from "../components/ProjectList";
import { projectDetails } from "../data/projectDetails";

export function Project() {
  return (
    <div className="section section-tight animate-fadeIn" style={{ paddingTop: "100px", paddingBottom: "40px" }}>
      <div className="section-label">Selected Works</div>
      <h1 className="section-title text-[var(--text-display)] tracking-tight">
        Featured <span className="hero-title-accent">Projects</span>
      </h1>
      <p className="section-sub mb-12">
        A collection of web applications I've engineered, showcasing my expertise in the MERN stack, performance optimization, and UI design.
      </p>

      <div className="mt-8">
        <ProjectComp details={projectDetails} />
      </div>
    </div>
  );
}
