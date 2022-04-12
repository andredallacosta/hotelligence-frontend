import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

import useStyles from "./styles";

export default function RoomStatus(props) {
  const { data, selectedDate } = props;
  const classes = useStyles();

  const booking = data.bookings?.find(
    (b) =>
      selectedDate >= new Date(b.start_date) &&
      selectedDate <= new Date(b.end_date)
  );

  const getText = () => {
    switch (data.status) {
      case "available":
        if (booking?.check_in) {
          return <Typography className={classes.occupied}>Ocupado</Typography>;
        }
        if (booking?.check_in === false) {
          return <Typography className={classes.booked}>Reservado</Typography>;
        }
        return (
          <Typography className={classes.available}>Disponível</Typography>
        );
      case "in_cleaning":
        return (
          <Typography className={classes.in_cleaning}>Em Limpeza</Typography>
        );
      case "in_maintenance":
        return (
          <Typography className={classes.in_maintenance}>
            Em Manutenção
          </Typography>
        );
      default:
        return <Typography className={classes.idle}>Sem Status</Typography>;
    }
  };

  return <div className={classes.root}>{getText()}</div>;
}

RoomStatus.propTypes = {
  data: PropTypes.object.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};
