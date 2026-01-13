//package com.example.demo.config;
//
//import com.example.demo.controller.User;
//import com.example.demo.repository.UserRepository;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.List;
//
//@Component
//public class DataInitializer implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        if (userRepository.count() == 0) {
//            User admin = new User();
//            admin.setUsername("admin");
//            admin.setPassword(passwordEncoder.encode("admin123"));
//            admin.setRole("ADMIN");
//
//            User user = new User();
//            user.setUsername("user");
//            user.setPassword(passwordEncoder.encode("user123"));
//            user.setRole("USER");
//
//            userRepository.saveAll(List.of(admin, user));
//
//            System.out.println("Preloaded users: admin, user");
//        }
//    }
//}
