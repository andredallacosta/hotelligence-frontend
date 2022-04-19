import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    marginTop: "10%",
  },
  backButton: {
    margin: "20px",
  },
  text: {
    fontSize: "1.2rem",
    textAlign: "left",
    marginBottom: "10px",
    display: "flex",
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
    border: "1px solid #000",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    marginTop: "20px",
  },
}));

export default useStyles;
