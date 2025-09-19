# Test Samples for Multi-Language Code Review

This directory contains sample code files for testing the multi-language code review functionality. Each file contains intentional issues and anti-patterns that the AI reviewer should identify and provide suggestions for.

## Available Languages

### 1. Java (`java-sample.java`)
**Issues to test:**
- Raw type usage
- Hardcoded passwords
- Inefficient string concatenation
- Null pointer exceptions
- Magic numbers
- Methods that could be static
- Unused methods

### 2. Python (`python-sample.py`)
**Issues to test:**
- Missing type hints
- Non-Pythonic comparisons (`== None` vs `is None`)
- Inefficient string concatenation
- Non-Pythonic loops
- Missing error handling
- Global variables
- Unused imports and variables

### 3. JavaScript (`javascript-sample.js`)
**Issues to test:**
- Using `var` instead of `const`/`let`
- Loose equality comparisons (`==` vs `===`)
- Callback hell
- Missing semicolons
- Global variable pollution
- Inefficient loops
- No parameter validation

### 4. TypeScript (`typescript-sample.ts`)
**Issues to test:**
- Using `any` type
- Missing type annotations
- String concatenation vs template literals
- Missing error handling in async functions
- Improper access modifiers
- Non-specific interfaces

### 5. C# (`csharp-sample.cs`)
**Issues to test:**
- Public fields instead of properties
- Missing access modifiers
- Inefficient string concatenation
- Missing async/await patterns
- No exception handling
- Missing IDisposable implementation

### 6. Go (`go-sample.go`)
**Issues to test:**
- Global variables
- Too many return values
- Missing error handling
- Naked returns
- Functions not following naming conventions
- Missing context usage
- Unused variables

### 7. Rust (`rust-sample.rs`)
**Issues to test:**
- Unsafe global mutable state
- Unnecessary cloning
- Using panic instead of Result
- Inefficient string operations
- Missing error handling
- Unnecessary lifetime parameters

### 8. C++ (`cpp-sample.cpp`)
**Issues to test:**
- Manual memory management
- Missing RAII
- Memory leaks
- C-style casts
- Missing const correctness
- Raw pointers
- Missing virtual destructors

## How to Test

1. Start your Whitespace application
2. Open the web interface
3. Select a programming language from the dropdown
4. Copy and paste the corresponding sample code
5. Click "Review Code" to see the AI analysis

## Expected Results

The AI reviewer should identify:
- **Code Explanation**: What the code does
- **Issues Found**: Security vulnerabilities, bugs, anti-patterns
- **Suggestions**: Modern language practices and improvements
- **Tiger Style Recommendations**: What to remove, simplify, or clarify

## Testing Different Scenarios

Try these variations:
- Test with clean, well-written code to see "None found" responses
- Mix different types of issues in custom code
- Test edge cases like empty code or syntax errors
- Compare suggestions across similar patterns in different languages

## Contributing

When adding new test samples:
1. Include a variety of common issues for that language
2. Add comments explaining what issues should be caught
3. Keep examples realistic and educational
4. Update this README with new issue types