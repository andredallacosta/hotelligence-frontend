import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "5px",
  },
  available: {
    background: "#34DD4F",
  },
  booked: {
    background: "#34A0DD",
  },
  occupied: {
    background: "#DD3434",
  },
  in_cleaning: {
    background: "#C534DD",
  },
  in_maintenance: {
    background: "#DADD34",
  },
  idle: {
    background: "#aaa",
  },
});

export default useStyles;
