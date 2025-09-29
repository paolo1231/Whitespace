# Whitespace

A multi-language developer tool built with Quarkus and LangChain4j that analyzes code in 8+ programming languages and provides:
- Plain English explanations
- Bug and anti-pattern detection
- Language-specific improvement suggestions
- Tiger Style programming recommendations
- **Code formatting and auto-fix capabilities**
- **Before/after code comparison views**
- **Flexible, responsive UI with multiple layout modes**

## Features

### Core Analysis
- **Multi-Language Support**: Analyze code in Java, Python, JavaScript, TypeScript, C#, Go, Rust, and C++
- **Code Explanation**: Understand what any code does in plain English
- **Issue Detection**: Find bugs, anti-patterns, and potential problems
- **Language-Specific Suggestions**: Get recommendations tailored to each language's best practices
- **Tiger Style**: Learn to apply minimalism, negative space programming, and clarity principles

### Code Formatting & Auto-Fix
- **🔧 Quick Format**: Instant formatting fixes (spacing, semicolons, basic syntax)
- **🐅 Tiger Style Formatting**: AI-powered deep code improvements and refactoring
- **Before/After Comparison**: Side-by-side view of original vs improved code
- **One-Click Apply**: Accept improvements with a single click
- **Smart Badges**: Clear indication of improvement type (Quick Format vs Tiger Style)

### User Experience
- **📱 Flexible Layouts**: Three layout modes (Side by Side, Single Column, Focus Mode)
- **📁 File Upload**: Drag & drop or browse files with auto-language detection
- **📄 Export Reports**: Download analysis results as markdown files
- **🎯 Responsive Design**: Adapts to any screen size with persistent layout preferences
- **⌨️ Keyboard Shortcuts**: Ctrl+Enter for quick code review
- **💾 Smart Persistence**: Remembers your layout and language preferences

### Developer Experience
- **Interactive Web Interface**: Professional code editor with syntax highlighting
- **Dynamic Examples**: Language-specific code examples in placeholders
- **Real-time Feedback**: Visual indicators for all operations
- **Modular Architecture**: Clean, maintainable codebase following Tiger Style principles

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- OpenAI API key

### Setup

1. Clone and navigate to the project:
```bash
git clone <repository-url>
cd whitespace
```

2. Set your OpenAI API key:
```bash
export OPENAI_API_KEY=your-api-key-here
```

3. Run the application:
```bash
./mvnw quarkus:dev
```

The application will start on `http://localhost:8080`

### Usage

#### Web Interface

Open your browser and go to `http://localhost:8080` to use the web interface:

##### Basic Code Review
1. **Choose Layout**: Select from Side by Side, Single Column, or Focus Mode
2. **Select Language**: Choose from 8 supported programming languages
3. **Input Code**: 
   - Type/paste directly into the editor
   - Upload files via drag & drop or file browser
   - Use language-specific examples from placeholders
4. **Analyze**: Click "Review Code" or press Ctrl+Enter
5. **Review Results**: View explanations, issues, suggestions, and Tiger Style recommendations
6. **Export**: Download results as markdown reports

##### Code Formatting Features
1. **Quick Format**: Click "🔧 Quick Format" for instant improvements
   - Fixes spacing, semicolons, basic syntax issues
   - Language-specific quick fixes (var→const, tab→spaces, etc.)
   - Shows green "🔧 Quick Format Applied" badge

2. **Tiger Style Formatting**: Use "Review Code" for deep improvements
   - AI-powered refactoring and architectural improvements
   - Applies Tiger Style principles (minimalism, clarity)
   - Shows orange "🐅 Tiger Style Applied" badge

3. **Before/After Comparison**: 
   - Automatic side-by-side comparison when improvements are available
   - Toggle between side-by-side and stacked layouts
   - One-click "Apply Changes" to accept improvements

##### Layout Options
- **📱 Side by Side**: Traditional two-column layout (default)
- **📄 Single Column**: Stacked layout for focus and mobile
- **🎯 Focus Mode**: Larger input area for complex code
- **Auto-Responsive**: Automatically adapts to screen size

#### API Usage

#### Review Code via API

Send a POST request to `/review` with your code and language:

```bash
# Java example
curl -X POST http://localhost:8080/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "public class Example { private String name; public void setName(String name) { this.name = name; } public String getName() { return name; } }",
    "language": "java"
  }'

# Python example
curl -X POST http://localhost:8080/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "def calculate_fibonacci(n):\n    if n <= 1:\n        return n\n    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)",
    "language": "python"
  }'
```

#### Example Response

