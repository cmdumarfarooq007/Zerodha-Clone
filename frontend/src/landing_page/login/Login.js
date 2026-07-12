import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import OpenAccount from "../OpenAccount";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:3002/login", { email, password });
      localStorage.setItem("user", email);
      window.location.href = "http://localhost:3001";
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <div className="container p-5 mt-5">
        <div className="row text-center">
          <h1 className="fs-2 mb-4">Login to Zerodha</h1>
          <p className="text-muted mb-5">
            Enter your email and password to continue.
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <p
              className="text-muted mt-3 text-center"
              style={{ fontSize: "14px" }}
            >
              Not a user yet?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <OpenAccount />
    </>
  );
}

export default Login;
