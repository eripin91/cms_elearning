CREATE TABLE `admin_access_tab` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `groupid` int(4) unsigned NOT NULL,
  `permissionid` int(10) DEFAULT NULL,
  `access` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `admin_groups_tab` (
  `groupid` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `status` int(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`groupid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `admin_permission_tab` (
  `permissionid` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `desc` varchar(150) DEFAULT NULL,
  `url` varchar(45) DEFAULT NULL,
  `parent` int(10) DEFAULT NULL,
  PRIMARY KEY (`permissionid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `admin_tab` (
  `adminid` int(10) NOT NULL AUTO_INCREMENT,
  `groupid` int(10) DEFAULT NULL,
  `nick` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `salt` varchar(50) NOT NULL,
  `lastlogin` varchar(30) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`adminid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
