import axios from "./http";

export default {
  list() {
    return axios
      .get("room")
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  create(data) {
    return axios
      .post("room", data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  retrieve(id) {
    return axios
      .get(`room/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  update(data) {
    return axios
      .put(`room/${data.id}`, data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete(id) {
    return axios
      .delete(`room/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
