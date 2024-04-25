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

```cpp
//二分
//通过下标直接查找,
//因为是连续的,如果不少的话,则有nums[mid] == mid,如果是左边少了,就是不等
//最后还要判断nums[r] == r,要是等于的话,那就是少最后一个
class Solution {
public:
    int getMissingNumber(vector<int>& nums) {
        
    }
};
```

## 补充：13. 找出数组中重复的数字

```cpp
//哈希表秒了
//方二：不要了
class Solution {
public:
    int duplicateInArray(vector<int>& nums) {
        
    }
};
```



# 16.75. 和为S的两个数字

```cpp
//时间复杂度最重要
//用法哈希表,count看是否存在
class Solution {
public:
    vector<int> findNumbersWithSum(vector<int>& nums, int target) {
        
    }
};
```

# 17.23. 矩阵中的路径

```cpp
//dfs
//枚举起点，枚举方向
//起点怎么枚举:两个for循环
//方向怎么枚举?上右下左:画图

//dfs中:
//1)刚好遍历到的字符个数u == 字符串的长度,就OK
//2)如果u下标字符 != 遍历到的字符,就不ok
//3)遍历四个方向,为了避免回头遍历,比如你刚遍历完一个字符'a',下一个字符还是'a',就会回头遍历,
//我们要避免这个,就需要先修改为一个其他的,等遍历完再返还
class Solution {
public:
    bool dfs(vector<vector<char>>& matrix, string &str,int u ,int x,int y)
    {
        if(str[u] != matrix[x][y])return false;//当前字符与之不符
        if(u == str.size()-1)return true;//刚好是最后一个,而且能来到这,说明相符
        int dx[4]={-1,0,1,0},dy[4]={0,1,0,-1};
        char t = matrix[x][y];
        matrix[x][y] = '*';
        for(int i = 0 ; i < 4 ;i++)
        {
            int a= x+dx[i],b = y +dy[i];
            if(a>=0 && a<matrix.size() &&b>=0 && b<matrix[a].size())
                if(dfs(matrix,str,u+1,a,b))return true;
        }
        matrix[x][y] = t;
        return false;
    }
    bool hasPath(vector<vector<char>>& matrix, string &str) {
        for(int i = 0 ;  i < matrix.size() ; i++)
        {
            for(int j = 0 ; j < matrix[i].size() ; j++)
            {
                if(dfs(matrix,str,0,i,j))
                {
                    return true;
                }
            }
        }
        return false;
    }
};
```



# 18.55. 连续子数组的最大和

```cpp
s表示收益
res表示最终结果
```

![1714048646860](图片/1714048646860.png)

# 19.42. 栈的压入、弹出序列

```cpp
关键:不是所有的数都入栈,他才开始进行弹出操作.
    完全可以实现这么一种情况:你还进去,人家就已经出来了

//1.长度不同,肯定不行
//2.用一个栈来模拟整个过程
//3.一直将pushV的元素入栈,直到栈顶元素 == 要弹出的第i元素(i从0开始)
//(while循环 --->尽可能的把能弹出的元素弹出来[前提:栈中有元素且栈顶元素刚好是我们要弹出的元素])
//4.最后如果栈为空,即为ok
class Solution {
public:
    bool isPopOrder(vector<int> pushV,vector<int> popV) {
        
    }
};
```



# 20.70. 二叉搜索树的第k个结点

[230. 二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)

```cpp
//例子中:第1小的数是1;第二小数是2;第三小的数是3;
//所有:就是求中序遍历的第k个
//中序遍历:我们都知道是左根右,左和右就是一个dfs,那么中是难点
//中序遍历的中:k--,如果k==0,就是我们的答案
//最后dfs加一个阀门:如果节点指针为空,则直接return
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* kthNode(TreeNode* root, int k) {
        
    }
};
```



# 21.48. 复杂链表的复刻

```cpp
//1.给旧链表每2个节点之间加1个节点(新节点的值是前节点的值)
//2.重新遍历链表中的每个节点 (p->next)->random=(p->random)->next;
//3.将新链表拎出来:
//1)搞个虚拟头结点,最后返回dummy->next
//2)一有虚拟节点,那必须有一个cur节点
//3)画图:
//              1.cur->next = p->next;
//              2.cur = cur->next;
//              3.难点:需要把新旧链表彻底分开p->next = p->next->next;
//              p = p->next;
/**
 * Definition for singly-linked list with a random pointer.
 * struct ListNode {
 *     int val;
 *     ListNode *next, *random;
 *     ListNode(int x) : val(x), next(NULL), random(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *copyRandomList(ListNode *head) {
        
    }
};

```

