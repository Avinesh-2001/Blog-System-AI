import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./../styles/signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        {/* Brand Section */}
        <div className="brand-section">
          <div className="brand-header">
            <img
              src="/logo.png"
              alt="BlogSystem AI Logo"
              className="brand-logo"
            />
            <p className="brand-name">BlogSystem AI</p>
          </div>
          <p className="brand-tagline">Join our community of writers</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`form-control ${error ? "error" : ""}`}
              placeholder="Username"
              required
            />
            <label className="floating-label">Username</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-control ${error ? "error" : ""}`}
              placeholder="Email"
              required
            />
            <label className="floating-label">Email</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-control ${error ? "error" : ""}`}
              placeholder="Password"
              required
            />
            <label className="floating-label">Password</label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner" /> : "Sign Up"}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="google-icon" />
            Sign up with Google
          </button>

          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Background Elements */}
      <div className="background-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
    </div>
  );
};

export default Signup;
