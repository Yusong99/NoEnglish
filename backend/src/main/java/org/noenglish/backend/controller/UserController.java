package org.noenglish.backend.controller;

import lombok.extern.java.Log;
import org.noenglish.backend.common.ApiResponse;
import org.noenglish.backend.entity.User;
import org.noenglish.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

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

    /**
     * 用户选择自己的头像
     */
    @PostMapping("/avatarId")
    public ApiResponse<String> uploadAvatarId(@RequestAttribute("userId") Long userId, @RequestParam Long avatarId) throws IOException {
        userService.updateAvatarId(userId, avatarId);
        return ApiResponse.success("更新头像ID成功");
    }
}
