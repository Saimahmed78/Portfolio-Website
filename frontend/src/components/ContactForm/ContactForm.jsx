import { useState } from "react";
import { useContactform } from "../../hooks/useContactForm";
export function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    message: "",
  });

  const {
    submitForm,
    successMessage,
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
    setSuccessMessage,
  } = useContactform();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(form);
    setForm({ firstName: "", secondName: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />

        <label htmlFor="secondName">Last Name</label>
        <input
          type="text"
          name="secondName"
          placeholder="Last Name"
          value={form.secondName}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          rows={6}
          placeholder="Type your message..."
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          Send Message
        </button>
      </form>

      {successMessage && <p>succcess</p>}
      {errorMessage && <p>error</p>}
    </>
  );
}
