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

/*Table structure for table `p_barrage` */

DROP TABLE IF EXISTS `p_barrage`;

CREATE TABLE `p_barrage` (
  `id` bigint(30) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(30) DEFAULT NULL COMMENT '发表人（来源于pili_user用户表的用户id）',
  `video_id` int(30) DEFAULT NULL COMMENT '视频id（来源于p_video视频表的视频id）',
  `content` varchar(100) DEFAULT NULL COMMENT '弹幕内容',
  `videotime` time DEFAULT NULL COMMENT '发送视频时间',
  `createTime` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `p_barrage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_barrage_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='弹幕表';

/*Data for the table `p_barrage` */

insert  into `p_barrage`(`id`,`user_id`,`video_id`,`content`,`videotime`,`createTime`) values (1,1,10000,'我是up主，欢迎大家发布弹幕','00:05:00','2021-04-09 10:46:28'),(2,2,10000,'我是张三，我发弹幕','00:07:00','2021-04-09 10:47:56'),(3,3,10001,'cpdd','00:01:00','2021-04-10 10:40:28'),(4,3,10002,'cpdd','00:11:00','2021-04-10 14:29:11');

/*Table structure for table `p_category` */

DROP TABLE IF EXISTS `p_category`;

CREATE TABLE `p_category` (
  `id` bigint(30) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `categoryName` varchar(50) NOT NULL COMMENT '分类名称',
  `parentId` bigint(30) DEFAULT NULL COMMENT '父级节点id',
  `createdBy` int(11) DEFAULT NULL COMMENT '创建者（来源于pili_user用户表的用户id）',
  `creationTime` datetime DEFAULT NULL COMMENT '创建时间',
  `modifyBy` int(11) DEFAULT NULL COMMENT '更新者（来源于pili_user用户表的用户id）',
  `modifyDate` datetime DEFAULT NULL COMMENT '最新更新时间',
  PRIMARY KEY (`id`),
  KEY `modifyBy` (`modifyBy`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `p_category_ibfk_1` FOREIGN KEY (`modifyBy`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_category_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='视频分类';

/*Data for the table `p_category` */

insert  into `p_category`(`id`,`categoryName`,`parentId`,`createdBy`,`creationTime`,`modifyBy`,`modifyDate`) values (1,'全部',0,1,'2021-04-09 10:17:52',1,'2021-04-09 10:17:57'),(2,'动画',1,1,'2021-04-09 10:18:21',1,'2021-04-09 10:18:25'),(3,'游戏',1,1,'2021-04-09 10:18:37',1,'2021-04-09 10:18:39'),(4,'生活',1,1,'2021-04-09 10:20:03',1,'2021-04-09 10:20:03'),(5,'音乐',1,1,'2021-04-09 10:20:15',1,'2021-04-09 10:20:15'),(6,'鬼畜',1,1,'2021-04-09 10:20:29',1,'2021-04-09 10:20:29'),(7,'MMD·3D',2,1,'2021-04-09 10:21:14',1,'2021-04-09 10:21:17'),(8,'手办·模型',2,1,'2021-04-09 10:21:58',1,'2021-04-09 10:21:58'),(9,'翻唱',5,1,'2021-04-09 10:23:00',1,'2021-04-09 10:23:00'),(10,'原唱',5,1,'2021-04-09 10:23:00',1,'2021-04-09 10:23:00'),(11,'单机游戏',3,1,'2021-04-09 10:23:30',1,'2021-04-09 10:23:30'),(12,'电子竞技',3,1,'2021-04-09 10:23:30',1,'2021-04-09 10:23:30'),(13,'搞笑',4,1,'2021-04-09 10:23:59',1,'2021-04-09 10:23:59'),(14,'日常',4,1,'2021-04-09 10:23:59',1,'2021-04-09 10:23:59'),(15,'鬼畜调教',6,1,'2021-04-09 10:24:58',1,'2021-04-09 10:24:58'),(16,'人力VOCALOID',6,1,'2021-04-09 10:24:58',1,'2021-04-09 10:24:58');

/*Table structure for table `p_collect` */

DROP TABLE IF EXISTS `p_collect`;

CREATE TABLE `p_collect` (
  `id` bigint(30) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int(30) DEFAULT NULL COMMENT '拥有者（来源于pili_user用户表的用户id）',
  `title` varchar(50) NOT NULL COMMENT '收藏夹标题',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `p_collect_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='收藏夹表';

/*Data for the table `p_collect` */

insert  into `p_collect`(`id`,`user_id`,`title`,`createTime`) values (1,1,'第一个收藏夹','2021-04-09 10:32:19');

/*Table structure for table `p_collect_info` */

DROP TABLE IF EXISTS `p_collect_info`;

CREATE TABLE `p_collect_info` (
  `id` bigint(30) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `collect_id` bigint(30) DEFAULT NULL COMMENT '对应收藏夹（来源于p_collect用户表的id）',
  `video_id` int(30) DEFAULT NULL COMMENT '视频id（来源于p_video视频表的视频id）',
  `addTime` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `collect_id` (`collect_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `p_collect_info_ibfk_1` FOREIGN KEY (`collect_id`) REFERENCES `p_collect` (`id`),
  CONSTRAINT `p_collect_info_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `p_videos` (`video_pv`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='收藏夹信息表';

/*Data for the table `p_collect_info` */

insert  into `p_collect_info`(`id`,`collect_id`,`video_id`,`addTime`) values (2,1,10000,'2021-04-09 10:34:17'),(3,1,10001,'2021-04-09 11:02:46');

/*Table structure for table `p_comment` */

DROP TABLE IF EXISTS `p_comment`;

CREATE TABLE `p_comment` (
  `id` bigint(30) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `video_id` int(30) DEFAULT NULL COMMENT '视频id（来源于p_video视频表的视频id）',
  `user_id` int(30) DEFAULT NULL COMMENT '评论人id（来源于pili_user用户表的用户id）',
  `parent_id` bigint(30) NOT NULL COMMENT '父评论id，默认为0',
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
  `id` bigint(30) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
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

/*Table structure for table `p_subscribe` */

DROP TABLE IF EXISTS `p_subscribe`;

CREATE TABLE `p_subscribe` (
  `id` bigint(30) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `subscribe_id` int(30) DEFAULT NULL COMMENT '关注人id（来源于pili_user用户表的用户id）',
  `subscribed_id` int(30) DEFAULT NULL COMMENT '被关注人id（来源于pili_user用户表的用户id）',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `subscribe_id` (`subscribe_id`),
  KEY `subscribed_id` (`subscribed_id`),
  CONSTRAINT `p_subscribe_ibfk_1` FOREIGN KEY (`subscribe_id`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_subscribe_ibfk_2` FOREIGN KEY (`subscribed_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='订阅信息表';

/*Data for the table `p_subscribe` */

insert  into `p_subscribe`(`id`,`subscribe_id`,`subscribed_id`,`createTime`) values (1,2,1,'2021-04-09 10:40:02'),(2,3,1,'2021-04-09 10:40:11'),(3,4,1,'2021-04-06 14:27:17'),(4,4,2,NULL),(5,4,3,NULL),(6,1,2,NULL),(7,1,4,NULL);

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
  `user_pic` varchar(200) NOT NULL DEFAULT '/static/uploads/defaultpic.png' COMMENT '用户头像地址',
  `up_desc` varchar(500) DEFAULT NULL COMMENT '用户简介',
  `nickName` varchar(50) NOT NULL,
  `up_spaceNotice` varchar(500) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `p_user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `p_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

/*Data for the table `p_user_info` */

insert  into `p_user_info`(`id`,`user_id`,`subscribeNum`,`fansNum`,`level`,`experience`,`user_pic`,`up_desc`,`nickName`,`up_spaceNotice`,`createTime`,`birthday`) values (1,1,2,3,6,30000,'/uploads/877514110aa3427f943ddc7dd55ef48aa7bf8942.jpg@96w_96h_1c.webp','你好，我是站长haha','micah','这咱空间公告哈aaaa','2021-04-19 23:23:18','2021-04-19 23:23:14'),(2,2,1,2,1,0,'/static/upload/xxx.png','你好，我是张三','张三',NULL,'2021-04-19 23:23:25','2021-04-19 23:23:27'),(3,3,1,1,1,0,'/static/upload/xxxx.png','你好，我是李四','李四',NULL,'2021-04-19 23:23:28','2021-04-19 23:23:30'),(4,4,3,1,2,100,'/static/uploads/defaultpic.png',NULL,'王五',NULL,'2021-04-19 23:23:32','2021-04-19 23:23:33');

/*Table structure for table `p_videos` */

DROP TABLE IF EXISTS `p_videos`;

CREATE TABLE `p_videos` (
  `video_pv` int(11) NOT NULL AUTO_INCREMENT COMMENT '视频pv号',
  `video_userid` int(11) NOT NULL COMMENT '上传者id',
  `video_title` varchar(50) NOT NULL COMMENT '视频标题',
  `video_url` varchar(100) NOT NULL COMMENT '视频播放路径',
  `video_play` bigint(20) NOT NULL COMMENT '视频播放量',
  `video_like` int(11) NOT NULL COMMENT '视频点赞数量',
  `video_collect` int(11) NOT NULL COMMENT '视频收藏数量',
  `video_desc` varchar(1000) DEFAULT NULL COMMENT '视频简介',
  `video_state` int(11) NOT NULL COMMENT '视频状态 0-待审核 1-已审核 2-审核失败 3-违规',
  `video_updatetime` datetime NOT NULL COMMENT '视频上传时间',
  `video_checkuid` int(11) DEFAULT NULL COMMENT '视频审核人',
  `video_checktime` datetime DEFAULT NULL COMMENT '视频审核时间',
  `video_releasetime` datetime DEFAULT NULL COMMENT '视频发布时间',
  `video_type` bigint(30) NOT NULL COMMENT '视频分类（来源于p_category分类表的类型id）',
  `video_time` time NOT NULL,
  `video_image` varchar(200) DEFAULT NULL,
  `video_comment` int(11) DEFAULT NULL COMMENT '视频评论数',
  `video_barrage` int(11) DEFAULT NULL COMMENT '视频弹幕数',
  PRIMARY KEY (`video_pv`),
  KEY `video_userid` (`video_userid`),
  KEY `video_checkuid` (`video_checkuid`),
  KEY `video_type` (`video_type`),
  CONSTRAINT `p_videos_ibfk_1` FOREIGN KEY (`video_userid`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_videos_ibfk_2` FOREIGN KEY (`video_checkuid`) REFERENCES `p_user` (`uid`),
  CONSTRAINT `p_videos_ibfk_3` FOREIGN KEY (`video_type`) REFERENCES `p_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8 COMMENT='视频信息表';

/*Data for the table `p_videos` */

insert  into `p_videos`(`video_pv`,`video_userid`,`video_title`,`video_url`,`video_play`,`video_like`,`video_collect`,`video_desc`,`video_state`,`video_updatetime`,`video_checkuid`,`video_checktime`,`video_releasetime`,`video_type`,`video_time`,`video_image`,`video_comment`,`video_barrage`) values (10000,1,'第一个视频','/uploads/34f9e5f68be36596e7f956c6c09634cd470507ee.png',100,3,1,'这是简介',1,'2021-04-09 10:29:44',1,'2021-04-09 10:29:55','2021-04-09 10:29:57',12,'00:11:23',NULL,5,2),(10001,2,'张三的犯罪视频','/uploads/622afeea9b9706fba2c8331476a4c30ec726fbe9.png',1000,1,1,'-----',2,'2021-04-09 11:01:52',1,'2021-04-09 11:01:57','2021-04-09 11:02:00',6,'00:11:23',NULL,1,1),(10002,1,'全站第三个视频','/uploads/c7029540b64349775a8c4ea263eef8f4ff617e5a.png',200,0,0,'---',0,'2021-04-12 10:08:58',1,'2021-05-07 10:09:02','2021-05-01 10:09:06',6,'00:11:23',NULL,1,1);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='视频点赞记录表';

/*Data for the table `p_videos_thumbsup` */

insert  into `p_videos_thumbsup`(`id`,`user_id`,`video_id`,`createTime`) values (1,1,10000,'2021-04-12 14:11:41'),(2,2,10000,'2021-04-12 14:11:43'),(3,3,10000,'2021-04-11 14:11:45'),(4,2,10001,'2021-04-11 14:11:49'),(5,4,10000,'2021-04-17 23:32:40');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
