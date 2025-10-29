// import axios from "axios";

// // const FAKE_STORE_API = "https://fakestoreapi.com/products";
// const FAKE_STORE_API =  "http://127.0.0.1:8000/api/";


// export const fetchData = async () => {
//   try {
//     const response = await axios.get(`${FAKE_STORE_API}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product", error);
//     throw new Error("Error fetching product");
//   }
// };

// export const fetchDataID = async (id) => {
//   try {
//     const response = await axios.get(`${FAKE_STORE_API}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching id", error);
//     throw new Error("Error fetching id");
//   }
// };

// export const fetchDataCategory = async (category) => {
//   try {
//     const response = await axios.get(`${FAKE_STORE_API}/category/${category}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching category", error);
//     throw new Error("Error fetching category");
//   }
// };

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

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
  API.get(`category/${category}/`);

export default API;



