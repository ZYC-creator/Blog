--创建文章表
CREATE TABLE `blog`.`article` (
  `author` VARCHAR(50) NOT NULL,
  `title` VARCHAR(50) NULL,
  `content` LONGTEXT NULL,
  `category` VARCHAR(50) NULL,
  `createtime` DATE NULL,
  `updatetime` DATE NULL,
  `views` INT NULL,
  PRIMARY KEY (`author`));
