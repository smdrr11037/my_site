# 高级数据与算法分析——Part 2
## Inverted File Index
------
> 应用：信息检索，搜索引擎

搜索引擎的搜索方式？

* Solution 1: 遍历寻找搜索的关键字（太耗时）

* Solution 2: 矩阵存储（太耗空间）
![alt text](image-17.png)

> 磁带假设：词和词没有顺序

* Solution 3: Inverted File Index（参考图论，将矩阵用邻接表表示）
![alt text](image.png)
以a为例：出现次数3次，分别出现在第二个网站的第六个，第三个网站的第六个，第四个网站的第六个。

    因此链表里存储的是<3,(2;6),(3;6),(4,6)>

```c
while ( read a document D ) {
    while ( read a term T in D ) {
        if ( Find( Dictionary, T ) == false )
            Insert( Dictionary, T );
        Get T’s posting list;
        Insert a node to T’s posting list;
    }
}
Write the inverted index to disk;
```

### 优化
1. 对term进行处理
   
      * 只留下词根
      
      * 停用词（stop words）过滤：the、a、what...——成本大，收获低

2. 加速搜索
   
      * 哈希
      
      * 搜索树

    > Discussion: 哈希和搜索树各自的优缺点？
    >
    <!-- > 是什么啊啊啊 -->

3. 内存优化
      * 内存不够时，把写好的词典放入disk
      
      * 释放内存，创建一个新的词典
      
      * 最后归并排序

4. 存储优化
      * disk都不够时（web-scale的数据）

      * Solution 1：将磁盘按字母序放在不同电脑里

      * Solution 2：Document-Partitioned index
        
          每个分区代表一个单独的文档集合，其中包含了该文档集合中的所有关键词以及它们对应的频率信息。这种分区的目的是为了提高查询效率，因为对于给定的查询，系统只需要访问与其相关的文档分区即可。

        * 好处：易于扩展、便于并行、即使一个集合不可用都能返回结果（虽然可能不是最佳的


5. Dynamic indexing
     * 物理删除代价昂贵——做新旧标记
     
     * 分为一个Main list和new list，已存在的词放在Main list里，新词放在new list里


6. Compression(压缩)
    
    将空格和停用词去除，将词汇表线性存储，记录每个单词首字母位置差序列
![alt text](image-18.png)

### 评估
几个评价指标：

* 索引的快慢

* 搜索的快慢

* 对复杂语言的处理能力 

|文档|相关|不相关|
|--|--|--|
|检索到|$R_R$|$I_R$|
|未检索|$R_N$|$I_N$|

精确率：检索到的正确样本在检索到的样本上的比例
$$
Precision\ P = R_R / (R_R + I_R)
$$
召回率：检索到的正确样本在所有正确样本上的比例
$$
Recall    \  R = R_R / (R_R + R_N)
$$

> [倒排文件索引的一个题集](https://blog.csdn.net/HGGshiwo/article/details/116351170)


## Leftist Heaps
-------
> review: 堆的操作

* 插入

* 删除

* 合并——复杂度相当于重新建堆
<!-- 具体的说明 -->
-------
左偏堆——利用结构的不平衡，加速堆的合并

### Definition
* 有两个儿子的节点是内部节点，其余为外部节点

* **null path length, Npl(x)**: 到外部节点的最短路径

* 定义Npl(null) = -1

* **左偏树**即所有的节点，左儿子的Npl大于等于右儿子的Npl
<!-- 图片例子 -->
> Theorem: 右路径为r的左偏树，至少有$2^r-1$个节点
<!-- ? -->
<!-- 数学归纳法 -->
> r = 1时

> r = k时，假设成立

> r =  k+1时，右子树的Npl为k+1
>
> tips:
>
> 左子树的右路径为k，因此左子树至少有$2^r-1$个节点


### 实现：
```c
struct TreeNode
{
    ElementType     Element;
    PriorityQueue   Left;
    PriorityQueue   Right;
    int             Npl;
};
```

方法一：递归

1. Merge(R)

2. Attach()

3. Swap

<!-- 图片 -->

<!-- 代码 -->


方法二：迭代                              

delete min

# Skew Heaps
------
左偏树合并时不判断npl，直接交换左右子树，就是斜堆

<!-- 怎么插入 -->

<!-- 例子 -->


------
均摊分析（势能法）
<!-- ? -->

* 势能函数$\Phi(D_i)$=重节点的个数

* 重节点：右子树节点个数严格大于左子树

* 只有右路径节点的轻重会改变

* 操作后，重节点一定变轻，轻节点不一定变重，为求上界，假设轻节点都变重

<!-- 推导和计算 -->