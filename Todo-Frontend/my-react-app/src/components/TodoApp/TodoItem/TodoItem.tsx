import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, TextField } from "@mui/material";
import type { TodoType, TaskType } from "../../../types/index";
import { apiService } from "../../../services/api";
import { TaskList } from "./TaskList/TaskList";
import { NewTaskInput } from "./NewTaskInput/NewTaskInput";
import { ImageMenu } from "./ImageMenu/ImageMenu";
import { FooterButtons } from "./FooterButtons/FooterButtons";
import { styles } from "../TodoItem/styles";

export const TodoItem: React.FC = () => {
  const [todo, setTodo] = useState<TodoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalTodo, setOriginalTodo] = useState<TodoType | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskImage, setNewTaskImage] = useState<string | null>(null);
  const [nextId, setNextId] = useState(0);
  const [imageAnchorEl, setImageAnchorEl] = useState<HTMLElement | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.fetchTodo();
        if (data) {
          const mappedTasks: TaskType[] = data.tasks
            .map((task, index) => ({
              ...task,
              taskOrder: task.taskOrder ?? index,
            }))
            .sort((a, b) => (a.taskOrder ?? 0) - (b.taskOrder ?? 0));

          setTodo({ ...data, tasks: mappedTasks });
          setNextId(Math.max(...mappedTasks.map((t) => t.id ?? 0), 0) + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTodo({
          title: "Sample Todo",
          status: "PENDING",
          tasks: [
            { id: 1, description: "Sample Task 1", status: "DONE" },
            { id: 2, description: "Sample Task 2", status: "PENDING" },
          ],
        });
        setNextId(3);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalTodo(todo);
    setEditTitle(todo?.title || "To do list title");
    setNewTaskDescription("");
    setNewTaskImage(null);
  };

  const handleSave = async (): Promise<void> => {
    if (todo?.id) {
      const updatedTodo = {
        ...todo,
        title: editTitle,
        tasks: todo.tasks,
      };

      try {
        await apiService.updateTodo(todo.id, updatedTodo);
        setTodo(updatedTodo);
        setIsEditing(false);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error("Error updating todo:", error);
      }
    } else {
      try {
        const newTodo = await apiService.createTodo({
          title: editTitle,
          status: "PENDING",
          tasks: todo?.tasks ?? [],
        });

        setTodo(newTodo);
        setIsEditing(false);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error("Error creating todo:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTodo(originalTodo);
    setEditTitle("");
    setNewTaskDescription("");
    setNewTaskImage(null);
  };

  const handleTitleChange = async (value: string) => {
    setEditTitle(value);
    if (todo?.id) {
      try {
        await apiService.updateTodo(todo.id, { ...todo, title: value });
      } catch (error) {
        console.error("Error updating title:", error);
      }
    }
  };

  const addNewTask = async () => {
    if (newTaskDescription.trim() === "") return;
    if (todo?.id) {
      const taskData = {
        description: newTaskDescription,
        status: "PENDING",
        image: newTaskImage ?? undefined,
        taskOrder: todo.tasks.length,
      };

      try {
        const newTask = await apiService.createTask(todo.id, taskData);
        setTodo((prev) =>
          prev ? { ...prev, tasks: [...prev.tasks, newTask] } : null
        );
        setNewTaskDescription("");
        setNewTaskImage(null);
      } catch (error: unknown) {
        console.error("Error adding task:", error);
        const message = error instanceof Error ? error.message : String(error);

        alert("Failed to add task: " + message);
      }
    } else {
      const newTask = {
        id: nextId,
        description: newTaskDescription,
        status: "PENDING",
        image: newTaskImage || undefined,
      };
      setTodo((prev) =>
        prev
          ? { ...prev, tasks: [...prev.tasks, newTask] }
          : { title: editTitle, status: "PENDING", tasks: [newTask] }
      );
      setNextId(nextId + 1);
      setNewTaskDescription("");
      setNewTaskImage(null);
    }
  };

  const handleImageClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number | null
  ) => {
    if (!isEditing) return;
    setImageAnchorEl(event.currentTarget);
    setActiveTaskId(id);
  };

  const closeImageMenu = () => {
    setImageAnchorEl(null);
    setActiveTaskId(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      const taskIdStr = event.target.dataset.taskId;
      let taskId: number | null = null;
      if (taskIdStr && taskIdStr !== "new") {
        taskId = Number.parseInt(taskIdStr, 10);
      } else {
        taskId = null;
      }
      reader.onload = () => {
        const imageUrl = reader.result as string;

        if (taskId !== null && todo) {
          const task = todo.tasks.find((t) => t.id === taskId);
          if (task) {
            const updatedTask = { ...task, image: imageUrl };
            setTodo({
              ...todo,
              tasks: todo.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
            });
            apiService
              .updateTask(taskId, updatedTask)
              .catch((error) =>
                console.error("Error updating task image:", error)
              );
          }
        } else {
          setNewTaskImage(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
    if (event.target) {
      delete event.target.dataset.taskId;
    }
  };
  const handleTaskReorder = (reorderedTasks: TodoType["tasks"]) => {
    if (!todo) return;

    const tasksWithOrder = reorderedTasks.map((task, index) => ({
      ...task,
      taskOrder: index,
    }));

    setTodo({
      ...todo,
      tasks: tasksWithOrder,
    });
  };

  if (loading) return <Typography>Loading...</Typography>;

  const hasDoneTasks =
    todo?.tasks?.some((task) => task.status === "DONE") ?? false;

  return (
    <Box sx={styles.container}>
      {isEditing ? (
        <TextField
          value={editTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          variant="standard"
          fullWidth
          sx={{
            ...styles.header,
            maxWidth: "400px",
            "& .MuiInputBase-root": {
              padding: 0,
              fontSize: "30px",
              fontWeight: 500,
              fontFamily: "'Crimson Text', serif",
              color: "#1a237e",
            },
            "& .MuiInput-root:before": {
              borderBottom: "3px solid #B59C86",
            },
            "& .MuiInput-root:hover:not(.Mui-disabled):before": {
              borderBottom: "3px solid #B59C86",
            },
            "& .MuiInput-root:after": {
              borderBottom: "3px solid #B59C86",
            },
          }}
        />
      ) : (
        <Typography variant="h5" sx={styles.header}>
          {todo ? todo.title : "To do list title"}
        </Typography>
      )}

      <Box sx={styles.listContainer}>
        {isEditing && (
          <NewTaskInput
            newTaskDescription={newTaskDescription}
            newTaskImage={newTaskImage}
            onDescriptionChange={setNewTaskDescription}
            onImageClick={handleImageClick}
            onAddTask={addNewTask}
          />
        )}

        <TaskList
          todo={todo}
          isEditing={isEditing}
          onToggleDone={async (id) => {
            if (!todo) return;
            const updatedTasks = todo.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    status: task.status === "DONE" ? "PENDING" : "DONE",
                  }
                : task
            );
            setTodo({ ...todo, tasks: updatedTasks });

            const updatedTask = updatedTasks.find((task) => task.id === id);
            if (updatedTask) {
              await apiService.updateTask(id, updatedTask);
            }
          }}
          onImageClick={handleImageClick}
          onTaskDescriptionChange={async (id, value) => {
            if (!todo) return;
            const updatedTasks = todo.tasks.map((task) =>
              task.id === id ? { ...task, description: value } : task
            );
            setTodo({ ...todo, tasks: updatedTasks });

            const task = todo.tasks.find((t) => t.id === id);
            if (task) {
              await apiService.updateTask(id, { ...task, description: value });
            }
          }}
          onDeleteTask={async (id) => {
            await apiService.deleteTask(id);
            setTodo((prev) =>
              prev
                ? {
                    ...prev,
                    tasks: prev.tasks.filter((task) => task.id !== id),
                  }
                : null
            );
          }}
          onDragEnd={handleTaskReorder}
          onEdit={handleEdit}
        />
      </Box>

      <ImageMenu
        anchorEl={imageAnchorEl}
        open={Boolean(imageAnchorEl)}
        onClose={closeImageMenu}
        activeTaskId={activeTaskId}
        todo={todo}
        newTaskImage={newTaskImage}
        fileInputRef={fileInputRef}
        onAddPhoto={() => {
          if (fileInputRef.current) {
            fileInputRef.current.dataset.taskId =
              activeTaskId?.toString() || "new";
            fileInputRef.current.click();
          }
        }}
        onChangePhoto={() => {
          if (fileInputRef.current) {
            fileInputRef.current.dataset.taskId =
              activeTaskId?.toString() || "new";
            fileInputRef.current.click();
          }
        }}
        onRemovePhoto={() => {
          if (activeTaskId !== null && todo) {
            const task = todo.tasks.find((t) => t.id === activeTaskId);
            if (task) {
              const updatedTask = { ...task, image: undefined };
              setTodo({
                ...todo,
                tasks: todo.tasks.map((t) =>
                  t.id === activeTaskId ? updatedTask : t
                ),
              });
              apiService
                .updateTask(activeTaskId, updatedTask)
                .catch((error) =>
                  console.error("Error removing photo:", error)
                );
            }
          } else {
            setNewTaskImage(null);
          }
        }}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />

      <FooterButtons
        isEditing={isEditing}
        hasDoneTasks={!!hasDoneTasks}
        onRemoveDone={async () => {
          if (!todo) return;
          const doneTasks = todo.tasks.filter((task) => task.status === "DONE");
          const doneTaskIds = doneTasks.map((task) => task.id);

          await apiService.deleteDoneTasks(doneTaskIds);
          const filteredTasks = todo.tasks.filter(
            (task) => task.status !== "DONE"
          );
          setTodo({ ...todo, tasks: filteredTasks });
        }}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </Box>
  );
};
