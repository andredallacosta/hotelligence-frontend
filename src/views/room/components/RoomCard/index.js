import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import { RoomStatus, Button, Modal } from "@Components/UI";
import { BookingForm } from "@Components/forms";
import { failure } from "Redux@Helpers";
import api from "@Utils/api";
import { getTotalBookingValue } from "@Utils/helpers";
import useStyles from "./styles";

export default function RoomCard(props) {
  const { room, getRoom } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const [confirmCheckout, setConfirmCheckout] = useState(false);

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

  const getTotalMissingValue = () =>
    booking
      ? ((new Date(booking.end_date).getTime() -
          new Date(booking.start_date).getTime()) /
          (1000 * 3600 * 24)) *
          booking.daily_value +
        booking.extras_value -
        booking.paid_value
      : 0;

  const checkoutRoom = () => {
    setLoading(true);
    api.booking
      .update({ ...booking, check_out: true, guest: booking.guest.id })
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
            <RoomStatus data={room} />
            {roomStatus === "booked" && (
              <div className={classes.info}>
                <Typography>
                  De{" "}
                  {new Date(booking.start_date).toLocaleDateString("pt-br", {
                    timeZone: "America/Sao_Paulo",
                  })}{" "}
                  à {new Date(booking.end_date).toLocaleDateString("pt-br")}
                </Typography>
                <Typography>Hóspede: {booking.guest?.full_name}</Typography>
                <Typography>
                  Valor total: {getTotalBookingValue(booking)}
                </Typography>
              </div>
            )}
            {roomStatus === "occupied" && (
              <div className={classes.info}>
                <Typography>
                  De {new Date(booking.start_date).toLocaleDateString("pt-br")}{" "}
                  à {new Date(booking.end_date).toLocaleDateString("pt-br")}
                </Typography>
                <Typography>Hóspede: {booking.guest?.full_name}</Typography>
                <Typography>
                  Valor total: {getTotalBookingValue(booking)}
                </Typography>
                <Typography>
                  Valor total restante:{" "}
                  {getTotalMissingValue()?.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Typography>
              </div>
            )}
          </CardContent>
          <CardActions className={classes.cardActions}>
            {roomStatus === "available" && (
              <>
                <Button
                  label="Check-in"
                  className={classes.actionButton}
                  onClick={() => {
                    setCheckIn(true);
                    setBookingModal(true);
                  }}
                />
                <Button
                  label="Reservar"
                  className={classes.actionButton}
                  onClick={() => setBookingModal(true)}
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
                  onClick={() => {
                    setCheckIn(true);
                    setBookingModal(true);
                  }}
                />
                <Button
                  label="Editar"
                  className={classes.actionButton}
                  onClick={() => setBookingModal(true)}
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
                  onClick={() => {
                    if (getTotalMissingValue() > 0) {
                      setConfirmCheckout(true);
                    } else {
                      checkoutRoom();
                    }
                  }}
                />
                <Button
                  label="Editar"
                  className={classes.actionButton}
                  onClick={() => setBookingModal(true)}
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
      <Modal
        title={`${
          checkIn ? "Check-in" : booking ? "Editar Reserva" : "Reservar"
        }`}
        body={
          <BookingForm
            room={room}
            booking={booking || {}}
            checkIn={checkIn || booking?.check_in}
            onSuccess={() => {
              setBookingModal(false);
              setCheckIn(false);
              getRoom();
            }}
          />
        }
        width="40%"
        open={bookingModal}
        onClose={() => {
          setBookingModal(false);
        }}
        showAcceptButton={false}
        showCancelButton={false}
      />
      <Modal
        title="Tem certeza que deseja fazer o check-out?"
        body={`O valor total restante é de ${getTotalMissingValue()?.toLocaleString(
          "pt-br",
          {
            style: "currency",
            currency: "BRL",
          }
        )}`}
        width="40%"
        open={confirmCheckout}
        onAccept={() => {
          checkoutRoom();
          setConfirmCheckout(false);
        }}
        onClose={() => {
          setConfirmCheckout(false);
        }}
        onCancel={() => {
          setConfirmCheckout(false);
        }}
        showAcceptButton
        showCancelButton
      />
    </Card>
  );
}

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  getRoom: PropTypes.func.isRequired,
};
