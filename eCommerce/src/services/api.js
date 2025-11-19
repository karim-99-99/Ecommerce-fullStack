
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ecommerce-fullstack-django.up.railway.app/api/";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Token ${token}`;
  }
  return req;
});

// ======= AUTH ENDPOINTS ======= //
export const loginUser = async (data) => API.post("login/", data);
export const registerUser = async (data) => API.post("register/", data);
export const logoutUser = () => localStorage.removeItem("token");

// ======= PRODUCT ENDPOINTS ======= //
export const fetchProducts = async () => API.get("products/");
export const fetchProductById = async (id) => API.get(`products/${id}/`);
export const fetchByCategory = async (category) =>
  API.get(`products/category/${category}/`);

export const fetchCategories = async () => API.get("categories/");

export const addProduct = async (data) => 
  API.post("products/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export default API;




