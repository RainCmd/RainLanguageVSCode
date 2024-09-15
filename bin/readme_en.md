
<div align="center">

# RainLanguage
[简体中文](./readme.md) | English

</div>

**RainLanguage(雨言) Is a programming language designed for game development, is a mixture of object-oriented and procedure-oriented language, with minimal syntax and safe type checking, compiler also has a powerful type deduction ability, as long as the type can be derived through the expression can be derived by the compiler, without manual explicit declaration. Programmers familiar with the C family of languages can get started at almost no cost.**

**If the host language is c++, you can directly use the header file in the Public folder to call it. C can use the interface in the ExternC.h in the ExternC folder. CSharp can use interfaces already wrapped in ExternC with RainLanguageAdapter.cs.**

## 🙋Hello World
Here is sample code to output "Hello World" using `RainLanguage`:
``` rs
native Print(string)

Main()
    Print("Hello World")
```
The native declaration states that the Print function is a function implemented in the host language, which has only one string parameter and no return value. When called, the host language will first receive a binding function event, which contains the complete name and parameter type list of the function to be bound, and subsequent calls will directly call the bound function after the binding is completed.

The Main function is defined in the declaration indent space, so it is a global function, and member functions need to create instances to access it, while global functions can access it directly. There is no default function entry point after the virtual machine is started, so you actually need to manually find and call the function after the virtual machine is started.

## 🎖️Functions and features
- Code blocks are identified by indentation to make the code more neat and tidy.
- Unified tuple concept, tuples can be arbitrarily combined, function parameters and return values are essentially tuples.
- A unified type system where the base class of all types is the handle type, and value types can also be assigned to handle types through unboxing operations
- The optimized access method of vector members can be directly combined into other vectors through the members of a vector.
- Support object-oriented and garbage collection functions, development does not need to care about memory release.
- Support compilation to fixed-point number version, do frame synchronization games do not need to worry about floating point number caused by asynchronism.
- All functions are asynchronous, and wait statements can be inserted anywhere in the code to achieve the same effect as thread hibernation.
- Support hot update, you can compile the running code file at run time, you can also compile the code into a library file and then publish, directly load the compiled bytecode file at run time, so as to ensure source code security.
- It can be compiled into multiple library files, the runtime can load these library files at the same time, and the interfaces in the library files can call each other. As long as the referenced public interface or type does not change when the library file is updated, the dependent library file does not need to be compiled again.
- Value types are supported, which can be used to eliminate the impact of GC in high-frequency code blocks, and the arrangement of data in the heap will be more compact with an array of value types, thereby reducing the overhead of heap memory. Members of value types also undergo reference folding at compile time to achieve the same access speed as local variables.
- Support for enumeration types, you can do constant folding at compile time, and you don't need to worry about the impact on the efficiency of code operation while having type checking.
- The try catch finally statement is used to handle runtime exceptions. When an exception is captured, the address list of the call stack for the exception can be obtained. The call stack can be restored together with the pdb file compiled in debug mode.
- Support reflection function, before any definition can be added through square brackets, the runtime can obtain all the definitions and their properties in the current virtual machine, you can create a type of uninitialized object according to the type information, you can also create a delegate or directly call a function through the reflection obtained function information.
- Support lambda expression, can achieve functional programming technology.

## Basic data type
* Value type
  * `bool`:Boolean type
  * `byte`:Byte type
  * `char`:Character type (2 bytes)
  * `integer`:Integer type (8 bytes)
  * `real`:Real number type (64-bit floating-point number or 16-decimal 48-bit integer fixed-point number)
  * `real2`:Two-dimensional vector
  * `real3`:Three-dimensional vector
  * `real4`:four-dimensional vector
  * `type`:Type referring to run-time enumeration, value type, managed type (16 bytes)
  * `string`:String type, can only length 0, cannot be null, has a separate string heap (4 bytes)
  * `entity`:Entity type, equivalent to a pointer to an object in the host language, triggers an entity release event when there is no reference to the entity in the virtual machine, allowing easy control of the declaration cycle (4 bytes)
  * `enum`:Enumeration type, except for obtaining the enumeration name, the virtual machine will be directly treated as an integer type (8 bytes).
