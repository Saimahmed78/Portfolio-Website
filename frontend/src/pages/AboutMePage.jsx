import { FaUser, FaCode, FaGraduationCap, FaFolderOpen } from "react-icons/fa";

export function About() {
  return (
    <div className="section animate-fadeIn" style={{ paddingTop: "100px", paddingBottom: "40px" }}>
      <div className="section-label">Get to know me</div>
      <h1 className="section-title">About <span className="hero-title-accent">Me</span></h1>
      <p className="section-sub">
        I’m a developer obsessed with understanding how things work under the hood.
        I build real-world applications that solve meaningful problems, driven by a philosophy of learning by doing.
      </p>

      <div className="features-grid mt-10">
        {/* Introduction */}
        <div className="feature-card">
          <div className="feature-icon"><FaUser /></div>
          <h2 className="feature-title">Introduction</h2>
          <p className="feature-desc">
            Hi, I’m <strong>Saim Ahmed</strong>. I specialize in the MERN stack and am deeply passionate about
            crafting seamless, full-stack web applications. I believe in writing code that is not only functional
            but also beautiful and maintainable.
          </p>
        </div>

        {/* Education */}
        <div className="feature-card">
          <div className="feature-icon"><FaGraduationCap /></div>
          <h2 className="feature-title">Education</h2>
          <p className="feature-desc">
            Currently pursuing my <strong>6th semester</strong> in <strong>BS Software Engineering</strong> at
            <strong> Riphah International University, Faisalabad Campus</strong>. Alongside my academic studies,
            I actively engineer real-world applications with scalability and system architecture in mind.
          </p>
        </div>

        {/* Skills Summary */}
        <div className="feature-card">
          <div className="feature-icon"><FaCode /></div>
          <h2 className="feature-title">Core Skills</h2>
          <p className="feature-desc mb-4">
            Experienced across the full stack: responsive interfaces using React.js and Tailwind,
            and scalable backend services using Node.js and MongoDB.
          </p>
          <div className="flex flex-wrap gap-2">
            {["React.js", "Node.js", "MongoDB", "REST APIs"].map((skill) => (
              <span key={skill} className="text-xs px-2 py-1 rounded bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-glow-heavy)]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
