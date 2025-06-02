import axios from "axios";

const api = axios.create({
  baseURL: process.env.CONNECTION_URL,
  withCredentials: false,
});

export default api;
