import React from 'react';
import { Box, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ImageIcon from "@mui/icons-material/Image";
import type { TaskType } from "../../../../types";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { styles } from '../SortableTaskItem/styles';

interface SortableTaskItemProps {
  task: TaskType;
  isEditing: boolean;
  onToggleDone: (id: number) => void;
  onImageClick: (event: React.MouseEvent<HTMLElement>, id: number | null) => void;
  onTaskDescriptionChange: (id: number, value: string) => void;
  onDeleteTask: (id: number) => void;
}

export const SortableTaskItem: React.FC<SortableTaskItemProps> = ({
  task,
  isEditing,
  onToggleDone,
  onImageClick,
  onTaskDescriptionChange,
  onDeleteTask,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box ref={setNodeRef} style={style} sx={styles.goalItem}>
      {isEditing ? (
        <>
          <IconButton
            {...attributes}
            {...listeners}
            sx={styles.dragIcon}
          >
            <DragIndicatorIcon />
          </IconButton>

          <Box
            sx={styles.leftPart}
            style={task.image ? { backgroundImage: `url(${task.image})` } : {}}
            onClick={(e) => onImageClick(e, task.id)}
          >
            {!task.image && <ImageIcon sx={styles.defaultIcon} />}
          </Box>

          <Box sx={{ ...styles.rightPart, backgroundColor: "#D2C9CA" }}>
            <TextField
              value={task.description}
              onChange={(e) => onTaskDescriptionChange(task.id, e.target.value)}
              sx={styles.titleInput}
              variant="standard"
              fullWidth
              placeholder="Enter new task here."
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          <IconButton
            onClick={() => onDeleteTask(task.id)}
            sx={styles.deleteIcon}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={() => onToggleDone(task.id)}
            sx={{
              ...styles.iconButton,
              color: task.status === "DONE" ? "#0A1F56" : "#a1866f",
            }}
          >
            {task.status === "DONE" ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </IconButton>

          <Box
            sx={styles.leftPart}
            style={task.image ? { backgroundImage: `url(${task.image})` } : {}}
          >
            {!task.image && <ImageIcon sx={styles.defaultIcon} />}
          </Box>

          <Box
            sx={{
              ...styles.rightPart,
              backgroundColor: task.status === "DONE" ? "#D4D8E5" : "#D2C9CA",
            }}
          >
            <Typography sx={styles.title}>{task.description}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};