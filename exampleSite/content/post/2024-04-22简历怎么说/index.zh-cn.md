+++
author = "Wxn"
title = "2024-04-22简历怎么说"
date = "2024-04-22"
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

##  自我介绍

面试官你好,我叫wxn,来自河北,是24应届毕业生,我的技术栈是c++,熟悉window和Linux的c++开发,熟悉qt界面开发,以及一些网络编程的开发,有比较丰富的项目经验,参加过蓝桥杯并获得省二等奖,所以我想找一份c++开发的工作,非常开心认识您,在这里也提前感谢接下来的面试,谢谢

## 项目介绍

毕业设计主要是模仿小米的小爱音箱做的。项目采用 C/S 架构，分成了三个 部分，arm音箱部分、后台c++服务器以及qt客户端。 音箱部分基于 mini2440 开发板，移植了 Linux 操作系统,应用层采用开源库 madplay 作为音频的编解码工具，采用父、 子、孙三个进程来控制音乐的播放。通过按键实现切歌、调节音量、暂停等功能。 后台阿里云服务器是一个公网服务器，使用C++语言，可以实现 APP 数据的转发,充当一个中转站的角色。

服务器选择使用开源高并发框架libevent 来实现。服务器还加入了链表的功能，记录 APP 和音箱的绑定关系。 APP客户端 用 Qt 实现，主要负责往服务器发送控制指令，包括切歌、调节音量、 播放模式、语音控制等等,然后服务器再转发给音箱

共享单车这个项目主要是仿照哈啰单车为灵感，项目采用cs架构，由我和学校老师一起完成，我主要负责的部分是Linux服务端的开发，服务器采用libevent+线程池的组合，用到了单例，订阅者发布者模式，并使用封装包头的方式来解决分包粘包的问题，使用protobuf来实现应用层协议，对数据进行序列化与反序列化，并使用cmake来对项目进行管理，客户端的部分由同学负责，使用qt for Android架构，我也有少量涉及…

上位机这个项目我主要实现对下位机相关数据的实时监控，使用的com2与com3进行连串口通信，对关键数据进行监测，如果超过门限值就做出警告，并写入文件作为异常的日志。其中调试用到了串口调试工具，并在真机上进行测试，然后数据传输协议是通过老师提供的协议文档，对数据进行封装，比如包头，命令，参数，奇偶校验位等…

QQ这个项目我主要负责是客户端的界面美化，采用无边框模式，对标题栏重写，以及对按键样式的设计等来达到与QQ相近的效果，同时使用MySQL来完成一些增删改查的业务，比如注册登录群组等

## 补充:文件操作

```cpp
#include <iostream>
#include <fstream>

#include "string.h"

using namespace std;


int main()
{
    char filename[60]={0};
    strcpy(filename,"C:\\Users\\wxn\\Desktop\\1.txt");
    char ch;
    ifstream inFile;

    inFile.open(filename);
    if(!inFile.is_open())
    {
        cout<<"can not open file:["<<filename<<"]"<<endl;
        exit(1);
    }
    int count = 0;
    inFile >>ch;//读取一个字符
    while(inFile.good())//查看是否读取成功
    {
        count++;
        inFile>>ch;
    }

    cout<< count <<" characters in "<<filename<<endl;
    inFile.close();

    return 0;
}
                                                                                                            
```

