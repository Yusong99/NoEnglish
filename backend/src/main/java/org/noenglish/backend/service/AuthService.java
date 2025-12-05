package org.noenglish.backend.service;

import org.noenglish.backend.entity.LoginResponse;
import org.noenglish.backend.entity.User;
import org.noenglish.backend.exception.BusinessException;
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
            throw new BusinessException(1006, "用户名已存在");
        }

        // 加密密码
        user.setPassword(encoder.encode(user.getPassword()));

        // 保存用户
        return userRepository.save(user);
    }

    public LoginResponse login(String username, String password) {
        User user = userRepository.findByUsername(username);

        // 用户不存在或密码错误，统一提示
        if (user == null || !encoder.matches(password, user.getPassword())) {
            throw new BusinessException(1001, "用户名或密码错误");
        }
        // 检查账号状态
//        if (!user.isEnabled()) {
//            throw new BusinessException(ResponseCode.ACCOUNT_DISABLED);
//        }

//        if (user == null) {
//            throw new RuntimeException("User not found");
//        }

//        if (!encoder.matches(password, user.getPassword())) {
//            throw new RuntimeException("Password incorrect");
//        }

        // 成功 → 生成 JWT
        String token = JwtUtil.generateToken(user.getUsername());

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setExpiresIn((long) (3600*24));

        return loginResponse;
    }
}
