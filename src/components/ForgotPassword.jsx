import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "./Forgot.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/forgot-password", { email });
      setMessage(response.data.message || "Reset instructions sent.");
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("Error sending reset link.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <p>Enter your email and we'll send you reset instructions.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p className="forgot-message">{message}</p>}
        <div className="back-login">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
