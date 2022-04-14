import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { Provider, useSelector, shallowEqual, useDispatch } from "react-redux";
import { light as ThemeLight } from "@Utils";
import { store } from "Redux@Helpers";
import { Dialog } from "@Components/UI";
import { hotelActions, authActions } from "Redux@Actions";
import { LoginPage, RoomsPage, RoomPage } from "@Views";

const useStyles = makeStyles((theme) => ({
  globalStyle: {
    backgroundColor: theme.palette.background.default,
    transition: "all 0.25s linear",
    minHeight: "100%",
  },
}));

const AppConstantsDefault = {
  setTheme: null,
  currentTheme: "light",
  version: "0.0.1",
  header: {
    currentTitle: "Inicio",
  },
  user: {
    name: "",
  },
};

export const AppContext = React.createContext(AppConstantsDefault);

function LoggedRoute({ path, component, exact }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector(
    (state) => state.security.auth,
    shallowEqual
  );

  useEffect(() => {
    if (!loggedIn) {
      const token = localStorage.getItem("token");
      if (token && !loggedIn) {
        dispatch(authActions.Login({ token }));
      } else {
        history.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (loggedIn && user?.token) {
      dispatch(hotelActions.GetUserHotel());
    }
  }, [user.token, loggedIn]);

  if (loggedIn) {
    return <Route exact={exact} path={path} component={component} />;
  }
  return null;
}

function AppContainer() {
  const classes = useStyles();
  const { _message } = useSelector((state) => state.info.alert);
  const [dialog, setDialog] = useState(false);
  const [message, setMessage] = useState("");

  function openDialog(mensagem) {
    setMessage(mensagem);
    setDialog(true);
  }

  useEffect(() => {
    if (_message && _message.isDialog) {
      openDialog(_message.message);
    }
  }, [_message]);

  return (
    <div className={classes.globalStyle}>
      <Router>
        <Switch>
          {/* eslint-disable-next-line react/no-unstable-nested-components */}
          <Route exact path="/" component={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={LoginPage} />
          <LoggedRoute exact path="/hotelaria" component={RoomsPage} />
          <LoggedRoute exact path="/hotelaria/:id" component={RoomPage} />
          {/* <Route exact path="/clientes" component={HomePage} /> */}
          {/* <Route exact path="/clientes/:id" component={HomePage} /> */}
          {/* <Route exact path="/financeiro" component={HomePage} /> */}
          {/* <Route exact path="/hotelaria/caixa" component={HomePage} /> */}
        </Switch>
      </Router>
      <Dialog
        message={message.message}
        title={message.title}
        open={dialog}
        setOpen={setDialog}
      />
    </div>
  );
}

export default function App() {
  const appConstants = useContext(AppContext);

  useEffect(() => {
    document.title = `v${appConstants.version}`;
  }, [appConstants.version]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={ThemeLight}>
        <AppContext.Provider value={appConstants}>
          <AppContainer />
        </AppContext.Provider>
      </ThemeProvider>
    </Provider>
  );
}

LoggedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
};
