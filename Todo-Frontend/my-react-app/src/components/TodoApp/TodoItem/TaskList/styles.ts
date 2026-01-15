import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  goalItem: {
    display: "flex",
    height: 70,
    position: "relative",
  },

  iconButton: {
    width: 23,
    height: 23,
    borderRadius: "50%",
    border: "4px solid #B6A08B",
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

  leftPart: {
    width: "15%",
    borderRadius: "30px 0 0 30px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  noTask: {
    p: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    border: "2px solid gray",
    borderRadius: "50px",
  },

  editLink: {
    textDecoration: "underline",
    cursor: "pointer",
    color: "#B6A08B",
    fontWeight: 500,
    "&:hover": {
      opacity: 0.8,
    },
  },
};