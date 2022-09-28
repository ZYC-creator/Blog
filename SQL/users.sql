--创建用户表
CREATE TABLE `blog`.`users` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `gengder` TINYINT NULL,
  `birthday` DATETIME NULL,
  `userscol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
