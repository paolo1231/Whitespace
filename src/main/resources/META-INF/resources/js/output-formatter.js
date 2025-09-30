// Output Formatting Module

class OutputFormatter {
    static formatExplanation(content) {
        if (!content) return '';

        // Explanations should be plain text, not numbered lists
        if (Array.isArray(content)) {
            return content.join(' ');
        }

        return content;
    }

    static formatContent(content) {
        if (!content) return '';

        // Handle both string and array formats
        if (Array.isArray(content)) {
            // Check if items already have numbering
            const hasNumbering = content.some(item => /^\d+\.\s+/.test(item.trim()));

            if (hasNumbering) {
                // Items already numbered, just join them
                return content.join('\n\n');
            } else {
                // Add numbering to unnumbered items
                return content.map((item, index) => `${index + 1}. ${item}`).join('\n\n');
            }
        }

        // Handle string content (legacy format)
        return this.formatListContent(content);
    }

    static formatListContent(content) {
        if (!content) return content;

        // Split content into lines and process each line
        let lines = content.split(/\r?\n/);
        let processedLines = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            // Check if line starts with a number followed by a period
            if (/^\d+\.\s+/.test(line)) {
                // Ensure there's a blank line before the first item if it's not already there
                if (i > 0 && processedLines.length > 0 && processedLines[processedLines.length - 1] !== '') {
                    processedLines.push('');
                }
                processedLines.push(line);
                // Add a blank line after each numbered item for proper markdown parsing
                if (i < lines.length - 1 && !/^\d+\.\s+/.test(lines[i + 1].trim())) {
                    processedLines.push('');
                }
            }
            // Check if line starts with a bullet point
            else if (/^[-*]\s+/.test(line)) {
                if (i > 0 && processedLines.length > 0 && processedLines[processedLines.length - 1] !== '') {
                    processedLines.push('');
                }
                processedLines.push(line);
                if (i < lines.length - 1 && !/^[-*]\s+/.test(lines[i + 1].trim())) {
                    processedLines.push('');
                }
            }
            else {
                processedLines.push(line);
            }
        }

        return processedLines.join('\n');
    }

    static displayResults(result) {
        const output = document.getElementById('output');
        const exportBtn = document.getElementById('exportBtn');

        window.currentAnalysis = result;
        exportBtn.style.display = 'block';

        // Show before/after comparison if formatted code is available
        if (result.formattedCode && window.codeFormatter) {
            const originalCode = document.getElementById('codeInput').value;
            if (originalCode.trim() !== result.formattedCode.trim()) {
                window.codeFormatter.showComparison(originalCode, result.formattedCode, 'tiger');
            }
        }

        // Pre-process the content to ensure proper list formatting
        const processedResult = {
            explanation: this.formatExplanation(result.explanation),
            issues: this.formatContent(result.issues),
            suggestions: this.formatContent(result.suggestions),
            tigerStyle: this.formatContent(result.tigerStyle)
        };

        const markdown = `
### 📖 Code Explanation
${processedResult.explanation}

### 🐛 Issues Found
${processedResult.issues}

### 💡 Suggestions
${processedResult.suggestions}

### 🐅 Tiger Style Recommendations
${processedResult.tigerStyle}
        `.trim();

        let html = marked.parse(markdown);

        // Fallback: Convert inline numbered lists to proper HTML if markdown didn't catch them
        // But exclude the Code Explanation section
        html = html.replace(/<h3>🐛 Issues Found<\/h3>([\s\S]*?)(?=<h3>|$)/g, function (match, content) {
            return match.replace(/<p>([^<]*\d+\.\s+[^<]*(?:\d+\.\s+[^<]*)*)<\/p>/g, function (match, content) {
                const items = content.split(/(?=\d+\.\s+)/).filter(item => item.trim());
                if (items.length > 1) {
                    const listItems = items.map(item => {
                        const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
                        return `<li>${cleanItem}</li>`;
                    }).join('');
                    return `<ol>${listItems}</ol>`;
                }
                return match;
            });
        });

        html = html.replace(/<h3>💡 Suggestions<\/h3>([\s\S]*?)(?=<h3>|$)/g, function (match, content) {
            return match.replace(/<p>([^<]*\d+\.\s+[^<]*(?:\d+\.\s+[^<]*)*)<\/p>/g, function (match, content) {
                const items = content.split(/(?=\d+\.\s+)/).filter(item => item.trim());
                if (items.length > 1) {
                    const listItems = items.map(item => {
                        const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
                        return `<li>${cleanItem}</li>`;
                    }).join('');
                    return `<ol>${listItems}</ol>`;
                }
                return match;
            });
        });

        html = html.replace(/<h3>🐅 Tiger Style Recommendations<\/h3>([\s\S]*?)(?=<h3>|$)/g, function (match, content) {
            return match.replace(/<p>([^<]*\d+\.\s+[^<]*(?:\d+\.\s+[^<]*)*)<\/p>/g, function (match, content) {
                const items = content.split(/(?=\d+\.\s+)/).filter(item => item.trim());
                if (items.length > 1) {
                    const listItems = items.map(item => {
                        const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
                        return `<li>${cleanItem}</li>`;
                    }).join('');
                    return `<ol>${listItems}</ol>`;
                }
                return match;
            });
        });

        // Add special styling for Tiger Style section
        const styledHtml = html.replace(
            /<h3>🐅 Tiger Style Recommendations<\/h3>([\s\S]*?)(?=<h3>|$)/,
            '<h3>🐅 Tiger Style Recommendations</h3><div class="tiger-style">$1</div>'
        );

        output.innerHTML = `<div class="output-content">${styledHtml}</div>`;
    }

    static clearOutput() {
        const output = document.getElementById('output');
        const exportBtn = document.getElementById('exportBtn');

        output.innerHTML = '<p style="color: #64748b; text-align: center; margin-top: 2rem;">Enter code and click "Review Code" to see the analysis results here.</p>';
        exportBtn.style.display = 'none';
        window.currentAnalysis = null;
    }
}

window.OutputFormatter = OutputFormatter;