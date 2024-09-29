plugins {
    java
    id("org.springframework.boot") version "3.3.3"
    id("io.spring.dependency-management") version "1.1.6"
}

group = "xyz.beriholic"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("cn.dev33:sa-token-spring-boot3-starter:1.39.0")
    implementation("cn.dev33:sa-token-redis:1.39.0")
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.apache.commons:commons-pool2")

    implementation("cn.hutool:hutool-all:5.8.25")
    implementation("io.springfox:springfox-boot-starter:3.0.0")
    compileOnly("org.projectlombok:lombok")
    runtimeOnly("mysql:mysql-connector-java:8.0.30")
    annotationProcessor("org.projectlombok:lombok")


    implementation("org.babyfish.jimmer:jimmer-spring-boot-starter:latest.release")

    annotationProcessor("org.babyfish.jimmer:jimmer-apt:latest.release")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
