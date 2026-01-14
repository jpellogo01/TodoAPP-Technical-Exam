import React from "react";
import { Box } from "@mui/material";
import { TodoItem } from "./TodoItem";

export const TodoApp: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#f8f3f3",
      }}
    >
      {/* SVG Wave Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100%" height="100%" fill="#f8f3f3" />

          <path
            d="M0,600 C300,500 600,650 900,550 C1200,450 1500,600 1800,550 L1800,800 L0,800 Z"
            fill="#EFE6E5"
            fillOpacity="0.8"
            transform="translate(-300, -100)"
          />

          <path
            d="M0,650 C250,600 500,700 750,600 C1000,500 1250,650 1500,600 L1500,800 L0,800 Z"
            fill="#E4E3E8"
            fillOpacity="0.9"
            transform="translate(-100, 1150)"
          />

          {/* Small wave at top */}
          <path
            d="M0,650 C250,600 500,700 750,600 C1000,500 1250,650 1500,600 L1500,800 L0,800 Z"
            fill="#f0ecfa"
            fillOpacity="0.4"
            transform="translate(100, -800)"
          />
        </svg>
      </Box>

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <TodoItem />
      </Box>
    </Box>
  );
};

