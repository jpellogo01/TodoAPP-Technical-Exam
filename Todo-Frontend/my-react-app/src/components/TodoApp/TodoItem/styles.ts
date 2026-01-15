import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    p: 4,
    borderRadius: 4,
    width: 450,
    backgroundColor: "transparent",
    height: "100%",
    overflow: "hidden",
  },

  header: {
    ml: "20px",
    color: "#1a237e",
    fontSize: "30px",
    fontWeight: 500,
    fontFamily: "'Crimson Text', serif",
    mb: 3,
  },

  listContainer: {
    height: "400px",
    overflowY: "auto",
    overflowX: "hidden",
    pl: 2,
    pr: 2,
    mt: -1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: "2px",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#D9CCC0",
      borderRadius: "4px",
      border: "1px solid #D9CCC0",
      minHeight: "20px",
      maxHeight: "50px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#D9CCC0",
    },
    "&::-webkit-scrollbar-button": {
      display: "none",
    },
    "&::-webkit-scrollbar-button:vertical:start": {
      display: "none",
    },
    "&::-webkit-scrollbar-button:vertical:end": {
      display: "none",
    },
    scrollbarWidth: "thin",

    scrollbarColor: "#D9CCC0 transparent",
  },

  noTask: {
    p: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 3,
    border: "2px solid gray",
    borderRadius: "50px",
    textAlign: "center",
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