![1714053373256](图片/1714053373256.png)



# 22.53. 最小的k个数

![1714054960976](图片/1714054960976.png)

```cpp
//使用大根堆priority_queue
//只放k个,多了就踢了
//最后记翻转
class Solution {
public:
    vector<int> getLeastNumbers_Solution(vector<int> input, int k) {
        priority_queue<int>heap;
        for(auto x : input)
        {
            heap.push(x);
            if(heap.size() > k)heap.pop();//把堆顶删了
        }
        vector<int>res;
        while(heap.size())
        {
            res.push_back(heap.top());
            heap.pop();
        }
        reverse(res.begin(),res.end());
        return res;
    }
};
```



# 23.33. 链表中倒数第k个节点

```cpp
//先求链表长度n
//链表中倒数第k个节点 == 链表从前往后挪n-k次
//简单画个图
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
    ListNode* findKthToTail(ListNode* pListHead, int k) {
        
    }
};
```

![1714057655318](图片/1714057655318.png)

# 24.71. 二叉树的深度

```cpp
//max(左子树,右子树)+1
//dfs
//一共两行代码
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int treeDepth(TreeNode* root) {
        if(!root)return 0;
        return max(treeDepth(root->left),treeDepth(root->right))+1;
    }
};
```

# 25.72. 平衡二叉树

```cpp
//这个题和求树的最大深度一样
/*
if(!root)return 0;
*/
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        
    }
};
```

# 26.15. 二维数组中的查找

```cpp
//每列是递增的
//难点:右上角
//(i,j)=>(0,array[0].size()-1)
//在范围内:(i<array.size() && j>=0)
//x = array[i][j],直接返回true
//x > target j--;
//else i++;
class Solution {
public:
    bool searchArray(vector<vector<int>> array, int target) {
        
    }
};
```

------

