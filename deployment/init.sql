DROP TABLE IF EXISTS tb_user;
CREATE TABLE tb_user
(
    id       BIGINT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)        NOT NULL,
    INDEX (username)
);


DROP TABLE IF EXISTS tb_categories;
CREATE TABLE tb_categories
(
    id      BIGINT PRIMARY KEY,
    user_id BIGINT,
    name    VARCHAR(255) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES tb_user (id)
);

DROP TABLE IF EXISTS tb_note;
CREATE TABLE tb_note
(
    id            BIGINT PRIMARY KEY,
    user_id       BIGINT,
    categories_id BIGINT,
    title         VARCHAR(255) NOT NULL,
    content       LONGTEXT     NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


    FOREIGN KEY (user_id) REFERENCES tb_user (id),
    FOREIGN KEY (categories_id) REFERENCES tb_categories (id)
)
