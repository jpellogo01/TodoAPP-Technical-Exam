import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  goalItem: {
    display: "flex",
    height: 75,
    position: "relative",
  },

  iconButton: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: "6px solid #B6A08B",
    backgroundColor: "#D2C9CA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "-10px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
  },

  deleteIcon: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#9D8065",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    color: "white",
  },

  dragIcon: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#9D8065",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "-9px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    color: "#9D8065",
    cursor: "grab",
    "&:focus": { outline: "none" },
    "&:focus-visible": { outline: "none" },
    "&:active": {
      cursor: "grabbing",
    },
  },

  leftPart: {
    width: "18%",
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
    color: "#FFFFFF",
  },

  rightPart: {
    flex: 1,
    borderRadius: "0 60px 60px 0",
    display: "flex",
    alignItems: "center",
    p: 1.5,
  },

  title: {
    fontSize: 16,
    color: "#333",
  },

  titleInput: {
    fontSize: 16,
    maxWidth: 260,
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
};
