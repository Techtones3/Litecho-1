import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ onOpenSettings }) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (!isLoggedIn) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo1.svg" alt="headphones" className="register-logo2" />
        <h2>LitEcho</h2>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/convert" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Audio Converter
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Help
            </NavLink>
          </li>
          <li>
  <span
    className="nav-link-like"
    onClick={onOpenSettings}
    title="Open Settings"
  >
    Settings
  </span>
</li>

        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
