package com.shield.pilipili.pojo;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * p_search_hot
 * @author 
 */
@Data
public class PSearchHot implements Serializable {
    private Integer id;

    private String title;

    private Date searchdate;

    private Integer num;

    private static final long serialVersionUID = 1L;
}