* Managed type
  * `handle`:All types of base classes, stored and managed in the heap, are subject to garbage collection and are boxed when a value type is assigned to a handle type
  * `interface`:Base class for all interface types
  * `delegate`:Delegate type, which can point to any function except constructor and destructor
  * `task`:Task type. Use *start* and *new* to create asynchronous tasks
  * `array`:Base class for all array types

 ## Keywords
| keyword | role | keyword | role |
| :---: | :---: | :---: | :---: |
| namespace | Define namespace | import | Import namespace |
| native | A function that interacts with the host language | public | Accessible from any location |
| internal | Accessible within the current assembly | space | The current namespace and subnamespace are accessible |
| protected | The current class and subclasses are accessible | private | Only the current class is accessible |
| enum | Define enumeration type | struct | Defined value type |
| class | Define managed type | interface | Defining interface types |
| const | Declared constant | global | Access global definition |
| base | base class | this | this class |
| true | Constant true | false | Constant false |
| null | Default values for managed type and entity type | var | Declares a variable whose type is automatically derived by the compiler |
| bool | Boolean type | byte | Byte type |
| char | Character type | integer | Integer type |
| real | Real type | real2 | Two-dimensional vector |
| real3 | Three-dimensional vector | real4 | Four-dimensional vector |
| type | Type of type | string | String type |
| handle | Base classes of all types | entity | The type of entity used to refer to the host language object |
| delegate | Delegate type | task | Type of task for asynchronous execution |
| array | Base class for all array types | if | Conditional judgment statement |
| elseif | Continuous condition judgment statement | else | Statement branch executed when condition is false |
| while | Loop statement | for | Loop statement |
| break | Out of the loop | continue | Jump to the next loop |
| return | Function return | is | Determine the type of the object |
| as | Determines the object type and returns the object | and | Logic and |
| or | Logic or | start | The asynchronous task starts |
| new | An asynchronous task is created but not executed | wait | Pending execution |
| exit | Raise exception | try | Try to execute a block of code |
| catch | Catch exception | finally | A block of code that executes regardless of whether an exception occurs |

## Program structure
Key structural concepts include `assembly`, `namespace`, `definition`, and `member`, and the declaration indentation of the same concepts must be the same except for the assembly. The declaration in the definition are members, including constructors, member functions, destructors and fields, the definition declaration in the namespace, the namespace can have multiple subnamespaces, subnamespaces indent the same as the definition. All namespace definitions are packaged into the assembly at compile time.

Here is sample code that includes these structures:
``` java
native Print(string)

namespace Earth
    class Preson
        public integer age
        public Preson(integer age)
            this.age = age
        public SayHello()
            Print("yelling")
    
    class Chinese Preson
        public Chinese() base(30)
        public SayHello()
            Print("你好")
    
    class Foreigner Preson
        public Foreigner() base(10)
        public SayHello()
            Print("Hello")
```

## basic grammar

### annotation
Everything after a double slash is a comment, and currently only single-line comments are supported.
``` java
//Comment content
```

### access modifier
* `public`:Definitions declared with this modifier can be accessed anywhere
* `internal`:The definition of this modifier declaration can be used anywhere in the current assembly
* `space`:The definition of this modifier declaration can be used anywhere in the current namespace and subnamespace
* `protected`:If used in a member of struct or class, it means that the definition declared by this modifier can only be used in that type and subclass; otherwise, it means that it can only be used in the current file
* `private`:If used in a member of a struct or class, the definition declared by this modifier can be used only in the current type; otherwise, it can be used only in the current namespace or subnamespace of the current file

### operator
Supports almost all basic operations:&、&&、&=、|、||、|=、^、^=、<、<=、<<、<<=、>、>=、>>、>>=、+、++、+=、-、--、-=、\*、\*=、/、/=、%、%=、!、!=。It should be noted that the priority of bit operations is adjusted to be higher than logical and comparison operators, and parentheses are no longer needed to control the order of operations when bit operations are used with these operators.
Where && and || can be replaced by 'and' and 'or'.

