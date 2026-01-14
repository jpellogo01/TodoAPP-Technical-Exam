package com.example.demo.service;

import com.example.demo.model.Todo;
import com.example.demo.model.Task;
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
        // Link tasks to todo
        if (todo.getTasks() != null) {
            for (Task task : todo.getTasks()) {
                task.setTodo(todo);
            }
        }
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = getTodoById(id);

        todo.setTitle(todoDetails.getTitle());
        todo.setStatus(todoDetails.getStatus());

        // Clear existing tasks and add new tasks
        todo.getTasks().clear();
        if (todoDetails.getTasks() != null) {
            for (Task task : todoDetails.getTasks()) {
                task.setTodo(todo);
                todo.getTasks().add(task);
            }
        }

        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
