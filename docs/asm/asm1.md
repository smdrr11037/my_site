# 汇编与接口

> 参考资料 - Intel 指令集手册
>
> MASM 汇编

* Exploratoy research 30%
  * 浮点运算 - 11.10
  * 大模型的汇编代码理解、生成和优化 - 12.31
  * 步骤

## Introduction

不同的编译选项，结果可能不同

```c title="示例代码"
int silly(int a){
    return (a+1)>a;
}
```

> 未定义行为

* -O0 - 无优化
* -O1 - 将 a 优化掉，直接 return 1
* 当 a = MAX_INT 时，分别返回 0 和 1

不同的编译器，编译结果不同

* gcc -O3 - 向量展开
* icc -O3 - 循环展开，流水线并行
* clang -O3 - 把循环求和转换为高斯公式（idiom recognition）

汇编语言的用处

* 分析最终代码问题
* 极端优化

接口的用处

* communication
* Control

## Chap.1-2 The microprocessor and its architecture

* Intel 286 - protect mode
* Intel 386 - 流水线、分页、虚拟 8086
* Intel 486 - cache
* ……

Hyper-Threading Technology

> 超线程技术

* 多个逻辑核，一个 stall 后，另一个启动

多核

64 位 = IA-32e

IEEE 754 浮点数相关，略

* subnormal number - 超越浮点数精度的小数
* subnormal = $(-1)^{sign}*fraction*2^{1-bias}$（保证连续性）
* 性能会极度下降

Generral-Purpose Register

* A
  * partial register - RAX(64 位) 高 32 位是 EAX……
  * 用小的寄存器，指令会变短，可以放更多条，提升性能
* BCD

> 一个特殊性质
>
> MOV RAX
>
> MOV EAX - 高位自动清零（兼容保护）
>
> MOV 更小的部分寄存器 - 不会清零

Spetial Register

* RFLAG
    * A 位 - 支持 BCD 码直接计算
    * D 位 - 字符串比对是低位还是高位

-----------

Long mode & 64-bit mode



------------

Memory Management Requirements

* Relocation - 代码无论放哪都能运行
* Protection
* Sharing



分段和分页的内存管理方式

* Segmentation - 每段大小可能不同
    * external fragmentation
* Paging - 每页大小固定（一般 4kb） 
    * internal fragmentation
    * 转换复杂，比分段慢



线性地址 -开启分页-> 虚拟地址


------------


地址回滚问题

-----------

保护模式

* 选择子
* 描述符
    * 全局描述符 - 规定第一个是空描述符（防止段没能初始化）
    * 局部描述符

> 保护模式下，能跑多少个线程？

G 位

* G = 0 - ending = starting + Limit
* G = 1 - ending = starting + (Limit)FFF H


保护模式的三个安全级别

* DPL - 操作系统（客体）
* RPL - 程序（主体）
* CPL - CPU（主体）

检查

<!-- 好几张图 -->

> 通过门描述符，实现越权访问
>
> 0 是最高权限

-----------

### Segmentation

> 粗粒度


Memory Addressing

* 选择子（索引）-> 描述符（全局/局部，八个字节）-> 安全检测 -> 基地址+偏移地址（线性地址）

<!-- 图 -->




* Multi-segment memory model
    * 每个段分开，有各自的权限和空间
* Flat-memory model

-------


### Memory Paging

> 细粒度 

Effective Address = Base + (Scale*Index) + Displacement



multi-level paging method

> 保证每级的索引都能放到一个 4KB 的页中

* 12 bits for page offset (一页 4KB)
* 52 bits for PTE
* 每个 PTE 4B - 一页能放 2^10 个 PTE
* 52 / 10 = 6 级


<!-- 图 -->

-----

如何满足内存管理的需求

* Relocation - 应用程序的地址可以放在任何物理地址
* Protection - 
* Sharing - 不同的虚拟地址可以映射到同一物理地址


----------

Page Size Extension

* 有 4MB 的大页
* 标志位（CR4.PSE）为 1 时，将地址解释为大页（低 22 位都是 offset）

Physical Address Extensions(PAE)

<!-- 复杂的有点神经的模式（ -->

Self-Referencing - PTE 指向自己而不是二级页表（不考

Total Meltdown

------





### Operating mode

* 16 bit - 操作数、地址 16 位
* 32 bit - 操作数 32 位
* 64 bit - 操作数 32 位、地址 64 位 `MOV EAX,[RBX]`


Addressing Mode

* Data-Addressing Modes - `MOV AX,DX`
* Stack - `PUSH AX`
* Program - `JMP`, `CALL`


Operands

* 立即数
* 寄存器操作数
* 内存操作数

> 目的操作数可能不变，e.g. `CMP` 指令改变状态寄存器 

操作数长度不一致的情况

* `MOV EAX,BX` - 报错
* `MOV EAX,12345H` - 补零

> `MOV AX,F2H`  - load a label named F2H
>
> `MOV AX,0F2H` - 装一个 16 进制数

-------

RIP-relative