#### Other supported operators:
##### conditional operator `'?:'`
``` java
Func(condition ? exp1 : exp2)      //If the condition is true, exp1 is executed; otherwise, exp2 is executed. The return value of the expression must be of the same type
condition ? Func1() : Func2()       //The return value of the expression can be discarded, and the return value of the expression must be of the same type
condition ? Func()                  //The second expression can be omitted, and if the expression is false, a tuple of the default values from the list of types returned by the first expression is returned
```
##### Null propagation operator `'?.'`、`'?->'`、`'?()'`和`'?[]'`
Returns a tuple of the default value of the tuple type list when the null propagation judgment is null before
``` java
delegate handle[] TestDelegate()
class C
    public TestDelegate Func()
        return null

Main()
    C c = null
    var h = c?.Func()?()?[123]
```
##### Null merge operator `'??'`
``` java
Main()
    var h = null
    var h2 = h ?? handle[1]
```

### operator overloading

All base operators support overloading, and custom operators override the default operators. Overloaded operator rules, like functions, are called only when they are accessible.
``` java
public string *(string s, integer c)
    var result = ""
    while c-- > 0
        result += s
    return result

public integer +(integer[] values)
    var result = 0
    for var i, var length = 0, values.GetLength(); i < length; i++
        result += values[i]
    return result

public string *(integer a, integer b)
    return "Mul(" + a + ", " + b +")"

Main()
    Print("Abc" * 3)                //output  AbcAbcAbc
    var arr = integer{2, 3, 4, 5}
    Print((+arr).ToString())        //output 14
    Print(3 * 4)                    //output "Mul(3, 4)"
```

### tuple
A tuple is a set of data by commas`,` or semicolons`;` The difference between comma and semicolon is that the priority of the combination is different, `;`takes precedence over lambda expression symbols (`=>`), conditional operators (`? :`), the assignment operator (` = `) is low, and in many cases the extra parentheses can be omitted. Tuples can also be regrouped into new tuples by indexing.
``` java
Func(integer a, integer b)
    Print(a + ", " + b)
Func(integer a, integer b, integer c)
    Print(a + ", " + b + ", " + c)

integer, bool, string GetTuple()
    return 1, true, "abc"

SetTuple(bool, integer, string)

Main()
    var a = 1
    var b = 2
    Func(a; b = 3; 4)   //output 1, 3, 4
    Func(a, b)          //output 1, 3
    Func(a, b = 3, 4)   //output 3, 4
    Func(a, b)          //output 3, 4

    SetTuple(GetTuple()[1, 0, 2])   //Reassembles the tuple returned by GetTuple into a new tuple and calls SetTuple as an argument
```

### loop
- while：If the expression is omitted, the loop is kept by default
- for：Loop expression with semicolon `;` The first is the initialization expression, the second is the loop condition, the third and all subsequent expressions will be executed after the loop is finished before the judgment condition is executed, and the third and subsequent expressions can be omitted
- elseif and else can be used in combination with loops, executed when the loop condition is false, and not if the loop is broken
- break and continue can be followed by an expression with a return value of type bool. This takes effect only when the expression is true. If the expression is omitted, it defaults to true
``` js
for var a, var b = 1, 2; a < 10 && b < 10; a += b, b++
    b -= a
    break b < 0
else
    Print("Exec else expression")
```

### vector computation
The built-in vector types are 'real2', 'real3' and 'real4'. The member fields of these vectors can be arbitrarily combined into new vector fields
``` java
Main()
    var v1 = real3(1, 2, 3)
    var v2 = v1.xyyz + v1.xxzz  //v2 is of type real4 and has values of (2, 3, 5, 6).
    var v3 = v2.wy              //v3 is of type real2 and has values of (6, 3).
```

### enumeration
An enumeration type defines a set of integer constants and can omit an assignment; if an assignment is omitted, the value of the enumeration is incremented from 0 or from the first enumerated value with a value.
``` kotlin
enum Sex
    Man
    Woman
    WalmartBag = 114514
    Gunship             //Its value is 114515

enum Season
    Spring = 1
    Summer = 2
    Autumn = 4
    Winter = 8
    All = Season.Spring | Season.Summer | Season.Autumn | Season.Winter

```

