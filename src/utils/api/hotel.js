import axios from "./http";

export default {
  retrieve(id) {
    return axios
      .get(`hotel/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  getUserHotel() {
    return axios
      .get("hotel/user")
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
