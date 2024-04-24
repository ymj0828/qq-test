import axios from "axios";

export const instance = axios.create({
  baseURL: "https://rolling-api.vercel.app/2-3",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  async (config) => {
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async (response) => {
    console.log(response);
    return response;
  },
  (error) => Promise.reject(error)
);
