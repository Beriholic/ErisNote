package xyz.beriholic.erisnote;

import org.babyfish.jimmer.client.EnableImplicitApi;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableImplicitApi
public class ErisNoteApplication {
    public static void main(String[] args) {
        SpringApplication.run(ErisNoteApplication.class, args);
    }
}
