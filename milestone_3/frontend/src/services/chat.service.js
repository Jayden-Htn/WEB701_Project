import axios from "axios";

const API_URL = "http://localhost:8080/api/chat/";

const getResponse = (message) => {
  return axios.post(API_URL + "generate", { message: message })
};

const startModel = () => {
  return axios.get(API_URL + "start")
};

const ChatService = {
  getResponse,
  startModel
};

export default ChatService;