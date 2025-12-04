package org.noenglish.backend.entity;

import lombok.Getter;
import lombok.Setter;

public class LoginResponse {
    @Setter
    @Getter
    private String token;
    @Setter
    @Getter
    private String tokenType = "Bearer";  // token 类型
    @Setter
    @Getter
    private Long expiresIn;  // 过期时间（秒）
    @Setter
    @Getter
    private User userInfo;  // 用户基本信息
}
