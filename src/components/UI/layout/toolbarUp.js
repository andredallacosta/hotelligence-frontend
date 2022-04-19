/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Button, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  box: {
    width: "100%",
    alignItems: "center",
  },
  menuItem: {
    "&.Mui-disabled": {
      color: "#ccc",
    },
  },
  linkActive: {
    background: theme.palette.primary.dark,
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
}));

export default function Tbar({ ...props }) {
  const classes = useStyles();
  const { className } = props;

  return (
    <Toolbar className={className} variant="dense">
      <Box display="flex" justifyContent="center" className={classes.box}>
        <Button
          color="inherit"
          disableRipple
          component={NavLink}
          to="/clientes"
          onClick={() => {}}
          className={classes.menuItem}
          activeClassName={classes.linkActive}
        >
          Clientes
        </Button>
        <Button
          color="inherit"
          disableRipple
          component={NavLink}
          to="/hotelaria"
          onClick={() => {}}
          className={classes.menuItem}
          activeClassName={classes.linkActive}
        >
          Hotelaria
        </Button>
        <Button
          color="inherit"
          disableRipple
          disabled
          component={NavLink}
          to="/financeiro"
          onClick={() => {}}
          className={classes.menuItem}
          classes={{ disabled: classes.disabled }}
          activeClassName={classes.linkActive}
        >
          Financeiro
        </Button>
      </Box>
    </Toolbar>
  );
}
