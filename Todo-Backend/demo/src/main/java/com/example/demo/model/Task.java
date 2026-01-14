package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Enumerated(EnumType.STRING)
    private TodoStatus status;

    @ManyToOne
    @JoinColumn(name = "todo_id")
    @JsonBackReference
    private Todo todo;



    // Constructors
    public Task() {}

    public Task(String description, TodoStatus status, Todo todo) {
        this.description = description;
        this.status = status;
        this.todo = todo;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TodoStatus getStatus() { return status; }
    public void setStatus(TodoStatus status) { this.status = status; }

    public Todo getTodo() { return todo; }
    public void setTodo(Todo todo) { this.todo = todo; }
}
