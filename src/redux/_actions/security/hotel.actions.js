import { hotelConstants } from "Redux@Constants";
import { request, success, failure } from "Redux@Helpers";

import api from "@Utils/api";

function GetUserHotel() {
  return (dispatch) => {
    dispatch(
      request(hotelConstants.GET_HOTEL_REQUEST, "hotel", "Requisitando...")
    );

    api.hotel
      .getUserHotel()
      .then((response) => {
        dispatch(success(hotelConstants.GET_HOTEL_SUCCESS, response.data));
      })
      .catch(() => {
        dispatch(
          failure(hotelConstants.GET_HOTEL_FAILURE, "error", {
            title: "Erro",
            msg: "Usuário não tem hotel cadastrado!",
          })
        );
      });
  };
}

export const hotelActions = {
  GetUserHotel,
};
