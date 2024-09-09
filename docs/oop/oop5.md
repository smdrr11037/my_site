# Example

> 用到前面所有知识的例子

## Smart pointer

> Goals
>
> 记录每个对象被多少个指针指着
>
> 如果不被指着，则释放该位置内存




```cpp
p = q;

// Have to do the following

p->decrease();
p = q;
q->increase();
```

## Coupling


## Refactoring

> 函数太臃肿/几个功能重合
>
> -> 重构


## 多继承