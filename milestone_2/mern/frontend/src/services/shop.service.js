import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service"

const API_URL = "http://localhost:8080/api/shop/";

const purchaseItem = (id) => {
  return axios.patch(API_URL + "purchase", { id: id }, { headers: authHeader()})
    .then((response) => {
    // Update user in local storage
    return AuthService.updateCurrentUser(response.data);
  }).catch((err) => {
    console.log("Error:", err);
    return null;
  });
};

const ShopService = {
  purchaseItem,
};

export default ShopService;