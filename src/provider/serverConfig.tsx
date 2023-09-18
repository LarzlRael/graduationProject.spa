import axios from 'axios';

export const baseURL = import.meta.env.VITE_SERVER_URL;


export const serverAPI = axios.create({ baseURL });