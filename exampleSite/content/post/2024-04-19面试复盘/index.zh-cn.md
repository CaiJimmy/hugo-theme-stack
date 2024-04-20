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

在线编程工具:   

https://www.bejson.com/runcode/c740/



sizeof(空类) = 1;

静态成员变量和成员函数都不占类的大小(sizeof),也就是说静态成员变量和成员函数都不属于类



```
继承下面说了

封装:将变量设置为protected或者provate,限制这些变量在类外的直接访问,我们可以使用get常量函数来完成对这个变量的封装

protected:当一个成员被定义为protected类型时，仅能在类内、友元和派类访问。

private:当一个成员被定义为private类型时，仅能在类内、友元访问。

多态下面说了
```



## 1.struct和class的区别

首先,class是cpp独有的,c语言里面没有,

然后就是在cpp中,class的默认访问权限是private,而struct是public;

还有就是class默认都是私有继承,而sruct默认是公有继承.

最后一点是,在语法上的区别,你使用cpp中 ,

不管是struct还是class,都可以直接使用类名.

在c语言中,要么写 struct A  a;(带上struct),要么你用typedef struct A A;一下



涉及知识:https://blog.csdn.net/weixin_52668597/article/details/136666085?spm=1001.2014.3001.5501



补充:公有继承,保护继承与私有继承下,类内的元素的权限变化:

- 公有继承:原来啥权限就还是啥权限,一点不变
- 保护继承:原来公有变保护,其他两个->原来啥权限就还是啥权限
- 私有继承:原来公有变私有,原来保护变私有,原来私有还是私有

## 2.值传递，地址传递，引用传递（拷贝）的区别

值传递你无法在函数中改变这个变量的值

地址传递和引用你可以在函数中改变这个变量的值

值传递相当于是你建立了一个副本,你是你,他是他,你的改变无法影响到他,他的改变无法影响到你.

地址传递的话,传进去的就是本人了,此时修改地址上的数据会影响到原始数据.

而引用传递相当于是给该变量取的别名,相当于是一个大名一个小名比如鲁迅和周树人,本质上还是一个人,所以改变引用传递的变量也可以改变变量的原始数据

## 4.指针是几个字节？

64位系统是8字节

32位系统是4字节

## 5.static关键字

static的用法分为静态变量与静态函数

静态变量将变量限定在当前文件下,且生命周期和该文件运行的周期一样长.

然后再细分就是局部静态变量与全局静态变量:局部静态变量被限定在一个代码块内(一般是一个函数),而全局静态变量只要是在这个文件内,都可以访问.



再者就是静态函数了,<font color=red>静态成员函数只能访问静态成员变量</font>



然后就是,类中的静态成员变量并不属于这个类,你用sizeof去算,他不算这个类的大小



涉及知识:cpp编译单元 https://blog.csdn.net/weixin_52668597/article/details/137575061?spm=1001.2014.3001.5501

## 6.虚函数指针，虚函数表

涉及知识:https://blog.csdn.net/weixin_52668597/article/details/137447982?spm=1001.2014.3001.5501

只要你在类中写了一个虚函数,那么就会产生一个虚函数表.

而且不管你写多少个虚函数,这些虚函数在类中所占的内存就只有8个字节,而占的这八个字节就是虚函数指针,也就是说,这些虚函数都放在一个数组中,这个数组就是虚函数表

## 7.多态

涉及知识:https://blog.csdn.net/weixin_52668597/article/details/137447982?spm=1001.2014.3001.5501



多态其实就是 父类指针指向子类对象,如果子类重写了父类的方法,那么这个父类指针就会呈现出不同的现象

## 8.编译器如何知道你是进行的函数重载

答：函数重载，它允许在同一个作用域中定义多个同名函数，但这些函数的<font color=red>参数列表或类型</font>必须不同。在调用这些函数时，编译器会根据传递给<font color=red>函数的参数的数量、类型或顺序</font>来确定要调用的具体函数版本。

简单来讲，就是函数重载可以是<font color=red>参数类型不同，参数顺序不同，也可以是参数个数不同</font>

编译器会在内部，把函数名称和参数列表一起存储在符号表中，这样编译器就知道了你用的是哪个重载之后的函数

就是，编译器在处理函数重载时，会将函数名称和参数列表一起存储在符号表（或类似符号表的数据结构）中。这样编译器就能够确定每个函数的唯一签名，并且在需要进行函数调用匹配时可以快速检索并确定调用哪个函数版本。



## 9.构造，析构的顺序

在C++中，对象的构造和析构顺序

最主要是

和对象的创建和销毁顺序相关。

一般情况下，<font color=red>对象的构造顺序与对象的创建顺序相同，对象的析构顺序与对象的销毁顺序相反。</font>

