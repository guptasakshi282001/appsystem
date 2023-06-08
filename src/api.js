import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000", 
});

axiosInstance.interceptors.request.use((config) => {
  config.url = `${axiosInstance.defaults.baseURL}${config.url}`;
  return config;
});

export default axiosInstance;
