import axios from "./http";

export default {
  list() {
    return axios
      .get("booking")
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  retrieve(id) {
    return axios
      .get(`booking/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  update(data) {
    return axios
      .put(`booking/${data.id}`, data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete(id) {
    return axios
      .delete(`booking/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