比如说，如果一个类 `A` （包含类 `B` 和类 `C` 的对象作为成员），则在创建 `A` 的对象时，首先会调用 `B` 的构造函数，然后调用 `C` 的构造函数。

然后析构顺序就与构造顺序相反。也就说当销毁对象A时，析构函数会按照对象在类成员<font color=red>声明</font>中的逆序依次调用。继续上面的例子，也就是说，他首先会调用 `C` 的析构函数，然后调用 `B` 的析构函数。



还有一种情况：就是父类和子类的析构与构造关系：

比如说现在有一个子类b,他继承了父类a,那么在创建子类b的对象时,

就会先调用父类a的构造函数,

再调用自己子类b的构造函数,

在析构的时候,顺序就反过来了,

就是先析构子类b,

最后再析构父类a

```cpp
Base::fun()
Child::fun()
~Child::fun()
~Base::fun()
```



## 10.stl：vector、list、Map的区别

vector:底层是一个动态数组,可以通过下标进行快速随机访问,占据连续的内存,在不扩容的情况下,在尾部增删很快.在扩容的情况下,需要先开辟原来容器大小的1.5倍,再将原数据拷贝到新的内存,最后在释放原内存

list:是一个双向链表,他虽然也可以用下标访问,但是那是因为他重载了中括号运算符,他访问一个元素的复杂度是o(n),他的内存是不连续的,节点之间通过指针连接.他唯一的优势是可以快速的在任意位置进行增删,但前提是先经过o(n)的复杂度找到这个位置

Map:是一个键值对,类似于json那种结构,底层是红黑树实现.

每个键都是唯一的(键和值可以为null,但是键只能出现一次),

map在插入好删除时会自动排序,他对元素的访问、插入和删除操作，这些操作的时间复杂度通常是对数时间（即`O(log n)`）。



```cpp
#include<iostream>
#include<map>

using namespace std;

class A{};

int main()
{
    map<A*,int> m1,m2;
    m1[nullptr] = 1;
    A *a = new A();
    m2[a] = 2;
    
    printf("%d,%d",m1[nullptr],m2[a]);

    map<A*,A*> m3;
    m3[nullptr] = nullptr;
    return 0;
}


```



## 11.智能指针

智能指针有auto_ptr，share_ptr，unique_ptr还有shared_ptr

auto_ptr是C++98中引入的第一个智能指针，但是由于他的不安全性已被C++11弃用。他其实被unique_ptr给取代了,可以理解为auto_ptr他其实是一个浅拷贝,非常容易造成多个指针指向同一块内存区域的现象，这就引发非常多的潜在的问题:比如一些常见的段错误,多次析构,访问一段未定义的空间等,比如说你在文件中访问这个指针,但是其实你已经在其他地方释放这段内存了.

然后,unique_ptr 他提供了独占所有权的智能指针，允许有且仅有一个 `unique_ptr` 拥有资源。与 `auto_ptr` 不同，`unique_ptr` 实现了更安全和更完整的独占所有权语义

然后,shared_ptr,他允许多个指针共享同一块内存，<font color=red>并且会在最后一个 shared_ptr 被销毁时释放这段内存</font>。它使用的是一种引用计数的技术来追踪资源的所有者数量，并在所有者数量为零时自动释放资源。

然后最后一个,是weak_ptr: 他是 `shared_ptr` 的伴侣类，它允许你共享资源但不拥有资源。weak_ptr 不会增加引用计数,它通常用于解决 `shared_ptr` 的循环引用问题。



循环引用的问题:

然后循环引用通常是shared_ptr互相引用造成的,两个或多个对象相互持有对方的 shared_ptr，导致它们的引用计数永远不会降为零，然后导致资源泄漏。
我想到的一个例子是，比如说有一个双向列表，他们的每个节点对象都有两个指针,一个是前指针prior pointer，一个是next指针，

然后两个相邻的节点对象，节点1的next指针指向节点2自身，节点2的前指针prior pointer指向节点1自身，然后这两个节点都用share_ptr进行创建,在创建时,节点自身这段内存引用计数+1,然后被相邻指针指向时,引用计数再+1,这样每个节点的引用计数就都是2,

然后当我们销毁节点这个share_ptr后,前后节点的引用计数都降为了1,但是前节点在等着后节点的prior pointer放手,后节点在等着前节点的next pointer放手,这就形成了死锁,

造成的现象就是这两个节点的指针已经被销毁了,但是节点的内存迟迟无法析构,就造成了"内存泄漏",解决的办法就是把这个节点的prior指针和next指针都变成weak_ptr



## 12.项目中如何保证线程安全？(如何避免死锁)

加锁:**互斥锁**,**读写锁**,cpp中特有的智能锁

