+++
author = "Wxn"
title = "2024-04-19面试复盘"
date = "2024-04-19"
description = "Please read me first."
tags = [
	"Dilay",
]
categories = [
    "面试复盘",
]

+++

This article offers a sample of basic Markdown.
<!--more-->

# 正文开始

1. struct和class的区别
2. 值传递，地址传递，引用传递（拷贝）的区别
3. 指针是几个字节？
4. static关键字
5. 虚函数指针，虚函数表
6. 多态
7. 编译器如何知道你是进行的函数重载

答：函数重载，它允许在同一个作用域中定义多个同名函数，但这些函数的==参数列表或类型==必须不同。在调用这些函数时，编译器会根据传递给函数的参数的数量、类型或顺序来确定要调用的具体函数版本。



1. 构造，析构的顺序
2. stl：vector、list、Map的区别
3. 智能指针
4. 项目中如何保证线程安全？
5. 死锁
6. 多线程中多个信号与主线程