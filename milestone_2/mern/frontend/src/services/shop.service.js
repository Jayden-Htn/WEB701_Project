import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/shop/";

const purchaseItem = (id) => {
  return axios.patch(API_URL + "purchase", { id: id }, { headers: authHeader()});
};

const ShopService = {
  purchaseItem,
};

export default ShopService;