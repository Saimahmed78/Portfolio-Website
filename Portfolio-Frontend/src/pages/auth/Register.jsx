import { useState } from "react";
import apiClient from "../../../service/apiClient";
import { Link } from "react-router";
import "./Register.css";
import toast from "react-hot-toast";
function RegisterUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { name, email, password } = form;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("All fields are required");
      toast(errorMessage);
      console.log("validation error");
      return; // stop submission
    }

    // optional: validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email");
      console.log("email error ");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      // 🔹 Only successful responses reach here
      const response = await apiClient.register(name, email, password);

      // ✅ Check 2xx status explicitly
      if (response.statuscode >= 200 && response.statuscode < 300) {
        toast.success(response.data || "Account Created Successfully");
        setForm({ name: "", email: "", password: "" });
      } else {
        // Unexpected non-2xx success (rare)
        toast.error(response.data || "Unexpected response from server");
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      // 🔹 All 4xx, 5xx, network errors end up here

      // Prefer first error from nested errors array if present
      let msg =
        error?.errors?.errors?.[0] ||
        error?.message ||
        error?.data ||
        "Something went wrong";

      toast.error(msg);
      console.log("Full registration error object:", error);

      // Optional: handle specific status codes
      if (error?.statusCode === 409) {
        // User already exists
        console.log("Conflict: User already exists");
      } else if (error?.statusCode >= 400 && error?.statusCode < 500) {
        // Other client errors
        console.log("Client error", error.statusCode);
      } else if (error?.statusCode >= 500) {
        // Server errors
        console.log("Server error", error.statusCode);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Name"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email here"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password here"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submit..." : "Submit"}
        </button>
        <p>
          Already have account ? <Link to="/login">Login</Link>{" "}
        </p>
      </form>
    </>
  );
}
export default RegisterUser;
