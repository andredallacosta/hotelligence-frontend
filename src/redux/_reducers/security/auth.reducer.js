/* eslint-disable default-param-last */
import { authConstants } from "../../_constants";

const initialState = () => ({ user: {}, loginStatus: "idle", loggedIn: false });

export function auth(state = initialState(), action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggedIn: false,
        _submitted: true,
        user: action.payload,
        loginStatus: "requesting",
      };
    case authConstants.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload?.token);
      return {
        loggedIn: true,
        user: action.payload,
        loginStatus: "success",
      };
    case authConstants.LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        loginStatus: "failure",
        user: {},
        loggedIn: false,
      };
    case authConstants.LOGOUT:
      return {
        loggedIn: false,
        loginStatus: "idle",
        user: {},
      };
    default:
      return state;
  }
}
