package xyz.beriholic.erisnote.model.except;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ErisResult<String> exceptionHandler(Exception e) {
        log.error("Exception: ", e);
        return ErisResult.fail(ErisResultStatus.SYSTEM_ERROR, e.getMessage());
    }
}
