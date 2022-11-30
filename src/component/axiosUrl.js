import axios from "axios";

let baseUrl = "";

process.env.NODE_ENV === "development"
  ? (baseUrl = process.env.REACT_APP_DEV_URL)
  : (baseUrl = process.env.REACT_APP_STAGE_URL);

const axiosUrl = axios.create({
  baseURL: baseUrl,
});

export default axiosUrl;
