import React from "react";
import PropTypes from "prop-types";
import { MTableToolbar } from "material-table";
import { Button } from "@material-ui/core";
import useStyles from "./styles";

export default function TableToolbar(props) {
  const { includeGuestButtonClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MTableToolbar {...props} />
      <Button
        className={classes.defaultButton}
        onClick={() => includeGuestButtonClick()}
      >
        Incluir hóspede
      </Button>
    </div>
  );
}

TableToolbar.propTypes = {
  includeGuestButtonClick: PropTypes.func.isRequired,
};
