/*
SQLyog Community Edition- MySQL GUI v7.01 
MySQL - 5.0.27-community-nt : Database - ridesharing
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`ridesharing` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `ridesharing`;

/*Table structure for table `ridepayment` */

DROP TABLE IF EXISTS `ridepayment`;

CREATE TABLE `ridepayment` (
  `id` int(255) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `rider` varchar(255) default NULL,
  `ride` varchar(255) default NULL,
  `amount` varchar(255) default NULL,
  `transactionid` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ridepayment` */

insert  into `ridepayment`(`id`,`username`,`rider`,`ride`,`amount`,`transactionid`) values (1,'prathmesh','kishori','Vashi|Airoli','500','txn_3Ofj6u2eZvKYlo2C11Qpr5k3'),(2,'prathmesh mane','kishori','Sanpada|Vikhroli','850','txn_3OfjCO2eZvKYlo2C1tJ5R59k');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
