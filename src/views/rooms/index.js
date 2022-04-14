import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Grid, CircularProgress, Container } from "@material-ui/core";
import { Layout } from "@Components/UI";
import { appActions } from "Redux@Actions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import brLocale from "date-fns/locale/pt-BR";

import api from "@Utils/api";
import RoomCard from "./components/RoomCard";
import useStyles from "./styles";

export default function Rooms() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const { selectedDate } = useSelector(
    (state) => state.platform.app,
    shallowEqual
  );

  const handleDateChange = (date) => {
    dispatch(appActions.SetSelectedDate(date));
  };

  const getRooms = () => {
    setLoading(true);
    api.room
      .list({ date: selectedDate })
      .then((response) => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <Layout>
      <Container className={classes.container}>
        <div className={classes.datePicker}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
            <KeyboardDatePicker
              inputVariant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
              format="dd/MM/yyyy"
              label="Data"
              variant="outlined"
              autoOk
              invalidDateMessage="Data inválida"
              cancelLabel="Cancelar"
            />
          </MuiPickersUtilsProvider>
        </div>

        {loading ? (
          <div className={classes.loading}>
            <CircularProgress size={100} />
          </div>
        ) : (
          <Grid container spacing={2} className={classes.cardsContainer}>
            {rooms.map((room) => (
              <Grid item xs={6} md={3} lg={2} key={`room: ${room.number}`}>
                <RoomCard data={room} selectedDate={selectedDate} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  );
}
