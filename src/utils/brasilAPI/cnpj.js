import axios from "./http";

export default {
  get(cnpj) {
    return axios
      .get(`/cnpj/v1/${cnpj}`, {})
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
