import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
} from "@material-ui/core";

import { RoomStatus, Button } from "@Components/UI";
import { failure } from "Redux@Helpers";
import api from "@Utils/api";
import useStyles from "./styles";

export default function RoomCard(props) {
  const { room, getRoom } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { selectedDate } = useSelector(
    (state) => state.platform.app,
    shallowEqual
  );

  const booking = room.bookings?.find(
    (b) =>
      selectedDate >= new Date(b.start_date) &&
      selectedDate <= new Date(b.end_date) &&
      b.check_out === false
  );

  const [roomStatus, setRoomStatus] = useState(() => {
    switch (room.status) {
      case "available":
        if (booking?.check_in) {
          return "occupied";
        }
        if (booking?.check_in === false) {
          return "booked";
        }
        return "available";
      case "in_cleaning":
        return "in_cleaning";
      case "in_maintenance":
        return "in_maintenance";
      default:
        return "idle";
    }
  });

  const checkoutRoom = () => {
    setLoading(true);
    api.booking
      .update({ ...booking, check_out: true })
      .then(() => {
        api.room
          .update({
            ...room,
            hotel: room.hotel?.id,
            type: room.type?.id,
            status: "in_cleaning",
          })
          .then(() => {
            setRoomStatus("in_cleaning");
            setLoading(false);
            getRoom();
          })
          .catch(() => {
            setLoading(false);
            dispatch(
              failure("", "error", {
                title: "Erro",
                msg: "Não foi possível atualizar o status do quarto",
              })
            );
          });
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível realizar o checkout",
          })
        );
      });
  };

  const deleteBooking = () => {
    setLoading(true);
    api.booking
      .delete(booking.id)
      .then(() => {
        setRoomStatus("available");
        setLoading(false);
        getRoom();
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível excluir a reserva",
          })
        );
      });
  };

  const makeRoomInMaintenance = () => {
    setLoading(true);
    api.room
      .update({
        ...room,
        hotel: room.hotel?.id,
        type: room.type?.id,
        status: "in_maintenance",
      })
      .then(() => {
        setRoomStatus("in_maintenance");
        setLoading(false);
        getRoom();
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível atualizar o status do quarto",
          })
        );
      });
  };

  const makeRoomAvailable = () => {
    setLoading(true);
    api.room
      .update({
        ...room,
        hotel: room.hotel?.id,
        type: room.type?.id,
        status: "available",
      })
      .then(() => {
        setRoomStatus("available");
        setLoading(false);
        getRoom();
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível atualizar o status do quarto",
          })
        );
      });
  };

  return (
    <Card className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <CardContent className={classes.content}>
            <RoomStatus data={room} selectedDate={selectedDate} />
          </CardContent>
          <CardActions className={classes.cardActions}>
            {roomStatus === "available" && (
              <>
                <Button
                  label="Check-in"
                  className={classes.actionButton}
                  onClick={() => {}}
                />
                <Button
                  label="Reservar"
                  className={classes.actionButton}
                  onClick={() => {}}
                />
                <Button
                  label="Manutenção"
                  className={classes.actionButton}
                  onClick={() => makeRoomInMaintenance()}
                />
              </>
            )}
            {roomStatus === "booked" && (
              <>
                <Button
                  label="Check-in"
                  className={classes.actionButton}
                  onClick={() => {}}
                />
                <Button
                  label="Editar"
                  className={classes.actionButton}
                  onClick={() => {}}
                />
                <Button
                  label="Remover"
                  className={classes.actionButton}
                  onClick={() => deleteBooking()}
                />
              </>
            )}
            {roomStatus === "occupied" && (
              <>
                <Button
                  label="Check-out"
                  className={classes.actionButton}
                  onClick={() => checkoutRoom()}
                />
                <Button
                  label="Editar"
                  className={classes.actionButton}
                  onClick={() => {}}
                />
              </>
            )}
            {(roomStatus === "in_cleaning" ||
              roomStatus === "in_maintenance") && (
              <Button
                label="Tornar Disponível"
                className={classes.actionButton}
                onClick={() => makeRoomAvailable()}
              />
            )}
          </CardActions>
        </>
      )}
    </Card>
  );
}

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  getRoom: PropTypes.func.isRequired,
};
