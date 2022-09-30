--创建用户表
CREATE TABLE `blog`.`users` (
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `gender` VARCHAR(50) NOT NULL,
  `birthday` DATE NOT NULL,
  PRIMARY KEY (`username`));
