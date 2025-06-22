import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ContactForm } from "../component/contactform.jsx";
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
          <FontAwesomeIcon icon={faEnvelope} /> saim@gmail.com
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> +92 312 3456789
        </p>
        <p>
          <FontAwesomeIcon icon={faGithub} /> github.com/saimdev
        </p>
        <p>
          <FontAwesomeIcon icon={faLinkedin} /> linkedin.com/in/saim-ahmed
        </p>
      </div>
    </section>
  );
}
