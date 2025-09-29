// Main Application Module

class WhitespaceApp {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeModules();
        this.setupLanguageExamples();
    }

    initializeElements() {
        this.codeInput = document.getElementById('codeInput');
        this.languageSelect = document.getElementById('languageSelect');
        this.reviewBtn = document.getElementById('reviewBtn');
        this.quickFormatBtn = document.getElementById('quickFormatBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.loading = document.getElementById('loading');
        this.exportBtn = document.getElementById('exportBtn');
        
        window.currentAnalysis = null;
    }

    setupEventListeners() {
        this.reviewBtn.addEventListener('click', () => this.handleReviewCode());
        this.quickFormatBtn.addEventListener('click', () => this.handleQuickFormat());
        this.clearBtn.addEventListener('click', () => this.handleClear());
        this.exportBtn.addEventListener('click', () => ExportManager.exportAnalysis());
        
        // Language change handler
        this.languageSelect.addEventListener('change', () => this.updatePlaceholder());
        
        // Keyboard shortcuts
        this.codeInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.reviewBtn.click();
            }
        });
    }

    initializeModules() {
        // Initialize file handler
        this.fileHandler = new FileHandler(this.codeInput, this.languageSelect);
        
        // Initialize code formatter
        this.codeFormatter = new CodeFormatter(this.codeInput);
        window.codeFormatter = this.codeFormatter; // Make available globally
        
        // Initialize layout manager
        this.layoutManager = new LayoutManager();
        this.layoutManager.loadSavedLayout();
    }

    setupLanguageExamples() {
        this.languageExamples = {
            java: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}`,
            python: `def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)`,
            javascript: `function fetchUserData(userId) {
    return fetch(\`/api/users/\${userId}\`)
        .then(response => response.json())
        .catch(error => console.error(error));
}`,
            typescript: `interface User {
    id: number;
    name: string;
    email: string;
}

function getUser(id: number): Promise<User> {
    return fetch(\`/api/users/\${id}\`).then(res => res.json());
}`,
            csharp: `public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}`,
            go: `package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}`,
            rust: `fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}`,
            cpp: `#include <iostream>

class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
};`
        };

        // Set initial placeholder
        this.updatePlaceholder();
    }

    updatePlaceholder() {
        const selectedLanguage = this.languageSelect.value;
        const example = this.languageExamples[selectedLanguage];
        this.codeInput.placeholder = `Paste your ${selectedLanguage.toUpperCase()} code here...\n\nExample:\n${example}`;
    }

    async handleReviewCode() {
        const code = this.codeInput.value.trim();
        const language = this.languageSelect.value;

        if (!code) {
            CodeReviewAPI.showError(`Please enter some ${language.toUpperCase()} code to review.`);
            return;
        }

        this.setLoading(true);

        try {
            const result = await CodeReviewAPI.reviewCode(code, language);
            OutputFormatter.displayResults(result);
        } catch (error) {
            CodeReviewAPI.showError('Error: ' + error.message);
        } finally {
            this.setLoading(false);
        }
    }

    handleQuickFormat() {
        const code = this.codeInput.value.trim();
        const language = this.languageSelect.value;

        if (!code) {
            CodeReviewAPI.showError(`Please enter some ${language.toUpperCase()} code to format.`);
            return;
        }

        // Apply quick fixes immediately
        const formattedCode = CodeFormatter.applyQuickFixes(code, language);
        
        if (formattedCode !== code) {
            this.codeFormatter.showComparison(code, formattedCode);
        } else {
            // Show feedback that no changes were needed
            this.showFormatFeedback('Code is already well-formatted! 👍');
        }
    }

    showFormatFeedback(message) {
        const btn = this.quickFormatBtn;
        const originalText = btn.textContent;
        btn.textContent = message;
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }

    handleClear() {
        this.codeInput.value = '';
        OutputFormatter.clearOutput();
        this.codeFormatter.hideComparison();
    }

    setLoading(isLoading) {
        const loadingText = document.getElementById('loadingText');
        this.reviewBtn.disabled = isLoading;

        if (isLoading) {
            loadingText.textContent = 'Analyzing code... This may take up to 30 seconds.';
        }

        this.loading.style.display = isLoading ? 'flex' : 'none';
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhitespaceApp();
});