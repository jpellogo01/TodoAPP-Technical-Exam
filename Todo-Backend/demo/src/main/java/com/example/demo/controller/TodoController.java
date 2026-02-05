package com.example.demo.controller;

import com.example.demo.model.Todo;
import com.example.demo.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todo")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }


    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }


    @GetMapping("/{id}")
    public Todo getTodo(@PathVariable Long id) {
        return todoService.getTodoById(id);
    }


    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable Long id,
            @RequestBody Todo todoRequest
    ) {
        Todo updatedTodo = todoService.updateTodo(id, todoRequest);
        return ResponseEntity.ok(updatedTodo);
    }


    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
