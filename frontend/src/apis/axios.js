import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend base url
  withCredentials: true, // safe to keep (cookies / future use)
});

export default api;
