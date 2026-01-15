import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 1,
    paddingTop: "10px",
    borderTop: "solid 1px #B69D87",
  },

  removeBtn: {
    borderColor: "#0A1F56",
    borderRadius: "40px",
    color: "#0A1F56",
    textTransform: "none",
    fontSize: 14,
    px: 2,
  },

  editBtn: {
    bgcolor: "#B6A08B",
    borderRadius: "40px",
    color: "#fff",
    textTransform: "none",
    fontSize: 14,
    px: 3,
    "&:hover": { bgcolor: "#B6A08B" },
  },

  saveBtn: {
    bgcolor: "#B69D87",
    borderRadius: "40px",
    color: "#fff",
    textTransform: "none",
    fontSize: 14,
    px: 3,
    "&:hover": { bgcolor: "#B69D87" },
  },

  cancelBtn: {
    borderColor: "#0A1F56",
    borderRadius: "40px",
    color: "#0A1F56",
    textTransform: "none",
    fontSize: 14,
    px: 3,
  },
};
