package org.noenglish.backend.controller;

import org.noenglish.backend.dto.response.ApiResponse;
import org.noenglish.backend.entity.LoginResponse;
import org.noenglish.backend.entity.User;
import org.noenglish.backend.security.JwtUtil;
import org.noenglish.backend.service.AuthService;
import org.noenglish.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;


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

    @PostMapping("/user/avatar")
    public ApiResponse uploadAvatar(@RequestParam("file") MultipartFile file,
                               @RequestParam("userId") Long userId) {

        if (file.isEmpty()) {
            return ApiResponse.error(2003, "文件为空");
        }

        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String savePath = "avatar/" + filename;

        try {
            file.transferTo(new File(savePath));
        } catch (IOException e) {
            return ApiResponse.error(2003, "保存失败");
        }

        String url = "http://@localhost/avatar/" + filename;
        userService.updateAvatar(userId, url);

        return ApiResponse.success(url);
    }
}
