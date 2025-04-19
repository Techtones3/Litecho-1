// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://litecho-1-backend.onrender.com",
});

export default api;
