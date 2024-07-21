import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export default axios.create({
  baseURL: BASE_URL,
});
//to mi nie dziala nizej
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
