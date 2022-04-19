import axios from "./http";

export default {
  get(cep) {
    return axios
      .get(`/cep/v1/${cep}`, {})
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
