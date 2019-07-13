package com.pinyougou.sellergoods.service;

import com.pinyougou.pojo.TbBrand;
import entity.CongFuException;
import entity.PageResult;

import java.util.List;
import java.util.Map;

/**
 * 品牌接口
 */
public interface BrandService {
    List<TbBrand> findAll();

    /**
     * 品牌分页
     * @param pageNum 当前页面
     * @param pageSize 每页记录数
     * @return
     */
    PageResult findPage(int pageNum,int pageSize);

    /**
     * 添加品牌
     * @param tbBrand
     */
    void add(TbBrand tbBrand) throws CongFuException;


    /**
     * 根据id获得品牌
     * @param id
     * @return
     */
    TbBrand findOne(Long id);

    /**
     * 更新品牌
     * @param tbBrand
     */
    void update(TbBrand tbBrand);

    /**
     * 删除
     * @param ids
     */
    void delete(Long[] ids);

    /**
     * 条件查询
     * @param brand
     * @param pageNum
     * @param pageSize
     * @return
     */
    PageResult findPage(TbBrand brand,int pageNum,int pageSize);

    /**
     * 返回下拉列表数据
     * @return
     */
    List<Map> selectOptionList();
}
