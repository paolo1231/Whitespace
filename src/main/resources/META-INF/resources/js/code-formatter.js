// Code Formatting and Before/After View Module

class CodeFormatter {
    constructor(codeInput) {
        this.codeInput = codeInput;
        this.originalCode = '';
        this.formattedCode = '';
        this.setupBeforeAfterView();
    }

    setupBeforeAfterView() {
        // Create before/after container if it doesn't exist
        if (!document.getElementById('beforeAfterContainer')) {
            this.createBeforeAfterView();
        }
    }

    createBeforeAfterView() {
        const inputSection = document.querySelector('.input-section');
        const beforeAfterHTML = `
            <div id="beforeAfterContainer" class="before-after-container">
                <div class="before-after-header">
                    <span class="before-after-title">🔧 Code Improvements Available</span>
                    <div class="before-after-actions">
                        <button id="applyChangesBtn" class="btn btn-small btn-apply">Apply Changes</button>
                    </div>
                </div>
                <div class="before-after-content">
                    <div class="code-panel">
                        <div class="code-panel-header before">📝 Original Code</div>
                        <div id="originalCodeDisplay" class="code-display before"></div>
                    </div>
                    <div class="code-panel">
                        <div class="code-panel-header after">✨ Improved Code</div>
                        <div id="formattedCodeDisplay" class="code-display after"></div>
                        <div class="improvement-badge">Tiger Style Applied</div>
                    </div>
                </div>
            </div>
        `;

        inputSection.insertAdjacentHTML('beforeend', beforeAfterHTML);
        this.setupBeforeAfterEventListeners();

        // Enhance with layout manager
        LayoutManager.enhanceBeforeAfterComparison();
    }

    setupBeforeAfterEventListeners() {
        const applyBtn = document.getElementById('applyChangesBtn');
        const hideBtn = document.getElementById('hideComparisonBtn');

        applyBtn?.addEventListener('click', () => this.applyFormattedCode());
        hideBtn?.addEventListener('click', () => this.hideComparison());
    }

    showComparison(originalCode, formattedCode, badgeType = 'quick') {
        this.originalCode = originalCode;
        this.formattedCode = formattedCode;

        const container = document.getElementById('beforeAfterContainer');
        const originalDisplay = document.getElementById('originalCodeDisplay');
        const formattedDisplay = document.getElementById('formattedCodeDisplay');
        const badge = document.querySelector('.improvement-badge');

        if (container && originalDisplay && formattedDisplay) {
            originalDisplay.textContent = originalCode;
            formattedDisplay.textContent = formattedCode;

            // Update badge based on source
            if (badge) {
                if (badgeType === 'tiger') {
                    badge.textContent = '🐅 Tiger Style Applied';
                    badge.style.background = '#f59e0b'; // Tiger orange
                } else {
                    badge.textContent = '🔧 Quick Format Applied';
                    badge.style.background = '#10b981'; // Green
                }
            }

            container.classList.add('active');

            // Scroll to comparison
            container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    hideComparison() {
        const container = document.getElementById('beforeAfterContainer');
        if (container) {
            container.classList.remove('active');
        }
    }

    applyFormattedCode() {
        if (this.formattedCode) {
            this.codeInput.value = this.formattedCode;
            this.hideComparison();

            // Show success feedback
            this.showApplyFeedback();
        }
    }

    showApplyFeedback() {
        const applyBtn = document.getElementById('applyChangesBtn');
        if (applyBtn) {
            const originalText = applyBtn.textContent;
            applyBtn.textContent = '✅ Applied!';
            applyBtn.disabled = true;

            setTimeout(() => {
                applyBtn.textContent = originalText;
                applyBtn.disabled = false;
            }, 2000);
        }
    }

    // Quick Tiger Style fixes that can be applied immediately
    static applyQuickFixes(code, language) {
        let improved = code;

        // Universal improvements
        improved = this.removeTrailingWhitespace(improved);
        improved = this.normalizeLineEndings(improved);
        improved = this.removeExcessiveBlankLines(improved);

        // Language-specific quick fixes
        switch (language.toLowerCase()) {
            case 'java':
                improved = this.applyJavaQuickFixes(improved);
                break;
            case 'javascript':
            case 'typescript':
                improved = this.applyJSQuickFixes(improved);
                break;
            case 'python':
                improved = this.applyPythonQuickFixes(improved);
                break;
        }

        return improved;
    }

    static removeTrailingWhitespace(code) {
        return code.split('\n').map(line => line.trimEnd()).join('\n');
    }

    static normalizeLineEndings(code) {
        return code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    }

    static removeExcessiveBlankLines(code) {
        return code.replace(/\n\s*\n\s*\n/g, '\n\n');
    }

    static applyJavaQuickFixes(code) {
        // Remove unnecessary semicolons after braces
        code = code.replace(/};\s*$/gm, '}');

        // Fix spacing around operators (=, +, -, *, /, etc.)
        code = code.replace(/(\w)\s*=\s*(\w)/g, '$1 = $2');
        code = code.replace(/(\w)\s*\+\s*(\w)/g, '$1 + $2');
        code = code.replace(/(\w)\s*-\s*(\w)/g, '$1 - $2');

        // Fix method/class spacing
        code = code.replace(/\)\s*{/g, ') {');
        code = code.replace(/(\w)\s*{/g, '$1 {');

        // Fix if/for/while spacing
        code = code.replace(/\b(if|for|while|switch)\s*\(/g, '$1 (');

        // Fix comma spacing
        code = code.replace(/,\s*(\w)/g, ', $1');

        // Remove spaces before semicolons
        code = code.replace(/\s+;/g, ';');

        return code;
    }

    static applyJSQuickFixes(code) {
        // Convert var to const/let (simple cases)
        code = code.replace(/\bvar\s+(\w+)\s*=\s*([^;]+);/g, 'const $1 = $2;');

        // Fix arrow function spacing
        code = code.replace(/=>\s*{/g, ' => {');
        code = code.replace(/(\w)\s*=>\s*/g, '$1 => ');

        // Fix function spacing
        code = code.replace(/function\s*\(/g, 'function (');
        code = code.replace(/\)\s*{/g, ') {');

        // Fix if/for/while spacing
        code = code.replace(/\b(if|for|while|switch)\s*\(/g, '$1 (');

        // Fix object/array spacing
        code = code.replace(/{\s*(\w)/g, '{ $1');
        code = code.replace(/(\w)\s*}/g, '$1 }');

        // Fix comma spacing
        code = code.replace(/,\s*(\w)/g, ', $1');

        return code;
    }

    static applyPythonQuickFixes(code) {
        // Fix indentation (convert tabs to spaces)
        code = code.replace(/\t/g, '    ');

        // Remove trailing commas in single-item tuples
        code = code.replace(/,\s*\)/g, ')');

        return code;
    }
}

window.CodeFormatter = CodeFormatter;