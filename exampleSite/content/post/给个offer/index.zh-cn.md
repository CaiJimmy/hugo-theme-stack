+++
author = "Wxn"
title = "给个offer"
date = "2024-04-24"
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

# 1.41. 包含min函数的栈

```cpp
//https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof/description/
class MinStack {
public:
    /** initialize your data structure here. */
    //1.单调栈
    //2.主栈与辅助栈
    //3.1)push都要插入（如果辅助栈为空，或者辅助栈顶>=x，则辅助栈插入）
    //2)pop() 如果辅助栈顶 == 主栈顶，则辅助栈顶弹出，否者就只有主栈弹出
    //3)4)直接返回相应的栈
    MinStack() {
        
    }
    
    void push(int x) {
        
    }
    
    void pop() {
        
    }
    
    int top() {
        
    }
    
    int getMin() {
        
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */
```





# 2.35. 反转链表

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
 //https://leetcode.cn/problems/reverse-linked-list/
//难点：单链表要建立一个前驱节点
//关键点：画图
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};
```

![1713948511743](图片/1713948511743.png)

# 3.19. 二叉树的下一个节点

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode *father;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL), father(NULL) {}
 * };
 */
 //这个是vip题目
//285. 二叉搜索树中的中序后继
//分类讨论:有右子树和没有右子树
//中序遍历
//情况1:这个点有右子树,那后继就是"右子树"最左边的那个
//情况2:这个点的右子树为空(且有父节点),当p有父节点且p等于p父节点的右儿子,那么p就赋值为p的父节点,最后返回p的父节点
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* p) {
        
    }
};
```

# 4.34. 链表中环的入口结点

[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

[LCR 022. 环形链表 II](https://leetcode.cn/problems/c32eOV/)

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *entryNodeOfLoop(ListNode *head) {
        
    }
};
```

画图:数学证明:(b+c)表示n圈

![1713973663082](图片/1713973663082.png)

```cpp
备份
class Solution {
public:
    ListNode *entryNodeOfLoop(ListNode *head) {
        auto first = head,slow = head;
        while(first && first->next && first->next->next)
        {
            first = first->next->next;
            slow = slow->next;
            if(first == slow)
            {
                first = head;
                while(first != slow)
                {
                    first = first->next;
                    slow = slow->next;
                }
                return first;
            }
        }
        return nullptr;
    }
};
```



# 5.77.翻转单词顺序

[151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

```cpp
//先翻转整个句子
//再翻转单独的一个单词
//难点:在找到一段时,不要忘记边界
```

![1713974457798](图片/1713974457798.png)

```cpp
void Reverse(int l ,int r,string& s)
{
    for(int i = l , j = r ;i < j ;i++,j--)swap(s[i],s[j]);
}
Reverse(0,s.size()-1,s);
等价于
reverse(s.begin()+0,s.begin()+s.size());//范围:[)

反转不是空格的那一段
```



# 6.18.重建二叉树

https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof/description/

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
  //前:根左右
 //中:左根右
 //1.使用哈希表,快速的找到"一个元素在中序遍历的位置"
 //2.递归dfs(主函数直接返回)
 //1)递归参数:左右子树节点个数
 //2)递归内部:
 /*
 - 前序遍历:左>右 -> null
 - 根节点的值为前序遍历的第1个点 preorder[a]
 - 找到根节点在哈希表中的位置
 - 左右子树递归创建 范围画图
 */
class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        
    }
};
```

![1713980258916](图片/1713980258916.png)



![1713978783747](图片/1713978783747.png)





# 7.21. 斐波那契数列

```cpp
//f[i] = f[i-1]+f[i-2]
class Solution {
public:
    int Fibonacci(int n) {
        
    }
};
```

# 8.78. 左旋转字符串

```cpp
//先把整个进行翻转
//再把前(总-个数),后两部分进行翻转
class Solution {
public:
    string leftRotateString(string str, int n) {
        
    }
};
```

# 9.87. 把字符串转换成整数

```cpp
//分步
//过滤掉行首空格
//long long
//判断这个数是不是负数
//如果在累加的过程中(还没加完),就已经越界了,那就直接跳出来
class Solution {
public:
    int strToInt(string str) {
        
    }
};
```

# 10.28. 在O(1)时间删除链表结点

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
  //1.用下一个节点覆盖掉当前节点
 //2.删除掉当前节点
class Solution {
public:
    void deleteNode(ListNode* node) {
        
    }
};
```

# 11.66. 两个链表的第一个公共结点

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
  //双指针,
 //指针1走完a再走b,指针2走完b再走a,返回最后相遇的位置,如果最后都指向空也算相遇了
 //注意:对于指针1与指针2,要么是"回头",要么是"下一个"
class Solution {
public:
    ListNode *findFirstCommonNode(ListNode *headA, ListNode *headB) {
        
    }
};
```





![1714028450744](图片/1714028450744.png)



# 12.84. 求1+2+…+n

```cpp
//语法题:(false && 条件); = false 可以起到if的效果
class Solution {
public:
    int getSum(int n) {
        
    }
};
```

# 13.36. 合并两个排序的链表

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
  //归并排序
  //虚拟节点(比如说初始化为-1)+当前节点
 //1)两个指针
 //2)比较两个指针的值哪个小,哪个小就给哪个(如果l1)
 //3)链到虚拟链表,当前节点后移,l1也后移
 //4)处理残局:l1与l2哪个不同,就一直链到空为止
class Solution {
public:
    ListNode* merge(ListNode* l1, ListNode* l2) {
        
    }
};
```

# 14.14. 不修改数组找出重复的数字

```cpp
//简单方法:哈希表
//方二:抽屉原理
//二分法:
//一个萝卜一个坑,假如说数的个数>坑的个数,那么这个区间一定存在重复的数
//注意:给定一个长度为 n+1的数组nums，数组中所有的数均在 1∼n的范围内，其中 n≥1,表示下标有效的范围是[1,nums.size()-1]
class Solution {
public:
    int duplicateInArray(vector<int>& nums) {
        // l 和 r 分别代表的是 数字 1  和 数字n 这里并不是下标.
        int l = 1, r = nums.size() - 1;
        while (l < r){
            // 二分 找到中间的那个数
            int mid = l + r >> 1;
            int s = 0;
            // 下面这句话的意思 从 nums里面 循环去先去 判断 这个数 x 的值看他是否在 [l, mid]中间, 在的话 判断条件执行完为true
            //  true 的话代表 数字 1 flase 代表 数字 0. 然后再进行累加 s += x 统计符合条件的个数.
            // 最终的效果就是 统计了 整个数组中 数的值 在 [l,mid] 之间的个数.
            for (auto x : nums) s += x >= l && x <= mid; // left : [l, mid] , right : [mid + 1, r]
            // 理解: 一个坑存一个数, 正常情况下 一定是坑的个数 和 数的个数相等. 如果一坑里面有两个数. 那么就会出现
            // 数的个数 大于 坑的个数 说明 这个区间段一定存在重复的个数.
            if (s > mid - l + 1) r = mid;
            else l = mid + 1;
        }

        return r;//l和r都可以
    }
};
```

# 15.68. 0到n-1中缺失的数字

