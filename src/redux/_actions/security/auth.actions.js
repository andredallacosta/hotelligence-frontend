// import axios from 'axios'
import { authConstants } from "Redux@Constants";
import { request, success, failure } from "Redux@Helpers";

// Login funcion
function Login(data) {
  return (dispatch) => {
    const { username, password } = data;
    dispatch(request(authConstants.LOGIN_REQUEST, "usuario", "Logando..."));
    if (data.username === "admin" && password === "admin") {
      setTimeout(() => {
        localStorage.setItem("username", username);
        dispatch(success(authConstants.LOGIN_SUCCESS, username));
      }, [1000]);
    } else {
      dispatch(
        failure(authConstants.LOGIN_FAILURE, "error", {
          title: "Erro",
          msg: "Usuário ou senha Inválidos!",
        })
      );
    }
  };
}

function Logout() {
  localStorage.removeItem("username");
  return { type: authConstants.LOGOUT };
}

export const authActions = {
  Login,
  Logout,
};
