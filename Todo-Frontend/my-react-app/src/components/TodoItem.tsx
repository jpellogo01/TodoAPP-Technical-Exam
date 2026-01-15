import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton, Button, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { styles } from "./styles"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


interface TaskType {
    id: number;
    description: string;
    status: string;
    image?: string;
}

interface TodoType {
    id?: number;
    title: string;
    status: string;
    tasks: TaskType[];
}

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

    const isImageMenuOpen = Boolean(imageAnchorEl);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/todo");
                const data: TodoType[] = await response.json();
                if (data.length > 0) {
                    const firstTodo = data[0];
                    const mappedTasks = firstTodo.tasks.map((task, index) => ({
                        ...task,
                        id: task.id ?? index,
                    }));
                    setTodo({ ...firstTodo, tasks: mappedTasks });
                    setNextId(Math.max(...mappedTasks.map(t => t.id), 0) + 1);
                } else {
                    setTodo(null);
                    setNextId(1);
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

    const toggleDone = async (id: number) => {
        if (!todo) return;
        const updatedTasks = todo.tasks.map((task) =>
            task.id === id
                ? { ...task, status: task.status === "DONE" ? "PENDING" : "DONE" }
                : task
        );
        setTodo({ ...todo, tasks: updatedTasks });

        const updatedTask = updatedTasks.find(task => task.id === id);
        if (updatedTask) {
            try {
                await fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTask),
                });
            } catch (error) {
                console.error("Error updating task status:", error);
            }
        }
    };

    const removeDoneTasks = async () => {
        if (!todo) return;
        const doneTasks = todo.tasks.filter((task) => task.status === "DONE");
        await Promise.all(
            doneTasks.map(async (task) => {
                try {
                    await fetch(`http://localhost:8080/api/v1/tasks/${task.id}`, {
                        method: "DELETE",
                    });
                } catch (error) {
                    console.error("Failed to delete task:", task.id, error);
                }
            })
        );
        const filteredTasks = todo.tasks.filter((task) => task.status !== "DONE");
        setTodo({ ...todo, tasks: filteredTasks });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setOriginalTodo(todo);
        setEditTitle(todo?.title || "To do list title");
        setNewTaskDescription("");
        setNewTaskImage(null);
    };

    const handleSave = async () => {
        if (!todo || todo.id == null) {
            try {
                const response = await fetch("http://localhost:8080/api/v1/todo", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: editTitle,
                        status: "PENDING",
                        tasks: todo?.tasks ?? [],
                    }),
                });
                if (!response.ok) throw new Error("Failed to create Todo");
                const newTodo = await response.json();
                setTodo(newTodo);
                setIsEditing(false);
            } catch (error) {
                console.error("Error creating todo:", error);
            }
        } else {
            try {
                await fetch(`http://localhost:8080/api/v1/todo/${todo.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...todo,
                        title: editTitle,
                    }),
                });
                const res = await fetch(`http://localhost:8080/api/v1/todo/${todo.id}`);
                const updatedTodo = await res.json();
                setTodo(updatedTodo); // Update UI
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating todo:", error);
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
        if (todo && todo.id) {
            try {
                await fetch(`http://localhost:8080/api/v1/todo/${todo.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...todo, title: value }),
                });
            } catch (error) {
                console.error("Error updating title:", error);
            }
        }
    };

    const handleTaskDescriptionChange = async (id: number, value: string) => {
        setTodo((prev) =>
            prev
                ? {
                    ...prev,
                    tasks: prev.tasks.map((task) =>
                        task.id === id ? { ...task, description: value } : task
                    ),
                }
                : null
        );
        const task = todo?.tasks.find(t => t.id === id);
        if (task) {
            try {
                await fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...task, description: value }),
                });
            } catch (error) {
                console.error("Error updating task:", error);
            }
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

   const handleAddPhoto = (taskId: number | null) => {
    if (fileInputRef.current) {
        delete fileInputRef.current.dataset.taskId;
        fileInputRef.current.dataset.taskId = taskId?.toString() || 'new';
        fileInputRef.current.click();
    }
    closeImageMenu();
};

const handleChangePhoto = (taskId: number | null) => {
    if (fileInputRef.current) {
        delete fileInputRef.current.dataset.taskId;
        fileInputRef.current.dataset.taskId = taskId?.toString() || 'new';
        fileInputRef.current.click();
    }
    closeImageMenu();
};

    const handleRemovePhoto = (taskId: number | null) => {
        if (taskId !== null) {
            const task = todo?.tasks.find(t => t.id === taskId);
            if (task) {
                const updatedTask = { ...task, image: undefined };
                setTodo((prev) =>
                    prev
                        ? {
                            ...prev,
                            tasks: prev.tasks.map((t) =>
                                t.id === taskId ? updatedTask : t
                            ),
                        }
                        : null
                );
                fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTask),
                }).catch(error => console.error("Error removing photo:", error));
            }
        } else {
            // New task
            setNewTaskImage(null);
        }
        closeImageMenu();
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        
        // Read the task ID from the dataset
        const taskIdStr = event.target.dataset.taskId;
        const taskId = taskIdStr === 'new' ? null : (taskIdStr ? parseInt(taskIdStr) : null);
        
        reader.onload = () => {
            const imageUrl = reader.result as string;
            
            if (taskId !== null) {
                // Existing task
                const task = todo?.tasks.find(t => t.id === taskId);
                if (task) {
                    const updatedTask = { ...task, image: imageUrl };
                    setTodo((prev) =>
                        prev
                            ? {
                                ...prev,
                                tasks: prev.tasks.map((t) =>
                                    t.id === taskId ? updatedTask : t
                                ),
                            }
                            : null
                    );
                    // API call
                    fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedTask),
                    }).catch(error => console.error("Error updating task image:", error));
                }
            } else {
                // New task (the + icon area)
                setNewTaskImage(imageUrl);
            }
        };
        reader.readAsDataURL(file);
    }
    event.target.value = ''; // Reset input
    
    // Clear the dataset after reading
    if (event.target) {
        delete event.target.dataset.taskId;
    }
};

    const addNewTask = async () => {
        if (newTaskDescription.trim() === "") return;
        if (todo && todo.id) {
            const taskData = {
                description: newTaskDescription,
                status: "PENDING",
                image: newTaskImage
            };

            console.log("Sending task data:", {
                ...taskData,
                image: newTaskImage ? `Base64 present (length: ${newTaskImage.length})` : "No image"
            });

            try {
                const response = await fetch(`http://localhost:8080/api/v1/tasks/todo/${todo.id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskData),
                });

                console.log("Response status:", response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error response:", errorText);
                    throw new Error(`Failed to add task: ${errorText}`);
                }

                const newTask = await response.json();
                console.log("Created task:", newTask);

                setTodo((prev) => prev ? { ...prev, tasks: [...prev.tasks, newTask] } : null);
                setNewTaskDescription("");
                setNewTaskImage(null);
            } catch (error) {
                console.error("Error adding task:", error);
                alert("Failed to add task: " + error.message);
            }
        } else {
            const newTask: TaskType = { id: nextId, description: newTaskDescription, status: "PENDING", image: newTaskImage || undefined };
            setTodo((prev) => prev ? { ...prev, tasks: [...prev.tasks, newTask] } : { title: editTitle, status: "PENDING", tasks: [newTask] });
            setNextId(nextId + 1);
            setNewTaskDescription("");
            setNewTaskImage(null);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            setTodo((prev) =>
                prev ? { ...prev, tasks: prev.tasks.filter((task) => task.id !== id) } : null
            );
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };


    if (loading) return <Typography>Loading...</Typography>;

    const hasDoneTasks = todo && todo.tasks.some((task) => task.status === "DONE");

    return (
        <Box sx={styles.container}>
            {isEditing ? (
                <TextField
                    value={editTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    variant="standard"
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                        sx: { ...styles.header, padding: 0 },
                    }}
                />
            ) : (
                <Typography variant="h5" sx={styles.header}>
                    {todo ? todo.title : "To do list title"}
                </Typography>
            )}

            <Box sx={styles.listContainer}>
                {isEditing ? (
                    <>
                        <Box sx={styles.goalItem}>
                            <Box
                                sx={styles.leftPart}
                                style={newTaskImage ? { backgroundImage: `url(${newTaskImage})` } : {}}
                                onClick={(e) => handleImageClick(e, null)}
                            >
                                {!newTaskImage && <ImageIcon sx={styles.defaultIcon} />}
                            </Box>
                            <Box sx={{ ...styles.rightPart, backgroundColor: "#D2C9CA", justifyContent: "space-between" }}>
                                <TextField
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    sx={styles.titleInput}
                                    variant="standard"
                                    placeholder="Enter new task here."
                                />
                                <IconButton
                                    onClick={addNewTask}
                                    sx={styles.addIcon}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        {todo && todo.tasks.map((task) => (
                            <Box key={task.id} sx={styles.goalItem}>
                                <Box
                                    sx={styles.leftPart}
                                    style={task.image ? { backgroundImage: `url(${task.image})` } : {}}
                                    onClick={(e) => handleImageClick(e, task.id)}
                                >
                                    {!task.image && <ImageIcon sx={styles.defaultIcon} />}
                                </Box>

                                <Box sx={{ ...styles.rightPart, backgroundColor: "#D2C9CA" }}>
                                    <TextField
                                        value={task.description}
                                        onChange={(e) => handleTaskDescriptionChange(task.id, e.target.value)}
                                        sx={styles.titleInput}
                                        variant="standard"
                                        fullWidth
                                        placeholder="Enter new task here."
                                    />
                                </Box>
                                <IconButton
                                    onClick={() => deleteTask(task.id)}
                                    sx={styles.deleteIcon}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </>
                ) : todo && todo.tasks.length > 0 ? (
                    todo.tasks.map((task) => (
                        <Box key={task.id} sx={styles.goalItem}>
                            <IconButton
                                onClick={() => toggleDone(task.id)}
                                sx={{
                                    ...styles.iconButton,
                                    color: task.status === "DONE" ? "#0A1F56" : "#a1866f",
                                }}
                            >
                                {task.status === "DONE" ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                            </IconButton>

                            <Box
                                sx={styles.leftPart}
                                style={task.image ? { backgroundImage: `url(${task.image})` } : {}}
                            >
                                {!task.image && <ImageIcon sx={styles.defaultIcon} />}
                            </Box>

                            <Box
                                sx={{
                                    ...styles.rightPart,
                                    backgroundColor: task.status === "DONE" ? "#D4D8E5" : "#D2C9CA",
                                }}
                            >
                                <Typography sx={styles.title}>{task.description}</Typography>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Box sx={styles.noTask}>
                        <Typography sx={styles.title}>
                            There are no task yet.{" "}
                            <Box
                                component="span"
                                sx={styles.editLink}
                                onClick={handleEdit}
                            >
                                Edit
                            </Box>{" "}
                            to start.
                        </Typography>                    </Box>
                )}
            </Box>
            <Menu
                anchorEl={imageAnchorEl}
                open={isImageMenuOpen}
                onClose={closeImageMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                {(activeTaskId !== null && todo?.tasks.find((t) => t.id === activeTaskId)?.image) ||
                    (activeTaskId === null && newTaskImage) ? (
                    <>
                        <MenuItem onClick={() => handleChangePhoto(activeTaskId)}>
                            Change Photo
                        </MenuItem>
                        <MenuItem onClick={() => handleRemovePhoto(activeTaskId)}>
                            Remove Photo
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={() => handleAddPhoto(activeTaskId)}>
                        Add Photo
                    </MenuItem>
                )}
            </Menu>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />

            <Box sx={styles.footer}>
                {hasDoneTasks && !isEditing && (
                    <Button onClick={removeDoneTasks} variant="outlined" sx={styles.removeBtn}>
                        Remove All Done Tasks
                    </Button>
                )}

                {isEditing ? (
                    <>
                        <Button onClick={handleCancel} variant="outlined" sx={styles.cancelBtn}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant="contained" sx={styles.saveBtn}>
                            Save
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleEdit} variant="contained" sx={styles.editBtn}>
                        Edit
                    </Button>
                )}
            </Box>
        </Box>
    );
};