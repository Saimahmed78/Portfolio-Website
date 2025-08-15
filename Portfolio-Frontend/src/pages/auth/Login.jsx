import { useState } from "react";
import apiClient from "../../../service/apiClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router";
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { email, password } = form;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      console.log("User is logging into account");
      const response = await apiClient.login(email, password);
      if (response?.data) {
        console.log("You are logged into account");
        setSuccessMessage("Account loggedin  Successfully");
        toast.success("You are being directed to dashboard");
        setForm({ email: "", password: "" });
        navigate("/");
      } else {
        console.log("Account creation failed");
        setErrorMessage("There is something wrong from the server");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage("Error", error);
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
          {loading ? "login..." : "login"}
        </button>
        <p>
          {" "}
          Do not have an account ? <Link to="/register">
            Create account
          </Link>{" "}
        </p>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}
export default Login;
