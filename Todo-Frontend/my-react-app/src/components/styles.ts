import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: { p: 4, borderRadius: 4, width: 450 },

  header: {
    ml: "20px",
    color: "#1a237e",
    fontSize: "30px",
    fontWeight: 500,
    fontFamily: "'Crimson Text', serif",
  },

  headerInput: {
    ml: "20px",
    fontSize: "30px",
    fontWeight: 500,
    fontFamily: "'Crimson Text', serif",
    "& .MuiInput-root": {
      color: "#1a237e",
    },
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
  },

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
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    color: "#9D8065",
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
  },

  titleInput: {
    fontSize: 16,
    maxWidth: 300,
    width: "100%",
    flex: 1,
    "& .MuiInput-root": {
      fontSize: 16,
    },
  },

  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 1,
    paddingTop: "5px",
    borderTop: "solid 1px #B69D87",
  },

  removeBtn: {
    borderColor: "#1a237e",
    borderRadius: "40px",
    color: "#1a237e",
  },

  editBtn: {
    bgcolor: "#B6A08B",
    borderRadius: "40px",
    color: "#fff",
    "&:hover": { bgcolor: "#B6A08B" },
  },

  saveBtn: {
    bgcolor: "#4CAF50",
    borderRadius: "40px",
    color: "#fff",
    "&:hover": { bgcolor: "#45a049" },
  },

  cancelBtn: {
    borderColor: "#f44336",
    borderRadius: "40px",
    color: "#f44336",
  },
};
