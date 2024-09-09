# 理论计算机科学导引

> 核心课程，好好学😭

* 作业 20%
* 测验 20%
* 期末 60%


TCS - theory of computer science

* upper bound 优化算法的复杂度上界
* lower bound 得到一个问题的最小复杂度，如基于比较的排序算法的下界 $\Omega(nlogn)$
    * 对于算法的寻找和加密方法有指导作用


> 讨论前需要数学上的严格定义 - promblem, computing model, computation
>
> 后续讨论一个问题是否可计算、需要多少资源（p，np）

----------

最小生成树问题为例（三种形式）

* 给定一个有权图，问最小生成树是什么？
* ……最小生成树的权重和是？
* ……有没有一个生成树，权重和比 k 小? - **decision problem**

第三种形式的数学表示


> decision problem 可以跟 language 对应 



* alphabet - a **finite** set of symbols
* string over $\sum$ - a sequence
* $|\omega|$ - string $\omega$ 的长度
* empty string - e，|e|=0
* exponentiation - $\omega^n=\omega \omega ... \omega$ n 个
    * $\omega^0=e$
* a language over $\sum$ - string 的集合


language 操作

* concatenation - $AB = \{uv,u\in A,v \in B\}$
* exponentiation -
    * $A^0=\{e\}$
    * 
    * $A^+$
    * $A^*$
* reversal


------

计算模型

finite automaton

* 自动门
* 
<!-- 这里有两张状态图 -->


> 数学课，后续在 ipad 写手写笔记好了

