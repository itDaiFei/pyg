package com.demo.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.demo.service.UserService;


@Service
public class UserServiceImpl implements UserService {

	@Override
	public String getname() {
		// TODO Auto-generated method stub
		return "itcast";
	}

}
