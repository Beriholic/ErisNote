package xyz.beriholic.erisnote.controller;

import cn.dev33.satoken.annotation.SaIgnore;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.IdUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.beriholic.erisnote.model.entity.Fetchers;
import xyz.beriholic.erisnote.model.entity.dto.UserRegisterInput;
import xyz.beriholic.erisnote.model.except.ErisResult;
import xyz.beriholic.erisnote.repository.UserRepository;
import xyz.beriholic.erisnote.utils.PasswordUtil;

@RestController
@RequestMapping("/user")
@Slf4j(topic = "user-controller")
public class UserController {


    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @SaIgnore
    @PostMapping("/register")
    public ErisResult<Void> register(
            @RequestBody UserRegisterInput req
    ) {
        var uid = IdUtil.getSnowflakeNextId();

        var hashPassword = PasswordUtil.encrypt(req.getPassword());
        userRepository.saveUser(uid, req.getUsername(), hashPassword);
        return ErisResult.ok();
    }

    @SaIgnore
    @PostMapping("/login")
    public ErisResult<Void> login(
            @RequestBody UserRegisterInput req
    ) {
        var dbUser = userRepository.findUser(
                req.getUsername(),
                Fetchers.USER_FETCHER.allScalarFields()
        );

        if (dbUser == null) {
            var msg = "获取用户失败";
            log.error(msg);
            return ErisResult.fail(msg);
        }

        if (!PasswordUtil.check(req.getPassword(), dbUser.password())) {
            var msg = "登陆失败，密码或账户名错误";
            log.error(msg);
            return ErisResult.fail(msg);
        }

        StpUtil.login(dbUser.id());

        return ErisResult.ok();
    }

    @PostMapping("/auth")
    public ErisResult<Boolean> check() {
        if (!StpUtil.isLogin()) return ErisResult.fail("未登录");
        return ErisResult.ok(true);
    }

    @PostMapping("/logout")
    public ErisResult<Void> logout() {
        StpUtil.logout();
        return ErisResult.ok();
    }
}
