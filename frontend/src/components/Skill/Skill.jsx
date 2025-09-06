import styles from "../../pages/SkillsPage/SkillsPage.module.css";

export function SkillCategory({ title, skills, isSoft }) {
  const sectionClass = `${styles.skillSection} ${isSoft ? styles.skillSoft : ""}`;
  
  return (
    <div className={sectionClass}>
      <h2 className={styles.skillSectionTitle}>{title}</h2>
      <ul className={styles.skillList}>
        {skills.map((skill, index) => (
          <li key={index} className={styles.skillListItem}>
            {typeof skill === "string" ? (
              skill
            ) : (
              <>
                <span className={styles.skillListItemSpan}>{skill.name}</span> – {skill.description}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
