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
    borderColor: "#0A1F56",
    borderRadius: "40px",
    color: "#0A1F56",
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
    borderColor: "#0A1F56",
    borderRadius: "40px",
    color: "#0A1F56",
    textTransform: 'none',
    fontSize: 14,
    px: 3,
  },
};