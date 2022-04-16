import axios from "./http";

export default {
  list() {
    return axios
      .get("room_type")
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  create(data) {
    return axios
      .post("room_type", data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  retrieve(id) {
    return axios
      .get(`room_type/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  update(data) {
    return axios
      .put(`room_type/${data.id}`, data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete(id) {
    return axios
      .delete(`room_type/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
