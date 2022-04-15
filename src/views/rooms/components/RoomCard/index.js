import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

import { RoomStatus } from "@Components/UI";
import { getTotalBookingValue } from "@Utils/helpers";
import useStyles from "./styles";

export default function RoomCard(props) {
  const { data } = props;
  const classes = useStyles();
  const history = useHistory();

  const { selectedDate } = useSelector(
    (state) => state.platform.app,
    shallowEqual
  );

  const booking = data.bookings?.find(
    (b) =>
      selectedDate >= new Date(b.start_date) &&
      selectedDate <= new Date(b.end_date) &&
      b.check_out === false
  );

  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/hotelaria/${data.id}`)}
    >
      <CardContent className={classes.content}>
        <Typography align="left">Número: {data.number}</Typography>
        <Typography align="left">Tipo: {data.type?.type}</Typography>
        <Typography align="left">Capacidade: {data.type?.capacity}</Typography>
        <Typography align="left">
          Valor:{" "}
          {booking
            ? getTotalBookingValue(booking)
            : data.value.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
        </Typography>
        <RoomStatus data={data} />
      </CardContent>
    </Card>
  );
}

RoomCard.propTypes = {
  data: PropTypes.object.isRequired,
};
