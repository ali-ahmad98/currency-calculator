import axios from "axios";
import { BACKEND_API_URL } from "../constants/constants";

// Making axios api instance with fixer config
export default axios.create({
  baseURL: BACKEND_API_URL,
});
