import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { PassField, TextField, Button, Paper } from "@Components/UI";
import { authActions } from "Redux@Actions";
import { AppContext } from "../../App";
import useStyles from "./styles";

export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const appConstants = useContext(AppContext);

  const { loggedIn, loginStatus } = useSelector(
    (state) => state.security.auth,
    shallowEqual
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.Login({ username, password }));
  };

  useEffect(() => {
    if (loggedIn) {
      history.push("/hotelaria");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loginStatus === "requesting") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loginStatus]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !loggedIn) {
      dispatch(authActions.Login({ token }));
    }
  }, []);

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Grid item xs={9} sm={5} md={3} lg={3} xl={2}>
        <Paper>
          <Typography className={classes.header} color="primary" variant="h3">
            <span>LOGIN v{appConstants.version}</span>
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className={classes.input}
              name="username"
              color="primary"
              fullWidth
              variant="standard"
              label="USU??RIO"
            />
            <PassField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={classes.input}
              label="SENHA"
              name="password"
            />
            {loading ? (
              <CircularProgress className={classes.loading} />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.button}
                color="primary"
                label="LOGIN"
              />
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
