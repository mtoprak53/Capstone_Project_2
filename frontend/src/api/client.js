import axios from "axios";
import { headers } from "../config";

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: "https://api-football-v1.p.rapidapi.com/v3",

  headers: headers
});

export default apiClient;