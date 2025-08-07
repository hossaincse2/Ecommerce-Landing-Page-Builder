// Template Management
const Templates = {
    // Save template
    saveTemplate: function() {
        const name = document.getElementById('template-name').value.trim();
        const description = document.getElementById('template-description').value.trim();
        
        if (!name) {
            Utils.showMessage('Please enter a template name', 'error');
            return;
        }
        
        if (!window.pageBuilder.editor) {
            Utils.showMessage('Editor not initialized', 'error');
            return;
        }
        
        const templateData = {
            id: Utils.getTimestamp().toString(),
            name: name,
            description: description,
            html: window.pageBuilder.editor.getHtml(),
            css: window.pageBuilder.editor.getCss(),
            components: window.pageBuilder.editor.getProjectData(),
            created: new Date().toISOString()
        };
        
        try {
            const savedTemplates = Utils.storage.get('pageBuilder_templates', {});
            savedTemplates[templateData.id] = templateData;
            Utils.storage.set('pageBuilder_templates', savedTemplates);
            
            Utils.showMessage('Template saved successfully!', 'success');
            window.pageBuilder.closeModal('save-modal');
            
            // Clear form
            document.getElementById('template-name').value = '';
            document.getElementById('template-description').value = '';
            
            // Update template list
            this.updateTemplateList();
        } catch (error) {
            Utils.showMessage('Error saving template: ' + error.message, 'error');
        }
    },

    // Import template
    importTemplate: function() {
        const fileInput = document.getElementById('import-file');
        const textInput = document.getElementById('import-data');
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const templateData = JSON.parse(e.target.result);
                    this.loadTemplateData(templateData);
                    window.pageBuilder.closeModal('import-modal');
                    Utils.showMessage('Template imported successfully!', 'success');
                } catch (error) {
                    Utils.showMessage('Invalid JSON file', 'error');
                }
            };
            reader.readAsText(file);
        } else if (textInput.value.trim()) {
            try {
                const templateData = JSON.parse(textInput.value);
                this.loadTemplateData(templateData);
                window.pageBuilder.closeModal('import-modal');
                Utils.showMessage('Template imported successfully!', 'success');
            } catch (error) {
                Utils.showMessage('Invalid JSON data', 'error');
            }
        } else {
            Utils.showMessage('Please select a file or paste JSON data', 'error');
        }
    },

    // Load template data
    loadTemplateData: function(templateData) {
        if (!window.pageBuilder.editor) {
            Utils.showMessage('Editor not initialized', 'error');
            return;
        }

        if (templateData.components) {
            window.pageBuilder.editor.loadProjectData(templateData.components);
        } else if (templateData.html) {
            window.pageBuilder.editor.setComponents(templateData.html);
            if (templateData.css) {
                window.pageBuilder.editor.setStyle(templateData.css);
            }
        }

        // Initialize components after loading
        setTimeout(() => {
            if (window.Components) {
                window.Components.initializeAll();
                
                // Special handling for both advanced checkout and product variants
                setTimeout(() => {
                    window.Components.reinitializeAdvancedCheckout();
                    window.Components.reinitializeProductVariants();
                }, 500);
            }
        }, 500);
    },

    // Load complete eCommerce template
    loadCompleteTemplate: function(editor) {
        const completeTemplate = `
            <!-- Hero Section -->
            <section class="hero py-5" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-12 text-center">
                            <h1 class="display-4 fw-bold mb-3">Premium Wireless Headphones</h1>
                            <p class="lead mb-4">Experience crystal-clear sound with ultimate comfort</p>
                            <button class="btn btn-light btn-lg px-5">Shop Now - ৳4,500</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Video Section -->
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="h3 fw-bold text-center mb-4">Product Demo Video</h2>
                            <div class="ratio ratio-16x9 rounded shadow video-container">
                                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen class="editable-video"></iframe>
                            </div>
                            <p class="text-center mt-2 small text-muted">
                                <i class="fas fa-edit me-1"></i>Double-click video to change URL
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Image Slider -->
            <section class="py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="h3 fw-bold text-center mb-4">Product Gallery</h2>
                            <div id="productCarousel" class="carousel slide shadow rounded" data-bs-ride="carousel">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="0" class="active"></button>
                                    <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="1"></button>
                                    <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="2"></button>
                                    <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="3"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop&crop=center" 
                                             class="d-block w-100" alt="Premium Headphones" style="height: 400px; object-fit: cover;">
                                        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                            <h5>Premium Audio Quality</h5>
                                            <p>Experience crystal clear sound with deep bass</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=400&fit=crop&crop=center" 
                                             class="d-block w-100" alt="Headphones Side View" style="height: 400px; object-fit: cover;">
                                        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                            <h5>Comfort Design</h5>
                                            <p>Ergonomic fit for extended listening sessions</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=400&fit=crop&crop=center" 
                                             class="d-block w-100" alt="Audio Equipment" style="height: 400px; object-fit: cover;">
                                        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                            <h5>Complete Setup</h5>
                                            <p>Everything you need for the perfect audio experience</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=400&fit=crop&crop=center" 
                                             class="d-block w-100" alt="Studio Setup" style="height: 400px; object-fit: cover;">
                                        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                            <h5>Professional Grade</h5>
                                            <p>Studio quality sound for professionals and enthusiasts</p>
                                        </div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon"></span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                    <span class="carousel-control-next-icon"></span>
                                </button>
                            </div>
                            
                            <div class="row mt-3 justify-content-center">
                                <div class="col-auto">
                                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=60&fit=crop" 
                                         class="img-thumbnail carousel-thumb active" data-bs-target="#productCarousel" data-bs-slide-to="0" 
                                         style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;" alt="Thumb 1">
                                </div>
                                <div class="col-auto">
                                    <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=80&h=60&fit=crop" 
                                         class="img-thumbnail carousel-thumb" data-bs-target="#productCarousel" data-bs-slide-to="1" 
                                         style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;" alt="Thumb 2">
                                </div>
                                <div class="col-auto">
                                    <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=80&h=60&fit=crop" 
                                         class="img-thumbnail carousel-thumb" data-bs-target="#productCarousel" data-bs-slide-to="2" 
                                         style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;" alt="Thumb 3">
                                </div>
                                <div class="col-auto">
                                    <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=60&fit=crop" 
                                         class="img-thumbnail carousel-thumb" data-bs-target="#productCarousel" data-bs-slide-to="3" 
                                         style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;" alt="Thumb 4">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Product Description -->
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <h2 class="h3 fw-bold mb-4">Product Description</h2>
                            <p class="lead">Immerse yourself in exceptional audio quality with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology, these headphones deliver crisp highs, rich mids, and deep bass for an unparalleled listening experience.</p>
                            <p>The ergonomic design ensures maximum comfort during extended use, while the long-lasting battery provides up to 30 hours of continuous playback. Perfect for music lovers, professionals, and anyone who values superior sound quality.</p>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Advanced Noise Cancellation Technology</li>
                                <li><i class="fas fa-check text-success me-2"></i>30-Hour Ultra Long Battery Life</li>
                                <li><i class="fas fa-check text-success me-2"></i>Bluetooth 5.0 Connectivity</li>
                                <li><i class="fas fa-check text-success me-2"></i>Premium Ergonomic Design</li>
                                <li><i class="fas fa-check text-success me-2"></i>Fast Charging Technology</li>
                                <li><i class="fas fa-check text-success me-2"></i>Multi-Device Connection</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Specifications -->
            <section class="py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <h2 class="h3 fw-bold text-center mb-4">Technical Specifications</h2>
                            <div class="table-responsive">
                                <table class="table table-striped table-hover">
                                    <tbody>
                                        <tr><td class="fw-semibold" style="width: 40%;">Battery Life</td><td>30 hours continuous playback</td></tr>
                                        <tr><td class="fw-semibold">Connectivity</td><td>Bluetooth 5.0 + 3.5mm Jack</td></tr>
                                        <tr><td class="fw-semibold">Noise Cancellation</td><td>Active ANC with Transparency Mode</td></tr>
                                        <tr><td class="fw-semibold">Weight</td><td>250g (ultra-lightweight)</td></tr>
                                        <tr><td class="fw-semibold">Charging Time</td><td>2 hours (Fast Charge: 15min = 3hrs)</td></tr>
                                        <tr><td class="fw-semibold">Frequency Response</td><td>20Hz - 20kHz (Hi-Res Audio)</td></tr>
                                        <tr><td class="fw-semibold">Driver Size</td><td>40mm Dynamic Drivers</td></tr>
                                        <tr><td class="fw-semibold">Warranty</td><td>2 Years International Warranty</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Customer Reviews -->
            <section class="py-5 bg-light">
                <div class="container">
                    <h2 class="h3 fw-bold text-center mb-5">What Our Customers Say</h2>
                    <div class="row">
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h6 class="card-title mb-0">Sarah Johnson</h6>
                                        <span class="text-warning">★★★★★</span>
                                    </div>
                                    <p class="card-text">"Absolutely amazing! The sound quality is incredible and the noise cancellation works like magic. Best headphones I've ever owned!"</p>
                                    <small class="text-muted">Verified Purchase • 2 weeks ago</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h6 class="card-title mb-0">Mike Chen</h6>
                                        <span class="text-warning">★★★★★</span>
                                    </div>
                                    <p class="card-text">"Perfect for my daily commute! The battery really does last 30 hours. Comfortable to wear all day and excellent build quality."</p>
                                    <small class="text-muted">Verified Purchase • 1 month ago</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h6 class="card-title mb-0">Emily Davis</h6>
                                        <span class="text-warning">★★★★★</span>
                                    </div>
                                    <p class="card-text">"As a music producer, I need quality audio. These headphones exceed expectations! Crystal clear sound and professional grade quality."</p>
                                    <small class="text-muted">Verified Purchase • 3 weeks ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Product Variants -->
            <section class="py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 mx-auto">
                            <h2 class="h3 fw-bold text-center mb-4">Choose Your Options</h2>
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Color</label>
                                <select class="form-select">
                                    <option value="black">Matte Black</option>
                                    <option value="white">Pearl White</option>
                                    <option value="blue">Ocean Blue</option>
                                    <option value="red">Ruby Red</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Package Options</label>
                                <select class="form-select package-select" data-price="4500">
                                    <option value="single" data-price="4500">Single Unit - ৳4,500</option>
                                    <option value="combo" data-price="7500">Combo Pack (2 Units) - ৳7,500</option>
                                    <option value="family" data-price="10500">Family Pack (3 Units) - ৳10,500</option>
                                </select>
                            </div>
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <label class="form-label fw-semibold mb-0">Quantity:</label>
                                <button class="btn btn-outline-primary btn-sm qty-minus" type="button">-</button>
                                <input type="number" class="form-control text-center qty-input" value="1" min="1" max="10" style="width: 80px;">
                                <button class="btn btn-outline-primary btn-sm qty-plus" type="button">+</button>
                            </div>
                            <div class="alert alert-info">
                                <strong>Total Price: <span class="total-price">৳4,500</span></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Advanced Checkout -->
            ${this.getAdvancedCheckoutSection()}

            <!-- Social Order Buttons -->
            <section class="py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 mx-auto text-center">
                            <h2 class="h4 fw-bold mb-4">Quick Order via Social Media</h2>
                            <p class="text-muted mb-4">Order directly through your favorite platform</p>
                            <div class="d-grid gap-3">
                                <a href="https://www.facebook.com/" target="_blank" class="btn btn-primary btn-lg">
                                    <i class="fab fa-facebook-f me-2"></i> Order via Facebook
                                </a>
                                <a href="https://wa.me/8801XXXXXXXXX?text=Hi! I want to order Premium Wireless Headphones for ৳4,500" target="_blank" class="btn btn-success btn-lg">
                                    <i class="fab fa-whatsapp me-2"></i> Order via WhatsApp
                                </a>
                                <a href="https://m.me/yourpage" target="_blank" class="btn btn-info btn-lg">
                                    <i class="fab fa-facebook-messenger me-2"></i> Order via Messenger
                                </a>
                            </div>
                            <p class="text-center text-muted mt-3 small">
                                <i class="fas fa-clock me-1"></i>Response time: Within 30 minutes
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        editor.setComponents(completeTemplate);
        Utils.showMessage('Complete eCommerce template loaded with all sections!', 'success');
        
        // Initialize components after template load
        setTimeout(() => {
            if (window.Components) {
                window.Components.initializeAll();
                setTimeout(() => {
                    window.Components.reinitializeAdvancedCheckout();
                    window.Components.reinitializeProductVariants();
                }, 300);
            }
        }, 1000);
    },

    // Load minimal template
    loadMinimalTemplate: function(editor) {
        const minimalTemplate = `
            <!-- Minimal Hero -->
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto text-center">
                            <h1 class="h2 fw-bold mb-3">Simple. Elegant. Powerful.</h1>
                            <p class="lead text-muted mb-4">Discover our latest collection of premium audio products designed for the modern lifestyle</p>
                            <button class="btn btn-primary btn-lg px-5">Explore Products</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Product Showcase -->
            <section class="py-5">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-6 mb-4">
                            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&crop=center" 
                                 class="img-fluid rounded shadow" alt="Premium Headphones">
                        </div>
                        <div class="col-md-6">
                            <h2 class="h3 fw-bold mb-3">Premium Wireless Headphones</h2>
                            <p class="text-muted mb-4">Experience exceptional audio quality with our flagship headphones featuring advanced noise cancellation and 30-hour battery life.</p>
                            <ul class="list-unstyled mb-4">
                                <li><i class="fas fa-check text-success me-2"></i>Active Noise Cancellation</li>
                                <li><i class="fas fa-check text-success me-2"></i>30-Hour Battery Life</li>
                                <li><i class="fas fa-check text-success me-2"></i>Bluetooth 5.0 Connectivity</li>
                                <li><i class="fas fa-check text-success me-2"></i>Premium Build Quality</li>
                            </ul>
                            <div class="d-flex align-items-center gap-3 mb-4">
                                <span class="h4 text-primary fw-bold mb-0">৳4,500</span>
                                <span class="text-muted text-decoration-line-through">৳6,000</span>
                                <span class="badge bg-danger">25% OFF</span>
                            </div>
                            <div class="d-grid gap-2 d-md-flex">
                                <button class="btn btn-primary btn-lg">Add to Cart</button>
                                <button class="btn btn-outline-primary btn-lg">Learn More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Simple Reviews -->
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <h2 class="h3 fw-bold text-center mb-5">What Our Customers Say</h2>
                            <div class="row">
                                <div class="col-md-6 mb-4">
                                    <div class="text-center">
                                        <div class="text-warning mb-2 fs-4">★★★★★</div>
                                        <p class="fst-italic mb-2">"Absolutely love these headphones! Best purchase I've made this year. The sound quality is incredible!"</p>
                                        <small class="text-muted">- Sarah J., Verified Customer</small>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="text-center">
                                        <div class="text-warning mb-2 fs-4">★★★★★</div>
                                        <p class="fst-italic mb-2">"Excellent sound quality and very comfortable to wear. Perfect for long work sessions and travel."</p>
                                        <small class="text-muted">- Mike C., Verified Customer</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Simple Order Form -->
            <section class="py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 mx-auto">
                            <h2 class="h3 fw-bold text-center mb-4">Quick Order</h2>
                            <div class="card shadow">
                                <div class="card-body p-4">
                                    <form class="simple-order-form">
                                        <div class="mb-3">
                                            <label class="form-label">Your Name *</label>
                                            <input type="text" class="form-control" name="name" placeholder="Enter your full name" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Phone Number *</label>
                                            <input type="tel" class="form-control" name="phone" placeholder="+880 1XXX-XXXXXX" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Email Address</label>
                                            <input type="email" class="form-control" name="email" placeholder="your@email.com">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Delivery Address *</label>
                                            <textarea class="form-control" name="address" rows="2" placeholder="Your complete address" required></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Quantity</label>
                                            <div class="d-flex align-items-center gap-2">
                                                <button class="btn btn-outline-secondary btn-sm qty-minus" type="button">-</button>
                                                <input type="number" class="form-control text-center qty-input" value="1" min="1" max="5" style="width: 80px;">
                                                <button class="btn btn-outline-secondary btn-sm qty-plus" type="button">+</button>
                                            </div>
                                        </div>
                                        <div class="card bg-light mb-3">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between mb-1">
                                                    <span>Product Total:</span>
                                                    <span class="order-subtotal">৳4,500</span>
                                                </div>
                                                <div class="d-flex justify-content-between mb-1">
                                                    <span>Delivery:</span>
                                                    <span>৳60</span>
                                                </div>
                                                <hr class="my-2">
                                                <div class="d-flex justify-content-between fw-bold">
                                                    <span>Total:</span>
                                                    <span class="order-total">৳4,560</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary w-100 btn-lg">
                                            <i class="fas fa-shopping-cart me-2"></i>Order Now
                                        </button>
                                        <p class="text-center text-muted mt-2 small">
                                            <i class="fas fa-shield-alt me-1"></i>Safe & Secure Ordering
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Options -->
            <section class="py-5 bg-primary text-white">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h3 class="mb-4">Need Help? Contact Us Anytime</h3>
                            <div class="row justify-content-center">
                                <div class="col-md-3 mb-3">
                                    <a href="https://wa.me/8801XXXXXXXXX" target="_blank" class="btn btn-light btn-lg">
                                        <i class="fab fa-whatsapp me-2 text-success"></i>WhatsApp
                                    </a>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <a href="tel:+8801XXXXXXXXX" class="btn btn-light btn-lg">
                                        <i class="fas fa-phone me-2 text-primary"></i>Call Us
                                    </a>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <a href="mailto:info@example.com" class="btn btn-light btn-lg">
                                        <i class="fas fa-envelope me-2 text-info"></i>Email
                                    </a>
                                </div>
                            </div>
                            <p class="mt-3 mb-0">
                                <i class="fas fa-clock me-1"></i>Available 24/7 for customer support
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        editor.setComponents(minimalTemplate);
        Utils.showMessage('Minimal product template loaded!', 'success');
        
        // Initialize components after template load
        setTimeout(() => {
            if (window.Components) {
                window.Components.initializeAll();
                setTimeout(() => {
                    window.Components.reinitializeProductVariants();
                }, 300);
            }
        }, 1000);
    },

    // Get advanced checkout section for complete template
    getAdvancedCheckoutSection: function() {
        const uniqueId = Utils.generateId();
        return `
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <h2 class="h3 fw-bold text-center mb-5">Complete Your Order</h2>
                            
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0"><i class="fas fa-shopping-cart me-2"></i>Selected Product</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-md-3">
                                            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=100&fit=crop" 
                                                 class="img-fluid rounded" alt="Wireless Headphones">
                                        </div>
                                        <div class="col-md-6">
                                            <h6 class="mb-1">Premium Wireless Headphones</h6>
                                            <p class="text-muted mb-0 small">Active Noise Cancellation, 30h Battery</p>
                                            <strong class="text-primary">৳4,500</strong>
                                        </div>
                                        <div class="col-md-3 text-end">
                                            <span class="badge bg-primary fs-6">Qty: 1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-7">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5 class="mb-0"><i class="fas fa-user me-2"></i>Customer Information</h5>
                                        </div>
                                        <div class="card-body">
                                            <form class="checkout-form">
                                                <div class="row">
                                                    <div class="col-md-6 mb-3">
                                                        <label class="form-label">First Name *</label>
                                                        <input type="text" class="form-control" name="firstName" placeholder="First name" required>
                                                    </div>
                                                    <div class="col-md-6 mb-3">
                                                        <label class="form-label">Last Name *</label>
                                                        <input type="text" class="form-control" name="lastName" placeholder="Last name" required>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Phone Number *</label>
                                                    <input type="tel" class="form-control" name="phone" placeholder="+880 1XXX-XXXXXX" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Email Address</label>
                                                    <input type="email" class="form-control" name="email" placeholder="your@email.com">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Shipping Address *</label>
                                                    <textarea class="form-control" name="address" rows="3" placeholder="House/Flat, Road, Area, City" required></textarea>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Delivery Area</label>
                                                    <select class="form-select" name="deliveryArea">
                                                        <option value="60">Inside Dhaka (৳60)</option>
                                                        <option value="120">Outside Dhaka (৳120)</option>
                                                        <option value="150">Remote Areas (৳150)</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-5">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5 class="mb-0"><i class="fas fa-receipt me-2"></i>Order Summary</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Subtotal:</span>
                                                <span>৳4,500</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Delivery:</span>
                                                <span>৳60</span>
                                            </div>
                                            <hr>
                                            <div class="d-flex justify-content-between fw-bold fs-4">
                                                <span>Total:</span>
                                                <span class="text-primary">৳4,560</span>
                                            </div>
                                            
                                            <button type="submit" class="btn btn-primary btn-lg w-100 mt-4">
                                                <i class="fas fa-shopping-cart me-2"></i>Confirm Order
                                            </button>
                                            <p class="text-center text-muted mt-2 small">
                                                <i class="fas fa-shield-alt me-1"></i>SSL Secured Payment
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    // Update template list
    updateTemplateList: function() {
        const templateList = document.getElementById('saved-templates');
        if (!templateList) return;

        const savedTemplates = Utils.storage.get('pageBuilder_templates', {});
        
        // Clear existing custom templates (keep predefined ones)
        const customTemplates = templateList.querySelectorAll('.custom-template');
        customTemplates.forEach(item => item.remove());
        
        // Add saved templates
        Object.values(savedTemplates).forEach(template => {
            const item = document.createElement('div');
            item.className = 'template-item custom-template';
            item.innerHTML = `
                <div class="template-name">${template.name}</div>
                <div class="template-description">${template.description}</div>
                <small class="text-muted">Created: ${Utils.formatDate(template.created)}</small>
            `;
            item.onclick = () => this.loadTemplateData(template);
            templateList.appendChild(item);
        });
    }
};

// Global functions for template management
window.saveTemplate = function() {
    Templates.saveTemplate();
};

window.importTemplate = function() {
    Templates.importTemplate();
};

window.loadCompleteTemplate = function() {
    if (window.pageBuilder.editor) {
        Templates.loadCompleteTemplate(window.pageBuilder.editor);
    }
};

window.loadMinimalTemplate = function() {
    if (window.pageBuilder.editor) {
        Templates.loadMinimalTemplate(window.pageBuilder.editor);
    }
};

// Export for use in other files
window.Templates = Templates;