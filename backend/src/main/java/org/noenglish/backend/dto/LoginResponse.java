package org.noenglish.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private Long userId;      // 用户ID
    private String username;  // 用户名
    private String token;     // JWT
    private String tokenType = "Bearer"; // 默认类型
    private String avatarUrl;
}
