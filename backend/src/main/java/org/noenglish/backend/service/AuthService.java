package org.noenglish.backend.service;

import org.noenglish.backend.entity.User;
import org.noenglish.backend.repository.UserRepository;
import org.noenglish.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // 注册
    public User register(User user) {
        // 检查用户名是否存在
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // 加密密码
        user.setPassword(encoder.encode(user.getPassword()));

        // 保存用户
        return userRepository.save(user);
    }

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Password incorrect");
        }

        // 成功 → 生成 JWT
        return JwtUtil.generateToken(user.getUsername());
    }
}
