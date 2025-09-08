export function About() {
  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-8">
      {/* 🔹 Introduction Card */}
      <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/10 transition-transform hover:-translate-y-2 hover:shadow-2xl">
        <h1 className="text-2xl md:text-3xl mb-4 text-blue-400 drop-shadow-md">
          👋 Introduction
        </h1>
        <p className="text-gray-200">
          Hi, I’m <strong>Saim Ahmed</strong> — a MERN stack developer obsessed
          with understanding websites under the hood. I build real-world
          applications that solve meaningful problems. My mantra:{" "}
          <em>learn by doing</em>, not just tutorials.
        </p>
      </section>

      {/* 🔹 Skills Card */}
      <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/10 transition-transform hover:-translate-y-2 hover:shadow-2xl">
        <h2 className="text-2xl md:text-3xl mb-4 text-blue-400 drop-shadow-md">
          🛠 Skills
        </h2>
        <h3 className="text-gray-200 font-semibold mb-2">Main Stack</h3>
        <ul className="flex flex-wrap gap-3 mb-4">
          {[
            "Frontend",
            "Backend",
            "MongoDB",
            "React.js",
            "Node.js",
            "REST APIs",
          ].map((skill) => (
            <li
              key={skill}
              className="bg-blue-400/20 text-blue-200 px-4 py-1 rounded-full border border-blue-500/30 font-medium text-sm transition hover:scale-105 hover:bg-blue-400/30"
            >
              {skill}
            </li>
          ))}
        </ul>
        <p className="text-gray-200">
          Experienced across full stack: responsive interfaces using{" "}
          <strong>HTML, CSS, JS, React.js, TanStack Router, Bootstrap</strong>{" "}
          and backend services using <strong>Node, MongoDB, PostgreSQL</strong>.
          I’ve mastered advanced JS topics like{" "}
          <em>event loop, execution order, polyfills, and async patterns</em>.
        </p>
      </section>

      {/* 🔹 Education Card */}
      <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/10 transition-transform hover:-translate-y-2 hover:shadow-2xl">
        <h2 className="text-2xl md:text-3xl mb-4 text-blue-400 drop-shadow-md">
          🎓 Education
        </h2>
        <p className="text-gray-200">
          Currently pursuing my <strong>4th semester</strong> in{" "}
          <strong>BS Software Engineering</strong> at{" "}
          <strong>Riphah International University, Faisalabad Campus</strong>.
          Alongside studies, I actively build real-world applications with
          scalability and architecture in mind.
        </p>
      </section>

      {/* 🔹 Projects Card */}
      <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/10 transition-transform hover:-translate-y-2 hover:shadow-2xl">
        <h2 className="text-2xl md:text-3xl mb-4 text-blue-400 drop-shadow-md">
          📂 Projects
        </h2>
        <ul className="flex flex-col gap-2 mt-2">
          {[
            "Digital Timer",
            "eBook Store (API integrated)",
            "Markdown Previewer",
            "Simple Calculator",
            "Tip Calculator",
            "Custom Auth Backend (Node + MongoDB)",
          ].map((project) => (
            <li
              key={project}
              className="bg-white/4 text-gray-200 p-2 rounded-md border border-white/10 transition hover:bg-white/7"
            >
              {project}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
