package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.model.Todo;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TodoRepository todoRepository;

    public TaskService(TaskRepository taskRepository, TodoRepository todoRepository) {
        this.taskRepository = taskRepository;
        this.todoRepository = todoRepository;
    }

    // Get all tasks for a specific Todo
    public List<Task> getTasksByTodoId(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        return todo.getTasks();
    }

    // Add a task to a specific Todo
    public Task addTaskToTodo(Long todoId, Task task) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        task.setTodo(todo);
        todo.getTasks().add(task);
        todoRepository.save(todo);
        return task;
    }

    // Update a task
    public Task updateTask(Long taskId, Task taskDetails) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setImage(taskDetails.getImage());

        return taskRepository.save(task);
    }

    // Delete a task
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }
}
