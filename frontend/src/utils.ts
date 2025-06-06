import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // just FastAPI default URL 
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;