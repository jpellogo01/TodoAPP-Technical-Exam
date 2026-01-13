import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

interface UpdateTodoProps {
  open: boolean;
  onClose: () => void;
  todo: {
    id: number;
    title: string;
    description: string;
    status: string;
  } | null;
  onUpdate: (todo: {
    id: number;
    title: string;
    description: string;
    status: string;
  }) => void;
}

export const UpdateTodo: React.FC<UpdateTodoProps> = ({
  open,
  onClose,
  todo,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setTask(todo.description);
      setStatus(todo.status);
    }
  }, [todo]);

  const handleUpdate = () => {
    if (!title.trim()) return;
    if (!todo) return;

    onUpdate({ id: todo.id, title, description, status });
    setTitle("");
    setTask("");
    setStatus("PENDING");
    onClose();
  };

  return (
    <Modal sx={style.container} open={open} onClose={onClose}>
      <Box sx={style.form}>
        <Typography variant="h6">Update Todo</Typography>

        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          sx={{ mt: 2 }}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
          </Select>
        </FormControl>

        <div style={{ marginTop: 10, textAlign: "right" }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: 400,
    backgroundColor: "white",
    borderRadius: 2,
  },
};
