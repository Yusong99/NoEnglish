package org.noenglish.backend.common;

import lombok.Getter;

@Getter
public enum ResponseCode {
    SUCCESS(200, "操作成功"),

    // 认证相关 1000-1099
    AUTH_FAILED(1001, "用户名或密码错误"),
    TOKEN_EXPIRED(1002, "登录已过期"),
    TOKEN_INVALID(1003, "无效的登录凭证"),
    ACCOUNT_DISABLED(1004, "账号已被禁用"),
    ACCOUNT_LOCKED(1005, "账号已被锁定"),
    ACCOUNT_EXIST(1006, "用户名已存在"),
    // 业务相关 2000-2999
    PARAM_ERROR(2001, "参数错误"),
    DATA_NOT_FOUND(2002, "数据不存在"),
    IMAGE_ERROR(2003, "上传头像错误"),

    // 系统相关 5000-5999
    SYSTEM_ERROR(5000, "系统错误");

    private final Integer code;
    private final String message;

    // 构造函数、getter...
    // 枚举构造函数必须是 private 或默认的
    ResponseCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}