package org.noenglish.backend.controller;

import org.noenglish.backend.common.ApiResponse;
import org.noenglish.backend.dto.LoginResponse;
import org.noenglish.backend.entity.User;
import org.noenglish.backend.security.JwtUtil;
import org.noenglish.backend.service.AuthService;
import org.noenglish.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    // 注册接口
    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody User user) {
        User savedUser = authService.register(user);
        return ApiResponse.success(savedUser);
    }

    // 登录接口
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody User user) {
        LoginResponse loginData = authService.login(user.getUsername(), user.getPassword());
        return ApiResponse.success(loginData);
    }

    // 测试受保护接口
    @GetMapping("/hello")
    public ResponseEntity<?> hello(@RequestHeader("Authorization") String token) {
        String actualToken = token.replace("Bearer ", "");
        if (!JwtUtil.validateToken(actualToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
        String username = JwtUtil.getUsernameFromToken(actualToken);
        return ResponseEntity.ok("Hello " + username);
    }

    @PostMapping("/user/avatar")
    public ApiResponse<String> uploadAvatar(@RequestParam("file") MultipartFile file,
                                            @RequestParam("userId") Long userId) {
        try {
            String url = userService.updateAvatar(userId, file); // 直接传 file
            return ApiResponse.success(url);
        } catch (Exception e) {
            return ApiResponse.error(5000, "上传失败：" + e.getMessage());
        }
    }
}
