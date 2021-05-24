package com.shield.pilipili.impl;

import com.shield.pilipili.PAppealsService;
import com.shield.pilipili.dao.PAppealsDao;
import com.shield.pilipili.pojo.PAppeals;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 申诉表(PAppeals)表服务实现类
 *
 * @author makejava
 * @since 2021-05-24 11:07:52
 */
@Service("pAppealsService")
public class PAppealsServiceImpl implements PAppealsService {
    @Resource
    private PAppealsDao pAppealsDao;

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public PAppeals queryById(Integer id) {
        return this.pAppealsDao.queryById(id);
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    @Override
    public List<PAppeals> queryAllByLimit(int offset, int limit) {
        return this.pAppealsDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param pAppeals 实例对象
     * @return 实例对象
     */
    @Override
    public PAppeals insert(PAppeals pAppeals) {
        this.pAppealsDao.insert(pAppeals);
        return pAppeals;
    }

    /**
     * 修改数据
     *
     * @param pAppeals 实例对象
     * @return 实例对象
     */
    @Override
    public PAppeals update(PAppeals pAppeals) {
        this.pAppealsDao.update(pAppeals);
        return this.queryById(pAppeals.getId());
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        return this.pAppealsDao.deleteById(id) > 0;
    }
}