### struct
A struct type is an object stored on a stack that cannot declare a base class or inherit an interface, nor can it derive other types.
It has two default constructors, one that takes no arguments and one that contains all fields. The struct cannot declare custom constructors.
The struct also has no destructor, which can contain custom fields and member functions.
#### field
Struct fields can only be public and no access modifiers can be added. Struct member fields can be accessed by field names.
It can also be accessed through a deconstructed index, where access to struct fields is referentially collapsed at compile time, achieving the same access speed as local variables regardless of how many layers are nested.
#### member function
Struct member functions can customize access modifiers. Note that each call to a struct member function actually makes a copy of the struct.
In other words, this in a member function does not refer to the caller's object, only to its copy.
All member fields in a struct member function are read-only because there is no meaning in assigning a value to a member field.
``` cs

struct S
    integer i
    public Set(integer i)
        this.i = i
        Print("this.i = " + this.i)

Main()
    var s = S(1)
    s.Set(2)
    Print("s.i = " + s.i)
```
The preceding code reports a compilation error for ERROR_EXPRESSION_UNASSIGNABLE.


#### Construction and deconstruction
A structure can be deconstructed by adding square brackets, and the deconstructed tuple is composed of each of its fields
``` cs
struct S1
    bool b
    integer i
    string s

struct S2
    string s
    integer i1
    integer i2

Main()
    var s1 = S1(false, 123, "abc")
    var s2 = S2(s1[2, 1, 1])            //The contents of s2 are s:"abc" i1:123 i2:123
```

### Managed type
A managed type is an object assigned on the managed heap that can inherit a base class and multiple interfaces or serve as a base class for other managed types. If no constructor is declared, the compiler automatically generates a default constructor with no arguments. Managed objects can customize constructors, member fields, member functions, and destructors, and members other than destructors can customize access modifiers.
``` java
class C
    public string field
    public C(string value)
        Print("constructor")
        field = value
    public MemberFunc()
        Print("Member function")
    ~
        Print("destructor")
```
#### Inheritance and override
All member functions of a managed type are virtual functions and can be overridden, as long as the function can be accessed by subclasses and the function name, parameter list, and return value list are the same as override. If the parameter list is different, it is only overridden. If only the return value list is inconsistent, an error will be reported.
#### Virtual call and real call
Since all member functions of managed types are virtual functions, additional calling methods are required for some functions that do not want to be overridden, so it distinguishes between real calls and virtual calls, all calls with the `.` operator are virtual calls, and if the function is overridden, it will be called to the function of the subclass. If called with the `->` operator, it is a real call, and the called function is determined at compile time, even if the subclass has override, it will not be affected, so the real call efficiency will be slightly higher than the virtual call.
``` java
class Base
    public Func()
        Print("Base Func")
class Child Base
    public Func()
        Print("Child Func")

Main()
    Base b = Child()
    b.Func()            //output "Base Func"
    b->Func()           //output "Child Func"
```
#### Type conversion
There are three types of type conversion, namely coerced type conversion, is, and as.
``` java
class A
class B A
    public Func()
Main()
    A a = B()
    B b1 = a as B
    if a is B b2        //If only the type is determined, b2 can be omitted
        b2.Func()
    B b3 = B& a
```

### interface
An interface is a collection of functions whose member functions are public and cannot be modified with access modifiers. After the managed type inherits the interface, it must implement all the functions of the interface, otherwise the compilation will not pass. An interface can inherit multiple interfaces, but it cannot inherit managed types. Objects cannot be created through an interface.
``` java
interface Person
    integer Age()
    real Weight()
    Speed(string, real volume)
```

### Delegates and lambda expressions
A delegate is equivalent to a declaration of the type of a function, which can be used to declare variables that point to a class of functions. lambda expressions are used to create simple anonymous functions.
``` js
delegate bool Comparison(C, C)

class C
    public integer i
    public integer value
    public C(integer i, integer value)
        this.i = i
        this.value = value

BubbleSort(C[] cs, Comparison c)
    var length = cs.Getlength()
    for var x = 0; x < length - 1; x++
        for var y = x + 1; y < length; y++
            if c(cs[y], cs[y -1])
                var tmp = cs[y]
                cs[y] = cs[y - 1]
                cs[y - 1] = tmp

bool CompC(C c1, C c2)
    return c1.value > c2.value
Main()
    var prime = 79
    var cs = C[64]
    for var i, var len = cs.GetLength(); i < len; i++
        cs[i] =  C(i, i * prime % len)
    BubbleSort(cs, CompC)               //Put cs in ascending order of i
    //cs is followed by a semicolon, which takes precedence over lambda expressions,
    //Therefore, it does not affect the parsing of the following lambda expressions
    BubbleSort(cs; a, b => a.i < b.i)   //Put cs in descending order of i
```

