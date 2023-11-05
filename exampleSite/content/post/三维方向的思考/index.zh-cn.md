+++
author = "Wxn"
title = "三维方向的思考"
date = "2023-11-05"
description = "Please read me first."
tags = [
	"三维方向的思考",
]
categories = [
    "个人随笔",
]

+++

This article offers a sample of basic Markdown.
<!--more-->

# 正文开始

## OpenGL

着色器与纹理贴图

## 一道题

如何判断一个点(x,y)在一个多边形的内部,外部,还是边上?

我们先来看看国外教授的看法:https://alienryderflex.com/polygon/

![1699178621524](图片/1699178621524.png)

这种情况有点特殊,而且如果遇到了也不知道如何解决.所以我找找看有没有更简单的办法

----

下面这个同学讲的很好,使用叉乘!

博客:【如何判断点在多边形内部 - CSDN App】http://t.csdnimg.cn/JMdc7

视频:[教学视频](https://www.bilibili.com/video/BV1FD4y1i7Dy/?share_source=copy_web&vd_source=9a022d27a757e495adc6e15743c4ec1d)

<font color=red>下面来讲一下叉乘</font>:这个很重要:<font color=orange>右手定则,叉乘结果的方向,叉乘a与b的先后顺序</font>

![1699198980225](图片/1699198980225.png)