|      | #    | 标题                                                         | 来源            | 显示算法 | 通过率 | 难度     |
| :--- | :--- | :----------------------------------------------------------- | :-------------- | :------- | :----- | :------- |
|      | 51   | [数字排列](https://www.acwing.com/problem/content/47/)       | 剑指Offer       |          | 59.28% | **中等** |
|      | 80   | [骰子的点数](https://www.acwing.com/problem/content/76/)     | 剑指Offer       |          | 58.04% | **简单** |
|      | 69   | [数组中数值和下标相等的元素](https://www.acwing.com/problem/content/65/) | 剑指Offer       |          | 61.16% | **简单** |
|      | 83   | [股票的最大利润](https://www.acwing.com/problem/content/79/) | 剑指Offer       |          | 53.68% | **简单** |
|      | 40   | [顺时针打印矩阵](https://www.acwing.com/problem/content/39/) | 剑指Offer       |          | 44.71% | **中等** |
|      | 88   | [树中两个结点的最低公共祖先](https://www.acwing.com/problem/content/84/) | 剑指Offer       |          | 70.16% | **中等** |
|      | 20   | [用两个栈实现队列](https://www.acwing.com/problem/content/36/) | 剑指Offer       |          | 62.31% | **简单** |
|      | 25   | [剪绳子](https://www.acwing.com/problem/content/24/)         | 剑指Offer       |          | 47.73% | **简单** |
|      | 73   | [数组中只出现一次的两个数字](https://www.acwing.com/problem/content/69/) | 剑指Offer       |          | 70.44% | **中等** |
|      | 24   | [机器人的运动范围](https://www.acwing.com/problem/content/22/) | 剑指Offer       |          | 36.96% | **简单** |
|      | 61   | [最长不含重复字符的子字符串](https://www.acwing.com/problem/content/57/) | 剑指Offer       |          | 44.64% | **简单** |
|      | 17   | [从尾到头打印链表](https://www.acwing.com/problem/content/18/) | 剑指Offer       |          | 67.50% | **简单** |
|      | 44   | [分行从上往下打印二叉树](https://www.acwing.com/problem/content/42/) | 剑指Offer       |          | 70.24% | **中等** |
|      | 43   | [不分行从上往下打印二叉树](https://www.acwing.com/problem/content/41/) | 剑指Offer       |          | 66.09% | **简单** |
|      | 45   | [之字形打印二叉树](https://www.acwing.com/problem/content/43/) | 剑指Offer       |          | 58.99% | **中等** |
|      | 81   | [扑克牌的顺子](https://www.acwing.com/problem/content/77/)   | 剑指Offer       |          | 35.89% | **简单** |
|      | 38   | [二叉树的镜像](https://www.acwing.com/problem/content/37/)   | 剑指Offer       |          | 75.86% | **简单** |
|      | 63   | [字符串中第一个只出现一次的字符](https://www.acwing.com/problem/content/59/) | 剑指Offer       |          | 50.63% | **简单** |
|      |      |                                                              |                 |          |        |          |
|      |      |                                                              |                 |          |        |          |
|      | 49   | [二叉搜索树与双向链表](https://www.acwing.com/problem/content/87/) | 剑指Offer       |          | 64.51% | **中等** |
|      |      |                                                              |                 |          |        |          |
|      | 60   | [礼物的最大价值](https://www.acwing.com/problem/content/56/) | 剑指Offer       |          | 65.53% | **中等** |
|      |      |                                                              |                 |          |        |          |
|      | 22   | [旋转数组的最小数字](https://www.acwing.com/problem/content/20/) | 剑指Offer       |          | 42.79% | **中等** |
|      | 76   | [和为S的连续正数序列](https://www.acwing.com/problem/content/72/) | 剑指Offer       |          | 72.69% | 中等     |
|      |      |                                                              |                 |          |        |          |





26号任务：

|      | 39   | [对称的二叉树](https://www.acwing.com/problem/content/38/)   | 剑指Offer       |          | 57.04% | **简单** |
|      | 82   | [圆圈中最后剩下的数字](https://www.acwing.com/problem/content/78/) | 剑指Offer       |          | 71.01% | **简单** |
|      | 52   | [数组中出现次数超过一半的数字](https://www.acwing.com/problem/content/48/) | 剑指Offer       |          | 70.20% | **中等** |
|      | 32   | [调整数组顺序使奇数位于偶数前面](https://www.acwing.com/problem/content/30/) | 剑指Offer       |          | 65.33% | **简单** |
|      | 47   | [二叉树中和为某一值的路径](https://www.acwing.com/problem/content/45/) | 剑指Offer       |          | 58.08% | **中等** |
|      | 26   | [二进制中1的个数](https://www.acwing.com/problem/content/25/) | 剑指Offer       |          | 62.66% | **简单** |
|      | 56   | [从1到n整数中1出现的次数](https://www.acwing.com/problem/content/51/) | 剑指Offer       |          | 44.62% | **困难** |
|      | 58   | [把数组排成最小的数](https://www.acwing.com/problem/content/54/) | 剑指Offer       |          | 60.41% | **中等** |
|      | 62   | [丑数](https://www.acwing.com/problem/content/58/)           | 剑指Offer       |          | 61.20% | **中等** |
|      | 27   | [数值的整数次方](https://www.acwing.com/problem/content/26/) | 剑指Offer       |          | 33.62% | **中等** |
|      | 29   | [删除链表中重复的节点](https://www.acwing.com/problem/content/27/) | 剑指Offer语法题 |          | 48.48% | **中等** |
|      | 16   | [替换空格](https://www.acwing.com/problem/content/17/)       | 剑指Offer语法题 |          | 61.84% | **简单** |
|      | 37   | [树的子结构](https://www.acwing.com/problem/content/35/)     | 剑指Offer       |          | 49.06% | **简单** |
|      | 46   | [二叉搜索树的后序遍历序列](https://www.acwing.com/problem/content/44/) | 剑指Offer       |          | 46.18% | **简单** |
|      | 68   | [0到n-1中缺失的数字](https://www.acwing.com/problem/content/64/) | 剑指Offer       |          | 41.01% | **简单** |
|      | 86   | [构建乘积数组](https://www.acwing.com/problem/content/82/)   | 剑指Offer       |          | 64.71% | **中等** |
|      | 57   | [数字序列中某一位的数字](https://www.acwing.com/problem/content/52/) | 剑指Offer       |          | 34.88% | **简单** |
|      | 48   | [复杂链表的复刻](https://www.acwing.com/problem/content/89/) | 剑指Offer       |          | 61.44% | **中等** |
|      | 70   | [二叉搜索树的第k个结点](https://www.acwing.com/problem/content/66/) | 剑指Offer       |          | 67.42% | **简单** |
|      | 42   | [栈的压入、弹出序列](https://www.acwing.com/problem/content/40/) | 剑指Offer       |          | 45.57% | **简单** |
|      | 59   | [把数字翻译成字符串](https://www.acwing.com/problem/content/55/) | 剑指Offer       |          | 52.18% | **中等** |
|      | 15   | [二维数组中的查找](https://www.acwing.com/problem/content/16/) | 剑指Offer       |          | 44.10% | **中等** |
|      | 72   | [平衡二叉树](https://www.acwing.com/problem/content/68/)     | 剑指Offer       |          | 61.81% | **简单** |