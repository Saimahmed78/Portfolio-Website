import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ContactForm } from "../components/ContactForm";

export function ContactPage() {
  return (
    <section className="flex flex-col mt-[100px] md:flex-row gap-10 md:gap-16 p-8 md:p-12 rounded-3xl my-12 mx-auto w-[92%] max-w-[1100px] bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl animate-[fade-in-up_0.8s_ease]">
      {/* Left - Contact Form */}
      <div className="flex-1 min-w-[300px]">
        <h2 className="text-6xl font-bold text-white mt-12">Get in Touch</h2>
        <ContactForm />
      </div>

      {/* Right - Contact Info */}
      <div className="flex-1 min-w-[300px] border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Contact Information
        </h2>

        <div className="flex flex-col gap-6 text-gray-300">
          <p className="flex items-center gap-4 text-base hover:text-white transition">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-blue-400 text-lg"
            />
            <a href="mailto:softwareengineer278@gmail.com">
              softwareengineer278@gmail.com
            </a>
          </p>

          <p className="flex items-center gap-4 text-base hover:text-white transition">
            <FontAwesomeIcon icon={faPhone} className="text-blue-400 text-lg" />
            <span>+92 312 3456789</span>
          </p>

          <p className="flex items-center gap-4 text-base hover:text-white transition">
            <FontAwesomeIcon
              icon={faGithub}
              className="text-blue-400 text-lg"
            />
            <a href="https://github.com/Saimahmed78" target="_blank">
              github.com/Saimahmed78
            </a>
          </p>

          <p className="flex items-center gap-4 text-base hover:text-white transition">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-blue-400 text-lg"
            />
            <a
              href="https://www.linkedin.com/in/saim-ahmed-722b802ba"
              target="_blank"
            >
              linkedin.com/in/saim-ahmed
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
