import Axios from "axios";
import ProtectedUrls from "./ProtectedUrls";

const axios = Axios.create({
  baseURL: ProtectedUrls.baseUrl,
});

axios.interceptors.request.use(
  (config) => {
    // Retrieve your JWT token from sessionStorage
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
