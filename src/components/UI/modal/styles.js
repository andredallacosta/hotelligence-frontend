import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: "100%",
    height: "100%",
    padding: "24px 12px 80px 12px",
    borderRadius: "0",
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.up("sm")]: {
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#DADADA",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#B5B5B5",
        borderRadius: "10px",
        "&:hover": {
          background: "#888",
        },
      },
      padding: "24px",
      height: "fit-content",
      maxHeight: "95vh",
      maxWidth: (props) => props.width || "400px",
      borderRadius: "10px",
    },
  },
  modalImageGrid: {
    textAlign: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: "20px",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginBottom: 14,
    paddingRight: 30,
  },
  modalCloseButton: {
    textAlign: "right",
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: 10,

    [theme.breakpoints.up("sm")]: {
      position: "absolute",
    },
  },
  modelDescription: {
    fontSize: "14px",
    color: "#505050",
    marginBottom: "15px",
    marginTop: "15px",
  },
  modalAction: {
    justifyContent: "space-between",
    marginTop: 10,
    "& .MuiButton-label": {
      fontSize: "12px",
    },
  },
  submitButton: {
    textTransform: "none",
    fontWeight: "bold",
    borderRadius: "100px",
    fontSize: 12,
    minWidth: "100px",
    [theme.breakpoints.up("md")]: {
      fontSize: 14,
    },
  },
}));

export default useStyles;
