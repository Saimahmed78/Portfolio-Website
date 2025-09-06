import {
  frontendSkills,
  backendSkills,
  softSkills,
} from "../../data/skills.js";
import { SkillCategory } from "../../components/Skill/Skill.jsx";
import styles from "./SkillsPage.module.css";

export function Skills() {
  return (
    <section className={styles.skillsPage}>
      <h1 className={styles.pageTitle}>My Technical Skillset</h1>

      <div className={styles.skillsGrid}>
        <SkillCategory title="Frontend Skills" skills={frontendSkills} />
        <SkillCategory title="Backend Skills" skills={backendSkills} />
        <SkillCategory title="Soft Skills" skills={softSkills} isSoft />
      </div>
    </section>
  );
}
