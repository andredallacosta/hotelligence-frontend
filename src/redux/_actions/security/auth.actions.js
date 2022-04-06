import axios from "axios";
import { authConstants } from "Redux@Constants";
import { request, success, failure } from "Redux@Helpers";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

// Login funcion
function Login(data) {
  return (dispatch) => {
    const { username, password } = data;
    dispatch(request(authConstants.LOGIN_REQUEST, "usuario", "Logando..."));
    axios
      .post("api-token-auth/", {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data?.token);
        dispatch(success(authConstants.LOGIN_SUCCESS, username));
      })
      .catch(() => {
        dispatch(
          failure(authConstants.LOGIN_FAILURE, "error", {
            title: "Erro",
            msg: "Usuário ou senha Inválidos!",
          })
        );
      });
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
