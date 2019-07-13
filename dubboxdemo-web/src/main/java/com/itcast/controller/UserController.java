package com.itcast.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.demo.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Reference //远程注入
	private UserService userService;
	
	@RequestMapping("/show")
	@ResponseBody
	public String showName() {
		return userService.getname();
	}
}
