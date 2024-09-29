package xyz.beriholic.erisnote.model.entity;

import lombok.experimental.Accessors;
import org.babyfish.jimmer.jackson.JsonConverter;
import org.babyfish.jimmer.jackson.LongToStringConverter;
import org.babyfish.jimmer.sql.*;
import org.jetbrains.annotations.Nullable;
import xyz.beriholic.erisnote.utils.SnowFlakeID;


@Entity
@Table(name = "tb_categories")
@Accessors(chain = true)
public interface Categories {

    @Id
    @GeneratedValue(generatorType = SnowFlakeID.class)
    @JsonConverter(LongToStringConverter.class)
    long id();

    String name();

    @ManyToOne
    @Nullable
    User user();
}
