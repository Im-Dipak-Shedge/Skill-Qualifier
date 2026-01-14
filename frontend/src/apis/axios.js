import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/", // backend base url
    withCredentials: true, // safe to keep (cookies / future use)
});

/*
  REQUEST INTERCEPTOR
  Runs BEFORE every request
*/
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/*
  RESPONSE INTERCEPTOR
  Runs AFTER every response
*/
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // token invalid or expired
            localStorage.removeItem("token");

            // optional redirect
            // window.location.href = "/auth";
        }

        return Promise.reject(error);
    }
);

export default api;
