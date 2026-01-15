package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @Column(name = "task_order")
    private Integer taskOrder;

    @ManyToOne
    @JoinColumn(name = "todo_id")
    @JsonBackReference
    private Todo todo;

    public Task() {}

    public Task(String description, TaskStatus status, String image, Integer taskOrder) {
        this.description = description;
        this.status = status;
        this.image = image;
        this.taskOrder = taskOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Integer getTaskOrder() { return taskOrder; }
    public void setTaskOrder(Integer taskOrder) { this.taskOrder = taskOrder; }

    public Todo getTodo() { return todo; }
    public void setTodo(Todo todo) { this.todo = todo; }
}
