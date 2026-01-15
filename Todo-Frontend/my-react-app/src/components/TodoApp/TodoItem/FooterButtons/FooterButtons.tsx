import React from 'react';
import { Box, Button } from "@mui/material";
import { styles } from '../FooterButtons/styles';

interface FooterButtonsProps {
  isEditing: boolean;
  hasDoneTasks: boolean;
  onRemoveDone: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const FooterButtons: React.FC<FooterButtonsProps> = ({
  isEditing,
  hasDoneTasks,
  onRemoveDone,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <Box sx={styles.footer}>
      {hasDoneTasks && !isEditing && (
        <Button onClick={onRemoveDone} variant="outlined" sx={styles.removeBtn}>
          Remove All Done Tasks
        </Button>
      )}

      {isEditing ? (
        <>
          <Button onClick={onCancel} variant="outlined" sx={styles.cancelBtn}>
            Cancel
          </Button>
          <Button onClick={onSave} variant="contained" sx={styles.saveBtn}>
            Save
          </Button>
        </>
      ) : (
        <Button onClick={onEdit} variant="contained" sx={styles.editBtn}>
          Edit
        </Button>
      )}
    </Box>
  );
};