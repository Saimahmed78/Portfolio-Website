export function ProjectInfoComp({ project }) {
  return (
    <article className="max-w-3xl mx-auto my-12 p-10 bg-gray-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-400 mb-3 sm:text-3xl xs:text-2xl">
          {project.title}
        </h1>
        <span className="block w-16 h-1 bg-purple-400 mx-auto rounded-full mb-6"></span>
        <video
          className="w-full rounded-lg border border-gray-700"
          src={project.video || "https://www.w3schools.com/html/mov_bbb.mp4"}
          controls
          poster={project.image || "https://via.placeholder.com/800x400?text=Preview"}
        />
      </header>

      {/* Previews */}
      <section className="my-10 grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <figure className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:translate-y-[-5px] hover:shadow-xl transition-transform duration-300">
          <img
            src={project.image || "https://via.placeholder.com/600x300/2c3e50/ecf0f1?text=Dark+Mode"}
            alt={`${project.title} dark mode`}
            className="w-full object-cover"
          />
          <figcaption className="bg-gray-800 text-purple-400 font-semibold text-center p-3">
            Dark Mode
          </figcaption>
        </figure>
      </section>

      {/* Info Section */}
      <section className="grid gap-7 mb-10 text-gray-300">
        {/* Description */}
        <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Description</h2>
          <p className="text-base leading-relaxed">
            {project.description ||
              "This project showcases XYZ features and demonstrates best practices in React."}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Tech Stack</h2>
          <ul className="list-disc list-inside">
            {(project.techStack || ["React", "CSS", "Vite"]).map((tech, i) => (
              <li key={i}>{tech}</li>
            ))}
          </ul>
        </div>

        {/* Enhancements */}
        <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Enhancements</h2>
          <ul className="list-disc list-inside">
            {(project.enhancementsToMake || ["Improve UI", "Add more features"]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer / Buttons */}
      <footer className="flex flex-wrap justify-center gap-6 mt-6">
        <a
          href={project.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-400 hover:bg-purple-400 transform hover:-translate-y-1 transition-all"
        >
          🔗 GitHub
        </a>
        <a
          href={project.vercel || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg font-semibold text-white bg-purple-400 hover:bg-blue-400 transform hover:-translate-y-1 transition-all"
        >
          🚀 Live Demo
        </a>
      </footer>
    </article>
  );
}
