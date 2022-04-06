import React from "react";

import { Button } from "@material-ui/core";

// eslint-disable-next-line react/prop-types
export default function Btn({ label, ...rest }) {
  return <Button {...rest}>{label}</Button>;
}
