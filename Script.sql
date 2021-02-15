CREATE DATABASE `api`;

-- Api.Users definition
CREATE TABLE `users` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Role` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- api.ps_token definition
CREATE TABLE `ps_token` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(200) NOT NULL DEFAULT '0',
  `used` tinytext NOT NULL DEFAULT '0',
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK1` (`user_id`),
  CONSTRAINT `FK1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- admin@123
INSERT INTO api.users
(Nome, Email, Password, `Role`)
VALUES('admin', 'admin@admin.com', '$2b$10$PHypY2/hRYh1hcFUyKCkYOd8LplHkqr54ygW9ND/2T.QvDeiBV9gi', 1);
