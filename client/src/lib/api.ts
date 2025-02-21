import axios from "axios";
import axiosInstance from "../utils/axiosConfig";

const api = "http://localhost:8080/api/v1"
export default api

export const apiHost = "http://localhost:8080"

export const fetchProducts = async () => {
  const response = await axios.get(`${api}/products`);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axiosInstance.get(`${api}/orders`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axiosInstance.get(`${api}/users`);
  return response.data;
};