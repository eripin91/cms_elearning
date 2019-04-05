-- MySQL dump 10.16  Distrib 10.1.36-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: elearning_db
-- ------------------------------------------------------
-- Server version	10.1.36-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assessment_detail_tab`
--

DROP TABLE IF EXISTS `assessment_detail_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assessment_detail_tab` (
  `detailid` int(10) NOT NULL AUTO_INCREMENT,
  `assessmentid` int(10) NOT NULL,
  `question_type` enum('single-choice','essay') NOT NULL DEFAULT 'single-choice',
  `question` varchar(350) NOT NULL,
  `options` text NOT NULL,
  `answer` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`detailid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_detail_tab`
--

LOCK TABLES `assessment_detail_tab` WRITE;
/*!40000 ALTER TABLE `assessment_detail_tab` DISABLE KEYS */;
INSERT INTO `assessment_detail_tab` VALUES (1,1,'single-choice','This will create a symlink named react-relay/node_modules/react that links to your local copy of the react project.','[ \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 1,\n        \"label\" : \"Risky\"\n    }, \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 2,\n        \"label\" : \"Danang\"\n    }, \n    {\n        \"isAnswer\" : true,\n        \"_id\" : 3,\n        \"label\" : \"Bram\"\n    }, \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 5,\n        \"label\" : \"Bang Sastra\"\n    }\n]','1',1,'2019-01-19 00:00:00','2019-01-19 00:00:00'),(2,1,'single-choice','To reverse this process, simply use yarn unlink or yarn unlink [package]. Also see','[ \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 1,\n        \"label\" : \"Risky\"\n    }, \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 2,\n        \"label\" : \"Danang\"\n    }, \n    {\n        \"isAnswer\" : true,\n        \"_id\" : 3,\n        \"label\" : \"Bram\"\n    }, \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 5,\n        \"label\" : \"Bang Sastra\"\n    }\n]','1',1,'2019-01-19 00:00:00','2019-01-19 00:00:00'),(3,1,'essay','Symlink a package folder during development.','','',1,'2019-01-19 00:00:00','2019-01-19 00:00:00');
/*!40000 ALTER TABLE `assessment_detail_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessment_tab`
--

DROP TABLE IF EXISTS `assessment_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assessment_tab` (
  `assessmentid` int(10) NOT NULL AUTO_INCREMENT,
  `parentid` int(10) NOT NULL,
  `title` varchar(150) NOT NULL,
  `duration` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`assessmentid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_tab`
--

LOCK TABLES `assessment_tab` WRITE;
/*!40000 ALTER TABLE `assessment_tab` DISABLE KEYS */;
INSERT INTO `assessment_tab` VALUES (1,1,'NodeJS',600,1,'2019-01-19 00:00:00','2019-01-19 00:00:00');
/*!40000 ALTER TABLE `assessment_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes_tab`
--

DROP TABLE IF EXISTS `classes_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes_tab` (
  `classid` int(11) NOT NULL,
  `guruid` int(10) NOT NULL DEFAULT '0',
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `cover` varchar(300) NOT NULL,
  `priority` int(11) NOT NULL,
  `rating` double(10,1) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes_tab`
--

