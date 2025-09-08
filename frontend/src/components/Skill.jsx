export function SkillCategory({ title, skills, isSoft }) {
  return (
    <div
      className={`p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl ${
        isSoft ? "bg-transparent shadow-none" : ""
      }`}
    >
      <h2
        className={`mb-4 text-xl md:text-2xl font-semibold border-l-4 pl-3 ${
          isSoft ? "text-gray-300" : "text-blue-300 border-blue-500"
        }`}
      >
        {title}
      </h2>
      <ul
        className={`${isSoft ? "space-y-2 text-gray-300 italic" : "space-y-3"}`}
      >
        {skills.map((skill, idx) => (
          <li
            key={idx}
            className={`${
              isSoft
                ? ""
                : "p-2 md:p-3 bg-white/5 border border-white/10 rounded-md transition hover:bg-white/10"
            }`}
          >
            {typeof skill === "string" ? (
              skill
            ) : (
              <>
                <span className="font-bold text-blue-400">{skill.name}</span> –{" "}
                {skill.description}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
