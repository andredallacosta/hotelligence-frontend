/* eslint-disable react/prop-types */
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  Input,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const FormControlOverride = withStyles((theme) => ({
  root: {
    "& .MuiFilledInput-underline:before": {
      borderBottomColor: theme.palette.primary.light,
    },
  },
}))(FormControl);

function InputPass(props) {
  const {
    className,
    error,
    variant,
    label,
    id,
    name,
    onChange,
    disabled,
    value,
  } = props;

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControlOverride
      className={className}
      error={error || false}
      fullWidth
      variant={variant || "standard"}
    >
      <InputLabel htmlFor={`standard-adornment-password-${id}`}>
        {label || "Password"}
      </InputLabel>
      <Input
        id={`standard-adornment-password-${id}`}
        name={name}
        type={values.showPassword ? "text" : "password"}
        onChange={onChange || null}
        disabled={disabled || null}
        value={value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? (
                <Visibility color="primary" />
              ) : (
                <VisibilityOff color="primary" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControlOverride>
  );
}

export default InputPass;
