+++
author = "Wxn"
title = "实习-2023-11-11_12_13_14_15_16"
date = "2023-11-16"
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

我居然6天没写博客了!

我想想这几天我都干了什么.

11号和12号是周天,就不想了.

就是从13号到16号这4天.

先说今天(16号):修改FACC_Demo,使用qt将history.cmo中的seedinfo字段中提取caseid和牙齿编号以及对应的3个double数据(应该是CVector3d)

15号:画ITK_SNAP,CloudCompare,Dilay,UrgBenri的流程图,基本已经吃透了,就是qt的这种架构,很简单,qt前端->消息传递靠信号槽与鼠标事件驱动->算法预处理层(文件IO数据转换{即将二进制文件转成我们可以处理的数据结构})->纯粹的算法层(根据我的提供的可用的数据信息进行计算,然后将计算结果返回到ui层)

14号(周二):将异常的牙齿stl文件纠正过来,正常情况下:牙齿的正面是z轴.最主要是两个任务:一个是找出异常数据(计算bounding box);一个是纠正数据(直接使用`vtkSmartPointer<vtkTransform>`进行旋转即可)

13号:哦,13号是找异常数据,14号是纠正异常数据!



今天:我要学习一个window下dll文件的制作与使用!