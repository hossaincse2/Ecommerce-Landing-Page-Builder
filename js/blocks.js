// Block Definitions for GrapesJS
const Blocks = {
    // Add all blocks to the editor
    addAllBlocks: function(editor) {
        const blockManager = editor.BlockManager;
        
        // Clear existing blocks
        blockManager.getAll().reset();

        // Add all block categories
        this.addHeroBlocks(blockManager);
        this.addMediaBlocks(blockManager);
        this.addProductBlocks(blockManager);
        this.addCheckoutBlocks(blockManager);
        this.addBasicBlocks(blockManager);
        
        console.log('All blocks added successfully');
    },

    // Hero section blocks
    addHeroBlocks: function(blockManager) {
        blockManager.add('hero-ecommerce', {
            label: 'Product Hero',
            media: '<i class="fas fa-crown"></i>',
            content: `
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
            `,
            category: 'Hero'
        });

        blockManager.add('hero-minimal', {
            label: 'Minimal Hero',
            media: '<i class="fas fa-gem"></i>',
            content: `
                <section class="py-5 bg-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 mx-auto text-center">
                                <h1 class="h2 fw-bold mb-3">Simple. Elegant. Powerful.</h1>
                                <p class="lead text-muted mb-4">Discover our latest collection of premium products</p>
                                <button class="btn btn-primary btn-lg">Explore Products</button>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            category: 'Hero'
        });
    },

    // Media blocks
    addMediaBlocks: function(blockManager) {
        blockManager.add('video-section', {
            label: 'Video Player',
            media: '<i class="fas fa-video"></i>',
            content: `
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
            `,
            category: 'Media'
        });

        blockManager.add('image-gallery', {
            label: 'Image Gallery',
            media: '<i class="fas fa-images"></i>',
            content: `
                <section class="py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="text-center mb-4">
                                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&crop=center" 
                                         class="img-fluid rounded shadow main-image" alt="Main Product" style="max-height: 400px; object-fit: cover;">
                                </div>
                                <div class="d-flex justify-content-center gap-2 flex-wrap">
                                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center" 
                                         class="img-thumbnail gallery-thumb active" style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;" alt="Thumb 1">
                                    <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=100&h=100&fit=crop&crop=center" 
                                         class="img-thumbnail gallery-thumb" style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;" alt="Thumb 2">
                                    <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop&crop=center" 
                                         class="img-thumbnail gallery-thumb" style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;" alt="Thumb 3">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            category: 'Media'
        });

        blockManager.add('image-slider', {
            label: 'Image Slider',
            media: '<i class="fas fa-sliders-h"></i>',
            content: `
                <section class="py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <h2 class="h3 fw-bold text-center mb-4">Product Gallery</h2>
                                <div id="productCarousel${Utils.generateId()}" class="carousel slide shadow rounded" data-bs-ride="carousel">
                                    <div class="carousel-indicators">
                                        <button type="button" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide-to="0" class="active"></button>
                                        <button type="button" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide-to="1"></button>
                                        <button type="button" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide-to="2"></button>
                                        <button type="button" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide-to="3"></button>
                                    </div>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop&crop=center" 
                                                 class="d-block w-100" alt="Premium Headphones" style="height: 400px; object-fit: cover;">
                                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                                <h5>Premium Wireless Headphones</h5>
                                                <p>Experience ultimate sound quality with active noise cancellation</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=400&fit=crop&crop=center" 
                                                 class="d-block w-100" alt="Headphones Side View" style="height: 400px; object-fit: cover;">
                                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                                <h5>Ergonomic Design</h5>
                                                <p>Comfortable fit for extended listening sessions</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=400&fit=crop&crop=center" 
                                                 class="d-block w-100" alt="Bluetooth Speaker" style="height: 400px; object-fit: cover;">
                                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                                <h5>Portable Speaker</h5>
                                                <p>360° sound experience wherever you go</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=400&fit=crop&crop=center" 
                                                 class="d-block w-100" alt="Audio Setup" style="height: 400px; object-fit: cover;">
                                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                                <h5>Complete Audio Setup</h5>
                                                <p>Everything you need for the perfect audio experience</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide="next">
                                        <span class="carousel-control-next-icon"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                                
                                <div class="row mt-3 justify-content-center">
                                    <div class="col-auto">
                                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=60&fit=crop" 
                                             class="img-thumbnail carousel-thumb active" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide-to="0" 
                                             style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;" alt="Thumb 1">
                                    </div>
                                    <div class="col-auto">
                                        <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=80&h=60&fit=crop" 
                                             class="img-thumbnail carousel-thumb" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide-to="1" 
                                             style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;" alt="Thumb 2">
                                    </div>
                                    <div class="col-auto">
                                        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=80&h=60&fit=crop" 
                                             class="img-thumbnail carousel-thumb" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide-to="2" 
                                             style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;" alt="Thumb 3">
                                    </div>
                                    <div class="col-auto">
                                        <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=60&fit=crop" 
                                             class="img-thumbnail carousel-thumb" data-bs-target="#productCarousel${Utils.generateId()}" data-bs-slide-to="3" 
                                             style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;" alt="Thumb 4">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            category: 'Media'
        });
    },

    // Product blocks
    addProductBlocks: function(blockManager) {
        blockManager.add('product-description', {
            label: 'Product Description',
            media: '<i class="fas fa-align-left"></i>',
            content: `
                <section class="py-5 bg-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 mx-auto">
                                <h2 class="h3 fw-bold mb-4">Product Description</h2>
                                <p class="lead">Immerse yourself in exceptional audio quality with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology, these headphones deliver crisp highs, rich mids, and deep bass for an unparalleled listening experience.</p>
                                <p>The ergonomic design ensures maximum comfort during extended use, while the long-lasting battery provides up to 30 hours of continuous playback. Perfect for music lovers, professionals, and anyone who values superior sound quality.</p>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check text-success me-2"></i>Advanced Noise Cancellation</li>
                                    <li><i class="fas fa-check text-success me-2"></i>30-Hour Battery Life</li>
                                    <li><i class="fas fa-check text-success me-2"></i>Bluetooth 5.0 Connectivity</li>
                                    <li><i class="fas fa-check text-success me-2"></i>Ergonomic Design</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            category: 'Product'
        });

        blockManager.add('product-specs', {
            label: 'Specifications',
            media: '<i class="fas fa-list-alt"></i>',
            content: `
                <section class="py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 mx-auto">
                                <h2 class="h3 fw-bold text-center mb-4">Technical Specifications</h2>
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <tbody>
                                            <tr><td class="fw-semibold" style="width: 40%;">Battery Life</td><td>30 hours</td></tr>
                                            <tr><td class="fw-semibold">Connectivity</td><td>Bluetooth 5.0</td></tr>
                                            <tr><td class="fw-semibold">Noise Cancellation</td><td>Active ANC</td></tr>
                                            <tr><td class="fw-semibold">Weight</td><td>250g</td></tr>
                                            <tr><td class="fw-semibold">Charging Time</td><td>2 hours</td></tr>
                                            <tr><td class="fw-semibold">Frequency Response</td><td>20Hz - 20kHz</td></tr>
                                            <tr><td class="fw-semibold">Warranty</td><td>2 Years International</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            category: 'Product'
        });

        blockManager.add('customer-reviews', {
            label: 'Customer Reviews',
            media: '<i class="fas fa-star"></i>',
            content: `
                <section class="py-5 bg-light">
                    <div class="container">
                        <h2 class="h3 fw-bold text-center mb-5">Customer Reviews</h2>
                        <div class="row">
                            <div class="col-md-4 mb-4">
                                <div class="card h-100 shadow-sm">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h6 class="card-title mb-0">Sarah Johnson</h6>
                                            <span class="text-warning">★★★★★</span>
                                        </div>
                                        <p class="card-text">"Amazing sound quality! The noise cancellation works perfectly and the battery lasts all day. Best purchase I've made this year!"</p>
                                        <small class="text-muted">Verified Purchase</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="card h-100 shadow-sm">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h6 class="card-title mb-0">Mike Chen</h6>
                                            <span class="text-warning">★★★★☆</span>
                                        </div>
                                        <p class="card-text">"Great headphones for the price. Very comfortable and excellent build quality. Delivery was super fast!"</p>
                                        <small class="text-muted">Verified Purchase</small>
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
                                        <p class="card-text">"Love these headphones! Perfect for working from home. Crystal clear sound quality and great customer service."</p>
                                        <small class="text-muted">Verified Purchase</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            category: 'Product'
        });

        blockManager.add('product-variants', {
            label: 'Product Variants',
            media: '<i class="fas fa-cogs"></i>',
            content: `
                <section class="py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 mx-auto">
                                <h2 class="h3 fw-bold text-center mb-4">Choose Your Options</h2>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Color</label>
                                    <select class="form-select" id="colorSelect${Utils.generateId()}">
                                        <option value="black">Matte Black</option>
                                        <option value="white">Pearl White</option>
                                        <option value="blue">Ocean Blue</option>
                                        <option value="red">Ruby Red</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Size</label>
                                    <select class="form-select" id="sizeSelect${Utils.generateId()}">
                                        <option value="standard">Standard</option>
                                        <option value="large">Large (XL)</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Package Options</label>
                                    <select class="form-select package-select" id="packageSelect${Utils.generateId()}" data-price="4500">
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
                                    <strong>Total Price: <span class="total-price">${Utils.formatCurrency(4500)}</span></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            category: 'Product'
        });
    },

    // Checkout blocks
    addCheckoutBlocks: function(blockManager) {
        blockManager.add('checkout-form', {
            label: 'Simple Checkout',
            media: '<i class="fas fa-wpforms"></i>',
            content: `
                <section class="py-5 bg-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 mx-auto">
                                <h2 class="h3 fw-bold text-center mb-4">Order Information</h2>
                                <form class="checkout-form">
                                    <div class="mb-3">
                                        <label class="form-label">Full Name *</label>
                                        <input type="text" class="form-control" name="fullName" placeholder="Enter your full name" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Phone Number *</label>
                                        <input type="tel" class="form-control" name="phone" placeholder="+880 1XXX-XXXXXX" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Email Address</label>
                                        <input type="email" class="form-control" name="email" placeholder="your@email.com">
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label">Shipping Address *</label>
                                        <textarea class="form-control" name="address" rows="3" placeholder="House/Flat, Road, Area, City" required></textarea>
                                    </div>
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <h6 class="mb-0">Order Summary</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Product:</span>
                                                <span>Premium Headphones</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Quantity:</span>
                                                <span>1</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Subtotal:</span>
                                                <span>${Utils.formatCurrency(4500)}</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Delivery (Inside Dhaka):</span>
                                                <span>${Utils.formatCurrency(60)}</span>
                                            </div>
                                            <hr>
                                            <div class="d-flex justify-content-between fw-bold fs-5">
                                                <span>Total:</span>
                                                <span class="text-primary">${Utils.formatCurrency(4560)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-lg w-100">
                                        <i class="fas fa-shopping-cart me-2"></i>Confirm Order
                                    </button>
                                    <p class="text-center text-muted mt-2 small">
                                        <i class="fas fa-shield-alt me-1"></i>100% Secure & Safe
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            category: 'Checkout'
        });

        blockManager.add('advanced-checkout', {
            label: 'Multi-Product Checkout',
            media: '<i class="fas fa-shopping-bag"></i>',
            content: this.getAdvancedCheckoutContent(),
            category: 'Checkout'
        });

        blockManager.add('social-order', {
            label: 'Social Order',
            media: '<i class="fas fa-share-alt"></i>',
            content: `
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
                                    <a href="https://wa.me/8801XXXXXXXXX?text=Hi! I want to order Premium Wireless Headphones" target="_blank" class="btn btn-success btn-lg">
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
            `,
            category: 'Checkout'
        });
    },

    // Basic blocks
    addBasicBlocks: function(blockManager) {
        blockManager.add('text-block', {
            label: 'Text Block',
            media: '<i class="fas fa-font"></i>',
            content: `
                <div class="container py-4">
                    <div class="row">
                        <div class="col-12">
                            <p>This is a text block. You can edit this content by double-clicking or using the text editor panel.</p>
                        </div>
                    </div>
                </div>
            `,
            category: 'Basic'
        });

        blockManager.add('button-block', {
            label: 'Button',
            media: '<i class="fas fa-mouse-pointer"></i>',
            content: `
                <div class="container py-3">
                    <div class="row">
                        <div class="col-12 text-center">
                            <button class="btn btn-primary">Click Me</button>
                        </div>
                    </div>
                </div>
            `,
            category: 'Basic'
        });

        blockManager.add('container-block', {
            label: 'Container',
            media: '<i class="fas fa-square"></i>',
            content: `
                <div class="container py-4">
                    <div class="row">
                        <div class="col-12">
                            <div class="p-4 bg-light rounded">
                                <h4>Container Content</h4>
                                <p>Add your content here. This container is responsive and uses Bootstrap grid system.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            category: 'Basic'
        });

        blockManager.add('divider-block', {
            label: 'Divider',
            media: '<i class="fas fa-minus"></i>',
            content: `
                <div class="container py-3">
                    <div class="row">
                        <div class="col-12">
                            <hr class="my-4">
                        </div>
                    </div>
                </div>
            `,
            category: 'Basic'
        });
    },

    // Get advanced checkout content
    getAdvancedCheckoutContent: function() {
        const uniqueId = Utils.generateId();
        return `
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <h2 class="h3 fw-bold text-center mb-5">Complete Your Order</h2>
                            
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0"><i class="fas fa-shopping-cart me-2"></i>Select Products</h5>
                                </div>
                                <div class="card-body">
                                    <div class="product-item mb-3 p-3 border rounded" data-price="4500">
                                        <div class="row align-items-center">
                                            <div class="col-md-1">
                                                <input type="checkbox" class="form-check-input product-checkbox" id="product1_${uniqueId}">
                                            </div>
                                            <div class="col-md-3">
                                                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=100&fit=crop" 
                                                     class="img-fluid rounded" alt="Wireless Headphones">
                                            </div>
                                            <div class="col-md-5">
                                                <h6 class="mb-1">Premium Wireless Headphones</h6>
                                                <p class="text-muted mb-0 small">Active Noise Cancellation, 30h Battery</p>
                                                <strong class="text-primary">${Utils.formatCurrency(4500)}</strong>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="d-flex align-items-center gap-2">
                                                    <button class="btn btn-sm btn-outline-secondary qty-minus" disabled type="button">-</button>
                                                    <input type="number" class="form-control form-control-sm text-center qty-input" 
                                                           value="1" min="1" max="10" style="width: 60px;" disabled>
                                                    <button class="btn btn-sm btn-outline-secondary qty-plus" disabled type="button">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="product-item mb-3 p-3 border rounded" data-price="2800">
                                        <div class="row align-items-center">
                                            <div class="col-md-1">
                                                <input type="checkbox" class="form-check-input product-checkbox" id="product2_${uniqueId}">
                                            </div>
                                            <div class="col-md-3">
                                                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=100&fit=crop" 
                                                     class="img-fluid rounded" alt="Bluetooth Speaker">
                                            </div>
                                            <div class="col-md-5">
                                                <h6 class="mb-1">Portable Bluetooth Speaker</h6>
                                                <p class="text-muted mb-0 small">Waterproof, 360° Sound, 12h Battery</p>
                                                <strong class="text-primary">${Utils.formatCurrency(2800)}</strong>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="d-flex align-items-center gap-2">
                                                    <button class="btn btn-sm btn-outline-secondary qty-minus" disabled type="button">-</button>
                                                    <input type="number" class="form-control form-control-sm text-center qty-input" 
                                                           value="1" min="1" max="10" style="width: 60px;" disabled>
                                                    <button class="btn btn-sm btn-outline-secondary qty-plus" disabled type="button">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="product-item mb-3 p-3 border rounded" data-price="1200">
                                        <div class="row align-items-center">
                                            <div class="col-md-1">
                                                <input type="checkbox" class="form-check-input product-checkbox" id="product3_${uniqueId}">
                                            </div>
                                            <div class="col-md-3">
                                                <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=150&h=100&fit=crop" 
                                                     class="img-fluid rounded" alt="Phone Case">
                                            </div>
                                            <div class="col-md-5">
                                                <h6 class="mb-1">Premium Phone Case</h6>
                                                <p class="text-muted mb-0 small">Shockproof, Clear Design, All Models</p>
                                                <strong class="text-primary">${Utils.formatCurrency(1200)}</strong>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="d-flex align-items-center gap-2">
                                                    <button class="btn btn-sm btn-outline-secondary qty-minus" disabled type="button">-</button>
                                                    <input type="number" class="form-control form-control-sm text-center qty-input" 
                                                           value="1" min="1" max="10" style="width: 60px;" disabled>
                                                    <button class="btn btn-sm btn-outline-secondary qty-plus" disabled type="button">+</button>
                                                </div>
                                            </div>
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
                                            <form class="advanced-checkout-form">
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
                                                    <select class="form-select" id="deliveryArea_${uniqueId}">
                                                        <option value="60">Inside Dhaka (${Utils.formatCurrency(60)})</option>
                                                        <option value="120">Outside Dhaka (${Utils.formatCurrency(120)})</option>
                                                        <option value="150">Remote Areas (${Utils.formatCurrency(150)})</option>
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
                                            <div id="selectedProducts_${uniqueId}">
                                                <p class="text-muted text-center">No products selected</p>
                                            </div>
                                            <hr>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Subtotal:</span>
                                                <span id="subtotalAmount_${uniqueId}">${Utils.formatCurrency(0)}</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Delivery Charge:</span>
                                                <span id="deliveryCharge_${uniqueId}">${Utils.formatCurrency(60)}</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2 text-success">
                                                <span>Discount:</span>
                                                <span id="discountAmount_${uniqueId}">${Utils.formatCurrency(0)}</span>
                                            </div>
                                            <hr>
                                            <div class="d-flex justify-content-between fw-bold fs-4">
                                                <span>Total:</span>
                                                <span class="text-primary" id="totalAmount_${uniqueId}">${Utils.formatCurrency(60)}</span>
                                            </div>
                                            
                                            <div class="mt-3">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Promo code" id="promoCode_${uniqueId}">
                                                    <button class="btn btn-outline-secondary" type="button" onclick="Components.applyPromoCode()">Apply</button>
                                                </div>
                                            </div>

                                            <button type="submit" class="btn btn-primary btn-lg w-100 mt-4" id="confirmOrderBtn_${uniqueId}" disabled>
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
    }
};

// Export for use in other files
window.Blocks = Blocks;