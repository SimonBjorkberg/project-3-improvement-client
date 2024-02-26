import axios from "axios";

class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  create = (requestBody) => {
    // title, description, images, price, quantity, categories = requestBody
    return this.api.post("/product/create", requestBody);
  };

  getOne = (productId) => {
    return this.api.get(`/product/single/${productId}`);
  };

  getAll = () => {
    return this.api.get(`/product/all`);
  };

  editOne = (productId, requestBody) => {
    return this.api.put(`/product/edit/${productId}`, requestBody);
  };

  deleteOne = (productId) => {
    return this.api.post(`/product/delete/${productId}`);
  };

  like = (productId) => {
    return this.api.post(`/product/${productId}/like`);
  };

  uploadImage = async (image) => {
    return this.api.post(`/api/upload`, image);
  };
}

// Create one instance (object) of the service
const productService = new ProductService();

export default productService;
