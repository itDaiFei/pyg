package com.pinyougou.pojogroup;

import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojo.TbSpecificationOption;

import java.io.Serializable;
import java.util.List;

/**
 * 规格组合实体类
 * 规格名称+规格选项
 */
public class Specification implements Serializable {

    private TbSpecification Specification;
    private List<TbSpecificationOption> SpecificationOptionList;

    public TbSpecification getSpecification() {
        return Specification;
    }

    public void setSpecification(TbSpecification specification) {
        Specification = specification;
    }

    public List<TbSpecificationOption> getSpecificationOptionList() {
        return SpecificationOptionList;
    }

    public void setSpecificationOptionList(List<TbSpecificationOption> specificationOptionList) {
        SpecificationOptionList = specificationOptionList;
    }

    public Specification(TbSpecification specification, List<TbSpecificationOption> specificationOptionList) {
        Specification = specification;
        SpecificationOptionList = specificationOptionList;
    }

    public Specification() {
    }
}
