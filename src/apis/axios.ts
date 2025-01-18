import axios from "axios";
import { getToken } from "../utils/token";
import { BASE_URL } from "../constants/base.url";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addToken = () => {
  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
