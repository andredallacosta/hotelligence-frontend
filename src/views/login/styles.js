import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    textAlign: "center",
  },
  form: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  input: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
