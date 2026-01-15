import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  menuItem: {
    fontSize: 14,
    color: '#333',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    }
  },
};