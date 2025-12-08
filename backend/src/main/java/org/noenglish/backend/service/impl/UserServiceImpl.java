package org.noenglish.backend.service.impl;

import org.noenglish.backend.repository.UserRepository;
import org.noenglish.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void updateAvatar(Long userId, String avatarUrl) {
        userRepository.updateAvatar(userId, avatarUrl);
    }
}
