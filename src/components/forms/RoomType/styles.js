import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    padding: 14,
  },
  pageDescriptionContainer: {
    padding: "60px 0",
    textAlign: " center",
  },
  pageDescription: {
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    fontWeight: " bold",
    textAlign: "center",
  },
  sectionDescription: {
    fontSize: 24,
    color: "#505050",
    textAlign: "center",
    padding: "30px 0",
  },
  dropzoneRootDiv: {
    textAlign: "center",
    border: "2px dashed #909090",
    padding: 10,
    marginBottom: 20,
    cursor: "pointer",
  },
  dragZonePaper: {
    padding: "40px 80px 40px 80px",

    backgroundColor: "rgba(255, 255, 255, 0.8)",

    borderRadius: 12,
    boxShadow: "0 20px 30px -16px rgba(9,9,16,0.2)",
  },
  uploadIcon: {
    height: "80px",
    width: "80px",
    fill: "#00D4E6",
    opacity: 0.5,
  },
  section: {
    height: "100%",
    textAlign: "center",
    marginBottom: 30,
    "& h3": {
      color: "#505050",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  formPapper: {
    marginBottom: 40,
  },
  formUpload: {
    marginBottom: 40,
  },
  alert: {
    marginTop: -20,
    marginBottom: 40,
  },
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
  certificateItem: {
    marginTop: 10,
    color: "#505050",
    fontSize: 14,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: "5px",
    padding: 5,
    textAlign: "center",
  },
  modal: {
    padding: 14,
  },
  errorMessage: {
    maxHeight: 0,
    transition: "max-height 0.15s ease-out",
    overflow: "hidden",
    marginTop: "10px",
  },
  errorMessageExpand: {
    maxHeight: "500px",
    transition: "max-height 0.25s ease-in",
    marginTop: "10px",
  },
  fileName: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "40px !important",
  },
  ListItemSecondaryAction: {
    paddingRight: "140px",
  },
  dateLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: 1,
    width: "max-content",
    background: "#fff",
    position: "relative",
    bottom: "-24px",
    left: "10px",
    zIndex: 10,
    padding: "2px 5px",
  },
  dateField: {
    padding: "10px 12px",
    border: "solid 1px #ccc",
    borderRadius: "5px",
  },
  whatsappField: {
    margin: "15px 0px 10px 0px !important",
  },
  explanation: {
    "& ul": {
      listStyleType: "none",
      padding: "2px",
    },
    "& li": {
      color: "rgba(80, 80, 80, 0.7)",
      padding: "2px 0px",
      textAlign: "justify",
    },
  },
  cardExplanation: {
    padding: "15px",
  },
  explanationTitle: {
    textAlign: "center",
    color: "#3f3f3f",
    fontSize: "18px",
    marginBottom: "25px",
  },
  submitButtonGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
