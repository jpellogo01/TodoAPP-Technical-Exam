import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  form: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    p: 4,
    borderRadius: 4,
    backgroundColor: "#f8f3f3",
    border: "2px solid #B6A08B",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: 400,
    width: "100%",
  },
  title: {
    color: "#1a237e",
    fontFamily: "'Crimson Text', serif",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      backgroundColor: "#D2C9CA",
      "& fieldset": {
        borderColor: "#B6A08B",
      },
      "&:hover fieldset": {
        borderColor: "#a1866f",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#B6A08B",
      },
    },
  },
  button: {
    borderRadius: "50px",
    backgroundColor: "#B6A08B",
    color: "#FFFFFF",
    px: 4,
    py: 1.5,
    "&:hover": {
      backgroundColor: "#a1866f",
    },
    "&:disabled": {
      backgroundColor: "#D2C9CA",
    },
  },
  status: {
    textAlign: "center",
  },
};
