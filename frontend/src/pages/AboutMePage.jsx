import "../styles/about.css"

export function About() {
  return (
    <div className="about-container">
      {/* 🔹 Introduction Card */}
      <section className="about-card">
        <h1 className="section-title">👋 Introduction</h1>
        <p>
          Hi, I’m <strong>Saim Ahmed</strong> — a MERN stack developer with a deep curiosity for how websites work under the hood. I love building real-world applications that solve meaningful problems and expand my understanding. I believe in learning by doing — not just tutorials, but real, hands-on projects.
        </p>
      </section>

      {/* 🔹 Skills Card */}
      <section className="about-card">
        <h2 className="section-title">🛠 Skills</h2>
        <h3>Main Stack</h3>
        <ul className="skill-tags">
          <li>Frontend</li>
          <li>Backend</li>
        </ul>
        <p>
          I’ve worked across the full stack — from building responsive interfaces using <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, <strong>React.js</strong>, <strong>TanStack Router</strong>, and <strong>Bootstrap</strong> to backend services using <strong>REST APIs</strong>, <strong>MongoDB</strong>, and <strong>PostgreSQL</strong>. I’ve also explored advanced JavaScript topics like the <em>event loop</em>, <em>execution order</em>, <em>polyfills</em>, and <em>async patterns</em>.
        </p>
      </section>

      {/* 🔹 Education Card */}
      <section className="about-card">
        <h2 className="section-title">🎓 Education</h2>
        <p>
          I'm currently pursuing my <strong>4th semester</strong> in <strong>BS Software Engineering</strong> at <strong>Riphah International University, Faisalabad Campus</strong>. While studying, I actively build real-world applications, constantly improving my MERN stack skills. I approach every website like a software engineer — with scalability and thoughtful architecture in mind.
        </p>
      </section>

      {/* 🔹 Projects Card */}
      <section className="about-card">
        <h2 className="section-title">📂 Project Highlights</h2>
        <ul className="project-list">
          <li>⏱ Digital Timer</li>
          <li>📚 eBook Store (API integrated)</li>
          <li>📝 Markdown Previewer</li>
          <li>🧮 Simple Calculator</li>
          <li>💰 Tip Calculator</li>
          <li>🔐 Custom Auth Backend (Node + MongoDB)</li>
        </ul>
        <p>
          These “mini” projects laid the foundation of my learning. They challenged me to debug, understand real problems, and bridge frontend with backend effectively.
        </p>
      </section>
    </div>
  );
}
