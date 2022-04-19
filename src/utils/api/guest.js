import axios from "./http";

export default {
  list() {
    return axios
      .get("guest")
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  create(data) {
    return axios
      .post("guest", data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  retrieve(id) {
    return axios
      .get(`guest/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  update(data) {
    return axios
      .put(`guest/${data.id}`, data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete(id) {
    return axios
      .delete(`guest/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  check(email) {
    return axios
      .get(`guest/check?email=${email}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
