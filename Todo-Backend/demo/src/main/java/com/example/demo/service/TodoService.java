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
            for (int i = 0; i < todo.getTasks().size(); i++) {
                Task task = todo.getTasks().get(i);
                task.setTodo(todo);
                task.setTaskOrder(i);
            }
        }
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = getTodoById(id);

        todo.setTitle(todoDetails.getTitle());
        todo.setStatus(todoDetails.getStatus());

        if (todoDetails.getTasks() != null) {

            for (int i = 0; i < todoDetails.getTasks().size(); i++) {
                Task taskDetails = todoDetails.getTasks().get(i);

                if (taskDetails.getId() != null) {
                    Task existingTask = todo.getTasks().stream()
                            .filter(t -> t.getId().equals(taskDetails.getId()))
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("Task not found"));

                    existingTask.setDescription(taskDetails.getDescription());
                    existingTask.setStatus(taskDetails.getStatus());
                    existingTask.setImage(taskDetails.getImage());

                    existingTask.setTaskOrder(i);

                } else {
                    taskDetails.setTodo(todo);
                    taskDetails.setTaskOrder(i);
                    todo.getTasks().add(taskDetails);
                }
            }
        }

        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
