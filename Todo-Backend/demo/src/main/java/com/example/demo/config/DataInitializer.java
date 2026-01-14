package com.example.demo.config;

import com.example.demo.model.TaskStatus;
import com.example.demo.model.Todo;
import com.example.demo.model.User;
import com.example.demo.repository.TodoRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TodoRepository todoRepository;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, TodoRepository todoRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));

            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("user123"));

            userRepository.saveAll(List.of(admin, user));

            System.out.println("Preloaded users: admin, user");
        }
        if (todoRepository.count() == 0) {
            Todo todo = new Todo();
            todo.setTitle("To do list title");
            todo.setStatus(TaskStatus.PENDING);

            todoRepository.save(todo);

            System.out.println("Preloaded Todo: To do list title");
        }
    }
}
