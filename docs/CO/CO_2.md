# Chapter 2
------
## 2.5 Representing Instruncrions in the computer
* 高级指令->汇编指令->机器码

------
## 2.6 Logical Operations
移位、与、或、异或、非

-----
## 2.7 Instruction for making decision
分支跳转

循环
```asm
LOOP:   slli    x10,x22,
```

其他的条件跳转（有符号数的比较）：

* `blt rs1, rs2, L1`

    如果rs1<rs2，跳转到Lable L1处

* `bge rs1, rs2, L1`

    如果rs1>=rs2，跳转到Lable L1处


* `slt x2, x3, x4`

    set on less than——如果x3<x4，将x2设为1

无符号数比较的指令：bltu, bgeu
<!-- 好像简便一点 -->

* `bgeu x20, x11, Outbound`


-----
Case/Switch

* 分支语句在memory中像数组一样连续存储
* 根据偏移量访问

<!-- 待补充 -->
------
## 2.8 Supporting Procedures in Conputer Hardware
过程调用

需要用更多的寄存器

* 过程调用中使用的寄存器：
    
    * x10~x17：传递参数和返回结果的8个寄存器
    * x1：记录return地址的寄存器

* Stack

    * push：sp=sp-8
    * pop：sp=sp+8

**Leaf procedure**：不会调用别的过程的过程

* 把要用的寄存器存到栈中，用完后再ld回来

<!-- 例子 -->
```asm
leaf_example
```
**Register Usage**

* x5-x7，x28-x31：temporary register（随便用）
* x8-x9，x18-x27：saved register（需要压栈）


**Non-leaf procedure**

* return的地址会改变

> 递归为例

```asm
fact: addi  sp,sp,16
```