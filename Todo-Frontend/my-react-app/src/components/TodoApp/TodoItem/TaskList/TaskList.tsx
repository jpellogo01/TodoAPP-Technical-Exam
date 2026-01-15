import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import type { TodoType, TaskType } from "../../../../types";
import { SortableTaskItem } from "../SortableTaskItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { styles } from "../TaskList/styles";

interface TaskListProps {
  todo: TodoType | null;
  isEditing: boolean;
  onToggleDone: (id: number) => void;
  onImageClick: (
    event: React.MouseEvent<HTMLElement>,
    id: number | null
  ) => void;
  onTaskDescriptionChange: (id: number, value: string) => void;
  onDeleteTask: (id: number) => void;
  onDragEnd: (reorderedTasks: TaskType[]) => void;
  onEdit?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  todo,
  isEditing,
  onToggleDone,
  onImageClick,
  onTaskDescriptionChange,
  onDeleteTask,
  onDragEnd,
  onEdit,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleEditClick = () => {
    if (onEdit) {
      onEdit();
    }
  };

  if (isEditing) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (!todo || !over || active.id === over.id) return;

          const oldIndex = todo.tasks.findIndex(
            (task) => task.id === active.id
          );
          const newIndex = todo.tasks.findIndex((task) => task.id === over.id);

          const reorderedTasks = arrayMove(todo.tasks, oldIndex, newIndex);
          onDragEnd(reorderedTasks);
        }}
      >
        <SortableContext
          items={todo?.tasks.map((task) => task.id) || []}
          strategy={verticalListSortingStrategy}
        >
          <Box sx={styles.container}>
            {todo?.tasks.map((task) => (
              <SortableTaskItem
                key={task.id}
                task={task}
                isEditing={isEditing}
                onToggleDone={onToggleDone}
                onImageClick={onImageClick}
                onTaskDescriptionChange={onTaskDescriptionChange}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    );
  }

  if (!todo || todo.tasks.length === 0) {
    return (
      <Box sx={styles.noTask}>
        <Typography sx={styles.title}>
          There are no task yet.{" "}
          <Box
            component="span"
            sx={styles.editLink}
            onClick={handleEditClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleEditClick();
              }
            }}
          >
            Edit
          </Box>{" "}
          to start.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      {todo.tasks.map((task) => (
        <Box key={task.id} sx={styles.goalItem}>
          <IconButton
            onClick={() => onToggleDone(task.id)}
            sx={{
              ...styles.iconButton,
              color: task.status === "DONE" ? "#0A1F56" : "#a1866f",
              backgroundColor: task.status === "DONE" ? "white" : "#D2C9CA",
              borderColor: task.status === "DONE" ? "white" : "#a1866f",
              "&:focus": { outline: "none" },
              "&:focus-visible": { outline: "none" },
            }}
          >
            {task.status === "DONE" ? (
              <CheckCircleIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </IconButton>

          <Box
            sx={{
              ...styles.leftPart,
              backgroundColor: task.status === "DONE" ? "#0A1F56" : "#B6A08B",
            }}
            style={task.image ? { backgroundImage: `url(${task.image})` } : {}}
          >
            {!task.image && <ImageOutlinedIcon sx={styles.defaultIcon} />}
          </Box>

          <Box
            sx={{
              ...styles.rightPart,
              backgroundColor: task.status === "DONE" ? "#D4D8E5" : "#D2C9CA",
            }}
          >
            <Typography sx={styles.title}>{task.description}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
