# Relational Database Design 
<!-- 这是有关 Relational Database Design 的课程笔记-->

> 一般情况下，范式数越大，设计越严格

## First Normal Form 

* 原子性：属性不可分割

> Examples of non-atomic domains: 
> 
> Composite attributes --- set of names (first name & last name)
> 
> Multi-value attribute --- a person’s phones 
> 
> Complex data type--- object-oriented 


* 如果 R 的所有属性域都是原子的，则关系模式 R 采用第一范式 （1NF）。
* 关系R必须满足第一范式，并且不能有部分依赖。也就是说，表中的每个非主属性必须完全依赖于候选键（主键）而不是依赖于候选键的一部分，则关系模式 R 采用第二范式 （2NF）。
* 第一范式是关系数据库的必要条件

如何处理非原子性的属性：

* 复合属性 --- 用多个属性代替
* 多值属性
    
    * Use multi fields, e.g., person(pname, …, phon1, phon2, phon3, …); 
    * Use a separate table, e.g., phone(pname, phone); 
    * Use a single field, e.g., person(pname, …, phones, …) (phones字段可能存储多个电话号码，用逗号或其他分隔符隔开)
    * Drawback: 存储复杂、冗余，不易于查询
    
实际上，原子性是一个属性中的元素如何被使用

> 字符串一般被认为不可分割
>
> 如果学号是 CS0012 or EE1127，前面两位用以提取找到部门
>
> 则这个属性不是原子性的（bad idea）




## Pitfalls in Relational Database Design 

## Functional Dependencies 

## Decomposition 

## Boyce-Codd Normal Form

> 近似于第 3.5 范式

* BC 范式的定义：A relation schema R is in BCNF, with respect to a set F of functional dependencies, if for all functional dependencies in $F^+$ of the form $\alpha\rightarrow \beta$, where $\alpha \subseteq R$ and $\beta \subseteq R$, at least one of the following holds: 

    * $\alpha\rightarrow \beta$ is trivial （显而易见）(i.e., $\beta \in \alpha$). 
    * $\alpha$ 是 R 的 superkey (i.e., $R \subseteq \alpha$, $\alpha\rightarrow R$) 

    对所有的 $\alpha\rightarrow \beta$ 都满足

> “超键”（Superkey）用于描述一组属性的集合，这组属性的值能够唯一地确定关系数据库中的每一条记录。换句话说，如果一个属性集合能够确保在关系中的每一行中都唯一地标识一条记录，那么这个属性集合就是一个超键。
> 
> 超键可以是单个属性，也可以是多个属性的组合。其中，最小的超键被称为候选键（侯效码）（Candidate Key）。如果一个关系中只有一个候选键，那么这个候选键也是主键（Primary Key），用来唯一地标识关系中的每一行。

Suppose we have a schema R and a non-trivial dependency $\alpha\rightarrow \beta$ causes a violation of BCNF. We decompose R into:

* $\alpha\cup \beta$
* $R - (\beta-\alpha)$

> instr_dept (ID, name, salary, dept_name, building, budget )
> 
> $\alpha$ = dept_name, $\beta$= building, budget
> 
> and inst_dept is replaced by
> 
> $\alpha\cup \beta$ = ( dept_name, building, budget ) - 这是一个 BC 范式
> 
> $R - (\beta-\alpha)$ = ( ID, name, salary, dept_name ) - 进一步分解（如果有别的 $\alpha\rightarrow \beta$）



```c title="构造 BC 范式的伪代码"
result := {R}; 
    done := false; 
    compute F+; 
    while (not done) do 
        if (there is a schema Ri in result that is not in BCNF)
        // Ri has a nontrivial FD a->b, a is not a key
        then begin 
            let a->b be a nontrivial functional 
            dependency that holds on Ri such 
            that a->Ri Ri is not in F+, and    = ; 
            result := (result – Ri) U (a, b) U (Ri – b); 
        end
        else done := true; 
```


> 分解的目的（不一定能同时满足）
>
> 无损连接（Lossless join）
>
> BC 范式
>
> 依赖保持（Dependency preservation） 

主要是构造 BC 范式时会损害依赖保持

因此有了下面这个范式（放松 BC 范式满足依赖保持）

----------

## Third Normal Form 

> 无损连接分解的条件：分解后的二个子模式的共同属性必须是R1或R2的码（适用于一分为二的分解）


* 第三范式的定义：A relation schema R is in third normal form (3NF) if for all $\alpha,\ \beta$ in $F^+$, 至少满足下面的一条: 

    * $\alpha\rightarrow \beta$ is trivial （显而易见）(i.e., $\beta \in \alpha$). 
    * $\alpha$ is a superkey for R. 
    * Each attribute A in $\beta-\alpha$ is contained in a candidate key for R (即 $A \in \beta-\alpha$ 是主属性, 若 $\alpha\cap \beta = \emptyset$ , 则 $A = \beta$ 是主属性). 

Note: each attribute may be in a different candidate key. 


> Example: R = (J,K,L)   F = (JK $\rightarrow$ L, L $\rightarrow$ K)
>
> J: student, K: course, L: teacher (一门有多个教师,一个教师上一门课, 一个学生选多门课, 一门课有多个学生选) 



-------------

canonical cover（正则覆盖）

* 函数依赖的最简洁形式（逻辑含义相同，形式最简）
* left side is unique

> a->b1, a->b2 可以简化为 a->b1b2


```c title="构造第三范式的伪代码"
Let Fc be a canonical cover for F; 
i := 0; 
for each functional dependency a -> b in Fc do 
    {if none of the schemas Rj, 1 < j <= i contains a b
          then begin 
            i := i  + 1; // 将Fc中的每个 a -> b 分解为子模式Ri := (a, b), 
            Ri := (a b) // 从而保证 dependency-preserving. 
          end} 
if none of the schemas Rj, 1 < j <= i contains a candidate key for R then 
begin 
    i := i  + 1; 
    Ri := any candidate key for R; // 保证至少在一个Ri中存在R的候选码, 从而保证 lossless-join. 
end 
return (R1, R2, ..., Ri) 
```

判断无损连接 - 保证至少在一个 Ri 中存在 R 的候选码


>  Example: For a relation schema R(A, B, C, D) with F = {AB -> C, C -> D, D -> A}. 
> 
>   1. 求 Candidate Key
>   2. 转换成 BC 范式
>   3. 


1. 先作图，找到没有任何一个箭头指着的属性，一定是 Candidate Key 的一部分，本例中为 B

    发现 AB/BC/BD 都能作为 Candidate Key

2. a





## Multivalued Dependencies 

## Fourth Normal Form 

