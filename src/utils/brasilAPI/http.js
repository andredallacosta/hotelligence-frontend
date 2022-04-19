import axios from "axios";

const url = "https://brasilapi.com.br/api";

const client = axios.create({
  baseURL: url,
});

export const baseUrl = url;

export default client;
