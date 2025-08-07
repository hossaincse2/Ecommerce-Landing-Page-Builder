// Main Page Builder Application
class PageBuilder {
    constructor() {
        this.editor = null;
        this.currentDevice = 'desktop';
        this.autoSaveTimer = null;
        this.init();
    }

    // Initialize the page builder
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeEditor();
            this.setupEventListeners();
            this.loadAutoSave();
            this.loadSampleTemplate();
        });
    }

    // Initialize GrapesJS editor
    initializeEditor() {
        this.editor = grapesjs.init({
            container: '#gjs',
            height: '100%',
            width: 'auto',
            storageManager: false,
            showOffsets: true,
            noticeOnUnload: false,
            plugins: ['gjs-preset-webpage'],
            pluginsOpts: {
                'gjs-preset-webpage': {
                    modalImportButton: false,
                    modalImportLabel: '',
                    modalImportContent: '',
                    filestackOpts: false,
                    aviaryOpts: false,
                    codeViewerTheme: 'hopscotch'
                }
            },
            canvas: {
                styles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
                ],
                scripts: [
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js'
                ]
            },
            assetManager: {
                embed: true,
                embedAsBase64: true
            },
            deviceManager: {
                devices: [
                    { name: 'Desktop', width: '' },
                    { name: 'Tablet', width: '768px', widthMedia: '992px' },
                    { name: 'Mobile', width: '375px', widthMedia: '768px' }
                ]
            }
        });

        // Add custom blocks
        if (window.Blocks) {
            window.Blocks.addAllBlocks(this.editor);
        }

        // Setup auto-save
        this.setupAutoSave();
        
        Utils.showMessage('Page Builder initialized successfully!', 'success');
    }

    // Setup event listeners
    setupEventListeners() {
        // Template block click handlers
        document.querySelectorAll('.template-block').forEach(block => {
            block.addEventListener('click', (e) => {
                const blockId = block.dataset.block;
                this.addBlockToCanvas(blockId);
            });
        });

        // Image upload handler
        const imageUpload = document.getElementById('image-upload');
        if (imageUpload) {
            imageUpload.addEventListener('change', this.handleImageUpload.bind(this));
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));

        // Tab switching
        document.querySelectorAll('.sidebar-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Device switching
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const device = btn.dataset.device;
                this.setDevice(device);
            });
        });
    }

    // Add block to canvas
    addBlockToCanvas(blockId) {
        if (!this.editor) {
            Utils.showMessage('Editor not initialized', 'error');
            return;
        }

        const blockManager = this.editor.BlockManager;
        const block = blockManager.get(blockId);
        
        if (block) {
            this.editor.DomComponents.addComponent(block.get('content'));
            Utils.showMessage('Component added successfully!', 'success');
            
            // Initialize component interactions after adding
            setTimeout(() => {
                if (window.Components) {
                    window.Components.initializeAll();
                }
            }, 100);
        } else {
            Utils.showMessage('Component not found: ' + blockId, 'error');
        }
    }

    // Setup auto-save functionality
    setupAutoSave() {
        this.editor.on('component:update storage:start storage:end', () => {
            clearTimeout(this.autoSaveTimer);
            this.autoSaveTimer = setTimeout(() => {
                const autoSaveData = {
                    html: this.editor.getHtml(),
                    css: this.editor.getCss(),
                    components: this.editor.getProjectData(),
                    timestamp: Utils.getTimestamp()
                };
                Utils.storage.set('pageBuilder_autoSave', autoSaveData);
                console.log('Auto-saved at:', new Date().toLocaleTimeString());
            }, 3000);
        });
    }

    // Tab management
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.sidebar-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetTab = document.getElementById(tabName + '-tab');
        if (targetTab) {
            targetTab.classList.add('active');
        }
    }

    // Device management
    setDevice(device) {
        this.currentDevice = device;
        
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.device === device) {
                btn.classList.add('active');
            }
        });
        
        if (this.editor) {
            this.editor.setDevice(device);
        }
    }

    // Canvas management
    clearCanvas() {
        if (confirm('Are you sure you want to clear the canvas? This will remove all content.')) {
            this.editor.DomComponents.clear();
            this.editor.CssComposer.clear();
            Utils.showMessage('Canvas cleared successfully!', 'success');
        }
    }

    // Export functionality
    exportHTML() {
        if (!this.editor) {
            Utils.showMessage('Editor not initialized', 'error');
            return;
        }

        const html = this.editor.getHtml();
        const css = this.editor.getCss();
        
        const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported eCommerce Page</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        ${css}
    </style>
</head>
<body>
${html}
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
<script>
    ${this.getComponentScripts()}
</script>
</body>
</html>`;

        const filename = 'ecommerce-page-' + Utils.getTimestamp() + '.html';
        Utils.downloadFile(fullHTML, filename);
        Utils.showMessage('Page exported successfully!', 'success');
    }

    // Get component scripts for export
    getComponentScripts() {
        return `
        // Exported component scripts
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize quantity controls
            document.querySelectorAll('.qty-minus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const input = this.nextElementSibling;
                    if (input.value > 1) {
                        input.value = parseInt(input.value) - 1;
                        updateCalculations();
                    }
                });
            });

            document.querySelectorAll('.qty-plus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const input = this.previousElementSibling;
                    if (input.value < 10) {
                        input.value = parseInt(input.value) + 1;
                        updateCalculations();
                    }
                });
            });

            // Gallery interactions
            document.querySelectorAll('.gallery-thumb').forEach(thumb => {
                thumb.addEventListener('click', function() {
                    const mainImg = document.querySelector('.main-image');
                    if (mainImg) {
                        const newSrc = this.src.replace('w=100&h=100', 'w=600&h=400');
                        mainImg.src = newSrc;
                        
                        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('border-primary'));
                        this.classList.add('border-primary');
                    }
                });
            });

            function updateCalculations() {
                // Add calculation logic here
                console.log('Calculations updated');
            }
        });
        `;
    }

    // Preview functionality
    previewPage() {
        if (!this.editor) {
            Utils.showMessage('Editor not initialized', 'error');
            return;
        }

        const html = this.editor.getHtml();
        const css = this.editor.getCss();
        
        const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview - eCommerce Page</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        ${css}
    </style>
</head>
<body>
${html}
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
<script>${this.getComponentScripts()}</script>
</body>
</html>`;

        const newWindow = window.open('', '_blank');
        newWindow.document.write(fullHTML);
        newWindow.document.close();
    }

    // Handle image upload
    handleImageUpload(event) {
        const files = event.target.files;
        const assetGrid = document.getElementById('asset-manager');
        
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Add to GrapesJS asset manager
                    this.editor.AssetManager.add({
                        src: e.target.result,
                        name: file.name,
                        type: 'image'
                    });
                    
                    // Add to our asset grid
                    const assetItem = document.createElement('div');
                    assetItem.className = 'asset-item';
                    assetItem.innerHTML = `<img src="${e.target.result}" alt="${file.name}" onclick="pageBuilder.insertImage('${e.target.result}')">`;
                    assetGrid.appendChild(assetItem);
                };
                reader.readAsDataURL(file);
            }
        });
        
        Utils.showMessage(`${files.length} image(s) uploaded successfully!`, 'success');
    }

    // Insert image into canvas
    insertImage(src) {
        const imageComponent = `<div class="container py-3"><div class="row"><div class="col-12 text-center"><img src="${src}" class="img-fluid rounded" alt="Uploaded Image"></div></div></div>`;
        this.editor.DomComponents.addComponent(imageComponent);
        Utils.showMessage('Image added to canvas!', 'success');
    }

    // Handle keyboard shortcuts
    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 's':
                    e.preventDefault();
                    this.showSaveModal();
                    break;
                case 'e':
                    e.preventDefault();
                    this.exportHTML();
                    break;
                case 'p':
                    e.preventDefault();
                    this.previewPage();
                    break;
            }
        }
    }

    // Modal management
    showSaveModal() {
        document.getElementById('save-modal').classList.add('show');
    }

    showImportModal() {
        document.getElementById('import-modal').classList.add('show');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
    }

    // Load auto-save
    loadAutoSave() {
        const autoSaveData = Utils.storage.get('pageBuilder_autoSave');
        if (autoSaveData && this.editor) {
            setTimeout(() => {
                if (confirm('Found auto-saved data. Do you want to restore it?')) {
                    if (autoSaveData.components) {
                        this.editor.loadProjectData(autoSaveData.components);
                    }
                    Utils.showMessage('Auto-saved data restored!', 'success');
                }
            }, 1000);
        }
    }

    // Load sample template
    loadSampleTemplate() {
        setTimeout(() => {
            if (this.editor && window.Templates) {
                // Only load if canvas is empty
                if (!this.editor.getHtml().trim()) {
                    window.Templates.loadCompleteTemplate(this.editor);
                }
            }
        }, 2000);
    }
}

// Global functions for HTML onclick events
window.switchTab = function(tabName) { pageBuilder.switchTab(tabName); };
window.setDevice = function(device) { pageBuilder.setDevice(device); };
window.clearCanvas = function() { pageBuilder.clearCanvas(); };
window.exportHTML = function() { pageBuilder.exportHTML(); };
window.previewPage = function() { pageBuilder.previewPage(); };
window.showSaveModal = function() { pageBuilder.showSaveModal(); };
window.showImportModal = function() { pageBuilder.showImportModal(); };
window.closeModal = function(modalId) { pageBuilder.closeModal(modalId); };

// Initialize page builder
const pageBuilder = new PageBuilder();
window.pageBuilder = pageBuilder;