import axios from "axios";

const API_URL = "http://localhost:4000/api/user";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const response = await axios.post(API_URL + "/login", userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  if (localStorage.getItem("user") !== null) {
    localStorage.removeItem("user");
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
