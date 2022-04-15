import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  Modal,
  Fade,
  IconButton,
  Backdrop,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";

export default function GenericModal(props) {
  const {
    title,
    body,
    open,
    onOpen,
    onCancel,
    onClose,
    onAccept,
    showCloseButton,
    showCancelButton,
    showAcceptButton,
    cancelButtonText,
    acceptButtonText,
    image,
    width,
  } = props;
  const classes = useStyles({
    width,
  });

  useEffect(() => {
    if (open) onOpen();
  }, [open]);

  return (
    <Modal
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
      className={classes.modal}
      open={open}
      onClose={() => {
        onClose();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Grid container className={classes.modalPaper}>
          {showCloseButton ? (
            <Grid item xs={12} className={classes.modalCloseButton}>
              <IconButton
                aria-label="fechar"
                onClick={() => {
                  onClose();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Grid container>
              {image ? (
                <Grid item xs={12} className={classes.modalImageGrid}>
                  {image}
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <h2 className={classes.modalTitle}>{title}</h2>
              </Grid>

              <Grid item xs={12} className={classes.modelDescription}>
                {body}
              </Grid>

              <Grid item xs={12} id="modalDescription">
                <Grid container className={classes.modalAction} spacing={1}>
                  {showCancelButton ? (
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.submitButton}
                        onClick={() => {
                          onCancel();
                        }}
                      >
                        {cancelButtonText}
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item />
                  )}

                  {showAcceptButton ? (
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.submitButton}
                        onClick={() => {
                          onAccept();
                        }}
                      >
                        {acceptButtonText}
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
}

GenericModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  showCloseButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showAcceptButton: PropTypes.bool,
  cancelButtonText: PropTypes.string,
  acceptButtonText: PropTypes.string,
  image: PropTypes.node,
  width: PropTypes.string,
};

GenericModal.defaultProps = {
  body: "",
  onOpen: () => {},
  onCancel: () => {},
  onClose: () => {},
  onAccept: () => {},
  showCloseButton: true,
  showCancelButton: false,
  showAcceptButton: false,
  cancelButtonText: "CANCELAR",
  acceptButtonText: "CONFIRMAR",
  image: null,
  width: "",
};
