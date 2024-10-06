# 计算机体系结构

* 期末 40%
* 作业 6%
* 展示 6%
* 实验 48%
    * Forwarding+Pipeline - 8%
    * Interrupt exception - 8%
    * Branch prediction - 8%
    * Cache design - 10%
    * Out-of-order execution - 14%


重点

* 存储层级
* 乱序算法

-----

## Chapter 1: Overview

### 1.1 Introduction

冯诺伊曼结构

<!-- 这里有张图 -->


Big Men in Architecture

* Mater Ve - 乱序、并行
* Hennessy - Mips、Risc-I
* Patterson
* Brooks
* ……


计算机分类

* 桌面计算机
* 服务器
* 嵌入式
* 个人智能设备
* 超级计算机


Flynn 分类

* SISD - 单指令流，单数据流
* **SIMD** - 单指令，多数据
* MISD - 多、单
* **MIMD** - 多、多


-----------

理解性能

* 算法


### 1.2 Performance

性能指标

* Response Time & Throughput
    * Latency



定义 

$$
Performance = \frac{1}{Execution Time}
$$


衡量执行时间

* Elapsed time
* ……


> 改进 architecture 的目的 - 提高 performance


<!-- 好困啊，为什么会这样 -->


### 1.4 Quantitative approaches

多核不太好衡量


Amdahl's Law - make the common case fast

$$
T_{improve}=\frac{T_{affected}}{improvement\ factor}+T_{unaffected}
$$

---------

## Chapter 2: Pipeline

> 如何提速
>
> * 缩短每条指令的执行时间
> * 减少一段程序的执行时间 - pipeline

pipeline

* 定义 - 在一条指令执行完之前，另一条指令就开始执行
* 核心 - 重叠执行（overlap）
* 适用情况 - 大量无关指令（如向量积）
* pass time 和 empty time 很难避免



流水线的分类

* 单功能
* 多功能 - 可以按不同的方式连接

<!-- 图说明 -->

* 静态
* 动态 - 可以同时执行不同功能

<!-- 图 -->

* 粒度分类
* 顺序和乱序


---------

衡量 performence

* Throughput(TP) = 指令条数/总时间


> $T = (m+n-1)\times \Delta t_0$
>
> $TP = n/((m+n-1)\times \Delta t_0)$
>
> $if\ n>>m,\ TP_{max} = 1/\Delta t_0$
>
> 否则 $TP = \frac{n}{m+n-1}TP_{max}$

<!-- 几个图片例子 -->

--------------

Hazard

* structure hazards
* data hazard
* control hazard

