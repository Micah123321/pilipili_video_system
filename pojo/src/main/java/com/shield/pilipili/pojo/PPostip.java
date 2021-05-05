package com.shield.pilipili.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class PPostip {
  private long id;
  private String ip;
  private long videoPv;
  private Date postDate;
  private long type;
  private Integer minusSecond;
}
