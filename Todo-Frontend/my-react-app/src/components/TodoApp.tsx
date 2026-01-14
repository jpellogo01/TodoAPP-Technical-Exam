import React from "react";
import { Box } from "@mui/material";

export const TodoApp: React.FC = () => {
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login"; // reload page to clear cached routes
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Box>
      <Box>HELLO TODO APP</Box>
      <button onClick={handleLogout}>Logout</button>
    </Box>
  );
};
