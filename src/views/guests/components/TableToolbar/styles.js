import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  defaultButton: {
    cursor: "pointer",
    minWidth: "100px",
    backgroundColor: theme.palette.primary.main,
    textTransform: "none",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color: "#ffffff",
    fontWeight: "bold",
    transition: "0.3s",
    textAlign: "center",

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transition: "0.3s",
    },
  },
}));

export default useStyles;