### task
A task is an object generated when a function is executed asynchronously, and is used to obtain the execution status and execution results. All tasks inherit from the task class in the kernel namespace. The return value of the asynchronous function can be obtained through square brackets when the task is completed.
#### define task：
``` java
namespace kernel
    public enum TaskState
        Unstart     //Not start execution
        Running     //In execution
        Completed   //completed
        Exceptional //Aborted due to throw exception
        Aborted     //Terminates because task.Abort is called
        Invalid     //Task failed

    public class task
        //Starts executing asynchronous functions, automatically calling Start(true, false) if the task is created with Start
        //If the current task is not running, an exception is thrown
        public Start(bool immediately, bool ignoreWait)
        //Terminating asynchronous function
        public Abort()
        //Gets the current status of the task
        public TaskState GetState()
        //Obtain termination information when a task is terminated abnormally
        public string GetExitCode()
        //The task is in a suspended state, and being true does not affect the return value of GetState being Running
        public bool IsPause()
        //Suspend task
        public Pause()
        //Recovery task
        public Resume()
```
#### Create and execute tasks
``` java
task string, integer TestTask

string, integer Func(string s, integer i)
    var result = 0
    while i-- > 0
        result += i
        Print(s + i)
        wait
    return result 

Main()
    TestTask t1 = start Func("s:", 3)
    TestTask t2 = new Func("n:", 4)
    t2.Start(false, false)
    //wait The following task waits until the task is not in the running state
    wait t1
    var s, var r = t1[]
    Print("result " + s + r)
    wait t2
    s, r = t2[]
    Print("result " + s + r)
```
The above code will output:
```
s:2
s:1
n:3
s:0
n:2
result s:3
n:1
n:0
result n:6
```

### String interpolation
The interpolated string is identified by the '$' special character and contains the expression inside the brace' {} ', using two consecutive braces inside the interpolated string to represent a brace character. Using string interpolation can improve the readability and maintainability of your code.
``` cs
Main()
    var v = real3(1, 2, 3)
    Print($"{{v.x = {v.x}, v.y + v.z = {v.y + v.z}}}")
```
The above code will output:
```
{v.x= 1， v.y + v.z = 5}
```

### reflection
Related features are reflected in the kernel. The Reflection namespace, by the kernel.System.GetAssembles() for all assemblies in the virtual machine, thereby walker set all definition, can also be defined attributes.
#### Attribute declaration
If the attribute is not later defined, the attribute is appended to the current namespace
``` cpp
["This attribute is attached to Space1"]
namespace Space1
    
    ["This property is appended to GlobalValue1", "This allows multiple attributes to be attached at the same time"]
    ["This has the same effect as a comma separation within the same square bracket"]
    integer GloablValue1

    ["This attribute is also attached to Space1"]

["This attribute is appended to GlobalValue2"]
integer GlobalValue2

["This attribute is appended to Func"]
Func()

["This property is appended to the current assembly"]
```
#### Direct fetch type
`<>` are used to get the type directly, and this type information is generated at compile time, with no overhead of looking up type information at run time
``` java
class TestC

Main()
    var intType = <integer>
    Print(<TestC>.GetName())
```

### exception handling
The exception handling feature helps to handle any unexpected or abnormal conditions that occur during the running of the program. Exception handling features use the try, catch, and finally keywords to try to perform operations that might fail, handle failures if you're sure it's reasonable, and clean up resources afterwards. Exceptions are created using exit. Exceptions used by virtual machines are defined in the kernel.System.Exceptions namespace.
``` java
import kernel.System.Exceptions
Func()
    exit "Func Exception!!"
    Print("Func End")
Main()
    var a = 1
    var b = 0
    try
        a /= b
    catch DivideByZero
        Print("catch Div by zero")
    finally
        Print("exec finally")

    try
        Func()
    catch string e
        Print("catch " + e)
```
The above code will output:
```
catch Div by zero
exec finally
catch Func Exception!!
```


## other
* [The definition in the kernel namespace](./RainLanguage/kernel.rain)
* [vscode plugin for RainLanguage](./RainLanguagePlugin/readme.md)