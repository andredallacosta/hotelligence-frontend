/* eslint-disable default-param-last */
import { authConstants } from "../../_constants";

const initialState = () => ({ user: {} });

export function auth(state = initialState(), action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        _submitted: true,
        user: action.payload,
      };
    case authConstants.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload?.token);
      return {
        loggedIn: true,
        user: action.payload,
      };
    case authConstants.LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {};
    case authConstants.LOGOUT:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
}
