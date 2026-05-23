import axios from "axios";
import API from "../services/newApi";
const API_URL = `https://job-portal-fullstack-44qz.onrender.com/api/resume`;

// Attach token from localStorage to every request
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// GET  /api/resume
export const fetchResumeAPI = () => axios.get(API_URL, authHeaders());

// POST /api/resume/upload
export const uploadResumeAPI = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return axios.post(`${API_URL}/upload`, formData, {
    ...authHeaders(),
    headers: {
      ...authHeaders().headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

// PUT  /api/resume/update
export const updateResumeAPI = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return axios.put(`${API_URL}/update`, formData, {
    ...authHeaders(),
    headers: {
      ...authHeaders().headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE /api/resume/delete
export const deleteResumeAPI = () =>
  axios.delete(`${API_URL}/delete`, authHeaders());
