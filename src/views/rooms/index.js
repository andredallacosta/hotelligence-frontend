import React, { useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";
import { Paper, Layout } from "@Components/UI";

import api from "@Utils/api";
import useStyles from "./styles";

export default function Rooms() {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Layout>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100%", textAlign: "center" }}
      >
        <Grid item xs={10} sm={5} md={4} lg={3} xl={3}>
          <Typography variant="h2" className={classes.text}>
            Olá!
          </Typography>
          <Paper className={classes.paper}>
            <Typography variant="body1">
              Comece a editar agora mesmo! A aplicação principal fica em App.js,
              coloque suas rotas e suas views seguindo o padrão descrito no
              read.me :D ! Conto com você!
            </Typography>
          </Paper>
          <Typography variant="body1" className={classes.text} color="primary">
            Feito com ❤ por <a href="http://gmartinu.dev">Gabriel Martinusso</a>{" "}
            e <a href="http://felps.dev">Felipe Correa</a>
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
