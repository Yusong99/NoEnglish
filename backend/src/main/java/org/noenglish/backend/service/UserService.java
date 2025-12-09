package org.noenglish.backend.service;

import org.noenglish.backend.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {

    User getUserById(Long userId);

    User getUserByUsername(String username);

    boolean existsByUsername(String username);

    String updateAvatar(Long userId, MultipartFile file) throws IOException;
}
