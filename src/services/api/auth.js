import axios from "./http";

export default {
  login(data) {
    return axios
      .post("api-token-auth/", data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  verifyToken(token) {
    return axios
      .get(`api-token-auth/?token=${token}`, token)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
