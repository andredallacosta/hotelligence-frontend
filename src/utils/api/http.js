import axios from "axios";

// eslint-disable-next-line import/no-mutable-exports
const url = "https://hotelligence-backend.herokuapp.com/api";

// if (process.env.REACT_APP_ELIXIR_ENV === "production") {
//   url = "https://api-dot-nexus-production-303715.uc.r.appspot.com/";
// } else if (process.env.REACT_APP_ELIXIR_ENV === "staging") {
//   url = "https://api-dot-nexus-staging-303715.uc.r.appspot.com";
// } else if (process.env.REACT_APP_ELIXIR_ENV === "data-staging") {
//   url = "https://api-dot-nexus-data-staging.uc.r.appspot.com";
// } else {
//   url = "http://localhost:8000";
// }

export const api = axios.create({
  baseURL: url,
});

export const baseUrl = url;

export default api;
