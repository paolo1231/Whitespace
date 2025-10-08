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

        // Initialize history manager
        historyManager.initializeUI();

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
            
            // Save to history
            historyManager.saveReview(code, language, model, result);
            historyManager.updateBadge();
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

// Tiger Style Info Modal
function showTigerStyleInfo() {
    const modal = document.createElement('div');
    modal.className = 'tiger-style-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🐅 Tiger Style Programming</h3>
                <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Tiger Style</strong> is a programming philosophy from TigerBeetle that emphasizes:</p>
                <ul>
                    <li><strong>Negative Space Programming</strong> - The code you don't write is just as important</li>
                    <li><strong>Simplicity Over Cleverness</strong> - Prefer simple, obvious solutions</li>
                    <li><strong>Readability First</strong> - Code should be immediately understandable</li>
                    <li><strong>Remove Rather Than Add</strong> - Always look for what can be eliminated</li>
                    <li><strong>Fail Fast and Loud</strong> - Make errors obvious and immediate</li>
                    <li><strong>Zero Tolerance for Complexity</strong> - Fight complexity at every level</li>
                </ul>
                <p>Like a tiger's stripes, the spaces and structure matter as much as the code itself.</p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                    <a href="https://github.com/tigerbeetle/tigerbeetle/blob/main/docs/TIGER_STYLE.md" 
                       target="_blank" style="color: #f59e0b; text-decoration: none; font-weight: 500;">
                        📖 Read the full Tiger Style guide →
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    document.body.appendChild(modal);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhitespaceApp();
});