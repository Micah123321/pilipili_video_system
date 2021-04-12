package com.shield.pilipili;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan("com.shield.pilipili.dao")
@SpringBootApplication
public class PilipiliApplication {

    public static void main(String[] args) {
        SpringApplication.run(PilipiliApplication.class, args);
    }

}
