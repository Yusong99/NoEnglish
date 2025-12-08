package org.noenglish.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.io.IOException;

// 1. 通用响应类
public class ApiResponse<T> {
    @Getter
    @Setter
    private Integer code;      // 状态码
    @Getter
    @Setter
    private String message;    // 提示信息
    @Getter
    @Setter
    private T data;           // 实际数据
    @Getter
    @Setter
    private Long timestamp;   // 时间戳

    public ApiResponse() {
        this.timestamp = System.currentTimeMillis();
    }

    // 成功响应
    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(200);
        response.setMessage("success");
        response.setData(data);
        return response;
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(200);
        response.setMessage(message);
        response.setData(data);
        return response;
    }

    // 失败响应
    public static <T> ApiResponse<T> error(Integer code, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(code);
        response.setMessage(message);
        return response;
    }

    // 失败响应
    public static <T> ApiResponse<T> error(IOException e) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setMessage(e.getMessage());
        return response;
    }
}

