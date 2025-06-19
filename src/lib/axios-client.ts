import axios from "axios";
import Cookies from "js-cookie";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  timeout: 30000,
};

const API = axios.create(options);

export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response) => response);

// Add request interceptor to handle authentication token
API.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    if (error.code === "ECONNABORTED") {
      console.warn("Request timed out");
      // You might want to notify the user here
      return Promise.reject({ message: "Request timed out" });
    }

    const { data, status } = error.response;
    if (data.errorCode === "AUTH_TOKEN_NOT_FOUND" && status === 401) {
      try {
        await APIRefresh.get("/auth/refresh");
        return APIRefresh(error.config);
      } catch (error) {
        window.location.href = "/";
      }
    }
    return Promise.reject({
      ...data,
    });
  }
);
export default API;