```json
{
  "explanation": "This is a simple Java class called Example that represents a data container with a single string property called 'name'. It follows the JavaBean pattern with getter and setter methods.",
  "issues": [
    "Use of raw types for ArrayList",
    "Hardcoded sensitive information (adminPassword)",
    "Inefficient string concatenation in processUser method",
    "Potential NullPointerException in email.contains('@')",
    "Magic number usage for age",
    "The processUser method has multiple responsibilities",
    "The isValidEmail method could be static",
    "Unused private method debugMethod()",
    "Use of == and .equals() instead of .isEmpty() for string checks"
  ],
  "suggestions": [
    "Use generics for ArrayList, e.g., ArrayList<String> users",
    "Store sensitive information securely or load from a configuration",
    "Use StringBuilder for efficient string concatenation",
    "Check email for null before calling .contains()",
    "Define a constant for the age threshold",
    "Break down the processUser method into smaller, single-responsibility methods",
    "Make isValidEmail method static since it doesn't use instance variables",
    "Remove unused debugMethod() or implement proper logging",
    "Use .isEmpty() instead of .equals(\"\") for string validation"
  ],
  "tigerStyle": [
    "Replace ArrayList with List<String> and initialize properly",
    "Extract email validation to a separate utility class",
    "Use record classes for simple data containers",
    "Apply single responsibility principle - split processUser method",
    "Remove all unused code (debugMethod)",
    "Use modern Java features like Optional for null safety",
    "Replace magic numbers with named constants",
    "Eliminate string concatenation with proper formatting"
  ],
  "formattedCode": "// Improved version with Tiger Style principles applied\npublic class UserManager {\n    private static final int SENIOR_AGE_THRESHOLD = 65;\n    private final List<String> users = new ArrayList<>();\n    private final String adminPassword;\n    \n    public UserManager(String adminPassword) {\n        this.adminPassword = adminPassword;\n    }\n    \n    public String processUser(String name, String email, int age) {\n        if (name == null || name.isEmpty()) {\n            return \"Invalid name\";\n        }\n        \n        if (isValidEmail(email)) {\n            users.add(name);\n        }\n        \n        return buildUserSummary(name, email, age);\n    }\n    \n    private String buildUserSummary(String name, String email, int age) {\n        StringBuilder result = new StringBuilder();\n        result.append(\"Processing user: \").append(name)\n              .append(\", Email: \").append(email)\n              .append(\", Age: \").append(age);\n              \n        if (age > SENIOR_AGE_THRESHOLD) {\n            result.append(\" (Senior)\");\n        }\n        \n        return result.toString();\n    }\n    \n    public static boolean isValidEmail(String email) {\n        return email != null && email.contains(\"@\") && email.contains(\".\");\n    }\n}"
}
```

#### Health Check

```bash
curl http://localhost:8080/review/health
```

## Supported Languages

Whitespace provides language-specific analysis for:

| Language | Focus Areas |
|----------|-------------|
| **Java** | Modern Java practices (Java 17+), streams, records, performance |
| **Python** | PEP 8 compliance, type hints, Pythonic patterns, list comprehensions |
| **JavaScript** | ES6+ features, async/await, functional programming, modern patterns |
| **TypeScript** | Type safety, interfaces, generics, TypeScript best practices |
| **C#** | Modern C# features, LINQ, async/await, .NET best practices |
| **Go** | Idiomatic Go, error handling, goroutines, simplicity |
| **Rust** | Memory safety, ownership, borrowing, idiomatic patterns |
| **C++** | Modern C++ (C++17+), RAII, smart pointers, memory management |

## Testing

### Sample Files
The `test-samples/` directory contains sample code files for testing:

- **`java-sample.java`**: Java code with common issues (raw types, hardcoded passwords, etc.)
- **`quick-format-examples.md`**: Examples demonstrating Quick Format functionality for all languages

Each sample includes:
- Common anti-patterns and bugs
- Performance issues  
- Security vulnerabilities
- Style violations
- Language-specific problems

### Testing Quick Format
Try these examples to see Quick Format in action:

#### Java Example
```java
public class BadSpacing{
    private int count=0;
    public void increment(){
        count=count+1;
    };
}
```
**Result**: Proper spacing around operators, method signatures, and removed unnecessary semicolons.

#### JavaScript Example  
```javascript
var userName = "John";
function processUser(){
    var result = userName + " processed";
    return result;
}
```
**Result**: Converts `var` to `const`, fixes function spacing.

#### Python Example
```python
def calculate_sum(numbers):
	total = 0  # Tab character here
	for num in numbers:
		total += num
	return total
```
**Result**: Converts tabs to 4 spaces for proper Python indentation.

### Testing Tiger Style Analysis
Use the `java-sample.java` file to see comprehensive Tiger Style improvements:
1. Upload or paste the sample code
2. Click "Review Code" 
3. See detailed analysis with before/after comparison
4. Apply Tiger Style improvements with one click

## Philosophy: Embrace the Whitespace

Whitespace emphasizes Tiger Style principles:

