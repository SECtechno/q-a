
-- mysql -u root < /schema.sql

DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

USE qa;

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);


-- ---
-- Table 'users'
--
-- ---

-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users (
--   id INTEGER NOT NULL AUTO_INCREMENT,
--   name VARCHAR(50) NOT NULL,
--   email VARCHAR(70) NOT NULL,
--   PRIMARY KEY (id)
-- );



-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id INTEGER NOT NULL AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  date DATE NOT NULL,
  asker_name VARCHAR(30),
  asker_email VARCHAR(70),
  reported TINYINT(1) NOT NULL DEFAULT 0,
  helpful INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id INTEGER NOT NULL AUTO_INCREMENT,
  question_id INTEGER,
  body TEXT NOT NULL,
  date DATE NOT NULL,
  answerer_name VARCHAR(30),
  answerer_email VARCHAR(30),
  reported TINYINT(1) NOT NULL DEFAULT 0,
  helpful INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  photo_id INTEGER NOT NULL,
  answer_id INTEGER NOT NULL,
  photo_url TEXT NOT NULL,
  PRIMARY KEY (photo_id)
);



-- ---
-- Foreign Keys
-- ---

ALTER TABLE `questions` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `questions` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `answers` ADD FOREIGN KEY (question_id) REFERENCES `questions` (`id`);
-- ALTER TABLE `answers` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (answer_id) REFERENCES `answers` (`id`);

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `questions` (`id`,`product_id`,`question_body`,`date`,`user_id`,`question_helpfulness`,`reported_flag`) VALUES
-- ('','','','','','','');
-- INSERT INTO `answers` (`id`,`question_id`,`answer_body`,`date`,`user_id`,`answer_helpfulness`,`reported_flag`) VALUES
-- ('','','','','','','');
-- INSERT INTO `photos` (`photo_id`,`answer_id`,`photo_url`) VALUES
-- ('','','');
-- INSERT INTO `users` (`id`,`name`,`email`) VALUES
-- ('','','');