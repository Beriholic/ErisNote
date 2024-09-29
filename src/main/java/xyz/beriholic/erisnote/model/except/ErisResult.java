package xyz.beriholic.erisnote.model.except;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErisResult<T> {
    private Integer code;
    private String msg;
    private T data;

    public static <T> ErisResult<T> ok(String msg, T data) {
        return new ErisResult<>(ErisResultStatus.SUCCESS.getCode(), msg, data);
    }

    public static <T> ErisResult<T> ok(T data) {
        return new ErisResult<>(ErisResultStatus.SUCCESS.getCode(), "success", data);
    }

    public static <T> ErisResult<T> ok() {
        return new ErisResult<>(ErisResultStatus.SUCCESS.getCode(), "success", null);
    }

    public static <T> ErisResult<T> fail(String msg) {
        return new ErisResult<>(ErisResultStatus.FAIL.getCode(), msg, null);
    }

    public static <T> ErisResult<T> fail(ErisResultStatus status) {
        return new ErisResult<>(status.getCode(), status.getMsg(), null);
    }

    public static <T> ErisResult<T> fail(ErisResultStatus status, String msg) {
        return new ErisResult<>(status.getCode(), msg, null);
    }

    public static <T> ErisResult<T> fail(Integer code, String msg) {
        return new ErisResult<>(code, msg, null);
    }
}
