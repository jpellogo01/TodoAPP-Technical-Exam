import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  goalItem: {
    display: "flex",
    height: 75,
    position: "relative",
  },

  leftPart: {
    width: "18%",
    height: 75,
    borderRadius: "30px 0 0 30px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B6A08B",
    cursor: "pointer",
  },

  defaultIcon: {
    fontSize: 30,
    color: "white",
  },

  rightPart: {
    flex: 1,
    borderRadius: "0 60px 60px 0",
    display: "flex",
    alignItems: "center",
    p: 1.5,
    backgroundColor: "#D2C9CA",
    justifyContent: "space-between",
  },

  titleInput: {
    fontSize: 16,
    maxWidth: 300,
    width: "100%",
    flex: 1,
    "& .MuiInput-root": {
      fontSize: 16,
    },
    "& .MuiInput-input": {
      padding: 0,
    },
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #B69D87",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #B69D87",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #B69D87",
    },
  },

  addIcon: {
    width: 20,
    height: 20,
    right: "-18px",
    borderRadius: "50%",
    border: "2px solid #0A1F56",
    backgroundColor: "#0A1F56",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
};
