import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
});

axios.interceptors.request.use(
  (config) => {
    // Retrieve your JWT token from cookies or sessionStorage
    const token = sessionStorage.getItem("token");
    console.log("token from axios", token);

    // If the token is not null, set it in the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
