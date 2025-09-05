import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ContactForm } from "../component/Contactform.jsx";
import "../styles/contact.css";

export function ContactPage() {
  return (
    <section className="contact-section">
      <div className="contact-form-container">
        <h2>Get in Touch</h2>
        <ContactForm />
      </div>

      <div className="contact-info-container">
        <h2>Contact Information</h2>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />{" "}
          <a
            href="mailto:softwareengineer278@gmail.com"
            style={{ color: "#3b82f6", textDecoration: "underline" }}
          >
            softwareengineer278@gmail.com
          </a>
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> +92 312 3456789
        </p>
        <p>
          <FontAwesomeIcon icon={faGithub} />{" "}
          <a
            href="https://github.com/Saimahmed78"
            style={{ color: "#3b82f6", textDecoration: "underline" }}
          >
            https://github.com/Saimahmed78
          </a>
        </p>
        <p>
          <FontAwesomeIcon icon={faLinkedin} />{" "}
          <a
            href="https://www.linkedin.com/in/saim-ahmed-722b802ba"
            style={{ color: "#3b82f6", textDecoration: "underline" }}
          >
            https://www.linkedin.com/in/saim-ahmed-722b802ba
          </a>
        </p>
      </div>
    </section>
  );
}
