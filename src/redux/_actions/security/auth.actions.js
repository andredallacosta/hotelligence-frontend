import axios from "@Utils/api/http";

import api from "@Utils/api";
import { request, success, failure } from "Redux@Helpers";
import { authConstants } from "Redux@Constants";

function Login(data) {
  return (dispatch) => {
    const { username, password, token } = data;

    dispatch(request(authConstants.LOGIN_REQUEST, "usuario", "Logando..."));

    if (token) {
      api.auth
        .verifyToken(token)
        .then((response) => {
          axios.defaults.headers.common.Authorization = `Token ${token}`;
          dispatch(success(authConstants.LOGIN_SUCCESS, response.data));
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(
            failure(authConstants.LOGIN_FAILURE, "error", {
              title: "Erro",
              msg: "Sessão expirada!",
            })
          );
        });
    } else {
      api.auth
        .login({ username, password })
        .then((response) => {
          axios.defaults.headers.common.Authorization = `Token ${response.data?.token}`;
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
