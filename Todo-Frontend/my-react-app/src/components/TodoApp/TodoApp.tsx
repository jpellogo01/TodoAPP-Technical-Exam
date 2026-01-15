import React from "react";
import { Box } from "@mui/material";
import { TodoItem } from "../TodoApp/TodoItem/TodoItem";
import { BackgroundSVG } from "../TodoApp/BackgroundSVG/BackgroundSVG";
import { styles } from "../TodoApp/styles";

export const TodoApp: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <BackgroundSVG />
      <Box sx={styles.content}>
        <TodoItem />
      </Box>
    </Box>
  );
};