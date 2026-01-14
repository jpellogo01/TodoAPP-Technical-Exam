package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.model.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }


    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }


    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
    }


    public Todo createTodo(Todo todo) {
        if (todo.getTasks() != null) {
            for (Task task : todo.getTasks()) {
                task.setTodo(todo); // link task to parent todo
            }
        }
        return todoRepository.save(todo);
    }


    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = getTodoById(id);


        todo.setTitle(todoDetails.getTitle());
        todo.setStatus(todoDetails.getStatus());

        if (todoDetails.getTasks() != null) {
            for (Task taskDetails : todoDetails.getTasks()) {
                if (taskDetails.getId() != null) {
                    // Update existing task
                    Task existingTask = todo.getTasks().stream()
                            .filter(t -> t.getId().equals(taskDetails.getId()))
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("Task not found"));
                    existingTask.setDescription(taskDetails.getDescription());
                    existingTask.setStatus(taskDetails.getStatus());
                    existingTask.setImage(taskDetails.getImage());
                } else {
                    // New task
                    taskDetails.setTodo(todo);
                    todo.getTasks().add(taskDetails);
                }
            }
        }

        return todoRepository.save(todo);
    }


    // Delete Todo
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
