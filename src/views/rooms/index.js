import React, { useEffect, useState } from "react";

import { Grid, CircularProgress, Container } from "@material-ui/core";
import { Layout, RoomCard } from "@Components/UI";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import brLocale from "date-fns/locale/pt-BR";

import api from "@Utils/api";
import useStyles from "./styles";

export default function Rooms() {
  const classes = useStyles();

  const [rooms, setRooms] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [loading, setLoading] = useState(true);

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
