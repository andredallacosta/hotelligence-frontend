/* eslint-disable default-param-last */
import { appConstants } from "Redux@Constants";

const initialState = () => ({ selectedDate: new Date() });

export function app(state = initialState(), action) {
  switch (action.type) {
    case appConstants.SET_SELECTED_DATE:
      return {
        selectedDate: action.payload,
      };
    default:
      return state;
  }
}
