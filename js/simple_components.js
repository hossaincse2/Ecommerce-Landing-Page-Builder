// SIMPLE WORKING COMPONENTS - Fresh Implementation
console.log('Loading Simple Components...');

// Simple and reliable approach
const SimpleComponents = {
    
    // Initialize everything with a simple approach
    init: function() {
        console.log('SimpleComponents: Starting initialization...');
        
        // Wait a bit for DOM to be ready, then initialize
        setTimeout(() => {
            this.initProductVariants();
            this.initAdvancedCheckout();
            this.initVideoEditing();
            console.log('SimpleComponents: Initialization complete!');
        }, 500);
    },

    // Product Variants - Simple Implementation
    initProductVariants: function() {
        console.log('Initializing Product Variants...');
        
        // Find all variant sections (avoid advanced checkout)
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            // Check if it's a variant section (has package select but no product-item)
            const hasPackageSelect = section.querySelector('select[data-price], .package-select');
            const isNotCheckout = !section.querySelector('.product-item');
            
            if (hasPackageSelect && isNotCheckout) {
                console.log(`Setting up variant section ${index + 1}`);
                this.setupVariantSection(section, index + 1);
            }
        });
    },

    // Setup individual variant section
    setupVariantSection: function(section, sectionNum) {
        const minusBtn = section.querySelector('.qty-minus');
        const plusBtn = section.querySelector('.qty-plus');
        const qtyInput = section.querySelector('.qty-input');
        const packageSelect = section.querySelector('select[data-price], .package-select, select[id*="package"]');
        
        console.log(`Variant Section ${sectionNum}:`, {
            hasMinusBtn: !!minusBtn,
            hasPlusBtn: !!plusBtn,
            hasQtyInput: !!qtyInput,
            hasPackageSelect: !!packageSelect
        });

        if (minusBtn && plusBtn && qtyInput && packageSelect) {
            // Remove old listeners and add new ones
            const newMinus = minusBtn.cloneNode(true);
            const newPlus = plusBtn.cloneNode(true);
            const newQty = qtyInput.cloneNode(true);
            const newSelect = packageSelect.cloneNode(true);

            // Replace elements
            minusBtn.parentNode.replaceChild(newMinus, minusBtn);
            plusBtn.parentNode.replaceChild(newPlus, plusBtn);
            qtyInput.parentNode.replaceChild(newQty, qtyInput);
            packageSelect.parentNode.replaceChild(newSelect, packageSelect);

            // Add event listeners
            newMinus.onclick = () => {
                console.log(`Variant ${sectionNum}: Minus clicked`);
                let qty = parseInt(newQty.value) || 1;
                if (qty > 1) {
                    newQty.value = qty - 1;
                    this.updateVariantTotal(section);
                }
            };

            newPlus.onclick = () => {
                console.log(`Variant ${sectionNum}: Plus clicked`);
                let qty = parseInt(newQty.value) || 1;
                if (qty < 10) {
                    newQty.value = qty + 1;
                    this.updateVariantTotal(section);
                }
            };

            newQty.onchange = () => {
                console.log(`Variant ${sectionNum}: Quantity changed to ${newQty.value}`);
                this.updateVariantTotal(section);
            };

            newSelect.onchange = () => {
                console.log(`Variant ${sectionNum}: Package changed`);
                this.updateVariantTotal(section);
            };

            // Initial calculation
            this.updateVariantTotal(section);
            console.log(`Variant Section ${sectionNum}: Setup complete!`);
        } else {
            console.log(`Variant Section ${sectionNum}: Missing elements`);
        }
    },

    // Update variant total calculation
    updateVariantTotal: function(section) {
        const packageSelect = section.querySelector('select[data-price], .package-select, select[id*="package"]');
        const qtyInput = section.querySelector('.qty-input');
        const totalElement = section.querySelector('.total-price, .alert');

        if (!packageSelect || !qtyInput) {
            console.log('Missing elements for calculation');
            return;
        }

        // Get price
        const selectedOption = packageSelect.options[packageSelect.selectedIndex];
        let price = 0;

        if (selectedOption.hasAttribute('data-price')) {
            price = parseInt(selectedOption.getAttribute('data-price'));
        } else {
            // Extract from text
            const match = selectedOption.textContent.match(/৳?([\d,]+)/);
            if (match) {
                price = parseInt(match[1].replace(',', ''));
            }
        }

        const qty = parseInt(qtyInput.value) || 1;
        const total = price * qty;

        console.log('Variant calculation:', { price, qty, total });

        // Update total display
        if (totalElement) {
            const formattedTotal = `৳${total.toLocaleString()}`;
            
            if (totalElement.classList.contains('alert')) {
                totalElement.innerHTML = `<strong>Total Price: ${formattedTotal}</strong>`;
            } else {
                totalElement.textContent = formattedTotal;
            }
            
            console.log(`Updated variant total to: ${formattedTotal}`);
        } else {
            console.log('No total element found');
        }
    },

    // Advanced Checkout - Simple Implementation
    initAdvancedCheckout: function() {
        console.log('Initializing Advanced Checkout...');
        
        const productItems = document.querySelectorAll('.product-item');
        console.log(`Found ${productItems.length} product items`);
        
        productItems.forEach((item, index) => {
            this.setupProductItem(item, index + 1);
        });

        // Setup delivery area listener
        const deliverySelect = document.querySelector('[id*="deliveryArea"]');
        if (deliverySelect) {
            deliverySelect.onchange = () => {
                console.log('Delivery area changed');
                this.updateCheckoutTotal();
            };
        }
    },

    // Setup individual product item
    setupProductItem: function(item, itemNum) {
        const checkbox = item.querySelector('.product-checkbox');
        const minusBtn = item.querySelector('.qty-minus');
        const plusBtn = item.querySelector('.qty-plus');
        const qtyInput = item.querySelector('.qty-input');

        console.log(`Product Item ${itemNum}:`, {
            hasCheckbox: !!checkbox,
            hasMinusBtn: !!minusBtn,
            hasPlusBtn: !!plusBtn,
            hasQtyInput: !!qtyInput
        });

        if (checkbox && minusBtn && plusBtn && qtyInput) {
            // Clone elements to remove old listeners
            const newCheckbox = checkbox.cloneNode(true);
            const newMinus = minusBtn.cloneNode(true);
            const newPlus = plusBtn.cloneNode(true);
            const newQty = qtyInput.cloneNode(true);

            // Replace elements
            checkbox.parentNode.replaceChild(newCheckbox, checkbox);
            minusBtn.parentNode.replaceChild(newMinus, minusBtn);
            plusBtn.parentNode.replaceChild(newPlus, plusBtn);
            qtyInput.parentNode.replaceChild(newQty, qtyInput);

            // Checkbox event
            newCheckbox.onchange = () => {
                const isChecked = newCheckbox.checked;
                console.log(`Product ${itemNum}: Checkbox ${isChecked ? 'checked' : 'unchecked'}`);
                
                newMinus.disabled = !isChecked;
                newPlus.disabled = !isChecked;
                newQty.disabled = !isChecked;
                
                this.updateCheckoutTotal();
            };

            // Minus button
            newMinus.onclick = () => {
                if (!newMinus.disabled) {
                    console.log(`Product ${itemNum}: Minus clicked`);
                    let qty = parseInt(newQty.value) || 1;
                    if (qty > 1) {
                        newQty.value = qty - 1;
                        this.updateCheckoutTotal();
                    }
                }
            };

            // Plus button
            newPlus.onclick = () => {
                if (!newPlus.disabled) {
                    console.log(`Product ${itemNum}: Plus clicked`);
                    let qty = parseInt(newQty.value) || 1;
                    if (qty < 10) {
                        newQty.value = qty + 1;
                        this.updateCheckoutTotal();
                    }
                }
            };

            // Quantity input
            newQty.onchange = () => {
                console.log(`Product ${itemNum}: Quantity changed to ${newQty.value}`);
                this.updateCheckoutTotal();
            };

            // Set initial state
            const isChecked = newCheckbox.checked;
            newMinus.disabled = !isChecked;
            newPlus.disabled = !isChecked;
            newQty.disabled = !isChecked;

            console.log(`Product Item ${itemNum}: Setup complete!`);
        }
    },

    // Update checkout total calculation
    updateCheckoutTotal: function() {
        console.log('Updating checkout total...');
        
        let subtotal = 0;
        let selectedProducts = [];
        
        // Calculate subtotal from selected products
        document.querySelectorAll('.product-item').forEach((item, index) => {
            const checkbox = item.querySelector('.product-checkbox');
            const qtyInput = item.querySelector('.qty-input');
            const nameElement = item.querySelector('h6');
            const price = parseInt(item.getAttribute('data-price')) || 0;
            
            if (checkbox && checkbox.checked) {
                const qty = parseInt(qtyInput.value) || 1;
                const itemTotal = price * qty;
                subtotal += itemTotal;
                
                const productName = nameElement ? nameElement.textContent.trim() : `Product ${index + 1}`;
                selectedProducts.push({
                    name: productName,
                    qty: qty,
                    total: itemTotal
                });
                
                console.log(`Selected: ${productName} x${qty} = ৳${itemTotal}`);
            }
        });

        // Update selected products display
        const selectedEl = document.querySelector('[id*="selectedProducts"]');
        if (selectedEl) {
            if (selectedProducts.length > 0) {
                let html = '';
                selectedProducts.forEach(product => {
                    html += `<div class="d-flex justify-content-between mb-1">
                        <span>${product.name} (×${product.qty})</span>
                        <span>৳${product.total.toLocaleString()}</span>
                    </div>`;
                });
                selectedEl.innerHTML = html;
            } else {
                selectedEl.innerHTML = '<p class="text-muted text-center">No products selected</p>';
            }
        }

        // Update subtotal
        const subtotalEl = document.querySelector('[id*="subtotalAmount"]');
        if (subtotalEl) {
            subtotalEl.textContent = `৳${subtotal.toLocaleString()}`;
        }

        // Get delivery charge
        const deliverySelect = document.querySelector('[id*="deliveryArea"]');
        const deliveryCharge = deliverySelect ? parseInt(deliverySelect.value) : 60;

        // Update delivery display
        const deliveryEl = document.querySelector('[id*="deliveryCharge"]');
        if (deliveryEl) {
            deliveryEl.textContent = `৳${deliveryCharge}`;
        }

        // Get discount
        const discountEl = document.querySelector('[id*="discountAmount"]');
        const discountText = discountEl ? discountEl.textContent : '৳0';
        const discount = parseInt(discountText.replace(/[^\d]/g, '')) || 0;

        // Calculate final total
        const finalTotal = subtotal + deliveryCharge - discount;

        // Update total
        const totalEl = document.querySelector('[id*="totalAmount"]');
        if (totalEl) {
            totalEl.textContent = `৳${finalTotal.toLocaleString()}`;
        }

        // Update confirm button
        const confirmBtn = document.querySelector('[id*="confirmOrderBtn"]');
        if (confirmBtn) {
            confirmBtn.disabled = selectedProducts.length === 0;
        }

        console.log('Checkout calculation:', {
            subtotal: `৳${subtotal.toLocaleString()}`,
            delivery: `৳${deliveryCharge}`,
            discount: `৳${discount}`,
            total: `৳${finalTotal.toLocaleString()}`
        });
    },

    // Video editing functionality
    initVideoEditing: function() {
        console.log('Initializing video editing...');
        
        document.querySelectorAll('iframe[src*="youtube"]').forEach(iframe => {
            iframe.ondblclick = () => {
                const currentSrc = iframe.src;
                const videoId = this.extractVideoId(currentSrc);
                const newUrl = prompt('Enter YouTube URL or Video ID:', 
                    videoId ? `https://www.youtube.com/watch?v=${videoId}` : currentSrc);
                
                if (newUrl) {
                    const newVideoId = this.extractVideoId(newUrl) || newUrl;
                    if (newVideoId) {
                        iframe.src = `https://www.youtube.com/embed/${newVideoId}`;
                        console.log('Video updated to:', newVideoId);
                    }
                }
            };
        });
    },

    // Extract YouTube video ID from URL
    extractVideoId: function(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    },

    // Apply promo code
    applyPromoCode: function() {
        const promoInput = document.querySelector('[id*="promoCode"]');
        const discountEl = document.querySelector('[id*="discountAmount"]');
        
        if (!promoInput || !discountEl) return;
        
        const code = promoInput.value.toUpperCase().trim();
        const promoCodes = {
            'SAVE10': 500,
            'FIRST20': 1000,
            'BULK30': 1500,
            'WELCOME': 300,
            'STUDENT': 800
        };
        
        if (promoCodes[code]) {
            discountEl.textContent = `৳${promoCodes[code]}`;
            promoInput.value = '';
            this.updateCheckoutTotal();
            alert(`Promo code applied! ৳${promoCodes[code]} discount`);
        } else {
            alert('Invalid promo code');
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        SimpleComponents.init();
    });
} else {
    SimpleComponents.init();
}

// Global functions for manual initialization
window.initSimpleComponents = function() {
    console.log('Manual initialization triggered');
    SimpleComponents.init();
};

window.fixQuantityControls = function() {
    console.log('Fixing quantity controls...');
    SimpleComponents.initProductVariants();
    SimpleComponents.initAdvancedCheckout();
};

window.testSimpleCalculations = function() {
    console.log('Testing calculations...');
    SimpleComponents.updateCheckoutTotal();
    
    // Test variant calculations
    document.querySelectorAll('section').forEach(section => {
        if (section.querySelector('select[data-price]') && !section.querySelector('.product-item')) {
            SimpleComponents.updateVariantTotal(section);
        }
    });
};

// Expose for global use
window.SimpleComponents = SimpleComponents;
window.applyPromoCode = SimpleComponents.applyPromoCode.bind(SimpleComponents);

console.log('Simple Components loaded and ready!');