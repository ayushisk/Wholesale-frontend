import axios from "axios";

console.log(process.env.NEXT_PUBLIC_API_BASE_URL, "the yrk ");
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1",
  withCredentials: true,
});

export default axiosInstance;
