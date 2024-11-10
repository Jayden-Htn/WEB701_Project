import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/page/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getStaffBoard = () => {
  return axios.get(API_URL + "staff", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getDonatorBoard = () => {
  return axios.get(API_URL + "donator", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getStaffBoard,
  getAdminBoard,
  getDonatorBoard
};

export default UserService;