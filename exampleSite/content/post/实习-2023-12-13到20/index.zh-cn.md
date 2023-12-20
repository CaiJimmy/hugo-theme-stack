+++
author = "Wxn"
title = "实习-2023-12-13到20"
date = "2023-12-20"
description = "Please read me first."
tags = [
	"Dilay",
]
categories = [
    "实习日记",
]

+++

This article offers a sample of basic Markdown.
<!--more-->

# 正文开始

我居然8天没写博客了!

我想想这几天我都干了什么.



oatpp、drogon、cpp-httplib、cmake、Nginx、three.js



使用three.js做了三维牙齿的前端界面,three.js是一个类似于webgl的东西,其实我更想搞OpenGL+openmesh+qt,都还可以吧.

不过玩three.js也有成长,我在nginx配置前端网站时遇到了跨域问题:

- 浏览器请求同级目录时遇到了跨域问题.(办法:nginx在配置不完美,你需要设置在nginx.conf中配置根目录)

- 浏览器在进行get/post请求也遇到了跨域问题.(办法:cpp服务器的url算法响应浏览器的方法中,你需要设置响应的头: 设置CORS头[一共三行代码])

不够都完美解决!!!



今天:我要学习一个window下dll文件的制作与使用!