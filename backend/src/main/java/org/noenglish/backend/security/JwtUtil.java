package org.noenglish.backend.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // 至少 32 字节（HS256 要求）
    private static final String SECRET =
            "noenglish_noenglish_noenglish_noenglish";

    private static final long EXPIRE_TIME =
            1000L * 60 * 60 * 24; // 24h

    private static final Key KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    /** 生成 token（subject 放 userId） */
    public static String generateToken(String username, Long userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_TIME))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /** 解析 token */
    public static Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /** 取 userId */
    public static Long getUserId(String token) {
        return Long.valueOf(parseToken(token).getSubject());
    }

    /** 是否过期 */
    public static boolean isExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    /** 校验 token 是否合法 */
    public static boolean validate(String token) {
        try {
            parseToken(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}

