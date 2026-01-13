import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";

interface AddTodoProps {
  open: boolean;
  onClose: () => void;
  onAdd: (todo: { title: string; description: string; status: string }) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ open, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    onAdd({ title, task, status: "PENDING" });
    setTitle("");
    setTask("");
    onClose();
  };

  return (
    <Modal sx={style.container} open={open} onClose={onClose}>
      <Box sx={style.form}>
        <TextField
          fullWidth
          label="Todo list title"
          value={title}
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
          sx={style.title}
        />

        <Box sx={style.task}>
          <TextField
            fullWidth
            label="Enter a task here"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            variant="standard"
            sx={style.taskTextField}
          />
        </Box>

        <div style={{ marginTop: 10, textAlign: "right" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd}>Save</Button>
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
    width: "350px",
    padding: "70px",
    backgroundColor: "#D2C9CA",
  },
  title: {
    width: "400px",
    fontSize: "50px",
    border: "5px",
  },
  task: {
    marginTop: "20px",
    height: "70px",
    borderRadius: "40px",
    backgroundColor: "#B6A08B",
    "& .MuiInputBase-root": {
      borderRadius: "40px",
    },
  },
  taskTextField: {
    height: "30px",
    alignItems: "center",
    width: "250px",
    marginLeft: "90px",
    paddingRight: "10px",
  },
};
