DROP DATABASE IF EXISTS Customer_Reviews;

CREATE DATABASE Customer_Reviews;

USE Customer_Reviews;

CREATE TABLE deals (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(100) NOT NULL,
  reviews_count int NOT NULL,
  top_reviewer int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  deals_id int NOT NULL,
  user_id int NOT NULL,
  reviews_score smallint NOT NULL,
  review_text varchar (2000),
  review_date datetime NOT NULL,
  relevancy_score int NOT NULL,
  helpful_score int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY deals_id REFERENCES deals(id),
  FOREIGN KEY user_id REFERENCES users(id)
);

