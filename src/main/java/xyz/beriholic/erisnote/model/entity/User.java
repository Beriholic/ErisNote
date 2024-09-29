package xyz.beriholic.erisnote.model.entity;

import org.babyfish.jimmer.jackson.JsonConverter;
import org.babyfish.jimmer.jackson.LongToStringConverter;
import org.babyfish.jimmer.sql.*;
import xyz.beriholic.erisnote.utils.SnowFlakeID;

import java.util.List;


@Entity
@Table(name = "tb_user")
public interface User {

    @Id
    @GeneratedValue(generatorType = SnowFlakeID.class)
    @JsonConverter(LongToStringConverter.class)
    long id();

    @Key
    String username();

    String password();

    @OneToMany(mappedBy = "user")
    List<Categories> categories();

    @OneToMany(mappedBy = "user")
    List<Note> notes();
}
