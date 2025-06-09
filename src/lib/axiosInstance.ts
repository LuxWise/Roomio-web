import axios from "axios";

const api = axios.create({
  baseURL: process.env.CONNECTION_URL_PRODUCTION,
  withCredentials: false,
});

export default api;
