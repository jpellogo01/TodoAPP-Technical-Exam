import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  goalItem: {
    display: "flex",
    height: 70,
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
  backgroundColor: "#9D8065",  // Added a light gray background to make the circle visible
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
  "&:active": {
    cursor: "grabbing",
  }
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
  },

  title: {
    fontSize: 16,
    color: '#333',
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
};