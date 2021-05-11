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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='弹幕表';

/*Data for the table `p_barrage` */

insert  into `p_barrage`(`id`,`user_id`,`video_id`,`content`,`videotime`,`createTime`,`type`,`color`,`size`,`post_ip`) values (0,1,10000,'adasdasdad','00:00:11','2021-04-27 09:44:53','right','rgb(255, 255, 255)',NULL,NULL),(1,1,10000,'我是up主，欢迎大家发布弹幕','00:05:00','2021-04-09 10:46:28',NULL,NULL,NULL,NULL),(2,2,10000,'我是张三，我发弹幕','00:07:00','2021-04-09 10:47:56',NULL,NULL,NULL,NULL),(3,3,10001,'cpdd','00:01:00','2021-04-10 10:40:28',NULL,NULL,NULL,NULL),(4,3,10002,'cpdd','00:11:00','2021-04-10 14:29:11',NULL,NULL,NULL,NULL),(6,1,10000,'啊啊啊啊','00:01:23','2021-04-27 11:36:23','right','rgb(255, 255, 255)',NULL,NULL),(7,1,10000,'sdfsdfsdfs','00:00:16','2021-04-30 11:04:42','right','rgb(255, 255, 255)',NULL,NULL),(8,1,10000,'adasd','00:00:12','2021-04-30 11:05:30','top','rgb(255, 255, 255)',NULL,NULL),(9,1,10000,'asdsad','00:00:16','2021-04-30 11:05:47','top','rgb(137, 213, 255)',NULL,NULL),(10,1,10000,'笑死，根本吓不死','00:00:08','2021-05-05 10:21:51','right','rgb(255, 255, 255)',NULL,NULL),(11,1,10000,'aaa','00:00:10','2021-05-05 10:51:28','right','rgb(255, 255, 255)',NULL,NULL),(12,1,10000,'阿巴阿巴阿巴','00:00:10','2021-05-05 10:52:26','right','rgb(255, 255, 255)',NULL,NULL),(13,1,10000,'1','00:00:10','2021-05-05 11:10:20','right','rgb(255, 255, 255)',NULL,NULL),(14,1,10000,'2','00:00:10','2021-05-05 11:10:22','right','rgb(255, 255, 255)',NULL,NULL),(15,1,10000,'3','00:00:10','2021-05-05 11:10:24','right','rgb(255, 255, 255)',NULL,NULL),(16,1,10000,'4','00:00:10','2021-05-05 11:10:26','right','rgb(255, 255, 255)',NULL,NULL),(17,1,10045,'1','00:00:16','2021-05-06 11:08:33','right','rgb(255, 255, 255)',NULL,NULL),(18,1,10045,'2','00:00:16','2021-05-06 11:08:36','right','rgb(255, 255, 255)',NULL,NULL),(19,1,10045,'3','00:00:16','2021-05-06 11:08:38','right','rgb(255, 255, 255)',NULL,NULL),(20,1,10045,'4','00:00:16','2021-05-06 11:08:41','right','rgb(255, 255, 255)',NULL,NULL),(21,1,10045,'5','00:00:16','2021-05-06 11:08:43','right','rgb(255, 255, 255)',NULL,NULL),(22,1,10045,'6','00:00:16','2021-05-06 11:08:46','right','rgb(255, 255, 255)',NULL,NULL),(23,2,10000,'我是张三，我为自己代言','00:00:10','2021-05-06 11:58:14','right','rgb(255, 255, 255)',NULL,NULL),(24,1,10000,'？？','00:00:12','2021-05-10 09:02:54','right','rgb(255, 255, 255)',NULL,NULL),(25,1,10000,'啊啊','00:00:12','2021-05-10 09:03:08','right','rgb(255, 255, 255)',NULL,NULL),(26,1,10044,'zzzz','00:00:05','2021-05-10 09:37:46','right','rgb(255, 255, 255)',NULL,NULL),(27,2,10054,'哈哈哈哈哈','00:00:20','2021-05-11 11:56:04','right','rgb(255, 255, 255)',NULL,NULL),(28,2,10054,'哈哈哈哈哈','00:00:36','2021-05-11 11:56:20','right','rgb(255, 255, 255)',NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='视频分类';

/*Data for the table `p_category` */

insert  into `p_category`(`id`,`categoryName`,`parentId`,`createdBy`,`creationTime`,`modifyBy`,`modifyDate`) values (1,'全部',0,1,'2021-04-09 10:17:52',1,'2021-04-09 10:17:57'),(2,'动画',1,1,'2021-04-09 10:18:21',1,'2021-04-09 10:18:25'),(3,'游戏',1,1,'2021-04-09 10:18:37',1,'2021-04-09 10:18:39'),(4,'生活',1,1,'2021-04-09 10:20:03',1,'2021-04-09 10:20:03'),(5,'音乐',1,1,'2021-04-09 10:20:15',1,'2021-04-09 10:20:15'),(6,'鬼畜',1,1,'2021-04-09 10:20:29',1,'2021-04-09 10:20:29'),(7,'MMD·3D',2,1,'2021-04-09 10:21:14',1,'2021-04-09 10:21:17'),(8,'手办·模型',2,1,'2021-04-09 10:21:58',1,'2021-04-09 10:21:58'),(9,'翻唱',5,1,'2021-04-09 10:23:00',1,'2021-04-09 10:23:00'),(10,'原唱',5,1,'2021-04-09 10:23:00',1,'2021-04-09 10:23:00'),(11,'单机游戏',3,1,'2021-04-09 10:23:30',1,'2021-04-09 10:23:30'),(12,'电子竞技',3,1,'2021-04-09 10:23:30',1,'2021-04-09 10:23:30'),(13,'搞笑',4,1,'2021-04-09 10:23:59',1,'2021-04-09 10:23:59'),(14,'日常',4,1,'2021-04-09 10:23:59',1,'2021-04-09 10:23:59'),(15,'鬼畜调教',6,1,'2021-04-09 10:24:58',1,'2021-04-09 10:24:58'),(16,'人力VOCALOID',6,1,'2021-04-09 10:24:58',1,'2021-04-09 10:24:58'),(20,'娱乐',1,1,'2021-05-08 09:22:07',1,'2021-05-08 09:22:07'),(21,'时尚',1,1,'2021-05-08 09:22:14',1,'2021-05-08 09:22:14'),(22,'综艺',20,1,'2021-05-08 09:52:10',1,'2021-05-08 09:52:10'),(23,'明星',20,1,'2021-05-08 09:52:22',1,'2021-05-08 09:52:22'),(24,'漂亮妹妹',20,2,'2021-05-11 11:33:56',2,'2021-05-11 11:33:56');

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
  `viewSecond` varchar(10) DEFAULT NULL COMMENT '观看进度',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `p_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_history_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='浏览历史表';

/*Data for the table `p_history` */

insert  into `p_history`(`id`,`video_id`,`user_id`,`viewTime`,`viewSecond`) values (23,10050,2,'2021-05-11 12:23:36','00:16'),(29,10050,1,'2021-05-11 12:43:46','00:20'),(30,10066,1,'2021-05-11 12:44:15','00:37'),(31,10053,1,'2021-05-11 12:44:35','00:12');

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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

/*Data for the table `p_postip` */

insert  into `p_postip`(`id`,`ip`,`video_pv`,`postDate`,`type`) values (54,'192.168.16.222',10056,'2021-05-11 12:23:20',0),(55,'192.168.16.206',10050,'2021-05-11 12:25:25',0),(56,'192.168.16.206',10000,'2021-05-11 12:36:35',0),(57,'192.168.16.206',10052,'2021-05-11 12:38:06',0),(58,'192.168.16.206',10050,'2021-05-11 12:42:53',0),(59,'192.168.16.206',10050,'2021-05-11 12:43:40',0),(60,'192.168.16.206',10066,'2021-05-11 12:44:00',0),(61,'192.168.16.206',10053,'2021-05-11 12:44:20',0);

/*Table structure for table `p_search_hot` */

DROP TABLE IF EXISTS `p_search_hot`;

CREATE TABLE `p_search_hot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(160) NOT NULL,
  `searchDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Data for the table `p_search_hot` */

insert  into `p_search_hot`(`id`,`title`,`searchDate`) values (1,'一','2021-05-10'),(2,'夏洛特','2021-05-10'),(3,'夏洛特','2021-05-10'),(4,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','2021-05-10'),(5,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','2021-05-10'),(6,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(7,'【原神动画】食蒙之灵','2021-05-10'),(8,'a','2021-05-10'),(9,'第二个视频','2021-05-10'),(10,'第','2021-05-10'),(11,'的','2021-05-10'),(12,'全站第三个视频','2021-05-10'),(13,'假面骑士圣刃远古龙起源故事–很久以前，龙族与人类幸福的生活在一起……','2021-05-10'),(14,'【原神动画】食蒙之灵','2021-05-10'),(15,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(16,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-10'),(17,'啊我打打打打打大大','2021-05-10'),(18,'【原神动画】食蒙之灵','2021-05-10'),(19,'【原神动画】食蒙之灵','2021-05-10'),(20,'第二个视频','2021-05-10'),(21,'【A-soul/live2d桌宠】来领养一只可爱小嘉然吧~','2021-05-10'),(22,'《Charlotte》夏洛特:2020年了你还记得我们的约定吗?……拯救了世界，却忘记了你！','2021-05-11'),(23,'a','2021-05-11');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户表';

/*Data for the table `p_user` */

insert  into `p_user`(`uid`,`userName`,`phone`,`upwd`,`utype`) values (1,'admin','18388883333','123456',3),(2,'zhangsan','13323232323','123456',2),(3,'lisi','15553212345','123456',1),(4,'wangwu','14423231234','123456',1),(5,'xiaozhu','18812344321','123456',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

/*Data for the table `p_user_info` */

insert  into `p_user_info`(`id`,`user_id`,`subscribeNum`,`fansNum`,`level`,`experience`,`user_pic`,`up_desc`,`nickName`,`up_spaceNotice`,`createTime`,`birthday`,`loginDate`) values (1,1,3,3,5,10120,'/uploads/877514110aa3427f943ddc7dd55ef48aa7bf8942.jpg@96w_96h_1c.webp','这是本站第一个用户','Micah','这是本站第一个用户','2021-04-20 10:44:49','2021-04-20 10:44:52','2021-05-11'),(2,2,1,1,1,270,'/uploads/defaultpic.png','你好，我是张三','张三',NULL,NULL,NULL,'2021-05-11'),(3,3,1,1,3,350,'/uploads/defaultpic.png','你好，我是李四','李四',NULL,NULL,NULL,'2021-05-07'),(4,4,1,1,4,750,'/uploads/defaultpic.png','这个人没有填简介啊~~~','王五',NULL,NULL,NULL,'2021-05-07'),(7,5,0,0,0,10,'/uploads/defaultpic.png','','小朱',NULL,NULL,NULL,'2021-05-11');

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
) ENGINE=InnoDB AUTO_INCREMENT=10074 DEFAULT CHARSET=utf8 COMMENT='视频信息表';

/*Data for the table `p_videos` */

insert  into `p_videos`(`video_pv`,`video_userid`,`video_title`,`video_url`,`video_play`,`video_like`,`video_collect`,`video_desc`,`video_state`,`video_updatetime`,`video_checkuid`,`video_checktime`,`video_releasetime`,`video_type`,`video_time`,`video_image`,`video_comment`,`video_barrage`) values (10000,1,'第一个视频','/uploads/31a0f6ea-c0ff-4164-b3f5-742cc51921a7.mp4',2013,3,1,'这是简介',1,'2021-04-09 10:29:44',1,'2021-04-09 10:29:55','2021-04-09 10:29:57',14,'00:05:19','/images/1.jpg',5,17),(10001,2,'张三的犯罪视频','/uploads/622afeea9b9706fba2c8331476a4c30ec726fbe9.png',1000,2,1,'-----',2,'2021-04-09 11:01:52',1,'2021-04-09 11:01:57','2021-04-09 11:02:00',14,'00:09:54','/images/2.jpg',1,1),(10002,1,'全站第三个视频','/uploads/c7029540b64349775a8c4ea263eef8f4ff617e5a.png',200,0,0,'---',0,'2021-04-12 10:08:58',1,'2021-05-07 10:09:02','2021-05-01 10:09:06',13,'00:25:33','/images/3.jpg',6,7),(10007,2,'第二个视频','/uploads/34f9e5f68be36596e7f956c6c09634cd470507ee.png',50,15,6,'这是简介',1,'2021-04-09 10:29:44',1,'2021-04-09 10:29:55','2021-04-09 10:29:57',12,'00:11:23','/images/a2.jpg',5,2),(10008,2,'第四个视频','/uploads/622afeea9b9706fba2c8331476a4c30ec726fbe9.png',10000,1,1,'-----',2,'2021-04-09 11:01:52',1,'2021-04-09 11:01:57','2021-04-09 11:02:00',9,'00:15:23','/images/a3.jpg',0,0),(10009,2,'第七个视频','/uploads/c7029540b64349775a8c4ea263eef8f4ff617e5a.png',2000,1,1,'---',1,'2021-04-12 10:08:58',1,'2021-05-07 10:09:02','2021-05-01 10:09:06',9,'01:00:01','/images/a4.jpg',0,0),(10043,1,'《心如刀割》','/uploads/d887ddba-dbc6-444e-9f52-2ffe51f64908.mp4',400,0,0,'啊大大大',0,'2021-04-30 09:43:01',NULL,NULL,NULL,9,'00:00:48','/uploads/a99107df-5643-43f9-ae0c-115ba3886563.jpg',0,0),(10044,1,'盘噶之争','/uploads/183d66c4-471e-4dec-acab-4a145dcedda7.mp4',2,0,0,'哈哈哈哈哈',0,'2021-04-30 09:45:10',NULL,NULL,NULL,13,'00:00:48','/uploads/e2e5da98-1df0-432a-81d9-ff96e14a981d.webp',0,1),(10045,1,'倒放兄弟1','/uploads/539969c7-0ff0-4b59-b403-1b33a0ed315f.mp4',3,0,0,'不错不错',0,'2021-04-30 09:49:34',NULL,NULL,NULL,14,'00:00:48','/uploads/1ae8d2b3-c035-45c2-b019-ff4a920b6a1f.jpg',0,6),(10046,1,'倒放兄弟2','/uploads/882e72eb-930f-4de6-96fb-49af0fc948ba.mp4',0,0,0,'啊大大大',0,'2021-04-30 09:53:01',NULL,NULL,NULL,14,'00:00:11','/uploads/d0a49c9e-ad50-43dd-b406-c7d29de047b2.jpg',0,0),(10048,1,'啊我打打打打打大大','/uploads/2080eb6f-83f9-4a10-b9f7-652d1ca0a26a.mp4',1,1,0,'阿萨大大',0,'2021-05-06 11:12:19',NULL,NULL,'2021-05-03 22:11:00',10,'00:00:04','/uploads/248865cf-4e9f-49ec-99f6-e50f4e46fd90.jpg',0,0),(10049,2,'【特利迦奥特曼吐槽】不想当法师的AD才是好AD！不想当战士的法师都是伞兵！','/uploads/c9ecb3f8-1622-4e9f-a38a-10937672c8fa.mp4',0,0,0,'nhahvahvoahovhbahbval',0,'2021-05-11 11:27:46',NULL,NULL,'2021-05-11 11:27:00',15,'00:01:40','/uploads/89c8d389-828c-4f14-93fd-cc44365b20ad.jpg',0,0),(10050,2,'被你看光了,我嫁不出去了,你要对老娘我负责！','/uploads/559feb27-f5ba-43ba-a4a5-884e1bc7f404.mp4',4,0,0,'被你看光了,我嫁不出去了,你要对老娘我负责！',0,'2021-05-11 11:29:06',NULL,NULL,'2010-04-11 11:27:00',7,'00:01:13','/uploads/ffe95446-5d78-4155-b634-cbd4e8973ed0.webp',0,0),(10051,2,'【火影】','/uploads/2635831f-f541-4efd-967b-5c51001f632a.mp4',0,0,0,'【火影】进来感受一下什么叫做忍界大战！！！',0,'2021-05-11 11:30:31',NULL,NULL,'2021-05-11 11:29:00',7,'00:03:22','/uploads/7cf4d9f4-9a43-4fab-8cfb-5eac11c1ad2c.webp',0,0),(10052,2,'【梦の歌】爷青回~肥夢直播献唱星间飞行【超时空要塞F】','/uploads/6f74ce87-8704-4063-bfa5-ecbb54d50047.mp4',1,0,0,'【梦の歌】爷青回~肥夢直播献唱星间飞行【超时空要塞F】',0,'2021-05-11 11:31:45',NULL,NULL,'2021-05-11 11:30:00',7,'00:04:21','/uploads/c3c74d28-a22f-48d1-96bb-31260b7dcf50.webp',0,0),(10053,2,'心时代到来，变成了心时代样子的京宝你们喜欢吗？','/uploads/7230554c-7e81-44f4-a25e-dfdf2d481a12.mp4',1,0,0,'心时代到来，变成了心时代样子的京宝你们喜欢吗？',0,'2021-05-11 11:32:39',NULL,NULL,'2021-05-11 11:31:00',12,'00:05:50','/uploads/b2fe1b14-fd66-4c5c-9cf6-06ef7383f429.webp',0,0),(10054,2,'‘谈 恋 爱 吗’','/uploads/85ba606a-0bb3-4b2d-867e-8f33871c1c17.mp4',1,0,0,'‘谈 恋 爱 吗’',0,'2021-05-11 11:33:32',NULL,NULL,'2021-05-11 11:32:00',24,'00:00:50','/uploads/73a5fc91-adeb-4411-86dc-0b11913ac553.webp',0,2),(10055,2,'新娘到!进来结婚吧 大喜 豆豆子 露露','/uploads/29842d1a-4454-4846-8bd6-f8f6afc5e81a.mp4',0,0,0,'新娘到!进来结婚吧 大喜 豆豆子 露露',0,'2021-05-11 11:37:23',NULL,NULL,'2021-05-11 11:36:00',24,'00:00:49','/uploads/46640168-7b8f-4a1b-8880-e9b62e808328.webp',0,0),(10056,2,'夜喵 挑战全网最萌书记舞 无敌了！辉夜大小姐想让我告白ED2','/uploads/09241b7b-1cb2-4a08-afb0-00c8dc2ea5e1.mp4',1,0,0,'夜喵 挑战全网最萌书记舞 无敌了！辉夜大小姐想让我告白ED2',0,'2021-05-11 11:38:29',NULL,NULL,'2021-05-11 11:37:00',24,'00:01:14','/uploads/b6dc951e-fa90-4ffc-985b-9e3a73dee233.webp',0,0),(10057,2,'9.1主线第4章，萨尔和妈妈终相认，女恐惧魔王长得好吓人','/uploads/5fde70de-6b91-42fe-8a32-fa54687c2362.mp4',0,0,0,'9.1主线第4章，萨尔和妈妈终相认，女恐惧魔王长得好吓人',0,'2021-05-11 11:39:14',NULL,NULL,'2021-05-11 11:38:00',15,'00:06:50','/uploads/db156a68-c061-4202-bc18-6c79a8533c81.webp',0,0),(10058,2,'少女的王座 中日配音一览，差别真的好大!!!/给大家伙乐乐/乌列尔你真的好惨又好草','/uploads/a14ffd63-3db5-484b-a6eb-41d82bd257e1.mp4',0,0,0,'少女的王座 中日配音一览，差别真的好大!!!/给大家伙乐乐/乌列尔你真的好惨又好草',0,'2021-05-11 11:39:53',NULL,NULL,NULL,13,'00:00:10','/uploads/3557a143-f9d1-4c93-b9ad-0f96b0373532.webp',0,0),(10064,2,'公主连结我的母亲可可萝生日剧情','/uploads/353a67ed-66c1-478e-a971-3f0bcbf5a66f.mp4',0,0,0,'公主连结我的母亲可可萝生日剧情',0,'2021-05-11 12:14:35',NULL,NULL,'2021-05-11 12:13:00',12,'00:00:26','/uploads/216873ee-80cc-473b-976e-04f12dbad50c.webp',0,0),(10065,2,'崩坏3国服现状','/uploads/7dbf4d1c-1038-4b7a-ac41-e734e11df969.mp4',0,0,0,'崩坏3国服现状',0,'2021-05-11 12:15:49',NULL,NULL,'2021-05-11 12:14:00',16,'00:00:30','/uploads/7b57b6cd-2636-4360-bfdb-b41a4d1d872b.webp',0,0),(10066,2,'我的世界：MC玩家的一生！','/uploads/75b58f17-9f52-4808-a749-4863ff74b47e.mp4',1,0,0,'我的世界：MC玩家的一生！',0,'2021-05-11 12:17:25',NULL,NULL,'2021-05-11 12:16:00',12,'00:01:14','/uploads/3adb9a02-1d9c-455e-8709-babb6009e759.webp',0,0),(10067,2,'八只灯神，重振元素荣光！','/uploads/9a1572f5-6500-4dcd-8228-8acf13b34d09.mp4',0,0,0,'八只灯神，重振元素荣光！',0,'2021-05-11 12:18:13',NULL,NULL,'2021-05-11 12:17:00',12,'00:01:00','/uploads/9cd80c93-0910-46b4-a5dd-0fcd78d211e6.webp',0,0),(10068,2,'绿帽子就扣在你头上，你能拿我怎么样！','/uploads/b1993105-5bc1-476f-bffd-b26575e466ea.mp4',0,0,0,'绿帽子就扣在你头上，你能拿我怎么样！',0,'2021-05-11 12:18:52',NULL,NULL,'2021-05-11 12:18:00',7,'00:00:51','/uploads/fff4db6a-b6bd-450b-8076-b7ad04e592bf.webp',0,0),(10069,2,'【御姐玫瑰起源】满是白浆的女剑士——一个卖肉游戏也能玩成皇牌空战','/uploads/717d88e6-ca43-4d21-a67d-35f712d9997f.mp4',0,0,0,'【御姐玫瑰起源】满是白浆的女剑士——一个卖肉游戏也能玩成皇牌空战',0,'2021-05-11 12:19:40',NULL,NULL,'2021-05-11 12:18:00',15,'00:01:31','/uploads/624b1fdf-db62-4028-be64-fa6d943957b8.webp',0,0),(10070,2,'花无缺被监禁折磨15年后会变啥样？《新绝3》里有答案！','/uploads/946bae2a-a1cd-4c5d-8cfb-a541b418dd7a.mp4',0,0,0,'花无缺被监禁折磨15年后会变啥样？《新绝3》里有答案！',0,'2021-05-11 12:20:43',NULL,NULL,'2021-05-11 12:19:00',11,'00:00:56','/uploads/cdf55306-62b4-4818-bfcb-9babde917d33.webp',0,0),(10071,2,'【阴阳师】新版本下於菊虫技能解读及就业推荐 冷门式神变T0？','/uploads/c9b08667-b699-438a-abc4-14f51ddef4c1.mp4',0,0,0,'【阴阳师】新版本下於菊虫技能解读及就业推荐 冷门式神变T0？',0,'2021-05-11 12:21:25',NULL,NULL,'2021-05-11 12:20:00',12,'00:01:07','/uploads/341983de-af84-44d4-bbe4-5970a87633bf.webp',0,0),(10072,2,'FPX基地组织去密室拍摄 回来后lwx整个人累的动不了 doinb：我晚上睡不着了兄弟们','/uploads/c27585bd-d889-406e-a87e-1a83c3064e34.mp4',0,0,0,'FPX基地组织去密室拍摄 回来后lwx整个人累的动不了 doinb：我晚上睡不着了兄弟们',0,'2021-05-11 12:22:09',NULL,NULL,'2021-05-11 12:21:00',15,'00:00:43','/uploads/849e9bf2-21f0-49d6-903c-0d935c181268.webp',0,0),(10073,2,'喝了日本核废水的CJ','/uploads/f91120ea-4e2f-4c81-a868-88d9e5465dc3.mp4',0,0,0,'喝了日本核废水的CJ',0,'2021-05-11 12:22:57',NULL,NULL,'2021-05-11 12:22:00',14,'00:00:41','/uploads/1d616d0e-6da2-4d44-80d1-9b0c7e319650.webp',0,0);

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
