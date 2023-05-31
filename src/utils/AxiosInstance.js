import axios from "axios";

const token =  JSON.parse(localStorage.getItem("namaUser"))?.token
export const apiClient = axios.create({
  // baseURL: 'http://18.177.1.24/api',
  baseURL: "http://api.prime-levels.com/api/",
  headers:token && {
    'Authorization': `Bearer ${token}`
  },
});
