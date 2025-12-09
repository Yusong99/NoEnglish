package org.noenglish.backend.controller;

import org.noenglish.backend.common.ApiResponse;
import org.noenglish.backend.entity.User;
import org.noenglish.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 根据用户ID获取用户信息
     */
    @GetMapping("/{id}")
    public ApiResponse<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ApiResponse.error(2002, "用户不存在");
        }
        return ApiResponse.success(user);
    }

    /**
     * 上传用户头像
     */
    @PostMapping("/avatar")
    public ApiResponse<String> uploadAvatar(@RequestParam("file") MultipartFile file,
                                            @RequestParam("userId") Long userId) {
        if (file.isEmpty()) {
            return ApiResponse.error(2003, "文件为空");
        }

        try {
            String avatarUrl = userService.updateAvatar(userId, file);
            return ApiResponse.success(avatarUrl);
        } catch (Exception e) {
            return ApiResponse.error(5000, "上传失败：" + e.getMessage());
        }
    }
}
