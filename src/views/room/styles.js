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
  check: {
    color: theme.palette.success.main,
    marginRight: "3px",
  },
  cancel: {
    color: theme.palette.error.main,
    marginRight: "3px",
  },
}));

export default useStyles;
