package org.noenglish.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    // 密钥（实际项目应该放在配置文件中）
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // token 有效期（24小时）
    private static final long EXPIRATION_TIME = 7200000*12;

    /**
     * 生成 JWT token
     * @param username 用户名
     * @param userId 用户ID
     * @return token 字符串
     */
    public static String generateToken(String username, Long userId) {
        return Jwts.builder()
                .setSubject(username)                    // 设置主题（用户名）
                .claim("userId", userId)                 // 添加自定义字段：用户ID
                .setIssuedAt(new Date())                 // 签发时间
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // 过期时间
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)  // 签名算法
                .compact();
    }

    /**
     * 从 token 中解析用户名
     * @param token JWT token
     * @return 用户名
     */
    public static String getUsernameFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.getSubject();
    }

    /**
     * 从 token 中解析用户ID
     * @param token JWT token
     * @return 用户ID
     */
    public static Long getUserIdFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.get("userId", Long.class);
    }

    /**
     * 验证 token 是否有效
     * @param token JWT token
     * @return true=有效，false=无效
     */
    public static boolean validateToken(String token) {
        try {
            Claims claims = parseToken(token);
            // 检查是否过期
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 解析 token
     * @param token JWT token
     * @return Claims 对象
     */
    private static Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 获取 token 过期时间（秒）
     * @return 过期时间
     */
    public static Long getExpirationTime() {
        return EXPIRATION_TIME / 1000;  // 转换为秒
    }
}