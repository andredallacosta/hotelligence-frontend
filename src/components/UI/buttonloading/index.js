import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CircularProgress, Typography, Button } from "@material-ui/core";

import useStyles from "./styles";

export default function ButtonLoading(props) {
  const {
    loadingColor,
    loadingSize,
    loading,
    children,
    classes,
    ...buttonProps
  } = props;
  const ownClasses = useStyles();

  return (
    <div className={classnames(ownClasses.buttonWrapper, classes?.container)}>
      <Button {...buttonProps} classes={classes}>
        <Typography>{children}</Typography>
      </Button>
      {loading && (
        <div>
          <CircularProgress
            size={loadingSize}
            className={classnames(ownClasses.buttonProgress, classes?.progress)}
            color={loadingColor}
          />
        </div>
      )}
    </div>
  );
}

ButtonLoading.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any,
  classes: PropTypes.object,
  loadingSize: PropTypes.number,
  loadingColor: PropTypes.string,
};

ButtonLoading.defaultProps = {
  loading: false,
  children: "",
  classes: null,
  loadingSize: 24,
  loadingColor: "secondary",
};
