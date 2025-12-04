package org.noenglish.backend.controller;

import org.noenglish.backend.dto.response.ApiResponse;
import org.noenglish.backend.entity.LoginResponse;
import org.noenglish.backend.entity.User;
import org.noenglish.backend.security.JwtUtil;
import org.noenglish.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User savedUser = authService.register(user);
        return ResponseEntity.ok("User registered: " + savedUser.getUsername());
    }

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody User user) {
//        String token = authService.login(user.getUsername(), user.getPassword());
        LoginResponse loginData = authService.login(user.getUsername(), user.getPassword());
        return ApiResponse.success(loginData);
    }

    // 测试受保护接口
    @GetMapping("/hello")
    public ResponseEntity<?> hello(@RequestHeader("Authorization") String token) {
        if(!JwtUtil.validateToken(token.replace("Bearer ", ""))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
        String username = JwtUtil.getUsernameFromToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok("Hello " + username);
    }
}
