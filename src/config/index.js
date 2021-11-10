import axios from "axios";
import { CONFIG } from "./../constants";

// Replace 'PROD' to 'Dev' to see store state in console
export const isDev = () => {
  return process.env.NODE_ENV === CONFIG.MODE.PROD;
};

export const axiosInstance = axios.create({
  baseURL: "https://stoplight.io/mocks/kode-education/trainee-test/25143926",
});

// Request interceptor
// Replace 'SUCCESS' to 'ERROR' to get 5xx response
axiosInstance.interceptors.request.use(
  (config) => {
    Object.assign(config.headers, {
      "Content-Type": "application/json",
      ...CONFIG.HEADERS.SUCCESS,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
