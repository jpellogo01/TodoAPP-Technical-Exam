import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  goalItem: {
    display: "flex",
    height: 70,
    position: "relative",
  },

  leftPart: {
    width: "15%",
    borderRadius: "30px 0 0 30px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    cursor: "pointer",
  },

  defaultIcon: {
    fontSize: 30,
    color: "#a1866f",
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