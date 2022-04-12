import axios from "./http";

export default {
  list() {
    return axios
      .get("room")
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  retrieve(id) {
    return axios
      .get(`room/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
