import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loading: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  datePicker: {
    margin: "50px 0px 80px 0px",
    [theme.breakpoints.up("md")]: {
      margin: "50px 0px 50px 0px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  text: {
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  addRoomIcon: {
    fontSize: "60px",
    color: "#1c1c1c",
  },
}));

export default useStyles;