## 13.死锁

死锁产生的条件:

![1713633820870](图片/1713633820870.png)

## 14.多线程中多个信号与主线程

主线程一般是负责控制和协调其他线程的任务。比如说我这个共享单车项目中的服务器,他的主线程主要是负责监听客户端的连接,一旦有客户端来进行连接,我们就会把这个客户端通过libevent变成一个事件,并把他加入到事件集合中去,然后由其他线程来监听该客户端的读写事件,并通过轮询的方式拿到线程池中的一个线程,然后由这个线程通过调用它自己的回调函数来处理这个读写事件.相当于主线程就是是负责统筹规划的,他只复制监听客户端,剩下的交给其他线程.

然后我的毕设的服务器是只用到了libevent,没有用到线程池,毕设主要的项目亮点是硬件的uboot系统移植以及arm架构下的库的交叉编译,还有qt的自定义部件、界面以及qt打包等,最终形成一个完善的项目.

然后硬件是用到的一个多进程通信，使用的是shm共享内存



 在多线程编程中，主线程可以通过发送信号来与其他线程进行通信。

常见模式有：

1). **条件变量（Condition Variables）**：相当于是一种基于互斥锁的线程间同步机制，通常情况下是和锁一起使用的。主线程可以使用条件变量来等待特定的条件达成，而其他线程则可以通过发送信号来通知主线程条件的改变。一旦条件满足，主线程就会被唤醒并继续执行。

2). **事件（Events）**：事件也是一种用于线程间同步的通信机制，通常用于向其他线程发出信号以触发特定事件的发生，然后执行事件的回调函数。主线程可以等待某个事件的发生，其他线程可以通过发送信号来触发该事件。

3). **信号量（Semaphores）**：

   信号量维护一个计数器，表示可用资源的数量。线程可以通过请求（等待）和释放（发信号）操作来获取和释放资源。当计数器为正时，线程可以继续执行，否则线程会被阻塞直到资源可用。就是我们常说的那个操作系统pv操作，经常用来解决“生产者消费者的问题”,当然信号量也是可以的

   伪代码：

```cpp
生产者和消费者都可以有很多个

情况有三种:
1.队列已满,生产者停止生产商品  -> 生产者wait条件变量
2.队列为空,消费者无商品可取  -> 消费者wait条件变量
3.队列不满但非空,生产者正常生产商品,消费者正常取商品

#include "需要的头文件"

//wait()-> P()操作 --
//signal()-> V()操作  ++

typedef struct{
    int value; //剩余资源数
    struct process *list;//等待队列
} semaphore;

semaphore empty,full;//空位和产品的数量  空位数+产品数=最大容量
Mutex mutex1,mutex2;//两个互斥锁

//申请使用资源
void wait(semaphore s)
{
    s.value --;
    if(s.value < 0)//剪完1后,可能等于0(表示资源刚好用完,但是够用,所以不阻塞),也可能<0(资源早就用完了,再减一就没得用了,所以要阻塞)
    {
        block(s.list);
    }
}

//使用完释放资源
void signal(semaphore s)
{
    s.value ++;
    if(s.value <= 0)//刚释放完一个资源(也就是说现在有一个资源可用),发现资源数==0,说明说明之前是<0的,表示队列已经阻塞了;如果发现资源数<0,那就更不用说了,肯定有消费者在等待
    {
        wakeup(s.list);
    }
}



// 生产者函数
void producer() {
    while (1) {
        produce();//生产1个东西
        wait(empty);//空位减1个
        wait(mutex1);//上锁

        array[空位] = 产品;//给一个空位放产品

        signal(mutex1);//解锁
        signal(full);//产品数+1

    }
}

// 消费者函数
void consumer() {
    while (1) {
        wait(full);//产品数-1
        wait(mutex2);//上锁

        array[产品数] = null;//拿走一个产品

        signal(mutex2);//解锁
        signal(empty);//空位+1

        comsum();//消费这个产品
    }
}

int main() {
    std::thread prod(producer);
    std::thread cons(consumer);
    prod.join();
    cons.join();
    return 0;
}


```

```
信号量（Semaphore）：
信号量是一种用于控制对共享资源的访问的同步机制。它通常用于实现进程或线程间的协调。信号量主要包含两种操作：wait()（或称为P()操作）和 signal()（或称为V()操作）。wait()操作会减少信号量的计数，如果结果为负数，则线程会阻塞。signal()操作会增加信号量的计数，如果有线程正在阻塞，它会被唤醒。
```


4). **消息队列（Message Queues）**：主线程可以通过发送消息到队列中来通知其他线程，而其他线程则可以从队列中接收消息并执行相应的操作。



15.qt信号槽中有第五个参数，有了解过吗？

