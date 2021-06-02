/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.7.24 : Database - pili
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pili` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `pili`;

/*Table structure for table `p_appeals` */

DROP TABLE IF EXISTS `p_appeals`;

CREATE TABLE `p_appeals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '发表人（来源于pili_user用户表的用户id）',
  `video_id` int(11) NOT NULL COMMENT '视频id（来源于p_video视频表的视频id）',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `content` varchar(128) DEFAULT NULL COMMENT '申诉内容',
  `phone` varchar(128) DEFAULT NULL COMMENT '电话',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `source_material` varchar(500) DEFAULT NULL COMMENT '素材资源',
  `check_uid` int(11) NOT NULL DEFAULT '0' COMMENT '审核人（来源于pili_user用户表的用户id）',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '状态',
  `editTime` datetime DEFAULT NULL COMMENT '处理时间时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='申诉表';

/*Data for the table `p_appeals` */

insert  into `p_appeals`(`id`,`user_id`,`video_id`,`createTime`,`content`,`phone`,`email`,`source_material`,`check_uid`,`state`,`editTime`) values (14,1,10141,'2021-05-24 11:58:34','aaa','ccc','  cc',NULL,0,0,NULL),(15,1,10168,'2021-05-24 23:22:58','test','adad','adad',NULL,0,0,NULL),(16,1,10169,'2021-05-24 23:24:37','adad','ad','ad',NULL,0,0,NULL);

/*Table structure for table `p_appeals_reply` */

DROP TABLE IF EXISTS `p_appeals_reply`;

CREATE TABLE `p_appeals_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '发表人（来源于pili_user用户表的用户id）',
  `appealsId` int(11) NOT NULL COMMENT '申诉id（来源于p_appeals视频表的申诉id）',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `content` varchar(128) DEFAULT NULL COMMENT '申诉内容',
  `source_material` varchar(500) DEFAULT NULL COMMENT '素材资源',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='申诉回复表';

/*Data for the table `p_appeals_reply` */

/*Table structure for table `p_barrage` */

DROP TABLE IF EXISTS `p_barrage`;

CREATE TABLE `p_barrage` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(11) DEFAULT NULL COMMENT '发表人（来源于pili_user用户表的用户id）',
  `video_id` int(11) DEFAULT NULL COMMENT '视频id（来源于p_video视频表的视频id）',
  `content` varchar(100) DEFAULT NULL COMMENT '弹幕内容',
  `videotime` time DEFAULT NULL COMMENT '发送视频时间',
  `createTime` datetime DEFAULT NULL COMMENT '添加时间',
  `type` varchar(128) DEFAULT NULL,
  `color` varchar(128) DEFAULT NULL,
  `size` varchar(128) DEFAULT NULL,
  `post_ip` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `p_barrage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_barrage_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COMMENT='弹幕表';

/*Data for the table `p_barrage` */

insert  into `p_barrage`(`id`,`user_id`,`video_id`,`content`,`videotime`,`createTime`,`type`,`color`,`size`,`post_ip`) values (0,1,10000,'adasdasdad','00:00:11','2021-04-27 09:44:53','right','rgb(255, 255, 255)',NULL,NULL),(1,1,10000,'我是up主，欢迎大家发布弹幕','00:05:00','2021-04-09 10:46:28',NULL,NULL,NULL,NULL),(2,2,10000,'我是张三，我发弹幕','00:07:00','2021-04-09 10:47:56',NULL,NULL,NULL,NULL),(3,3,10001,'cpdd','00:01:00','2021-04-10 10:40:28',NULL,NULL,NULL,NULL),(6,1,10000,'啊啊啊啊','00:01:23','2021-04-27 11:36:23','right','rgb(255, 255, 255)',NULL,NULL),(7,1,10000,'sdfsdfsdfs','00:00:16','2021-04-30 11:04:42','right','rgb(255, 255, 255)',NULL,NULL),(8,1,10000,'adasd','00:00:12','2021-04-30 11:05:30','top','rgb(255, 255, 255)',NULL,NULL),(9,1,10000,'asdsad','00:00:16','2021-04-30 11:05:47','top','rgb(137, 213, 255)',NULL,NULL),(10,1,10000,'笑死，根本吓不死','00:00:08','2021-05-05 10:21:51','right','rgb(255, 255, 255)',NULL,NULL),(11,1,10000,'aaa','00:00:10','2021-05-05 10:51:28','right','rgb(255, 255, 255)',NULL,NULL),(12,1,10000,'阿巴阿巴阿巴','00:00:10','2021-05-05 10:52:26','right','rgb(255, 255, 255)',NULL,NULL),(13,1,10000,'1','00:00:10','2021-05-05 11:10:20','right','rgb(255, 255, 255)',NULL,NULL),(14,1,10000,'2','00:00:10','2021-05-05 11:10:22','right','rgb(255, 255, 255)',NULL,NULL),(15,1,10000,'3','00:00:10','2021-05-05 11:10:24','right','rgb(255, 255, 255)',NULL,NULL),(23,2,10000,'我是张三，我为自己代言','00:00:10','2021-05-06 11:58:14','right','rgb(255, 255, 255)',NULL,NULL),(24,1,10000,'？？','00:00:12','2021-05-10 09:02:54','right','rgb(255, 255, 255)',NULL,NULL),(25,1,10000,'啊啊','00:00:12','2021-05-10 09:03:08','right','rgb(255, 255, 255)',NULL,NULL),(27,2,10054,'哈哈哈哈哈','00:00:20','2021-05-11 11:56:04','right','rgb(255, 255, 255)',NULL,NULL),(28,2,10054,'哈哈哈哈哈','00:00:36','2021-05-11 11:56:20','right','rgb(255, 255, 255)',NULL,NULL),(29,1,10053,'啊啊','00:03:00','2021-05-14 08:41:28','right','rgb(255, 255, 255)',NULL,NULL),(31,2,10000,'ab*','00:00:13','2021-05-14 09:03:14','right','rgb(255, 255, 255)',NULL,NULL),(32,2,10000,'a','00:00:17','2021-05-14 09:03:29','right','rgb(255, 255, 255)',NULL,NULL);

/*Table structure for table `p_category` */

DROP TABLE IF EXISTS `p_category`;

CREATE TABLE `p_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `categoryName` varchar(50) NOT NULL COMMENT '分类名称',
  `parentId` bigint(20) DEFAULT NULL COMMENT '父级节点id',
  `createdBy` int(11) DEFAULT NULL COMMENT '创建者（来源于pili_user用户表的用户id）',
  `creationTime` datetime DEFAULT NULL COMMENT '创建时间',
  `modifyBy` int(11) DEFAULT NULL COMMENT '更新者（来源于pili_user用户表的用户id）',
  `modifyDate` datetime DEFAULT NULL COMMENT '最新更新时间',
  PRIMARY KEY (`id`),
  KEY `modifyBy` (`modifyBy`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `p_category_ibfk_1` FOREIGN KEY (`modifyBy`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_category_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COMMENT='视频分类';

/*Data for the table `p_category` */

insert  into `p_category`(`id`,`categoryName`,`parentId`,`createdBy`,`creationTime`,`modifyBy`,`modifyDate`) values (1,'全部',0,1,'2021-04-09 10:17:52',1,'2021-04-09 10:17:57'),(2,'动画',1,1,'2021-04-09 10:18:21',1,'2021-04-09 10:18:25'),(3,'游戏',1,1,'2021-04-09 10:18:37',1,'2021-04-09 10:18:39'),(4,'生活',1,1,'2021-04-09 10:20:03',1,'2021-04-09 10:20:03'),(5,'音乐',1,1,'2021-04-09 10:20:15',1,'2021-04-09 10:20:15'),(6,'鬼畜',1,1,'2021-04-09 10:20:29',1,'2021-04-09 10:20:29'),(7,'MMD·3D',2,1,'2021-04-09 10:21:14',1,'2021-04-09 10:21:17'),(8,'手办·模型',2,1,'2021-04-09 10:21:58',1,'2021-04-09 10:21:58'),(9,'翻唱',5,1,'2021-04-09 10:23:00',1,'2021-04-09 10:23:00'),(10,'原唱',5,1,'2021-04-09 10:23:00',1,'2021-04-09 10:23:00'),(11,'单机游戏',3,1,'2021-04-09 10:23:30',1,'2021-04-09 10:23:30'),(12,'电子竞技',3,1,'2021-04-09 10:23:30',1,'2021-04-09 10:23:30'),(13,'搞笑',4,1,'2021-04-09 10:23:59',1,'2021-04-09 10:23:59'),(14,'日常',4,1,'2021-04-09 10:23:59',1,'2021-04-09 10:23:59'),(15,'鬼畜调教',6,1,'2021-04-09 10:24:58',1,'2021-04-09 10:24:58'),(16,'人力VOCALOID',6,1,'2021-04-09 10:24:58',1,'2021-04-09 10:24:58'),(20,'娱乐',1,1,'2021-05-08 09:22:07',1,'2021-05-08 09:22:07'),(21,'时尚',1,1,'2021-05-08 09:22:14',1,'2021-05-08 09:22:14'),(22,'综艺',20,1,'2021-05-08 09:52:10',1,'2021-05-08 09:52:10'),(23,'明星',20,1,'2021-05-08 09:52:22',1,'2021-05-08 09:52:22'),(24,'漂亮妹妹',20,2,'2021-05-11 11:33:56',2,'2021-05-11 11:33:56'),(25,'穿搭',21,5,'2021-05-17 10:41:02',5,'2021-05-17 10:41:02');

/*Table structure for table `p_collect` */

DROP TABLE IF EXISTS `p_collect`;

CREATE TABLE `p_collect` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(11) DEFAULT NULL COMMENT '拥有者（来源于pili_user用户表的用户id）',
  `title` varchar(50) NOT NULL COMMENT '收藏夹标题',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `intro` varchar(200) DEFAULT NULL COMMENT '简介',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `p_collect_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='收藏夹表';

/*Data for the table `p_collect` */

insert  into `p_collect`(`id`,`user_id`,`title`,`createTime`,`intro`) values (1,1,'第一个收藏夹','2021-04-09 10:32:19','第一个收藏夹'),(2,1,'默认收藏夹','2021-04-20 12:40:47','默认收藏夹'),(7,1,'GG','2021-04-24 09:59:04',NULL),(8,1,'KK','2021-04-24 10:16:21',NULL),(9,1,'HH','2021-04-24 10:17:09',NULL),(10,1,'AA','2021-04-24 10:19:05',NULL),(11,1,'bbb','2021-04-30 03:07:31',NULL);

/*Table structure for table `p_collect_info` */

DROP TABLE IF EXISTS `p_collect_info`;

