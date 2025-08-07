// Utility Functions
const Utils = {
    // Show message to user
    showMessage: function(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        
        const sidebarContent = document.querySelector('.sidebar-content');
        sidebarContent.insertBefore(messageEl, sidebarContent.firstChild);
        
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 3000);
    },

    // Format currency
    formatCurrency: function(amount) {
        return '৳' + amount.toLocaleString();
    },

    // Generate unique ID
    generateId: function() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    },

    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Parse YouTube URL and get video ID
    getYouTubeVideoId: function(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    },

    // Validate YouTube URL
    isValidYouTubeUrl: function(url) {
        return this.getYouTubeVideoId(url) !== null;
    },

    // Create YouTube embed URL
    createYouTubeEmbedUrl: function(videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    },

    // Safe JSON parse
    safeJsonParse: function(str, defaultValue = null) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return defaultValue;
        }
    },

    // Get element data attribute
    getDataAttribute: function(element, attribute) {
        return element.getAttribute(`data-${attribute}`);
    },

    // Set element data attribute
    setDataAttribute: function(element, attribute, value) {
        element.setAttribute(`data-${attribute}`, value);
    },

    // Find closest parent with class
    findParentWithClass: function(element, className) {
        while (element && !element.classList.contains(className)) {
            element = element.parentElement;
        }
        return element;
    },

    // Wait for element to exist
    waitForElement: function(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver(() => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    },

    // Copy to clipboard
    copyToClipboard: function(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        }
    },

    // Download file
    downloadFile: function(content, filename, contentType = 'text/html') {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Validate email
    isValidEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Validate phone number (Bangladesh)
    isValidPhone: function(phone) {
        const regex = /^(\+88)?01[3-9]\d{8}$/;
        return regex.test(phone.replace(/\s/g, ''));
    },

    // Get current timestamp
    getTimestamp: function() {
        return Date.now();
    },

    // Format date
    formatDate: function(date, format = 'DD/MM/YYYY') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        return format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year);
    },

    // Local storage helpers
    storage: {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage set error:', e);
                return false;
            }
        },

        get: function(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Storage get error:', e);
                return defaultValue;
            }
        },

        remove: function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Storage remove error:', e);
                return false;
            }
        },

        clear: function() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Storage clear error:', e);
                return false;
            }
        }
    },

    // Animation helpers
    animate: {
        fadeIn: function(element, duration = 300) {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            let start = null;
            const fade = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                element.style.opacity = Math.min(progress / duration, 1);
                
                if (progress < duration) {
                    requestAnimationFrame(fade);
                }
            };
            
            requestAnimationFrame(fade);
        },

        fadeOut: function(element, duration = 300) {
            let start = null;
            const fade = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                element.style.opacity = Math.max(1 - (progress / duration), 0);
                
                if (progress < duration) {
                    requestAnimationFrame(fade);
                } else {
                    element.style.display = 'none';
                }
            };
            
            requestAnimationFrame(fade);
        }
    }
};

// Export for use in other files
window.Utils = Utils;