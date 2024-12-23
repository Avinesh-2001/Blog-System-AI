import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./../styles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error === "auth_failed") {
      this.setState({
        error: "Google authentication failed. Please try again.",
      });
    }
  }

  handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else {
        this.setState({ error: data.message || "Login failed" });
      }
    } catch (error) {
      this.setState({ error: "Connection error. Please try again." });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { username, password, isLoading, error } = this.state;

    return (
      <div className="login-container">
        <div className="login-form-container">
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
            <p className="brand-tagline">Share your thoughts with the world</p>
          </div>
          {/* Login Form */}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                className={`form-control ${error ? "error" : ""}`}
                placeholder="Username"
                required
              />
              <label className="floating-label">Username</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                className={`form-control ${error ? "error" : ""}`}
                placeholder="Password"
                required
              />
              <label className="floating-label">Password</label>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? <div className="loading-spinner" /> : "Login"}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="google-btn"
              onClick={this.handleGoogleLogin}
            >
              <FcGoogle className="google-icon" />
              Continue with Google
            </button>

            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Background Elements - Added for animated background */}
        <div className="background-shapes">
          {/* These are styled by CSS */}
          <div className="shape-1"></div>
          <div className="shape-2"></div>
          <div className="shape-3"></div>
        </div>
      </div>
    );
  }
}

export default Login;
