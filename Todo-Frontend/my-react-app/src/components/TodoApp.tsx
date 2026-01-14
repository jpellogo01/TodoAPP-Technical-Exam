import React from "react";
import { Box } from "@mui/material";
import { TodoItem } from "./TodoItem";

export const TodoApp: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100vw",      // Full viewport width
        height: "100vh",     // Full viewport height
        display: "flex",     // Enable flex
        justifyContent: "center", // Center horizontally
        alignItems: "center",     // Center vertically
        bgcolor: "#f8f3f3",       // Background color
      }}
    >
      <TodoItem /> {/* Will be centered inside full screen */}
    </Box>
  );
};
