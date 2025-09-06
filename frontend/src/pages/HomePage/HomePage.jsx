import { CtaButton } from "../../components/Button/Button";
import profileImg from "../../assets/images/profile-image.jpg";
import styles from "./HomePage.module.css"; // import the CSS module

export function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles["hero-left"]}>
        <h1>I am MERN Stack Developer</h1>
        <p>
          Hi, I’m Saim Ahmed — a passionate MERN stack developer who loves
          building clean, functional web apps. I enjoy solving real-world
          problems through code and constantly push myself to learn and
          improve.
        </p>
        <CtaButton className={styles["cta-button"]} to="/project">Project</CtaButton>
        <CtaButton className={styles["cta-button"]} to="/about">About me</CtaButton>
      </div>

      <div className={styles["hero-right"]}>
        <div className={styles["profile-img-wrapper"]}>
          <img src={profileImg} alt="Saim Ahmed" />
        </div>
      </div>
    </main>
  );
}
