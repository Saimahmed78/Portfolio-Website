import { useState } from "react";
import apiClient from "../../../service/apiClient";
import toast from "react-hot-toast";
import { Link } from "react-router";
function ResendVerifyEmail() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { email } = form;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await apiClient.resendVerifyEmail(email);
      console.log("User is sending request for resend verification Email", response);

      if (response?.success==true) {
        setSuccessMessage("verification email send Successfully");
        toast.success("Verification Email is sent successfully");
        setForm({ email: "" });
      } else {
        console.log("Account creation failed");
        setErrorMessage("There is something wrong from the server");
      }
    } catch (error) {
        console.log("Error in resend ", error)
      if (error.message) {
        setErrorMessage("Error", error.message);
      } else {
        setErrorMessage("Something went wrong in registration", error);
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email here"
          value={form.email}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submit..." : "Submit"}
        </button>
       
      </form>

    </>
  );
}
export default ResendVerifyEmail;
