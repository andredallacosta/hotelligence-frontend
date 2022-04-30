/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Button,
  Box,
  // Typography,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Avatar,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { authActions } from "Redux@Actions";

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
  const { className } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.security.auth, shallowEqual);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggle = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

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
      <Box
        onClick={toggle}
        display="flex"
        alignItems="center"
        style={{ cursor: "pointer" }}
      >
        {/* <Typography className={classes.welcomeMessage}>
          {user?.first_name ? `Olá, ${user.first_name}!` : null}
        </Typography> */}
        <Popper
          open={open}
          anchorEl={anchorEl}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        dispatch(authActions.Logout());
                        history.push("/");
                      }}
                      className={classes.menuItem}
                    >
                      <ListItemIcon>
                        <Icon>logout</Icon>
                      </ListItemIcon>
                      <ListItemText primary="Sair" />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Avatar className={classes.avatar} alt={user?.first_name} src={null} />

        <ExpandMore />
      </Box>
    </Toolbar>
  );
}
