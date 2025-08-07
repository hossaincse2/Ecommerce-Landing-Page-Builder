// Component Interactions and Event Handlers
const Components = {
    // Initialize all component interactions
    initializeAll: function() {
        this.initVideoComponents();
        this.initQuantityControls();
        this.initGalleryComponents();
        this.initCheckoutComponents();
        this.initCarouselComponents();
        this.initFormComponents();
        
        // Specifically initialize advanced checkout and variants after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.initAdvancedCheckoutQuantity();
            this.initProductVariantsQuantity();
        }, 200);
    },

    // Video component interactions
    initVideoComponents: function() {
        // Make video iframes editable
        document.querySelectorAll('iframe[src*="youtube"]').forEach(iframe => {
            this.makeVideoEditable(iframe);
        });
    },

    // Make video iframe editable
    makeVideoEditable: function(iframe) {
        // Create overlay for editing
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
        `;
        
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i> Change Video';
        editButton.className = 'btn btn-primary';
        editButton.onclick = (e) => {
            e.stopPropagation();
            this.showVideoEditModal(iframe);
        };
        
        overlay.appendChild(editButton);
        
        // Make iframe container relative
        const container = iframe.closest('.ratio') || iframe.parentElement;
        container.style.position = 'relative';
        container.appendChild(overlay);
        
        // Show overlay on hover
        container.addEventListener('mouseenter', () => {
            overlay.style.display = 'flex';
        });
        
        container.addEventListener('mouseleave', () => {
            overlay.style.display = 'none';
        });
        
        // Double click to edit
        iframe.addEventListener('dblclick', (e) => {
            e.preventDefault();
            this.showVideoEditModal(iframe);
        });
    },

    // Show video edit modal
    showVideoEditModal: function(iframe) {
        const currentSrc = iframe.src;
        const videoId = Utils.getYouTubeVideoId(currentSrc);
        const fullUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : currentSrc;
        
        const modal = this.createModal('Edit Video', `
            <div class="form-group">
                <label class="form-label">YouTube Video URL</label>
                <input type="text" class="form-control" id="videoUrl" value="${fullUrl}" placeholder="https://www.youtube.com/watch?v=...">
                <small class="text-muted">Paste a YouTube video URL</small>
            </div>
            <div class="form-group mt-3">
                <label class="form-label">Or Video ID</label>
                <input type="text" class="form-control" id="videoId" value="${videoId || ''}" placeholder="dQw4w9WgXcQ">
                <small class="text-muted">Just the video ID from YouTube</small>
            </div>
        `, [
            {
                text: 'Cancel',
                class: 'btn-secondary',
                action: () => modal.remove()
            },
            {
                text: 'Update Video',
                class: 'btn-primary',
                action: () => {
                    const url = document.getElementById('videoUrl').value.trim();
                    const id = document.getElementById('videoId').value.trim();
                    
                    let newVideoId = '';
                    if (url) {
                        newVideoId = Utils.getYouTubeVideoId(url);
                    } else if (id) {
                        newVideoId = id;
                    }
                    
                    if (newVideoId) {
                        iframe.src = Utils.createYouTubeEmbedUrl(newVideoId);
                        Utils.showMessage('Video updated successfully!', 'success');
                        modal.remove();
                    } else {
                        Utils.showMessage('Invalid YouTube URL or video ID', 'error');
                    }
                }
            }
        ]);
        
        document.body.appendChild(modal);
    },

    // Quantity controls
    initQuantityControls: function() {
        // Initialize simple quantity controls (not in advanced checkout)
        document.querySelectorAll('.qty-minus:not(.product-item .qty-minus)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleQuantityChange(btn, -1);
            });
        });

        document.querySelectorAll('.qty-plus:not(.product-item .qty-plus)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleQuantityChange(btn, 1);
            });
        });

        document.querySelectorAll('.qty-input:not(.product-item .qty-input)').forEach(input => {
            input.addEventListener('change', () => {
                this.updateCalculations();
            });
        });

        // Initialize package/variant selectors
        document.querySelectorAll('select[data-price], select[id*="package"]').forEach(select => {
            select.addEventListener('change', () => {
                this.updateCalculations();
            });
        });

        // Initialize product variants quantity controls specifically
        this.initProductVariantsQuantity();
    },

    // Initialize product variants quantity controls
    initProductVariantsQuantity: function() {
        console.log('Initializing product variants quantity controls...');
        
        // Find all sections that contain package selectors or data-price selectors
        const allSections = document.querySelectorAll('section');
        const variantSections = Array.from(allSections).filter(section => {
            const hasPackageSelect = section.querySelector('.package-select, select[data-price], select[id*="package"]');
            const isNotAdvancedCheckout = !section.querySelector('.product-item');
            return hasPackageSelect && isNotAdvancedCheckout;
        });
        
        console.log(`Found ${variantSections.length} variant sections`);
        
        variantSections.forEach((section, sectionIndex) => {
            console.log(`Processing variant section ${sectionIndex + 1}`);
            
            const minusBtn = section.querySelector('.qty-minus');
            const plusBtn = section.querySelector('.qty-plus');
            const qtyInput = section.querySelector('.qty-input, input[type="number"]');
            const packageSelect = section.querySelector('select[data-price], select[id*="package"], .package-select');

            if (minusBtn && plusBtn && qtyInput) {
                console.log(`Found quantity controls in variant section ${sectionIndex + 1}`);
                
                // Remove existing event listeners by cloning
                const newMinusBtn = minusBtn.cloneNode(true);
                const newPlusBtn = plusBtn.cloneNode(true);
                const newQtyInput = qtyInput.cloneNode(true);

                minusBtn.parentNode.replaceChild(newMinusBtn, minusBtn);
                plusBtn.parentNode.replaceChild(newPlusBtn, plusBtn);
                qtyInput.parentNode.replaceChild(newQtyInput, qtyInput);

                // Minus button event
                newMinusBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log(`Variant minus button clicked in section ${sectionIndex + 1}`);
                    
                    const currentValue = parseInt(newQtyInput.value) || 1;
                    const minValue = parseInt(newQtyInput.min) || 1;
                    
                    if (currentValue > minValue) {
                        newQtyInput.value = currentValue - 1;
                        console.log(`Variant quantity decreased to: ${newQtyInput.value}`);
                        
                        // Update calculation with delay to ensure DOM is updated
                        setTimeout(() => {
                            this.updateVariantCalculation(section);
                        }, 50);
                    }
                });

                // Plus button event
                newPlusBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log(`Variant plus button clicked in section ${sectionIndex + 1}`);
                    
                    const currentValue = parseInt(newQtyInput.value) || 1;
                    const maxValue = parseInt(newQtyInput.max) || 10;
                    
                    if (currentValue < maxValue) {
                        newQtyInput.value = currentValue + 1;
                        console.log(`Variant quantity increased to: ${newQtyInput.value}`);
                        
                        // Update calculation with delay
                        setTimeout(() => {
                            this.updateVariantCalculation(section);
                        }, 50);
                    }
                });

                // Input change event
                newQtyInput.addEventListener('change', () => {
                    let value = parseInt(newQtyInput.value) || 1;
                    const minValue = parseInt(newQtyInput.min) || 1;
                    const maxValue = parseInt(newQtyInput.max) || 10;
                    
                    value = Math.max(minValue, Math.min(maxValue, value));
                    newQtyInput.value = value;
                    
                    console.log(`Variant quantity input changed to: ${value}`);
                    
                    // Update calculation with delay
                    setTimeout(() => {
                        this.updateVariantCalculation(section);
                    }, 50);
                });

                // Package select event
                if (packageSelect) {
                    const newPackageSelect = packageSelect.cloneNode(true);
                    packageSelect.parentNode.replaceChild(newPackageSelect, packageSelect);
                    
                    newPackageSelect.addEventListener('change', () => {
                        console.log(`Package selection changed in section ${sectionIndex + 1}`);
                        
                        // Update calculation with delay
                        setTimeout(() => {
                            this.updateVariantCalculation(section);
                        }, 50);
                    });
                }
                
                // Run initial calculation
                setTimeout(() => {
                    this.updateVariantCalculation(section);
                }, 100);
                
                console.log(`Successfully initialized variant controls for section ${sectionIndex + 1}`);
            } else {
                console.log(`Missing quantity controls in variant section ${sectionIndex + 1}:`, {
                    hasMinusBtn: !!minusBtn,
                    hasPlusBtn: !!plusBtn,
                    hasQtyInput: !!qtyInput,
                    hasPackageSelect: !!packageSelect
                });
            }
        });
        
        console.log('Product variants initialization complete');
    },

    // Update variant calculation for a specific section
    updateVariantCalculation: function(section) {
        const packageSelect = section.querySelector('select[data-price], select[id*="package"]');
        const quantityInput = section.querySelector('.qty-input');
        const totalElement = section.querySelector('.total-price, .alert strong, .alert');
        
        if (!packageSelect || !quantityInput) {
            console.log('Missing elements for variant calculation');
            return;
        }

        const selectedOption = packageSelect.options[packageSelect.selectedIndex];
        let unitPrice = 0;

        // Try to get price from data attribute first
        if (selectedOption.hasAttribute('data-price')) {
            unitPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
        } else {
            // Try to extract price from option text
            const priceMatch = selectedOption.textContent.match(/৳([\d,]+)/);
            if (priceMatch) {
                unitPrice = parseInt(priceMatch[1].replace(',', '')) || 0;
            }
        }

        const quantity = parseInt(quantityInput.value) || 1;
        const total = unitPrice * quantity;

        console.log('Variant calculation:', {
            unitPrice,
            quantity,
            total,
            selectedText: selectedOption.textContent
        });

        if (totalElement) {
            const formattedTotal = Utils.formatCurrency(total);
            
            if (totalElement.classList.contains('alert')) {
                // For alert elements, update the entire content
                totalElement.innerHTML = `<strong>Total Price: ${formattedTotal}</strong>`;
            } else if (totalElement.tagName === 'STRONG') {
                // For strong elements, check if parent has "Total Price:" text
                const parent = totalElement.parentElement;
                if (parent && parent.textContent.includes('Total Price:')) {
                    parent.innerHTML = `<strong>Total Price: ${formattedTotal}</strong>`;
                } else {
                    totalElement.textContent = formattedTotal;
                }
            } else {
                // For other elements, just update the text
                totalElement.textContent = formattedTotal;
            }
            
            console.log(`Updated total to: ${formattedTotal}`);
        } else {
            console.log('No total element found for variant section');
        }
    },

    // Handle quantity change
    handleQuantityChange: function(button, delta) {
        const container = button.closest('.quantity__wrapper, .d-flex');
        const input = container.querySelector('.qty-input, input[type="number"]');
        
        if (input) {
            const currentValue = parseInt(input.value) || 1;
            const minValue = parseInt(input.min) || 1;
            const maxValue = parseInt(input.max) || 10;
            
            let newValue = currentValue + delta;
            newValue = Math.max(minValue, Math.min(maxValue, newValue));
            
            input.value = newValue;
            this.updateCalculations();
        }
    },

    // Update all calculations
    updateCalculations: function() {
        // Update simple product calculations
        this.updateSimpleProductCalculation();
        
        // Update advanced checkout calculations
        this.updateAdvancedCheckoutCalculation();
        
        // Update variant calculations
        this.updateVariantCalculation();
    },

    // Update simple product calculation
    updateSimpleProductCalculation: function() {
        const containers = document.querySelectorAll('[id*="packageSelect"], [data-price]');
        
        containers.forEach(container => {
            const packageSelect = container.querySelector('#packageSelect, select[id*="package"]');
            const quantityInput = container.querySelector('#quantityInput, .qty-input');
            const totalPriceElement = container.querySelector('#totalPrice, .total-price');
            
            if (packageSelect && quantityInput && totalPriceElement) {
                const selectedOption = packageSelect.options[packageSelect.selectedIndex];
                const unitPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
                const quantity = parseInt(quantityInput.value) || 1;
                const total = unitPrice * quantity;
                
                totalPriceElement.textContent = Utils.formatCurrency(total);
            }
        });
    },

    // Update advanced checkout calculation
    updateAdvancedCheckoutCalculation: function() {
        console.log('Updating advanced checkout calculation...');
        
        // Find all product items in any advanced checkout component
        const productItems = document.querySelectorAll('.product-item[data-price]');
        console.log(`Found ${productItems.length} product items`);
        
        if (productItems.length === 0) return;

        let subtotal = 0;
        let hasSelected = false;
        let summaryHTML = '';

        productItems.forEach((productItem, index) => {
            const checkbox = productItem.querySelector('.product-checkbox');
            
            if (checkbox && checkbox.checked) {
                hasSelected = true;
                const price = parseInt(productItem.dataset.price) || 0;
                const qtyInput = productItem.querySelector('.qty-input');
                const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
                const productNameElement = productItem.querySelector('h6');
                const productName = productNameElement ? productNameElement.textContent.trim() : `Product ${index + 1}`;
                const productTotal = price * qty;
                
                subtotal += productTotal;
                
                summaryHTML += `
                    <div class="d-flex justify-content-between mb-1">
                        <span>${productName} (×${qty})</span>
                        <span>${Utils.formatCurrency(productTotal)}</span>
                    </div>
                `;
                
                console.log(`Product ${index + 1}:`, {
                    name: productName,
                    price,
                    quantity: qty,
                    total: productTotal
                });
            }
        });

        console.log('Calculation summary:', {
            subtotal,
            hasSelected,
            productsInSummary: summaryHTML.split('d-flex').length - 1
        });

        // Find all possible UI elements (handling dynamic IDs)
        const selectedProductsElements = document.querySelectorAll('[id^="selectedProducts"]');
        const subtotalElements = document.querySelectorAll('[id^="subtotalAmount"]');
        const confirmButtons = document.querySelectorAll('[id^="confirmOrderBtn"]');
        
        // Update selected products summary
        selectedProductsElements.forEach(element => {
            element.innerHTML = hasSelected ? summaryHTML : '<p class="text-muted text-center">No products selected</p>';
        });

        // Update subtotal
        subtotalElements.forEach(element => {
            element.textContent = Utils.formatCurrency(subtotal);
        });

        // Update confirm buttons
        confirmButtons.forEach(btn => {
            btn.disabled = !hasSelected;
        });

        // Calculate and update delivery charge
        const deliverySelects = document.querySelectorAll('[id^="deliveryArea"]');
        const deliveryChargeElements = document.querySelectorAll('[id^="deliveryCharge"]');
        
        let deliveryCharge = 60; // default
        
        if (deliverySelects.length > 0) {
            deliveryCharge = parseInt(deliverySelects[0].value) || 60;
        }

        // Update delivery charge display
        deliveryChargeElements.forEach(element => {
            element.textContent = Utils.formatCurrency(deliveryCharge);
        });

        // Get discount amount
        const discountElements = document.querySelectorAll('[id^="discountAmount"]');
        let discount = 0;
        
        if (discountElements.length > 0) {
            const discountText = discountElements[0].textContent || '৳0';
            discount = parseInt(discountText.replace(/[^\d]/g, '')) || 0;
        }

        // Calculate final total
        const total = subtotal + deliveryCharge - discount;

        // Update total amount
        const totalElements = document.querySelectorAll('[id^="totalAmount"]');
        totalElements.forEach(element => {
            element.textContent = Utils.formatCurrency(total);
        });

        console.log('Final calculation:', {
            subtotal: Utils.formatCurrency(subtotal),
            deliveryCharge: Utils.formatCurrency(deliveryCharge),
            discount: Utils.formatCurrency(discount),
            total: Utils.formatCurrency(total)
        });
    },

    // Helper function to get current component ID
    getCurrentComponentId: function() {
        // Try to find a unique identifier from the current advanced checkout component
        const advancedCheckout = document.querySelector('.product-item');
        if (advancedCheckout) {
            const parentSection = advancedCheckout.closest('section');
            const uniqueElements = parentSection ? parentSection.querySelectorAll('[id*="_"]') : [];
            if (uniqueElements.length > 0) {
                const id = uniqueElements[0].id;
                const parts = id.split('_');
                return parts[parts.length - 1];
            }
        }
        return '';
    },

    // Helper function to update elements with fallback IDs
    updateElementsWithFallback: function(ids, content) {
        let updated = false;
        
        ids.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (typeof content === 'string' && content.includes('<')) {
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
                }
                updated = true;
            }
        });

        // If no elements found with IDs, try querySelector approach
        if (!updated && ids.length > 0) {
            const baseId = ids[0];
            const elements = document.querySelectorAll(`[id^="${baseId}"]`);
            elements.forEach(element => {
                if (typeof content === 'string' && content.includes('<')) {
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
                }
            });
        }
    },

    // Update variant calculation
    updateVariantCalculation: function(section = null) {
        // If no specific section provided, update all variant sections
        if (!section) {
            const allSections = document.querySelectorAll('section');
            const variantSections = Array.from(allSections).filter(section => {
                const hasPackageSelect = section.querySelector('.package-select, select[data-price], select[id*="package"]');
                const isNotAdvancedCheckout = !section.querySelector('.product-item');
                return hasPackageSelect && isNotAdvancedCheckout;
            });
            
            variantSections.forEach(variantSection => {
                this.updateVariantCalculation(variantSection);
            });
            return;
        }

        const packageSelect = section.querySelector('select[data-price], select[id*="package"], .package-select');
        const quantityInput = section.querySelector('.qty-input');
        const totalElement = section.querySelector('.total-price, .alert strong, .alert');
        
        if (!packageSelect || !quantityInput) {
            console.log('Missing elements for variant calculation');
            return;
        }

        const selectedOption = packageSelect.options[packageSelect.selectedIndex];
        let unitPrice = 0;

        // Try to get price from data attribute first
        if (selectedOption.hasAttribute('data-price')) {
            unitPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
        } else {
            // Try to extract price from option text
            const priceMatch = selectedOption.textContent.match(/৳([\d,]+)/);
            if (priceMatch) {
                unitPrice = parseInt(priceMatch[1].replace(',', '')) || 0;
            }
        }

        const quantity = parseInt(quantityInput.value) || 1;
        const total = unitPrice * quantity;

        console.log('Variant calculation:', {
            unitPrice,
            quantity,
            total,
            selectedText: selectedOption.textContent
        });

        if (totalElement) {
            const formattedTotal = Utils.formatCurrency(total);
            
            if (totalElement.classList.contains('alert')) {
                // For alert elements, update the entire content
                totalElement.innerHTML = `<strong>Total Price: ${formattedTotal}</strong>`;
            } else if (totalElement.tagName === 'STRONG') {
                // For strong elements, check if parent has "Total Price:" text
                const parent = totalElement.parentElement;
                if (parent && parent.textContent.includes('Total Price:')) {
                    parent.innerHTML = `<strong>Total Price: ${formattedTotal}</strong>`;
                } else {
                    totalElement.textContent = formattedTotal;
                }
            } else {
                // For other elements, just update the text
                totalElement.textContent = formattedTotal;
            }
            
            console.log(`Updated total to: ${formattedTotal}`);
        } else {
            console.log('No total element found for variant section');
        }
    },

    // Reinitialize product variants (useful when components are dynamically added)
    reinitializeProductVariants: function() {
        setTimeout(() => {
            this.initProductVariantsQuantity();
        }, 100);
    },

    // Gallery components
    initGalleryComponents: function() {
        document.querySelectorAll('.gallery-thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const mainImg = document.querySelector('.main-image');
                if (mainImg) {
                    const newSrc = this.src.replace('w=100&h=100', 'w=600&h=400');
                    mainImg.src = newSrc;
                    
                    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('border-primary', 'active'));
                    this.classList.add('border-primary', 'active');
                }
            });
        });
    },

    // Checkout components
    initCheckoutComponents: function() {
        // Product checkbox handlers
        document.querySelectorAll('.product-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const productItem = checkbox.closest('.product-item');
                const qtyControls = productItem.querySelectorAll('.qty-minus, .qty-plus, .qty-input');
                
                qtyControls.forEach(control => {
                    control.disabled = !checkbox.checked;
                });
                
                this.updateCalculations();
            });
        });

        // Advanced checkout quantity controls
        this.initAdvancedCheckoutQuantity();

        // Delivery area change
        const deliveryArea = document.getElementById('deliveryArea');
        if (deliveryArea) {
            deliveryArea.addEventListener('change', () => {
                const deliveryCharge = document.getElementById('deliveryCharge');
                if (deliveryCharge) {
                    deliveryCharge.textContent = Utils.formatCurrency(parseInt(deliveryArea.value));
                }
                this.updateCalculations();
            });
        }

        // Promo code application
        const promoButton = document.querySelector('[onclick*="applyPromoCode"]');
        if (promoButton) {
            promoButton.onclick = () => this.applyPromoCode();
        }
    },

    // Initialize advanced checkout quantity controls
    initAdvancedCheckoutQuantity: function() {
        console.log('Initializing advanced checkout quantity controls...');
        
        // Handle quantity controls in advanced checkout specifically
        document.querySelectorAll('.product-item').forEach((productItem, index) => {
            console.log(`Processing product item ${index + 1}`);
            
            const minusBtn = productItem.querySelector('.qty-minus');
            const plusBtn = productItem.querySelector('.qty-plus');
            const qtyInput = productItem.querySelector('.qty-input');
            const checkbox = productItem.querySelector('.product-checkbox');

            if (minusBtn && plusBtn && qtyInput) {
                console.log(`Found quantity controls for product item ${index + 1}`);
                
                // Remove existing event listeners by cloning
                const newMinusBtn = minusBtn.cloneNode(true);
                const newPlusBtn = plusBtn.cloneNode(true);
                const newQtyInput = qtyInput.cloneNode(true);

                minusBtn.parentNode.replaceChild(newMinusBtn, minusBtn);
                plusBtn.parentNode.replaceChild(newPlusBtn, plusBtn);
                qtyInput.parentNode.replaceChild(newQtyInput, qtyInput);

                // Minus button event
                newMinusBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log(`Advanced checkout minus button clicked for product ${index + 1}`);
                    
                    const currentValue = parseInt(newQtyInput.value) || 1;
                    const minValue = parseInt(newQtyInput.min) || 1;
                    
                    if (currentValue > minValue) {
                        newQtyInput.value = currentValue - 1;
                        console.log(`Advanced checkout quantity decreased to: ${newQtyInput.value}`);
                        
                        // Update calculation
                        setTimeout(() => {
                            this.updateAdvancedCheckoutCalculation();
                        }, 50);
                    }
                });

                // Plus button event
                newPlusBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log(`Advanced checkout plus button clicked for product ${index + 1}`);
                    
                    const currentValue = parseInt(newQtyInput.value) || 1;
                    const maxValue = parseInt(newQtyInput.max) || 10;
                    
                    if (currentValue < maxValue) {
                        newQtyInput.value = currentValue + 1;
                        console.log(`Advanced checkout quantity increased to: ${newQtyInput.value}`);
                        
                        // Update calculation
                        setTimeout(() => {
                            this.updateAdvancedCheckoutCalculation();
                        }, 50);
                    }
                });

                // Input change event
                newQtyInput.addEventListener('change', () => {
                    let value = parseInt(newQtyInput.value) || 1;
                    const minValue = parseInt(newQtyInput.min) || 1;
                    const maxValue = parseInt(newQtyInput.max) || 10;
                    
                    value = Math.max(minValue, Math.min(maxValue, value));
                    newQtyInput.value = value;
                    
                    console.log(`Advanced checkout quantity input changed to: ${value}`);
                    
                    // Update calculation
                    setTimeout(() => {
                        this.updateAdvancedCheckoutCalculation();
                    }, 50);
                });

                // Handle checkbox for enabling/disabling controls
                if (checkbox) {
                    // Clone checkbox too to remove existing listeners
                    const newCheckbox = checkbox.cloneNode(true);
                    checkbox.parentNode.replaceChild(newCheckbox, checkbox);
                    
                    newCheckbox.addEventListener('change', () => {
                        const isChecked = newCheckbox.checked;
                        console.log(`Advanced checkout checkbox ${isChecked ? 'checked' : 'unchecked'} for product item ${index + 1}`);
                        
                        // Enable/disable quantity controls
                        newMinusBtn.disabled = !isChecked;
                        newPlusBtn.disabled = !isChecked;
                        newQtyInput.disabled = !isChecked;
                        
                        // Update visual state
                        if (isChecked) {
                            newMinusBtn.classList.remove('btn-outline-secondary');
                            newPlusBtn.classList.remove('btn-outline-secondary');
                            newMinusBtn.classList.add('btn-outline-primary');
                            newPlusBtn.classList.add('btn-outline-primary');
                        } else {
                            newMinusBtn.classList.remove('btn-outline-primary');
                            newPlusBtn.classList.remove('btn-outline-primary');
                            newMinusBtn.classList.add('btn-outline-secondary');
                            newPlusBtn.classList.add('btn-outline-secondary');
                        }
                        
                        // Update calculation
                        setTimeout(() => {
                            this.updateAdvancedCheckoutCalculation();
                        }, 50);
                    });

                    // Set initial state
                    const isChecked = newCheckbox.checked;
                    newMinusBtn.disabled = !isChecked;
                    newPlusBtn.disabled = !isChecked;
                    newQtyInput.disabled = !isChecked;
                    
                    // Set initial visual state
                    if (isChecked) {
                        newMinusBtn.classList.add('btn-outline-primary');
                        newPlusBtn.classList.add('btn-outline-primary');
                    } else {
                        newMinusBtn.classList.add('btn-outline-secondary');
                        newPlusBtn.classList.add('btn-outline-secondary');
                    }
                }
                
                console.log(`Successfully initialized advanced checkout controls for product item ${index + 1}`);
            } else {
                console.log(`Missing quantity controls for product item ${index + 1}:`, {
                    hasMinusBtn: !!minusBtn,
                    hasPlusBtn: !!plusBtn,
                    hasQtyInput: !!qtyInput
                });
            }
        });
        
        // Initialize delivery area change handler
        document.querySelectorAll('[id^="deliveryArea"]').forEach(select => {
            select.addEventListener('change', () => {
                console.log('Delivery area changed:', select.value);
                setTimeout(() => {
                    this.updateAdvancedCheckoutCalculation();
                }, 50);
            });
        });
        
        // Run initial calculation
        setTimeout(() => {
            this.updateAdvancedCheckoutCalculation();
        }, 100);
        
        console.log('Advanced checkout initialization complete');
    },

    // Reinitialize advanced checkout (useful when components are dynamically added)
    reinitializeAdvancedCheckout: function() {
        setTimeout(() => {
            this.initAdvancedCheckoutQuantity();
        }, 100);
    },

    // Apply promo code
    applyPromoCode: function() {
        const promoInput = document.getElementById('promoCode');
        const discountElement = document.getElementById('discountAmount');
        
        if (!promoInput || !discountElement) return;
        
        const promoCode = promoInput.value.toUpperCase().trim();
        let discount = 0;
        
        const promoCodes = {
            'SAVE10': 500,
            'FIRST20': 1000,
            'BULK30': 1500,
            'WELCOME': 300,
            'STUDENT': 800
        };
        
        if (promoCodes[promoCode]) {
            discount = promoCodes[promoCode];
            Utils.showMessage(`Promo code applied! ${Utils.formatCurrency(discount)} discount`, 'success');
            promoInput.value = '';
        } else {
            Utils.showMessage('Invalid promo code', 'error');
            return;
        }
        
        discountElement.textContent = Utils.formatCurrency(discount);
        this.updateCalculations();
    },

    // Carousel components
    initCarouselComponents: function() {
        // Thumbnail click handlers for carousel
        document.querySelectorAll('.carousel-thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                document.querySelectorAll('.carousel-thumb').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Update active thumbnail when carousel slides
        document.querySelectorAll('.carousel').forEach(carousel => {
            carousel.addEventListener('slid.bs.carousel', function(event) {
                const activeIndex = event.to;
                const thumbs = document.querySelectorAll('.carousel-thumb');
                thumbs.forEach((thumb, index) => {
                    thumb.classList.toggle('active', index === activeIndex);
                });
            });
        });
    },

    // Form components
    initFormComponents: function() {
        // Form submission handlers
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });
                
                if (isValid) {
                    this.handleFormSubmission(form);
                } else {
                    Utils.showMessage('Please fill in all required fields', 'error');
                }
            });
        });
    },

    // Handle form submission
    handleFormSubmission: function(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        Utils.showMessage('Order submitted successfully! We will contact you within 24 hours.', 'success');
        
        // You can add actual form submission logic here
        console.log('Form submitted with data:', data);
    },

    // Create modal utility
    createModal: function(title, content, buttons = []) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        modal.style.zIndex = '10001';
        
        const buttonsHtml = buttons.map(btn => 
            `<button class="btn ${btn.class}" data-action="${btn.text}">${btn.text}</button>`
        ).join(' ');
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer" style="text-align: right; margin-top: 20px;">
                    ${buttonsHtml}
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        
        buttons.forEach((btn, index) => {
            const btnElement = modal.querySelectorAll('.modal-footer button')[index];
            btnElement.addEventListener('click', btn.action);
        });
        
        return modal;
    }
};

// Global functions for component interactions
window.changeQuantity = function(delta) {
    const button = event.target;
    Components.handleQuantityChange(button, delta);
};

window.updatePrice = function() {
    Components.updateCalculations();
};

window.updateDeliveryCharge = function() {
    Components.updateCalculations();
};

window.applyPromoCode = function() {
    Components.applyPromoCode();
};

// Global function to manually reinitialize components (useful for debugging)
window.reinitializeComponents = function() {
    console.log('Manually reinitializing all components...');
    Components.initializeAll();
    setTimeout(() => {
        Components.reinitializeAdvancedCheckout();
        Components.reinitializeProductVariants();
    }, 200);
};

// Global function to debug advanced checkout
window.debugAdvancedCheckout = function() {
    console.log('=== Advanced Checkout Debug Info ===');
    const productItems = document.querySelectorAll('.product-item');
    console.log(`Found ${productItems.length} product items`);
    
    productItems.forEach((item, index) => {
        const checkbox = item.querySelector('.product-checkbox');
        const qtyInput = item.querySelector('.qty-input');
        const minusBtn = item.querySelector('.qty-minus');
        const plusBtn = item.querySelector('.qty-plus');
        const price = item.dataset.price;
        
        console.log(`Product ${index + 1}:`, {
            hasCheckbox: !!checkbox,
            isChecked: checkbox ? checkbox.checked : false,
            hasQtyInput: !!qtyInput,
            quantity: qtyInput ? qtyInput.value : 'N/A',
            hasMinusBtn: !!minusBtn,
            hasPlusBtn: !!plusBtn,
            price: price,
            buttonsDisabled: minusBtn ? minusBtn.disabled : 'N/A'
        });
    });
    
    // Test calculation
    Components.updateAdvancedCheckoutCalculation();
    console.log('=== End Debug Info ===');
};

// Global function to debug product variants
window.debugProductVariants = function() {
    console.log('=== Product Variants Debug Info ===');
    
    // Find all sections that contain package selectors or data-price selectors
    const allSections = document.querySelectorAll('section');
    const variantSections = Array.from(allSections).filter(section => {
        const hasPackageSelect = section.querySelector('.package-select, select[data-price], select[id*="package"]');
        const isNotAdvancedCheckout = !section.querySelector('.product-item');
        return hasPackageSelect && isNotAdvancedCheckout;
    });
    
    console.log(`Found ${variantSections.length} variant sections`);
    
    variantSections.forEach((section, index) => {
        const packageSelect = section.querySelector('select[data-price], select[id*="package"], .package-select');
        const qtyInput = section.querySelector('.qty-input');
        const minusBtn = section.querySelector('.qty-minus');
        const plusBtn = section.querySelector('.qty-plus');
        const totalElement = section.querySelector('.total-price, .alert');
        
        console.log(`Variant Section ${index + 1}:`, {
            hasPackageSelect: !!packageSelect,
            selectedOption: packageSelect ? packageSelect.options[packageSelect.selectedIndex].textContent : 'N/A',
            hasQtyInput: !!qtyInput,
            quantity: qtyInput ? qtyInput.value : 'N/A',
            hasMinusBtn: !!minusBtn,
            hasPlusBtn: !!plusBtn,
            hasTotalElement: !!totalElement,
            currentTotal: totalElement ? totalElement.textContent : 'N/A'
        });
    });
    
    // Test calculation
    Components.updateVariantCalculation();
    console.log('=== End Variant Debug Info ===');
};

// Auto-initialize components when DOM changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
            // Delay to ensure DOM is fully updated
            setTimeout(() => {
                Components.initializeAll();
            }, 100);
        }
    });
});

// Start observing
document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Initial initialization
    Components.initializeAll();
});

// Export for use in other files
window.Components = Components;