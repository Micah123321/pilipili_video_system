package com.shield.pilipili.impl;

import com.shield.pilipili.pojo.PAppealsReply;
import com.shield.pilipili.dao.PAppealsReplyDao;
import com.shield.pilipili.PAppealsReplyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 申诉回复表(PAppealsReply)表服务实现类
 *
 * @author makejava
 * @since 2021-05-25 00:11:07
 */
@Service("pAppealsReplyService")
public class PAppealsReplyServiceImpl implements PAppealsReplyService {
    @Resource
    private PAppealsReplyDao pAppealsReplyDao;

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public PAppealsReply queryById(Integer id) {
        return this.pAppealsReplyDao.queryById(id);
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    @Override
    public List<PAppealsReply> queryAllByLimit(int offset, int limit) {
        return this.pAppealsReplyDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param pAppealsReply 实例对象
     * @return 实例对象
     */
    @Override
    public PAppealsReply insert(PAppealsReply pAppealsReply) {
        this.pAppealsReplyDao.insert(pAppealsReply);
        return pAppealsReply;
    }

    /**
     * 修改数据
     *
     * @param pAppealsReply 实例对象
     * @return 实例对象
     */
    @Override
    public PAppealsReply update(PAppealsReply pAppealsReply) {
        this.pAppealsReplyDao.update(pAppealsReply);
        return this.queryById(pAppealsReply.getId());
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        return this.pAppealsReplyDao.deleteById(id) > 0;
    }

    @Override
    public List<PAppealsReply> getPAppealsReplyByAppealsId(Integer AppealsId) {
        return pAppealsReplyDao.getPAppealsReplyByAppealsId(AppealsId);
    }
}