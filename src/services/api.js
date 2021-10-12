import axios from "axios";

export const url = '192.168.1.193';

const api = axios.create({
    baseURL: `http://${url}:3333`,
});

export default api;