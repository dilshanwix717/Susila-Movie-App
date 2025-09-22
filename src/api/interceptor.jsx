import axios from "axios";
import { baseUrl} from "./commonConfigs.jsx";


const API_ENDPOINT = axios.create({
    baseURL: baseUrl,
});

export default API_ENDPOINT;