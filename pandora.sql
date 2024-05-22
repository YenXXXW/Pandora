DROP SCHEMA IF EXISTS pandoara;
CREATE DATABASE pandora;

drop table user;

use pandora;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);


CREATE TABLE POST (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title text,
	content text,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

select * from users;

insert into users values (null, 'yan', 'yab@gmail.com', 'yan12'); 
