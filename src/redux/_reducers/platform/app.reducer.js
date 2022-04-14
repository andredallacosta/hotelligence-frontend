/* eslint-disable default-param-last */
import { authConstants } from "../../_constants";

const initialState = () => ({ selectedDate: new Date() });

export function app(state = initialState(), action) {
  switch (action.type) {
    case authConstants.SET_SELECTED_DATE:
      console.log(action.payload);
      return {
        selectedDate: action.payload?.selectedDate,
      };
    default:
      return state;
  }
}
