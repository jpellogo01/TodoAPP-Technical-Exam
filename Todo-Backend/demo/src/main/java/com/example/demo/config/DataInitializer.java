package com.example.demo.config;

import com.example.demo.model.TaskStatus;
import com.example.demo.model.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TodoRepository todoRepository;

    public DataInitializer(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (todoRepository.count() == 0) {
            Todo todo = new Todo();
            todo.setTitle("To do list title");
            todo.setStatus(TaskStatus.PENDING);

            todoRepository.save(todo);

            System.out.println("Preloaded Todo: To do list title");
        }
    }
}
