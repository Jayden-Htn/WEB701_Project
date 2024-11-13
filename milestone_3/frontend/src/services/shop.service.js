import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service"

const API_URL = "http://localhost:8080/api/shop/";

const purchaseItem = (id) => {
  return axios.patch(API_URL + "purchase", { id: id }, { headers: authHeader()})
  .then((response) => {
    console.log("New data:", response.data);
    // If successful, update user in local storage
    return AuthService.updateCurrentUser(response.data);
  }).catch((err) => {
    console.log("Error:", err);
    return null;
  });
};

const addItem = (name, description, price, quantity, category) => {
  return axios.patch(API_URL + "add", 
    { name, description, price, quantity, category }, 
    { headers: authHeader()}
  )
};

const ShopService = {
  purchaseItem,
  addItem
};

export default ShopService;