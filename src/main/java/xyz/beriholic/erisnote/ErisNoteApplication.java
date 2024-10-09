package xyz.beriholic.erisnote;

import org.babyfish.jimmer.client.EnableImplicitApi;
import org.babyfish.jimmer.sql.EnableDtoGeneration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableImplicitApi
@EnableDtoGeneration
public class ErisNoteApplication {
    public static void main(String[] args) {
        SpringApplication.run(ErisNoteApplication.class, args);
    }
}
