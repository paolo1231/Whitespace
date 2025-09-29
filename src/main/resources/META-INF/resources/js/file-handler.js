// File Upload and Drag-Drop Module

class FileHandler {
    constructor(codeInput, languageSelect) {
        this.codeInput = codeInput;
        this.languageSelect = languageSelect;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');
        const dropZone = document.getElementById('dropZone');

        // File upload functionality
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        uploadBtn.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('click', () => fileInput.click());

        // Drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.codeInput.addEventListener(eventName, this.preventDefaults);
            dropZone.addEventListener(eventName, this.preventDefaults);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.codeInput.addEventListener(eventName, () => dropZone.classList.add('active'));
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.codeInput.addEventListener(eventName, () => dropZone.classList.remove('active'));
        });

        this.codeInput.addEventListener('drop', (e) => this.handleDrop(e));
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) this.processFile(file);
    }

    handleDrop(e) {
        const file = e.dataTransfer.files[0];
        if (file) this.processFile(file);
    }

    processFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.codeInput.value = e.target.result;
            this.detectLanguageFromFile(file.name);
        };
        reader.readAsText(file);
    }

    detectLanguageFromFile(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const langMap = {
            'java': 'java', 'py': 'python', 'js': 'javascript',
            'ts': 'typescript', 'cs': 'csharp', 'go': 'go',
            'rs': 'rust', 'cpp': 'cpp', 'c': 'cpp', 'h': 'cpp'
        };
        if (langMap[ext]) {
            this.languageSelect.value = langMap[ext];
        }
    }
}

window.FileHandler = FileHandler;