import { apiUrl } from './constants';
import axios from "axios";

const axiosApi = axios.create({
    baseURL: apiUrl,
});

export default axiosApi;