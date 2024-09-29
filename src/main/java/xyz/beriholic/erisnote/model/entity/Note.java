package xyz.beriholic.erisnote.model.entity;

import lombok.experimental.Accessors;
import org.babyfish.jimmer.jackson.JsonConverter;
import org.babyfish.jimmer.jackson.LongToStringConverter;
import org.babyfish.jimmer.sql.*;
import org.jetbrains.annotations.Nullable;
import xyz.beriholic.erisnote.utils.SnowFlakeID;

import java.time.LocalDateTime;


@Entity
@Table(name = "tb_note")
@Accessors(chain = true)
public interface Note {

    @Id
    @GeneratedValue(generatorType = SnowFlakeID.class)
    @JsonConverter(LongToStringConverter.class)
    long id();

    String title();

    String content();

    @Column(name = "created_at")
    @Nullable
    LocalDateTime createdAt();

    @Column(name = "updated_at")
    @Nullable
    LocalDateTime updatedAt();

    @ManyToOne
    @Nullable
    User user();

    @ManyToOne
    @Nullable
    Categories categories();
}
