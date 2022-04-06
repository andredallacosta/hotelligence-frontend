/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function FvDialog(props) {
  const { open, title, message, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        style={{ borderRadius: 0 }}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent style={{ minWidth: "20em" }}>
          <DialogContentText id="alert-dialog-description">
            {message && message > 1 ? (
              message.map((m, key) => (
                <span key={key}>
                  <b>{m[0]}</b>:{" "}
                  {typeof m[1][0] === "object"
                    ? Object.entries(m[1][0]).map((mm) => (
                        <span style={{ marginLeft: 10 }}>
                          <b>{mm[0]}</b>: {mm[1][0]}
                        </span>
                      ))
                    : m[1][0]}
                  <br />
                </span>
              ))
            ) : (
              <span style={{ marginLeft: 10 }}>
                <b>{message}</b>
              </span>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
