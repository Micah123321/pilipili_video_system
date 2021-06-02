package com.shield.pilipili.config;

import com.shield.pilipili.CustomUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService customUserService(){
        return new CustomUserService();
    }
    //授权
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //首页所有人可以访问，功能页只有对应有权限的人才能访问
        http.authorizeRequests().antMatchers("/").permitAll()
                .antMatchers("/detail/thumbsup").hasAuthority("vip1")
                .antMatchers("/admin/*","/admin").hasAuthority("vip2")
                .antMatchers("admin/categoryinfo/*","/admin/check/","/admin/check/*","/admin/checkDetail").hasAuthority("vip3");
        http.rememberMe();
        http
                //禁用baisc和form认证，在AuthController中自己实现认证逻辑
                .httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .logout().disable();
    }

    //认证
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //正常从数据库中得
        auth.userDetailsService(customUserService()).passwordEncoder(passwordEncoder());
    }
    @Override
    @Bean
    //注入authenticationManager
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}