LOCK TABLES `classes_tab` WRITE;
/*!40000 ALTER TABLE `classes_tab` DISABLE KEYS */;
INSERT INTO `classes_tab` VALUES (1,1,'Belajar Memahami Kamu','Untuk orang yang jomblo abadi','https://i.pinimg.com/236x/2c/04/99/2c0499d83c2fc09957adc5100d08df1e--kata-kata-lucu-gambar.jpg',5,NULL,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(2,1,'Express in an hour','Cara Express buat jago Express','https://cdn.lynda.com/course/612195/612195-636458390742664213-16x9.jpg',10,1.2,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(3,4,'Menjadi Capres Idola','Bagaimana menjadi presiden yang dipilih oleh internet','http://cdn2.tstatic.net/kaltim/foto/bank/images/kompas-tv-nurhadi-aldo-rosi.jpg',2,NULL,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(4,4,'Menjadi Capres Idola Jilid 2','Bagaimana menjadi presiden yang dipilih oleh internet','http://cdn2.tstatic.net/kaltim/foto/bank/images/kompas-tv-nurhadi-aldo-rosi.jpg',5,NULL,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(5,3,'Menyanyi Tanpa Suara Bagus','Yang Penting Mukaku Cantik','https://awsimages.detik.net.id/community/media/visual/2018/05/02/cbecadbe-4946-49ea-932d-a6f2c0fc692a_43.jpeg?w=780&q=90',4,NULL,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(6,3,'Menyanyi Tanpa Suara Bagus Jili 2','Ya ga mungkinlah suara jelek jadi penyanyi','https://3.bp.blogspot.com/-_SEglsqFXEQ/VzlJ4I2-O6I/AAAAAAAAA9E/XSfXHh-iUjA45SFEySq5F4sk5P0c91zUwCLcB/s640/nyanyikamarmandi2.jpg',1,NULL,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(7,2,'Ternak lele sampai ke mars','Bersama Elon Musk ingin ke mars untuk membuat kolam lele','https://1.bp.blogspot.com/-5Kmw6DbdES4/Wg_gbErmEiI/AAAAAAAAJhA/UrKCS0aXu8IKc6Ge1ppsOEIDyLRR7rJ6gCLcBGAs/s1600/Umpan%2Bikan%2Blele.jpg',8,NULL,1,'2019-01-31 00:00:00','2019-01-31 00:00:00');
/*!40000 ALTER TABLE `classes_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses_detail_tab`
--

DROP TABLE IF EXISTS `courses_detail_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses_detail_tab` (
  `detailid` int(11) NOT NULL AUTO_INCREMENT,
  `courseid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `assesmentid` int(10) DEFAULT '0',
  PRIMARY KEY (`detailid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses_detail_tab`
--

LOCK TABLES `courses_detail_tab` WRITE;
/*!40000 ALTER TABLE `courses_detail_tab` DISABLE KEYS */;
INSERT INTO `courses_detail_tab` VALUES (1,1,'BAB 1',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(2,1,'BAB 2',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(3,1,'BAB 3',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(4,1,'BAB 4',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(5,1,'BAB 5',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(6,1,'BAB 6',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(7,1,'BAB 7',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(8,1,'BAB 8',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(9,1,'BAB 9',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(10,2,'BAB 1',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(11,2,'BAB 2',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(12,2,'BAB 3',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(13,2,'BAB 4',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(14,2,'BAB 5',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(15,2,'BAB 6',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(16,2,'BAB 7',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(17,2,'BAB 8',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(18,2,'BAB 9',1,'2019-01-31 00:00:00','2019-01-31 00:00:00',0),(19,3,'BAB 1',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0),(20,3,'BAB 2',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0),(21,3,'BAB 3',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0),(22,3,'BAB 4',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0),(23,3,'BAB 5',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0),(24,3,'BAB 6',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0),(25,3,'BAB 7',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0),(26,3,'BAB 8',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0),(27,3,'BAB 9',1,'2019-01-31 03:12:54','2019-01-31 03:12:54',0);
/*!40000 ALTER TABLE `courses_detail_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses_material_tab`
--

DROP TABLE IF EXISTS `courses_material_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses_material_tab` (
  `materialid` int(10) NOT NULL AUTO_INCREMENT,
  `detailid` int(10) NOT NULL,
  `assessmentid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(350) NOT NULL,
  `video_url` varchar(300) NOT NULL,
  `thumbnails` text NOT NULL,
  `size` int(10) NOT NULL DEFAULT '0',
  `duration` int(10) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`materialid`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses_material_tab`
--

LOCK TABLES `courses_material_tab` WRITE;
/*!40000 ALTER TABLE `courses_material_tab` DISABLE KEYS */;
INSERT INTO `courses_material_tab` VALUES (1,1,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVdkYThYbAuDeQU5NAFB7qjdzpgpAAFa5dHIqxdjE171PIxoC',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(2,1,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVdkYThYbAuDeQU5NAFB7qjdzpgpAAFa5dHIqxdjE171PIxoC',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(3,1,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVdkYThYbAuDeQU5NAFB7qjdzpgpAAFa5dHIqxdjE171PIxoC',90,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(4,1,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVdkYThYbAuDeQU5NAFB7qjdzpgpAAFa5dHIqxdjE171PIxoC',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(5,2,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(6,2,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(7,2,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(8,2,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(9,2,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(10,3,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(11,3,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(12,3,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(13,3,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(14,3,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(15,3,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(16,3,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(17,4,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(18,4,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(19,4,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(20,4,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(21,4,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(22,4,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(23,4,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(24,4,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(25,5,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(26,5,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(27,5,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(28,5,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(29,5,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(30,5,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(31,5,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(32,6,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(33,6,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(34,6,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(35,6,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(36,6,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(37,6,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(38,7,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(39,7,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(40,7,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(41,7,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(42,7,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(43,7,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(44,8,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(45,8,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(46,8,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(47,8,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(48,9,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(49,9,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(50,9,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(51,10,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://4.bp.blogspot.com/-NgGxbqLacz4/UhLHuXGMZ_I/AAAAAAAA7EI/2tZ54aPKPdM/s1600/rambut1.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(52,10,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://4.bp.blogspot.com/-NgGxbqLacz4/UhLHuXGMZ_I/AAAAAAAA7EI/2tZ54aPKPdM/s1600/rambut1.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(53,10,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://4.bp.blogspot.com/-NgGxbqLacz4/UhLHuXGMZ_I/AAAAAAAA7EI/2tZ54aPKPdM/s1600/rambut1.jpg',90,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(54,10,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://4.bp.blogspot.com/-NgGxbqLacz4/UhLHuXGMZ_I/AAAAAAAA7EI/2tZ54aPKPdM/s1600/rambut1.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(55,11,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(56,11,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(57,11,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(58,11,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(59,11,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(60,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(61,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(62,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(63,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(64,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(65,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(66,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(67,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(68,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(69,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(70,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(71,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(72,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(73,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(74,12,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(75,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(76,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(77,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(78,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(79,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(80,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(81,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(82,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(83,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(84,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(85,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(86,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(87,13,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(88,14,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(89,14,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(90,14,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(91,14,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(92,14,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(93,14,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(94,15,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(95,15,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(96,15,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(97,15,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(98,16,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(99,16,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(100,16,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(151,17,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(152,17,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(153,17,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',90,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(154,17,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(155,18,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(156,18,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(157,18,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(158,18,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(159,18,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(160,18,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(161,19,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(162,19,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(163,19,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(164,19,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(165,19,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(166,19,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(167,19,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(168,19,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(169,20,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(170,20,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(171,20,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(172,20,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(173,20,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(174,21,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(175,21,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(176,21,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(177,21,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(178,21,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(179,22,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(180,22,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(181,22,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(182,22,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(183,22,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(184,22,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(185,23,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(186,23,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(187,23,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(188,23,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(189,23,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(190,23,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(191,23,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(192,24,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(193,24,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(194,24,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(195,24,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(196,24,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(197,25,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(198,25,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(199,25,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(200,25,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(201,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(202,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(203,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(204,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(205,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(206,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(207,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(208,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(209,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(210,26,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(211,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(212,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(213,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(214,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(215,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(216,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(217,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(218,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(219,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(220,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(221,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(222,27,0,'Video Materi','Materinya Susah Banget Bro','https://www.youtube.com/watch?v=1XW1Ygatsz4','http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg',0,115,1,'2019-01-31 00:00:00','2019-01-31 00:00:00');
/*!40000 ALTER TABLE `courses_material_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses_tab`
--

DROP TABLE IF EXISTS `courses_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses_tab` (
  `courseid` int(10) NOT NULL AUTO_INCREMENT,
  `classid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `preassessmentid` int(10) NOT NULL,
  `finalassessmentid` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`courseid`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses_tab`
--

LOCK TABLES `courses_tab` WRITE;
/*!40000 ALTER TABLE `courses_tab` DISABLE KEYS */;
INSERT INTO `courses_tab` VALUES (1,2,'Express in an hour',0,0,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(2,3,'React Native Crash Course',0,0,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(3,4,'Fullstack Laravel and React Native',0,0,1,'2019-01-31 00:00:00','2019-01-31 00:00:00');
/*!40000 ALTER TABLE `courses_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_likes_tab`
--

DROP TABLE IF EXISTS `discussion_likes_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discussion_likes_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `discussionid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_likes_tab`
--

LOCK TABLES `discussion_likes_tab` WRITE;
/*!40000 ALTER TABLE `discussion_likes_tab` DISABLE KEYS */;
INSERT INTO `discussion_likes_tab` VALUES (1,6,3,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(2,6,2,1,'2019-01-31 00:00:00','2019-01-23 13:23:00'),(3,8,1,1,'2019-01-23 12:43:35','2019-01-23 12:43:35'),(4,6,4,1,'2019-01-24 12:43:15','2019-02-06 02:50:45'),(5,17,1,1,'2019-01-24 13:20:20','2019-01-24 13:20:20'),(6,11,1,1,'2019-02-01 07:16:38','2019-02-06 06:09:23'),(7,16,2,1,'2019-02-06 06:08:33','2019-02-06 07:14:28'),(8,16,3,1,'2019-02-06 06:09:13','2019-02-06 06:09:23'),(14,7,2,1,'2019-02-06 07:15:18','2019-02-06 07:15:18'),(15,37,2,1,'2019-02-06 07:18:04','2019-02-06 07:18:04');
/*!40000 ALTER TABLE `discussion_likes_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_tab`
--

DROP TABLE IF EXISTS `discussion_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discussion_tab` (
  `discussionid` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `courseid` int(11) DEFAULT NULL,
  `post_title` varchar(150) NOT NULL,
  `post_content` text NOT NULL,
  `parent` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`discussionid`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_tab`
--

LOCK TABLES `discussion_tab` WRITE;
/*!40000 ALTER TABLE `discussion_tab` DISABLE KEYS */;
INSERT INTO `discussion_tab` VALUES (6,1,2,'','Ini gimana nih ?',0,1,'2019-01-22 12:42:43','2019-01-22 12:42:43'),(7,2,2,'','Biar kaya gini gimana nih caranya gan ?',0,1,'2019-01-22 13:11:43','2019-01-22 13:11:43'),(8,1,NULL,'','Jadi jawabannya gini bro',6,1,'2019-01-22 14:11:43','2019-01-22 14:11:43'),(9,3,NULL,'','Jadi jawabannya gitu bro, ngerti kgk',6,1,'2019-01-22 14:13:25','2019-01-22 14:13:25'),(10,3,NULL,'','Jadi jawabannya gitu bro, ngerti kgk',7,1,'2019-01-22 14:26:55','2019-01-22 14:26:55'),(11,1,2,'','Jadi saya bingungnya gini gan',0,1,'2019-01-23 10:48:58','2019-01-23 10:48:58'),(12,2,NULL,'','Jadi jawabannya ada banyak bro, mw yang mana ?',11,1,'2019-01-23 10:53:21','2019-01-23 10:53:21'),(13,4,2,'','Ini yang bener gimana gan ?',0,1,'2019-01-24 12:43:58','2019-01-24 12:43:58'),(14,2,NULL,'','Jadi salahnya disini gan ',13,1,'2019-01-24 12:44:28','2019-01-24 12:44:28'),(15,2,NULL,'','bangsat lu',6,1,'2019-01-24 13:16:10','2019-01-24 13:16:10'),(16,4,2,'','Cara Buat Game gimana ya?',0,1,'2019-01-24 13:18:28','2019-01-24 13:18:28'),(17,1,2,'','Cara Buat Game gimana ya?',0,1,'2019-01-24 13:18:38','2019-01-24 13:18:38'),(18,2,NULL,'','Game Apaan Gan?',17,1,'2019-01-24 13:19:29','2019-01-24 13:19:29'),(19,2,NULL,'','Game Ganteng',17,1,'2019-01-24 13:48:46','2019-01-24 13:48:46'),(20,4,3,'','Ini yang bener gimana gan ?',0,1,'2019-01-29 08:42:20','2019-01-29 08:42:20'),(21,3,2,'','Ini yang bener gimana gan ya ?',0,1,'2019-01-30 03:39:20','2019-01-30 03:39:20'),(22,2,NULL,'','Jadi salahnya disini gan, yg bener gini jadinya',21,1,'2019-01-30 03:39:45','2019-01-30 03:39:45'),(23,3,2,'','Apa itu JSX?',0,1,'2019-01-31 06:34:14','2019-01-31 06:34:14'),(24,3,2,'','Apa itu JSX? 2',0,1,'2019-01-31 07:19:01','2019-01-31 07:19:01'),(25,1,2,'','Apa itu JSX? 2',0,1,'2019-01-31 07:19:32','2019-01-31 07:19:32'),(26,1,2,'','hello there - TF',0,1,'2019-01-31 07:20:46','2019-01-31 07:20:46'),(27,1,2,'','Create via Postman #1',0,1,'2019-01-31 07:29:16','2019-01-31 07:29:16'),(28,1,2,'','Create via Postman #2',0,1,'2019-01-31 07:35:10','2019-01-31 07:35:10'),(29,4,2,'',' Saya bingung nih gan, jadi gini.....',0,1,'2019-01-31 07:35:51','2019-01-31 07:35:51'),(30,4,3,'',' Saya bingung nih gan, jadi gini.....',0,1,'2019-01-31 07:36:51','2019-01-31 07:36:51'),(31,1,2,'','Create via Postman #3',0,1,'2019-01-31 07:55:31','2019-01-31 07:55:31'),(32,1,2,'','Create via Postman #4',0,1,'2019-01-31 08:08:36','2019-01-31 08:08:36'),(33,1,2,'','Create via Postman #5',0,1,'2019-01-31 09:35:40','2019-01-31 09:35:40'),(34,1,2,'','Create via Postman #6',0,1,'2019-02-01 02:20:03','2019-02-01 02:20:03'),(35,2,2,'','Android #1',0,1,'2019-02-01 02:43:55','2019-02-01 02:43:55'),(36,2,2,'','Android #2',0,1,'2019-02-01 02:45:45','2019-02-01 02:45:45'),(37,1,2,'','Create via Postman #7',0,1,'2019-02-01 02:49:35','2019-02-01 02:49:35'),(38,2,NULL,'','Jadi salahnya disini gan, yg bener gini jadinya',11,1,'2019-02-01 06:57:14','2019-02-01 06:57:14'),(39,3,NULL,'','Jadi salahnya disini gan, yg bener gini jadinya',11,1,'2019-02-01 06:57:58','2019-02-01 06:57:58'),(40,3,NULL,'','Jadi salahnya disini gan, yg bener gini jadinya',11,1,'2019-02-01 07:01:27','2019-02-01 07:01:27'),(41,3,NULL,'','Jadi salahnya disini gan, yg bener gini jadinya #1',11,1,'2019-02-01 07:01:32','2019-02-01 07:01:32'),(42,3,NULL,'','Jadi salahnya disini gan, yg bener gini jadinya #2',11,1,'2019-02-01 07:01:38','2019-02-01 07:01:38'),(43,3,NULL,'','Android #1',11,1,'2019-02-01 07:04:57','2019-02-01 07:04:57'),(44,3,NULL,'','Jadi salahnya disini gan, yg bener gini jadinya #3',11,1,'2019-02-01 07:07:36','2019-02-01 07:07:36'),(45,2,NULL,'','Jadi salahnya disini gan ',6,1,'2019-02-06 04:15:29','2019-02-06 04:15:29');
/*!40000 ALTER TABLE `discussion_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guru_tab`
--

DROP TABLE IF EXISTS `guru_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guru_tab` (
  `guruid` int(10) NOT NULL,
  `fullname` varchar(150) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guru_tab`
--

LOCK TABLES `guru_tab` WRITE;
/*!40000 ALTER TABLE `guru_tab` DISABLE KEYS */;
INSERT INTO `guru_tab` VALUES (1,'Arham Awal','https://avatars2.githubusercontent.com/u/18678301?s=460&v=4','Guru tampan',1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(2,'Ageng Kurnia','https://media.suara.com/pictures/653x366/2017/05/30/75225-ageng-kiwi.jpg','Guru Mantap Jiwa',1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(3,'Andira Kuswono','https://i1.sndcdn.com/artworks-000159652494-l3qfj7-t500x500.jpg','Guru Idola',1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(4,'Nurhadi Aldo','https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png','Guru Panutan',1,'2019-01-31 00:00:00','2019-01-31 00:00:00');
/*!40000 ALTER TABLE `guru_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_tab`
--

DROP TABLE IF EXISTS `notification_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_tab` (
  `notificationid` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `message` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`notificationid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_tab`
--

LOCK TABLES `notification_tab` WRITE;
/*!40000 ALTER TABLE `notification_tab` DISABLE KEYS */;
INSERT INTO `notification_tab` VALUES (3,1,'Selamat anda telah menyelesaikan semua materi BAB 1 pada class Express in an hour',1,'2019-02-04 11:19:22','2019-02-04 11:19:22');
/*!40000 ALTER TABLE `notification_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_assessment_tab`
--

DROP TABLE IF EXISTS `users_assessment_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_assessment_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `detailassessmentid` int(10) NOT NULL,
  `parentid` int(10) NOT NULL,
  `answer` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_assessment_tab`
--

LOCK TABLES `users_assessment_tab` WRITE;
/*!40000 ALTER TABLE `users_assessment_tab` DISABLE KEYS */;
INSERT INTO `users_assessment_tab` VALUES (1,1,1,1,'2',0,1,'2019-02-06 04:59:33','2019-02-06 05:01:57');
/*!40000 ALTER TABLE `users_assessment_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_classes_tab`
--

DROP TABLE IF EXISTS `users_classes_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_classes_tab` (
  `id` int(11) NOT NULL,
  `userid` int(10) NOT NULL,
  `classid` int(10) NOT NULL,
  `score` int(10) NOT NULL DEFAULT '0',
  `finished_at` datetime NOT NULL,
  `is_completed` tinyint(1) DEFAULT NULL,
  `certificate` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_classes_tab`
--

LOCK TABLES `users_classes_tab` WRITE;
/*!40000 ALTER TABLE `users_classes_tab` DISABLE KEYS */;
INSERT INTO `users_classes_tab` VALUES (1,1,2,0,'2019-01-02 00:00:00',0,'Selamat',0,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(2,1,3,0,'2019-01-02 00:00:00',0,'Selamat',0,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(3,2,5,0,'2019-01-02 00:00:00',1,'Selamat',1,'2019-01-31 00:00:00','2019-01-17 00:00:00'),(4,3,4,0,'2019-01-02 00:00:00',1,'Selamat',1,'2019-01-31 00:00:00','2019-01-17 00:00:00'),(5,3,6,0,'2019-01-02 00:00:00',1,'Selamat',1,'2019-01-31 00:00:00','2019-01-17 00:00:00'),(6,2,2,0,'2019-01-31 00:00:00',1,'Selamat',1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(7,3,2,0,'2019-01-31 00:00:00',1,'Selamat',1,'2019-01-31 00:00:00','2019-01-31 00:00:00');
/*!40000 ALTER TABLE `users_classes_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_course_detail_tab`
--

DROP TABLE IF EXISTS `users_course_detail_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_course_detail_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) DEFAULT NULL,
  `detailid` int(10) DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_done_watching` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_course_detail_tab`
--

LOCK TABLES `users_course_detail_tab` WRITE;
/*!40000 ALTER TABLE `users_course_detail_tab` DISABLE KEYS */;
INSERT INTO `users_course_detail_tab` VALUES (15,1,1,1,'2019-01-31 17:09:09','2019-01-31 17:09:09',1),(16,1,2,1,'2019-01-31 17:14:52','2019-01-31 17:14:52',1);
/*!40000 ALTER TABLE `users_course_detail_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_course_tab`
--

DROP TABLE IF EXISTS `users_course_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_course_tab` (
  `id` int(11) NOT NULL,
  `userid` int(10) DEFAULT NULL,
  `courseid` int(10) DEFAULT NULL,
  `babprogress` int(3) DEFAULT NULL,
  `babtotal` int(3) DEFAULT NULL,
  `is_completed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_course_tab`
--

LOCK TABLES `users_course_tab` WRITE;
/*!40000 ALTER TABLE `users_course_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_course_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_material_progress_tab`
--

DROP TABLE IF EXISTS `users_material_progress_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_material_progress_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `materialid` int(10) NOT NULL,
  `watchingduration` int(10) NOT NULL,
  `is_done_watching` tinyint(1) NOT NULL DEFAULT '0',
  `is_downloaded` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_material_progress_tab`
--

LOCK TABLES `users_material_progress_tab` WRITE;
/*!40000 ALTER TABLE `users_material_progress_tab` DISABLE KEYS */;
INSERT INTO `users_material_progress_tab` VALUES (1,1,1,90,1,1,1,'2019-01-29 03:45:49','2019-02-06 02:15:46'),(2,1,2,90,1,1,1,'2019-01-29 03:45:49','2019-02-01 10:25:11'),(3,1,3,90,1,1,1,'2019-01-29 03:45:49','2019-01-29 03:45:49'),(4,1,4,90,1,1,1,'2019-01-29 03:45:49','2019-01-31 16:49:44'),(5,1,7,0,1,1,1,'2019-01-29 13:19:51','2019-02-01 09:50:21'),(6,1,5,0,1,0,1,'2019-01-31 17:14:44','2019-01-31 17:14:44'),(7,1,6,0,1,0,1,'2019-01-31 17:14:48','2019-01-31 17:16:15'),(8,1,8,0,1,0,1,'2019-01-31 17:14:50','2019-01-31 17:14:50'),(9,1,9,0,1,0,1,'2019-01-31 17:14:52','2019-02-01 10:25:44'),(10,1,10,0,1,0,1,'2019-02-01 10:26:47','2019-02-01 10:34:52'),(11,1,11,0,1,0,1,'2019-02-01 10:34:42','2019-02-01 10:34:56');
/*!40000 ALTER TABLE `users_material_progress_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_rating_tab`
--

DROP TABLE IF EXISTS `users_rating_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_rating_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `classid` int(10) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_rating_tab`
--

LOCK TABLES `users_rating_tab` WRITE;
/*!40000 ALTER TABLE `users_rating_tab` DISABLE KEYS */;
INSERT INTO `users_rating_tab` VALUES (1,1,2,5,1,'2019-01-31 00:00:00','2019-01-29 14:18:40'),(2,3,2,4,1,'2019-01-31 00:00:00','2019-01-29 14:16:51'),(5,2,2,3,1,'2019-01-29 14:17:07','2019-01-29 14:17:07'),(6,2,3,5,1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(7,2,2,5,1,'2019-02-01 03:59:05','2019-02-01 03:59:05'),(8,2,2,5,1,'2019-02-01 08:09:48','2019-02-01 08:09:48'),(9,2,2,5,1,'2019-02-01 08:09:54','2019-02-01 08:09:54'),(10,2,2,5,1,'2019-02-01 08:09:57','2019-02-01 08:09:57'),(11,2,2,5,1,'2019-02-01 08:09:58','2019-02-01 08:09:58'),(12,2,2,5,1,'2019-02-01 08:10:00','2019-02-01 08:10:00'),(13,2,2,5,1,'2019-02-01 08:10:06','2019-02-01 08:10:06'),(14,2,2,5,1,'2019-02-01 08:10:55','2019-02-01 08:10:55'),(15,2,2,5,1,'2019-02-01 08:10:56','2019-02-01 08:10:56'),(16,1,2,5,1,'2019-02-01 08:11:23','2019-02-01 08:11:23'),(17,1,2,5,1,'2019-02-01 08:11:26','2019-02-01 08:11:26'),(18,1,2,5,1,'2019-02-01 08:11:27','2019-02-01 08:11:27'),(19,3,2,5,1,'2019-02-01 08:11:31','2019-02-01 08:11:31'),(20,3,2,5,1,'2019-02-01 08:11:32','2019-02-01 08:11:32'),(21,3,2,5,1,'2019-02-01 08:11:36','2019-02-01 08:11:36'),(22,3,2,5,1,'2019-02-01 08:11:38','2019-02-01 08:11:38'),(23,30,2,5,1,'2019-02-01 08:11:40','2019-02-01 08:11:40'),(24,30,2,5,1,'2019-02-01 08:11:41','2019-02-01 08:11:41'),(25,30,2,50,1,'2019-02-01 08:12:37','2019-02-01 08:12:37'),(26,30,2,50,1,'2019-02-01 08:12:38','2019-02-01 08:12:38'),(27,30,2,50,1,'2019-02-01 08:12:39','2019-02-01 08:12:39'),(28,30,2,127,1,'2019-02-01 08:15:18','2019-02-01 08:15:18'),(29,30,2,127,1,'2019-02-01 08:15:20','2019-02-01 08:15:20'),(30,30,2,127,1,'2019-02-01 08:15:20','2019-02-01 08:15:20'),(31,30,2,127,1,'2019-02-01 08:15:21','2019-02-01 08:15:21'),(32,30,2,0,1,'2019-02-01 08:15:31','2019-02-01 08:15:31'),(33,30,2,0,1,'2019-02-01 08:15:32','2019-02-01 08:15:32'),(34,30,2,0,1,'2019-02-01 08:15:33','2019-02-01 08:15:33'),(35,30,2,0,1,'2019-02-01 08:15:33','2019-02-01 08:15:33'),(36,30,2,0,1,'2019-02-01 08:15:34','2019-02-01 08:15:34'),(37,30,2,-128,1,'2019-02-01 08:15:39','2019-02-01 08:15:39'),(38,30,2,-128,1,'2019-02-01 08:15:39','2019-02-01 08:15:39'),(39,30,2,-128,1,'2019-02-01 08:15:40','2019-02-01 08:15:40'),(40,30,2,-128,1,'2019-02-01 08:15:41','2019-02-01 08:15:41'),(41,30,2,-50,1,'2019-02-01 08:15:45','2019-02-01 08:15:45'),(42,30,2,-50,1,'2019-02-01 08:15:47','2019-02-01 08:15:47'),(43,2,2,10,1,'2019-02-01 08:16:55','2019-02-01 08:16:55'),(44,30,2,-5,1,'2019-02-01 08:17:44','2019-02-01 08:17:44'),(45,30,2,-5,1,'2019-02-01 08:17:44','2019-02-01 08:17:44'),(46,30,2,-5,1,'2019-02-01 08:17:45','2019-02-01 08:17:45'),(47,30,2,-50,1,'2019-02-01 08:17:49','2019-02-01 08:17:49'),(48,30,2,-50,1,'2019-02-01 08:17:50','2019-02-01 08:17:50'),(49,2,2,7,1,'2019-02-01 08:19:35','2019-02-01 08:19:35'),(50,2,2,7,1,'2019-02-01 08:21:16','2019-02-01 08:21:16');
/*!40000 ALTER TABLE `users_rating_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_scores_tab`
--

DROP TABLE IF EXISTS `users_scores_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_scores_tab` (
  `id` int(10) NOT NULL,
  `type` enum('class','course','material') NOT NULL DEFAULT 'class',
  `parentid` int(10) NOT NULL,
  `assessmentid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `score` int(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_scores_tab`
--

LOCK TABLES `users_scores_tab` WRITE;
/*!40000 ALTER TABLE `users_scores_tab` DISABLE KEYS */;
INSERT INTO `users_scores_tab` VALUES (1,'class',1,1,1,90,1,'2019-01-25 00:00:00','2019-01-25 00:00:00'),(2,'class',1,1,2,98,1,'2019-01-25 00:00:00','2019-01-25 00:00:00'),(3,'class',1,1,3,95,1,'2019-01-25 00:00:00','2019-01-25 00:00:00'),(4,'class',1,1,4,75,1,'2019-01-25 00:00:00','2019-01-25 00:00:00'),(5,'class',1,1,5,68,1,'2019-01-25 00:00:00','2019-01-25 00:00:00');
/*!40000 ALTER TABLE `users_scores_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_stats_tab`
--

DROP TABLE IF EXISTS `users_stats_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_stats_tab` (
  `userid` int(10) NOT NULL AUTO_INCREMENT,
  `total_video_duration` int(10) DEFAULT '0',
  `total_video_watch` int(10) DEFAULT '0',
  `total_assessment` int(10) DEFAULT '0',
  `total_module` int(10) DEFAULT '0',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_stats_tab`
--

LOCK TABLES `users_stats_tab` WRITE;
/*!40000 ALTER TABLE `users_stats_tab` DISABLE KEYS */;
INSERT INTO `users_stats_tab` VALUES (1,185,12,15,5),(2,205,14,15,5),(3,303,17,17,7);
/*!40000 ALTER TABLE `users_stats_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_tab`
--

DROP TABLE IF EXISTS `users_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_tab` (
  `userid` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullname` varchar(150) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_tab`
--

LOCK TABLES `users_tab` WRITE;
/*!40000 ALTER TABLE `users_tab` DISABLE KEYS */;
INSERT INTO `users_tab` VALUES (1,'palmagratcy@gmailk.com','Gratcy Palma','','','1234','65432',1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'tampnbgt@gmail.com','Andra Nur','','https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png','123456','124568',1,'2019-01-31 00:00:00','2019-01-31 00:00:00'),(3,'nurhadi@aldo.com','Nurhadi','','https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png','1234256','1243568',0,'2019-01-31 00:00:00','2019-01-31 00:00:00');
/*!40000 ALTER TABLE `users_tab` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`sigma`@`%`*/ /*!50003 TRIGGER `elearning_db`.`users_tab_AFTER_INSERT` AFTER INSERT ON `users_tab` FOR EACH ROW
BEGIN
  INSERT INTO users_stats_tab (userid)
  VALUES (NEW.userid);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users_videos_tab`
--

DROP TABLE IF EXISTS `users_videos_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_videos_tab` (
  `videoid` int(10) NOT NULL,
  `materialid` int(10) NOT NULL,
  `filename` varchar(300) NOT NULL,
  `status` tinyint(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_videos_tab`
--

LOCK TABLES `users_videos_tab` WRITE;
/*!40000 ALTER TABLE `users_videos_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_videos_tab` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-06  8:31:12