CREATE TABLE `p_collect_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `collect_id` bigint(20) DEFAULT NULL COMMENT '对应收藏夹（来源于p_collect用户表的id）',
  `video_id` int(11) DEFAULT NULL COMMENT '视频id（来源于p_video视频表的视频id）',
  `addTime` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `collect_id` (`collect_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `p_collect_info_ibfk_1` FOREIGN KEY (`collect_id`) REFERENCES `p_collect` (`id`),
  CONSTRAINT `p_collect_info_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='收藏夹信息表';

/*Data for the table `p_collect_info` */

insert  into `p_collect_info`(`id`,`collect_id`,`video_id`,`addTime`) values (2,1,10000,'2021-04-09 10:34:17'),(3,1,10001,'2021-04-09 11:02:46'),(4,2,10002,'2021-04-20 12:43:49'),(5,2,10007,'2021-04-20 12:44:21'),(6,2,10008,'2021-04-22 08:41:30'),(8,11,10009,'2021-04-30 03:07:39');

/*Table structure for table `p_comment` */

DROP TABLE IF EXISTS `p_comment`;

CREATE TABLE `p_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `video_id` int(11) DEFAULT NULL COMMENT '视频id（来源于p_video视频表的视频id）',
  `user_id` int(11) DEFAULT NULL COMMENT '评论人id（来源于pili_user用户表的用户id）',
  `parent_id` bigint(20) NOT NULL COMMENT '父评论id，默认为0',
  `thumbs_up_num` int(11) NOT NULL DEFAULT '0' COMMENT '点赞量，默认为0',
  `content` varchar(500) DEFAULT NULL COMMENT '评论内容',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `level` int(1) NOT NULL COMMENT '评论等级',
  `replyId` int(11) DEFAULT NULL COMMENT '被回复人id',
  `groupBy` int(11) DEFAULT NULL COMMENT '归于哪条一级评论',
  PRIMARY KEY (`id`),
  KEY `video_id` (`video_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `p_comment_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`),
  CONSTRAINT `p_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='评论表';

/*Data for the table `p_comment` */

insert  into `p_comment`(`id`,`video_id`,`user_id`,`parent_id`,`thumbs_up_num`,`content`,`createTime`,`level`,`replyId`,`groupBy`) values (1,10000,1,0,3,'你好，这是本视频第一个评论','2021-04-09 10:44:11',1,NULL,NULL),(2,10000,2,1,2,'你好，admin，我是张三','2021-04-09 10:44:29',2,1,1),(3,10000,3,1,1,'admin，我是李四','2021-04-09 10:44:49',2,1,1),(4,10000,3,2,1,'张三，我是李四','2021-04-09 10:45:07',3,2,1),(5,10001,1,0,0,'火钳刘明','2021-04-12 10:27:22',1,NULL,NULL),(7,10000,1,0,1,'谢谢大家观看','2021-04-12 14:01:11',1,NULL,NULL),(17,10000,1,7,1,'test','2021-05-16 10:27:03',3,1,7),(18,10000,1,17,0,'adad','2021-05-16 10:31:34',3,1,7),(23,10000,1,2,0,'你好你好','2021-05-16 10:58:57',3,2,1),(24,10000,1,17,0,'(⌒▽⌒)','2021-05-24 10:55:41',3,1,NULL);

/*Table structure for table `p_comment_thumbsup` */

DROP TABLE IF EXISTS `p_comment_thumbsup`;

CREATE TABLE `p_comment_thumbsup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(11) DEFAULT NULL COMMENT '点赞人（来源于pili_user用户表的用户id）',
  `comment_id` bigint(20) DEFAULT NULL COMMENT '评论id（来源于p_comment评论表的id）',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `p_comment_thumbsup_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8 COMMENT='视频点赞记录表';

/*Data for the table `p_comment_thumbsup` */

insert  into `p_comment_thumbsup`(`id`,`user_id`,`comment_id`) values (1,2,1),(2,3,1),(35,2,2),(67,1,3),(77,1,1),(79,1,7),(80,1,2),(82,1,17),(84,1,4);

/*Table structure for table `p_history` */

DROP TABLE IF EXISTS `p_history`;

CREATE TABLE `p_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `video_id` int(11) DEFAULT NULL COMMENT '视频（来源于p_video视频表的视频id）',
  `user_id` int(11) DEFAULT NULL COMMENT '观看者（来源于pili_user用户表的用户id）',
  `viewTime` datetime DEFAULT NULL COMMENT '观看时间',
  `viewSecond` varchar(10) DEFAULT NULL COMMENT '观看进度',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `p_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COMMENT='浏览历史表';

/*Data for the table `p_history` */

insert  into `p_history`(`id`,`video_id`,`user_id`,`viewTime`,`viewSecond`) values (23,10050,2,'2021-05-14 08:52:18','00:02'),(35,10000,2,'2021-05-14 08:52:18','00:00'),(36,10008,2,'2021-05-14 08:52:17','0:00'),(37,10046,2,'2021-05-14 08:52:17','00:01'),(38,10000,3,'2021-05-17 08:44:54','00:11'),(39,10000,5,'2021-05-17 08:47:54','00:11'),(41,10043,5,'2021-05-17 10:20:24','00:35'),(42,10008,5,'2021-05-17 10:30:03','0:00'),(43,10090,5,'2021-05-17 10:30:05','00:02'),(47,10130,3,'2021-05-17 11:29:13','00:08'),(48,10128,3,'2021-05-17 11:17:18','00:02'),(49,10137,3,'2021-05-17 11:20:00','0:00'),(50,10138,3,'2021-05-17 11:30:30','00:01'),(51,10133,3,'2021-05-17 11:19:38','0:00'),(52,10136,3,'2021-05-17 11:19:43','0:00'),(53,10134,3,'2021-05-17 11:29:01','0:00'),(54,10114,3,'2021-05-17 11:20:05','00:00'),(62,10045,2,'2021-05-17 13:54:55','00:02'),(64,10078,1,'2021-05-24 09:02:08','00:01'),(65,10050,8,'2021-05-24 09:54:32','0:00'),(66,10162,1,'2021-05-24 10:13:00','00:02'),(67,10000,1,'2021-05-24 10:55:50','00:02'),(68,10141,1,'2021-05-24 10:58:07','00:02');

/*Table structure for table `p_postip` */

DROP TABLE IF EXISTS `p_postip`;

CREATE TABLE `p_postip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(100) NOT NULL,
  `video_pv` int(11) NOT NULL,
  `postDate` datetime NOT NULL,
  `type` int(11) NOT NULL COMMENT '0-视频 1-弹幕',
  PRIMARY KEY (`id`),
  KEY `p_postip_video_1` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8;

/*Data for the table `p_postip` */

insert  into `p_postip`(`id`,`ip`,`video_pv`,`postDate`,`type`) values (54,'192.168.16.222',10056,'2021-05-11 12:23:20',0),(55,'192.168.16.206',10050,'2021-05-11 12:25:25',0),(56,'192.168.16.206',10000,'2021-05-11 12:36:35',0),(57,'192.168.16.206',10052,'2021-05-11 12:38:06',0),(58,'192.168.16.206',10050,'2021-05-11 12:42:53',0),(59,'192.168.16.206',10050,'2021-05-11 12:43:40',0),(60,'192.168.16.206',10066,'2021-05-11 12:44:00',0),(61,'192.168.16.206',10053,'2021-05-11 12:44:20',0),(62,'192.168.16.1',10053,'2021-05-14 08:41:05',0),(63,'192.168.16.1',10053,'2021-05-14 08:41:28',1),(64,'192.168.16.1',10050,'2021-05-14 08:46:23',0),(65,'192.168.16.1',10000,'2021-05-14 08:47:52',0),(66,'192.168.16.1',10051,'2021-05-14 08:48:14',0),(67,'192.168.16.1',10046,'2021-05-14 08:48:39',0),(68,'192.168.16.1',10046,'2021-05-14 08:48:43',1),(69,'192.168.16.1',10000,'2021-05-14 09:01:57',0),(70,'192.168.16.1',10000,'2021-05-14 09:03:15',1),(71,'192.168.16.1',10000,'2021-05-14 09:03:29',1),(72,'192.168.16.1',10000,'2021-05-14 09:03:30',1),(73,'192.168.16.1',10000,'2021-05-14 09:03:30',1),(74,'192.168.16.1',10000,'2021-05-14 09:03:31',1),(75,'192.168.16.1',10000,'2021-05-14 09:03:32',1),(76,'192.168.43.174',10000,'2021-05-17 08:34:03',0),(77,'192.168.16.206',10068,'2021-05-17 10:02:17',0),(78,'192.168.16.222',10043,'2021-05-17 10:20:10',0),(79,'192.168.16.222',10090,'2021-05-17 10:20:43',0),(80,'192.168.16.206',10088,'2021-05-17 10:33:39',0),(81,'192.168.16.244',10128,'2021-05-17 11:17:16',0),(82,'192.168.16.244',10138,'2021-05-17 11:17:37',0),(83,'192.168.16.244',10138,'2021-05-17 11:19:06',0),(84,'192.168.16.244',10114,'2021-05-17 11:20:03',0),(85,'192.168.16.244',10138,'2021-05-17 11:20:11',0),(86,'192.168.16.244',10138,'2021-05-17 11:28:55',0),(87,'192.168.16.244',10130,'2021-05-17 11:29:05',0),(88,'192.168.16.244',10138,'2021-05-17 11:30:28',0),(89,'192.168.16.206',10067,'2021-05-17 11:40:34',0),(90,'192.168.16.206',10073,'2021-05-17 11:43:49',0),(91,'192.168.16.206',10078,'2021-05-17 11:44:01',0),(92,'192.168.1.46',10045,'2021-05-17 13:44:47',0),(93,'192.168.1.46',10049,'2021-05-17 13:45:09',0),(94,'192.168.1.46',10069,'2021-05-17 13:45:40',0),(95,'192.168.1.46',10045,'2021-05-17 13:48:26',0),(96,'192.168.43.174',10049,'2021-05-17 13:53:48',0),(97,'192.168.43.174',10002,'2021-05-17 13:59:26',0),(98,'192.168.43.174',10078,'2021-05-17 14:25:56',0),(99,'192.168.43.174',10078,'2021-05-17 15:07:29',0),(100,'192.168.43.174',10078,'2021-05-17 15:09:48',0),(101,'192.168.43.174',10073,'2021-05-17 15:10:12',0),(102,'192.168.43.174',10078,'2021-05-17 15:13:54',0),(103,'192.168.16.206',10078,'2021-05-24 09:01:43',0),(104,'192.168.16.206',10162,'2021-05-24 10:12:51',0),(105,'192.168.16.206',10106,'2021-05-24 10:52:21',0),(106,'192.168.16.206',10000,'2021-05-24 10:55:47',0),(107,'192.168.16.206',10141,'2021-05-24 10:58:04',0);

/*Table structure for table `p_search_hot` */

DROP TABLE IF EXISTS `p_search_hot`;

CREATE TABLE `p_search_hot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(160) NOT NULL,
  `searchDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

/*Data for the table `p_search_hot` */

insert  into `p_search_hot`(`id`,`title`,`searchDate`) values (1,'一','2021-05-10'),(2,'夏洛特','2021-05-10'),(3,'夏洛特','2021-05-10'),(4,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','2021-05-10'),(5,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','2021-05-10'),(6,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(7,'【原神动画】食蒙之灵','2021-05-10'),(8,'a','2021-05-10'),(9,'第二个视频','2021-05-10'),(10,'第','2021-05-10'),(11,'的','2021-05-10'),(12,'全站第三个视频','2021-05-10'),(13,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','2021-05-10'),(14,'【原神动画】食蒙之灵','2021-05-10'),(15,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(16,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(17,'啊我打打打打打大大','2021-05-10'),(18,'【原神动画】食蒙之灵','2021-05-10'),(19,'【原神动画】食蒙之灵','2021-05-10'),(20,'第二个视频','2021-05-10'),(21,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','2021-05-10'),(22,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-11'),(23,'a','2021-05-11'),(24,'一','2021-05-14'),(25,'yi','2021-05-14'),(26,'‘谈 恋 爱 吗’','2021-05-14'),(27,'《心如刀割》','2021-05-14'),(28,'崩坏3国服现状','2021-05-14'),(29,'第七个视频','2021-05-14'),(30,'第一个视频','2021-05-17'),(31,'博主的日常','2021-05-17');

/*Table structure for table `p_subscribe` */

DROP TABLE IF EXISTS `p_subscribe`;

CREATE TABLE `p_subscribe` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `subscribe_id` int(11) DEFAULT NULL COMMENT '关注人id（来源于pili_user用户表的用户id）',
  `subscribed_id` int(11) DEFAULT NULL COMMENT '被关注人id（来源于pili_user用户表的用户id）',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `subscribe_id` (`subscribe_id`),
  KEY `subscribed_id` (`subscribed_id`),
  CONSTRAINT `p_subscribe_ibfk_1` FOREIGN KEY (`subscribe_id`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_subscribe_ibfk_2` FOREIGN KEY (`subscribed_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='订阅信息表';

/*Data for the table `p_subscribe` */

insert  into `p_subscribe`(`id`,`subscribe_id`,`subscribed_id`,`createTime`) values (3,4,1,'2021-04-06 14:27:17'),(7,3,1,'2021-04-26 11:04:50'),(23,2,1,'2021-05-06 11:58:26'),(31,1,3,'2021-05-10 08:46:31'),(35,1,4,'2021-05-14 08:47:43'),(36,1,7,'2021-05-17 10:33:41'),(37,1,5,'2021-05-24 10:12:58');

/*Table structure for table `p_user` */

DROP TABLE IF EXISTS `p_user`;

CREATE TABLE `p_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `userName` varchar(50) NOT NULL COMMENT '用户名',
  `phone` varchar(30) NOT NULL COMMENT '手机号',
  `upwd` varchar(50) NOT NULL COMMENT '密码',
  `utype` int(11) NOT NULL DEFAULT '1' COMMENT '用户类型 1-用户 2-up主 3-管理员',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='用户表';

/*Data for the table `p_user` */

insert  into `p_user`(`uid`,`userName`,`phone`,`upwd`,`utype`) values (1,'admin','18388883333','123456',3),(2,'zhangsan','13323232323','123456',2),(3,'lisi','15553212345','123456',1),(4,'wangwu','14423231234','123456',1),(5,'xiaozhu','18812344321','123456',1),(6,'huang','1323123213213','1234567',1),(7,'fuhaian','18847854785','123456',1),(8,'hx','17670402243','123456',1);

/*Table structure for table `p_user_info` */

DROP TABLE IF EXISTS `p_user_info`;

CREATE TABLE `p_user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_id` int(11) NOT NULL COMMENT '外键，绑定user表的uid',
  `subscribeNum` int(11) NOT NULL DEFAULT '0' COMMENT '关注数',
  `fansNum` int(11) NOT NULL DEFAULT '0' COMMENT '粉丝数',
  `level` int(11) NOT NULL DEFAULT '1' COMMENT '用户等级',
  `experience` int(11) NOT NULL DEFAULT '0' COMMENT '用户经验',
  `user_pic` varchar(200) NOT NULL DEFAULT '/uploads/defaultpic.png' COMMENT '用户头像地址',
  `up_desc` varchar(500) DEFAULT '这个人没有填简介啊~~~' COMMENT '用户简介',
  `nickName` varchar(50) NOT NULL COMMENT '用户昵称',
  `up_spaceNotice` varchar(500) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `loginDate` date DEFAULT '2021-05-07',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `p_user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

/*Data for the table `p_user_info` */

insert  into `p_user_info`(`id`,`user_id`,`subscribeNum`,`fansNum`,`level`,`experience`,`user_pic`,`up_desc`,`nickName`,`up_spaceNotice`,`createTime`,`birthday`,`loginDate`) values (1,1,4,3,5,10160,'/uploads/877514110aa3427f943ddc7dd55ef48aa7bf8942.jpg@96w_96h_1c.webp','这是本站第一个用户','Micah','这是本站第一个用户','2021-04-20 10:44:49','2021-04-20 10:44:52','2021-05-24'),(2,2,1,0,1,290,'/uploads/defaultpic.png','你好，我是张三','张三',NULL,NULL,NULL,'2021-05-17'),(3,3,1,1,2,350,'/uploads/defaultpic.png','你好，我是李四','李四',NULL,NULL,NULL,'2021-05-17'),(4,4,1,1,4,750,'/uploads/defaultpic.png','这个人没有填简介啊~~~','王五',NULL,NULL,NULL,'2021-05-07'),(7,5,0,1,0,20,'/uploads/defaultpic.png','','小朱',NULL,NULL,NULL,'2021-05-17'),(8,6,0,0,1,0,'/uploads/defaultpic.png','','huangxin',NULL,NULL,NULL,'2021-05-07'),(9,7,0,1,0,0,'/uploads/defaultpic.png','','hanhan',NULL,NULL,NULL,'2021-05-17'),(10,8,0,0,0,0,'/uploads/defaultpic.png','','dfd',NULL,NULL,NULL,'2021-05-24');

/*Table structure for table `p_videos` */

DROP TABLE IF EXISTS `p_videos`;

CREATE TABLE `p_videos` (
  `video_pv` int(11) NOT NULL AUTO_INCREMENT COMMENT '视频pv号',
  `video_userid` int(11) NOT NULL COMMENT '上传者id',
  `video_title` varchar(160) NOT NULL COMMENT '视频标题',
  `video_url` varchar(100) NOT NULL COMMENT '视频播放路径',
  `video_play` bigint(20) NOT NULL DEFAULT '0' COMMENT '视频播放量',
  `video_like` int(11) NOT NULL DEFAULT '0' COMMENT '视频点赞数量',
  `video_collect` int(11) NOT NULL DEFAULT '0' COMMENT '视频收藏数量',
  `video_desc` varchar(1000) DEFAULT '--' COMMENT '视频简介',
  `video_state` int(11) NOT NULL DEFAULT '0' COMMENT '视频状态 0-待审核 1-已审核 2-审核失败 3-违规',
  `video_updatetime` datetime NOT NULL COMMENT '视频上传时间',
  `video_checkuid` int(11) DEFAULT NULL COMMENT '视频审核人',
  `video_checktime` datetime DEFAULT NULL COMMENT '视频审核时间',
  `video_releasetime` datetime DEFAULT NULL COMMENT '视频发布时间',
  `video_type` bigint(20) NOT NULL COMMENT '视频分类（来源于p_category分类表的类型id）',
  `video_time` time NOT NULL,
  `video_image` varchar(200) DEFAULT NULL,
  `video_comment` int(11) DEFAULT '0' COMMENT '视频评论数',
  `video_barrage` int(11) DEFAULT '0' COMMENT '视频弹幕数',
  PRIMARY KEY (`video_pv`),
  KEY `video_userid` (`video_userid`),
  KEY `video_checkuid` (`video_checkuid`),
  KEY `video_type` (`video_type`),
  CONSTRAINT `p_videos_ibfk_1` FOREIGN KEY (`video_userid`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_videos_ibfk_2` FOREIGN KEY (`video_checkuid`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_videos_ibfk_3` FOREIGN KEY (`video_type`) REFERENCES `p_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10170 DEFAULT CHARSET=utf8 COMMENT='视频信息表';

/*Data for the table `p_videos` */

insert  into `p_videos`(`video_pv`,`video_userid`,`video_title`,`video_url`,`video_play`,`video_like`,`video_collect`,`video_desc`,`video_state`,`video_updatetime`,`video_checkuid`,`video_checktime`,`video_releasetime`,`video_type`,`video_time`,`video_image`,`video_comment`,`video_barrage`) values (10000,1,'第一个视频','/uploads/31a0f6ea-c0ff-4164-b3f5-742cc51921a7.mp4',23916,3,1,'这是简介',1,'2021-04-09 10:29:44',1,'2021-04-09 10:29:55','2021-04-09 10:29:57',14,'00:05:19','/images/1.jpg',5,23),(10001,2,'张三的犯罪视频','/uploads/559feb27-f5ba-43ba-a4a5-884e1bc7f404.mp4',19996,2,1,'-----',2,'2021-04-09 11:01:52',1,'2021-04-09 11:01:57','2021-04-09 11:02:00',14,'00:09:54','/images/2.jpg',1,1),(10002,1,'全站第三个视频','/uploads/559feb27-f5ba-43ba-a4a5-884e1bc7f404.mp4',28234,0,0,'---',1,'2021-04-12 10:08:58',1,'2021-05-07 10:09:02','2021-05-01 10:09:06',13,'00:25:33','/images/3.jpg',6,7),(10007,2,'第二个视频','/uploads/34f9e5f68be36596e7f956c6c09634cd470507ee.png',21177,15,6,'这是简介',1,'2021-04-09 10:29:44',1,'2021-04-09 10:29:55','2021-04-09 10:29:57',12,'00:11:23','/images/a2.jpg',5,2),(10008,2,'第四个视频','/uploads/622afeea9b9706fba2c8331476a4c30ec726fbe9.png',21188,1,1,'-----',2,'2021-04-09 11:01:52',1,'2021-04-09 11:01:57','2021-04-09 11:02:00',9,'00:15:23','/images/a3.jpg',0,0),(10009,2,'第七个视频','/uploads/c7029540b64349775a8c4ea263eef8f4ff617e5a.png',12408,1,1,'---',1,'2021-04-12 10:08:58',1,'2021-05-07 10:09:02','2021-05-01 10:09:06',9,'01:00:01','/images/a4.jpg',0,0),(10049,2,'【特利迦奥特曼吐槽】不想当法师的AD才是好AD！不想当战士的法师都是伞兵！','/uploads/c9ecb3f8-1622-4e9f-a38a-10937672c8fa.mp4',4859,0,0,'年轻人打什么牌，我再也不打牌了。\n视频剪着剪着，发现特利迦越来越好看了。。。这就是日久生情的魅力吗！期待7月的新故事！',1,'2021-05-11 11:27:46',NULL,NULL,'2021-05-11 11:27:00',15,'00:01:40','/uploads/83901f6b-25a3-44ab-8f19-f58a1de6d12b.webp',0,0),(10050,2,'被你看光了,我嫁不出去了,你要对老娘我负责！','/uploads/559feb27-f5ba-43ba-a4a5-884e1bc7f404.mp4',21880,0,0,'被你看光了,我嫁不出去了,你要对老娘我负责！',1,'2021-05-11 11:29:06',NULL,NULL,'2010-04-11 11:27:00',7,'00:01:13','/uploads/ffe95446-5d78-4155-b634-cbd4e8973ed0.webp',0,0),(10051,2,'【火影】','/uploads/2635831f-f541-4efd-967b-5c51001f632a.mp4',4828,1,0,'【火影】进来感受一下什么叫做忍界大战！！！',1,'2021-05-11 11:30:31',NULL,NULL,'2021-05-11 11:29:00',7,'00:03:22','/uploads/7cf4d9f4-9a43-4fab-8cfb-5eac11c1ad2c.webp',0,0),(10052,2,'【梦の歌】爷青回~肥夢直播献唱星间飞行【超时空要塞F】','/uploads/6f74ce87-8704-4063-bfa5-ecbb54d50047.mp4',18503,0,0,'【梦の歌】爷青回~肥夢直播献唱星间飞行【超时空要塞F】',1,'2021-05-11 11:31:45',NULL,NULL,'2021-05-11 11:30:00',7,'00:04:21','/uploads/c3c74d28-a22f-48d1-96bb-31260b7dcf50.webp',0,0),(10053,2,'心时代到来，变成了心时代样子的京宝你们喜欢吗？','/uploads/7230554c-7e81-44f4-a25e-dfdf2d481a12.mp4',18032,1,0,'心时代到来，变成了心时代样子的京宝你们喜欢吗？',1,'2021-05-11 11:32:39',NULL,NULL,'2021-05-11 11:31:00',12,'00:05:50','/uploads/b2fe1b14-fd66-4c5c-9cf6-06ef7383f429.webp',0,1),(10054,2,'‘谈 恋 爱 吗’','/uploads/85ba606a-0bb3-4b2d-867e-8f33871c1c17.mp4',4649,0,0,'‘谈 恋 爱 吗’',1,'2021-05-11 11:33:32',NULL,NULL,'2021-05-11 11:32:00',24,'00:00:50','/uploads/73a5fc91-adeb-4411-86dc-0b11913ac553.webp',0,2),(10055,2,'新娘到!进来结婚吧 大喜 豆豆子 露露','/uploads/29842d1a-4454-4846-8bd6-f8f6afc5e81a.mp4',29151,0,0,'新娘到!进来结婚吧 大喜 豆豆子 露露',1,'2021-05-11 11:37:23',NULL,NULL,'2021-05-11 11:36:00',24,'00:00:49','/uploads/46640168-7b8f-4a1b-8880-e9b62e808328.webp',0,0),(10056,2,'夜喵 挑战全网最萌书记舞 无敌了！辉夜大小姐想让我告白ED2','/uploads/09241b7b-1cb2-4a08-afb0-00c8dc2ea5e1.mp4',11807,0,0,'夜喵 挑战全网最萌书记舞 无敌了！辉夜大小姐想让我告白ED2',1,'2021-05-11 11:38:29',NULL,NULL,'2021-05-11 11:37:00',24,'00:01:14','/uploads/b6dc951e-fa90-4ffc-985b-9e3a73dee233.webp',0,0),(10057,2,'9.1主线第4章，萨尔和妈妈终相认，女恐惧魔王长得好吓人','/uploads/5fde70de-6b91-42fe-8a32-fa54687c2362.mp4',1583,0,0,'9.1主线第4章，萨尔和妈妈终相认，女恐惧魔王长得好吓人',1,'2021-05-11 11:39:14',NULL,NULL,'2021-05-11 11:38:00',15,'00:06:50','/uploads/db156a68-c061-4202-bc18-6c79a8533c81.webp',0,0),(10058,2,'少女的王座 中日配音一览，差别真的好大!!!/给大家伙乐乐/乌列尔你真的好惨又好草','/uploads/a14ffd63-3db5-484b-a6eb-41d82bd257e1.mp4',2495,0,0,'少女的王座 中日配音一览，差别真的好大!!!/给大家伙乐乐/乌列尔你真的好惨又好草',1,'2021-05-11 11:39:53',NULL,NULL,NULL,13,'00:00:10','/uploads/3557a143-f9d1-4c93-b9ad-0f96b0373532.webp',0,0),(10064,2,'公主连结我的母亲可可萝生日剧情','/uploads/353a67ed-66c1-478e-a971-3f0bcbf5a66f.mp4',7727,0,0,'公主连结我的母亲可可萝生日剧情',1,'2021-05-11 12:14:35',NULL,NULL,'2021-05-11 12:13:00',12,'00:00:26','/uploads/216873ee-80cc-473b-976e-04f12dbad50c.webp',0,0),(10065,2,'崩坏3国服现状','/uploads/7dbf4d1c-1038-4b7a-ac41-e734e11df969.mp4',1148,0,0,'崩坏3国服现状',1,'2021-05-11 12:15:49',NULL,NULL,'2021-05-11 12:14:00',16,'00:00:30','/uploads/7b57b6cd-2636-4360-bfdb-b41a4d1d872b.webp',0,0),(10066,2,'我的世界：MC玩家的一生！','/uploads/75b58f17-9f52-4808-a749-4863ff74b47e.mp4',12561,0,0,'我的世界：MC玩家的一生！',1,'2021-05-11 12:17:25',NULL,NULL,'2021-05-11 12:16:00',12,'00:01:14','/uploads/3adb9a02-1d9c-455e-8709-babb6009e759.webp',0,0),(10067,2,'八只灯神，重振元素荣光！','/uploads/9a1572f5-6500-4dcd-8228-8acf13b34d09.mp4',29362,0,0,'八只灯神，重振元素荣光！',1,'2021-05-11 12:18:13',NULL,NULL,'2021-05-11 12:17:00',12,'00:01:00','/uploads/9cd80c93-0910-46b4-a5dd-0fcd78d211e6.webp',0,0),(10068,2,'绿帽子就扣在你头上，你能拿我怎么样！','/uploads/b1993105-5bc1-476f-bffd-b26575e466ea.mp4',19122,0,0,'绿帽子就扣在你头上，你能拿我怎么样！',1,'2021-05-11 12:18:52',NULL,NULL,'2021-05-11 12:18:00',7,'00:00:51','/uploads/fff4db6a-b6bd-450b-8076-b7ad04e592bf.webp',0,0),(10069,2,'【御姐玫瑰起源】满是白浆的女剑士——一个卖肉游戏也能玩成皇牌空战','/uploads/717d88e6-ca43-4d21-a67d-35f712d9997f.mp4',7527,0,0,'【御姐玫瑰起源】满是白浆的女剑士——一个卖肉游戏也能玩成皇牌空战',1,'2021-05-11 12:19:40',NULL,NULL,'2021-05-11 12:18:00',15,'00:01:31','/uploads/624b1fdf-db62-4028-be64-fa6d943957b8.webp',0,0),(10070,2,'花无缺被监禁折磨15年后会变啥样？《新绝3》里有答案！','/uploads/946bae2a-a1cd-4c5d-8cfb-a541b418dd7a.mp4',10267,0,0,'花无缺被监禁折磨15年后会变啥样？《新绝3》里有答案！',1,'2021-05-11 12:20:43',NULL,NULL,'2021-05-11 12:19:00',11,'00:00:56','/uploads/cdf55306-62b4-4818-bfcb-9babde917d33.webp',0,0),(10071,2,'【阴阳师】新版本下於菊虫技能解读及就业推荐 冷门式神变T0？','/uploads/c9b08667-b699-438a-abc4-14f51ddef4c1.mp4',28758,0,0,'【阴阳师】新版本下於菊虫技能解读及就业推荐 冷门式神变T0？',1,'2021-05-11 12:21:25',NULL,NULL,'2021-05-11 12:20:00',12,'00:01:07','/uploads/341983de-af84-44d4-bbe4-5970a87633bf.webp',0,0),(10072,2,'FPX基地组织去密室拍摄 回来后lwx整个人累的动不了 doinb：我晚上睡不着了兄弟们','/uploads/c27585bd-d889-406e-a87e-1a83c3064e34.mp4',22990,0,0,'FPX基地组织去密室拍摄 回来后lwx整个人累的动不了 doinb：我晚上睡不着了兄弟们',1,'2021-05-11 12:22:09',NULL,NULL,'2021-05-11 12:21:00',15,'00:00:43','/uploads/849e9bf2-21f0-49d6-903c-0d935c181268.webp',0,0),(10073,2,'喝了日本核废水的CJ','/uploads/f91120ea-4e2f-4c81-a868-88d9e5465dc3.mp4',28677,0,0,'喝了日本核废水的CJ',1,'2021-05-11 12:22:57',NULL,NULL,'2021-05-11 12:22:00',14,'00:00:41','/uploads/1d616d0e-6da2-4d44-80d1-9b0c7e319650.webp',0,0),(10074,7,'博主的日常','/uploads/17880333-e851-4c79-8315-e798e7e04bb6.mp4',14407,0,0,'jkzfchdjkfhjsad',1,'2021-05-17 09:53:55',NULL,NULL,NULL,14,'00:03:00','/uploads/9d231c61-6a52-4413-b504-c03638b2f902.png',0,0),(10075,3,'把我犯下的罪行在说一遍','/uploads/dcb31177-6e2d-40a8-bd60-3b535b337a68.mp4',16008,0,0,'',1,'2021-05-17 09:55:01',NULL,NULL,NULL,12,'00:00:20','/uploads/8fcb8db6-81e3-45dd-98ee-c9fbfec6b25e.png',0,0),(10076,7,'2100分的巅峰赛','/uploads/b4b3a401-64ec-4acb-80ed-28b74626e48d.mp4',6821,0,0,'rwqhaslkjfads',1,'2021-05-17 09:56:02',NULL,NULL,NULL,12,'00:02:25','/uploads/d5926b9e-27b1-4802-96a4-1102598dd72c.png',0,0),(10077,3,'dnf','/uploads/5447f91f-7857-4b11-9ea7-a7730660290a.mp4',16081,0,0,'法第三发放弃啊',1,'2021-05-17 09:58:07',NULL,NULL,NULL,12,'00:00:37','/uploads/d4461273-3109-4a67-a319-f1eea9e9358e.png',0,0),(10078,7,'搞笑','/uploads/8a3c5e93-4ad2-43cf-ac91-1fdaa4f0c393.mp4',29948,1,0,'fretfretgesat发放',1,'2021-05-17 09:59:30',NULL,NULL,NULL,16,'00:02:31','/uploads/c08d367c-f8f5-4b1f-b039-44b41fc7eec4.png',0,0),(10079,7,'跳舞','',11467,0,0,'gdsagdsagd',1,'2021-05-17 10:00:58',NULL,NULL,NULL,14,'00:02:11','/uploads/9eb804aa-6077-4c00-aa3d-03b5c7d01e4f.png',0,0),(10080,3,'Ahou!','/uploads/65c617ab-87e5-4ac0-9130-4f369e46d5ff.mp4',27511,0,0,'十分地区',1,'2021-05-17 10:01:10',NULL,NULL,NULL,16,'00:00:56','/uploads/b7258791-dd96-4a0d-929e-3c17dfd009ac.png',0,0),(10081,5,'都别进来，没啥可看的','',13154,0,0,'都别进来，没啥可看的',1,'2021-05-17 10:02:15',NULL,NULL,'2021-05-17 09:53:00',12,'00:01:14','/uploads/1fdc2125-24c2-4f7c-9b53-ae6214a1744d.webp',0,0),(10082,5,'建议改成：人工智能取代人类','',13236,0,0,'建议改成：人工智能取代人类',1,'2021-05-17 10:02:55',NULL,NULL,'2021-05-17 10:02:00',15,'00:00:29','/uploads/631e5fb3-fd97-422d-8c6a-fc1c05cc00e3.webp',0,0),(10083,5,'香蕉♂大道东','/uploads/942acf1b-ebf5-4a3e-b6e5-74b888beeb7a.mp4',26720,0,0,'香蕉♂大道东',1,'2021-05-17 10:03:53',NULL,NULL,NULL,15,'00:01:07','/uploads/c0a88c31-c48a-43eb-b29a-56d9192e2cf0.webp',0,0),(10084,7,'龚俊的拍摄','',3893,0,0,'fsdtgertydsa',1,'2021-05-17 10:03:55',NULL,NULL,NULL,23,'00:00:53','/uploads/6b2dc4f4-2013-46fd-b401-06f111c83174.png',0,0),(10085,5,'铁 嘴 小 宝','/uploads/7a101f8c-c637-4c26-97f8-e9ff762c7826.mp4',29306,0,0,'铁 嘴 小 宝',1,'2021-05-17 10:04:30',NULL,NULL,NULL,16,'00:00:44','/uploads/8370499b-6222-49cb-bc01-76ba63b36864.webp',0,0),(10086,5,'我看你捞半天了','',14852,0,0,'我看你捞半天了',1,'2021-05-17 10:04:58',NULL,NULL,'2021-05-17 10:04:00',15,'00:01:15','/uploads/35460435-302d-47ca-8653-06f8cace0b26.webp',0,0),(10087,5,'我玩了10年也没见过这么离谱的金克丝！','/uploads/3d6a767d-5a66-4d1a-b7be-50c85976a3b7.mp4',16340,0,0,'我玩了10年也没见过这么离谱的金克丝！',1,'2021-05-17 10:05:38',NULL,NULL,NULL,16,'00:00:32','/uploads/e90a3314-9a59-4e69-899c-e85e1bda4904.webp',0,0),(10088,7,'双人舞蹈','/uploads/510976f7-67fc-487f-b04c-3cbeee714d66.mp4',7146,0,0,'aiui7uiut',1,'2021-05-17 10:06:04',NULL,NULL,NULL,24,'00:01:37','/uploads/77edaeeb-9175-4f59-8b7c-60c68fb300f5.png',0,0),(10089,5,'【扒】93分钱存银行1千年后变成43亿，活久富！《飞出个未来》之千年存款','/uploads/e7c76f8e-254c-4f36-bc1f-9d5200252c7b.mp4',16711,0,0,'【扒】93分钱存银行1千年后变成43亿，活久富！《飞出个未来》之千年存款',1,'2021-05-17 10:06:55',NULL,NULL,'2021-05-17 10:06:00',15,'00:00:35','/uploads/d945c70d-f8de-4e50-b12d-382f26fb1157.webp',0,0),(10090,7,'动漫版的迪迦','/uploads/a2c1cdc4-4537-47db-b6d3-75b2a4833658.mp4',2115,0,0,'satuyokl',1,'2021-05-17 10:08:01',NULL,NULL,NULL,7,'00:01:48','/uploads/0f1a53a7-e9fb-4900-9f12-35c0d0b12261.png',0,0),(10091,5,'都别进来，没啥可看的','/uploads/df517671-1fd0-4959-a508-9bc47f3bd8f6.mp4',20445,0,0,'都别进来，没啥可看的',1,'2021-05-17 10:08:14',NULL,NULL,'2021-05-17 10:06:00',16,'00:00:22','/uploads/f4f58879-18ab-4477-81de-30325e4a3250.webp',0,0),(10092,5,'【方舟剧场】今天凯尔希 不 在 家','/uploads/ef700bd8-1b80-4eb1-b025-f425231a4500.mp4',5878,0,0,'【方舟剧场】今天凯尔希 不 在 家',1,'2021-05-17 10:09:32',NULL,NULL,'2021-05-17 10:08:00',16,'00:00:17','/uploads/87c116ac-354b-4f6e-aa27-b5de1c378868.webp',0,0),(10093,7,'翻唱小当家','',28058,0,0,'gjyrujtyi',1,'2021-05-17 10:09:50',NULL,NULL,NULL,9,'00:02:31','/uploads/4dae27aa-e9dd-469f-9fad-2e210ec3ee09.png',0,0),(10094,5,'五排带粉嘎嘎乱杀上荣耀','/uploads/6266fac7-b9cd-492d-ba46-95f08539c8cf.mp4',2655,0,0,'五排带粉嘎嘎乱杀上荣耀',1,'2021-05-17 10:10:37',NULL,NULL,'2021-05-17 10:10:00',16,'00:00:48','/uploads/f2bad20c-6bd4-4f0a-a27c-5f4df2908d67.webp',0,0),(10095,7,'李白现状','',19103,0,0,'jtrityik',1,'2021-05-17 10:11:13',NULL,NULL,NULL,12,'00:02:25','/uploads/a86cb53c-3312-4454-8147-6d5898e2385a.png',0,0),(10096,3,'【沁音乐】猫咪是美食家的No.1【推特短视频】','/uploads/d6415efd-dc9b-484c-a5e0-839a819abccf.mp4',27552,0,0,'圣诞树',1,'2021-05-17 10:17:34',NULL,NULL,NULL,9,'00:00:26','/uploads/01085218-71f1-4136-ab81-844194ce0df4.png',0,0),(10097,5,'每日亿遍！来自老婆们的甜蜜暴击，请自带血包','/uploads/61a7f048-22fc-4f68-9908-2d04564ac93c.mp4',20449,0,0,'每日亿遍！来自老婆们的甜蜜暴击，请自带血包',1,'2021-05-17 10:17:36',NULL,NULL,'2021-05-17 10:16:00',7,'00:01:00','/uploads/86121b3e-af7e-4394-84c0-27c65f6ef294.webp',0,0),(10098,5,' 【光遇/龙卡】很短！Bye bye baby blue——','/uploads/2a3d2efc-5bc0-43d6-9ebd-870d0181319b.mp4',19588,0,0,'\n【光遇/龙卡】很短！Bye bye baby blue——',1,'2021-05-17 10:18:24',NULL,NULL,'2021-05-17 10:17:00',7,'00:00:49','/uploads/905c0f8e-80d5-4609-be85-3cd61199c122.webp',0,0),(10099,5,'【方舟剧场】今天凯尔希 不 在 家','/uploads/f2a81686-6a79-4f13-bdfd-473e81658169.mp4',6595,0,0,'【方舟剧场】今天凯尔希 不 在 家',1,'2021-05-17 10:18:53',NULL,NULL,'2021-05-17 10:18:00',7,'00:00:17','/uploads/9834b8ad-68a5-42e7-9235-564d96dd7285.webp',0,0),(10100,3,'sdds','/uploads/8f207012-f271-4e33-af60-39cdac1443a5.mp4',4213,0,0,'fsdfs',1,'2021-05-17 10:25:52',NULL,NULL,NULL,9,'00:00:25','/uploads/97f37013-1e28-4f63-996d-bac9059684b7.png',0,0),(10101,3,'投稿 【A-SOUL短视频/乃琳】最后那段有甜到你吗？','/uploads/fce65b4d-bcf2-4024-afdf-a4ff57c193da.mp4',1280,0,0,'sdsds',1,'2021-05-17 10:28:13',NULL,NULL,NULL,9,'00:00:23','/uploads/888dc615-52cd-4352-9087-2b345ee3ed71.png',0,0),(10102,3,'adsd','/uploads/d43c7ce0-2c08-4947-be77-8d45f2232c7b.mp4',23761,0,0,'',1,'2021-05-17 10:32:05',NULL,NULL,NULL,10,'00:00:25','/uploads/3185bad4-f64e-40be-a4e1-476287bdd889.png',0,0),(10103,3,'【封茗囧菌】抖音短视频 万圣节~','',24965,0,0,'dffds',1,'2021-05-17 10:34:10',NULL,NULL,NULL,10,'00:00:13','/uploads/7e9f8439-416a-44cd-a291-e4d9794641ae.webp',0,0),(10104,3,'【张艺兴】190801微博、外网短视频合集','',23544,0,0,'asda',1,'2021-05-17 10:40:15',NULL,NULL,NULL,10,'00:00:12','/uploads/7284fd4a-3893-4939-8b7a-0dc4144075b0.png',0,0),(10105,5,'【run】染  发 ｜花王泡泡染发剂1N测评','/uploads/954e00e7-7d5d-4f33-bcd2-4c0060a36bec.mp4',12825,0,0,'【run】染  发 ｜花王泡泡染发剂1N测评',1,'2021-05-17 10:42:00',NULL,NULL,'2021-05-17 10:41:00',25,'00:00:11','/uploads/8cb94377-ae13-40f6-968c-00edc0314336.webp',0,0),(10106,3,'sfes','/uploads/8f76ba1a-1286-42fb-8b76-ba47bdc62190.mp4',23493,0,0,'asdfs',1,'2021-05-17 10:42:10',NULL,NULL,NULL,10,'00:00:10','/uploads/682a30b4-c898-4ea3-9e80-bd74d84d920b.png',0,0),(10107,5,'俄罗斯女孩的那10年，心疼了','/uploads/737ee8e3-1eb6-4ea0-a41c-b4e1d1b6a704.mp4',18986,0,0,'俄罗斯女孩的那10年，心疼了',1,'2021-05-17 10:44:24',NULL,NULL,'2021-05-17 10:42:00',25,'00:00:10','/uploads/ac9006ed-521d-42cf-9866-e3e90192ef46.webp',0,0),(10108,5,'【飞特那斯】下胸肌强化训练：7个动作帮你深度强化下胸肌','/uploads/5c62b40f-0b69-426e-a338-70a5fcbda8ae.mp4',24455,0,0,'【飞特那斯】下胸肌强化训练：7个动作帮你深度强化下胸肌',1,'2021-05-17 10:45:06',NULL,NULL,'2021-05-17 10:44:00',25,'00:00:25','/uploads/74498852-eaa4-40c5-9397-73b501b6af66.webp',0,0),(10109,5,'我和大卫有说不完的情话','/uploads/9a727498-158b-4c9c-ba73-fae2f5bc0d6c.mp4',5316,0,0,'我和大卫有说不完的情话',1,'2021-05-17 10:45:44',NULL,NULL,'2021-05-17 10:45:00',25,'00:00:14','/uploads/1445f48c-7ac8-4d27-b6ed-a70e554bee0a.webp',0,0),(10110,5,'听说男生都喜欢这样的...','/uploads/9ceab72a-f590-4dcd-a9a3-b2ae58ae9491.mp4',13218,0,0,'听说男生都喜欢这样的...',1,'2021-05-17 10:46:19',NULL,NULL,'2021-05-17 10:45:00',25,'00:00:12','/uploads/1c9d4244-b907-44e8-9cdd-ef1d7bd5eb3f.webp',0,0),(10111,5,'无粉底护肤实验报告！让夏天从此告别粉底液！','/uploads/cab01ee5-62fd-4ab6-bcfe-5f9bfabc7e8f.mp4',20141,0,0,'无粉底护肤实验报告！让夏天从此告别粉底液！',1,'2021-05-17 10:47:08',NULL,NULL,'2021-05-17 10:46:00',25,'00:01:07','/uploads/2da3c55d-8538-4812-bea0-73c7c2c7e336.webp',0,0),(10112,5,'我负责锤！你们负责保护！','/uploads/187d17fa-b548-4e41-8d39-aa1425f4c69c.mp4',1052,0,0,'我负责锤！你们负责保护！',1,'2021-05-17 10:47:42',NULL,NULL,'2021-05-17 10:47:00',25,'00:00:19','/uploads/575b1f5d-9caa-4ca3-a247-70ff9b93cd60.webp',0,0),(10113,3,'【于朦胧】20210130短视频-我敢','/uploads/5c154b50-d68b-4269-9dcb-f836b76bdf3b.mp4',4836,0,0,'sAD瓦尔达·',1,'2021-05-17 10:47:52',NULL,NULL,NULL,22,'00:00:20','/uploads/26b487fa-5005-400f-8e6c-333a7b1c48e6.png',0,0),(10114,5,'体态大师：如何消除大腿前侧肌肉突出','/uploads/c855e614-16ef-4b82-b100-656f52c7415c.mp4',21024,0,0,'体态大师：如何消除大腿前侧肌肉突出',1,'2021-05-17 10:48:13',NULL,NULL,'2021-05-17 10:47:00',25,'00:00:30','/uploads/f9d4b1be-3f66-4493-8891-9c2bbfa35d11.webp',0,0),(10115,3,'【宇宙少女】Seezn综艺《Sing and Stay2》问候短视频 200804','',614,0,0,'阿达',1,'2021-05-17 10:50:10',NULL,NULL,NULL,22,'00:00:15','/uploads/0a40ad78-6ddc-4b5a-9382-8ab14abdc011.png',0,0),(10116,3,'pr综艺文字歌词古风mv字幕基本图形短视频标题素材','',0,0,0,'SA',1,'2021-05-17 10:53:14',NULL,NULL,NULL,22,'00:00:50','/uploads/10393b2d-46b1-4d4d-9d22-3f3ed9dc1d1a.png',0,0),(10117,3,'【白宇】快乐大本营·快手短视频','',28157,0,0,'',1,'2021-05-17 10:55:14',NULL,NULL,NULL,22,'00:00:15','/uploads/4756aafa-55f7-4c2e-8e0f-241ceda029d6.png',0,0),(10118,3,'投稿 美女趴着，你看到了什么','/uploads/2e4db063-8478-4f40-ad35-384cb8aba1fc.mp4',20786,0,0,'SDD',1,'2021-05-17 10:58:07',NULL,NULL,NULL,22,'00:00:34','/uploads/09373cc5-7ade-49fb-bdc7-4a299b3fce2c.png',0,0),(10119,7,'3分钟教你查steam史低特惠信息！萌新版包教包会超级简单！','/uploads/6c81e4e6-7e77-4d0c-89f5-a5a72c08c85b.mp4',19458,0,0,'fgsdgyy',1,'2021-05-17 10:58:29',NULL,NULL,NULL,11,'00:03:33','/uploads/0e19c48c-cbe2-4a99-b034-525fd284c259.png',0,0),(10120,7,'老外作死 苍蝇拍戏弄 迪米特雷斯库夫人','',4932,0,0,'iolipuiop',1,'2021-05-17 10:59:33',NULL,NULL,NULL,11,'00:00:41','/uploads/d6604d7d-8284-492e-a2d3-c361e5a3b318.png',0,0),(10121,3,'宇宙少女Luda个人IG快拍短视频 201110','',26286,0,0,'DS SA大·',1,'2021-05-17 10:59:44',NULL,NULL,NULL,22,'00:00:14','/uploads/831dcee3-e814-4904-b891-4cc4edf7a5c6.png',0,0),(10122,7,'最好看的双人联手攻击！','/uploads/161bcc97-7eec-4cb3-b811-f96f175dc7c6.mp4',26637,0,0,'truur',1,'2021-05-17 11:00:36',NULL,NULL,NULL,11,'00:02:35','/uploads/af83233d-7004-4184-8c37-f94c15b1566d.png',0,0),(10123,3,'【全昭旻】INS视频更新「和好友拍摄TikTok短视频」2020/08/24','',24328,0,0,'热情无1',1,'2021-05-17 11:02:02',NULL,NULL,NULL,22,'00:00:30','/uploads/fdeda6c6-3770-4128-ac6c-028dbfb2f1ef.png',0,0),(10124,7,'喜欢吓人是吧 - 喜欢吓人是吧','/uploads/fc735b44-6e01-4548-97c6-ef547be76dfb.mp4',11727,0,0,'kdgurskotgjr',1,'2021-05-17 11:02:05',NULL,NULL,NULL,11,'00:02:04','/uploads/a59fe7cf-a3db-497f-9561-47d793f0a129.png',0,0),(10125,7,'老外作死 苍蝇拍戏弄 迪米特雷斯库夫人','/uploads/c0d37f94-2401-4490-9bf1-546fb4129f57.mp4',15652,0,0,'tryer',1,'2021-05-17 11:03:03',NULL,NULL,NULL,11,'00:00:50','/uploads/da2e8e7a-e728-4321-8d04-019b287a1304.png',0,0),(10126,7,'当你把四大BOSS的结晶卖给公爵时公爵的不同评价【生化危机：村庄】','',13082,0,0,'uhrtuyrtuy',1,'2021-05-17 11:04:01',NULL,NULL,NULL,11,'00:01:31','/uploads/4bf1dcdb-a4c8-4119-8a85-d022f79df47c.png',0,0),(10127,5,'【白粥yono】花月成双 竖屏   是谁家的姑娘呀~','/uploads/390b68af-4ada-47b9-8fc3-a1587fb44964.mp4',18452,0,0,'【白粥yono】花月成双 竖屏   是谁家的姑娘呀~',1,'2021-05-17 11:05:04',NULL,NULL,'2021-05-17 11:04:00',24,'00:01:08','/uploads/71a5b75e-8cdb-434a-9ef5-d182dae6b193.webp',0,0),(10128,7,'如果你朝公爵扔雷管会怎么样！','/uploads/a94ee8d9-c3a3-4398-9577-47851f0cdb4b.mp4',23014,0,0,'tuytrytrsdadc',1,'2021-05-17 11:05:10',NULL,NULL,NULL,7,'00:01:13','/uploads/fb118602-e5ef-4313-a1b2-b9b8c608681e.png',0,0),(10129,5,'猫的二十二《摆动摆动》','/uploads/5ddca883-d39d-4e14-bc04-07ee064f868b.mp4',29713,0,0,'猫的二十二《摆动摆动》',1,'2021-05-17 11:05:38',NULL,NULL,'2021-05-17 11:05:00',24,'00:00:51','/uploads/54a75bc6-0f1b-4bb2-87c4-59406efc339d.webp',0,0),(10130,3,'阴 间 手 办','/uploads/d672d20e-212c-4c9e-97f5-399ba72cf0f2.mp4',19526,0,0,'颠三倒四',1,'2021-05-17 11:05:44',NULL,NULL,NULL,8,'00:00:30','/uploads/1d6555b6-3066-4429-a584-8dc4851f3dbc.png',0,0),(10131,5,'红裙还是黑裙？花间一壶酒，人间绝绝子【晓丹】花.间.酒','/uploads/b8d30cd6-3f7d-4b7d-833b-8b713446ed7a.mp4',8491,0,0,'红裙还是黑裙？花间一壶酒，人间绝绝子【晓丹】花.间.酒',1,'2021-05-17 11:06:12',NULL,NULL,'2021-05-17 11:05:00',24,'00:00:52','/uploads/13f75518-9960-4b3c-94a0-d778a2523298.webp',0,0),(10132,5,'谁说医学生没有活力？ we ride- brave girls拿了驾照也不会开车 青春阳光马尾','/uploads/7ec25ca6-40b6-42b6-ad71-0a918271e8f0.mp4',13878,0,0,'谁说医学生没有活力？ we ride- brave girls拿了驾照也不会开车 青春阳光马尾',1,'2021-05-17 11:06:49',NULL,NULL,'2021-05-17 11:06:00',24,'00:01:27','/uploads/24658a5b-398b-4dd7-8c81-6fbc03f717aa.webp',0,0),(10133,3,'匠 牛 大 日 轮','/uploads/f72cb71b-5e6b-43c5-ac0a-5a1d02498dc7.mp4',13916,0,0,'阿萨德2',1,'2021-05-17 11:07:55',NULL,NULL,NULL,8,'00:00:53','/uploads/98c357bb-4919-4110-b151-2fd29c61c336.png',0,0),(10134,3,'一个60元的高战蟹能做成什么样？','',27949,0,0,'是2',1,'2021-05-17 11:10:40',NULL,NULL,NULL,8,'00:00:54','/uploads/1feba82d-5012-4ac7-b8fb-02be6cabf1ef.png',0,0),(10135,7,'吓死了','',7996,0,0,'ghuyucxzcv',1,'2021-05-17 11:10:51',NULL,NULL,NULL,11,'00:00:10','/uploads/268d3be2-95e5-4451-a1f6-f35da49a47f4.png',0,0),(10136,3,'投稿 这是什么鬼的飚列车炮','',16133,0,0,'',1,'2021-05-17 11:12:03',NULL,NULL,NULL,8,'00:00:32','/uploads/57ab569e-b4d5-4b29-b84c-7fdd5708d80c.png',0,0),(10137,3,'30秒告诉你为何别买这个玩具','/uploads/4f954818-9422-4672-87c6-cdf6368afe6f.mp4',26678,0,0,'是否2',1,'2021-05-17 11:13:58',NULL,NULL,NULL,8,'00:00:47','/uploads/d9bf905b-1aff-47d6-b9c3-efec6004885b.png',0,0),(10138,3,'活动作品糖王周毅翻糖人偶作品《长相思》从头到脚都由糖艺纯手工制成，整个翻糖作品的每一处都是独一无二的存在，哪怕只是发饰上的小小珠花，都是忍着烫泡疼痛熬制169摄','/uploads/d37a4966-4373-43d5-ba12-ffa4bcbeaded.mp4',24993,0,0,'是',1,'2021-05-17 11:16:49',NULL,NULL,NULL,8,'00:00:47','/uploads/775ffdce-e0d5-48c4-8a6f-95c17783a781.png',0,0),(10139,3,'投稿 反浩克装甲却被浩克穿过','/uploads/3b35c3a5-a45d-4a05-a5dc-df457c597bc1.mp4',14929,0,0,'儿童袜',1,'2021-05-17 11:35:38',NULL,NULL,NULL,8,'00:00:28','/uploads/ef16180d-225a-4011-b112-5ba1fa77e86c.png',0,0),(10140,3,'撒大声地2','',0,0,0,'下发的发的',1,'2021-05-17 11:40:29',NULL,NULL,NULL,8,'00:00:44','/uploads/948636c6-f229-40d2-9ed3-f3599da38390.png',0,0),(10141,1,'test','/uploads/36182cef-0a3c-4f75-a945-19e35f498118.mp4',1,0,0,'adadad',2,'2021-05-17 15:05:33',NULL,NULL,NULL,13,'00:00:48','/uploads/f23da03d-743c-4489-908e-cb302c7d9190.jpg',0,0),(10142,5,'啊哈哈哈哈哈哈哈哈哈哈哈哈都磕到不正常了啊哈哈哈哈哈','/uploads/76521769-6f7b-4799-8766-31915ba10600.mp4',0,0,0,'啊哈哈哈哈哈哈哈哈哈哈哈哈都磕到不正常了啊哈哈哈哈哈',1,'2021-05-24 09:12:03',NULL,NULL,'2021-05-24 09:11:00',10,'00:01:08','/uploads/4dc9c637-6a45-45df-9305-c6a24e90085d.webp',0,0),(10143,5,'【力丸rikimaru】偷喝','/uploads/5f424744-1ffe-4170-b25e-5f891ef1740a.mp4',0,0,0,'【力丸rikimaru】偷喝',1,'2021-05-24 09:12:43',NULL,NULL,'2021-05-24 09:12:00',10,'00:00:30','/uploads/00822198-e97b-4355-ba45-6a3cd19bc0e6.webp',0,0),(10144,5,'【刘宇】 动画版 关山酒舞蹈','/uploads/3833303a-b04c-4199-900f-b22164b96f39.mp4',0,0,0,'【刘宇】 动画版 关山酒舞蹈',1,'2021-05-24 09:13:16',NULL,NULL,'2021-05-24 09:12:00',10,'00:00:45','/uploads/6980bf65-10e1-476d-9c70-e6c7f18ac9d3.webp',0,0),(10145,5,'浪浪钉#两家的摄影师、造型师也和亲了吗？','/uploads/d56bedfa-e256-4b6f-bb06-1a629b9b387c.mp4',0,0,0,'浪浪钉#两家的摄影师、造型师也和亲了吗？',1,'2021-05-24 09:13:47',NULL,NULL,'2021-05-24 09:13:00',10,'00:00:23','/uploads/f5f84e54-227e-46d3-9b3d-862b9b9bc903.webp',0,0),(10146,5,'啊哈哈哈哈哈哈哈哈哈哈哈哈都磕到不正常了啊哈哈哈哈哈','/uploads/d119590d-5dd1-4d5f-ad8d-a30a5c8c11ac.mp4',0,0,0,'啊哈哈哈哈哈哈哈哈哈哈哈哈都磕到不正常了啊哈哈哈哈哈',1,'2021-05-24 09:15:37',NULL,NULL,NULL,10,'00:00:50','/uploads/2cd1f7d3-ec73-45f3-87f1-69b95a63ea4c.webp',0,0),(10147,8,'派蒙发布短视频呼吁人们停止迫害派蒙','/uploads/3ae95d8e-b04a-46b4-9da8-c633239714a2.mp4',0,0,0,'电风扇等',1,'2021-05-24 09:33:15',NULL,NULL,NULL,13,'00:00:15','/uploads/ca901258-11cd-4ef3-8754-c12e2d85edaa.png',0,0),(10148,8,'【剑网3游戏日常】《沙雕短视频篇》听说你们仨缺1？','/uploads/538014e6-2a6e-426e-b37d-b3ab85d322e4.mp4',0,0,0,'撒打算4',1,'2021-05-24 09:37:07',NULL,NULL,NULL,13,'00:00:13','/uploads/cea34ce8-9907-448e-bc1b-69fd65bb70ea.png',0,0),(10149,8,'【一梦江湖短视频】男人和女人的区别','/uploads/3cfbcdbf-8399-4994-9b0f-f98a76633090.mp4',0,0,0,'师范',1,'2021-05-24 09:40:22',NULL,NULL,NULL,13,'00:00:23','/uploads/d1b3d48d-1a76-415f-8296-4c2cd2a15a2b.png',0,0),(10150,8,'【A-SOUL短视频/向晚】这里是向晚的航班广播，温馨提示各位旅客：本次航班，载有C4！！','/uploads/f17a1ea5-407b-4525-9d3f-ac33fbc170c3.mp4',0,0,0,'分身乏术1',1,'2021-05-24 09:43:33',NULL,NULL,NULL,13,'00:00:29','/uploads/4ae0ee7d-e620-434b-be50-abf898f63951.png',0,0),(10151,8,'【一梦江湖短视频】师傅的笔试招亲','/uploads/d21aebf5-19a3-433a-b9b7-39f73d26d847.mp4',0,0,0,'erf',1,'2021-05-24 09:58:51',NULL,NULL,NULL,13,'00:00:27','/uploads/556dc9ff-d1bf-4387-95bf-9d7d2e3016d1.png',0,0),(10152,8,'【明侠】我愿做你口中的那“一人” | 过桥','/uploads/6b8fdcae-63cf-4982-b07e-3f606fab0334.mp4',0,0,0,'df',1,'2021-05-24 10:00:54',NULL,NULL,NULL,13,'00:00:19','/uploads/ea33432a-0145-4f5e-9771-95e3cc7f4eec.png',0,0),(10153,5,'“他不羁的脸像天色将晚。”｜演员请就位第六期张哲瀚《致青春》个人向混剪完整版','/uploads/e78342fb-6e4d-4534-9192-951050c7b853.mp4',0,0,0,'“他不羁的脸像天色将晚。”｜演员请就位第六期张哲瀚《致青春》个人向混剪完整版',1,'2021-05-24 10:05:50',NULL,NULL,'2021-05-24 10:05:00',23,'00:00:15','/uploads/29ff0d00-8504-4158-a89a-19d967443ba4.webp',0,0),(10154,5,'远近闻名的排骨汤，没想到竟是用这个材料做的……','/uploads/9ef839a6-4f97-41e0-983e-abf69471c9fe.mp4',0,0,0,'远近闻名的排骨汤，没想到竟是用这个材料做的……',1,'2021-05-24 10:06:18',NULL,NULL,NULL,23,'00:00:29','/uploads/f459cdae-4f65-4a80-8862-4ea9942bd9ee.webp',0,0),(10155,5,'肖战水仙剧/三羡/强强/甜虐/不知缘深/第一集','/uploads/e7a177ea-9cd0-436d-bf83-516d8f836913.mp4',0,0,0,'肖战水仙剧/三羡/强强/甜虐/不知缘深/第一集',1,'2021-05-24 10:06:49',NULL,NULL,NULL,23,'00:00:24','/uploads/081eb53e-7f1e-4512-9514-4631c83a7675.webp',0,0),(10156,8,'【拍漫展】不敢拍腿？你就找熟人下手？60帧 成都漫展 IGS FOC 小姐姐短视频','/uploads/296ddbb0-72e6-4064-a2ac-8d354e202ec5.mp4',0,0,0,'多少度',1,'2021-05-24 10:07:06',NULL,NULL,NULL,14,'00:00:38','/uploads/f404dce0-f2fb-4f7c-ae82-65cb3f8227d2.png',0,0),(10157,5,'【PR教程】两分钟教会你如何用PR文字遮罩制作一个炫酷的动态片头！','/uploads/92613b00-6b02-4b19-ac91-c3d8e003fa75.mp4',0,0,0,'【PR教程】两分钟教会你如何用PR文字遮罩制作一个炫酷的动态片头！',1,'2021-05-24 10:07:20',NULL,NULL,'2021-05-24 10:06:00',23,'00:00:57','/uploads/5958dd8c-b793-486c-ad27-8e154f5ea894.webp',0,0),(10158,5,'开分8.2，《山河令》 2021第一枪 浪得我心慌','/uploads/0bae84d2-67a0-4250-8c62-98a08a8508eb.mp4',0,0,0,'开分8.2，《山河令》 2021第一枪 浪得我心慌',1,'2021-05-24 10:07:58',NULL,NULL,'2021-05-24 10:07:00',23,'00:00:15','/uploads/8700183f-ee75-4dc8-bd88-106a3e0c4757.webp',0,0),(10159,5,'两个作精疯狂洒狗血，《大约在冬季》真是尬死我了！','/uploads/20144e91-3c64-4602-8c75-c4158d31870e.mp4',0,0,0,'两个作精疯狂洒狗血，《大约在冬季》真是尬死我了！',1,'2021-05-24 10:08:51',NULL,NULL,'2021-05-24 10:08:00',23,'00:00:50','/uploads/9dab1b41-cd2a-4f69-8a3b-c063a8beb7e4.webp',0,0),(10160,5,'每天亿遍，防止抑郁。','/uploads/8077ae69-91cd-4c1c-b394-7afb5fd62d25.mp4',0,0,0,'每天亿遍，防止抑郁。',1,'2021-05-24 10:09:20',NULL,NULL,NULL,23,'00:00:14','/uploads/570055a5-a842-4545-aafa-7a768042cb6c.webp',0,0),(10161,8,'【A-SOUL短视频/贝拉】还有谁不会的，赶紧收藏学起来吧~','/uploads/07e08995-65f4-4cb2-bac9-7cbfbcffe932.mp4',0,0,0,'所答非所问',1,'2021-05-24 10:09:43',NULL,NULL,NULL,14,'00:00:13','/uploads/6d377cf9-e34e-4cb4-8ce5-48e7ec8b91d6.png',0,0),(10162,5,'哈哈哈哈哈哈哈哈哈','/uploads/66696c72-5bd6-4dcd-ae7a-1a47298aceee.mp4',1,0,0,'发放的按下菜农干按呼出boia不从不去啊oic42',1,'2021-05-24 10:11:46',NULL,NULL,'2021-05-24 10:10:00',22,'00:00:24','/uploads/ddf7c3e5-668a-46f6-a22b-62ead887bc52.webp',0,0),(10163,8,'【微剧场】短视频刷多了之后，我打球的样子…','/uploads/6ca1e89c-5e5b-4ae0-93e4-df43af4328cb.mp4',0,0,0,'地方2',1,'2021-05-24 10:13:32',NULL,NULL,NULL,14,'00:00:16','/uploads/eb41cd2b-3fd9-449f-9174-77abb0bb44d7.png',0,0),(10164,8,'为这20秒的短视频，一路奔袭六百里','/uploads/8f85575c-4e84-40f3-a0e0-ead4ba8308b2.mp4',0,0,0,'圣诞树',1,'2021-05-24 10:20:42',NULL,NULL,NULL,14,'00:00:24','/uploads/e2c44216-cd44-41a0-a148-f9740fcbad30.png',0,0),(10165,8,'第一次自制短视频，BGM是自己翻唱的心动，画面是之前去茶卡盐湖拍的视频，希望大家','/uploads/a65c9545-6c1e-40fa-8d46-75815bf46a42.mp4',0,0,0,'燃放光辉',1,'2021-05-24 10:45:25',NULL,NULL,NULL,9,'00:00:13','/uploads/30d69d01-c34f-4064-badc-fab6dae16213.png',0,0),(10166,8,'（短视频）米卡“家暴”庆怜现场（bgm是一个tens的翻唱）','/uploads/97290bf4-6b5e-4369-becd-c4ced47e3558.mp4',0,0,0,'【】票哦【',1,'2021-05-24 10:47:46',NULL,NULL,NULL,9,'00:00:07','/uploads/d4902171-6f5c-4486-9494-c1ffec8b15cb.png',0,0),(10167,8,'13岁女生翻唱｜短视频翻唱《心跳的证明》','/uploads/0765b0a4-9f10-45df-8a28-dfb5c50a318b.mp4',0,0,0,'大法师q',1,'2021-05-24 10:51:08',NULL,NULL,NULL,9,'00:00:19','/uploads/cfd03a65-63eb-4369-8f90-2ed49464aca4.png',0,0),(10169,1,'adad','/uploads/4c67f3b1-9afa-4090-8ca9-1000ec3043b5.mp4',0,0,0,'adadad',2,'2021-05-24 23:24:12',NULL,NULL,'2005-05-24 23:23:00',14,'00:01:42','/uploads/78176e04-2b3a-4d16-b26d-e7f8a0ac5eb5.png',0,0);

/*Table structure for table `p_videos_thumbsup` */

DROP TABLE IF EXISTS `p_videos_thumbsup`;

CREATE TABLE `p_videos_thumbsup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(11) NOT NULL COMMENT '点赞人（来源于pili_user用户表的用户id）',
  `video_id` int(11) NOT NULL COMMENT '视频id（来源于p_video视频表的视频id）',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `p_videos_thumbsup_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='视频点赞记录表';

/*Data for the table `p_videos_thumbsup` */

insert  into `p_videos_thumbsup`(`id`,`user_id`,`video_id`,`createTime`) values (3,3,10000,'2021-04-11 14:11:45'),(4,2,10001,'2021-04-11 14:11:49'),(29,1,10009,'2021-05-06 11:03:33'),(32,1,10048,'2021-05-06 11:14:23'),(33,1,10000,'2021-05-06 11:21:57'),(34,2,10000,'2021-05-06 11:58:24'),(36,1,10001,'2021-05-09 17:59:39'),(39,1,10053,'2021-05-14 08:41:33'),(41,1,10051,'2021-05-14 08:48:25'),(42,1,10046,'2021-05-14 08:48:38'),(43,1,10008,'2021-05-14 11:02:10'),(44,1,10078,'2021-05-17 11:44:08');

/*Table structure for table `t_base_pinyin` */

DROP TABLE IF EXISTS `t_base_pinyin`;

CREATE TABLE `t_base_pinyin` (
  `pin_yin_` varchar(255) CHARACTER SET gbk NOT NULL,
  `code_` int(11) NOT NULL,
  PRIMARY KEY (`code_`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `t_base_pinyin` */

insert  into `t_base_pinyin`(`pin_yin_`,`code_`) values ('zuo',10254),('zun',10256),('zui',10260),('zuan',10262),('zu',10270),('zou',10274),('zong',10281),('zi',10296),('zhuo',10307),('zhun',10309),('zhui',10315),('zhuang',10322),('zhuan',10328),('zhuai',10329),('zhua',10331),('zhu',10519),('zhou',10533),('zhong',10544),('zhi',10587),('zheng',10764),('zhen',10780),('zhe',10790),('zhao',10800),('zhang',10815),('zhan',10832),('zhai',10838),('zha',11014),('zeng',11018),('zen',11019),('zei',11020),('ze',11024),('zao',11038),('zang',11041),('zan',11045),('zai',11052),('za',11055),('yun',11067),('yue',11077),('yuan',11097),('yu',11303),('you',11324),('yong',11339),('yo',11340),('ying',11358),('yin',11536),('yi',11589),('ye',11604),('yao',11781),('yang',11798),('yan',11831),('ya',11847),('xun',11861),('xue',11867),('xuan',12039),('xu',12058),('xiu',12067),('xiong',12074),('xing',12089),('xin',12099),('xie',12120),('xiao',12300),('xiang',12320),('xian',12346),('xia',12359),('xi',12556),('wu',12585),('wo',12594),('weng',12597),('wen',12607),('wei',12802),('wang',12812),('wan',12829),('wai',12831),('wa',12838),('tuo',12849),('tun',12852),('tui',12858),('tuan',12860),('tu',12871),('tou',12875),('tong',12888),('ting',13060),('tie',13063),('tiao',13068),('tian',13076),('ti',13091),('teng',13095),('te',13096),('tao',13107),('tang',13120),('tan',13138),('tai',13147),('ta',13318),('suo',13326),('sun',13329),('sui',13340),('suan',13343),('su',13356),('sou',13359),('song',13367),('si',13383),('shuo',13387),('shun',13391),('shui',13395),('shuang',13398),('shuan',13400),('shuai',13404),('shua',13406),('shu',13601),('shou',13611),('shi',13658),('sheng',13831),('shen',13847),('she',13859),('shao',13870),('shang',13878),('shan',13894),('shai',13896),('sha',13905),('seng',13906),('sen',13907),('se',13910),('sao',13914),('sang',13917),('san',14083),('sai',14087),('sa',14090),('ruo',14092),('run',14094),('rui',14097),('ruan',14099),('ru',14109),('rou',14112),('rong',14122),('ri',14123),('reng',14125),('ren',14135),('re',14137),('rao',14140),('rang',14145),('ran',14149),('qun',14151),('que',14159),('quan',14170),('qu',14345),('qiu',14353),('qiong',14355),('qing',14368),('qin',14379),('qie',14384),('qiao',14399),('qiang',14407),('qian',14429),('qia',14594),('qi',14630),('pu',14645),('po',14654),('ping',14663),('pin',14668),('pie',14670),('piao',14674),('pian',14678),('pi',14857),('peng',14871),('pen',14873),('pei',14882),('pao',14889),('pang',14894),('pan',14902),('pai',14908),('pa',14914),('ou',14921),('o',14922),('nuo',14926),('nue',14928),('nuan',14929),('nv',14930),('nu',14933),('nong',14937),('niu',14941),('ning',15109),('nin',15110),('nie',15117),('niao',15119),('niang',15121),('nian',15128),('ni',15139),('neng',15140),('nen',15141),('nei',15143),('ne',15144),('nao',15149),('nang',15150),('nan',15153),('nai',15158),('na',15165),('mu',15180),('mou',15183),('mo',15362),('miu',15363),('ming',15369),('min',15375),('mie',15377),('miao',15385),('mian',15394),('mi',15408),('meng',15416),('men',15419),('mei',15435),('me',15436),('mao',15448),('mang',15454),('man',15625),('mai',15631),('ma',15640),('luo',15652),('lun',15659),('lue',15661),('luan',15667),('lv',15681),('lu',15701),('lou',15707),('long',15878),('liu',15889),('ling',15903),('lin',15915),('lie',15920),('liao',15933),('liang',15944),('lian',15958),('lia',15959),('li',16155),('leng',16158),('lei',16169),('le',16171),('lao',16180),('lang',16187),('lan',16202),('lai',16205),('la',16212),('kuo',16216),('kun',16220),('kui',16393),('kuang',16401),('kuan',16403),('kuai',16407),('kua',16412),('ku',16419),('kou',16423),('kong',16427),('keng',16429),('ken',16433),('ke',16448),('kao',16452),('kang',16459),('kan',16465),('kai',16470),('ka',16474),('jun',16647),('jue',16657),('juan',16664),('ju',16689),('jiu',16706),('jiong',16708),('jing',16733),('jin',16915),('jie',16942),('jiao',16970),('jiang',16983),('jian',17185),('jia',17202),('ji',17417),('huo',17427),('hun',17433),('hui',17454),('huang',17468),('huan',17482),('huai',17487),('hua',17496),('hu',17676),('hou',17683),('hong',17692),('heng',17697),('hen',17701),('hei',17703),('he',17721),('hao',17730),('hang',17733),('han',17752),('hai',17759),('ha',17922),('guo',17928),('gun',17931),('gui',17947),('guang',17950),('guan',17961),('guai',17964),('gua',17970),('gu',17988),('gou',17997),('gong',18012),('geng',18181),('gen',18183),('gei',18184),('ge',18201),('gao',18211),('gang',18220),('gan',18231),('gai',18237),('ga',18239),('fu',18446),('fou',18447),('fo',18448),('feng',18463),('fen',18478),('fei',18490),('fang',18501),('fan',18518),('fa',18526),('er',18696),('en',18697),('e',18710),('duo',18722),('dun',18731),('dui',18735),('duan',18741),('du',18756),('dou',18763),('dong',18773),('diu',18774),('ding',18783),('die',18952),('diao',18961),('dian',18977),('di',18996),('deng',19003),('de',19006),('dao',19018),('dang',19023),('dan',19038),('dai',19212),('da',19218),('cuo',19224),('cun',19227),('cui',19235),('cuan',19238),('cu',19242),('cou',19243),('cong',19249),('ci',19261),('chuo',19263),('chun',19270),('chui',19275),('chuang',19281),('chuan',19288),('chuai',19289),('chu',19467),('chou',19479),('chong',19484),('chi',19500),('cheng',19515),('chen',19525),('che',19531),('chao',19540),('chang',19715),('chan',19725),('chai',19728),('cha',19739),('ceng',19741),('ce',19746),('cao',19751),('cang',19756),('can',19763),('cai',19774),('ca',19775),('bu',19784),('bo',19805),('bing',19976),('bin',19982),('bie',19986),('biao',19990),('bian',20002),('bi',20026),('beng',20032),('ben',20036),('bei',20051),('bao',20230),('bang',20242),('ban',20257),('bai',20265),('ba',20283),('ao',20292),('ang',20295),('an',20304),('ai',20317),('a',20319);

/* Function  structure for function  `to_pinyin` */

/*!50003 DROP FUNCTION IF EXISTS `to_pinyin` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `to_pinyin`(NAME VARCHAR(255) CHARSET gbk) RETURNS varchar(255) CHARSET gbk
BEGIN
DECLARE mycode INT;
DECLARE tmp_lcode VARCHAR(2) CHARSET gbk;
DECLARE lcode INT;
DECLARE tmp_rcode VARCHAR(2) CHARSET gbk;
DECLARE rcode INT;
DECLARE mypy VARCHAR(255) CHARSET gbk DEFAULT '';
DECLARE lp INT;
SET mycode = 0;
SET lp = 1;
SET NAME = HEX(NAME);
WHILE lp < LENGTH(NAME) DO
SET tmp_lcode = SUBSTRING(NAME, lp, 2);
SET lcode = CAST(ASCII(UNHEX(tmp_lcode)) AS UNSIGNED);
SET tmp_rcode = SUBSTRING(NAME, lp + 2, 2);
SET rcode = CAST(ASCII(UNHEX(tmp_rcode)) AS UNSIGNED);
IF lcode > 128 THEN
SET mycode =65536 - lcode * 256 - rcode ;
SELECT CONCAT(mypy,pin_yin_) INTO mypy FROM t_base_pinyin WHERE CODE_ >= ABS(mycode) ORDER BY CODE_ ASC LIMIT 1;
SET lp = lp + 4;
ELSE
SET mypy = CONCAT(mypy,CHAR(CAST(ASCII(UNHEX(SUBSTRING(NAME, lp, 2))) AS UNSIGNED)));
SET lp = lp + 2;
END IF;
END WHILE;
RETURN LOWER(mypy);
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
