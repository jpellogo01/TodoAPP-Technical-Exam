import React from 'react';
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { styles } from '../NewTaskInput/styles';

interface NewTaskInputProps {
  newTaskDescription: string;
  newTaskImage: string | null;
  onDescriptionChange: (value: string) => void;
  onImageClick: (event: React.MouseEvent<HTMLElement>, id: number | null) => void;
  onAddTask: () => void;
}

export const NewTaskInput: React.FC<NewTaskInputProps> = ({
  newTaskDescription,
  newTaskImage,
  onDescriptionChange,
  onImageClick,
  onAddTask,
}) => {
  return (
    <Box sx={styles.goalItem}>
      <Box
        sx={styles.leftPart}
        style={newTaskImage ? { backgroundImage: `url(${newTaskImage})` } : {}}
        onClick={(e) => onImageClick(e, null)}
      >
        {!newTaskImage && <ImageIcon sx={styles.defaultIcon} />}
      </Box>
      <Box sx={styles.rightPart}>
        <TextField
          value={newTaskDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          sx={styles.titleInput}
          variant="standard"
          placeholder="Enter new task here."
        />
        <IconButton
          onClick={onAddTask}
          sx={styles.addIcon}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};