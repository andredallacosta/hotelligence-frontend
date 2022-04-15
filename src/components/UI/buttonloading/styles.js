import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  buttonWrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -14,
    marginLeft: -14,
  },
}));

export default useStyles;
