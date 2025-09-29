# Quick Format Examples

## Java Examples

### Example 1: Spacing and Semicolon Issues
**Before (paste this into the editor):**
```java
public class BadSpacing{
    private int count=0;
    
    public void increment(){
        count=count+1;
    };
    
    public int getValue()   {
        return count;
    };
};
```

**After Quick Format:**
```java
public class BadSpacing {
    private int count = 0;
    
    public void increment() {
        count = count + 1;
    }
    
    public int getValue() {
        return count;
    }
}
```

### Example 2: Trailing Whitespace (invisible but fixed)
**Before:**
```java
public class Example {    
    private String name;     
    
    public String getName() {   
        return name;    
    }    
}    
```

**After Quick Format:**
```java
public class Example {
    private String name;
    
    public String getName() {
        return name;
    }
}
```

## JavaScript Examples

### Example 1: var to const conversion
**Before:**
```javascript
var userName = "John";
var userAge = 25;
var isActive = true;

function processUser(){
    var result = userName + " is " + userAge;
    return result;
}
```

**After Quick Format:**
```javascript
const userName = "John";
const userAge = 25;
const isActive = true;

function processUser() {
    const result = userName + " is " + userAge;
    return result;
}
```

### Example 2: Arrow Function Spacing
**Before:**
```javascript
const users = [1, 2, 3];
const doubled = users.map(x=>{return x * 2;});
const filtered = users.filter(x=>{return x > 1;});
```

**After Quick Format:**
```javascript
const users = [1, 2, 3];
const doubled = users.map(x => {return x * 2;});
const filtered = users.filter(x => {return x > 1;});
```

## Python Examples

### Example 1: Tab to Spaces Conversion
**Before:**
```python
def calculate_sum(numbers):
	total = 0
	for num in numbers:
		total += num
	return total

class Calculator:
	def __init__(self):
		self.history = []
```

**After Quick Format:**
```python
def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

class Calculator:
    def __init__(self):
        self.history = []
```

## Universal Fixes (All Languages)

### Example 1: Excessive Blank Lines
**Before:**
```java
public class Example {



    private String name;




    public String getName() {


        return name;



    }
}
```

**After Quick Format:**
```java
public class Example {

    private String name;

    public String getName() {

        return name;

    }
}
```

## How to Test

1. Copy any "Before" example above
2. Paste it into the Whitespace code editor
3. Select the matching language from the dropdown
4. Click the "🔧 Quick Format" button
5. See the before/after comparison appear
6. Click "Apply Changes" to accept the improvements

## Current Limitations

The Quick Format currently handles:
- ✅ Trailing whitespace removal
- ✅ Line ending normalization
- ✅ Excessive blank line reduction
- ✅ Basic Java spacing fixes
- ✅ Simple JavaScript var→const conversion
- ✅ Python tab→space conversion

It does NOT handle (these require AI formatting):
- ❌ Complex refactoring
- ❌ Variable renaming
- ❌ Method extraction
- ❌ Design pattern improvements
- ❌ Tiger Style architectural changes