import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddTodo } from "./AddTodo";
import { UpdateTodo } from "./UpdateTodo";
import { Box, Typography, Button } from "@mui/material";

interface Todo {
  id: number;
  title: string;
  task: string;
  status: string;
}

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>(
          "http://localhost:8080/api/v1/todo"
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo: {
    title: string;
    description: string;
    status: string;
  }) => {
    try {
      const response = await axios.post<Todo>(
        "http://localhost:8080/api/v1/todo",
        newTodo
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
    setOpenAddModal(false);
  };

  const handleOpenUpdate = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenUpdateModal(true);
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await axios.put<Todo>(
        `http://localhost:8080/api/v1/todo/${updatedTodo.id}`,
        updatedTodo
      );
      setTodos(todos.map((t) => (t.id === updatedTodo.id ? response.data : t)));
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
    setOpenUpdateModal(false);
  };

  return (
    <Box>
      <Typography sx={style.AppTitle}>TODO APP DEMO</Typography>

      <Button
        style={{ backgroundColor: "gray" }}
        onClick={() => setOpenAddModal(true)}
      >
        Add Todo
      </Button>

      <AddTodo
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddTodo}
      />

      <UpdateTodo
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        todo={selectedTodo}
        onUpdate={handleUpdateTodo}
      />

      <table border={1} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan={5}>No todos found</td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.task}</td>
                <td>{todo.status}</td>
                <td>
                  <Button onClick={() => handleOpenUpdate(todo)} sx={{ mr: 1 }}>
                    Update
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://localhost:8080/api/v1/todo/${todo.id}`
                        );
                        setTodos(todos.filter((t) => t.id !== todo.id));
                      } catch (error) {
                        console.error("Failed to delete todo:", error);
                      }
                    }}
                    color="error"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Box>
  );
};

const style = {
  AppTitle: {
    fontSize: "40px",
  },
};