- **Negative Space Programming**: Focus on what NOT to include
- **Minimalism**: Write the least code that solves the problem
- **Clarity**: Self-documenting, immediately understandable code
- **Simplicity**: Prefer simple solutions over clever ones
- **Remove Rather Than Add**: Always look for what can be eliminated

## Architecture

Whitespace follows Tiger Style principles in its architecture:

### Backend (Tiger Style Java)
- **Records**: Immutable data models (`CodeReviewRequest`, `CodeReviewResponse`)
- **Minimal Classes**: Single-responsibility components
- **No Boilerplate**: Leverages modern Java features (records, pattern matching)
- **Clean APIs**: RESTful endpoints with clear contracts

### Frontend (Modular JavaScript)
- **Component-Based**: Separate modules for each concern
- **No Framework Bloat**: Pure JavaScript with focused libraries
- **Responsive Design**: CSS Grid with smart breakpoints
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

### File Structure
```
src/main/resources/META-INF/resources/
├── index.html                 # Clean HTML structure
├── css/
│   ├── styles.css            # Base layout and typography
│   ├── code-editor.css       # Editor-specific styles
│   ├── buttons.css           # Interactive elements
│   ├── output.css            # Results display
│   ├── before-after.css      # Code comparison
│   └── layout-improvements.css # Responsive enhancements
└── js/
    ├── api.js                # API communication
    ├── file-handler.js       # File upload/drag-drop
    ├── code-formatter.js     # Formatting and comparison
    ├── layout-manager.js     # UI layout management
    ├── output-formatter.js   # Results formatting
    ├── export.js             # Report generation
    └── app.js                # Main application
```

## Development

### Running Tests
```bash
./mvnw test
```

### Building for Production
```bash
./mvnw package
java -jar target/quarkus-app/quarkus-run.jar
```

### Native Build
```bash
./mvnw package -Pnative
```

### Docker Build
```bash
docker build -t whitespace .
docker run -p 8080:8080 -e OPENAI_API_KEY=your-key whitespace
```

## Recent Improvements

### v2.0 - Code Formatting & Enhanced UX
- **🔧 Quick Format**: Instant formatting fixes for all supported languages
- **🐅 Tiger Style Formatting**: AI-powered deep code improvements
- **📱 Flexible Layouts**: Three responsive layout modes with persistent preferences
- **📁 File Upload**: Drag & drop support with auto-language detection
- **📄 Export Reports**: Download analysis as markdown files
- **🎯 Before/After Comparison**: Visual diff with one-click apply
- **⚡ Performance**: Optimized timeout handling and error recovery
- **🎨 Enhanced UI**: Professional design with smooth animations

### v1.0 - Core Analysis Engine
- Multi-language code analysis (8 programming languages)
- Tiger Style programming principles integration
- RESTful API with comprehensive error handling
- Interactive web interface with syntax highlighting
- Markdown-formatted output with proper list handling

## Configuration

Key configuration options in `application.properties`:

```properties
# OpenAI Configuration
quarkus.langchain4j.openai.api-key=${OPENAI_API_KEY}
quarkus.langchain4j.openai.chat-model.model-name=${OPENAI_MODEL:gpt-4-turbo-preview}
quarkus.langchain4j.openai.chat-model.temperature=0.3
quarkus.langchain4j.openai.chat-model.max-tokens=2000

# Timeout Configuration (60 seconds for complex code analysis)
quarkus.langchain4j.openai.timeout=60s
quarkus.rest-client."io.quarkiverse.langchain4j.openai.runtime.OpenAiRestApi".connect-timeout=15000
quarkus.rest-client."io.quarkiverse.langchain4j.openai.runtime.OpenAiRestApi".read-timeout=60000

# HTTP Configuration
quarkus.http.port=${PORT:8080}
quarkus.http.host=0.0.0.0
quarkus.http.cors=true
quarkus.http.cors.origins=*
quarkus.http.read-timeout=90s
quarkus.http.idle-timeout=120s
```

## API Reference

### POST /review

Analyzes code in multiple programming languages and returns structured feedback with formatting improvements.

**Request Body:**
```json
{
  "code": "string (required) - Code to analyze",
  "language": "string (optional) - Programming language (java, python, javascript, typescript, csharp, go, rust, cpp). Defaults to 'java'"
}
```

**Response:**
```json
{
  "explanation": "string - Plain English explanation of what the code does",
  "issues": ["array of strings - Each issue as a separate item"],
  "suggestions": ["array of strings - Each suggestion as a separate item"], 
  "tigerStyle": ["array of strings - Each Tiger Style recommendation as a separate item"],
  "formattedCode": "string - Improved version of the code with Tiger Style principles applied"
}
```

**Status Codes:**
- 200: Success
- 400: Invalid request (missing code)
- 500: Internal server error

### GET /review/health

Returns service health status.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License