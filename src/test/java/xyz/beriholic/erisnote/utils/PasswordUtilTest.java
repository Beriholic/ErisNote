package xyz.beriholic.erisnote.utils;

import org.junit.jupiter.api.Test;

public class PasswordUtilTest {
    @Test
    void test() {
        String password = "114514";
        String encrypt = PasswordUtil.encrypt(password);

        assert PasswordUtil.check(password, encrypt);
    }
}
