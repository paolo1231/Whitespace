# Whitespace

A multi-language developer tool built with Quarkus and LangChain4j that analyzes code in 8+ programming languages and provides:
- Plain English explanations
- Bug and anti-pattern detection
- Language-specific improvement suggestions
- Tiger Style programming recommendations

## Features

- **Multi-Language Support**: Analyze code in Java, Python, JavaScript, TypeScript, C#, Go, Rust, and C++
- **Code Explanation**: Understand what any code does in plain English
- **Issue Detection**: Find bugs, anti-patterns, and potential problems
- **Language-Specific Suggestions**: Get recommendations tailored to each language's best practices
- **Tiger Style**: Learn to apply minimalism, negative space programming, and clarity principles
- **Interactive Web Interface**: Language selector dropdown with dynamic examples
- **Markdown Output**: Formatted results with syntax highlighting

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

1. Select your programming language from the dropdown (Java, Python, JavaScript, TypeScript, C#, Go, Rust, C++)
2. Paste your code in the text area (placeholder updates with language-specific examples)
3. Click "Review Code" or press Ctrl+Enter
4. View the formatted analysis results with explanations, issues, suggestions, and Tiger Style recommendations

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
  "issues": "None found - this is clean, basic code",
  "suggestions": "Consider using Java 17 records for immutable data classes: 'public record Example(String name) {}' which eliminates boilerplate",
  "tigerStyle": "This entire class can be replaced with a single line record: 'public record Example(String name) {}'. Remove the explicit constructor, getters, setters, and private field - the record handles all of this automatically with less code and more clarity."
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

The `test-samples/` directory contains sample code files for each supported language with intentional issues for testing the review functionality. Each sample includes:

- Common anti-patterns and bugs
- Performance issues
- Security vulnerabilities
- Style violations
- Language-specific problems

See `test-samples/README.md` for detailed testing instructions.

## Philosophy: Embrace the Whitespace

Whitespace emphasizes Tiger Style principles:

- **Negative Space Programming**: Focus on what NOT to include
- **Minimalism**: Write the least code that solves the problem
- **Clarity**: Self-documenting, immediately understandable code
- **Simplicity**: Prefer simple solutions over clever ones
- **Remove Rather Than Add**: Always look for what can be eliminated

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

## Deployment

Whitespace can be deployed to various platforms. See `DEPLOYMENT.md` for detailed instructions including:

- **Defang.io** (Recommended) - Free tier with generous limits
- **Railway.app** - $5 credits, auto-deployment from GitHub
- **Render.com** - 750 hours/month free tier
- **Heroku** - 550-1000 hours/month free tier
- **Fly.io** - 3 VMs free tier

All platforms support free deployment with just an OpenAI API key.

## Configuration

Key configuration options in `application.properties`:

```properties
# OpenAI Configuration
quarkus.langchain4j.openai.api-key=${OPENAI_API_KEY}
quarkus.langchain4j.openai.chat-model.model-name=gpt-4
quarkus.langchain4j.openai.chat-model.temperature=0.3

# HTTP Configuration
quarkus.http.port=8080
```

## API Reference

### POST /review

Analyzes code in multiple programming languages and returns structured feedback.

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
  "explanation": "string - Plain English explanation",
  "issues": "string - Bugs and problems found",
  "suggestions": "string - Improvement recommendations", 
  "tigerStyle": "string - Tiger Style simplification opportunities"
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