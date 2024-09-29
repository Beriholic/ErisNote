package xyz.beriholic.erisnote.utils;

import cn.hutool.crypto.digest.BCrypt;

public class PasswordUtil {
    public static String encrypt(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public static Boolean check(String password, String hash) {
        return BCrypt.checkpw(password, hash);
    }
}
