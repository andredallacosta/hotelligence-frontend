import { appConstants } from "Redux@Constants";
import { request } from "Redux@Helpers";

function SetSelectedDate(selectedDate) {
  return (dispatch) => {
    dispatch(request(appConstants.SET_SELECTED_DATE, selectedDate));
  };
}

export const appActions = {
  SetSelectedDate,
};
