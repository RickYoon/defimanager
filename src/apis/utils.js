// chart, tvl, token
import axios from "axios";

const BASE_URL = ""

const axiosApi = (url) => {
    const instance = axios.create({baseURL: url})
    return instance
}

export const defaultInstance = axiosApi(BASE_URL);