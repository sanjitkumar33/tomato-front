import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Basic validation
  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password.trim())
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:9120/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save JWT token and user info to sessionStorage
        sessionStorage.setItem("ltk", data.token);
        sessionStorage.setItem("userInfo", JSON.stringify(data.user));

        setSuccess("Login successful! Redirecting...");
        setErrors({});
        setFormData({ email: "", password: "" });

        // Redirect to home after short delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setSuccess("");
        setErrors({ server: data.message || "Login failed" });
      }
    } catch (error) {
      setSuccess("");
      setErrors({ server: "Network error. Please try again later." });
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <button type="submit" style={styles.button}>
            Login
          </button>

          {success && <p style={styles.success}>{success}</p>}
          {errors.server && <p style={styles.error}>{errors.server}</p>}
        </form>
      </div>
    </>
  );
};

// Inline styles (same as your Register page)
const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "-8px",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
};

export default Login;
