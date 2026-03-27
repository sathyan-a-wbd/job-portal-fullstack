import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//Get User
export const GetUser = async () => {
  const res = await API.get("/users");
  return res.data;
};

//Create User

export const CreateUser = async (input) => {
  const res = await API.post("/users/register", input);
  return res.data;
};

//Delete User
export const DeleteUser = async (id) => {
  const res = await API.delete(`/users/${id}`);
  return res.data;
};

export const LoginUser = async (data) => {
  const res = await API.post("/users/login", data);
  return res.data.token;
};

export const GetProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await API.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

//Update User

export const UpdateUser = async (userData) => {
  const token = localStorage.getItem("token");
  const res = await API.put(`/users/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
