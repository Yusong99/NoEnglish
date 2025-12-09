package org.noenglish.backend.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.noenglish.backend.dto.LoginResponse;
import org.noenglish.backend.entity.User;
import org.noenglish.backend.exception.BusinessException;
import org.noenglish.backend.repository.UserRepository;
import org.noenglish.backend.service.AuthService;
import org.noenglish.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;


    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // 注册
    public User register(User user) {
        // 检查用户名是否存在
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new BusinessException(1006, "用户名已存在");
        }

        // 加密密码
        user.setPassword(encoder.encode(user.getPassword()));

        // 保存用户
        return userRepository.save(user);
    }

    public LoginResponse login(String username, String password) {
        // 查询用户
        User user = userRepository.findByUsername(username);

        // 用户不存在或密码错误，统一提示
        if (user == null || !encoder.matches(password, user.getPassword())) {
            throw new BusinessException(1001, "用户名或密码错误");
        }
        // 成功 → 生成 JWT
        String token = JwtUtil.generateToken(user.getUsername(), user.getId());

        // 构建用户信息
        User userInfo = new User();
        userInfo.setId(user.getId());
        userInfo.setUsername(user.getUsername());
        userInfo.setAvatarUrl(user.getAvatarUrl());

        // 构建登录响应
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setTokenType("Bearer");
        loginResponse.setUserId(user.getId());

        return loginResponse;
    }
}
