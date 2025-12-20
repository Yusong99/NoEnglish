package org.noenglish.backend.repository;

import jakarta.transaction.Transactional;
import org.noenglish.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// Repository的作用是提示这是数据访问操作，JPA可加可不加
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    boolean existsByUsername(String username);

    @Modifying
    @Transactional
    @Query("update User u set u.avatarUrl = :avatarUrl where u.id = :userId")
    void updateAvatar(@Param("userId") Long userId, @Param("avatarUrl") String avatarUrl);

    @Modifying
    @Transactional
    @Query("""
        update User u
        set u.avatarId = :avatarId
        where u.id = :userId
    """)
    int updateAvatarId(@Param("userId") Long userId,
                        @Param("avatarId") Long avatarId);
}
