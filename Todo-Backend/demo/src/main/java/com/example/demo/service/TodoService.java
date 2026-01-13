package com.example.demo.service;

import com.example.demo.model.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    private final TodoRepository todoRepository;


    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos(){
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(Long id){
        return todoRepository.findById(id);
    }

    public Todo createTodo(Todo todo){
    return todoRepository.save(todo);
    }

    public Todo  updateTodo(Long id, Todo todoDetails){
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo item not found"));
        todo.setTitle(todoDetails.getTitle());
        todo.setTask(todoDetails.getTask());
        todo.setStatus(todoDetails.getStatus());
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo( @PathVariable  Long id){
        todoRepository.deleteById(id);
    }
}





