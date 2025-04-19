import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../utils/api";
import "./reset.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const response = await api.post("/reset-password", {
        token,
        newPassword,
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Reset failed. Try again.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
        {message && <p className="reset-message">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
