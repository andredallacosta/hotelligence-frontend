import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  Grid,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { ArrowBackIos, CheckCircle, Cancel } from "@material-ui/icons";
import { Button, Layout } from "@Components/UI";

import api from "@Utils/api";
import RoomCard from "./components/RoomCard";
import useStyles from "./styles";

export default function Room() {
  const classes = useStyles();
  const history = useHistory();
  const { id: roomId } = useParams();

  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);

  const getRoom = () => {
    setLoading(true);
    api.room
      .retrieve(roomId)
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <Layout>
      <Button
        startIcon={<ArrowBackIos />}
        label="Voltar"
        onClick={() => history.push("/hotelaria")}
        className={classes.backButton}
      />
      <Container className={classes.container}>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress size={100} />
          </div>
        ) : (
          <Grid container spacing={2} className={classes.infoContainer}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.text}>
                Número: {room.number}
              </Typography>
              <Typography className={classes.text}>
                Tipo: {room.type?.type}
              </Typography>
              <Typography className={classes.text}>
                Capacidade: {room.type?.capacity}
              </Typography>
              <Typography className={classes.text}>
                Quantidade de camas de casal: {room.type?.double_bed_quantity}
              </Typography>
              <Typography className={classes.text}>
                Quantidade de camas de solteiro:{" "}
                {room.type?.single_bed_quantity}
              </Typography>
              <Typography className={classes.text}>
                Quantidade de banheiros: {room.type?.bathroom_quantity}
              </Typography>
              <Typography className={classes.text}>
                {room.type?.air_conditioning ? (
                  <CheckCircle className={classes.check} />
                ) : (
                  <Cancel className={classes.cancel} />
                )}{" "}
                Ar condicionado
              </Typography>
              <Typography className={classes.text}>
                {room.type?.fridge ? (
                  <CheckCircle className={classes.check} />
                ) : (
                  <Cancel className={classes.cancel} />
                )}{" "}
                Frigobar
              </Typography>
              <Typography className={classes.text}>
                {room.type?.balcony ? (
                  <CheckCircle className={classes.check} />
                ) : (
                  <Cancel className={classes.cancel} />
                )}{" "}
                Sacada
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <RoomCard room={room} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}
