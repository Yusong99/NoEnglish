package org.noenglish.backend.security;

import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;


@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        // 登录及注册不需要验证token
        if (path.startsWith("/auth") || path.startsWith("/avatar/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 没带token
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            unauthorized(response, "未登录");
            return;
        }

        String token = authHeader.substring(7);
        logger.info(token);

        try {
            Claims claims = JwtUtil.parseToken(token);
            logger.info("1");
            if (JwtUtil.isExpired(claims)) {
                unauthorized(response, "登录已过期");
                return;
            }
            Long userId = Long.valueOf(claims.getSubject());
            logger.info("2");
            // 放进 request，后面Controller拿到
            request.setAttribute("userId", userId);
            logger.info("3");
            filterChain.doFilter(request, response);
            logger.info("4");
        } catch (Exception e) {
            unauthorized(response, "token无效");
        }
    }

    private void unauthorized(HttpServletResponse response, String msg) throws IOException {
        logger.info(msg);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"code\":401,\"msg\":\"" + msg + "\"}");
    }
}
