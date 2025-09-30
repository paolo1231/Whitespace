# Whitespace - AI Code Review Tool

AI-powered code review tool that analyzes your code and provides structured feedback using Tiger Style programming principles.

## Features

- **Multi-Language Support**: Java, Python, JavaScript, TypeScript, C#, Go, Rust, C++
- **Multiple AI Models**: GPT-4o Mini, GPT-3.5 Turbo, GPT-5 Nano, GPT-4.1 Nano, Grok Code Fast
- **Tiger Style Analysis**: Focuses on minimalism, clarity, and removing unnecessary complexity
- **Before/After Comparison**: Visual diff showing original vs improved code
- **Quick Format**: Apply immediate formatting fixes
- **Export Reports**: Save analysis results

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- OpenAI API key (and optionally Grok API key)

### Setup
1. Clone and navigate to the project
2. Set environment variables:
   ```bash
   export OPENAI_API_KEY=your_openai_key
   export GROK_API_KEY=your_grok_key  # Optional
   ```
3. Run: `mvn quarkus:dev`
4. Open: `http://localhost:8080`

## Usage

### Web Interface
1. Select programming language
2. Paste your code
3. Choose AI model (GPT-4o Mini recommended for speed/cost)
4. Click "Review Code"
5. Apply suggested improvements

### API
```bash
curl -X POST http://localhost:8080/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "your code here",
    "language": "java",
    "model": "gpt-4o-mini"
  }'
```

**Response:**
```json
{
  "explanation": "What the code does",
  "issues": ["List of issues found"],
  "suggestions": ["Improvement suggestions"],
  "tigerStyle": ["Tiger Style recommendations"],
  "formattedCode": "Improved code"
}
```

## Configuration

### Environment Variables
- `OPENAI_API_KEY`: OpenAI API key (required)
- `GROK_API_KEY`: Grok API key (optional)
- `PORT`: Server port (default: 8080)

### Available Models
- **gpt-4o-mini**: Fast and economical (recommended)
- **gpt-3.5-turbo**: Most cost-effective
- **gpt-5-nano**: Premium quality
- **gpt-4.1-nano**: Premium performance
- **grok-code-fast-1**: Alternative provider

## Tiger Style Principles

- **Negative Space Programming**: Focus on what NOT to include
- **Minimalism**: Write the least code that solves the problem
- **Clarity**: Self-documenting, immediately understandable code
- **Remove Rather Than Add**: Always look for what can be eliminated

## Development

```bash
# Development mode
mvn quarkus:dev

# Run tests
mvn test

# Package
mvn clean package

# Docker
docker build -f src/main/docker/Dockerfile.jvm -t whitespace .
```

## Architecture

- **Backend**: Java/Quarkus with LangChain4j for AI integration
- **Frontend**: Vanilla JavaScript with responsive design
- **API**: RESTful endpoints for code analysis

## License

MIT License