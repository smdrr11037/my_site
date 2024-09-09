# 备忘录
> 出现奇怪bug的时候（特别是几天前还好的时候
>
记得更新`sudo apt update && sudo apt upgrade`
## MkDocs
* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.
* `mkdocs gh-deploy` - Refreash the project online.

## ufw
* `sudo ufw status` - 查看防火墙状态
* `sudo ufw enable` - 开启防火墙 （拒绝传入，允许传出）
* `sudo ufw disable` - 关闭防火墙
* `sudo systemctl stop ufw` `sudo systemctl disable ufw` - 永久关闭防火墙

## 重定向
* `./your_program < input.txt` - 用input.txt重定向为程序的输入

## 下载、解压文件
* `wget http://www.diag.uniroma1.it/challenge9/code/ch9-1.1.tar.gz` - 下载文件
* `tar -zxvf ch9-1.1.tar.gz` - 解压文件 

## git
* `git init` - 将当前目录初始化为git仓库（后面可以跟指定目录）
* `echo "site/" >> .gitignore` - 忽略site目录下的所有文件更改
* `git clone <repo>` - 克隆<repo>到当前目录（后面可以跟指定目录）
* `git add .``git commit -m '第一次版本提交'` - 提交with message “第一次版本提交”、
* `git config --global user.name "runoob"``git config --global user.email test@runoob.com` - 更改git配置（没有global则只对当前仓库有效）
git clone git pull  git pus

## Python

* `python3 -m venv .venv` - 创建名为 .venv 的虚拟环境
* `source .venv/bin/activate` - 启动虚拟环境
* `deactivate` - 停用

## Script

* ``


## Java

> 为了图书管理系统浅学一下

### try-catch


在Java中，try-catch 块用于捕获可能会导致程序异常终止的代码块中的异常，并在发生异常时执行一些处理逻辑，而不是让程序中断或崩溃。

```java title="java"
public class TryCatchExample {
    public static void main(String[] args) {
        try {
            // 可能会引发异常的代码块
            int result = divide(10, 0); // 除法操作，分母为0会导致异常
            System.out.println("Result: " + result); // 该行不会执行，因为异常会在这行之前发生
        } catch (ArithmeticException e) {
            // 捕获到算术异常时执行的代码块
            System.out.println("Exception occurred: " + e.getMessage());
        }
    }

    public static int divide(int numerator, int denominator) {
        return numerator / denominator; // 除法操作，可能会引发算术异常
    }
}
```

```java
try {
    // 可能会引发异常的代码块
} catch (ExceptionType1 e1) {
    // 处理 ExceptionType1 类型异常的代码块
} catch (ExceptionType2 e2) {
    // 处理 ExceptionType2 类型异常的代码块
} catch (ExceptionType3 e3) {
    // 处理 ExceptionType3 类型异常的代码块
}
// 可选的 finally 块可以在 try 或 catch 块之后使用，用于执行清理或收尾操作
finally {
    // finally 块中的代码无论是否发生异常都会执行
}
```

try 块中包含可能会引发异常的代码，而 catch 块中包含处理特定类型异常的代码。你可以定义多个 catch 块来处理不同类型的异常，也可以只定义一个 catch 块来处理所有异常。finally 块是可选的，用于执行无论是否发生异常都需要执行的代码，比如资源的释放。

