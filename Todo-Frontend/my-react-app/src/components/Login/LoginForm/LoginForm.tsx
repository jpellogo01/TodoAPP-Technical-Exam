import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styles } from "../LoginForm/styles";

interface LoginProps {
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    setStatus("");
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const text = await res.text();
      setStatus(text);

      if (res.ok && text === "Login successful") {
        onLoginSuccess();
      } else {
        setStatus("Login failed: Invalid credentials");
      }
    } catch (err) {
      setStatus("Login failed: Please Start the Backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.overlay} />
      <Box sx={styles.form}>
        <Typography variant="h4" sx={styles.title}>
          Login
        </Typography>
        <TextField
          label="Username: user"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={styles.textField}
        />
        <TextField
          label="Password : password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={styles.textField}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={loading || !username || !password}
          sx={styles.button}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
          ) : (
            "Login"
          )}
        </Button>
        {status && (
          <Typography
            sx={{
              ...styles.status,
              color: status.includes("failed") ? "#d32f2f" : "#388e3c",
            }}
          >
            {status}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
