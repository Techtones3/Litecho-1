// ✅ Updated Navbar.jsx with Profile Dropdown
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoMoonSharp } from "react-icons/io5";
import { GrSun } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { BsVolumeUp } from "react-icons/bs";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [colorblindMode, setColorblindMode] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedIn = true;

  useEffect(() => {
    if (!isLoggedIn) return;
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedColorblindMode = localStorage.getItem("colorblindMode") === "true";
    setDarkMode(savedDarkMode);
    setColorblindMode(savedColorblindMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
    document.body.classList.toggle("colorblind-mode", savedColorblindMode);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          "google_translate_element"
        );
      };
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isLoggedIn]);

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const toggleColorblindMode = () => {
    const newMode = !colorblindMode;
    setColorblindMode(newMode);
    document.body.classList.toggle("colorblind-mode", newMode);
    localStorage.setItem("colorblindMode", newMode);
  };

  const speakNavigationGuide = () => {
    const guide =
      "Welcome to LitEcho, your audio converter. To adjust the display, use the dark mode button for a low-light theme, and the eye icon to optimize contrast for colorblind users. For language options, click the globe icon, and to hear these instructions again, press the screen reader button. Use tab to navigate through the website.";
    speakText(guide);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="brand-name">LitEcho</h2>
      </div>

      <div className="navbar-right">
        <button className="toggle-button" onClick={toggleDarkMode} title="Toggle Dark Mode">
          {darkMode ? <IoMoonSharp size={22} /> : <GrSun size={22} />}
        </button>

        <button className="toggle-button" onClick={toggleColorblindMode} title="Toggle Colorblind Mode">
          <FaEye size={20} />
        </button>

        <div className="translate-wrapper">
          <button className="toggle-button" onClick={() => setShowTranslate((prev) => !prev)} title="Toggle Translate">
            <TbWorld size={22} />
          </button>
          <div id="google_translate_element" className={showTranslate ? "visible" : "hidden"}></div>
        </div>

        <button className="toggle-button" onClick={speakNavigationGuide} title="Screen Reader">
          <BsVolumeUp size={20} />
        </button>

        {/* Profile Avatar and Dropdown */}
        <div className="profile-wrapper" ref={dropdownRef}>
        <img
  src="/profile.jpg"
  alt="User Avatar"
  className="navbar-avatar"
  title="Profile"
  onClick={() => setDropdownOpen(!dropdownOpen)}
/>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={() => navigate("/profile")}>View Profile</button>
              <button onClick={() => navigate("/audio-history")}>Audio History</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
