package com.example.demo.controller;

import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/todo/{todoId}")
    public List<Task> getTasksByTodo(@PathVariable Long todoId) {
        return taskService.getTasksByTodoId(todoId);
    }

    @PostMapping("/todo/{todoId}")
    public Task addTask(@PathVariable Long todoId, @RequestBody Task task) {
        return taskService.addTaskToTodo(todoId, task);
    }

    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable Long taskId, @RequestBody Task task) {
        return taskService.updateTask(taskId, task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
    }
}
