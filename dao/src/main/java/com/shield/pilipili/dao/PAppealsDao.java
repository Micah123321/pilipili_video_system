package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PAppeals;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 申诉表(PAppeals)表数据库访问层
 *
 * @author makejava
 * @since 2021-05-24 11:05:24
 */
public interface PAppealsDao {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    PAppeals queryById(Integer id);

    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<PAppeals> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param pAppeals 实例对象
     * @return 对象列表
     */
    List<PAppeals> queryAll(PAppeals pAppeals);

    /**
     * 新增数据
     *
     * @param pAppeals 实例对象
     * @return 影响行数
     */
    int insert(PAppeals pAppeals);

    /**
     * 修改数据
     *
     * @param pAppeals 实例对象
     * @return 影响行数
     */
    int update(PAppeals pAppeals);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

}