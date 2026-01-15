import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: { 
    p: 4, 
    borderRadius: 4, 
    width: 450,
    backgroundColor: 'transparent',
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
    minHeight: "400px",
    p: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 3,
  },

  noTask: {
    p: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 3,
    border: "2px solid gray",
    borderRadius: "50px",
    textAlign: 'center',
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