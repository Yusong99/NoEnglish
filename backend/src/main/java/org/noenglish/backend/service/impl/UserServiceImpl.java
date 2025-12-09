package org.noenglish.backend.service.impl;

import org.noenglish.backend.entity.User;
import org.noenglish.backend.repository.UserRepository;
import org.noenglish.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public String updateAvatar(Long userId, MultipartFile file) throws IOException {
        if (file.isEmpty()) throw new IOException("文件为空");

        // 保存到项目根目录 avatar 文件夹
        File dir = new File("avatar");
        if (!dir.exists()) dir.mkdirs();

        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File saveFile = new File(dir, filename);
        file.transferTo(saveFile);

        String url = "http://localhost:8080/avatar/" + filename;

        // 更新数据库
        userRepository.updateAvatar(userId, url);

        return url;
    }
}
