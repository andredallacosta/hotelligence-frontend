import axios from "./http";

export default {
  login(data) {
    return axios
      .post("auth", data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  verifyToken(token) {
    return axios
      .get(`auth?token=${token}`, token)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
