import axios from "axios";

const API = axios.create({
  // baseURL: "https://job-portal-fullstack-44qz.onrender.com",
  baseURL: "http://localhost:8000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
