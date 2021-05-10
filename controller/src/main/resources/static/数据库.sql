/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.7.17 : Database - pili
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='弹幕表';

/*Data for the table `p_barrage` */

insert  into `p_barrage`(`id`,`user_id`,`video_id`,`content`,`videotime`,`createTime`,`type`,`color`,`size`,`post_ip`) values (0,1,10000,'adasdasdad','00:00:11','2021-04-27 09:44:53','right','rgb(255, 255, 255)',NULL,NULL),(1,1,10000,'我是up主，欢迎大家发布弹幕','00:05:00','2021-04-09 10:46:28',NULL,NULL,NULL,NULL),(2,2,10000,'我是张三，我发弹幕','00:07:00','2021-04-09 10:47:56',NULL,NULL,NULL,NULL),(3,3,10001,'cpdd','00:01:00','2021-04-10 10:40:28',NULL,NULL,NULL,NULL),(4,3,10002,'cpdd','00:11:00','2021-04-10 14:29:11',NULL,NULL,NULL,NULL),(6,1,10000,'啊啊啊啊','00:01:23','2021-04-27 11:36:23','right','rgb(255, 255, 255)',NULL,NULL),(7,1,10000,'sdfsdfsdfs','00:00:16','2021-04-30 11:04:42','right','rgb(255, 255, 255)',NULL,NULL),(8,1,10000,'adasd','00:00:12','2021-04-30 11:05:30','top','rgb(255, 255, 255)',NULL,NULL),(9,1,10000,'asdsad','00:00:16','2021-04-30 11:05:47','top','rgb(137, 213, 255)',NULL,NULL),(10,1,10000,'笑死，根本吓不死','00:00:08','2021-05-05 10:21:51','right','rgb(255, 255, 255)',NULL,NULL),(11,1,10000,'aaa','00:00:10','2021-05-05 10:51:28','right','rgb(255, 255, 255)',NULL,NULL),(12,1,10000,'阿巴阿巴阿巴','00:00:10','2021-05-05 10:52:26','right','rgb(255, 255, 255)',NULL,NULL),(13,1,10000,'1','00:00:10','2021-05-05 11:10:20','right','rgb(255, 255, 255)',NULL,NULL),(14,1,10000,'2','00:00:10','2021-05-05 11:10:22','right','rgb(255, 255, 255)',NULL,NULL),(15,1,10000,'3','00:00:10','2021-05-05 11:10:24','right','rgb(255, 255, 255)',NULL,NULL),(16,1,10000,'4','00:00:10','2021-05-05 11:10:26','right','rgb(255, 255, 255)',NULL,NULL),(17,1,10045,'1','00:00:16','2021-05-06 11:08:33','right','rgb(255, 255, 255)',NULL,NULL),(18,1,10045,'2','00:00:16','2021-05-06 11:08:36','right','rgb(255, 255, 255)',NULL,NULL),(19,1,10045,'3','00:00:16','2021-05-06 11:08:38','right','rgb(255, 255, 255)',NULL,NULL),(20,1,10045,'4','00:00:16','2021-05-06 11:08:41','right','rgb(255, 255, 255)',NULL,NULL),(21,1,10045,'5','00:00:16','2021-05-06 11:08:43','right','rgb(255, 255, 255)',NULL,NULL),(22,1,10045,'6','00:00:16','2021-05-06 11:08:46','right','rgb(255, 255, 255)',NULL,NULL),(23,2,10000,'我是张三，我为自己代言','00:00:10','2021-05-06 11:58:14','right','rgb(255, 255, 255)',NULL,NULL),(24,1,10000,'？？','00:00:12','2021-05-10 09:02:54','right','rgb(255, 255, 255)',NULL,NULL),(25,1,10000,'啊啊','00:00:12','2021-05-10 09:03:08','right','rgb(255, 255, 255)',NULL,NULL),(26,1,10044,'zzzz','00:00:05','2021-05-10 09:37:46','right','rgb(255, 255, 255)',NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='视频分类';

/*Data for the table `p_category` */

insert  into `p_category`(`id`,`categoryName`,`parentId`,`createdBy`,`creationTime`,`modifyBy`,`modifyDate`) values (1,'全部',0,1,'2021-04-09 10:17:52',1,'2021-04-09 10:17:57'),(2,'动画',1,1,'2021-04-09 10:18:21',1,'2021-04-09 10:18:25'),(3,'游戏',1,1,'2021-04-09 10:18:37',1,'2021-04-09 10:18:39'),(4,'生活',1,1,'2021-04-09 10:20:03',1,'2021-04-09 10:20:03'),(5,'音乐',1,1,'2021-04-09 10:20:15',1,'2021-04-09 10:20:15'),(6,'鬼畜',1,1,'2021-04-09 10:20:29',1,'2021-04-09 10:20:29'),(7,'MMD·3D',2,1,'2021-04-09 10:21:14',1,'2021-04-09 10:21:17'),(8,'手办·模型',2,1,'2021-04-09 10:21:58',1,'2021-04-09 10:21:58'),(9,'翻唱',5,1,'2021-04-09 10:23:00',1,'2021-04-09 10:23:00'),(10,'原唱',5,1,'2021-04-09 10:23:00',1,'2021-04-09 10:23:00'),(11,'单机游戏',3,1,'2021-04-09 10:23:30',1,'2021-04-09 10:23:30'),(12,'电子竞技',3,1,'2021-04-09 10:23:30',1,'2021-04-09 10:23:30'),(13,'搞笑',4,1,'2021-04-09 10:23:59',1,'2021-04-09 10:23:59'),(14,'日常',4,1,'2021-04-09 10:23:59',1,'2021-04-09 10:23:59'),(15,'鬼畜调教',6,1,'2021-04-09 10:24:58',1,'2021-04-09 10:24:58'),(16,'人力VOCALOID',6,1,'2021-04-09 10:24:58',1,'2021-04-09 10:24:58'),(20,'娱乐',1,1,'2021-05-08 09:22:07',1,'2021-05-08 09:22:07'),(21,'时尚',1,1,'2021-05-08 09:22:14',1,'2021-05-08 09:22:14'),(22,'综艺',20,1,'2021-05-08 09:52:10',1,'2021-05-08 09:52:10'),(23,'明星',20,1,'2021-05-08 09:52:22',1,'2021-05-08 09:52:22');

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
  PRIMARY KEY (`id`),
  KEY `video_id` (`video_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `p_comment_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`),
  CONSTRAINT `p_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='评论表';

/*Data for the table `p_comment` */

insert  into `p_comment`(`id`,`video_id`,`user_id`,`parent_id`,`thumbs_up_num`,`content`,`createTime`) values (1,10000,1,0,2,'你好，这是本视频第一个评论','2021-04-09 10:44:11'),(2,10000,2,1,0,'你好，admin，我是张三','2021-04-09 10:44:29'),(3,10000,3,1,0,'admin，我是李四','2021-04-09 10:44:49'),(4,10000,3,2,0,'张三，我是李四','2021-04-09 10:45:07'),(5,10001,1,0,0,'火钳刘明','2021-04-12 10:27:22'),(6,10002,2,0,0,'火钳刘明','2021-04-12 10:28:22'),(7,10000,1,0,0,'谢谢大家观看','2021-04-12 14:01:11');

/*Table structure for table `p_comment_thumbsup` */

DROP TABLE IF EXISTS `p_comment_thumbsup`;

CREATE TABLE `p_comment_thumbsup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(11) DEFAULT NULL COMMENT '点赞人（来源于pili_user用户表的用户id）',
  `comment_id` bigint(20) DEFAULT NULL COMMENT '评论id（来源于p_comment评论表的id）',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `p_comment_thumbsup_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_comment_thumbsup_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `p_comment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='视频点赞记录表';

/*Data for the table `p_comment_thumbsup` */

insert  into `p_comment_thumbsup`(`id`,`user_id`,`comment_id`) values (1,2,1),(2,3,1);

/*Table structure for table `p_history` */

DROP TABLE IF EXISTS `p_history`;

CREATE TABLE `p_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `video_id` int(11) DEFAULT NULL COMMENT '视频（来源于p_video视频表的视频id）',
  `user_id` int(11) DEFAULT NULL COMMENT '观看者（来源于pili_user用户表的用户id）',
  `viewTime` datetime DEFAULT NULL COMMENT '观看时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `p_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_history_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='浏览历史表';

/*Data for the table `p_history` */

insert  into `p_history`(`id`,`video_id`,`user_id`,`viewTime`) values (1,10000,1,'2021-04-09 10:31:25');

/*Table structure for table `p_postip` */

DROP TABLE IF EXISTS `p_postip`;

CREATE TABLE `p_postip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(100) NOT NULL,
  `video_pv` int(11) NOT NULL,
  `postDate` datetime NOT NULL,
  `type` int(11) NOT NULL COMMENT '0-视频 1-弹幕',
  PRIMARY KEY (`id`),
  KEY `p_postip_video_1` (`video_pv`),
  CONSTRAINT `p_postip_video_1` FOREIGN KEY (`video_pv`) REFERENCES `p_videos` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

/*Data for the table `p_postip` */

insert  into `p_postip`(`id`,`ip`,`video_pv`,`postDate`,`type`) values (13,'192.168.43.174',10000,'2021-05-05 12:17:33',0),(14,'192.168.43.174',10000,'2021-05-05 12:17:36',0),(15,'192.168.43.174',10000,'2021-05-05 12:22:47',0),(16,'192.168.16.206',10000,'2021-05-06 10:59:05',0),(17,'192.168.16.206',10000,'2021-05-06 11:03:27',0),(18,'192.168.16.206',10045,'2021-05-06 11:07:31',0),(19,'192.168.16.206',10045,'2021-05-06 11:08:04',0),(20,'192.168.16.206',10045,'2021-05-06 11:08:33',1),(21,'192.168.16.206',10045,'2021-05-06 11:08:36',1),(22,'192.168.16.206',10045,'2021-05-06 11:08:38',1),(23,'192.168.16.206',10045,'2021-05-06 11:08:41',1),(24,'192.168.16.206',10045,'2021-05-06 11:08:43',1),(25,'192.168.16.206',10045,'2021-05-06 11:08:46',1),(26,'192.168.16.206',10045,'2021-05-06 11:09:21',0),(27,'192.168.16.206',10048,'2021-05-06 11:14:20',0),(28,'192.168.16.206',10000,'2021-05-06 11:21:28',0),(29,'192.168.16.206',10000,'2021-05-06 11:58:03',0),(30,'192.168.16.206',10000,'2021-05-06 11:58:14',1),(31,'192.168.0.141',10000,'2021-05-08 11:42:46',0),(32,'192.168.0.141',10000,'2021-05-08 11:46:45',0),(33,'0:0:0:0:0:0:0:1',10000,'2021-05-10 08:57:22',0),(34,'0:0:0:0:0:0:0:1',10000,'2021-05-10 09:00:33',0),(35,'0:0:0:0:0:0:0:1',10000,'2021-05-10 09:02:57',1),(36,'0:0:0:0:0:0:0:1',10000,'2021-05-10 09:03:10',1),(37,'0:0:0:0:0:0:0:1',10000,'2021-05-10 09:05:51',0),(38,'0:0:0:0:0:0:0:1',10000,'2021-05-10 09:10:37',0),(39,'0:0:0:0:0:0:0:1',10044,'2021-05-10 09:37:40',0),(40,'0:0:0:0:0:0:0:1',10044,'2021-05-10 09:37:46',1),(41,'0:0:0:0:0:0:0:1',10044,'2021-05-10 09:38:00',0),(42,'0:0:0:0:0:0:0:1',10000,'2021-05-10 10:15:54',0),(43,'0:0:0:0:0:0:0:1',10000,'2021-05-10 11:49:47',0);

/*Table structure for table `p_search_hot` */

DROP TABLE IF EXISTS `p_search_hot`;

CREATE TABLE `p_search_hot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(160) NOT NULL,
  `searchDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `p_search_hot` */

insert  into `p_search_hot`(`id`,`title`,`searchDate`) values (1,'一','2021-05-10'),(2,'夏洛特','2021-05-10'),(3,'夏洛特','2021-05-10'),(4,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','2021-05-10'),(5,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','2021-05-10'),(6,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(7,'【原神动画】食蒙之灵','2021-05-10'),(8,'a','2021-05-10'),(9,'第二个视频','2021-05-10'),(10,'第','2021-05-10'),(11,'的','2021-05-10'),(12,'全站第三个视频','2021-05-10'),(13,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','2021-05-10'),(14,'【原神动画】食蒙之灵','2021-05-10'),(15,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(16,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(17,'啊我打打打打打大大','2021-05-10'),(18,'【原神动画】食蒙之灵','2021-05-10'),(19,'【原神动画】食蒙之灵','2021-05-10'),(20,'第二个视频','2021-05-10'),(21,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','2021-05-10');

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='订阅信息表';

/*Data for the table `p_subscribe` */

insert  into `p_subscribe`(`id`,`subscribe_id`,`subscribed_id`,`createTime`) values (3,4,1,'2021-04-06 14:27:17'),(7,3,1,'2021-04-26 11:04:50'),(23,2,1,'2021-05-06 11:58:26'),(30,1,4,'2021-05-10 08:46:30'),(31,1,3,'2021-05-10 08:46:31'),(32,1,2,'2021-05-10 08:46:31');

/*Table structure for table `p_user` */

DROP TABLE IF EXISTS `p_user`;

CREATE TABLE `p_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `userName` varchar(50) NOT NULL COMMENT '用户名',
  `phone` varchar(30) NOT NULL COMMENT '手机号',
  `upwd` varchar(50) NOT NULL COMMENT '密码',
  `utype` int(11) NOT NULL DEFAULT '1' COMMENT '用户类型 1-用户 2-up主 3-管理员',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户表';

/*Data for the table `p_user` */

insert  into `p_user`(`uid`,`userName`,`phone`,`upwd`,`utype`) values (1,'admin','18388883333','123456',3),(2,'zhangsan','13323232323','123456',2),(3,'lisi','15553212345','123456',1),(4,'wangwu','14423231234','123456',1);

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
  `loginDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `p_user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

/*Data for the table `p_user_info` */

insert  into `p_user_info`(`id`,`user_id`,`subscribeNum`,`fansNum`,`level`,`experience`,`user_pic`,`up_desc`,`nickName`,`up_spaceNotice`,`createTime`,`birthday`,`loginDate`) values (1,1,3,3,3,1050,'/uploads/877514110aa3427f943ddc7dd55ef48aa7bf8942.jpg@96w_96h_1c.webp','这是本站第一个用户','Micah','这是本站第一个用户','2021-04-20 10:44:49','2021-04-20 10:44:52','2021-05-10'),(2,2,1,1,1,260,'/uploads/defaultpic.png','你好，我是张三','张三',NULL,NULL,NULL,'2021-05-08'),(3,3,1,1,3,350,'/uploads/defaultpic.png','你好，我是李四','李四',NULL,NULL,NULL,'2021-05-07'),(4,4,1,1,4,750,'/uploads/defaultpic.png','这个人没有填简介啊~~~','王五',NULL,NULL,NULL,'2021-05-07');

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
) ENGINE=InnoDB AUTO_INCREMENT=10049 DEFAULT CHARSET=utf8 COMMENT='视频信息表';

/*Data for the table `p_videos` */

insert  into `p_videos`(`video_pv`,`video_userid`,`video_title`,`video_url`,`video_play`,`video_like`,`video_collect`,`video_desc`,`video_state`,`video_updatetime`,`video_checkuid`,`video_checktime`,`video_releasetime`,`video_type`,`video_time`,`video_image`,`video_comment`,`video_barrage`) values (10000,1,'第一个视频','/uploads/31a0f6ea-c0ff-4164-b3f5-742cc51921a7.mp4',2006,3,1,'这是简介',1,'2021-04-09 10:29:44',1,'2021-04-09 10:29:55','2021-04-09 10:29:57',14,'00:11:23','/images/1.jpg',5,17),(10001,2,'张三的犯罪视频','/uploads/622afeea9b9706fba2c8331476a4c30ec726fbe9.png',1000,2,1,'-----',2,'2021-04-09 11:01:52',1,'2021-04-09 11:01:57','2021-04-09 11:02:00',14,'00:09:54','/images/2.jpg',1,1),(10002,1,'全站第三个视频','/uploads/c7029540b64349775a8c4ea263eef8f4ff617e5a.png',200,0,0,'---',0,'2021-04-12 10:08:58',1,'2021-05-07 10:09:02','2021-05-01 10:09:06',13,'00:25:33','/images/3.jpg',6,7),(10003,3,'不要“做”挑战？（第十二期）','/uploads/xxx',0,0,0,'--',0,'2021-04-21 12:01:21',1,'2021-04-21 12:01:27','2021-04-21 12:01:30',11,'23:23:00','/uploads/a2adb3d24078ea3dfb466ec78d34c3fb8da0498e.jpg@412w_232h_1c.jpg',0,0),(10004,3,'打牌时会颜艺的超能力少女你喜欢吗？【间谍过家家38】','/xx',0,0,0,'--',0,'2021-04-21 12:05:47',1,'2021-04-21 12:05:48','2021-04-21 12:05:51',8,'14:14:00','/uploads/022d45051f2d9b3ad77d898e08c27b8f05837305.jpg@160w_100h.webp',0,0),(10005,3,'四大巨头聚会 小蜘蛛冒死直播 [转生成蜘蛛又怎样 主线篇13]','/uploads/',0,0,0,'--',1,'2021-04-21 12:10:33',1,'2021-04-21 12:10:33','2021-04-21 12:10:33',9,'06:59:00','/uploads/ebdcbbd6270073c4e66c42e34c7a054a07924999.jpg@160w_100h.webp',0,0),(10006,3,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','/uploads/',100,0,0,'--',1,'2021-04-21 12:11:43',1,'2021-04-21 12:11:43','2021-04-21 12:11:43',8,'06:59:00','/uploads/52ab77c8a0c604bc1d281d4add09783ddca95ee3.jpg@160w_100h.webp',0,0),(10007,2,'第二个视频','/uploads/34f9e5f68be36596e7f956c6c09634cd470507ee.png',50,15,6,'这是简介',1,'2021-04-09 10:29:44',1,'2021-04-09 10:29:55','2021-04-09 10:29:57',12,'00:11:23','/images/a2.jpg',5,2),(10008,2,'第四个视频','/uploads/622afeea9b9706fba2c8331476a4c30ec726fbe9.png',10000,1,1,'-----',2,'2021-04-09 11:01:52',1,'2021-04-09 11:01:57','2021-04-09 11:02:00',9,'00:15:23','/images/a3.jpg',0,0),(10009,2,'第七个视频','/uploads/c7029540b64349775a8c4ea263eef8f4ff617e5a.png',2000,1,1,'---',1,'2021-04-12 10:08:58',1,'2021-05-07 10:09:02','2021-05-01 10:09:06',9,'01:00:01','/images/a4.jpg',0,0),(10010,3,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','/uploads/',0,0,0,'--',1,'2021-04-21 12:13:44',1,'2021-04-21 12:13:44','2021-04-21 12:13:44',14,'06:59:00','/uploads/52ab77c8a0c604bc1d281d4add09783ddca95ee3.jpg@160w_100h.webp',0,0),(10011,3,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','/uploads/',0,0,0,'--',1,'2021-04-21 12:14:04',1,'2021-04-21 12:14:04','2021-04-21 12:14:04',11,'06:59:00','/uploads/52ab77c8a0c604bc1d281d4add09783ddca95ee3.jpg@160w_100h.webp',0,0),(10012,3,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','/uploads/',0,0,0,'--',1,'2021-04-21 12:14:05',1,'2021-04-21 12:14:05','2021-04-21 12:14:05',10,'06:59:00','/uploads/52ab77c8a0c604bc1d281d4add09783ddca95ee3.jpg@160w_100h.webp',0,0),(10013,3,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','/uploads/',0,0,0,'--',1,'2021-04-21 12:14:05',1,'2021-04-21 12:14:05','2021-04-21 12:14:05',9,'06:59:00','/uploads/52ab77c8a0c604bc1d281d4add09783ddca95ee3.jpg@160w_100h.webp',0,0),(10014,3,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','/uploads/',200,0,0,'--',1,'2021-04-21 12:17:01',1,'2021-04-21 12:17:01','2021-04-21 12:17:01',7,'06:59:00','/uploads/086d4e871b840be195dcf30492efde1ea7193b2d.png@160w_100h.webp',0,0),(10015,3,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','/uploads/',0,0,0,'--',1,'2021-04-21 12:17:02',1,'2021-04-21 12:17:02','2021-04-21 12:17:02',10,'06:59:00','/uploads/086d4e871b840be195dcf30492efde1ea7193b2d.png@160w_100h.webp',0,0),(10016,3,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','/uploads/',0,0,0,'--',1,'2021-04-21 12:17:02',1,'2021-04-21 12:17:02','2021-04-21 12:17:02',9,'06:59:00','/uploads/086d4e871b840be195dcf30492efde1ea7193b2d.png@160w_100h.webp',0,0),(10017,3,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','/uploads/',0,0,0,'--',1,'2021-04-21 12:17:03',1,'2021-04-21 12:17:03','2021-04-21 12:17:03',10,'06:59:00','/uploads/086d4e871b840be195dcf30492efde1ea7193b2d.png@160w_100h.webp',0,0),(10018,3,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','/uploads/',0,0,0,'--',1,'2021-04-21 12:17:03',1,'2021-04-21 12:17:03','2021-04-21 12:17:03',11,'06:59:00','/uploads/086d4e871b840be195dcf30492efde1ea7193b2d.png@160w_100h.webp',0,0),(10019,3,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','/uploads/',0,0,0,'--',1,'2021-04-21 12:17:04',1,'2021-04-21 12:17:04','2021-04-21 12:17:04',11,'06:59:00','/uploads/086d4e871b840be195dcf30492efde1ea7193b2d.png@160w_100h.webp',0,0),(10020,3,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','/uploads/',0,0,0,'--',1,'2021-04-21 12:17:04',1,'2021-04-21 12:17:04','2021-04-21 12:17:04',11,'06:59:00','/uploads/086d4e871b840be195dcf30492efde1ea7193b2d.png@160w_100h.webp',0,0),(10021,3,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','/uploads/',0,0,0,'--',1,'2021-04-21 12:17:04',1,'2021-04-21 12:17:04','2021-04-21 12:17:04',8,'06:59:00','/uploads/086d4e871b840be195dcf30492efde1ea7193b2d.png@160w_100h.webp',0,0),(10022,2,'【原神动画】食蒙之灵','/uploads/',300,0,0,'--',1,'2021-04-21 12:18:01',1,'2021-04-21 12:18:01','2021-04-21 12:18:01',8,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h.webp',0,0),(10023,2,'【原神动画】食蒙之灵','/uploads/',0,0,0,'--',1,'2021-04-21 12:18:02',1,'2021-04-21 12:18:02','2021-04-21 12:18:02',8,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h.webp',0,0),(10024,2,'【原神动画】食蒙之灵','/uploads/',0,0,0,'--',1,'2021-04-21 12:18:02',1,'2021-04-21 12:18:02','2021-04-21 12:18:02',8,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h.webp',0,0),(10025,2,'【原神动画】食蒙之灵','/uploads/',0,0,0,'--',1,'2021-04-21 12:18:03',1,'2021-04-21 12:18:03','2021-04-21 12:18:03',8,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h.webp',0,0),(10026,2,'【原神动画】食蒙之灵','/uploads/',0,0,0,'--',1,'2021-04-21 12:18:03',1,'2021-04-21 12:18:03','2021-04-21 12:18:03',7,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h.webp',0,0),(10027,2,'【原神动画】食蒙之灵','/uploads/',0,0,0,'--',1,'2021-04-21 12:18:03',1,'2021-04-21 12:18:03','2021-04-21 12:18:03',8,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h.webp',0,0),(10028,2,'【原神动画】食蒙之灵','/uploads/',0,0,0,'--',1,'2021-04-21 12:18:04',1,'2021-04-21 12:18:04','2021-04-21 12:18:04',8,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h.webp',0,0),(10029,2,'【原神动画】食蒙之灵','/uploads/',0,0,0,'--',1,'2021-04-21 12:18:04',1,'2021-04-21 12:18:04','2021-04-21 12:18:04',9,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h.webp',0,0),(10030,2,'【原神动画】食蒙之灵','/uploads/',0,0,0,'--',1,'2021-04-21 12:18:41',1,'2021-04-21 12:18:41','2021-04-21 12:18:41',7,'06:59:00','/uploads/6f9dcff2746f16c64e0fd00382c557922aa44751.png@160w_100h (1).webp',0,0),(10031,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',0,0,0,'--',1,'2021-04-21 12:20:31',1,'2021-04-21 12:20:31','2021-04-21 12:20:31',9,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10032,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',3000,0,0,'--',1,'2021-04-21 12:20:36',1,'2021-04-21 12:20:36','2021-04-21 12:20:36',7,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10033,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',0,0,0,'--',1,'2021-04-21 12:20:41',1,'2021-04-21 12:20:41','2021-04-21 12:20:41',8,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10034,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',2000,0,0,'--',1,'2021-04-21 12:20:52',1,'2021-04-21 12:20:52','2021-04-21 12:20:52',9,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10035,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',0,0,0,'--',1,'2021-04-21 12:20:58',1,'2021-04-21 12:20:58','2021-04-21 12:20:58',10,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10036,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',400,0,0,'--',1,'2021-04-21 12:21:03',1,'2021-04-21 12:21:03','2021-04-21 12:21:03',11,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10037,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',0,0,0,'--',1,'2021-04-21 12:21:10',1,'2021-04-21 12:21:10','2021-04-21 12:21:10',12,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10038,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',0,0,0,'--',1,'2021-04-21 12:21:15',1,'2021-04-21 12:21:15','2021-04-21 12:21:15',13,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10039,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',1000,0,0,'--',1,'2021-04-21 12:21:18',1,'2021-04-21 12:21:18','2021-04-21 12:21:18',14,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10040,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',5000,0,0,'--',1,'2021-04-21 12:21:23',1,'2021-04-21 12:21:23','2021-04-21 12:21:23',15,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10041,1,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','/uploads/',300,0,0,'--',1,'2021-04-21 12:21:28',1,'2021-04-21 12:21:28','2021-04-21 12:21:28',16,'06:59:00','/uploads/ba7f467c6d346067864229ad115281fdb99e6a2e.jpg@160w_100h.webp',0,0),(10042,1,'把洛克的BGM重新进行编曲，竟然....一起来回忆我们的十年吧！','',0,0,0,'哈哈不错不错',0,'2021-04-30 09:32:20',NULL,NULL,NULL,10,'00:00:17','/uploads/ed1bf261-8134-4659-8662-ba4937eed575.jpg',0,0),(10043,1,'《心如刀割》','/uploads/d887ddba-dbc6-444e-9f52-2ffe51f64908.mp4',400,0,0,'啊大大大',0,'2021-04-30 09:43:01',NULL,NULL,NULL,9,'00:00:48','/uploads/a99107df-5643-43f9-ae0c-115ba3886563.jpg',0,0),(10044,1,'盘噶之争','/uploads/183d66c4-471e-4dec-acab-4a145dcedda7.mp4',2,0,0,'哈哈哈哈哈',0,'2021-04-30 09:45:10',NULL,NULL,NULL,13,'00:00:48','/uploads/e2e5da98-1df0-432a-81d9-ff96e14a981d.webp',0,1),(10045,1,'倒放兄弟1','/uploads/539969c7-0ff0-4b59-b403-1b33a0ed315f.mp4',3,0,0,'不错不错',0,'2021-04-30 09:49:34',NULL,NULL,NULL,14,'00:00:48','/uploads/1ae8d2b3-c035-45c2-b019-ff4a920b6a1f.jpg',0,6),(10046,1,'倒放兄弟2','/uploads/882e72eb-930f-4de6-96fb-49af0fc948ba.mp4',0,0,0,'啊大大大',0,'2021-04-30 09:53:01',NULL,NULL,NULL,14,'00:00:11','/uploads/d0a49c9e-ad50-43dd-b406-c7d29de047b2.jpg',0,0),(10047,1,'adada','/uploads/3165549a-4ab5-4e66-9283-709b0919cd82.mp4',0,0,0,'adadadad',0,'2021-04-30 10:18:07',NULL,NULL,NULL,16,'00:00:17','/uploads/c7d372fc-deac-4d7d-99dc-be1e25d04f21.jpg',0,0),(10048,1,'啊我打打打打打大大','/uploads/2080eb6f-83f9-4a10-b9f7-652d1ca0a26a.mp4',1,1,0,'阿萨大大',0,'2021-05-06 11:12:19',NULL,NULL,'2021-05-03 22:11:00',10,'00:00:04','/uploads/248865cf-4e9f-49ec-99f6-e50f4e46fd90.jpg',0,0);

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
  CONSTRAINT `p_videos_thumbsup_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_videos_thumbsup_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='视频点赞记录表';

/*Data for the table `p_videos_thumbsup` */

insert  into `p_videos_thumbsup`(`id`,`user_id`,`video_id`,`createTime`) values (3,3,10000,'2021-04-11 14:11:45'),(4,2,10001,'2021-04-11 14:11:49'),(29,1,10009,'2021-05-06 11:03:33'),(32,1,10048,'2021-05-06 11:14:23'),(33,1,10000,'2021-05-06 11:21:57'),(34,2,10000,'2021-05-06 11:58:24'),(36,1,10001,'2021-05-09 17:59:39'),(38,1,10008,'2021-05-10 08:46:13');

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
