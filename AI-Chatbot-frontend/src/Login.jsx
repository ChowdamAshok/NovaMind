import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simple local storage based auth
  const handleRegister = () => {
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("novamind_users") || "{}");

    if (users[username]) {
      setError("Username already exists. Please choose another.");
      return;
    }

    users[username] = password;
    localStorage.setItem("novamind_users", JSON.stringify(users));
    setSuccess("Account created! You can now login.");
    setTab("login");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = () => {
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("novamind_users") || "{}");

    if (!users[username]) {
      setError("Username not found. Please register first.");
      return;
    }

    if (users[username] !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    onLogin(username);
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <div className="login-icon">🧠</div>
        <h1 className="login-title">NovaMind</h1>
        <p className="login-subtitle">Your intelligent AI assistant</p>

        {/* TABS */}
        <div className="tabs">
          <button
            className={`tab-btn ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setError(""); setSuccess(""); }}
          >
            Login
          </button>
          <button
            className={`tab-btn ${tab === "register" ? "active" : ""}`}
            onClick={() => { setTab("register"); setError(""); setSuccess(""); }}
          >
            Register
          </button>
        </div>

        <div className="login-form">

          {/* USERNAME */}
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (tab === "login" ? handleLogin() : handleRegister())}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (tab === "login" ? handleLogin() : handleRegister())}
            />
          </div>

          {/* CONFIRM PASSWORD — only on register */}
          {tab === "register" && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              />
            </div>
          )}

          {error && <p className="error-msg">⚠️ {error}</p>}
          {success && <p className="success-msg">✅ {success}</p>}

          {tab === "login" ? (
            <button className="login-btn" onClick={handleLogin}>
              Login to NovaMind →
            </button>
          ) : (
            <button className="login-btn" onClick={handleRegister}>
              Create Account →
            </button>
          )}

        </div>

        <p className="login-footer">
          Built with ❤️ using React + Spring Boot + Groq
        </p>

      </div>
    </div>
  );
}

export default Login;