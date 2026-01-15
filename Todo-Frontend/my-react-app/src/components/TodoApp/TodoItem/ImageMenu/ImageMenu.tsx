import React from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { TodoType } from "../../../../types";
import { styles } from '../ImageMenu/styles';
import { Height } from '@mui/icons-material';

interface ImageMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  activeTaskId: number | null;
  todo: TodoType | null;
  newTaskImage: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onAddPhoto: () => void;
  onChangePhoto: () => void;
  onRemovePhoto: () => void;
}

export const ImageMenu: React.FC<ImageMenuProps> = ({
  anchorEl,
  open,
  onClose,
  activeTaskId,
  todo,
  newTaskImage,
  onAddPhoto,
  onChangePhoto,
  onRemovePhoto,
}) => {
  const hasImage = activeTaskId !== null
    ? todo?.tasks.find(t => t.id === activeTaskId)?.image
    : newTaskImage;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      PaperProps={{
        sx: {
          borderRadius: "16px", 
          overflow: "hidden",
          minHeight: '40px',
          padding: '1px',
        },
      }}
    >
      {hasImage ? (
        <>
          <MenuItem onClick={onChangePhoto} sx={styles.menuItem}>
            Change Photo
          </MenuItem>
          <MenuItem onClick={onRemovePhoto} sx={styles.menuItem}>
            Remove Photo
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={onAddPhoto} sx={styles.menuItem}>
          Add Photo
        </MenuItem>
      )}
    </Menu>
  );
};