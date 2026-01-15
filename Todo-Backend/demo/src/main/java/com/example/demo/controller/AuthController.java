package com.example.demo.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    // Hardcoded credentials
    private final String USERNAME = "user";
    private final String PASSWORD = "password";

    // Login endpoint
    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        HttpSession session) {

        if (USERNAME.equals(username) && PASSWORD.equals(password)) {
            session.setAttribute("USER", username);
            session.setMaxInactiveInterval(24 * 60 * 60); // 1 day in seconds
            return "Login successful";
        } else {
            return "Login failed";
        }
    }

    // Check if logged in
    @GetMapping("/check")
    public String check(HttpSession session) {
        Object user = session.getAttribute("USER");
        if (user != null) {
            return "Logged in as " + user;
        } else {
            return "Not logged in";
        }
    }

    // Logout endpoint
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logged out";
    }
}
