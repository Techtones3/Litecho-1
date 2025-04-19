// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ Your Render backend
});

export default api;
