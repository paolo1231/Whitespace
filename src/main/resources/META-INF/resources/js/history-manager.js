class HistoryManager {
    constructor() {
        this.storageKey = 'whitespace-history';
        this.maxHistoryItems = 20;
    }

    saveReview(code, language, model, result) {
        const history = this.getHistory();

        const entry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            code,
            language,
            model,
            result,
            preview: this.generatePreview(code)
        };

        history.unshift(entry);

        // Keep only the most recent items
        if (history.length > this.maxHistoryItems) {
            history.splice(this.maxHistoryItems);
        }

        this.saveHistory(history);
        this.updateHistoryUI();
    }

    getHistory() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load history:', e);
            return [];
        }
    }

    saveHistory(history) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(history));
        } catch (e) {
            console.error('Failed to save history:', e);
            // If storage is full, remove oldest items and try again
            if (e.name === 'QuotaExceededError') {
                history.splice(0, Math.floor(history.length / 2));
                this.saveHistory(history);
            }
        }
    }

    deleteEntry(id) {
        const history = this.getHistory().filter(entry => entry.id !== id);
        this.saveHistory(history);
        this.updateHistoryUI();
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all history?')) {
            localStorage.removeItem(this.storageKey);
            this.updateHistoryUI();
        }
    }

    restoreEntry(id) {
        const entry = this.getHistory().find(e => e.id === id);
        if (!entry) return;

        // Restore code and settings
        const codeInput = document.getElementById('codeInput');
        const languageSelect = document.getElementById('languageSelect');
        const modelSelect = document.getElementById('modelSelect');
        if (codeInput) codeInput.value = entry.code;
        if (languageSelect) languageSelect.value = entry.language;
        if (modelSelect) modelSelect.value = entry.model;

        // Display the saved result
        if (typeof OutputFormatter !== 'undefined' && OutputFormatter.displayResults) {
            OutputFormatter.displayResults(entry.result);
        }

        // Close history panel
        this.toggleHistoryPanel();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    generatePreview(code) {
        const firstLine = code.split('\n')[0]?.trim() || '';
        return firstLine.length > 50 ? `${firstLine.substring(0, 50)}...` : firstLine;
    }

    formatTimestamp(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    }

    toggleHistoryPanel() {
        const panel = document.getElementById('historyPanel');
        if (!panel) return;

        panel.classList.toggle('open');
        if (panel.classList.contains('open')) {
            this.updateHistoryUI();
        }
    }

    updateHistoryUI() {
        const history = this.getHistory();
        const container = document.getElementById('historyList');
        const emptyState = document.getElementById('historyEmpty');
        const clearBtn = document.getElementById('clearHistoryBtn');

        if (!container || !emptyState || !clearBtn) return;

        if (history.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'block';
            clearBtn.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        clearBtn.style.display = 'block';

        container.innerHTML = history.map(entry => `
            <div class="history-item" data-id="${entry.id}">
                <div class="history-item-header">
                    <span class="history-language">${entry.language}</span>
                    <span class="history-model">${this.getModelIcon(entry.model)}</span>
                    <span class="history-time">${this.formatTimestamp(entry.timestamp)}</span>
                </div>
                <div class="history-preview">${this.escapeHtml(entry.preview)}</div>
                <div class="history-actions">
                    <button class="history-btn restore-btn" onclick="historyManager.restoreEntry(${entry.id})">
                        📂 Restore
                    </button>
                    <button class="history-btn delete-btn" onclick="historyManager.deleteEntry(${entry.id})">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    getModelIcon(model) {
        const icons = {
            'grok-code-fast-1': '🚀',
            'gpt-4o-mini': '⚡',
            'gpt-3.5-turbo': '💰',
            'gpt-4.1-nano': '🤖'
        };
        return icons[model] || '🤖';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    initializeUI() {
        // Create history panel HTML
        const panel = document.createElement('div');
        panel.id = 'historyPanel';
        panel.className = 'history-panel';
        panel.innerHTML = `
            <div class="history-header">
                <h3>📚 Review History</h3>
                <button class="history-close" onclick="historyManager.toggleHistoryPanel()">×</button>
            </div>
            <div class="history-content">
                <div id="historyEmpty" class="history-empty">
                    <p>No reviews yet</p>
                    <p class="history-empty-hint">Your code reviews will appear here</p>
                </div>
                <div id="historyList" class="history-list"></div>
            </div>
            <div class="history-footer">
                <button id="clearHistoryBtn" class="btn btn-secondary" onclick="historyManager.clearHistory()">
                    Clear All
                </button>
            </div>
        `;
        document.body.appendChild(panel);

        // Create history toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'historyToggleBtn';
        toggleBtn.className = 'history-toggle-btn';
        toggleBtn.innerHTML = '📚';
        toggleBtn.title = 'View History';
        toggleBtn.onclick = () => this.toggleHistoryPanel();
        document.body.appendChild(toggleBtn);

        // Update badge count
        this.updateBadge();
    }

    updateBadge() {
        const count = this.getHistory().length;
        const btn = document.getElementById('historyToggleBtn');
        if (!btn) return;

        let badge = btn.querySelector('.history-badge');
        if (count > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'history-badge';
                btn.appendChild(badge);
            }
            badge.textContent = count > 99 ? '99+' : count;
        } else if (badge) {
            badge.remove();
        }
    }
}

// Initialize global instance
const historyManager = new HistoryManager();