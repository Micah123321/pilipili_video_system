package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PAppealsReply;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 申诉回复表(PAppealsReply)表数据库访问层
 *
 * @author makejava
 * @since 2021-05-25 00:11:06
 */
public interface PAppealsReplyDao {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    PAppealsReply queryById(Integer id);

    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<PAppealsReply> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param pAppealsReply 实例对象
     * @return 对象列表
     */
    List<PAppealsReply> queryAll(PAppealsReply pAppealsReply);

    List<PAppealsReply> getPAppealsReplyByAppealsId(PAppealsReply reply);

    /**
     * 新增数据
     *
     * @param pAppealsReply 实例对象
     * @return 影响行数
     */
    int insert(PAppealsReply pAppealsReply);

    int addKefuMessage(Integer id);
    /**
     * 修改数据
     *
     * @param pAppealsReply 实例对象
     * @return 影响行数
     */
    int update(PAppealsReply pAppealsReply);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);


}