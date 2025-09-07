# Whitespace

A developer tool built with Quarkus and LangChain4j that analyzes Java code and provides:
- Plain English explanations
- Bug and anti-pattern detection
- Modern Java improvement suggestions
- Tiger Style programming recommendations

## Features

- **Code Explanation**: Understand what any Java code does in plain English
- **Issue Detection**: Find bugs, anti-patterns, and potential problems
- **Modern Suggestions**: Get recommendations for Java 17+ best practices
- **Tiger Style**: Learn to apply minimalism, negative space programming, and clarity principles
- **Web Interface**: Simple, clean UI for easy code analysis
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

1. Paste your Java code in the text area
2. Click "Review Code" or press Ctrl+Enter
3. View the formatted analysis results with explanations, issues, suggestions, and Tiger Style recommendations

#### API Usage

#### Review Java Code via API

Send a POST request to `/review` with your Java code:

```bash
curl -X POST http://localhost:8080/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "public class Example { private String name; public void setName(String name) { this.name = name; } public String getName() { return name; } }"
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

Analyzes Java code and returns structured feedback.

**Request Body:**
```json
{
  "code": "string (required) - Java code to analyze"
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