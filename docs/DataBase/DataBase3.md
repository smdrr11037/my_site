# Advanced SQL

## SQL Data Types and Schemas 
------




## Integrity Constraints 
------
### Domain Constraints 


------
### Referential Integrity 


-----
### Assertions 




------
### Triggers





## Authorization
----------- 
保持数据的一致性、完整性（会有消耗）

也可以在数据库之外判断

```sql title="trigger"
-- 一个触发器
-- 当把一个人的配偶设成 null 时，保证他配偶的配偶也被设成 null

Begin 
    update Person set spouse = NULL 
    where id = orow.spouse, spouse = nrow.id
End 
```

```sql title="assertion"
-- 一个断言
-- 检测若干配偶规则

Create assertion spouse_assert1 check 
     (not exists (select * from Person as p1, Person as p2 
             where p1.spouse = p2.id and (p1.id != p2.spouse 
             or p1.gender = p2.gender))) 
```



## Embedded SQL
------- 
由于数据库功能的局限性，常搭配 C++、Java 等语言来使用。依赖的编程语言就叫做 Host language (宿主语言)

`EXEC SQL` - 用于嵌入 SQL 语句到宿主语言中

```sql title="单行查询"
    EXEC SQL BEGIN DECLARE SECTION; 
    char V_an[20], bn[20]; 
    float  bal; 
    EXEC SQL END DECLARE SECTION; 
    ……. 
    scanf(“%s”, V_an);   // 读入账号,然后据此在下面的语句获得bn, bal的值 
    EXEC SQL SELECT branch_name, balance INTO :bn, :bal FROM 
    account WHERE account_number = :V_an; 
    END_EXEC
    printf(“%s, %s, %f”, V_an, bn, bal); 
```

多行查询及修改时用到游标
```sql title="多行查询"
Exec SQL include SQLCA;  // SQL通讯区，是存放语句的执行状态的数据结构，其中//有 
        一个变量sqlcode指示每次执行SQL语句的返回代码（success, not_success）。 
Exec SQL BEGIN DECLARE SECTION; 
    char bn[20], bc[30]; 
Exec SQL END DECLARE SECTION; 
Exec SQL DECLARE branch_cur CURSOR FOR 
    Select branch_name, branch_city From branch; 
    …… 
Exec SQL OPEN branch_cur; 
    While (1) {Exec SQL FETCH branch_cur INTO :bn, :bc; 
                       if (sqlca.sqlcode <> SUCCESS) BREAK; 
                       ……   // 由宿主语句对bn, bc中的数据进行相关处理 
                     } 
Exec SQL CLOSE branch_cur; 
```

```sql title="单行修改"

```


## Dynamic SQL
------- 



## ODBC and JDBC 
------
ODBC

* 编程要点
    1. 分配环境句柄 `HENV henv; SQLAllocEnv ( &henv );`
    2. 2
    3. 3
    4. 2

```sql title="Example"
int ODBCexample()   // 程序结构 
    { 
       RETCODE error; 
       HENV env;   /* environment */ 
       HDBC conn;   /* database connection */ 
       SQLAllocEnv(&env); 
       SQLAllocConnect(env, &conn);   /* 建立连接句柄 */ 
       SQLConnect (conn, “MySQLServer”, SQL_NTS, “user”, SQL_NTS, “password”, 
                       SQL_NTS);  /* 建立用户user与数据源的连接，  SQL_NTS表示前 
                       一参量以null结尾 */ 
       { …. Main body of program … }   // See next pages 
       SQLDisconnect(conn); 
       SQLFreeConnect(conn); 
       SQLFreeEnv(env); 
    }
int main()
{
    char branchname[80]; 
         float balance; 
         int lenOut1, lenOut2; 
         HSTMT stmt; 
              SQLAllocStmt(conn, &stmt);   /* 为该连接建立数据区，将来存放查询结果 */ 
         char * sqlquery = “select branch_name, sum (balance) from account 
                                    group by branch_name”;   /* 装配SQL语句 */ 
         error = SQLExecDirect(stmt, sqlquery, SQL_NTS); /* 执行sql语句,查询结果存放到 
                    数据区stmt ，同时sql语句执行状态的返回值送变量error*/ 
      if (error == SQL_SUCCESS) { 
          SQLBindCol(stmt, 1, SQL_C_CHAR, branchname,80, &lenOut1); 
          SQLBindCol(stmt, 2, SQL_C_FLOAT, &balance, 0, &lenOut2); 
          /* 对stmt中的返回结果数据加以分离，并与相应变量绑定。第1项数据转换为C的字符
          类型，送变量branchname(最大长度为80)， lenOut1为实际字符串长度（若＝-1代表
          null），第2项数据转换为C的浮点类型送变量balance中 */ 
          while ( SQLFetch(stmt) >= SQL_SUCCESS) { /* 逐行从数据区stmt中取数据，放到绑定变量中 */ 
          printf (“ %s  %d\n”, branchname, balance); 
                /*  对取出的数据进行处理*/       … …          } 
                          }   …… 
        } 
          SQLFreeStmt(stmt, SQL_DROP);  /* 释放数据区*/ 
    
```

------
JDBC
```java title="连接数据库"
public static void JDBCexample(String dbid, String userid, String passwd) 
{ 
    try { 
          Class.forName ("oracle.jdbc.driver.OracleDriver"); 
          Connection conn = DriverManager.getConnection 
                    ("jdbc:oracle:thin:@aura.bell_labs.com:2000:bankdb", userid, passwd); 
           Statement stmt = conn.createStatement(); 
            … Do Actual Work …. 
          stmt.close(); 
           conn.close(); 
          } 
     catch (SQLException sqle) { 
          System.out.println("SQLException : " + sqle); 
                        } 
} 
```

```java title="update"
    try { 
           stmt.executeUpdate("insert into account values 
                                           ('A_9732', 'Perryridge', 1200)"); 
         } catch (SQLException sqle) { 
            System.out.println("Could not insert tuple. " + sqle); 
                               } 
```

```java title="query"
    ResultSet rset = stmt.executeQuery("select branch_name, avg(balance) 
                                                               from account 
                                                               group by branch_name"); 
    while (rset.next()) { 
          System.out.println(rset.getString("branch_name") + "  " + rset.getFloat(2));
                     } 
```

SQL Injection

Prepared Statement 