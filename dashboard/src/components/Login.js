import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      if (isSignup) {
        await axios.post("http://localhost:3002/signup", { email, password });
        setSuccess("Account created! You can now log in.");
        setIsSignup(false);
      } else {
        await axios.post("http://localhost:3002/login", { email, password });
        localStorage.setItem("user", email);
        onLogin(email);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img src="logo.png" alt="logo" style={{ width: 40 }} />
          <h2 style={styles.title}>{isSignup ? "Create Account" : "Login"}</h2>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={styles.btn} onClick={handleSubmit}>
          {isSignup ? "Sign up" : "Login"}
        </button>

        <p style={styles.toggle}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span style={styles.link} onClick={() => { setIsSignup(!isSignup); setError(""); setSuccess(""); }}>
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    width: "380px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  title: {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "500",
    color: "#333",
  },
  field: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "0.8rem",
    color: "#666",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.9rem",
    boxSizing: "border-box",
    outline: "none",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#4184f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.95rem",
    cursor: "pointer",
    marginTop: "8px",
  },
  error: {
    background: "#fff0f0",
    color: "#d32f2f",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "0.85rem",
    marginBottom: "16px",
  },
  success: {
    background: "#f0fff0",
    color: "#388e3c",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "0.85rem",
    marginBottom: "16px",
  },
  toggle: {
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#888",
    marginTop: "16px",
  },
  link: {
    color: "#4184f3",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
