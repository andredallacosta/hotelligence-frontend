import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  defaultButton: {
    cursor: "pointer",
    minWidth: "100px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: 100,
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
  submitButtonGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
