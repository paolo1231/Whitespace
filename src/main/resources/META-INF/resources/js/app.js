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
        this.modelSelect = document.getElementById('modelSelect');
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

        // Model change handler
        this.modelSelect.addEventListener('change', () => this.updateModelInfo());

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

        // Load saved model preference
        this.loadSavedModel();
    }

    setupLanguageExamples() {
        this.updatePlaceholder();
    }

    updatePlaceholder() {
        const language = this.languageSelect.value;
        this.codeInput.placeholder = `Paste your ${language.toUpperCase()} code here...`;
    }

    updateModelInfo() {
        localStorage.setItem('whitespace-model', this.modelSelect.value);
    }



    loadSavedModel() {
        const saved = localStorage.getItem('whitespace-model');
        if (saved && this.modelSelect.querySelector(`option[value="${saved}"]`)) {
            this.modelSelect.value = saved;
            this.updateModelInfo();
        }
    }

    async handleReviewCode() {
        const code = this.codeInput.value.trim();
        const language = this.languageSelect.value;
        const model = this.modelSelect.value;

        if (!code) {
            CodeReviewAPI.showError(`Please enter some ${language.toUpperCase()} code to review.`);
            return;
        }

        this.setLoading(true);

        try {
            const result = await CodeReviewAPI.reviewCode(code, language, model);
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
        this.reviewBtn.disabled = isLoading;
        this.loading.style.display = isLoading ? 'flex' : 'none';
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhitespaceApp();
});