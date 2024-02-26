import axios from "axios";

class OrderService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  create = (requestBody) => {
    return this.api.post("/orders/create", requestBody);
  };

  getOne = (orderId) => {
    return this.api.get(`/orders/${orderId}`);
  };

  getAll = () => {
    return this.api.get(`/orders/all`);
  };
}

const orderService = new OrderService();

export default orderService;
