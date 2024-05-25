DROP SCHEMA IF EXISTS pandoara;
CREATE DATABASE pandora;

USE pandora;

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS refresh_tokens;
DROP TABLE IF EXISTS users;



CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);


CREATE TABLE POSTS (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title text,
	content text,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE REFRESH_TOKENS (
	id INT PRIMARY KEY AUTO_INCREMENT,
	token text NOT NULL
);



select * from users;


select * from posts join users on users.id = posts.user_id;
