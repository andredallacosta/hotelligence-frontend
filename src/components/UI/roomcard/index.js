import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";

import { RoomStatus } from "@Components/UI";

import useStyles from "./styles";

export default function RoomCard(props) {
  const { data, selectedDate } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography align="left">Número: {data.number}</Typography>
        <Typography align="left">Tipo: {data.type?.type}</Typography>
        <Typography align="left">Tipo: {data.type?.capacity}</Typography>
        <RoomStatus data={data} selectedDate={selectedDate} />
      </CardContent>
    </Card>
  );
}

RoomCard.propTypes = {
  data: PropTypes.object.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};
