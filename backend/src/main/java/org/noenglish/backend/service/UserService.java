package org.noenglish.backend.service;

public interface UserService {
    // 更新用户头像
    void updateAvatar(Long userId, String avatarUrl);
}
