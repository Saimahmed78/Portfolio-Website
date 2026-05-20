import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ContactForm } from "../components/ContactForm";

export function ContactPage() {
  return (
    <div className="section animate-fadeIn" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
      <div className="section-label">Get in Touch</div>
      <h1 className="section-title">Contact <span className="hero-title-accent">Me</span></h1>
      <p className="section-sub">
        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
      </p>

      <div className="features-grid mt-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {/* Left - Contact Form */}
        <div className="feature-card" style={{ gridColumn: "span 2" }}>
          <h2 className="feature-title mb-6">Send a Message</h2>
          <ContactForm />
        </div>

        {/* Right - Contact Info */}
        <div className="feature-card">
          <h2 className="feature-title mb-6">Contact Information</h2>

          <div className="flex flex-col gap-6 text-[var(--text-secondary)]">
            <p className="flex items-center gap-4 text-base hover:text-[var(--text-primary)] transition">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-[var(--accent-primary)] text-lg"
              />
              <a href="mailto:softwareengineer278@gmail.com">
                softwareengineer278@gmail.com
              </a>
            </p>

            <p className="flex items-center gap-4 text-base hover:text-[var(--text-primary)] transition">
              <FontAwesomeIcon icon={faPhone} className="text-[var(--accent-primary)] text-lg" />
              <span>+92 312 3456789</span>
            </p>

            <p className="flex items-center gap-4 text-base hover:text-[var(--text-primary)] transition">
              <FontAwesomeIcon
                icon={faGithub}
                className="text-[var(--accent-primary)] text-lg"
              />
              <a href="https://github.com/Saimahmed78" target="_blank" rel="noreferrer">
                github.com/Saimahmed78
              </a>
            </p>

            <p className="flex items-center gap-4 text-base hover:text-[var(--text-primary)] transition">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-[var(--accent-primary)] text-lg"
              />
              <a
                href="https://www.linkedin.com/in/saim-ahmed-722b802ba"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/saim-ahmed
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
