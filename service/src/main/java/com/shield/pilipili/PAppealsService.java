package com.shield.pilipili;

import com.shield.pilipili.pojo.PAppeals;

import java.util.List;

/**
 * 申诉表(PAppeals)表服务接口
 *
 * @author makejava
 * @since 2021-05-24 11:07:52
 */
public interface PAppealsService {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    PAppeals queryById(Integer id);

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<PAppeals> queryAllByLimit(int offset, int limit);

    /**
     * 新增数据
     *
     * @param pAppeals 实例对象
     * @return 实例对象
     */
    PAppeals insert(PAppeals pAppeals);

    /**
     * 修改数据
     *
     * @param pAppeals 实例对象
     * @return 实例对象
     */
    PAppeals update(PAppeals pAppeals);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    boolean deleteById(Integer id);

}