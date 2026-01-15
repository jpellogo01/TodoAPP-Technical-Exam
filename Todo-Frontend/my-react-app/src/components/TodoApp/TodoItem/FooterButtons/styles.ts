import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
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
    textTransform: 'none',
    fontSize: 14,
    px: 2,
  },

  editBtn: {
    bgcolor: "#B6A08B",
    borderRadius: "40px",
    color: "#fff",
    textTransform: 'none',
    fontSize: 14,
    px: 3,
    "&:hover": { bgcolor: "#B6A08B" },
  },

  saveBtn: {
    bgcolor: "#4CAF50",
    borderRadius: "40px",
    color: "#fff",
    textTransform: 'none',
    fontSize: 14,
    px: 3,
    "&:hover": { bgcolor: "#45a049" },
  },

  cancelBtn: {
    borderColor: "#f44336",
    borderRadius: "40px",
    color: "#f44336",
    textTransform: 'none',
    fontSize: 14,
    px: 3,
  },
};