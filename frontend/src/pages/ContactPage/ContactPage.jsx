import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import styles from "./ContactPage.module.css"; // module import

export function ContactPage() {
  return (
    <section
      className={`${styles["auth-container"]} ${styles["contact-section"]}`}
    >
      <div
        className={`${styles["auth-card"]} ${styles["contact-form-container"]}`}
      >
        <h2 className={styles["auth-title"]}>Get in Touch</h2>
        <ContactForm />
      </div>

      <div
        className={`${styles["auth-card"]} ${styles["contact-info-container"]}`}
      >
        <h2 className={styles["auth-title"]}>Contact Information</h2>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />{" "}
          <a
            href="mailto:softwareengineer278@gmail.com"
            className={styles["auth-text"]}
          >
            softwareengineer278@gmail.com
          </a>
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} />{" "}
          <span className={styles["auth-text"]}>+92 312 3456789</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faGithub} />{" "}
          <a
            href="https://github.com/Saimahmed78"
            className={styles["auth-text"]}
          >
            https://github.com/Saimahmed78
          </a>
        </p>
        <p>
          <FontAwesomeIcon icon={faLinkedin} />{" "}
          <a
            href="https://www.linkedin.com/in/saim-ahmed-722b802ba"
            className={styles["auth-text"]}
          >
            https://www.linkedin.com/in/saim-ahmed-722b802ba
          </a>
        </p>
      </div>
    </section>
  );
}
