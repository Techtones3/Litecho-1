// src/routes/Routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import Convert from "../convert/Convert";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import AudioHistory from "../components/AudioHistory";
import About from "../components/About";
import Help from "../components/Help";

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />

      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/convert"
        element={isLoggedIn ? <Convert /> : <Navigate to="/login" replace />}
      />
<Route
  path="/audio-history"
  element={isLoggedIn ? <AudioHistory /> : <Navigate to="/login" replace />}
/>

      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