信号槽中有第五个参数支持qt中,信号与槽进行跨跨线程通信,他是一个枚举值,
默认是自动连接,也比较智能,如果信号与槽是在同一个线程,就直接调用槽函数,如果不在同一个线程,会自动使用QueuedConnection.

然后支持多线程的枚举值其实有两个,一个是Queued Connection,另一个是BlockingQueuedConnection,这两个支持信号与槽的异步通信,唯一的区别是:

Queued Connection是异步非阻塞的，BlockingQueuedConnection是异步阻塞的,然后非阻塞是运行后直接返回,阻塞是运行结束后才返回.
Queued Connection用的比较多,他可以保证槽函数的调用是在接收者的线程中进行的，所以就不会有多个线程同时访问槽函数中的共享资源的情况发生（除非槽函数内部又进行了不安全的跨线程操作）,这样就避免线程竞争,避免了线程安全的问题。




# 补充:

## 1)C语言链表

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node{
    int data;
    struct Node * prior;
    struct Node * next;
} Node;


int main ()
{
    /***
     * c语言像数组的链表
    */
   /*
    Node* list = (Node *)malloc(sizeof(Node) *5);


    if (list == NULL) {
        // 内存分配失败的处理
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }
    
    // 初始化链表节点
    for (int i = 0; i < 5; ++i) {
        list[i].data = i; // 数据域初始化为索引值或其他你选择的值
        
        if (i == 0) {
            // 第一个节点的前驱指向 NULL
            list[i].prior = NULL;
        } else {
            // 其他节点的前驱指向前一个节点
            list[i].prior = &list[i - 1];
        }
        
        if (i == 4) {
            // 最后一个节点的后继指向 NULL
            list[i].next = NULL;
        } else {
            // 其他节点的后继指向下一个节点
            list[i].next = &list[i + 1];
        }
    }
    
    // ... 使用链表
    for(int i = 0; i< 5;i++)
    {
        int num = list[i].data;
        printf("%d\n",num);
    }
    // 释放分配的内存
    free(list);
    */

   /******c语言链表********/
    Node *n1 = (Node *)malloc(sizeof(Node));
    Node *n2 = (Node *)malloc(sizeof(Node));
    Node *n3 = (Node *)malloc(sizeof(Node));
    n1->data = 1;
    n1->prior = NULL;
    n1->next = n2;

    n2->data = 2;
    n2->prior = n1;
    n2->next = n3;

    n3->data = 3;
    n3->prior = n2;
    n3->next = NULL;

    for(Node * node = n1; node != NULL;node = node->next)
    {
        int num = node->data;
        printf("[%d]\n",num);
    }
    
    return 0;
}

输出:
[1]
[2]
[3]
```

## 2)链表-智能指针版

```cpp


#include <iostream>
#include <memory>//智能指针

using namespace std;

struct Node{
    int data;
    weak_ptr<Node> prior;
    weak_ptr<Node> next;
};


int main()
{
    shared_ptr<Node> n1 = make_shared<Node>();
    shared_ptr<Node> n2 = make_shared<Node>();
    shared_ptr<Node> n3 = make_shared<Node>();
    n1->data = 1;
    n1->prior.reset();//智能指针设置为空应该用reset函数,而不是n1->prior = nullptr;
    n1->next = n2;

    n2->data = 2;
    n2->prior = n1;
    n2->next = n3;

    n3->data = 3;
    n3->prior = n2;
    n3->next.reset();//n3->next = nullptr;

    for(shared_ptr<Node> node = n1 ; node != nullptr ; node = node -> next.lock()){//你需要先用lock将weak_ptr提升为shared_ptr才能够进行赋值
        int num = node ->data;
        printf("[%d]\n",num);
    }


    //销毁智能指针(你也可以不销毁,因为智能指针自己非常懂事)
    n1.reset();
    n2.reset();
    n3.reset();

    return 0;
}
输出:
[1]
[2]
[3]
```

## 3)链表-普通cpp版

```cpp


#include <iostream>

using namespace std;

struct Node{
    int data;
    Node* prior;
    Node* next;
};


int main()
{
    Node * n1 = new Node;
    Node * n2 = new Node;
    Node * n3 = new Node;
    n1->data = 1;
    n1->prior = nullptr;
    n1->next = n2;

    n2->data = 2;
    n2->prior = n1;
    n2->next = n3;

    n3->data = 3;
    n3->prior = n2;
    n3->next = nullptr;

    for(Node * node = n1 ; node != nullptr ; node = node->next){
        int num = node ->data;
        printf("[%d]\n",num);
    }


    //销毁智能指针
    delete n1;
    delete n2;
    delete n3;

    return 0;
}
输出:
[1]
[2]
[3]
```

