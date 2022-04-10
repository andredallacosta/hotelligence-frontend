import { authConstants } from "Redux@Constants";
import { request, success, failure } from "Redux@Helpers";
import axios from "axios";

import api from "../../../services/api";

function Login(data) {
  return (dispatch) => {
    const { username, password, token } = data;

    dispatch(request(authConstants.LOGIN_REQUEST, "usuario", "Logando..."));

    if (token) {
      api.auth.verifyToken(token).then((response) => {
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        dispatch(success(authConstants.LOGIN_SUCCESS, response.data));
      });
    } else {
      api.auth
        .login({ username, password })
        .then((response) => {
          axios.defaults.headers.common.Authorization = `Token ${token}`;
          localStorage.setItem("token", response.data?.token);
          dispatch(success(authConstants.LOGIN_SUCCESS, response.data));
        })
        .catch(() => {
          dispatch(
            failure(authConstants.LOGIN_FAILURE, "error", {
              title: "Erro",
              msg: "Usuário ou senha Inválidos!",
            })
          );
        });
    }
  };
}

function Logout() {
  localStorage.removeItem("token");
  return { type: authConstants.LOGOUT };
}

export const authActions = {
  Login,
  Logout,
};
