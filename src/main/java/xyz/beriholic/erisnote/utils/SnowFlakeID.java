package xyz.beriholic.erisnote.utils;

import cn.hutool.core.util.IdUtil;
import org.babyfish.jimmer.sql.meta.UserIdGenerator;

public class SnowFlakeID implements UserIdGenerator<Long> {
    @Override
    public Long generate(Class<?> entityType) {
        return IdUtil.getSnowflakeNextId();
    }
}
