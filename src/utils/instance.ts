import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // change to your backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Request interceptor */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // if using auth
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* Response interceptor */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // handle logout or redirect
      console.log("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
