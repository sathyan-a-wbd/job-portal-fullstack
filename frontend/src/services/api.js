import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//Get User
export const GetUser = async () => {
  const res = await API.get("/api/users");
  return res.data;
};

//Create User

export const CreateUser = async (input) => {
  const res = await API.post("/api/users/register", input);
  return res.data;
};

//Delete User
export const DeleteUser = async (id) => {
  const res = await API.delete(`/api/users/${id}`);
  return res.data;
};

export const LoginUser = async (data) => {
  const res = await API.post("/api/users/login", data);
  return res.data.token;
};

export const GetProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await API.get("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const validateUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const res = await API.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    localStorage.removeItem("token");
    console.log(error);
    return null;
  }
};
//Update User

export const UpdateUser = async (userData) => {
  const token = localStorage.getItem("token");
  const res = await API.put(`/api/users/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const updateResumeAPI = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("resume", file);

  const res = await API.put("/api/users/resume", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getSummary = async (input) => {
  const token = localStorage.getItem("token");
  const res = await API.post("/api/ai/generate-summary", input, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const deleteResumeAPI = async () => {
  const token = localStorage.getItem("token");

  const res = await API.delete("/api/users/resume", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
