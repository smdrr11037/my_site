# Object-Oriented Programming
------
* 关键字/三大特性：Inheritance（集成）  Encapsulation（封装） Polymorphism(多态)

* 教材：Thinking in C++

* 参考：C++ Primer, Ver 5

* 成绩构成：Lab 50%, Exam 50%


## Introduction
------
* 第一个C++程序

```c++
#include <iostream>
using namespace std;
int main()
{
    cout << "Hello, World! I am " << 18 << "Today!" << endl;
    //endl: 换行
    return 0; 
}
```

* 输入输出流
```c++
#include <iostream>
using namespace std;
int main()
{
    int number;

    cout << "Enter a decimal number:"; 
    cin >> number;
    cout << "The number you entered is " << number <<"." <<endl;

    system("pause");//冻结屏幕，便于观察结果
    //not matter?
    return 0;
}
```

C language

* Strengths
    * Efficient programs
    * Direct access to machine, suitable for OS and ES
    * Flexible
* Weakness
    * Insufficient type checking
    * Poor support for programming-in-the-large
    * Procedure-oriented programming
    
------

## Using Objects

> 以字符串为例

* 加头文件

    * `include <string>`

* 定义变量

    * `string str;`

* 初始化

    * `string str = "hello";`
  

* 读写该变量

    * `cin >> str`

    * `cout << str`

---

* 与C不同的部分：

```c title="c"
//C:
char charr1[20];//需要指定大小
char charr2[20] = “jaguar”;
charr1 = charr2;//illegal,
//因为名称指向固定的地址，不能相互赋值
```

```c++ title="c++"
//C++:
string str1;//不用考虑内存
string str2=“panther”;

str1 =str2;//legal
```

* 字符串连接：

```c++
string str3;
str3 = str1 + str2;
str1 +=str2;
strl +="lalala";
```

* C如果未初始化——随机值，而C++强制初始化

    * `string str1,str2("hello");`

    * str1: 空，str2: hello

    * 与类名一样的函数：构造函数

```cpp title="string 的多种构造函数"
// 从指针 cp 所指向的字符数组中取 len 个字符，来初始化新的 std::string 对象（不包括末尾的'\0'）
string(const char *cp, int len); 
// 从 s2 的位置 pos 开始，直到字符串的末尾，来初始化新的 std::string 对象
string(const string& s2, int pos);
string(const string& s2, int pos, int len);
```



* 用 "." 进行对象行为
```c++
// 使用例子
str.empty();//字符串为空时返回1

// 其他的可选行为
substr(int pos, int len);
assign();
insert(const string&, int len);
insert(int pos, const string& s);
erase();
append();
replace();
find();
```


OOP Characteristics

1. Everything	is an	object.
2. A program is a	bunch	of objects telling	each  other what to	do	by sending	messages.
3. Each	object has its own	memory	made	up	of  other objects.
4. Every	object has a	type.
5. All	objects of a	particular type	can	receive  the	same	messages.



---

## File I/O

```c++
#include <fstream>//read from and write to file
ofstream File1("C:\\test.txt");
File1<<"Hello world"<<std::endl;//if without using namespace std;
ifstream File2("C:\\test.txt");
std::string str1;
std::string str2;
File1<<str1;
File2>>str2
```

------

## Memory Model


```c++
//global vars
int i;//outside all the function
string str;
static int j;//static global vars: 仅当前文件可见
f(){
  int k;//local vars.
  static int l;// static local vars：仅函数内可见，再次访问保留原值
  int* p = malloc(sizeof(int));//allocated vars.
  }
```

Where:

* 位于 Global data：
    
    * Global vars：可被其他文件共享
    
    * Static global vars.
    
    * Static local vars.

* 位于 Stack:

    * local vars

* 位于 Heap:

    * dynamically allocated vars.


如何访问外部变量：

```c++
//text.cpp
string gStrl;//outside main & other function
```

```c++
//main.cpp
extern string gStrl;//无extern：重定义报错
main()
{
  //可以访问gStrl
}
```

-----

## Pointer to Objects


```c++
//object create
string s = "hello";//定义，构造，
string* ps = &s;
(*ps).length()//get the object
ps->length()//call the function
```

动态内存分配：
```c++
//返回指针
int* p = new int;
int* pStudent = new Student[10];
delete p;
delete [] pStudent;
//还给系统
// 如果不加 []，只会删除第一个
```

注意事项

* 不要 delete 没 new 的
* 不能多次 delete 同一块内存
* new [] 则 delete []
* new 了 singal entity 之后要 new
* It's safe to apply delete to the null pointer (nothing  happens).


