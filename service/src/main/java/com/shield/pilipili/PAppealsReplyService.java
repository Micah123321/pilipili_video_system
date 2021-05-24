package com.shield.pilipili;

import com.shield.pilipili.pojo.PAppealsReply;
import java.util.List;

/**
 * 申诉回复表(PAppealsReply)表服务接口
 *
 * @author makejava
 * @since 2021-05-25 00:11:07
 */
public interface PAppealsReplyService {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    PAppealsReply queryById(Integer id);

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<PAppealsReply> queryAllByLimit(int offset, int limit);

    /**
     * 新增数据
     *
     * @param pAppealsReply 实例对象
     * @return 实例对象
     */
    PAppealsReply insert(PAppealsReply pAppealsReply);

    /**
     * 修改数据
     *
     * @param pAppealsReply 实例对象
     * @return 实例对象
     */
    PAppealsReply update(PAppealsReply pAppealsReply);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    boolean deleteById(Integer id);

    List<PAppealsReply> getPAppealsReplyByAppealsId(Integer AppealsId);
}