import type { TodoType, TaskType } from '../types';

const API_BASE = 'http://localhost:8080/api/v1';

export const apiService = {
  fetchTodo: async (): Promise<TodoType | null> => {
    const response = await fetch(`${API_BASE}/todo`);
    const data: TodoType[] = await response.json();
    return data.length > 0 ? data[0] : null;
  },

  createTodo: async (todo: Omit<TodoType, 'id'>): Promise<TodoType> => {
    const response = await fetch(`${API_BASE}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to create Todo");
    return response.json();
  },

  updateTodo: async (id: number, todo: Partial<TodoType>): Promise<TodoType> => {
    const response = await fetch(`${API_BASE}/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    return response.json();
  },

  // Task operations
  updateTask: async (id: number, task: Partial<TaskType>): Promise<TaskType> => {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  createTask: async (todoId: number, task: Omit<TaskType, 'id'>): Promise<TaskType> => {
    const response = await fetch(`${API_BASE}/tasks/todo/${todoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add task: ${errorText}`);
    }
    return response.json();
  },

  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
  },

  deleteDoneTasks: async (taskIds: number[]): Promise<void> => {
    await Promise.all(
      taskIds.map(id => 
        fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" })
          .then(res => {
            if (!res.ok) throw new Error(`Failed to delete task: ${id}`);
          })
      )
    );
  }
};