import axios from 'axios';

class ChatService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  create = async (requestBody) => {
    return this.api.post('/chat/create', requestBody)
  }
  findAll = async (userId) => {
    return this.api.get(`/chat/${userId}`)
  }
  findUser = async (userId) => {
    return this.api.get(`/chat/user/${userId}`)
  }
  findAllUsers = async () => {
    return this.api.get("/api/allUsers")
  }
  findChat = async (chatId) => {
    return this.api.get(`/messages/find/${chatId}`)
  }
  createMessage = async (requestBody) => {
    return this.api.post(`/messages/create`, requestBody)
  }
}

// Create one instance of the service
const chatService = new ChatService();

export default chatService;