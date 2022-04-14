import React from "react";
import PropTypes from "prop-types";
import { useSelector, shallowEqual } from "react-redux";
import { Card, CardContent, Typography } from "@material-ui/core";

import { RoomStatus } from "@Components/UI";

import useStyles from "./styles";

export default function RoomCard(props) {
  const { room } = props;
  const classes = useStyles();

  const { selectedDate } = useSelector(
    (state) => state.security.auth,
    shallowEqual
  );

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography align="left">Número: {room.number}</Typography>
        <Typography align="left">Tipo: {room.type?.type}</Typography>
        <Typography align="left">Tipo: {room.type?.capacity}</Typography>
        <RoomStatus data={room} selectedDate={selectedDate} />
      </CardContent>
    </Card>
  );
}

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
};
