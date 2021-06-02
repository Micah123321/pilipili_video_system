package com.shield.pilipili;

import com.shield.pilipili.pojo.PUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

public class CustomUserService implements UserDetailsService {
    @Resource
    private PUserService pUserService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        PUser pUser = pUserService.selectByUserName(userName);
        pUser.setUpwd(this.passwordEncoder.encode(pUser.getUpwd()));
//        List authoritiesList=new ArrayList<>();
//        authoritiesList.add(pUser.getUtype()==1?"vip1":pUser.getUtype()==2?"vip2":"vip3");
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (int i = 1; i <= pUser.getUtype(); i++) {
            authorities.add(new SimpleGrantedAuthority("vip"+i));
        }
        return new User(pUser.getUserName(), pUser.getUpwd(), true,
               true, true,
               true, authorities);
    }
}
