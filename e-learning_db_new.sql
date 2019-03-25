-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 23, 2019 at 12:05 AM
-- Server version: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.15-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-learning_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_access_tab`
--

CREATE TABLE `admin_access_tab` (
  `id` int(8) UNSIGNED NOT NULL,
  `groupid` int(4) UNSIGNED NOT NULL,
  `permissionid` int(10) DEFAULT NULL,
  `access` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin_groups_tab`
--

CREATE TABLE `admin_groups_tab` (
  `groupid` int(4) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `status` int(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin_permission_tab`
--

CREATE TABLE `admin_permission_tab` (
  `permissionid` int(10) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `desc` varchar(150) DEFAULT NULL,
  `url` varchar(45) DEFAULT NULL,
  `parent` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin_tab`
--

CREATE TABLE `admin_tab` (
  `adminid` int(10) NOT NULL,
  `groupid` int(10) DEFAULT NULL,
  `nick` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `salt` varchar(50) NOT NULL,
  `lastlogin` varchar(30) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `assessment_detail_tab`
--

CREATE TABLE `assessment_detail_tab` (
  `detailid` int(10) NOT NULL,
  `assessmentid` int(10) NOT NULL,
  `question_type` enum('single-choice','essay') NOT NULL DEFAULT 'single-choice',
  `question` varchar(350) NOT NULL,
  `options` text NOT NULL,
  `answer` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assessment_detail_tab`
--

INSERT INTO `assessment_detail_tab` (`detailid`, `assessmentid`, `question_type`, `question`, `options`, `answer`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'single-choice', 'This will create a symlink named react-relay/node_modules/react that links to your local copy of the react project.', '[ \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 1,\n        \"label\" : \"Risky\"\n    }, \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 2,\n        \"label\" : \"Danang\"\n    }, \n    {\n        \"isAnswer\" : true,\n        \"_id\" : 3,\n        \"label\" : \"Bram\"\n    }, \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 5,\n        \"label\" : \"Bang Sastra\"\n    }\n]', '1', 1, '2019-01-19 00:00:00', '2019-01-19 00:00:00'),
(2, 1, 'single-choice', 'To reverse this process, simply use yarn unlink or yarn unlink [package]. Also see', '[ \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 1,\n        \"label\" : \"Risky\"\n    }, \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 2,\n        \"label\" : \"Danang\"\n    }, \n    {\n        \"isAnswer\" : true,\n        \"_id\" : 3,\n        \"label\" : \"Bram\"\n    }, \n    {\n        \"isAnswer\" : false,\n        \"_id\" : 5,\n        \"label\" : \"Bang Sastra\"\n    }\n]', '1', 1, '2019-01-19 00:00:00', '2019-01-19 00:00:00'),
(3, 1, 'single-choice', 'Apa itu BMC ?', '[ \r\n    {\r\n        \"isAnswer\" : false,\r\n        \"_id\" : 1,\r\n        \"label\" : \"Bussiness Model Canvas\"\r\n    }, \r\n    {\r\n        \"isAnswer\" : false,\r\n        \"_id\" : 2,\r\n        \"label\" : \"Bussiness Mercedes Car\"\r\n    }, \r\n    {\r\n        \"isAnswer\" : true,\r\n        \"_id\" : 3,\r\n        \"label\" : \"Business Model Canvas\"\r\n    }, \r\n    {\r\n        \"isAnswer\" : false,\r\n        \"_id\" : 5,\r\n        \"label\" : \"Bussiness Mercedes Car II\"\r\n    }\r\n]', '1', 1, '2019-03-06 00:00:00', '2019-03-06 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_tab`
--

CREATE TABLE `assessment_tab` (
  `assessmentid` int(10) NOT NULL,
  `parentid` int(10) NOT NULL,
  `title` varchar(150) NOT NULL,
  `duration` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assessment_tab`
--

INSERT INTO `assessment_tab` (`assessmentid`, `parentid`, `title`, `duration`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'NodeJS', 600, 1, '2019-01-19 00:00:00', '2019-01-19 00:00:00'),
(2, 1, 'Startup', 600, 1, '2019-03-06 00:00:00', '2019-03-06 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `classes_tab`
--

CREATE TABLE `classes_tab` (
  `classid` int(11) NOT NULL,
  `guruid` int(10) NOT NULL DEFAULT '0',
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `cover` varchar(300) NOT NULL,
  `medium` longtext NOT NULL,
  `thumbnail` longtext NOT NULL,
  `priority` int(11) NOT NULL,
  `rating` double(10,1) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes_tab`
--

INSERT INTO `classes_tab` (`classid`, `guruid`, `name`, `description`, `cover`, `medium`, `thumbnail`, `priority`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Kelas 10 SMP', 'Burung anda bagus sekali ya', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/1552889251222-Screenshot-from-2019-03-15-14-30-11.png', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552889251222-Screenshot-from-2019-03-15-14-30-11.png', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/thumbnail-1552889251222-Screenshot-from-2019-03-15-14-30-11.png', 5, NULL, 1, '2019-01-31 00:00:00', '2019-03-18 13:07:32'),
(2, 1, 'Express in an hour', 'Cara Express buat jago Express', 'https://cdn.lynda.com/course/612195/612195-636458390742664213-16x9.jpg', '', '', 10, 1.8, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 4, 'Menjadi Capres Idola', 'Bagaimana menjadi presiden yang dipilih oleh internet', 'http://cdn2.tstatic.net/kaltim/foto/bank/images/kompas-tv-nurhadi-aldo-rosi.jpg', '', '', 2, 3.7, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 4, 'Menjadi Capres Idola Jilid 2', 'Bagaimana menjadi presiden yang dipilih oleh internet', 'http://cdn2.tstatic.net/kaltim/foto/bank/images/kompas-tv-nurhadi-aldo-rosi.jpg', '', '', 5, NULL, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(5, 3, 'Menyanyi Tanpa Suara Bagus', 'Yang Penting Mukaku Cantik', 'https://awsimages.detik.net.id/community/media/visual/2018/05/02/cbecadbe-4946-49ea-932d-a6f2c0fc692a_43.jpeg?w=780&q=90', '', '', 4, NULL, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(6, 3, 'Menyanyi Tanpa Suara Bagus Jili 2', 'Ya ga mungkinlah suara jelek jadi penyanyi', 'https://3.bp.blogspot.com/-_SEglsqFXEQ/VzlJ4I2-O6I/AAAAAAAAA9E/XSfXHh-iUjA45SFEySq5F4sk5P0c91zUwCLcB/s640/nyanyikamarmandi2.jpg', '', '', 1, NULL, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 2, 'Ternak lele sampai ke mars', 'Bersama Elon Musk ingin ke mars untuk membuat kolam lele', 'https://1.bp.blogspot.com/-5Kmw6DbdES4/Wg_gbErmEiI/AAAAAAAAJhA/UrKCS0aXu8IKc6Ge1ppsOEIDyLRR7rJ6gCLcBGAs/s1600/Umpan%2Bikan%2Blele.jpg', '', '', 8, NULL, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(8, 3, 'Kelas Menggambar Burung', 'Burung anda bagus sekali ya', 'https://satujam.com/wp-content/uploads/2015/08/flickriver.com_.jpg', '', '', 9, 0.0, 1, '2019-02-28 14:01:35', '2019-02-28 14:01:35'),
(9, 1, 'Asas', 'asdasdsa', 'asdsadsa', '', '', 10, 0.0, 0, '2019-03-05 00:00:00', '2019-03-05 00:00:00'),
(14, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552276884419.jpeg', '', '', 9, 0.0, 1, '2019-03-11 11:01:25', '2019-03-11 11:01:25'),
(15, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552281062393.jpeg', '', '', 9, 0.0, 1, '2019-03-11 12:11:03', '2019-03-11 12:11:03'),
(16, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552282349819.jpeg', '', '', 9, 0.0, 1, '2019-03-11 12:32:30', '2019-03-11 12:32:30'),
(17, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552361072869.jpeg', '', '', 9, 0.0, 1, '2019-03-12 10:24:37', '2019-03-12 10:24:37'),
(18, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/1552361186029.jpeg', '', '', 9, 0.0, 1, '2019-03-12 10:26:27', '2019-03-12 10:26:27'),
(19, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552363381613.jpeg', '', '', 9, 0.0, 1, '2019-03-12 11:03:02', '2019-03-12 11:03:02'),
(20, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552363438536.jpeg', '', '', 9, 0.0, 1, '2019-03-12 11:03:59', '2019-03-12 11:03:59'),
(21, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552363465900.jpeg', '', '', 9, 0.0, 1, '2019-03-12 11:04:27', '2019-03-12 11:04:27'),
(22, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552363534771.jpeg', '', '', 9, 0.0, 1, '2019-03-12 11:05:37', '2019-03-12 11:05:37'),
(23, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552369432974.jpeg', '', '', 9, 0.0, 1, '2019-03-12 12:43:55', '2019-03-12 12:43:55'),
(24, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552369604803.jpeg', '', '', 9, 0.0, 1, '2019-03-12 12:46:46', '2019-03-12 12:46:46'),
(25, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552369668462.jpeg', '', '', 9, 0.0, 1, '2019-03-12 12:47:51', '2019-03-12 12:47:51'),
(26, 1, 'Kelas Ultimate Free', 'Kelas mujarab buat cari jodoh', 'https://developmentarkadmi.s3.amazonaws.com/1552369863923.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552369863923.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/thumbnail-1552369863923.jpeg', 9, 0.0, 1, '2019-03-12 12:51:05', '2019-03-12 12:51:05'),
(27, 1, 'Kelas Ultimate Free', 'Free Class for everyone', 'https://developmentarkadmi.s3.amazonaws.com/1552621137653-pak_jojo.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552621137653-pak_jojo.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/thumbnail-1552621137653-pak_jojo.jpeg', 9, 0.0, 1, '2019-03-15 10:38:59', '2019-03-15 10:38:59'),
(28, 1, 'Kelas 6 SD', 'Untuk anak SD', 'https://developmentarkadmi.s3.amazonaws.com/1552621378643-0.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552621378643-0.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/thumbnail-1552621378643-0.jpeg', 8, 0.0, 1, '2019-03-15 10:43:00', '2019-03-15 10:43:00'),
(29, 1, 'Kelas 7 SMP', 'Untuk anak SMP', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/1552639553241-Screenshot-from-2019-03-15-14-30-11.png', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552639553241-Screenshot-from-2019-03-15-14-30-11.png', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/thumbnail-1552639553241-Screenshot-from-2019-03-15-14-30-11.png', 8, 0.0, 1, '2019-03-15 15:45:57', '2019-03-15 15:45:57'),
(30, 1, 'Kelas 7 SMP', 'Untuk anak SMP', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/1552889115913-pak_jojo.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552889115913-pak_jojo.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/thumbnail-1552889115913-pak_jojo.jpeg', 8, 0.0, 1, '2019-03-18 13:05:18', '2019-03-18 13:05:18');

-- --------------------------------------------------------

--
-- Table structure for table `courses_detail_tab`
--

CREATE TABLE `courses_detail_tab` (
  `detailid` int(11) NOT NULL,
  `courseid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `assesmentid` int(10) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses_detail_tab`
--

INSERT INTO `courses_detail_tab` (`detailid`, `courseid`, `name`, `status`, `created_at`, `updated_at`, `assesmentid`) VALUES
(1, 1, 'BAB 1', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(2, 1, 'BAB 2', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(3, 1, 'BAB 3', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(4, 1, 'BAB 4', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(5, 1, 'BAB 5', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(6, 1, 'BAB 6', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(7, 1, 'BAB 7', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(8, 1, 'BAB 8', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(9, 1, 'BAB 9', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(10, 2, 'BAB 1', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(11, 2, 'BAB 2', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(12, 2, 'BAB 3', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(13, 2, 'BAB 4', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(14, 2, 'BAB 5', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(15, 2, 'BAB 6', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(16, 2, 'BAB 7', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(17, 2, 'BAB 8', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(18, 2, 'BAB 9', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00', 0),
(19, 3, 'BAB 1', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(20, 3, 'BAB 2', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(21, 3, 'BAB 3', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(22, 3, 'BAB 4', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(23, 3, 'BAB 5', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(24, 3, 'BAB 6', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(25, 3, 'BAB 7', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(26, 3, 'BAB 8', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(27, 3, 'BAB 9', 1, '2019-01-31 03:12:54', '2019-01-31 03:12:54', 0),
(28, 1, 'Fase Awal Pembentukan Startup', 1, '2019-03-05 00:00:00', '2019-03-05 00:00:00', 0),
(29, 1, 'Materi 1', 1, '2019-03-05 00:00:00', '2019-03-05 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `courses_material_tab`
--

CREATE TABLE `courses_material_tab` (
  `materialid` int(10) NOT NULL,
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
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses_material_tab`
--

INSERT INTO `courses_material_tab` (`materialid`, `detailid`, `assessmentid`, `name`, `description`, `video_url`, `thumbnails`, `size`, `duration`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVdkYThYbAuDeQU5NAFB7qjdzpgpAAFa5dHIqxdjE171PIxoC', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 1, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVdkYThYbAuDeQU5NAFB7qjdzpgpAAFa5dHIqxdjE171PIxoC', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 1, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVdkYThYbAuDeQU5NAFB7qjdzpgpAAFa5dHIqxdjE171PIxoC', 90, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 1, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVdkYThYbAuDeQU5NAFB7qjdzpgpAAFa5dHIqxdjE171PIxoC', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(5, 2, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(6, 2, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 2, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(8, 2, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(9, 2, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://cdn.vox-cdn.com/thumbor/NQzJGsyTln4h782a6p3pVT98Zv0=/0x0:1280x721/1200x800/filters:focal(538x259:742x463)/cdn.vox-cdn.com/uploads/chorus_image/image/53828867/naruto.0.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(10, 3, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(11, 3, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(12, 3, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(13, 3, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(14, 3, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(15, 3, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(16, 3, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://duniagames.co.id/image/jpg/108098/1000/x571.pagespeed.ic.8-5zY46syx.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(17, 4, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(18, 4, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(19, 4, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(20, 4, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(21, 4, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(22, 4, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(23, 4, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(24, 4, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://1.bp.blogspot.com/-7JE7Y6Mgn3E/VcORegvTEcI/AAAAAAAAAZI/gAlb4I0DuH8/s1600/model%2Bgaya%2Brambut%2Bterbaru%2Bberbentuk%2Bkumis.png', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(25, 5, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(26, 5, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(27, 5, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(28, 5, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(29, 5, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(30, 5, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(31, 5, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO4AZwledZyWqgnyyIb_NrJXMbzoNvJrzRMh2-4QfWmsF_hxOstw', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(32, 6, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(33, 6, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(34, 6, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(35, 6, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(36, 6, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(37, 6, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(38, 7, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(39, 7, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(40, 7, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(41, 7, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(42, 7, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(43, 7, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(44, 8, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(45, 8, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(46, 8, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(47, 8, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(48, 9, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(49, 9, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(50, 9, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(51, 10, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://4.bp.blogspot.com/-NgGxbqLacz4/UhLHuXGMZ_I/AAAAAAAA7EI/2tZ54aPKPdM/s1600/rambut1.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(52, 10, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://4.bp.blogspot.com/-NgGxbqLacz4/UhLHuXGMZ_I/AAAAAAAA7EI/2tZ54aPKPdM/s1600/rambut1.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(53, 10, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://4.bp.blogspot.com/-NgGxbqLacz4/UhLHuXGMZ_I/AAAAAAAA7EI/2tZ54aPKPdM/s1600/rambut1.jpg', 90, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(54, 10, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://4.bp.blogspot.com/-NgGxbqLacz4/UhLHuXGMZ_I/AAAAAAAA7EI/2tZ54aPKPdM/s1600/rambut1.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(55, 11, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(56, 11, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(57, 11, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(58, 11, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(59, 11, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(60, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(61, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(62, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(63, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(64, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(65, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(66, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(67, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(68, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(69, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(70, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(71, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(72, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(73, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(74, 12, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(75, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(76, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(77, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(78, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(79, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(80, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(81, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(82, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(83, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(84, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(85, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(86, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(87, 13, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(88, 14, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(89, 14, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(90, 14, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(91, 14, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(92, 14, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(93, 14, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(94, 15, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(95, 15, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(96, 15, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(97, 15, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(98, 16, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(99, 16, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(100, 16, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(151, 17, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(152, 17, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(153, 17, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 90, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(154, 17, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(155, 18, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(156, 18, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(157, 18, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(158, 18, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(159, 18, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(160, 18, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(161, 19, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(162, 19, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(163, 19, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(164, 19, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(165, 19, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(166, 19, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(167, 19, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(168, 19, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i2.wp.com/ceritaihsan.com/wp-content/uploads/2018/02/gambar-lucu.png?fit=821%2C643&ssl=1', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(169, 20, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(170, 20, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(171, 20, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(172, 20, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(173, 20, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(174, 21, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(175, 21, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(176, 21, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(177, 21, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(178, 21, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(179, 22, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(180, 22, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(181, 22, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(182, 22, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(183, 22, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(184, 22, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(185, 23, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(186, 23, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(187, 23, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(188, 23, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(189, 23, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(190, 23, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(191, 23, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(192, 24, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(193, 24, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(194, 24, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(195, 24, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(196, 24, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00');
INSERT INTO `courses_material_tab` (`materialid`, `detailid`, `assessmentid`, `name`, `description`, `video_url`, `thumbnails`, `size`, `duration`, `status`, `created_at`, `updated_at`) VALUES
(197, 25, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(198, 25, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(199, 25, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(200, 25, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(201, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(202, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(203, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(204, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(205, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(206, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(207, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(208, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(209, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(210, 26, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(211, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(212, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(213, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(214, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(215, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(216, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(217, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(218, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(219, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(220, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(221, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(222, 27, 0, 'Video Materi', 'Materinya Susah Banget Bro', 'https://s3-ap-southeast-1.amazonaws.com/developmentarkadmi/videos/Blender+Beginner+Tutorial+-+Part+1-+User+Interface.mp4', 'http://www.timboladunia.com/wp-content/uploads/2016/03/momen-momen-terunik-di-dunia-sepakbola-008-debby-300x225.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(223, 1, 0, 'dadasdad', 'adsadasdsd', 'asdasd', 'asdsad', 0, 745, 1, '2019-03-05 00:00:00', '2019-03-05 00:00:00'),
(224, 36, 0, 'Early days of startup', 'Early days of startup', 'https://developmentarkadmi.s3.amazonaws.com/videos/Materi%201.mp4', 'https://developmentarkadmi.s3.amazonaws.com/thumbnails/create_startup.png', 0, 720, 1, '2019-03-05 00:00:00', '2019-03-05 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses_tab`
--

CREATE TABLE `courses_tab` (
  `courseid` int(10) NOT NULL,
  `classid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `preassessmentid` int(10) NOT NULL,
  `finalassessmentid` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses_tab`
--

INSERT INTO `courses_tab` (`courseid`, `classid`, `name`, `preassessmentid`, `finalassessmentid`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Belajar Express Dengan Arham si Tampan', 1, 0, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 3, 'React Native Crash Course', 0, 0, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 4, 'Fullstack Laravel and React Native', 0, 0, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 4, 'asdasd', 0, 0, 1, '2019-03-05 00:00:00', '2019-03-05 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_likes_tab`
--

CREATE TABLE `discussion_likes_tab` (
  `id` int(10) NOT NULL,
  `discussionid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `discussion_likes_tab`
--

INSERT INTO `discussion_likes_tab` (`id`, `discussionid`, `userid`, `status`, `created_at`, `updated_at`) VALUES
(1, 6, 3, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 6, 2, 1, '2019-01-31 00:00:00', '2019-01-23 13:23:00'),
(3, 8, 1, 1, '2019-01-23 12:43:35', '2019-01-23 12:43:35'),
(4, 6, 4, 1, '2019-01-24 12:43:15', '2019-02-12 06:24:33'),
(5, 17, 1, 1, '2019-01-24 13:20:20', '2019-01-24 13:20:20'),
(6, 11, 1, 1, '2019-02-01 07:16:38', '2019-02-22 03:20:15'),
(7, 16, 2, 1, '2019-02-06 06:08:33', '2019-02-06 07:14:28'),
(8, 16, 3, 1, '2019-02-06 06:09:13', '2019-02-06 06:09:23'),
(14, 7, 2, 1, '2019-02-06 07:15:18', '2019-02-06 07:15:18'),
(15, 37, 2, 1, '2019-02-06 07:18:04', '2019-02-06 07:18:04'),
(16, 33, 2, 1, '2019-02-12 07:16:47', '2019-02-12 07:16:47'),
(17, 11, 2, 1, '2019-02-12 07:17:25', '2019-02-12 07:17:40'),
(18, 46, 2, 1, '2019-02-12 07:27:18', '2019-02-12 07:27:18'),
(19, 107, 1, 1, '2019-02-22 03:43:19', '2019-02-22 07:37:47'),
(20, 106, 1, 1, '2019-02-22 03:43:22', '2019-02-22 03:43:22'),
(21, 108, 2, 1, '2019-02-22 03:44:24', '2019-02-22 03:44:26'),
(22, 108, 1, 1, '2019-02-22 03:48:43', '2019-02-22 07:37:53'),
(23, 111, 26, 1, '2019-02-22 14:38:05', '2019-02-22 14:38:05'),
(24, 110, 26, 1, '2019-02-22 14:38:08', '2019-02-22 14:38:08'),
(25, 114, 26, 1, '2019-02-22 14:38:26', '2019-02-22 14:38:26'),
(26, 85, 1, 1, '2019-02-25 03:15:43', '2019-02-25 03:15:43'),
(27, 118, 1, 0, '2019-02-25 03:41:56', '2019-02-25 03:42:01'),
(28, 114, 48, 1, '2019-02-25 04:05:02', '2019-02-25 04:05:02'),
(29, 111, 48, 1, '2019-02-25 04:05:05', '2019-02-25 04:05:05'),
(30, 110, 48, 1, '2019-02-25 04:05:38', '2019-02-25 04:05:38'),
(31, 109, 48, 1, '2019-02-25 04:05:43', '2019-02-25 04:05:43'),
(32, 85, 49, 1, '2019-02-25 04:13:54', '2019-02-25 04:13:54'),
(33, 119, 48, 1, '2019-02-25 06:12:42', '2019-02-25 06:12:42'),
(34, 124, 48, 1, '2019-02-25 06:18:49', '2019-02-25 06:18:49'),
(35, 126, 52, 1, '2019-02-25 09:42:36', '2019-02-25 09:42:40'),
(36, 125, 52, 1, '2019-02-25 09:42:44', '2019-02-25 09:43:01'),
(37, 125, 26, 1, '2019-02-25 09:42:51', '2019-02-25 09:42:51'),
(38, 129, 52, 1, '2019-02-26 03:06:37', '2019-02-26 03:06:37'),
(39, 128, 52, 1, '2019-02-26 03:06:41', '2019-02-26 03:06:41');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_tab`
--

CREATE TABLE `discussion_tab` (
  `discussionid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `courseid` int(11) DEFAULT NULL,
  `post_title` varchar(150) NOT NULL,
  `post_content` text NOT NULL,
  `parent` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `discussion_tab`
--

INSERT INTO `discussion_tab` (`discussionid`, `userid`, `courseid`, `post_title`, `post_content`, `parent`, `status`, `created_at`, `updated_at`) VALUES
(6, 1, 2, '', 'Ini gimana nih ?', 0, 1, '2019-01-22 12:42:43', '2019-01-22 12:42:43'),
(7, 2, 2, '', 'Biar kaya gini gimana nih caranya gan ?', 0, 1, '2019-01-22 13:11:43', '2019-01-22 13:11:43'),
(8, 1, 2, '', 'Jadi jawabannya gini bro', 6, 1, '2019-01-22 14:11:43', '2019-01-22 14:11:43'),
(9, 3, 2, '', 'Jadi jawabannya gitu bro, ngerti kgk', 6, 1, '2019-01-22 14:13:25', '2019-01-22 14:13:25'),
(10, 3, 2, '', 'Jadi jawabannya gitu bro, ngerti kgk', 7, 1, '2019-01-22 14:26:55', '2019-03-14 10:09:56'),
(11, 1, 2, '', 'Jadi saya bingungnya gini gan', 0, 1, '2019-01-23 10:48:58', '2019-01-23 10:48:58'),
(12, 2, NULL, '', 'Jadi jawabannya ada banyak bro, mw yang mana ?', 11, 1, '2019-01-23 10:53:21', '2019-01-23 10:53:21'),
(13, 4, 2, '', 'Ini yang bener gimana gan ?', 0, 1, '2019-01-24 12:43:58', '2019-01-24 12:43:58'),
(14, 2, NULL, '', 'Jadi salahnya disini gan ', 13, 1, '2019-01-24 12:44:28', '2019-01-24 12:44:28'),
(15, 2, 2, '', 'bangsat lu', 6, 1, '2019-01-24 13:16:10', '2019-01-24 13:16:10'),
(16, 4, 2, '', 'Cara Buat Game gimana ya?', 0, 1, '2019-01-24 13:18:28', '2019-01-24 13:18:28'),
(17, 1, 2, '', 'Cara Buat Game gimana ya?', 0, 1, '2019-01-24 13:18:38', '2019-01-24 13:18:38'),
(18, 2, NULL, '', 'Game Apaan Gan?', 17, 1, '2019-01-24 13:19:29', '2019-01-24 13:19:29'),
(19, 2, NULL, '', 'Game Ganteng', 17, 1, '2019-01-24 13:48:46', '2019-01-24 13:48:46'),
(20, 4, 3, '', 'Ini yang bener gimana gan ?', 0, 1, '2019-01-29 08:42:20', '2019-01-29 08:42:20'),
(21, 3, 2, '', 'Ini yang bener gimana gan ya ?', 0, 1, '2019-01-30 03:39:20', '2019-01-30 03:39:20'),
(22, 2, NULL, '', 'Jadi salahnya disini gan, yg bener gini jadinya', 21, 1, '2019-01-30 03:39:45', '2019-01-30 03:39:45'),
(23, 3, 2, '', 'Apa itu JSX?', 0, 1, '2019-01-31 06:34:14', '2019-01-31 06:34:14'),
(24, 3, 2, '', 'Apa itu JSX? 2', 0, 1, '2019-01-31 07:19:01', '2019-01-31 07:19:01'),
(25, 1, 2, '', 'Apa itu JSX? 2', 0, 1, '2019-01-31 07:19:32', '2019-01-31 07:19:32'),
(26, 1, 2, '', 'hello there - TF', 0, 1, '2019-01-31 07:20:46', '2019-01-31 07:20:46'),
(27, 1, 2, '', 'Create via Postman #1', 0, 1, '2019-01-31 07:29:16', '2019-01-31 07:29:16'),
(28, 1, 2, '', 'Create via Postman #2', 0, 1, '2019-01-31 07:35:10', '2019-01-31 07:35:10'),
(29, 4, 2, '', ' Saya bingung nih gan, jadi gini.....', 0, 1, '2019-01-31 07:35:51', '2019-01-31 07:35:51'),
(30, 4, 3, '', ' Saya bingung nih gan, jadi gini.....', 0, 1, '2019-01-31 07:36:51', '2019-01-31 07:36:51'),
(31, 1, 2, '', 'Create via Postman #3', 0, 1, '2019-01-31 07:55:31', '2019-01-31 07:55:31'),
(32, 1, 2, '', 'Create via Postman #4', 0, 1, '2019-01-31 08:08:36', '2019-01-31 08:08:36'),
(33, 1, 2, '', 'Create via Postman #5', 0, 1, '2019-01-31 09:35:40', '2019-01-31 09:35:40'),
(34, 1, 2, '', 'Create via Postman #6', 0, 1, '2019-02-01 02:20:03', '2019-02-01 02:20:03'),
(35, 2, 2, '', 'Android #1', 0, 1, '2019-02-01 02:43:55', '2019-02-01 02:43:55'),
(36, 2, 2, '', 'Android #2', 0, 1, '2019-02-01 02:45:45', '2019-02-01 02:45:45'),
(37, 1, 2, '', 'Create via Postman #7', 0, 1, '2019-02-01 02:49:35', '2019-02-01 02:49:35'),
(38, 2, NULL, '', 'Jadi salahnya disini gan, yg bener gini jadinya', 11, 1, '2019-02-01 06:57:14', '2019-02-01 06:57:14'),
(39, 3, NULL, '', 'Jadi salahnya disini gan, yg bener gini jadinya', 11, 1, '2019-02-01 06:57:58', '2019-02-01 06:57:58'),
(40, 3, NULL, '', 'Jadi salahnya disini gan, yg bener gini jadinya', 11, 1, '2019-02-01 07:01:27', '2019-02-01 07:01:27'),
(41, 3, NULL, '', 'Jadi salahnya disini gan, yg bener gini jadinya #1', 11, 1, '2019-02-01 07:01:32', '2019-02-01 07:01:32'),
(42, 3, NULL, '', 'Jadi salahnya disini gan, yg bener gini jadinya #2', 11, 1, '2019-02-01 07:01:38', '2019-02-01 07:01:38'),
(43, 3, NULL, '', 'Android #1', 11, 1, '2019-02-01 07:04:57', '2019-02-01 07:04:57'),
(44, 3, NULL, '', 'Jadi salahnya disini gan, yg bener gini jadinya #3', 11, 1, '2019-02-01 07:07:36', '2019-02-01 07:07:36'),
(45, 2, 2, '', 'Jadi salahnya disini gan ', 6, 1, '2019-02-06 04:15:29', '2019-02-06 04:15:29'),
(46, 2, 2, '', 'Test from Android #1', 0, 1, '2019-02-12 03:56:25', '2019-02-12 03:56:25'),
(47, 3, 2, '', 'henlo', 36, 1, '2019-02-12 06:21:13', '2019-02-12 06:21:13'),
(48, 3, 2, '', 'hhenlo 2', 36, 1, '2019-02-12 06:21:38', '2019-02-12 06:21:38'),
(49, 3, 2, '', 'henlo', 36, 1, '2019-02-12 06:22:07', '2019-02-12 06:22:07'),
(50, 2, 2, '', 'Jadi salahnya disini gan ', 13, 1, '2019-02-12 06:24:38', '2019-02-12 06:24:38'),
(51, 2, 2, '', 'Jadi salahnya disini gan ', 13, 1, '2019-02-12 06:24:45', '2019-02-12 06:24:45'),
(52, 2, 2, '', 'Jadi salahnya disini gan ', 13, 1, '2019-02-12 06:24:51', '2019-02-12 06:24:51'),
(53, 3, 2, '', 'henlooo\n', 36, 1, '2019-02-12 06:25:18', '2019-02-12 06:25:18'),
(54, 2, 2, '', 'Jadi salahnya disini gan ', 6, 1, '2019-02-12 06:26:02', '2019-02-12 06:26:02'),
(55, 2, 2, '', 'Jadi salahnya disini gan ', 11, 1, '2019-02-12 06:30:59', '2019-02-12 06:30:59'),
(56, 2, 2, '', 'Jadi salahnya disini gan ', 11, 1, '2019-02-12 06:31:58', '2019-02-12 06:31:58'),
(57, 2, 2, '', 'Jadi salahnya disini gan ', 13, 1, '2019-02-12 06:37:01', '2019-02-12 06:37:01'),
(58, 2, 2, '', 'Jadi salahnya disini gan ', 13, 1, '2019-02-12 06:37:03', '2019-02-12 06:37:03'),
(59, 2, 2, '', 'Jadi salahnya disini gan ', 46, 1, '2019-02-12 06:38:32', '2019-02-12 06:38:32'),
(60, 1, 2, '', 'Jadi salahnya disini gan ', 46, 1, '2019-02-12 06:39:12', '2019-02-12 06:39:12'),
(61, 2, 2, '', 'Jadi salahnya disini gan ', 13, 1, '2019-02-12 06:46:22', '2019-02-12 06:46:22'),
(62, 1, 2, '', 'Jadi salahnya disini gan #2', 37, 1, '2019-02-12 06:47:01', '2019-02-12 06:47:01'),
(63, 4, 3, '', 'Ini yang bener gimana gan ? #1', 0, 1, '2019-02-12 06:47:15', '2019-02-12 06:47:15'),
(64, 2, 2, '', 'Jadi salahnya disini gan ', 11, 1, '2019-02-12 06:47:24', '2019-02-12 06:47:24'),
(65, 1, 3, '', 'Jadi salahnya disini gan #2', 63, 1, '2019-02-12 06:47:28', '2019-02-12 06:47:28'),
(66, 1, 2, '', 'Jadi salahnya disini gan #2', 6, 1, '2019-02-12 06:55:59', '2019-02-12 06:55:59'),
(67, 1, 2, '', 'Jadi salahnya disini gan #2', 6, 1, '2019-02-12 07:01:50', '2019-02-12 07:01:50'),
(68, 2, 2, '', 'Jadi salahnya disini gan ', 11, 1, '2019-02-12 07:06:05', '2019-02-12 07:06:05'),
(69, 1, 2, '', 'Jadi salahnya disini gan #7', 6, 1, '2019-02-12 07:10:10', '2019-02-12 07:10:10'),
(70, 2, 2, '', 'Jadi salahnya disini gan ', 11, 1, '2019-02-12 07:10:21', '2019-02-12 07:10:21'),
(71, 3, 2, '', 'hello there\n', 36, 1, '2019-02-12 07:10:44', '2019-02-12 07:10:44'),
(72, 2, 2, '', 'Android 3', 0, 1, '2019-02-13 17:34:54', '2019-02-13 17:34:54'),
(73, 2, 4, '', 'Hello #1', 0, 1, '2019-02-13 17:35:54', '2019-02-13 17:35:54'),
(74, 4, 3, '', 'Ini yang bener gimana gan ?', 0, 1, '2019-02-13 17:37:22', '2019-02-13 17:37:22'),
(75, 4, 4, '', 'Ini yang bener gimana gan ?', 0, 1, '2019-02-13 17:37:54', '2019-02-13 17:37:54'),
(76, 4, 3, '', 'Ini yang bener gimana gan ?', 0, 1, '2019-02-13 17:38:04', '2019-02-13 17:38:04'),
(77, 2, 3, '', 'hello', 0, 1, '2019-02-13 17:38:22', '2019-02-13 17:38:22'),
(78, 3, 3, '', 'Henlo henloooooooooo', 77, 1, '2019-02-14 03:58:45', '2019-02-14 03:58:45'),
(79, 2, 2, '', 'Jadi salahnya disini gan ', 13, 1, '2019-02-14 04:01:13', '2019-02-14 04:01:13'),
(80, 2, 2, '', 'Ini yang bener gimana gan ? #ultimate', 0, 1, '2019-02-14 07:43:10', '2019-02-14 07:43:10'),
(81, 1, 2, '', 'Jadi salahnya disini gan #ultimate', 13, 1, '2019-02-14 07:45:31', '2019-02-14 07:45:31'),
(82, 3, 2, '', 'test', 72, 1, '2019-02-19 08:09:35', '2019-02-19 08:09:35'),
(83, 2, 2, '', 'coba Tanya 20 Feb 219', 0, 1, '2019-02-20 02:14:48', '2019-02-20 02:14:48'),
(84, 2, 2, '', 'tatas ganteng', 0, 0, '2019-02-20 02:23:41', '2019-02-20 02:23:41'),
(85, 2, 2, '', 'coba 123456', 0, 1, '2019-02-20 02:24:25', '2019-02-20 02:24:25'),
(86, 3, 2, '', 'tatas emang ganteng', 84, 0, '2019-02-20 02:28:14', '2019-02-20 02:28:14'),
(87, 3, 2, '', 'iya Mari Kita Tanya ya hehehehe', 83, 1, '2019-02-20 02:31:07', '2019-02-20 02:31:07'),
(88, 3, 2, '', 'Aku tampan sekali', 85, 1, '2019-02-20 08:44:06', '2019-02-20 08:44:06'),
(89, 1, 2, '', 'Jadi salahnya disini gan #ultimate', 85, 1, '2019-02-20 08:47:46', '2019-02-20 08:47:46'),
(90, 2, 4, '', 'Kenapa saya terlalu ganteng gan ?', 0, 1, '2019-02-20 08:52:14', '2019-02-20 08:52:14'),
(91, 1, 4, '', 'Ini yang bener gimana gan ? #ultimate #1', 0, 1, '2019-02-20 08:54:03', '2019-02-20 08:54:03'),
(92, 2, 4, '', 'Alah mboh lah', 0, 1, '2019-02-20 08:54:43', '2019-02-20 08:54:43'),
(93, 1, 4, '', 'Ini yang bener gimana gan ? #ultimate #2', 0, 1, '2019-02-20 08:55:01', '2019-02-20 08:55:01'),
(94, 2, 4, '', 'Ini apa #1', 0, 1, '2019-02-20 09:00:11', '2019-02-20 09:00:11'),
(95, 1, 4, '', 'Ini yang bener gimana gan ? #ultimate #3', 0, 1, '2019-02-20 09:00:56', '2019-02-20 09:00:56'),
(96, 2, 4, '', 'Zzzzz', 0, 1, '2019-02-20 09:05:18', '2019-02-20 09:05:18'),
(97, 1, 4, '', 'Ini yang bener gimana gan ? #ultimate #4', 0, 1, '2019-02-20 09:05:29', '2019-02-20 09:05:29'),
(98, 2, 4, '', 'Ini nomor 5', 0, 1, '2019-02-20 09:09:17', '2019-02-20 09:09:17'),
(99, 1, 4, '', 'Ini yang bener gimana gan ? #ultimate #5', 0, 1, '2019-02-20 09:09:42', '2019-02-20 09:09:42'),
(100, 2, 5, '', 'Hidgqdvqid', 0, 1, '2019-02-20 09:14:09', '2019-02-20 09:14:09'),
(101, 1, 5, '', 'Ini yang bener gimana gan ? #ultimate #5', 0, 1, '2019-02-20 09:14:42', '2019-02-20 09:14:42'),
(102, 3, 2, '', 'saya bingung nomor #1', 85, 1, '2019-02-21 07:20:53', '2019-02-21 07:20:53'),
(103, 3, 2, '', 'kau ganteng mas', 85, 1, '2019-02-21 07:21:38', '2019-02-21 07:21:38'),
(104, 2, 27, '', 'Halo, ini maksudnya apa yah?', 0, 1, '2019-02-21 10:31:19', '2019-02-21 10:31:19'),
(105, 1, 1, '', 'halo', 0, 1, '2019-02-21 10:37:11', '2019-02-21 10:37:11'),
(106, 1, 1, '', 'Ini apa yah?', 0, 1, '2019-02-21 10:37:39', '2019-02-21 10:37:39'),
(107, 1, 1, '', 'aku pengen deh memahami kamu\n', 0, 1, '2019-02-21 10:39:10', '2019-02-21 10:39:10'),
(108, 1, 1, '', 'Iya aku juga', 107, 1, '2019-02-21 10:42:58', '2019-02-21 10:42:58'),
(109, 43, 3, '', 'aku mau tanya siapakah jodohku???!!!1', 0, 1, '2019-02-21 12:27:37', '2019-02-21 12:27:37'),
(110, 43, 3, '', 'test 123', 0, 1, '2019-02-21 12:29:20', '2019-02-21 12:29:20'),
(111, 43, 3, '', 'test 333333', 0, 1, '2019-02-21 12:29:48', '2019-02-21 12:29:48'),
(112, 43, 3, '', 'entahlah, biarkan waktu Yang menjawab', 109, 1, '2019-02-21 12:32:48', '2019-02-21 12:32:48'),
(113, 26, 3, '', 'Haloo', 111, 1, '2019-02-22 14:37:57', '2019-02-22 14:37:57'),
(114, 26, 3, '', 'Apa sih gunanya ini?', 0, 1, '2019-02-22 14:38:21', '2019-02-22 14:38:21'),
(115, 26, 2, '', 'Oh ya?', 85, 1, '2019-02-22 14:39:08', '2019-02-22 14:39:08'),
(116, 1, 4, '', 'Begini\n', 97, 1, '2019-02-23 09:32:48', '2019-02-23 09:32:48'),
(117, 1, 2, '', 'Tes', 84, 0, '2019-02-25 02:42:39', '2019-02-25 02:42:39'),
(118, 1, 1, '', 'Satu', 0, 1, '2019-02-25 03:38:57', '2019-02-25 03:38:57'),
(119, 48, 3, '', 'Tes arham ganteng', 0, 1, '2019-02-25 04:07:07', '2019-02-25 04:07:07'),
(120, 48, 3, '', 'Iya benar', 119, 1, '2019-02-25 04:11:29', '2019-02-25 04:11:29'),
(121, 48, 2, '', 'Tes 25 feb', 0, 1, '2019-02-25 05:33:57', '2019-02-25 05:33:57'),
(122, 48, 2, '', 'Ghg', 121, 1, '2019-02-25 05:34:20', '2019-02-25 05:34:20'),
(123, 48, 3, '', 'Test', 0, 1, '2019-02-25 06:17:34', '2019-02-25 06:17:34'),
(124, 48, 3, '', 'Bagusss', 123, 1, '2019-02-25 06:17:45', '2019-02-25 06:17:45'),
(125, 26, 2, '', 'Hello arham', 0, 0, '2019-02-25 09:42:16', '2019-02-25 09:42:16'),
(126, 52, 2, '', 'Omg', 125, 0, '2019-02-25 09:42:32', '2019-02-25 09:42:32'),
(127, 52, 2, '', 'Tes', 125, 0, '2019-02-26 02:59:46', '2019-02-26 02:59:46'),
(128, 52, 2, '', 'Apa yg salah dengan saya ?', 0, 0, '2019-02-26 03:00:15', '2019-02-26 03:00:15'),
(129, 52, 2, '', 'Kamu terlalu tampan bro', 128, 0, '2019-02-26 03:03:56', '2019-02-26 03:03:56');

-- --------------------------------------------------------

--
-- Table structure for table `guru_tab`
--

CREATE TABLE `guru_tab` (
  `guruid` int(10) NOT NULL,
  `fullname` varchar(150) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `medium` varchar(300) NOT NULL,
  `thumbnail` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guru_tab`
--

INSERT INTO `guru_tab` (`guruid`, `fullname`, `profile_picture`, `medium`, `thumbnail`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Nazril Ilham', 'https://developmentarkadmi.s3.amazonaws.com/1552638888590-pak_jojo.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552638888590-pak_jojo.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552638888590-pak_jojo.jpeg', 'Guru tampan', 1, '2019-01-31 00:00:00', '2019-03-15 15:34:49'),
(2, 'Ageng Kurnia', 'https://media.suara.com/pictures/653x366/2017/05/30/75225-ageng-kiwi.jpg', '', '', 'Guru Mantap Jiwa', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 'Andira Kuswono', 'https://i1.sndcdn.com/artworks-000159652494-l3qfj7-t500x500.jpg', '', '', 'Guru Idola', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 'Nurhadi Aldo', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', '', '', 'Guru Panutan', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(5, 'Tampan & Berani', 'https://vignette.wikia.nocookie.net/spongebob/images/f/f2/Oldbash.jpg/revision/latest?cb=20170724203516', '', '', 'Si Tampan dari bikini bottom', 1, '2019-02-26 12:41:14', '2019-02-26 12:41:14'),
(6, 'Spongebob', 'https://vignette.wikia.nocookie.net/spongebob/images/f/f2/Oldbash.jpg/revision/latest?cb=20170724203516', '', '', 'Si Tampan dari bikini bottom ulalal', 1, '2019-02-26 13:41:00', '2019-02-26 13:41:00'),
(7, 'Andi', 'asdsads', '', '', 'sadsadsad', 1, '2019-03-05 00:00:00', '2019-03-05 00:00:00'),
(8, 'Atun', 'link', '', '', 'adasd', 1, '2019-03-05 00:00:00', '2019-03-05 00:00:00'),
(9, 'Johannes Adi Purnama Putra', 'https://developmentarkadmi.s3.amazonaws.com/thumbnails/pak_jojo.jpeg', '', '', 'Have been involved in research and developments and designs of optical fiber cable and networks specification and engineering, hybrid fiber coax system, metro ethernet, IPTV system. Currently works on business research with main responsibility in the field of partnership and community development especially in the area of innovation and startups development and managing TELKOM\'s business incubator.', 1, '2019-03-05 00:00:00', '2019-03-05 00:00:00'),
(10, 'Ariel Peterpan', 'https://developmentarkadmi.s3.amazonaws.com/1552637071292-pak_jojo.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/medium-1552637071292-pak_jojo.jpeg', 'https://developmentarkadmi.s3.ap-southeast-1.amazonaws.com/thumbnail-1552637071292-pak_jojo.jpeg', 'Mantannya Luna Maya', 1, '2019-03-15 15:04:32', '2019-03-15 15:04:32');

-- --------------------------------------------------------

--
-- Table structure for table `notification_tab`
--

CREATE TABLE `notification_tab` (
  `notificationid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `message` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_tab`
--

INSERT INTO `notification_tab` (`notificationid`, `userid`, `message`, `status`, `created_at`, `updated_at`) VALUES
(3, 1, 'Selamat anda telah menyelesaikan semua materi BAB 1 pada class Express in an hour', 1, '2019-02-04 11:19:22', '2019-02-04 11:19:22'),
(4, 1, 'Materi Video Materi telah berhasil di download', 1, '2019-02-07 09:39:34', '2019-02-07 09:39:34'),
(5, 1, 'Selamat anda telah menyelesaikan semua materi BAB 2 pada class Express in an hour', 1, '2019-02-07 11:55:59', '2019-02-07 11:55:59'),
(6, 1, 'Selamat anda telah menyelesaikan semua materi BAB 3 pada class Express in an hour', 1, '2019-02-07 11:57:06', '2019-02-07 11:57:06'),
(7, 1, 'Selamat anda telah menyelesaikan semua materi BAB 4 pada class Express in an hour', 1, '2019-02-07 11:57:50', '2019-02-07 11:57:50'),
(8, 1, 'Selamat anda telah menyelesaikan semua materi BAB 5 pada class Express in an hour', 1, '2019-02-07 11:58:28', '2019-02-07 11:58:28'),
(9, 1, 'Selamat anda telah menyelesaikan semua materi BAB 6 pada class Express in an hour', 1, '2019-02-07 11:58:47', '2019-02-07 11:58:47'),
(10, 1, 'Selamat anda telah menyelesaikan semua materi BAB 7 pada class Express in an hour', 1, '2019-02-07 11:59:32', '2019-02-07 11:59:32'),
(11, 1, 'Selamat anda telah menyelesaikan semua materi BAB 8 pada class Express in an hour', 1, '2019-02-07 11:59:55', '2019-02-07 11:59:55'),
(12, 1, 'Selamat anda telah menyelesaikan semua materi BAB 9 pada class Express in an hour', 1, '2019-02-07 12:00:26', '2019-02-07 12:00:26'),
(13, 1, 'Selamat anda telah menyelesaikan semua materi undefined pada class undefined', 1, '2019-02-07 13:40:13', '2019-02-07 13:40:13'),
(14, 1, 'Selamat anda telah menyelesaikan semua materi pada class undefined', 1, '2019-02-07 13:46:52', '2019-02-07 13:46:52'),
(15, 1, 'Selamat anda telah menyelesaikan semua materi pada class Express in an hour', 1, '2019-02-07 13:47:57', '2019-02-07 13:47:57'),
(16, 1, 'Pertanyaan anda Telah Dibalas Oleh Gratcy Palma', 1, '2019-02-12 07:10:10', '2019-02-12 07:10:10'),
(17, 1, 'Pertanyaan anda Telah Dibalas Oleh Andra Nur', 1, '2019-02-12 07:10:21', '2019-02-12 07:10:21'),
(18, 2, 'Pertanyaan anda Telah Dibalas Oleh Nurhadi', 1, '2019-02-12 07:10:44', '2019-02-12 07:10:44'),
(19, 2, 'Selamat Anda Telah Bergabung di Kelas Menyanyi Tanpa Suara Bagus', 1, '2019-02-12 17:01:16', '2019-02-12 17:01:16'),
(20, 7, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-13 01:48:25', '2019-02-13 01:48:25'),
(21, 7, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-13 01:48:28', '2019-02-13 01:48:28'),
(22, 7, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-13 01:48:31', '2019-02-13 01:48:31'),
(23, 1, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-13 02:00:40', '2019-02-13 02:00:40'),
(24, 4, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-13 02:01:13', '2019-02-13 02:01:13'),
(25, 7, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-13 07:38:53', '2019-02-13 07:38:53'),
(26, 8, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-13 07:40:18', '2019-02-13 07:40:18'),
(27, 8, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-13 07:49:34', '2019-02-13 07:49:34'),
(28, 2, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-13 08:09:49', '2019-02-13 08:09:49'),
(29, 12, 'Selamat anda telah menyelesaikan semua materi null pada class null', 1, '2019-02-13 09:29:02', '2019-02-13 09:29:02'),
(30, 1, 'Selamat anda telah menyelesaikan semua materi pada class Menjadi Capres Idola', 1, '2019-02-14 02:44:22', '2019-02-14 02:44:22'),
(31, 2, 'Pertanyaan anda Telah Dibalas Oleh Nurhadi', 1, '2019-02-14 03:58:45', '2019-02-14 03:58:45'),
(32, 4, 'Pertanyaan anda Telah Dibalas Oleh Andra Nur', 1, '2019-02-14 04:01:13', '2019-02-14 04:01:13'),
(33, 4, 'Pertanyaan anda Telah Dibalas Oleh Gratcy Palma', 1, '2019-02-14 07:45:31', '2019-02-14 07:45:31'),
(34, 2, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-14 09:33:20', '2019-02-14 09:33:20'),
(35, 24, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-14 15:51:36', '2019-02-14 15:51:36'),
(36, 24, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-14 16:20:36', '2019-02-14 16:20:36'),
(37, 24, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-14 16:56:56', '2019-02-14 16:56:56'),
(38, 24, 'Selamat Anda Telah Bergabung di Kelas Belajar Memahami Kamu', 1, '2019-02-15 04:16:07', '2019-02-15 04:16:07'),
(39, 3, 'Selamat anda telah menyelesaikan semua materi pada class Menjadi Capres Idola Jilid 2', 1, '2019-02-15 13:14:11', '2019-02-15 13:14:11'),
(40, 1, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-18 09:53:11', '2019-02-18 09:53:11'),
(41, 1, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-18 10:02:04', '2019-02-18 10:02:04'),
(42, 1, 'Selamat Anda Telah Bergabung di Kelas Belajar Memahami Kamu', 1, '2019-02-19 02:51:00', '2019-02-19 02:51:00'),
(43, 27, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-19 03:44:26', '2019-02-19 03:44:26'),
(44, 1, 'Selamat Anda Telah Bergabung di Kelas Ternak lele sampai ke mars', 1, '2019-02-19 04:34:00', '2019-02-19 04:34:00'),
(45, 29, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-19 07:37:06', '2019-02-19 07:37:06'),
(46, 2, 'Pertanyaan anda Telah Dibalas Oleh Nurhadi', 1, '2019-02-19 08:09:35', '2019-02-19 08:09:35'),
(47, 1, 'Selamat Anda Telah Bergabung di Kelas Menyanyi Tanpa Suara Bagus', 1, '2019-02-19 17:58:24', '2019-02-19 17:58:24'),
(48, 29, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-20 01:44:00', '2019-02-20 01:44:00'),
(49, 29, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-20 01:44:42', '2019-02-20 01:44:42'),
(50, 29, 'Selamat Anda Telah Bergabung di Kelas Belajar Memahami Kamu', 1, '2019-02-20 01:45:27', '2019-02-20 01:45:27'),
(51, 2, 'Pertanyaan anda Telah Dibalas Oleh Nurhadi', 1, '2019-02-20 02:28:14', '2019-02-20 02:28:14'),
(52, 2, 'Pertanyaan anda Telah Dibalas Oleh Nurhadi', 1, '2019-02-20 02:31:07', '2019-02-20 02:31:07'),
(53, 1, 'Selamat anda telah menyelesaikan semua materi BAB 1 pada class Menjadi Capres Idola', 1, '2019-02-20 03:03:35', '2019-02-20 03:03:35'),
(54, 1, 'Selamat anda telah menyelesaikan semua materi BAB 2 pada class Menjadi Capres Idola', 1, '2019-02-20 03:15:26', '2019-02-20 03:15:26'),
(55, 2, 'Pertanyaan anda Telah Dibalas Oleh Nurhadi', 1, '2019-02-20 08:44:06', '2019-02-20 08:44:06'),
(56, 2, 'Pertanyaan anda Telah Dibalas Oleh Gratcy Palma', 1, '2019-02-20 08:47:46', '2019-02-20 08:47:46'),
(57, 1, 'Selamat Anda Telah Bergabung di Kelas Menyanyi Tanpa Suara Bagus Jili 2', 1, '2019-02-21 06:15:25', '2019-02-21 06:15:25'),
(58, 2, 'Pertanyaan anda Telah Dibalas Oleh Nurhadi', 1, '2019-02-21 07:20:53', '2019-02-21 07:20:53'),
(59, 2, 'Pertanyaan anda Telah Dibalas Oleh Nurhadi', 1, '2019-02-21 07:21:38', '2019-02-21 07:21:38'),
(60, 33, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-21 08:29:13', '2019-02-21 08:29:13'),
(61, 33, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-21 08:31:05', '2019-02-21 08:31:05'),
(62, 34, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-21 08:32:51', '2019-02-21 08:32:51'),
(63, 34, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-21 09:04:57', '2019-02-21 09:04:57'),
(64, 26, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-21 10:05:06', '2019-02-21 10:05:06'),
(65, 42, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-21 10:22:41', '2019-02-21 10:22:41'),
(66, 1, 'Pertanyaan anda Telah Dibalas Oleh Gratcy Palma', 1, '2019-02-21 10:42:58', '2019-02-21 10:42:58'),
(67, 43, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-21 11:51:00', '2019-02-21 11:51:00'),
(68, 43, 'Selamat Anda Telah Bergabung di Kelas Belajar Memahami Kamu', 1, '2019-02-21 11:51:44', '2019-02-21 11:51:44'),
(69, 43, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-21 11:58:14', '2019-02-21 11:58:14'),
(70, 43, 'Selamat Anda Telah Bergabung di Kelas Menyanyi Tanpa Suara Bagus', 1, '2019-02-21 11:58:28', '2019-02-21 11:58:28'),
(71, 43, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-21 12:26:38', '2019-02-21 12:26:38'),
(72, 43, 'Pertanyaan anda Telah Dibalas Oleh palma nih', 1, '2019-02-21 12:32:48', '2019-02-21 12:32:48'),
(73, 44, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-22 03:00:07', '2019-02-22 03:00:07'),
(74, 44, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-22 07:26:33', '2019-02-22 07:26:33'),
(75, 44, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-22 07:26:46', '2019-02-22 07:26:46'),
(76, 43, 'Selamat anda telah menyelesaikan semua materi BAB 7 pada class Menjadi Capres Idola', 1, '2019-02-22 08:09:24', '2019-02-22 08:09:24'),
(77, 45, 'Selamat Anda Telah Bergabung di Kelas Belajar Memahami Kamu', 1, '2019-02-22 08:40:02', '2019-02-22 08:40:02'),
(78, 45, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-22 08:41:42', '2019-02-22 08:41:42'),
(79, 45, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-22 08:49:27', '2019-02-22 08:49:27'),
(80, 45, 'Selamat Anda Telah Bergabung di Kelas Ternak lele sampai ke mars', 1, '2019-02-22 08:50:09', '2019-02-22 08:50:09'),
(81, 45, 'Selamat anda telah menyelesaikan semua materi BAB 8 pada class Menjadi Capres Idola', 1, '2019-02-22 08:55:06', '2019-02-22 08:55:06'),
(82, 45, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-22 13:44:40', '2019-02-22 13:44:40'),
(83, 43, 'Pertanyaan anda Telah Dibalas Oleh Tatas Fachrul', 1, '2019-02-22 14:37:57', '2019-02-22 14:37:57'),
(84, 26, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-22 14:38:53', '2019-02-22 14:38:53'),
(85, 2, 'Pertanyaan anda Telah Dibalas Oleh Tatas Fachrul', 1, '2019-02-22 14:39:08', '2019-02-22 14:39:08'),
(86, 1, 'Pertanyaan anda Telah Dibalas Oleh Gratcy Palma', 1, '2019-02-23 09:32:48', '2019-02-23 09:32:48'),
(87, 2, 'Pertanyaan anda Telah Dibalas Oleh Gratcy Palma', 1, '2019-02-25 02:42:39', '2019-02-25 02:42:39'),
(88, 46, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-25 03:36:31', '2019-02-25 03:36:31'),
(89, 48, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-25 03:56:39', '2019-02-25 03:56:39'),
(90, 48, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-25 04:01:11', '2019-02-25 04:01:11'),
(91, 48, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-25 04:01:17', '2019-02-25 04:01:17'),
(92, 48, 'Pertanyaan anda Telah Dibalas Oleh Rama', 1, '2019-02-25 04:11:29', '2019-02-25 04:11:29'),
(93, 49, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-25 04:13:48', '2019-02-25 04:13:48'),
(94, 48, 'Pertanyaan anda Telah Dibalas Oleh Rama', 1, '2019-02-25 05:34:20', '2019-02-25 05:34:20'),
(95, 48, 'Pertanyaan anda Telah Dibalas Oleh Rama', 1, '2019-02-25 06:17:45', '2019-02-25 06:17:45'),
(96, 48, 'Selamat anda telah menyelesaikan semua materi BAB 3 pada class Menjadi Capres Idola', 1, '2019-02-25 06:24:58', '2019-02-25 06:24:58'),
(97, 48, 'Selamat anda telah menyelesaikan semua materi BAB 5 pada class Menjadi Capres Idola', 1, '2019-02-25 06:27:33', '2019-02-25 06:27:33'),
(98, 48, 'Selamat anda telah menyelesaikan semua materi BAB 9 pada class Menjadi Capres Idola', 1, '2019-02-25 06:34:26', '2019-02-25 06:34:26'),
(99, 48, 'Selamat anda telah menyelesaikan semua materi BAB 6 pada class Menjadi Capres Idola', 1, '2019-02-25 06:39:22', '2019-02-25 06:39:22'),
(100, 48, 'Selamat anda telah menyelesaikan semua materi BAB 4 pada class Menjadi Capres Idola', 1, '2019-02-25 06:40:41', '2019-02-25 06:40:41'),
(101, 48, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-25 08:47:53', '2019-02-25 08:47:53'),
(102, 51, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-25 09:20:12', '2019-02-25 09:20:12'),
(103, 33, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-25 09:23:35', '2019-02-25 09:23:35'),
(104, 52, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-25 09:27:06', '2019-02-25 09:27:06'),
(105, 52, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-25 09:33:41', '2019-02-25 09:33:41'),
(106, 53, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-25 09:35:33', '2019-02-25 09:35:33'),
(107, 26, 'Pertanyaan anda Telah Dibalas Oleh Arham Awal Abiyan', 1, '2019-02-25 09:42:32', '2019-02-25 09:42:32'),
(108, 26, 'Pertanyaan anda Telah Dibalas Oleh Arham Awal Abiyan', 1, '2019-02-26 02:59:46', '2019-02-26 02:59:46'),
(109, 52, 'Pertanyaan anda Telah Dibalas Oleh Arham Awal Abiyan', 1, '2019-02-26 03:03:56', '2019-02-26 03:03:56'),
(110, 54, 'Selamat Anda Telah Bergabung di Kelas Belajar Memahami Kamu', 1, '2019-02-26 03:12:26', '2019-02-26 03:12:26'),
(111, 54, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola', 1, '2019-02-26 03:15:38', '2019-02-26 03:15:38'),
(112, 54, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-26 03:15:54', '2019-02-26 03:15:54');

-- --------------------------------------------------------

--
-- Table structure for table `users_assessment_tab`
--

CREATE TABLE `users_assessment_tab` (
  `id` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `detailassessmentid` int(10) NOT NULL,
  `parentid` int(10) NOT NULL,
  `answer` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_assessment_tab`
--

INSERT INTO `users_assessment_tab` (`id`, `userid`, `detailassessmentid`, `parentid`, `answer`, `is_correct`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '5', 0, 1, '2019-02-06 04:59:33', '2019-02-25 03:26:40'),
(2, 2, 1, 1, '2', 0, 1, '2019-02-21 11:23:53', '2019-02-21 11:23:53'),
(3, 43, 1, 1, '1', 1, 1, '2019-02-22 04:12:57', '2019-02-22 04:14:24'),
(4, 26, 1, 1, '3', 0, 1, '2019-02-22 14:39:26', '2019-02-25 08:16:29'),
(5, 26, 2, 1, '3', 0, 1, '2019-02-22 14:39:35', '2019-02-25 08:16:34'),
(6, 1, 2, 1, '2', 0, 1, '2019-02-25 03:24:10', '2019-02-25 03:26:49'),
(7, 46, 1, 1, '2', 0, 1, '2019-02-25 03:36:44', '2019-02-25 03:39:23'),
(8, 46, 2, 1, '3', 0, 1, '2019-02-25 03:36:47', '2019-02-25 03:39:25'),
(9, 33, 1, 1, '2', 0, 1, '2019-02-25 03:49:59', '2019-02-25 03:49:59'),
(10, 33, 2, 1, '2', 0, 1, '2019-02-25 03:50:01', '2019-02-25 03:50:01'),
(11, 48, 1, 1, '2', 0, 1, '2019-02-25 03:59:17', '2019-02-25 03:59:17'),
(12, 48, 2, 1, '3', 0, 1, '2019-02-25 03:59:18', '2019-02-25 03:59:18'),
(13, 50, 1, 1, '2', 0, 1, '2019-02-25 07:41:44', '2019-02-25 07:41:44'),
(14, 50, 2, 1, '2', 0, 1, '2019-02-25 07:41:52', '2019-02-25 07:41:59'),
(15, 51, 1, 1, '2', 0, 1, '2019-02-25 09:21:36', '2019-02-25 09:21:36'),
(16, 51, 2, 1, '5', 0, 1, '2019-02-25 09:21:38', '2019-02-25 09:21:38'),
(17, 52, 1, 1, '5', 0, 1, '2019-02-25 09:27:32', '2019-02-25 09:27:32'),
(18, 52, 2, 1, '3', 0, 1, '2019-02-25 09:27:51', '2019-02-25 09:27:53'),
(19, 53, 1, 1, '2', 0, 1, '2019-02-25 09:36:08', '2019-02-25 09:36:08'),
(20, 53, 2, 1, '3', 0, 1, '2019-02-25 09:36:11', '2019-02-25 09:36:11'),
(21, 54, 1, 1, '2', 0, 1, '2019-02-26 03:15:59', '2019-02-26 03:15:59'),
(22, 54, 2, 1, '2', 0, 1, '2019-02-26 03:16:02', '2019-02-26 03:16:02');

-- --------------------------------------------------------

--
-- Table structure for table `users_auth_tab`
--

CREATE TABLE `users_auth_tab` (
  `id` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `userid` int(10) NOT NULL,
  `verify_code` varchar(50) NOT NULL,
  `expired_at` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_auth_tab`
--

INSERT INTO `users_auth_tab` (`id`, `type`, `userid`, `verify_code`, `expired_at`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 6, '8896', '2019-02-12 19:03:08', 1, '2019-02-12 07:03:08', '2019-02-12 07:03:08'),
(2, 1, 7, '3025', '2019-02-13 04:27:53', 1, '2019-02-12 16:27:53', '2019-02-12 16:27:53'),
(3, 1, 8, '10744', '2019-02-13 05:31:27', 1, '2019-02-12 17:31:27', '2019-02-12 17:31:27'),
(4, 1, 9, '5686', '2019-02-13 05:32:33', 1, '2019-02-12 17:32:33', '2019-02-12 17:32:33'),
(5, 1, 10, '7351', '2019-02-13 13:49:43', 1, '2019-02-13 01:49:43', '2019-02-13 01:49:43'),
(6, 1, 11, '1159', '2019-02-13 13:49:59', 1, '2019-02-13 01:49:59', '2019-02-13 01:49:59'),
(7, 1, 12, '4563', '2019-02-13 14:24:36', 0, '2019-02-13 02:24:36', '2019-02-13 02:24:36'),
(8, 1, 13, '10150', '2019-02-13 16:58:41', 1, '2019-02-13 04:58:41', '2019-02-13 04:58:41'),
(9, 1, 14, '9293', '2019-02-13 16:59:12', 1, '2019-02-13 04:59:12', '2019-02-13 04:59:12'),
(10, 1, 15, '4421', '2019-02-13 17:02:49', 1, '2019-02-13 05:02:49', '2019-02-13 05:02:49'),
(11, 1, 16, '1140', '2019-02-13 17:04:26', 1, '2019-02-13 05:04:26', '2019-02-13 05:04:26'),
(12, 1, 17, '7759', '2019-02-13 17:06:20', 1, '2019-02-13 05:06:20', '2019-02-13 05:06:20'),
(13, 1, 18, '9353', '2019-02-13 17:14:10', 1, '2019-02-13 05:14:10', '2019-02-13 05:14:10'),
(14, 1, 19, '5975', '2019-02-13 17:14:52', 1, '2019-02-13 05:14:52', '2019-02-13 05:14:52'),
(15, 1, 20, '7634', '2019-02-13 17:37:42', 1, '2019-02-13 05:37:42', '2019-02-13 05:37:42'),
(16, 1, 21, '3828', '2019-02-13 17:38:18', 0, '2019-02-13 05:38:18', '2019-02-13 05:38:18'),
(17, 1, 22, '4962', '2019-02-13 17:45:07', 0, '2019-02-13 05:45:07', '2019-02-13 05:45:07'),
(18, 1, 7, '1562', '2019-02-13 17:51:43', 1, '2019-02-13 05:51:43', '2019-02-13 05:51:43'),
(19, 1, 7, '1094', '2019-02-13 17:51:45', 1, '2019-02-13 05:51:45', '2019-02-13 05:51:45'),
(20, 1, 7, '1449', '2019-02-13 17:51:46', 1, '2019-02-13 05:51:46', '2019-02-13 05:51:46'),
(21, 1, 23, '1371', '2019-02-13 18:58:11', 0, '2019-02-13 06:58:11', '2019-02-13 06:58:11'),
(22, 1, 7, '1974', '2019-02-13 19:32:33', 1, '2019-02-13 07:32:33', '2019-02-13 07:32:33'),
(23, 1, 7, '1119', '2019-02-13 19:32:36', 1, '2019-02-13 07:32:36', '2019-02-13 07:32:36'),
(24, 1, 7, '1587', '2019-02-13 19:32:38', 1, '2019-02-13 07:32:38', '2019-02-13 07:32:38'),
(25, 1, 7, '1453', '2019-02-13 19:32:56', 1, '2019-02-13 07:32:56', '2019-02-13 07:32:56'),
(26, 1, 24, '1293', '2019-02-13 20:09:05', 0, '2019-02-13 08:09:05', '2019-02-13 08:09:05'),
(27, 2, 7, '1345', '2019-02-13 21:24:54', 1, '2019-02-13 09:24:54', '2019-02-13 09:24:54'),
(28, 2, 24, '1892', '2019-02-14 18:56:20', 1, '2019-02-14 06:56:20', '2019-02-14 06:56:20'),
(29, 2, 24, '1666', '2019-02-14 19:02:45', 1, '2019-02-14 07:02:45', '2019-02-14 07:02:45'),
(30, 2, 24, '1098', '2019-02-14 19:05:39', 1, '2019-02-14 07:05:39', '2019-02-14 07:05:39'),
(31, 2, 24, '1655', '2019-02-14 19:09:58', 1, '2019-02-14 07:09:58', '2019-02-14 07:09:58'),
(32, 2, 24, '1165', '2019-02-14 19:14:21', 1, '2019-02-14 07:14:21', '2019-02-14 07:14:21'),
(33, 2, 24, '1224', '2019-02-14 19:17:07', 1, '2019-02-14 07:17:07', '2019-02-14 07:17:07'),
(34, 2, 24, '1661', '2019-02-14 19:32:44', 1, '2019-02-14 07:32:44', '2019-02-14 07:32:44'),
(35, 2, 24, '1852', '2019-02-14 19:34:17', 1, '2019-02-14 07:34:17', '2019-02-14 07:34:17'),
(36, 2, 24, '1162', '2019-02-14 19:35:23', 1, '2019-02-14 07:35:23', '2019-02-14 07:35:23'),
(37, 2, 24, '1746', '2019-02-14 19:36:07', 1, '2019-02-14 07:36:07', '2019-02-14 07:36:07'),
(38, 2, 24, '1251', '2019-02-14 19:58:45', 1, '2019-02-14 07:58:45', '2019-02-14 07:58:45'),
(39, 2, 24, '1496', '2019-02-14 20:03:25', 1, '2019-02-14 08:03:25', '2019-02-14 08:03:25'),
(40, 2, 24, '1268', '2019-02-14 20:07:13', 1, '2019-02-14 08:07:13', '2019-02-14 08:07:13'),
(41, 2, 24, '1698', '2019-02-14 20:10:22', 0, '2019-02-14 08:10:22', '2019-02-14 08:10:22'),
(42, 2, 24, '1222', '2019-02-14 20:22:31', 1, '2019-02-14 08:22:31', '2019-02-14 08:22:31'),
(43, 2, 24, '1618', '2019-02-14 20:34:28', 0, '2019-02-14 08:34:28', '2019-02-14 08:34:28'),
(44, 2, 24, '1075', '2019-02-14 20:48:03', 1, '2019-02-14 08:48:03', '2019-02-14 08:48:03'),
(45, 2, 24, '1230', '2019-02-14 20:57:40', 1, '2019-02-14 08:57:40', '2019-02-14 08:57:40'),
(46, 2, 24, '1807', '2019-02-14 21:20:02', 0, '2019-02-14 09:20:02', '2019-02-14 09:20:02'),
(47, 2, 24, '1339', '2019-02-14 21:25:14', 1, '2019-02-14 09:25:14', '2019-02-14 09:25:14'),
(48, 2, 24, '1452', '2019-02-14 21:29:13', 0, '2019-02-14 09:29:13', '2019-02-14 09:29:13'),
(49, 2, 24, '1566', '2019-02-14 21:31:05', 0, '2019-02-14 09:31:05', '2019-02-14 09:31:05'),
(50, 2, 10, '1241', '2019-02-14 21:31:09', 0, '2019-02-14 09:31:09', '2019-02-14 09:31:09'),
(51, 2, 24, '1239', '2019-02-14 21:37:25', 0, '2019-02-14 09:37:25', '2019-02-14 09:37:25'),
(52, 2, 24, '1044', '2019-02-14 21:38:36', 1, '2019-02-14 09:38:36', '2019-02-14 09:38:36'),
(53, 2, 24, '1063', '2019-02-14 21:38:56', 0, '2019-02-14 09:38:56', '2019-02-14 09:38:56'),
(54, 2, 24, '1514', '2019-02-14 22:08:55', 1, '2019-02-14 10:08:55', '2019-02-14 10:08:55'),
(55, 2, 24, '1977', '2019-02-14 22:11:56', 1, '2019-02-14 10:11:56', '2019-02-14 10:11:56'),
(56, 2, 24, '1144', '2019-02-14 22:12:23', 0, '2019-02-14 10:12:23', '2019-02-14 10:12:23'),
(57, 1, 25, '1784', '2019-02-19 15:52:06', 0, '2019-02-19 03:52:06', '2019-02-19 03:52:06'),
(58, 1, 26, '1061', '2019-02-19 16:00:20', 1, '2019-02-19 04:00:20', '2019-02-19 04:00:20'),
(59, 1, 27, '1073', '2019-02-19 17:01:46', 1, '2019-02-19 05:01:46', '2019-02-19 05:01:46'),
(60, 1, 28, '1690', '2019-02-19 17:03:21', 1, '2019-02-19 05:03:21', '2019-02-19 05:03:21'),
(61, 1, 29, '1928', '2019-02-19 19:35:52', 1, '2019-02-19 07:35:52', '2019-02-19 07:35:52'),
(62, 1, 30, '1940', '2019-02-21 15:55:48', 0, '2019-02-21 03:55:48', '2019-02-21 03:55:48'),
(63, 1, 31, '1281', '2019-02-21 16:20:46', 0, '2019-02-21 04:20:46', '2019-02-21 04:20:46'),
(64, 1, 32, '1472', '2019-02-21 18:38:43', 1, '2019-02-21 06:38:43', '2019-02-21 06:38:43'),
(65, 1, 7, '1158', '2019-02-21 18:44:14', 1, '2019-02-21 06:44:14', '2019-02-21 06:44:14'),
(66, 1, 7, '1246', '2019-02-21 18:44:17', 1, '2019-02-21 06:44:17', '2019-02-21 06:44:17'),
(67, 1, 7, '1926', '2019-02-21 18:44:39', 1, '2019-02-21 06:44:39', '2019-02-21 06:44:39'),
(68, 1, 7, '1736', '2019-02-21 18:44:41', 1, '2019-02-21 06:44:41', '2019-02-21 06:44:41'),
(69, 1, 33, '1270', '2019-02-21 20:26:18', 1, '2019-02-21 08:26:18', '2019-02-21 08:26:18'),
(70, 1, 34, '1103', '2019-02-21 20:32:15', 1, '2019-02-21 08:32:15', '2019-02-21 08:32:15'),
(71, 1, 35, '1277', '2019-02-21 21:01:48', 1, '2019-02-21 09:01:48', '2019-02-21 09:01:48'),
(72, 1, 35, '1166', '2019-02-21 21:09:15', 1, '2019-02-21 09:09:15', '2019-02-21 09:09:15'),
(73, 1, 7, '1922', '2019-02-21 21:13:27', 1, '2019-02-21 09:13:27', '2019-02-21 09:13:27'),
(74, 1, 36, '1099', '2019-02-21 21:13:38', 0, '2019-02-21 09:13:38', '2019-02-21 09:13:38'),
(75, 1, 37, '1047', '2019-02-21 21:15:25', 1, '2019-02-21 09:15:25', '2019-02-21 09:15:25'),
(76, 1, 35, '1112', '2019-02-21 21:30:16', 1, '2019-02-21 09:30:16', '2019-02-21 09:30:16'),
(77, 1, 35, '1021', '2019-02-21 21:30:39', 0, '2019-02-21 09:30:39', '2019-02-21 09:30:39'),
(78, 1, 38, '1177', '2019-02-21 21:45:44', 0, '2019-02-21 09:45:44', '2019-02-21 09:45:44'),
(79, 1, 39, '1824', '2019-02-21 22:03:01', 0, '2019-02-21 10:03:01', '2019-02-21 10:03:01'),
(80, 1, 40, '1003', '2019-02-21 22:07:44', 1, '2019-02-21 10:07:44', '2019-02-21 10:07:44'),
(81, 1, 41, '1612', '2019-02-21 22:08:11', 1, '2019-02-21 10:08:11', '2019-02-21 10:08:11'),
(82, 1, 42, '1800', '2019-02-21 22:19:19', 0, '2019-02-21 10:19:19', '2019-02-21 10:19:19'),
(83, 1, 43, '1896', '2019-02-21 23:01:07', 0, '2019-02-21 11:01:07', '2019-02-21 11:01:07'),
(84, 1, 44, '1814', '2019-02-22 14:55:46', 0, '2019-02-22 02:55:46', '2019-02-22 02:55:46'),
(85, 1, 45, '1496', '2019-02-22 20:26:25', 1, '2019-02-22 08:26:25', '2019-02-22 08:26:25'),
(86, 1, 45, '1226', '2019-02-22 20:27:05', 0, '2019-02-22 08:27:05', '2019-02-22 08:27:05'),
(87, 1, 46, '1481', '2019-02-25 15:35:05', 0, '2019-02-25 03:35:05', '2019-02-25 03:35:05'),
(88, 1, 47, '1285', '2019-02-25 15:48:10', 1, '2019-02-25 03:48:10', '2019-02-25 03:48:10'),
(89, 1, 48, '1298', '2019-02-25 15:55:46', 0, '2019-02-25 03:55:46', '2019-02-25 03:55:46'),
(90, 1, 49, '1844', '2019-02-25 16:12:36', 1, '2019-02-25 04:12:36', '2019-02-25 04:12:36'),
(91, 1, 50, '1365', '2019-02-25 19:00:59', 0, '2019-02-25 07:00:59', '2019-02-25 07:00:59'),
(92, 1, 51, '1672', '2019-02-25 21:19:15', 0, '2019-02-25 09:19:15', '2019-02-25 09:19:15'),
(93, 1, 52, '1716', '2019-02-25 21:26:22', 0, '2019-02-25 09:26:22', '2019-02-25 09:26:22'),
(94, 1, 53, '1262', '2019-02-25 21:34:26', 0, '2019-02-25 09:34:26', '2019-02-25 09:34:26'),
(95, 2, 27, '1877', '2019-02-26 15:06:42', 1, '2019-02-26 03:06:42', '2019-02-26 03:06:42'),
(96, 2, 27, '1430', '2019-02-26 15:07:39', 1, '2019-02-26 03:07:39', '2019-02-26 03:07:39'),
(97, 2, 52, '1582', '2019-02-26 15:08:12', 1, '2019-02-26 03:08:12', '2019-02-26 03:08:12'),
(98, 1, 54, '1624', '2019-02-26 15:12:00', 0, '2019-02-26 03:12:00', '2019-02-26 03:12:00'),
(99, 2, 52, '1313', '2019-02-26 15:12:16', 1, '2019-02-26 03:12:16', '2019-02-26 03:12:16'),
(100, 2, 52, '1610', '2019-02-26 15:13:25', 1, '2019-02-26 03:13:25', '2019-02-26 03:13:25'),
(101, 2, 52, '1000', '2019-02-26 15:14:03', 1, '2019-02-26 03:14:03', '2019-02-26 03:14:03'),
(102, 2, 52, '1590', '2019-02-26 15:14:57', 1, '2019-02-26 03:14:57', '2019-02-26 03:14:57'),
(103, 2, 52, '1038', '2019-02-26 15:15:31', 1, '2019-02-26 03:15:31', '2019-02-26 03:15:31'),
(104, 2, 52, '1624', '2019-02-26 15:15:34', 1, '2019-02-26 03:15:34', '2019-02-26 03:15:34');

-- --------------------------------------------------------

--
-- Table structure for table `users_classes_tab`
--

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

--
-- Dumping data for table `users_classes_tab`
--

INSERT INTO `users_classes_tab` (`id`, `userid`, `classid`, `score`, `finished_at`, `is_completed`, `certificate`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 0, '2019-02-20 13:51:42', 1, 'Selamat', 0, '2019-01-31 00:00:00', '2019-02-20 13:51:42'),
(2, 1, 3, 0, '2019-02-21 06:31:09', 1, 'Selamat', 0, '2019-01-31 00:00:00', '2019-02-21 06:31:09'),
(3, 2, 5, 0, '2019-01-02 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-17 00:00:00'),
(4, 3, 4, 0, '2019-02-15 13:14:11', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-02-15 13:14:11'),
(5, 3, 6, 0, '2019-01-02 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-17 00:00:00'),
(6, 2, 2, 0, '2019-02-15 10:26:24', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-02-15 10:26:24'),
(7, 3, 2, 0, '2019-02-15 13:13:46', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-02-15 13:13:46'),
(0, 2, 5, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-12 17:01:16', '2019-02-21 08:35:54'),
(0, 7, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 01:48:25', '2019-02-21 08:35:54'),
(0, 7, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 01:48:28', '2019-02-21 08:35:54'),
(0, 7, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 01:48:31', '2019-02-21 08:35:54'),
(0, 1, 2, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 02:00:40', '2019-02-21 08:35:54'),
(0, 4, 2, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 02:01:13', '2019-02-21 08:35:54'),
(0, 7, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 07:38:53', '2019-02-21 08:35:54'),
(0, 8, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 07:40:18', '2019-02-21 08:35:54'),
(0, 8, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 07:49:34', '2019-02-21 08:35:54'),
(0, 2, 3, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-13 08:09:49', '2019-02-21 08:35:54'),
(0, 2, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-14 09:33:20', '2019-02-21 08:35:54'),
(0, 24, 3, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-14 15:51:36', '2019-02-21 08:35:54'),
(0, 24, 2, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-14 16:20:36', '2019-02-21 08:35:54'),
(0, 24, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-14 16:56:56', '2019-02-21 08:35:54'),
(0, 24, 1, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-15 04:16:07', '2019-02-21 08:35:54'),
(0, 1, 3, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-18 09:53:11', '2019-02-21 08:35:54'),
(0, 1, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-18 10:02:04', '2019-02-21 08:35:54'),
(0, 1, 1, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-19 02:51:00', '2019-02-21 08:35:54'),
(0, 27, 2, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-19 03:44:26', '2019-02-21 08:35:54'),
(0, 1, 7, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-19 04:34:00', '2019-02-21 08:35:54'),
(0, 29, 2, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-19 07:37:06', '2019-02-21 08:35:54'),
(0, 1, 5, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-19 17:58:24', '2019-02-21 08:35:54'),
(0, 29, 4, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-20 01:44:00', '2019-02-21 08:35:54'),
(0, 29, 3, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-20 01:44:42', '2019-02-21 08:35:54'),
(0, 29, 1, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-20 01:45:27', '2019-02-21 08:35:54'),
(0, 1, 6, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-21 06:15:25', '2019-02-21 08:35:54'),
(0, 33, 3, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-21 08:29:13', '2019-02-21 08:35:54'),
(0, 33, 2, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-21 08:31:04', '2019-02-21 08:35:54'),
(0, 34, 3, 0, '2019-02-21 08:35:54', 1, '', 1, '2019-02-21 08:32:51', '2019-02-21 08:35:54'),
(0, 34, 2, 0, '2019-02-21 09:04:57', 0, '', 1, '2019-02-21 09:04:57', '2019-02-21 09:04:57'),
(0, 26, 3, 0, '2019-02-21 10:05:06', 0, '', 1, '2019-02-21 10:05:06', '2019-02-21 10:05:06'),
(0, 42, 2, 0, '2019-02-21 10:22:41', 0, '', 1, '2019-02-21 10:22:41', '2019-02-21 10:22:41'),
(0, 43, 2, 0, '2019-02-21 11:51:00', 0, '', 1, '2019-02-21 11:51:00', '2019-02-21 11:51:00'),
(0, 43, 1, 0, '2019-02-21 11:51:44', 0, '', 1, '2019-02-21 11:51:44', '2019-02-21 11:51:44'),
(0, 43, 3, 0, '2019-02-21 11:58:14', 0, '', 1, '2019-02-21 11:58:14', '2019-02-21 11:58:14'),
(0, 43, 5, 0, '2019-02-21 11:58:28', 0, '', 1, '2019-02-21 11:58:28', '2019-02-21 11:58:28'),
(0, 43, 4, 0, '2019-02-21 12:26:38', 0, '', 1, '2019-02-21 12:26:38', '2019-02-21 12:26:38'),
(0, 44, 2, 0, '2019-02-22 03:00:07', 0, '', 1, '2019-02-22 03:00:07', '2019-02-22 03:00:07'),
(0, 44, 3, 0, '2019-02-22 07:26:33', 0, '', 1, '2019-02-22 07:26:33', '2019-02-22 07:26:33'),
(0, 44, 4, 0, '2019-02-22 07:26:46', 0, '', 1, '2019-02-22 07:26:46', '2019-02-22 07:26:46'),
(0, 45, 1, 0, '2019-02-22 08:40:02', 0, '', 1, '2019-02-22 08:40:02', '2019-02-22 08:40:02'),
(0, 45, 3, 0, '2019-02-22 08:41:42', 0, '', 1, '2019-02-22 08:41:42', '2019-02-22 08:41:42'),
(0, 45, 2, 0, '2019-02-22 08:49:27', 0, '', 1, '2019-02-22 08:49:27', '2019-02-22 08:49:27'),
(0, 45, 7, 0, '2019-02-22 08:50:09', 0, '', 1, '2019-02-22 08:50:09', '2019-02-22 08:50:09'),
(0, 45, 4, 0, '2019-02-22 13:44:40', 0, '', 1, '2019-02-22 13:44:40', '2019-02-22 13:44:40'),
(0, 26, 2, 0, '2019-02-22 14:38:53', 0, '', 1, '2019-02-22 14:38:53', '2019-02-22 14:38:53'),
(0, 46, 2, 0, '2019-02-25 03:36:31', 0, '', 1, '2019-02-25 03:36:31', '2019-02-25 03:36:31'),
(0, 48, 2, 0, '2019-02-25 03:56:39', 0, '', 1, '2019-02-25 03:56:39', '2019-02-25 03:56:39'),
(0, 48, 3, 0, '2019-02-25 04:01:11', 0, '', 1, '2019-02-25 04:01:11', '2019-02-25 04:01:11'),
(0, 48, 3, 0, '2019-02-25 04:01:17', 0, '', 1, '2019-02-25 04:01:17', '2019-02-25 04:01:17'),
(0, 49, 2, 0, '2019-02-25 04:13:48', 0, '', 1, '2019-02-25 04:13:48', '2019-02-25 04:13:48'),
(0, 48, 4, 0, '2019-02-25 08:47:53', 0, '', 1, '2019-02-25 08:47:53', '2019-02-25 08:47:53'),
(0, 51, 2, 0, '2019-02-25 09:20:12', 0, '', 1, '2019-02-25 09:20:12', '2019-02-25 09:20:12'),
(0, 33, 4, 0, '2019-02-25 09:23:35', 0, '', 1, '2019-02-25 09:23:35', '2019-02-25 09:23:35'),
(0, 52, 2, 0, '2019-02-25 09:27:06', 0, '', 1, '2019-02-25 09:27:06', '2019-02-25 09:27:06'),
(0, 52, 3, 0, '2019-02-25 09:33:41', 0, '', 1, '2019-02-25 09:33:41', '2019-02-25 09:33:41'),
(0, 53, 2, 0, '2019-02-25 09:35:33', 0, '', 1, '2019-02-25 09:35:33', '2019-02-25 09:35:33'),
(0, 54, 1, 0, '2019-02-26 03:12:26', 0, '', 1, '2019-02-26 03:12:26', '2019-02-26 03:12:26'),
(0, 54, 3, 0, '2019-02-26 03:15:38', 0, '', 1, '2019-02-26 03:15:38', '2019-02-26 03:15:38'),
(0, 54, 2, 0, '2019-02-26 03:15:54', 0, '', 1, '2019-02-26 03:15:54', '2019-02-26 03:15:54');

-- --------------------------------------------------------

--
-- Table structure for table `users_course_detail_tab`
--

CREATE TABLE `users_course_detail_tab` (
  `id` int(10) NOT NULL,
  `userid` int(10) DEFAULT NULL,
  `detailid` int(10) DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_done_watching` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_course_detail_tab`
--

INSERT INTO `users_course_detail_tab` (`id`, `userid`, `detailid`, `is_completed`, `created_at`, `updated_at`, `is_done_watching`) VALUES
(15, 1, 1, 1, '2019-01-31 17:09:09', '2019-01-31 17:09:09', 1),
(16, 1, 2, 1, '2019-01-31 17:14:52', '2019-01-31 17:14:52', 1),
(17, 1, 9, 1, '2019-02-07 13:01:46', '2019-02-07 13:01:46', 1),
(18, 1, 3, 1, '2019-02-07 13:20:46', '2019-02-07 13:20:46', 1),
(19, 1, 4, 1, '2019-02-07 13:24:07', '2019-02-07 13:24:07', 1),
(20, 1, 5, 1, '2019-02-07 13:24:46', '2019-02-07 13:24:46', 1),
(21, 1, 6, 1, '2019-02-07 13:25:51', '2019-02-07 13:25:51', 1),
(22, 1, 7, 1, '2019-02-07 13:26:46', '2019-02-07 13:26:46', 1),
(23, 1, 8, 1, '2019-02-07 13:28:23', '2019-02-07 13:28:23', 1),
(24, 12, 0, 1, '2019-02-13 09:29:02', '2019-02-13 09:29:02', 1),
(25, 24, 3, 1, '2019-02-14 02:52:37', '2019-02-14 02:52:37', 1),
(26, 1, 10, 1, '2019-02-20 03:03:35', '2019-02-20 03:03:35', 1),
(27, 1, 11, 1, '2019-02-20 03:15:26', '2019-02-20 03:15:26', 1),
(28, 43, 16, 1, '2019-02-22 08:09:24', '2019-02-22 08:09:24', 1),
(29, 45, 17, 1, '2019-02-22 08:55:06', '2019-02-22 08:55:06', 1),
(30, 48, 1, 1, '2019-02-25 11:23:00', '2019-02-25 11:23:00', 1),
(31, 33, 10, 1, '2019-02-25 04:31:42', '2019-02-25 04:31:42', 1),
(32, 33, 11, 1, '2019-02-25 04:36:58', '2019-02-25 04:36:58', 1),
(33, 48, 17, 1, '2019-02-25 05:11:53', '2019-02-25 05:11:53', 1),
(34, 48, 12, 1, '2019-02-25 06:24:58', '2019-02-25 06:24:58', 1),
(35, 48, 14, 1, '2019-02-25 06:27:33', '2019-02-25 06:27:33', 1),
(36, 48, 18, 1, '2019-02-25 06:34:26', '2019-02-25 06:34:26', 1),
(37, 48, 15, 1, '2019-02-25 06:39:22', '2019-02-25 06:39:22', 1),
(38, 48, 13, 1, '2019-02-25 06:40:41', '2019-02-25 06:40:41', 1),
(39, 48, 2, 1, '2019-02-25 07:57:19', '2019-02-25 07:57:19', 1),
(40, 48, 3, 1, '2019-02-25 08:44:53', '2019-02-25 08:44:53', 1),
(41, 33, 1, 1, '2019-02-25 09:17:06', '2019-02-25 09:17:06', 1),
(42, 51, 2, 1, '2019-02-25 09:23:45', '2019-02-25 09:23:45', 1),
(43, 52, 1, 1, '2019-02-26 02:47:24', '2019-02-26 02:47:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_course_tab`
--

CREATE TABLE `users_course_tab` (
  `id` int(11) NOT NULL,
  `userid` int(10) DEFAULT NULL,
  `courseid` int(10) DEFAULT NULL,
  `babprogress` int(3) DEFAULT NULL,
  `babtotal` int(3) DEFAULT NULL,
  `is_completed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_material_progress_tab`
--

CREATE TABLE `users_material_progress_tab` (
  `id` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `materialid` int(10) NOT NULL,
  `watchingduration` int(10) NOT NULL,
  `is_done_watching` tinyint(1) NOT NULL DEFAULT '0',
  `is_downloaded` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_material_progress_tab`
--

INSERT INTO `users_material_progress_tab` (`id`, `userid`, `materialid`, `watchingduration`, `is_done_watching`, `is_downloaded`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 90, 1, 1, 1, '2019-01-29 03:45:49', '2019-02-17 23:00:34'),
(2, 1, 2, 90, 1, 1, 1, '2019-01-29 03:45:49', '2019-02-20 13:43:35'),
(3, 1, 3, 90, 1, 1, 1, '2019-01-29 03:45:49', '2019-02-20 13:43:48'),
(4, 1, 4, 90, 1, 1, 1, '2019-01-29 03:45:49', '2019-02-20 13:51:42'),
(5, 1, 7, 0, 1, 1, 1, '2019-01-29 13:19:51', '2019-02-07 11:56:09'),
(6, 1, 5, 0, 1, 0, 1, '2019-01-31 17:14:44', '2019-02-07 13:16:33'),
(7, 1, 6, 0, 1, 0, 1, '2019-01-31 17:14:48', '2019-02-07 11:56:05'),
(8, 1, 8, 0, 1, 0, 1, '2019-01-31 17:14:50', '2019-02-07 11:56:12'),
(9, 1, 9, 0, 1, 0, 1, '2019-01-31 17:14:52', '2019-02-07 11:56:14'),
(10, 1, 10, 0, 1, 0, 1, '2019-02-01 10:26:47', '2019-02-07 13:22:04'),
(11, 1, 11, 0, 1, 0, 1, '2019-02-01 10:34:42', '2019-02-07 11:56:44'),
(12, 1, 12, 0, 1, 0, 1, '2019-02-07 11:56:46', '2019-02-07 11:56:46'),
(13, 1, 13, 0, 1, 0, 1, '2019-02-07 11:56:48', '2019-02-07 11:56:48'),
(14, 1, 14, 0, 1, 0, 1, '2019-02-07 11:57:01', '2019-02-07 11:57:01'),
(15, 1, 15, 0, 1, 0, 1, '2019-02-07 11:57:03', '2019-02-07 11:57:03'),
(16, 1, 16, 0, 1, 0, 1, '2019-02-07 11:57:06', '2019-02-07 11:57:06'),
(17, 1, 17, 0, 1, 0, 1, '2019-02-07 11:57:32', '2019-02-07 11:57:32'),
(18, 1, 18, 0, 1, 0, 1, '2019-02-07 11:57:34', '2019-02-07 11:57:34'),
(19, 1, 19, 0, 1, 0, 1, '2019-02-07 11:57:37', '2019-02-07 11:57:37'),
(20, 1, 120, 0, 1, 0, 1, '2019-02-07 11:57:39', '2019-02-07 11:57:39'),
(21, 1, 20, 0, 1, 0, 1, '2019-02-07 11:57:42', '2019-02-07 11:57:42'),
(22, 1, 21, 0, 1, 0, 1, '2019-02-07 11:57:45', '2019-02-07 11:57:45'),
(23, 1, 22, 0, 1, 0, 1, '2019-02-07 11:57:46', '2019-02-07 11:57:46'),
(24, 1, 23, 0, 1, 0, 1, '2019-02-07 11:57:48', '2019-02-07 11:57:48'),
(25, 1, 24, 0, 1, 0, 1, '2019-02-07 11:57:50', '2019-02-07 13:24:07'),
(26, 1, 25, 0, 1, 0, 1, '2019-02-07 11:58:14', '2019-02-07 13:24:45'),
(27, 1, 26, 0, 1, 0, 1, '2019-02-07 11:58:16', '2019-02-07 11:58:16'),
(28, 1, 27, 0, 1, 0, 1, '2019-02-07 11:58:18', '2019-02-07 11:58:18'),
(29, 1, 28, 0, 1, 0, 1, '2019-02-07 11:58:20', '2019-02-07 11:58:20'),
(30, 1, 29, 0, 1, 0, 1, '2019-02-07 11:58:21', '2019-02-07 11:58:21'),
(31, 1, 30, 0, 1, 0, 1, '2019-02-07 11:58:25', '2019-02-07 11:58:25'),
(32, 1, 31, 0, 0, 0, 1, '2019-02-07 11:58:28', '2019-02-13 09:27:31'),
(33, 1, 32, 0, 1, 0, 1, '2019-02-07 11:58:38', '2019-02-07 11:58:38'),
(34, 1, 33, 0, 1, 0, 1, '2019-02-07 11:58:40', '2019-02-07 11:58:40'),
(35, 1, 34, 0, 1, 0, 1, '2019-02-07 11:58:41', '2019-02-07 11:58:41'),
(36, 1, 35, 0, 1, 0, 1, '2019-02-07 11:58:44', '2019-02-07 11:58:44'),
(37, 1, 36, 0, 1, 0, 1, '2019-02-07 11:58:45', '2019-02-07 13:25:51'),
(38, 1, 37, 0, 1, 0, 1, '2019-02-07 11:58:47', '2019-02-07 11:58:47'),
(39, 1, 38, 0, 1, 0, 1, '2019-02-07 11:59:22', '2019-02-07 11:59:22'),
(40, 1, 39, 0, 1, 0, 1, '2019-02-07 11:59:24', '2019-02-07 11:59:24'),
(41, 1, 40, 0, 1, 0, 1, '2019-02-07 11:59:26', '2019-02-07 11:59:26'),
(42, 1, 41, 0, 1, 0, 1, '2019-02-07 11:59:28', '2019-02-07 11:59:28'),
(43, 1, 42, 0, 1, 0, 1, '2019-02-07 11:59:29', '2019-02-07 11:59:29'),
(44, 1, 43, 0, 1, 0, 1, '2019-02-07 11:59:32', '2019-02-07 13:26:46'),
(45, 1, 44, 0, 1, 0, 1, '2019-02-07 11:59:51', '2019-02-07 11:59:51'),
(46, 1, 45, 0, 1, 0, 1, '2019-02-07 11:59:52', '2019-02-07 11:59:52'),
(47, 1, 46, 0, 0, 0, 1, '2019-02-07 11:59:54', '2019-02-15 13:26:30'),
(48, 1, 47, 0, 1, 0, 1, '2019-02-07 11:59:55', '2019-02-07 11:59:55'),
(49, 1, 48, 0, 1, 0, 1, '2019-02-07 12:00:18', '2019-02-07 12:00:18'),
(50, 1, 49, 0, 1, 0, 1, '2019-02-07 12:00:20', '2019-02-07 13:04:00'),
(51, 1, 50, 0, 1, 0, 1, '2019-02-07 12:00:26', '2019-02-07 12:06:49'),
(52, 12, 1, 0, 0, 0, 1, '2019-02-13 09:29:02', '2019-02-13 09:29:02'),
(53, 24, 12, 0, 1, 0, 1, '2019-02-14 02:52:37', '2019-02-14 02:56:10'),
(54, 24, 161, 0, 1, 0, 1, '2019-02-14 03:02:57', '2019-02-14 03:02:57'),
(55, 24, 51, 0, 1, 0, 1, '2019-02-14 03:03:39', '2019-02-14 03:03:39'),
(56, 24, 52, 0, 1, 0, 1, '2019-02-14 03:05:39', '2019-02-14 03:06:01'),
(57, 24, 2, 0, 1, 0, 1, '2019-02-14 03:06:54', '2019-02-14 03:07:02'),
(58, 24, 162, 0, 1, 0, 1, '2019-02-14 16:44:24', '2019-02-14 16:44:30'),
(59, 24, 163, 0, 1, 0, 1, '2019-02-14 16:44:46', '2019-02-14 16:44:53'),
(60, 2, 46, 0, 1, 0, 1, '2019-02-15 03:20:14', '2019-02-15 10:26:24'),
(61, 3, 46, 0, 1, 0, 1, '2019-02-15 10:26:29', '2019-02-15 13:14:11'),
(62, 4, 46, 0, 1, 0, 1, '2019-02-15 13:14:14', '2019-02-15 13:14:14'),
(63, 5, 46, 0, 1, 0, 1, '2019-02-15 13:14:25', '2019-02-15 13:14:25'),
(64, 1, 167, 0, 1, 0, 1, '2019-02-19 06:40:03', '2019-02-19 06:40:07'),
(65, 29, 162, 0, 1, 0, 1, '2019-02-20 02:56:14', '2019-02-20 02:56:14'),
(66, 1, 51, 0, 1, 0, 1, '2019-02-20 03:02:07', '2019-02-20 03:02:07'),
(67, 1, 52, 0, 1, 0, 1, '2019-02-20 03:03:35', '2019-02-20 03:03:35'),
(68, 1, 53, 0, 1, 0, 1, '2019-02-20 03:03:41', '2019-02-20 03:03:41'),
(69, 1, 54, 0, 1, 0, 1, '2019-02-20 03:04:02', '2019-02-20 03:04:02'),
(70, 1, 55, 0, 1, 0, 1, '2019-02-20 03:14:34', '2019-02-20 03:21:16'),
(71, 1, 56, 0, 1, 0, 1, '2019-02-20 03:14:42', '2019-02-20 03:14:42'),
(72, 1, 57, 0, 1, 0, 1, '2019-02-20 03:14:53', '2019-02-20 03:14:53'),
(73, 1, 58, 0, 1, 0, 1, '2019-02-20 03:15:07', '2019-02-20 03:15:07'),
(74, 1, 59, 0, 1, 0, 1, '2019-02-20 03:15:26', '2019-02-20 03:15:26'),
(75, 1, 60, 0, 1, 0, 1, '2019-02-20 03:21:55', '2019-02-20 03:21:55'),
(76, 1, 61, 0, 1, 0, 1, '2019-02-20 03:22:09', '2019-02-20 03:22:09'),
(77, 1, 75, 0, 1, 0, 1, '2019-02-20 03:26:16', '2019-02-20 03:26:16'),
(78, 29, 51, 0, 1, 0, 1, '2019-02-20 05:46:39', '2019-02-20 05:46:39'),
(79, 29, 52, 0, 1, 0, 1, '2019-02-20 06:15:51', '2019-02-20 06:15:51'),
(80, 29, 55, 0, 1, 0, 1, '2019-02-20 06:16:38', '2019-02-20 06:16:38'),
(81, 1, 62, 0, 1, 0, 1, '2019-02-20 06:30:48', '2019-02-20 06:32:26'),
(82, 1, 63, 0, 1, 0, 1, '2019-02-20 06:35:30', '2019-02-20 06:44:02'),
(83, 1, 64, 0, 1, 0, 1, '2019-02-20 06:56:28', '2019-02-20 06:56:28'),
(84, 1, 65, 0, 1, 0, 1, '2019-02-20 06:58:07', '2019-02-20 06:58:07'),
(85, 1, 66, 0, 1, 0, 1, '2019-02-20 07:00:41', '2019-02-20 07:00:41'),
(86, 1, 67, 0, 1, 0, 1, '2019-02-21 06:31:09', '2019-02-21 06:31:09'),
(87, 33, 51, 0, 1, 0, 1, '2019-02-21 08:29:24', '2019-02-21 08:29:24'),
(88, 34, 52, 0, 1, 0, 1, '2019-02-21 08:33:05', '2019-02-21 08:33:05'),
(89, 34, 55, 0, 1, 0, 1, '2019-02-21 08:35:54', '2019-02-21 08:35:54'),
(90, 43, 51, 0, 1, 0, 1, '2019-02-21 11:59:11', '2019-02-21 11:59:11'),
(91, 43, 52, 0, 1, 0, 1, '2019-02-21 11:59:35', '2019-02-21 11:59:35'),
(92, 43, 53, 0, 1, 0, 1, '2019-02-21 11:59:44', '2019-02-21 11:59:44'),
(93, 43, 54, 0, 1, 0, 1, '2019-02-21 11:59:49', '2019-02-21 11:59:49'),
(94, 43, 55, 0, 1, 0, 1, '2019-02-21 12:02:46', '2019-02-21 12:02:46'),
(95, 43, 56, 0, 1, 0, 1, '2019-02-21 12:04:29', '2019-02-21 12:04:29'),
(96, 43, 57, 0, 1, 0, 1, '2019-02-21 12:04:38', '2019-02-21 12:04:38'),
(97, 43, 58, 0, 1, 0, 1, '2019-02-21 12:04:44', '2019-02-21 12:04:44'),
(98, 43, 59, 0, 1, 0, 1, '2019-02-21 12:04:50', '2019-02-21 12:04:50'),
(99, 43, 98, 0, 1, 0, 1, '2019-02-22 08:09:10', '2019-02-22 08:09:10'),
(100, 43, 99, 0, 1, 0, 1, '2019-02-22 08:09:17', '2019-02-22 08:09:17'),
(101, 43, 100, 0, 1, 0, 1, '2019-02-22 08:09:24', '2019-02-22 08:09:24'),
(102, 45, 51, 0, 1, 0, 1, '2019-02-22 08:42:49', '2019-02-22 08:42:49'),
(103, 45, 52, 0, 1, 0, 1, '2019-02-22 08:42:53', '2019-02-22 08:42:53'),
(104, 45, 53, 0, 1, 0, 1, '2019-02-22 08:42:59', '2019-02-22 08:42:59'),
(105, 45, 54, 0, 1, 0, 1, '2019-02-22 08:43:03', '2019-02-22 08:43:03'),
(106, 45, 98, 0, 1, 0, 1, '2019-02-22 08:51:01', '2019-02-22 08:51:01'),
(107, 45, 99, 0, 1, 0, 1, '2019-02-22 08:51:05', '2019-02-22 08:51:05'),
(108, 45, 100, 0, 1, 0, 1, '2019-02-22 08:51:08', '2019-02-22 08:51:08'),
(109, 45, 151, 0, 1, 0, 1, '2019-02-22 08:54:22', '2019-02-22 08:54:22'),
(110, 45, 152, 0, 1, 0, 1, '2019-02-22 08:54:25', '2019-02-22 08:54:25'),
(111, 45, 153, 0, 1, 0, 1, '2019-02-22 08:55:02', '2019-02-22 08:55:02'),
(112, 45, 154, 0, 1, 0, 1, '2019-02-22 08:55:06', '2019-02-22 08:55:06'),
(113, 48, 51, 0, 1, 0, 1, '2019-02-25 04:02:33', '2019-02-25 04:02:33'),
(114, 48, 52, 0, 1, 0, 1, '2019-02-25 04:02:45', '2019-02-25 04:02:45'),
(115, 48, 53, 0, 1, 0, 1, '2019-02-25 04:02:48', '2019-02-25 04:02:48'),
(116, 48, 54, 0, 1, 0, 1, '2019-02-25 04:02:50', '2019-02-25 04:02:50'),
(117, 48, 55, 0, 1, 0, 1, '2019-02-25 04:03:17', '2019-02-25 04:03:17'),
(118, 48, 56, 0, 1, 0, 1, '2019-02-25 04:03:21', '2019-02-25 04:03:21'),
(119, 48, 57, 0, 1, 0, 1, '2019-02-25 04:03:25', '2019-02-25 04:03:25'),
(120, 48, 58, 0, 1, 0, 1, '2019-02-25 04:03:29', '2019-02-25 04:03:29'),
(121, 48, 59, 0, 1, 0, 1, '2019-02-25 04:03:33', '2019-02-25 04:03:33'),
(122, 48, 98, 0, 1, 0, 1, '2019-02-25 04:03:51', '2019-02-25 04:03:51'),
(123, 48, 99, 0, 1, 0, 1, '2019-02-25 04:03:53', '2019-02-25 04:03:53'),
(124, 48, 100, 0, 1, 0, 1, '2019-02-25 04:03:56', '2019-02-25 04:03:56'),
(125, 48, 60, 0, 1, 0, 1, '2019-02-25 04:04:23', '2019-02-25 04:04:23'),
(126, 48, 88, 0, 1, 0, 1, '2019-02-25 04:10:50', '2019-02-25 04:10:50'),
(127, 48, 1, 0, 1, 0, 1, '2019-02-25 11:12:36', '2019-02-25 11:12:36'),
(128, 48, 2, 0, 1, 0, 1, '2019-02-25 11:13:05', '2019-02-25 11:13:05'),
(129, 48, 3, 0, 1, 0, 1, '2019-02-25 11:13:08', '2019-02-25 11:13:08'),
(130, 48, 4, 0, 1, 0, 1, '2019-02-25 11:13:11', '2019-02-25 11:23:00'),
(131, 33, 52, 0, 1, 0, 1, '2019-02-25 04:31:32', '2019-02-25 04:31:32'),
(132, 33, 53, 0, 1, 0, 1, '2019-02-25 04:31:37', '2019-02-25 04:31:37'),
(133, 33, 54, 0, 1, 0, 1, '2019-02-25 04:31:42', '2019-02-25 04:31:42'),
(134, 33, 55, 0, 1, 0, 1, '2019-02-25 04:36:38', '2019-02-25 04:36:38'),
(135, 33, 56, 0, 1, 0, 1, '2019-02-25 04:36:42', '2019-02-25 04:36:42'),
(136, 33, 57, 0, 1, 0, 1, '2019-02-25 04:36:47', '2019-02-25 04:36:47'),
(137, 33, 58, 0, 1, 0, 1, '2019-02-25 04:36:52', '2019-02-25 04:36:52'),
(138, 33, 59, 0, 1, 0, 1, '2019-02-25 04:36:58', '2019-02-25 04:36:58'),
(139, 48, 151, 0, 1, 0, 1, '2019-02-25 05:11:33', '2019-02-25 05:11:33'),
(140, 48, 152, 0, 1, 0, 1, '2019-02-25 05:11:38', '2019-02-25 05:11:38'),
(141, 48, 153, 0, 1, 0, 1, '2019-02-25 05:11:50', '2019-02-25 05:11:50'),
(142, 48, 154, 0, 1, 0, 1, '2019-02-25 05:11:53', '2019-02-25 05:11:53'),
(143, 48, 61, 0, 1, 0, 1, '2019-02-25 06:23:23', '2019-02-25 06:23:23'),
(144, 48, 62, 0, 1, 0, 1, '2019-02-25 06:23:28', '2019-02-25 06:23:28'),
(145, 48, 63, 0, 1, 0, 1, '2019-02-25 06:23:35', '2019-02-25 06:23:35'),
(146, 48, 64, 0, 1, 0, 1, '2019-02-25 06:23:42', '2019-02-25 06:23:42'),
(147, 48, 65, 0, 1, 0, 1, '2019-02-25 06:23:49', '2019-02-25 06:23:49'),
(148, 48, 66, 0, 1, 0, 1, '2019-02-25 06:24:00', '2019-02-25 06:24:00'),
(149, 48, 67, 0, 1, 0, 1, '2019-02-25 06:24:09', '2019-02-25 06:24:09'),
(150, 48, 68, 0, 1, 0, 1, '2019-02-25 06:24:18', '2019-02-25 06:24:18'),
(151, 48, 69, 0, 1, 0, 1, '2019-02-25 06:24:25', '2019-02-25 06:24:25'),
(152, 48, 70, 0, 1, 0, 1, '2019-02-25 06:24:33', '2019-02-25 06:24:33'),
(153, 48, 71, 0, 1, 0, 1, '2019-02-25 06:24:41', '2019-02-25 06:24:41'),
(154, 48, 72, 0, 1, 0, 1, '2019-02-25 06:24:47', '2019-02-25 06:24:47'),
(155, 48, 73, 0, 1, 0, 1, '2019-02-25 06:24:53', '2019-02-25 06:24:53'),
(156, 48, 74, 0, 1, 0, 1, '2019-02-25 06:24:58', '2019-02-25 06:24:58'),
(157, 48, 89, 0, 1, 0, 1, '2019-02-25 06:27:14', '2019-02-25 06:27:14'),
(158, 48, 90, 0, 1, 0, 1, '2019-02-25 06:27:17', '2019-02-25 06:27:17'),
(159, 48, 91, 0, 1, 0, 1, '2019-02-25 06:27:22', '2019-02-25 06:27:22'),
(160, 48, 92, 0, 1, 0, 1, '2019-02-25 06:27:27', '2019-02-25 06:27:27'),
(161, 48, 93, 0, 1, 0, 1, '2019-02-25 06:27:33', '2019-02-25 06:27:33'),
(162, 48, 155, 0, 1, 0, 1, '2019-02-25 06:34:07', '2019-02-25 06:34:07'),
(163, 48, 156, 0, 1, 0, 1, '2019-02-25 06:34:11', '2019-02-25 06:34:11'),
(164, 48, 157, 0, 1, 0, 1, '2019-02-25 06:34:14', '2019-02-25 06:34:14'),
(165, 48, 158, 0, 1, 0, 1, '2019-02-25 06:34:18', '2019-02-25 06:34:18'),
(166, 48, 159, 0, 1, 0, 1, '2019-02-25 06:34:22', '2019-02-25 06:34:22'),
(167, 48, 160, 0, 1, 0, 1, '2019-02-25 06:34:26', '2019-02-25 06:34:26'),
(168, 48, 75, 0, 1, 0, 1, '2019-02-25 06:34:51', '2019-02-25 06:34:51'),
(169, 48, 76, 0, 1, 0, 1, '2019-02-25 06:34:55', '2019-02-25 06:34:55'),
(170, 48, 94, 0, 1, 0, 1, '2019-02-25 06:39:13', '2019-02-25 06:39:13'),
(171, 48, 95, 0, 1, 0, 1, '2019-02-25 06:39:16', '2019-02-25 06:39:16'),
(172, 48, 96, 0, 1, 0, 1, '2019-02-25 06:39:20', '2019-02-25 06:39:20'),
(173, 48, 97, 0, 1, 0, 1, '2019-02-25 06:39:22', '2019-02-25 06:39:22'),
(174, 48, 77, 0, 1, 0, 1, '2019-02-25 06:39:53', '2019-02-25 06:39:53'),
(175, 48, 78, 0, 1, 0, 1, '2019-02-25 06:39:56', '2019-02-25 06:39:56'),
(176, 48, 79, 0, 1, 0, 1, '2019-02-25 06:39:59', '2019-02-25 06:39:59'),
(177, 48, 81, 0, 1, 0, 1, '2019-02-25 06:40:07', '2019-02-25 06:40:07'),
(178, 48, 83, 0, 1, 0, 1, '2019-02-25 06:40:15', '2019-02-25 06:40:15'),
(179, 48, 84, 0, 1, 0, 1, '2019-02-25 06:40:18', '2019-02-25 06:40:18'),
(180, 48, 85, 0, 1, 0, 1, '2019-02-25 06:40:21', '2019-02-25 06:40:21'),
(181, 48, 86, 0, 1, 0, 1, '2019-02-25 06:40:24', '2019-02-25 06:40:24'),
(182, 48, 87, 0, 1, 0, 1, '2019-02-25 06:40:26', '2019-02-25 06:40:26'),
(183, 48, 80, 0, 1, 0, 1, '2019-02-25 06:40:32', '2019-02-25 06:40:32'),
(184, 48, 82, 0, 1, 0, 1, '2019-02-25 06:40:41', '2019-02-25 06:40:41'),
(185, 48, 5, 0, 1, 0, 1, '2019-02-25 07:57:01', '2019-02-25 07:57:01'),
(186, 48, 6, 0, 1, 0, 1, '2019-02-25 07:57:05', '2019-02-25 07:57:05'),
(187, 48, 7, 0, 1, 0, 1, '2019-02-25 07:57:10', '2019-02-25 07:57:10'),
(188, 48, 8, 0, 1, 0, 1, '2019-02-25 07:57:14', '2019-02-25 07:57:14'),
(189, 48, 9, 0, 1, 0, 1, '2019-02-25 07:57:19', '2019-02-25 07:57:19'),
(190, 48, 10, 0, 1, 0, 1, '2019-02-25 08:44:26', '2019-02-25 08:44:26'),
(191, 48, 11, 0, 1, 0, 1, '2019-02-25 08:44:32', '2019-02-25 08:44:32'),
(192, 48, 12, 0, 1, 0, 1, '2019-02-25 08:44:37', '2019-02-25 08:44:37'),
(193, 48, 13, 0, 1, 0, 1, '2019-02-25 08:44:41', '2019-02-25 08:44:41'),
(194, 48, 14, 0, 1, 0, 1, '2019-02-25 08:44:44', '2019-02-25 08:44:44'),
(195, 48, 15, 0, 1, 0, 1, '2019-02-25 08:44:49', '2019-02-25 08:44:49'),
(196, 48, 16, 0, 1, 0, 1, '2019-02-25 08:44:53', '2019-02-25 08:44:53'),
(197, 33, 1, 0, 1, 0, 1, '2019-02-25 09:16:57', '2019-02-25 09:16:57'),
(198, 33, 2, 0, 1, 0, 1, '2019-02-25 09:17:01', '2019-02-25 09:17:01'),
(199, 33, 3, 0, 1, 0, 1, '2019-02-25 09:17:04', '2019-02-25 09:17:04'),
(200, 33, 4, 0, 1, 0, 1, '2019-02-25 09:17:06', '2019-02-25 09:17:06'),
(201, 51, 5, 0, 1, 0, 1, '2019-02-25 09:23:32', '2019-02-25 09:23:32'),
(202, 51, 6, 0, 1, 0, 1, '2019-02-25 09:23:35', '2019-02-25 09:23:35'),
(203, 51, 7, 0, 1, 0, 1, '2019-02-25 09:23:39', '2019-02-25 09:23:39'),
(204, 33, 161, 0, 1, 0, 1, '2019-02-25 09:23:41', '2019-02-25 09:23:41'),
(205, 51, 8, 0, 1, 0, 1, '2019-02-25 09:23:41', '2019-02-25 09:23:41'),
(206, 51, 9, 0, 1, 0, 1, '2019-02-25 09:23:45', '2019-02-25 09:23:45'),
(207, 52, 1, 0, 1, 0, 1, '2019-02-25 09:28:58', '2019-02-25 09:28:58'),
(208, 51, 2, 0, 1, 0, 1, '2019-02-25 09:32:25', '2019-02-25 09:32:25'),
(209, 51, 3, 0, 1, 0, 1, '2019-02-25 09:32:29', '2019-02-25 09:32:29'),
(210, 51, 4, 0, 1, 0, 1, '2019-02-25 09:32:33', '2019-02-25 09:32:33'),
(211, 52, 51, 0, 1, 0, 1, '2019-02-25 09:33:47', '2019-02-25 09:33:47'),
(212, 26, 1, 0, 1, 0, 1, '2019-02-25 09:41:12', '2019-02-25 09:41:12'),
(213, 52, 2, 0, 1, 0, 1, '2019-02-26 02:46:59', '2019-02-26 02:46:59'),
(214, 52, 3, 0, 1, 0, 1, '2019-02-26 02:47:20', '2019-02-26 02:47:20'),
(215, 52, 4, 0, 1, 0, 1, '2019-02-26 02:47:24', '2019-02-26 02:47:24');

-- --------------------------------------------------------

--
-- Table structure for table `users_rating_tab`
--

CREATE TABLE `users_rating_tab` (
  `id` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `classid` int(10) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_rating_tab`
--

INSERT INTO `users_rating_tab` (`id`, `userid`, `classid`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 5, 1, '2019-01-31 00:00:00', '2019-01-29 14:18:40'),
(2, 3, 2, 4, 1, '2019-01-31 00:00:00', '2019-01-29 14:16:51'),
(5, 2, 2, 3, 1, '2019-01-29 14:17:07', '2019-01-29 14:17:07'),
(6, 2, 3, 5, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 2, 2, 5, 1, '2019-02-01 03:59:05', '2019-02-01 03:59:05'),
(8, 2, 2, 5, 1, '2019-02-01 08:09:48', '2019-02-01 08:09:48'),
(9, 2, 2, 5, 1, '2019-02-01 08:09:54', '2019-02-01 08:09:54'),
(10, 2, 2, 5, 1, '2019-02-01 08:09:57', '2019-02-01 08:09:57'),
(11, 2, 2, 5, 1, '2019-02-01 08:09:58', '2019-02-01 08:09:58'),
(12, 2, 2, 5, 1, '2019-02-01 08:10:00', '2019-02-01 08:10:00'),
(13, 2, 2, 5, 1, '2019-02-01 08:10:06', '2019-02-01 08:10:06'),
(14, 2, 2, 5, 1, '2019-02-01 08:10:55', '2019-02-01 08:10:55'),
(15, 2, 2, 5, 1, '2019-02-01 08:10:56', '2019-02-01 08:10:56'),
(16, 1, 2, 5, 1, '2019-02-01 08:11:23', '2019-02-01 08:11:23'),
(17, 1, 2, 5, 1, '2019-02-01 08:11:26', '2019-02-01 08:11:26'),
(18, 1, 2, 5, 1, '2019-02-01 08:11:27', '2019-02-01 08:11:27'),
(19, 3, 2, 5, 1, '2019-02-01 08:11:31', '2019-02-01 08:11:31'),
(20, 3, 2, 5, 1, '2019-02-01 08:11:32', '2019-02-01 08:11:32'),
(21, 3, 2, 5, 1, '2019-02-01 08:11:36', '2019-02-01 08:11:36'),
(22, 3, 2, 5, 1, '2019-02-01 08:11:38', '2019-02-01 08:11:38'),
(23, 30, 2, 5, 1, '2019-02-01 08:11:40', '2019-02-01 08:11:40'),
(24, 30, 2, 5, 1, '2019-02-01 08:11:41', '2019-02-01 08:11:41'),
(25, 30, 2, 50, 1, '2019-02-01 08:12:37', '2019-02-01 08:12:37'),
(26, 30, 2, 50, 1, '2019-02-01 08:12:38', '2019-02-01 08:12:38'),
(27, 30, 2, 50, 1, '2019-02-01 08:12:39', '2019-02-01 08:12:39'),
(28, 30, 2, 127, 1, '2019-02-01 08:15:18', '2019-02-01 08:15:18'),
(29, 30, 2, 127, 1, '2019-02-01 08:15:20', '2019-02-01 08:15:20'),
(30, 30, 2, 127, 1, '2019-02-01 08:15:20', '2019-02-01 08:15:20'),
(31, 30, 2, 127, 1, '2019-02-01 08:15:21', '2019-02-01 08:15:21'),
(32, 30, 2, 0, 1, '2019-02-01 08:15:31', '2019-02-01 08:15:31'),
(33, 30, 2, 0, 1, '2019-02-01 08:15:32', '2019-02-01 08:15:32'),
(34, 30, 2, 0, 1, '2019-02-01 08:15:33', '2019-02-01 08:15:33'),
(35, 30, 2, 0, 1, '2019-02-01 08:15:33', '2019-02-01 08:15:33'),
(36, 30, 2, 0, 1, '2019-02-01 08:15:34', '2019-02-01 08:15:34'),
(37, 30, 2, -128, 1, '2019-02-01 08:15:39', '2019-02-01 08:15:39'),
(38, 30, 2, -128, 1, '2019-02-01 08:15:39', '2019-02-01 08:15:39'),
(39, 30, 2, -128, 1, '2019-02-01 08:15:40', '2019-02-01 08:15:40'),
(40, 30, 2, -128, 1, '2019-02-01 08:15:41', '2019-02-01 08:15:41'),
(41, 30, 2, -50, 1, '2019-02-01 08:15:45', '2019-02-01 08:15:45'),
(42, 30, 2, -50, 1, '2019-02-01 08:15:47', '2019-02-01 08:15:47'),
(43, 2, 2, 10, 1, '2019-02-01 08:16:55', '2019-02-01 08:16:55'),
(44, 30, 2, -5, 1, '2019-02-01 08:17:44', '2019-02-01 08:17:44'),
(45, 30, 2, -5, 1, '2019-02-01 08:17:44', '2019-02-01 08:17:44'),
(46, 30, 2, -5, 1, '2019-02-01 08:17:45', '2019-02-01 08:17:45'),
(47, 30, 2, -50, 1, '2019-02-01 08:17:49', '2019-02-01 08:17:49'),
(48, 30, 2, -50, 1, '2019-02-01 08:17:50', '2019-02-01 08:17:50'),
(49, 2, 2, 7, 1, '2019-02-01 08:19:35', '2019-02-01 08:19:35'),
(50, 2, 2, 7, 1, '2019-02-01 08:21:16', '2019-02-01 08:21:16'),
(51, 2, 2, 7, 1, '2019-02-22 04:31:03', '2019-02-22 04:31:03'),
(52, 1, 2, 4, 1, '2019-02-22 04:34:04', '2019-02-22 04:34:04'),
(53, 1, 2, 3, 1, '2019-02-22 04:34:15', '2019-02-22 04:34:15'),
(54, 1, 2, 3, 1, '2019-02-22 04:34:15', '2019-02-22 04:34:15'),
(55, 1, 2, 3, 1, '2019-02-22 04:34:15', '2019-02-22 04:34:15'),
(56, 1, 2, 4, 1, '2019-02-22 04:34:15', '2019-02-22 04:34:15'),
(57, 1, 2, 4, 1, '2019-02-22 04:34:15', '2019-02-22 04:34:15'),
(58, 1, 2, 5, 1, '2019-02-22 04:34:18', '2019-02-22 04:34:18'),
(59, 1, 2, 2, 1, '2019-02-22 04:34:18', '2019-02-22 04:34:18'),
(60, 1, 2, 3, 1, '2019-02-22 04:34:18', '2019-02-22 04:34:18'),
(61, 1, 2, 4, 1, '2019-02-22 04:34:45', '2019-02-22 04:34:45'),
(62, 1, 2, 4, 1, '2019-02-22 04:34:48', '2019-02-22 04:34:48'),
(63, 45, 3, 4, 1, '2019-02-22 13:41:13', '2019-02-22 13:41:13'),
(64, 48, 3, 2, 1, '2019-02-25 04:04:53', '2019-02-25 04:04:53'),
(65, 52, 2, 5, 1, '2019-02-26 02:58:38', '2019-02-26 02:58:38');

-- --------------------------------------------------------

--
-- Table structure for table `users_scores_tab`
--

CREATE TABLE `users_scores_tab` (
  `id` int(10) NOT NULL,
  `type` enum('class','course','material') NOT NULL DEFAULT 'class',
  `parentid` int(10) NOT NULL,
  `assessmentid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `score` int(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_scores_tab`
--

INSERT INTO `users_scores_tab` (`id`, `type`, `parentid`, `assessmentid`, `userid`, `score`, `status`, `created_at`, `updated_at`) VALUES
(1, 'class', 2, 1, 1, 90, 1, '2019-01-25 00:00:00', '2019-01-25 00:00:00'),
(2, 'class', 2, 1, 2, 98, 1, '2019-01-25 00:00:00', '2019-01-25 00:00:00'),
(3, 'class', 2, 1, 3, 95, 1, '2019-01-25 00:00:00', '2019-01-25 00:00:00'),
(4, 'class', 2, 1, 4, 75, 1, '2019-01-25 00:00:00', '2019-01-25 00:00:00'),
(5, 'class', 2, 1, 5, 68, 1, '2019-01-25 00:00:00', '2019-01-25 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users_stats_tab`
--

CREATE TABLE `users_stats_tab` (
  `userid` int(10) NOT NULL,
  `total_video_duration` int(10) DEFAULT '0',
  `total_video_watch` int(10) DEFAULT '0',
  `total_assessment` int(10) DEFAULT '0',
  `total_module` int(10) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_stats_tab`
--

INSERT INTO `users_stats_tab` (`userid`, `total_video_duration`, `total_video_watch`, `total_assessment`, `total_module`) VALUES
(1, 185, 12, 15, 5),
(2, 205, 14, 15, 5),
(3, 303, 17, 17, 7),
(4, 0, 0, 0, 0),
(5, 0, 0, 0, 0),
(6, 0, 0, 0, 0),
(7, 0, 0, 0, 0),
(8, 0, 0, 0, 0),
(9, 0, 0, 0, 0),
(10, 0, 0, 0, 0),
(11, 0, 0, 0, 0),
(12, 0, 0, 0, 0),
(13, 0, 0, 0, 0),
(14, 0, 0, 0, 0),
(15, 0, 0, 0, 0),
(16, 0, 0, 0, 0),
(17, 0, 0, 0, 0),
(18, 0, 0, 0, 0),
(19, 0, 0, 0, 0),
(20, 0, 0, 0, 0),
(21, 0, 0, 0, 0),
(22, 0, 0, 0, 0),
(23, 0, 0, 0, 0),
(24, 0, 0, 0, 0),
(25, 0, 0, 0, 0),
(26, 0, 0, 0, 0),
(27, 0, 0, 0, 0),
(28, 0, 0, 0, 0),
(29, 0, 0, 0, 0),
(30, 0, 0, 0, 0),
(31, 0, 0, 0, 0),
(32, 0, 0, 0, 0),
(33, 0, 0, 0, 0),
(34, 0, 0, 0, 0),
(35, 0, 0, 0, 0),
(36, 0, 0, 0, 0),
(37, 0, 0, 0, 0),
(38, 0, 0, 0, 0),
(39, 0, 0, 0, 0),
(40, 0, 0, 0, 0),
(41, 0, 0, 0, 0),
(42, 0, 0, 0, 0),
(43, 0, 0, 0, 0),
(44, 0, 0, 0, 0),
(45, 0, 0, 0, 0),
(46, 0, 0, 0, 0),
(47, 0, 0, 0, 0),
(48, 0, 0, 0, 0),
(49, 0, 0, 0, 0),
(50, 0, 0, 0, 0),
(51, 0, 0, 0, 0),
(52, 0, 0, 0, 0),
(53, 0, 0, 0, 0),
(54, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_tab`
--

CREATE TABLE `users_tab` (
  `userid` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullname` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `password` varchar(150) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `token` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `confirm` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_tab`
--

INSERT INTO `users_tab` (`userid`, `email`, `fullname`, `phone`, `profile_picture`, `password`, `salt`, `token`, `status`, `confirm`, `created_at`, `updated_at`) VALUES
(1, 'palmagratcy@gmail.com', 'Gratcy Palma', '', '', '92f79ff841dbc77efcb9b57634c6970fd794673d9743f31388839255e10148ffb8eeb248cc3422d3329b77a9b17ecc66762e4fdc812262e8ea16fc97510291e5', 'd6dfb8a75f95097e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjEsInR5cGUiOiJtb2JpbGUiLCJpYXQiOjE1NTEwNjg5NjAsImV4cCI6MTU1MTE1NTM2MH0.5Ws_gUPjX2V8c_OZz4D5-gOZMoRh0VF-wRU3t4LkOO8', 1, 0, '0000-00-00 00:00:00', '2019-02-25 04:29:20'),
(2, 'tampnbgt@gmail.com', 'Andra Nur', '', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', '123456', '124568', '', 1, 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 'nurhadi@aldo.com', 'Nurhadi', '', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', '1234256', '1243568', '', 0, 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 'palma1@gmail.com', 'palma', '085611313121', '', '5dc31a13b2b05cdfaf084aa5e4125e2c2052d7a65e6f9ed5dc9077881c1ec814dbdfdddc5cbc85f8dfa3e4f7807008022364a9e8db205c08531980dd8a0e8e58', '8b0bf864ef283a11f9', '', 1, 0, '2019-02-12 04:30:23', '2019-02-12 04:30:23'),
(5, 'palm2@gmail.com', 'palma', '085611313121', '', '68147445869720cbf6b20fbf43336646386b0a6293d9b9c1c60dc73e5921bf1b589442d756b52a165abb74c66793372f292249fcc8ece51a476f37c33b0a1087', 'f2e0cbcf4a774ab314', '', 1, 1, '2019-02-12 04:31:20', '2019-02-12 04:32:08'),
(6, 'palma5@gmail.com', 'palma', '085611313121', '', '5acd82a1c7b455bba39a550566d2c3ccbe7ee109ebe5195d6abd438418f831521a4fea817f2f0497d95e09155b45b6492af29d3e13a9fc544ebf7d2b93f7a9f2', '60257bbbd2da11c992', '', 1, 0, '2019-02-12 07:03:08', '2019-02-12 07:03:08'),
(7, 'palma3@gmail.com', 'palma', '085611313121', '', '67b058f51e3655be4bd50fec01f70d240592364c82b9402b2486148d67512ea78a561becfdb45b612e397dbf7d8f1cd3d7ca17b08a857159cbd005de2d2321d3', 'c350d6a776cd76d893', '', 1, 0, '2019-02-12 16:27:53', '2019-02-12 16:27:53'),
(8, 'test@gmail.com', 'tama', '085611313121', '', 'd39a79f2cf1adeda8fbfec8a661a62966241c1761f046991509cbb7406d50c3f30d82474a07ddae5129dbf91c99130377d481f117d0e416ddaf56842d59f408b', '68bbbda4aa9a4e61ba', '', 1, 0, '2019-02-12 17:31:27', '2019-02-12 17:31:27'),
(9, 'tama2@gmail.com', 'tama', '123', '', '90dc54588f0b405fc556b0d688435b7680157f499737e39f9d53437b79784f4533fa30a7afc67ea23c5d9b5fbab3de32c90bcc162ba7a9b29d25b71e1396c1dd', 'e066453491e5bbcda6', '', 1, 0, '2019-02-12 17:32:33', '2019-02-12 17:32:33'),
(10, 'palma05@gmail.com', 'palma', '085611313121', '', 'b744d485155f0f5b82312e75d3d9ffa6d3210e6018e636aa06bc133e57c379e189e5b9816c41a464218aca20c031864b50f9c7146bbc0f6006e74503d0784ef3', 'e497d0426a79222175', '', 1, 0, '2019-02-13 01:49:43', '2019-02-13 01:49:43'),
(11, 'palma55@gmail.com', 'palma', '085611313121', '', '75f7cbcb70edd1e71b65b0bbf8b99eb209436f964cc33e84225084d488e4fb0e497c4477c61f55a999858cd90ccfed547dfd62d3fa113a4995ac892a4b04ae01', '415c4a4748c5162994', '', 1, 0, '2019-02-13 01:49:59', '2019-02-13 01:49:59'),
(12, 'palma95@gmail.com', 'palma', '085611313121', '', 'fff16ce80fbb6f0034eb50a2fe1efff4e41d0b20e7be0ed75e67cf4b03e7c1235d943ff28caa8a1ede1358c54a74fba3ba1843b5374315e36c439ef9e61a0663', '746c0bcabe8ae8513e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjEyLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwMDI1MjIxLCJleHAiOjE1NTAxMTE2MjF9.TxPnmdCdSiLYqgk40jmjAEy71lZfIuevifrfGgRPkSE', 1, 1, '2019-02-13 02:24:36', '2019-02-13 02:33:41'),
(13, '13@gmail.com', 'tama', '0813', '', '83b1628d17f6d40ec0eb7ac0bf7f74be3fb502475b4cfc97c4ad2fb4bfd3ecc0d1641578d32ab9c67891f833110f4530b183fe6e8edb15b575ee1bab7fe0b6c8', 'ef39304eba83150b6b', '', 1, 0, '2019-02-13 04:58:41', '2019-02-13 04:58:41'),
(14, 'palma9115@gmail.com', 'palma', '085611313121', '', '541de324e46deb970ef1cef46f761f3e5bb08e9a93d54924100a790b2193351e97fa5f51d1cf257a0464c55bc4942366ef2ef81cb01b4d8b0ae038d0edf84686', '0e7ffc3eb0d3e3f91d', '', 1, 0, '2019-02-13 04:59:12', '2019-02-13 04:59:12'),
(15, 'tama@gmail.com', 'tama nih', '0813', '', '9d1d3a5f7f7ca91cd0b984cf9bd18c5dd9c4f4324b79d607e6372d87ff0b5ffa2516eb81180530dbdca3cd7248f458df8f25c4c5a1fe2476905e1d1f3442b332', '60e91477b32a837ba3', '', 1, 0, '2019-02-13 05:02:49', '2019-02-13 05:02:49'),
(16, 'tama23@gmail.com', 'tama nih', '0813', '', 'd74820dec5bc93bda27b76d6f540fd57dae938a49f465f205ed86f25448e90e67f584b421ec9234a962f0fa2a05cd1f49117108e4a1e56b981f96e722390af3b', '0a6027408ed95ae4d9', '', 1, 0, '2019-02-13 05:04:26', '2019-02-13 05:04:26'),
(17, 'taaama23@gmail.com', 'tama nih', '0813', '', '53349f8c1d798a2927ac5eb2928d08e7b7ca8741acb41b4d2667d153f40df37946af4f6a7c68646fe02699d9fe70cc9c5dd919e409bc7654d481504a6a0af509', '80bab91cb77b6578ca', '', 1, 0, '2019-02-13 05:06:20', '2019-02-13 05:06:20'),
(18, 'tsfdsfama23@gmail.com', 'tama nih', '0813', '', '667761004452ff4efe5a0214d3912432ba6f5050f265353a9ba6c7f8dc22b19f6afbaf9ba8df24bddf08ddfd3dc968c97eb31bf7cfd74dc196f6fd5f1232a13a', 'eafb72a904d8c8f3a0', '', 1, 0, '2019-02-13 05:14:10', '2019-02-13 05:14:10'),
(19, 'timi@gmail.com', 'tama nih', '0813', '', '8eab3a1f8fd6f072c3a5badb878d45b5885626b553c9f656bc6b41ecad591713272ddb81294ebbc147938fd6105a9fb9e99089c8f15fcb38d77a77e1f515f8b8', '57f65ff90f3be5261f', '', 1, 0, '2019-02-13 05:14:52', '2019-02-13 05:14:52'),
(20, 'timitumu@gmail.com', 'tama nih', '0813', '', 'da74f54f325f4d4c19d2de87b25827b07d9d4c526fb68972ff01cc93b0f2839a3bd0b19d0fdba921a1683c8807baf2f55bf9fced7265e4a78aff9b1523c07f09', 'b5aeb20b5a49574b3f', '', 1, 0, '2019-02-13 05:37:42', '2019-02-13 05:37:42'),
(21, 'timitumu2@gmail.com', 'tama nih', '0813', '', '66aa0b382c76339a5fac483571345dedfd0034a1fb3c9ef535ab613459441cd3708994ac5cfabca7cbb696d0b6740f42a90b0b2139496ec3fa5d41ad11d25403', '0b6eccc6ca20a982e6', '', 1, 1, '2019-02-13 05:38:18', '2019-02-13 05:38:29'),
(22, 'timitumu23@gmail.com', 'tama nih', '0813', '', '7ddf3d94abcbdc15ed2f3a9b3777e134f3dabb8595f90491aac007900130ad97a38bf9f125458fc1c4a8e2f424c033024b71d4f79cfec5d7b4c1a2507bec9c14', '66b94643e69e7b8951', '', 1, 1, '2019-02-13 05:45:07', '2019-02-13 05:45:24'),
(23, 'timitumu2dd3@gmail.com', 'tama nih', '0813', '', 'b6c3e2cdc7e2c1958a8cd818905d18039f23f079f01657825f0d86da9d825dbedcdbd519fa76713d27445e976f38774cda1a807e00ecf7530239a91b598cd939', 'b405bee4a7503f3367', '', 1, 1, '2019-02-13 06:58:11', '2019-02-13 07:09:34'),
(24, 'orangganteng@gmail.com', 'orang ganteng', '0813', '', 'bbc0c806d6fea86c4f4bdee19f923f9115c66b1fab7dcb548a2c231d86402c7a96f96616078b7a7bcd19b35ed5a0cece56c44900d4d7ee8c421995042a3f114d', '9b4763b754a11701ba', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjI0LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwMjA0MDc2LCJleHAiOjE1NTAyOTA0NzZ9.8Sutt7nioUWAaI4T70Y98iwRcYoPK2SqZzy-zz7i9v8', 1, 1, '2019-02-13 08:09:05', '2019-02-15 04:14:36'),
(25, 'tama123@gmail.com', 'palma', '085611313121', '', '09118821db169b1447f6db69c3eefab5799e5e77c1d9f5c84f16bb0c42a01197a1d649257ca0bb7f76ab37bc2a1979b6aef0ac5162a73a5affa6ef2cec226b26', '57c4c8ba298420bd4f', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjI1LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwNTQ4NDA5LCJleHAiOjE1NTA2MzQ4MDl9.O4R-bokCpTUY_BdO8Opf5c5q43-IK7X-BYM1DqhPSBs', 1, 1, '2019-02-19 03:52:06', '2019-02-19 03:53:29'),
(26, 'tatasfachrul@gmail.com', 'Tatas Fachrul', '081295886532', '', '49ff8c7d557b975da3a10b63c4693f611c1fe2dd573ab173f7ad5847b4c2801f0929928f7a3a16e75c3a17dfc60e226199fd39abdb43e881b25d75e1ca630497', '841541dd7ebdaf2de3', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjI2LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDg3Mzg3LCJleHAiOjE1NTExNzM3ODd9.EcFbKNQ4np1TVFZyhd64MH5f1QoYJfHaqzPhoVyx-Sg', 1, 0, '2019-02-19 04:00:20', '2019-02-25 09:36:27'),
(28, 'dadang@gmail.com', 'dadang jaenudin', '089089089089', '', 'cd573a16a5d8c139a849ffa9055b57ab44fc2c09c4001522b294db1f1709cab9b7df75dcd730a137a8fc022d78e54ef7a6fa443b355cbe840e9b0816d2ea565a', '2f0a4578a2ce557197', '', 1, 0, '2019-02-19 05:03:21', '2019-02-19 05:03:21'),
(29, 'daninurhakim@gmail.com', 'dani nurhakim', '089444444444', '', 'e0f4ae7635d5a2985c7255799e3de62c3d98504f3654a9b5391ea73277539af75d4f5abcd2daebe80d140af79ba448d373f6dcc366132d5d9bd15f7ed0b0898f', '8554300953f84584b8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjI5LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwNzI5Mjk4LCJleHAiOjE1NTA4MTU2OTh9.V5wxVqPDZpwGkTA36nV_mNzzSPkWspGI9wVgIPZuCAU', 1, 0, '2019-02-19 07:35:52', '2019-02-21 06:08:18'),
(30, 'akun.pratamasumirat@gmail.com', 'tama', '08998851286', '', '01334a5778913b6407a40c3ac710ee4d7b46e5b50e5e80c83f9382675a3a80d3d86fb66b39b45113e629789b15ecff1133ad187407209d7ace1011bc31c99d8c', '07d41982d90281e0eb', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjMwLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwNzM5NjcyLCJleHAiOjE1NTA4MjYwNzJ9.lRGOJC7RWeW_s1wjgqPDLZUV_CVHvTGmPmT-aAhdGRo', 1, 1, '2019-02-21 03:55:48', '2019-02-21 09:01:12'),
(31, 'palma99@gmail.com', 'palma', '085611313121', '', '2d91abefed417a24ddc84810245c87b64fcc842bb29ec1bddd5311cf8f28ee5630a89cfd5d26220a75e351a1b2a1aa36a2111076b85773e5db199226c3b8ffd1', '760e57cc1ad72278a1', '', 1, 1, '2019-02-21 04:20:46', '2019-02-21 04:21:11'),
(32, 'palmadd5@gmail.com', 'palma', '085611313121', '', 'c68936e6785f9910823ec15c318c2292ae4eee744d3af62d00a62cc1a6fe1b7fe644b0713f3e8b926da6b4809e910f34fae33f6c588d3b58c4ac569ea75ee0c0', '82388de113770c0d8e', '', 1, 0, '2019-02-21 06:38:43', '2019-02-21 06:38:43'),
(33, 'fitraaditama7@gmail.com', 'fitra', '089507300719', '', '9aa16bff55b94b9939182a2bc7612d9d11eef8dc476e6bee460f8ccce5fdfb7dea6cab3935cf72488095d4edfc26c270eae47347c40d112fc93c5f4742838852', '41eb87b413bb74dc89', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjMzLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDg2NjQ1LCJleHAiOjE1NTExNzMwNDV9.uTkf3vbY6uwEPDExjnDHje6zFmi2jErXW62jGgDA7zI', 1, 0, '2019-02-21 08:26:18', '2019-02-25 09:24:05'),
(34, 'mamandalsim@gmail.com', 'maman', '2232323', '', '6abc561468570e54ff20d40b59b1dd13b289f78cb09d56f112351580b2ceec2bcbe35e35337f49468d6dfc334c57820f448ead3dbedf8f8399c36800c3990b67', '9db8c10fe91d50ef28', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjM0LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDY1MTU4LCJleHAiOjE1NTExNTE1NTh9.gBqzHdTXcLiLGH68KnyrU2aV-gA8sMGAQfNGiOexLgQ', 1, 0, '2019-02-21 08:32:15', '2019-02-25 03:25:58'),
(35, 'initama@gmail.com', 'tamaaa', '08911', '', 'a284d7473321761a88ec113ed71cc6db8a22f78414e9b85fd344c30bc7ea9485348d4cdf70f6f070b4fd7c88356737082381ee65f020d35234be8af82f26b4a9', '1ae2fe4de6221428f8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjM1LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwNzQzNjE5LCJleHAiOjE1NTA4MzAwMTl9.k9DAFIWX85UPP6ULS3TrHTnzm-0ygWLphFU5ciUUEww', 1, 1, '2019-02-21 09:01:48', '2019-02-21 10:06:59'),
(36, 'palm0a5@gmail.com', 'palma', '085611313121', '', '8293dd8ca642ca60734a92ff4d60235ae42bee5f5b2b481605da150981082e3096521c60c5843052340edd647cc2cd9c10a2a1636dadec77cb77515d9583f6a8', 'b39170243c19d99242', '', 1, 1, '2019-02-21 09:13:38', '2019-02-21 09:39:46'),
(37, 'palma6@gmail.com', 'palma', '085611313121', '', 'cb5655879cd81e1c061245ea5c5840cc64dba351d1660762f4966954022903ba8b9177fb42f5365f5b0584473d79064f86739e3545721006ebe9f133e4d63822', 'ee04d4c59ac37c09d6', '', 1, 0, '2019-02-21 09:15:25', '2019-02-21 09:15:25'),
(38, 'tester1@gmail.com', 'Tester One', '085611313121', '', 'b88201794b4da64dd812543ca6b4c8c0c0071df43985ee8baa3e501fa99e621559bfdd265d189fe3676fc3c4fffc0f71b886f0af3f031a1dc3887989569d2959', '5bb682f6b91db37acb', '', 1, 1, '2019-02-21 09:45:44', '2019-02-21 09:45:58'),
(39, 'tester2@gmail.com', 'Tester One', '085611313121', '', 'd6b458db6cc43d2c1be8671537768ff474e6b3dc1215f8f53e8e3917e0bdebccf04aa4fa2d727702de7c944aa5292c038aed0d17cc07967c9d2a1e860b0e9cc9', 'e6a8e459b3f49d1c58', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjM5LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwNzQzNDAyLCJleHAiOjE1NTA4Mjk4MDJ9.RGRfP9z47AvtAgEogRhdFfR0TOUkOTJuzMzG-_pbFc4', 1, 1, '2019-02-21 10:03:01', '2019-02-21 10:03:22'),
(40, 'tamanih@gmail.com', 'tama', '0899', '', '1c52a7fcb79c0b9f44f7c067344146529c97af4d10790677f2e72d5500eb61e95862ee61ca7cbb1379f33c40e8189372e34ac0f4a88b6404aaaea444d6c7c20f', '803aa10f19f11e2ff6', '', 1, 0, '2019-02-21 10:07:44', '2019-02-21 10:07:44'),
(41, 'tamanih2@gmail.com', 'tama Nihhh', '0899', '', 'd4c496ddd45a0a997cbad741f5cb55a3c672dadf2fef7029093a5cb781f63eaac9fe57ae97b55f5049ab47c1638fc090e757b06288bda83bb3accc6984d2eaa1', '0a246510c1d9f0cec7', '', 1, 0, '2019-02-21 10:08:11', '2019-02-21 10:08:11'),
(42, 'tester3@gmail.com', 'Tester One', '085611313121', '', '0d0a5b40fabc6bb6a51f820e584d0091523ab3f4750f2ff6e3e87c9799211e958c6a870ba1cb6ef3a81ce07ff030347266b92721070f5b2216a526a7ca6a2fde', '4ce5a60d3558645269', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjQyLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwOTI3MDE3LCJleHAiOjE1NTEwMTM0MTd9.GZjWeMDcONfwO5c7wujdpfHt02kneBiADI6f-3UfVDM', 1, 1, '2019-02-21 10:19:19', '2019-02-23 13:03:37'),
(43, 'palma123@gmail.com', 'palma nih', '085611313121', '', '91ca3176a89ac202a7bc3632fb32ce0614992aecdd76ecb791a289879d911f9b5ceb183bdabf9a86369d73c7bc713c5005698f0fbf02b3caecc0ee246063b1ac', '9cd49fbef6b0610ee2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjQzLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwODIzOTU5LCJleHAiOjE1NTA5MTAzNTl9.b7aeMZmFCRm_rSN3SbxeEdaVns3XFpJXtT8Rp0eWXlo', 1, 1, '2019-02-21 11:01:07', '2019-02-22 08:25:59'),
(44, 'arhamganteng@gmail.com', 'arham ganteng', '0811111111', '', '349ad9850e3d96fec238da3ccba27c4b29f97cad88b393526d63dcae46dc3b60c217fa9e327543f8215f1db8ffa5678314b48c9f2e50cb5561ad1cdcf14af2c4', '9a081554a095e25249', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjQ0LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUwODA0MTYyLCJleHAiOjE1NTA4OTA1NjJ9.HoSv3igV8E9FsJGVHCS40KPYZyWnQuepQm_XGp_DQaI', 1, 1, '2019-02-22 02:55:46', '2019-02-22 02:56:02'),
(45, 'tatasganteng@gmail.com', 'tama', '123', '', '2623c659eceed87ec2ab70f8f83447c7360d2dc57b9c973adbabb507ddb63a66439f0b4b25ed6d2f9f36b4e9205639e5edaf8d72c2a7f8526467b44a441796aa', 'd4abaf59be4edc3c7d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjQ1LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDgxMzg2LCJleHAiOjE1NTExNjc3ODZ9.Vq16kFxebd0GRpq0H7lXLby4QDDEUq1Hzln6hziLeoc', 1, 1, '2019-02-22 08:26:25', '2019-02-25 07:56:26'),
(46, 'abrohah7@gmail.com', 'Fitra', '08950300719', '', 'a725e52e11aba11dea2a2d47e9e1de6d6d39abded20337a1c22cd896298f76372b01f449460335112c66fcfbe221e398ce109f18c939b02abfe7742756917c8e', '76a290e2c1d031ee15', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjQ2LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDY2NDAzLCJleHAiOjE1NTExNTI4MDN9.4e7eT5yQSX7RIWWs5jetipR3mn4HFtgaKwlbpwqINyQ', 1, 1, '2019-02-25 03:35:05', '2019-02-25 03:46:43'),
(47, 'fitraaditama@gmail.com', 'Fitra', '089507300719', '', '95fcf26c73888f8042612f96c87f0e0137a2092d2cce5f1a5f436d65b50f1d91727a8db4cbae1909b9f672dc5a7b6587c046e18a1581acc6f3c331c025c3f537', '306e5558c9a4ab4e45', '', 1, 0, '2019-02-25 03:48:10', '2019-02-25 03:48:10'),
(48, 'game.pratamasumirat@gmail.com', 'Rama', '08555', '', '8540353fdec73d27731243ebdf90930443d5bca74b00296c65effb1f8b37594373a63e802daf4c04f2d99c44e5168e6c2081eb5996ae4b46ef47523b13683492', '237578f1095d12d1b8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjQ4LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMTExNDQ0LCJleHAiOjE1NTExOTc4NDR9.plRBsUnDeRn2AZowNLEMD4LOi9xAelZ0x5NLR3iIQHg', 1, 1, '2019-02-25 03:55:46', '2019-02-25 16:17:24'),
(49, 'palma666@gmail.com', 'palma', '085611313121', '', 'd0f2974bc43f5525760bff774f2124a68e698ea14075dee6c9df2896d12a5a0be5ce1a7f45f80325484d17c634bd66ea8c76bbea7592084cd47beb7ef86c3e46', 'c74c60692375909079', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjQ5LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDY4Njc4LCJleHAiOjE1NTExNTUwNzh9.Y71V-xnHR0Rh5M4b1QoxbxEhi0kFrTYGBTVSCuckx1o', 1, 0, '2019-02-25 04:12:36', '2019-02-25 04:24:38'),
(50, 'palma12345@gmail.com', 'palma', '085611313121', '', 'b5762709c1d4c5daa98c770a17b15bbd1dbea004218c13bb5e9b414de8663bb3ea4cbfa71b791e8e215e7ab4becf3887ecbd554e1254cdb0446d94cc9ce4c685', '335e1ce47048f0dea8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjUwLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDc4MDc2LCJleHAiOjE1NTExNjQ0NzZ9.O2GE7IPUswjHISlGvISb9I9KjHGKhf7yiXGXhJY1c9U', 1, 1, '2019-02-25 07:00:59', '2019-02-25 07:01:16'),
(51, 'sn.pratamasumirat@gmail.com', 'Tamaaaaa', '088', '', '16352597f512aae0d7f4a7d36c6619870e46fc61264cd04fb06916c3ef9d78bd135b4cd904650696bb1d771cf514959f0b8b656be37fcaea7502a0319d960605', '7ee1e3d95dbfbb5813', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjUxLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDg3MjUzLCJleHAiOjE1NTExNzM2NTN9.zKkq_URxKzzOkZ5Ep9XnmBqceTcMUOO13BNO5ZozsgI', 1, 1, '2019-02-25 09:19:15', '2019-02-25 09:34:13'),
(52, 'arham.abiyan@gmail.com', 'Arham Awal Abiyan', '082175405796', '', '96ed00ea327455d8b340993cea72d7ebdbb5d746708bb2cdc1ee0cc8afdb543af19f92bc8666db7a8ace3ae362efc3829f07238fa364ee08990974ac547fef86', 'b9ea696aa69a7f0fd7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjUyLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMTUwOTYyLCJleHAiOjE1NTEyMzczNjJ9.4rknnlyBx8JzOYJ8JlXq8ZrP3ZdCo080NpEhwflkw6M', 1, 1, '2019-02-25 09:26:22', '2019-02-26 03:16:02'),
(53, 'palma999@gmail.com', 'palma', '085611313121', '', '34666a9c5979cea587f419961682630df07f4b104d9311c7ec14af52b70451d06a56cd746a1ee14d2d4a64739530f1e32f3f25a2499a5afdcff448dab8319475', 'c2763f611c12532988', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjUzLCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMDg3MzExLCJleHAiOjE1NTExNzM3MTF9.CHNqsMBzBd30P9NTlkHinkF2T64Uo0_M7kPrtK2f610', 1, 1, '2019-02-25 09:34:26', '2019-02-25 09:35:11'),
(54, 'eripin.tan@asiansigmatechnology.com', 'Eripin', '08170929898', '', '0f64c0d6708288c77e2f6e3f760c4697311e6997d663044a535c0a3519c5da7d733752649e458b5a395b73235e86e2ab72f074fb8a8fd60810087cb851ab3f3c', 'dd6b59ee99d1e8f2b6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOjU0LCJ0eXBlIjoibW9iaWxlIiwiaWF0IjoxNTUxMTUwOTI4LCJleHAiOjE1NTEyMzczMjh9.hx6eHlO9WAXd_3kEud8rzSAdyGIiwHmRDZu480_LZgc', 1, 1, '2019-02-26 03:12:00', '2019-02-26 03:15:28');

-- --------------------------------------------------------

--
-- Table structure for table `users_videos_tab`
--

CREATE TABLE `users_videos_tab` (
  `videoid` int(10) NOT NULL,
  `materialid` int(10) NOT NULL,
  `filename` varchar(300) NOT NULL,
  `status` tinyint(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_access_tab`
--
ALTER TABLE `admin_access_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_groups_tab`
--
ALTER TABLE `admin_groups_tab`
  ADD PRIMARY KEY (`groupid`);

--
-- Indexes for table `admin_permission_tab`
--
ALTER TABLE `admin_permission_tab`
  ADD PRIMARY KEY (`permissionid`);

--
-- Indexes for table `admin_tab`
--
ALTER TABLE `admin_tab`
  ADD PRIMARY KEY (`adminid`);

--
-- Indexes for table `assessment_detail_tab`
--
ALTER TABLE `assessment_detail_tab`
  ADD PRIMARY KEY (`detailid`);

--
-- Indexes for table `assessment_tab`
--
ALTER TABLE `assessment_tab`
  ADD PRIMARY KEY (`assessmentid`);

--
-- Indexes for table `classes_tab`
--
ALTER TABLE `classes_tab`
  ADD PRIMARY KEY (`classid`);

--
-- Indexes for table `courses_detail_tab`
--
ALTER TABLE `courses_detail_tab`
  ADD PRIMARY KEY (`detailid`);

--
-- Indexes for table `courses_material_tab`
--
ALTER TABLE `courses_material_tab`
  ADD PRIMARY KEY (`materialid`);

--
-- Indexes for table `courses_tab`
--
ALTER TABLE `courses_tab`
  ADD PRIMARY KEY (`courseid`);

--
-- Indexes for table `discussion_likes_tab`
--
ALTER TABLE `discussion_likes_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discussion_tab`
--
ALTER TABLE `discussion_tab`
  ADD PRIMARY KEY (`discussionid`);

--
-- Indexes for table `guru_tab`
--
ALTER TABLE `guru_tab`
  ADD PRIMARY KEY (`guruid`);

--
-- Indexes for table `notification_tab`
--
ALTER TABLE `notification_tab`
  ADD PRIMARY KEY (`notificationid`);

--
-- Indexes for table `users_assessment_tab`
--
ALTER TABLE `users_assessment_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_auth_tab`
--
ALTER TABLE `users_auth_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_course_detail_tab`
--
ALTER TABLE `users_course_detail_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_course_tab`
--
ALTER TABLE `users_course_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_material_progress_tab`
--
ALTER TABLE `users_material_progress_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_rating_tab`
--
ALTER TABLE `users_rating_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_scores_tab`
--
ALTER TABLE `users_scores_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_stats_tab`
--
ALTER TABLE `users_stats_tab`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `users_tab`
--
ALTER TABLE `users_tab`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_access_tab`
--
ALTER TABLE `admin_access_tab`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `admin_groups_tab`
--
ALTER TABLE `admin_groups_tab`
  MODIFY `groupid` int(4) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `admin_permission_tab`
--
ALTER TABLE `admin_permission_tab`
  MODIFY `permissionid` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `admin_tab`
--
ALTER TABLE `admin_tab`
  MODIFY `adminid` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `assessment_detail_tab`
--
ALTER TABLE `assessment_detail_tab`
  MODIFY `detailid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `assessment_tab`
--
ALTER TABLE `assessment_tab`
  MODIFY `assessmentid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `classes_tab`
--
ALTER TABLE `classes_tab`
  MODIFY `classid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `courses_detail_tab`
--
ALTER TABLE `courses_detail_tab`
  MODIFY `detailid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `courses_material_tab`
--
ALTER TABLE `courses_material_tab`
  MODIFY `materialid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;
--
-- AUTO_INCREMENT for table `courses_tab`
--
ALTER TABLE `courses_tab`
  MODIFY `courseid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `discussion_likes_tab`
--
ALTER TABLE `discussion_likes_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `discussion_tab`
--
ALTER TABLE `discussion_tab`
  MODIFY `discussionid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
--
-- AUTO_INCREMENT for table `guru_tab`
--
ALTER TABLE `guru_tab`
  MODIFY `guruid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `notification_tab`
--
ALTER TABLE `notification_tab`
  MODIFY `notificationid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;
--
-- AUTO_INCREMENT for table `users_assessment_tab`
--
ALTER TABLE `users_assessment_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `users_auth_tab`
--
ALTER TABLE `users_auth_tab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;
--
-- AUTO_INCREMENT for table `users_course_detail_tab`
--
ALTER TABLE `users_course_detail_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `users_material_progress_tab`
--
ALTER TABLE `users_material_progress_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;
--
-- AUTO_INCREMENT for table `users_rating_tab`
--
ALTER TABLE `users_rating_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT for table `users_stats_tab`
--
ALTER TABLE `users_stats_tab`
  MODIFY `userid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `users_tab`
--
ALTER TABLE `users_tab`
  MODIFY `userid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
