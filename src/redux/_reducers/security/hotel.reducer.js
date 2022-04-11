/* eslint-disable default-param-last */
import { authConstants } from "../../_constants";

const initialState = () => ({ hotel: {} });

export function hotel(state = initialState(), action) {
  switch (action.type) {
    case authConstants.GET_HOTEL_REQUEST:
      return {
        _submitted: true,
        user: action.payload,
      };
    case authConstants.GET_HOTEL_SUCCESS:
      return {
        hotel: action.payload,
      };
    case authConstants.GET_HOTEL_FAILURE:
      return {};
    default:
      return state;
  }
}
