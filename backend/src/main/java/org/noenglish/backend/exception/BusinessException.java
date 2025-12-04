package org.noenglish.backend.exception;

import lombok.Getter;
import org.noenglish.backend.common.ResponseCode;

@Getter
public class BusinessException extends RuntimeException {
    private Integer code;

    public BusinessException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public BusinessException(ResponseCode responseCode) {
        super(responseCode.getMessage());
        this.code = responseCode.getCode();
    }
}
