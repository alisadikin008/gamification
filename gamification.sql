# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.29)
# Database: gamification
# Generation Time: 2021-03-04 01:50:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Attachments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Attachments`;

CREATE TABLE `Attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Attachments` WRITE;
/*!40000 ALTER TABLE `Attachments` DISABLE KEYS */;

INSERT INTO `Attachments` (`id`, `file`, `status`, `createdAt`, `updatedAt`)
VALUES
	(1,'selfie_photo_with_product.png','true','2021-03-03 22:01:09','2021-03-03 22:01:09'),
	(2,'selfie_photo_with_product2.png','true','2021-03-04 01:14:11','2021-03-04 01:14:11');

/*!40000 ALTER TABLE `Attachments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CampaignAttachments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CampaignAttachments`;

CREATE TABLE `CampaignAttachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerId` int(11) DEFAULT NULL,
  `campaignId` int(11) DEFAULT NULL,
  `attachmentId` int(11) DEFAULT NULL,
  `voucherId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `CampaignAttachments` WRITE;
/*!40000 ALTER TABLE `CampaignAttachments` DISABLE KEYS */;

INSERT INTO `CampaignAttachments` (`id`, `customerId`, `campaignId`, `attachmentId`, `voucherId`, `createdAt`, `updatedAt`)
VALUES
	(1,1,1,1,1,'2021-03-03 21:58:47','2021-03-03 21:58:47'),
	(2,2,1,2,2,'2021-03-04 01:14:38','2021-03-04 01:14:38');

/*!40000 ALTER TABLE `CampaignAttachments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Campaigns
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Campaigns`;

CREATE TABLE `Campaigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `closedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Campaigns` WRITE;
/*!40000 ALTER TABLE `Campaigns` DISABLE KEYS */;

INSERT INTO `Campaigns` (`id`, `name`, `url`, `closedAt`, `createdAt`, `updatedAt`)
VALUES
	(1,'Anniversary of Company','https://anniversary.info/event/anniversary','2021-04-03 13:31:58','2021-03-03 21:59:51','2021-03-03 21:59:51');

/*!40000 ALTER TABLE `Campaigns` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `contactNumber` varchar(255) DEFAULT NULL,
  `dateOfBirth` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;

INSERT INTO `Customers` (`id`, `firstName`, `lastName`, `email`, `password`, `gender`, `contactNumber`, `dateOfBirth`, `createdAt`, `updatedAt`)
VALUES
	(1,'Nicholas','Anelka','nicholas@anelka.me','$2a$10$4Bx8ehJ/CP.Z/VSl9DyiGel7x2QFDobSbWvl.mDtcYZ3JVro8x/9e','Male','081234567','2021-12-30','2021-03-03 21:59:15','2021-03-03 21:59:15'),
	(2,'Nicholas','Anelka','nicholas@anelka.com','$2a$10$ijbs6o7.nQkbkaiCst4m2ORVB1ByxY2mTmD8lHnxZyLQwkyed423G','Male','081234567','2021-12-30','2021-03-04 01:12:43','2021-03-04 01:12:43');

/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table SequelizeMeta
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SequelizeMeta`;

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;

INSERT INTO `SequelizeMeta` (`name`)
VALUES
	('20210303174038-create-customer.js'),
	('20210303175551-create-transaction.js'),
	('20210303175859-create-campaign.js'),
	('20210303180104-create-voucher.js'),
	('20210303180235-create-attachment.js'),
	('20210303214422-create-campaign-attachment.js');

/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Transactions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Transactions`;

CREATE TABLE `Transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerId` int(11) DEFAULT NULL,
  `totalSpent` decimal(10,0) DEFAULT NULL,
  `totalSaving` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;

INSERT INTO `Transactions` (`id`, `customerId`, `totalSpent`, `totalSaving`, `createdAt`, `updatedAt`)
VALUES
	(1,1,100,4,'2021-03-03 21:59:31','2021-03-03 21:59:31'),
	(2,2,200,7,'2021-03-04 01:13:12','2021-03-04 01:13:12');

/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Vouchers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Vouchers`;

CREATE TABLE `Vouchers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campaignId` int(11) DEFAULT NULL,
  `voucherCode` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Vouchers` WRITE;
/*!40000 ALTER TABLE `Vouchers` DISABLE KEYS */;

INSERT INTO `Vouchers` (`id`, `campaignId`, `voucherCode`, `status`, `createdAt`, `updatedAt`)
VALUES
	(1,1,'ABC123','open','2021-03-03 21:59:42','2021-03-03 21:59:42'),
	(2,1,'ABC234','open','2021-03-03 21:59:42','2021-03-03 21:59:42'),
	(3,1,'ABC...','open','2021-03-03 21:59:42','2021-03-03 21:59:42'),
	(4,1,'ABC345','locked','2021-03-03 21:59:42','2021-03-04 00:02:18');

/*!40000 ALTER TABLE `Vouchers` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
