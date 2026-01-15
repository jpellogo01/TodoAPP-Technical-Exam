import React from "react";
import { Box } from "@mui/material";
import { BackgroundSVG } from "../TodoApp/BackgroundSVG/BackgroundSVG";
import { styles } from "../Login/styles";
import { LoginForm } from "../Login/LoginForm/LoginForm";

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return (
    <Box sx={styles.container}>
      <BackgroundSVG />
      <Box sx={styles.content}>
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </Box>
    </Box>
  );
};