------

## Reference

* `type& refname = name;`

```c++
char c;
char& r = c;//a reference to c, 此时必须引用，can't be null
int& r = 10;//illegal, 只能引用变量
r = 'x';//c也被赋值'x'
const int& z = c;
c = 'y';// legal
z = 'x';// illegal
```

常用于传参（实参）

```c++
void f(int& x);// 引用变量在调用函数时初始化
f(y);// x引用y，函数中x改变，外面y也改变
f(y*3);// illegal
int&* p;// illegal，指向引用变量的指针不合法
void f(int*& p);// 引用指针
```

与指针不同的是，指针可以指向别处或 null，而引用和变量之间的联系不会改变


------

## Const 常量

用来代替宏

```c++
const int x = 123;//必须初始化，x保持常数值
x = 27;//illegal
x++;//illegal
const int y = x;//可以任意赋给别人
```

* 编译器会避免给它分配内存：直接写在表达式中
* 没法在编译时刻确定\外部要使用时，分配内存
* 遵循作用域原则
* 必须在创建的时候初始化，除非来自外部 `extern const int bufsize;`


```cpp
int x;  
cin >> x;
const  int size =	x;// 需要分配内存
double classAverage[size];
```

可以对聚合类型（如数组）使用 const，但仍然会分配存储空间。在这种情况下，const 意味着“一个不能被改变的存储空间”。然而，这个值不能在编译时使用，因为编译器在编译时不需要知道该存储空间的内容。



```cpp
// 下面的 Illegal 实际上试了并不会报错（
const int i[] = { 1, 2, 3, 4 };
float f[i[3]]; // Illegal  struct S { int i, j; };
struct S { int i, j; };
const S s[] = { { 1, 2 }, { 3, 4 } };
double d[s[1].j]; // Illegal
```


```c++
string str = "hello";
const string *p1 = &str; // 指针指向的内容不能更改
// 相当于string const* p1
*p1 = "c";               // illegal
string *const p2 = &str; // 指针本身不能更改
*p2 = "hello";           // OK


char* s = "Hello, world!";// 实际上是 const char 数组
char s[] = "Hello, world!";// 如果想要改动里面的值
```



当需要传递大规模数据（如数组）时，常用指针，容易把原本的数据改掉

为避免此种情况，会在指针前加const

```cpp
//尽量用指针/引用+const
void f(const int*x);//传递的参数不可修改
//函数f中
  *x++;//illegal
```

## Class
-----
自己设计对象
#### Point
```c
//结构体的写法
typedef struct point{
  float x;
  float y;
} Point;

Point a;
a.x = 1;a.y = 2;

print(&a);

void print(const Point* p){
  printf("%d %d\n",p->x,p->y);
}
void move(Point* p,int dx, int dy){
  p->x+=dx;
  p->y+=dy;
}
```
* Objects = Attributes + Service
* class 默认为 private，struct 默认为 public


```cpp
//类的写法
class Point{
public:
  void init(int x,int y);
  void move(int dx,int dy);
  void print() const;
  //行为和对象封装在一起
private://不写public就是private
  int x;//不允许外界改
  int y;
};

//implementations
void Point::init(int ix,int iy){
  x = ix;
  y = iy;
}
void Point::move(int ix,int iy){
  x+ = dx;
  y+ = dy;
}
void Point::print() const{
  cout << x	<< ' ' << y << endl;
}
```
`::`——resolver，表面函数属于谁

`<Class Name>::<function name>`

`::<function name>`——全局函数

```cpp
void S:f(){
  f();//recursive
  ::f();//调用同名的全局函数
  ::a++;//全局变量
  a--;//类中的a
}
```


## Stash
------
* Container 是可以装对象的对象

* 基本操作：put() 和 get()

* Stash 可扩展的 Container

### Stash

* 可以装任意类型的对象

* 装很多同一类型的对象（只关注size，不关注类型）

* 基本操作：add()和fetch()

<!-- pragram once? -->

```cpp
struct Stash {
  int size; // Size of each space
  int quantity; // Number of storage spaces  
  int next; // Next empty space
  // Dynamically allocated array  unsigned char* storage;
  unsigned char* storage;
  // Functions!
  void initialize(int size);  
  void cleanup();
  int add(const void* element);  
  void* fetch(int index);
  int count();
  void inflate(int increase);
};
```


### this: the pointer to the variable

* 自动存在，不需声明
* 指向对象本身的指针





## 