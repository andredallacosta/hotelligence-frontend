import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },
  content: {
    padding: "16px !important",
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    border: "1px solid #000",
  },
  info: {
    marginTop: "10px",
  },
}));

export default useStyles;
