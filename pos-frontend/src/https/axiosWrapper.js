import axios from "axios";

const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
console.log("🔍 VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

export const axiosWrapper = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: { ...defaultHeader },
});
