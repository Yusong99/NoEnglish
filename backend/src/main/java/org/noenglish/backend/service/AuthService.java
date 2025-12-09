package org.noenglish.backend.service;

import org.noenglish.backend.dto.LoginResponse;
import org.noenglish.backend.entity.User;

public interface AuthService {
    //注册
    public User register(User user);

    //登录
    public LoginResponse login(String username, String password);
}
