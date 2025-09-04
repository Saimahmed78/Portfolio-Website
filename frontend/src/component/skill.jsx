import  "../styles/skills.css"
export function SkillCategory({ title, skills, isSoft }) {
  return (
    <div className="skill-section">
      <h2>{title}</h2>
      <ul className={`skill-list ${isSoft ? "soft" : ""}`}>
        {skills.map((skill, index) => (
          <li key={index}>
            {typeof skill === "string" ? (
              skill
            ) : (
              <>
                <span>{skill.name}</span> – {skill.description}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
