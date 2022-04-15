/* eslint-disable default-param-last */
import { hotelConstants } from "../../_constants";

const initialState = () => ({ hotel: {} });

export function hotel(state = initialState(), action) {
  switch (action.type) {
    case hotelConstants.GET_HOTEL_REQUEST:
      return {
        _submitted: true,
        hotel: action.payload,
      };
    case hotelConstants.GET_HOTEL_SUCCESS:
      return {
        hotel: action.payload,
      };
    case hotelConstants.GET_HOTEL_FAILURE:
      return {};
    default:
      return state;
  }
}
