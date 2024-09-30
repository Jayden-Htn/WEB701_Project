import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (firstName, lastName, email, password, organisation) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    email,
    password,
    organisation,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {email, password,}).then((response) => {
    // If successfully logged in, store user data locally
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "logout").then((response) => {
    return response.data;
  });
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const updateCurrentUser = (data) => {
  // Get current user data
  let currentUser = getCurrentUser();
  if (currentUser) {
    // Update user purchases and token amount
    currentUser.tokens = data.tokens;  
    currentUser.purchases = data.purchases;  
    localStorage.setItem("user", JSON.stringify(currentUser));
    return currentUser;
  } else {
    console.log("Error: User not found in localStorage");
    return null;
  }
};


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateCurrentUser,
};

export default AuthService;