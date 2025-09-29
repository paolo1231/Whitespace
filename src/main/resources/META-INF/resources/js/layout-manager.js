// Layout Management Module

class LayoutManager {
    constructor() {
        this.currentLayout = 'two-column';
        this.setupLayoutControls();
        this.detectOptimalLayout();
    }

    setupLayoutControls() {
        // Add layout controls to the header
        this.addLayoutControls();
        this.setupEventListeners();
    }

    addLayoutControls() {
        const header = document.querySelector('.header');
        if (header) {
            const controlsHTML = `
                <div class="layout-controls" style="margin-top: 1rem;">
                    <div class="layout-toggle-group">
                        <button class="layout-toggle active" data-layout="two-column">
                            📱 Side by Side
                        </button>
                        <button class="layout-toggle" data-layout="single-column">
                            📄 Single Column
                        </button>
                        <button class="layout-toggle" data-layout="focus-mode">
                            🎯 Focus Mode
                        </button>
                    </div>
                </div>
            `;
            header.insertAdjacentHTML('beforeend', controlsHTML);
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('layout-toggle')) {
                const layout = e.target.dataset.layout;
                this.switchLayout(layout);
            }
        });

        // Auto-switch on window resize
        window.addEventListener('resize', () => {
            this.detectOptimalLayout();
        });
    }

    switchLayout(layout) {
        const mainContent = document.querySelector('.main-content');
        const beforeAfterContent = document.querySelector('.before-after-content');
        
        if (!mainContent) return;

        // Remove existing layout classes
        mainContent.classList.remove('two-column', 'single-column', 'focus-mode');
        
        // Add new layout class
        mainContent.classList.add(layout);
        
        // Update before/after comparison layout
        if (beforeAfterContent) {
            beforeAfterContent.classList.remove('side-by-side', 'stacked');
            
            if (layout === 'single-column' || window.innerWidth < 768) {
                beforeAfterContent.classList.add('stacked');
            } else {
                beforeAfterContent.classList.add('side-by-side');
            }
        }

        // Update active toggle
        document.querySelectorAll('.layout-toggle').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-layout="${layout}"]`)?.classList.add('active');

        this.currentLayout = layout;
        
        // Store preference
        localStorage.setItem('whitespace-layout', layout);
    }

    detectOptimalLayout() {
        const width = window.innerWidth;
        
        // Auto-switch based on screen size
        if (width < 768) {
            this.switchLayout('single-column');
        } else if (width < 1200 && this.currentLayout === 'focus-mode') {
            this.switchLayout('two-column');
        }
    }

    loadSavedLayout() {
        const saved = localStorage.getItem('whitespace-layout');
        if (saved && ['two-column', 'single-column', 'focus-mode'].includes(saved)) {
            this.switchLayout(saved);
        }
    }

    // Enhanced before/after comparison with layout awareness
    static enhanceBeforeAfterComparison() {
        const container = document.getElementById('beforeAfterContainer');
        if (!container) return;

        // Add comparison layout controls
        const header = container.querySelector('.before-after-header');
        if (header && !header.querySelector('.comparison-controls')) {
            const controlsHTML = `
                <div class="comparison-controls">
                    <button class="btn btn-small" id="toggleComparisonLayout">
                        📱 Toggle Layout
                    </button>
                </div>
            `;
            
            const actions = header.querySelector('.before-after-actions');
            if (actions) {
                actions.insertAdjacentHTML('afterbegin', controlsHTML);
            }
        }

        // Setup toggle functionality
        const toggleBtn = document.getElementById('toggleComparisonLayout');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const content = document.querySelector('.before-after-content');
                if (content) {
                    if (content.classList.contains('side-by-side')) {
                        content.classList.remove('side-by-side');
                        content.classList.add('stacked');
                        toggleBtn.textContent = '📱 Side by Side';
                    } else {
                        content.classList.remove('stacked');
                        content.classList.add('side-by-side');
                        toggleBtn.textContent = '📄 Stack';
                    }
                }
            });
        }
    }
}

// Status indicator helper
class StatusIndicator {
    static show(element, status, message) {
        const indicator = element.querySelector('.status-indicator') || 
                         this.create(element);
        
        indicator.className = `status-indicator ${status}`;
        indicator.textContent = message;
    }

    static create(element) {
        const indicator = document.createElement('div');
        indicator.className = 'status-indicator';
        element.appendChild(indicator);
        return indicator;
    }

    static hide(element) {
        const indicator = element.querySelector('.status-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
}

window.LayoutManager = LayoutManager;
window.StatusIndicator = StatusIndicator;