// Page Builder JavaScript
let editor;

// Initialize GrapesJS when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEditor();
    setupEventListeners();
    loadSampleTemplate();
});

function initializeEditor() {
    editor = grapesjs.init({
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
                {
                    name: 'Desktop',
                    width: ''
                },
                {
                    name: 'Tablet',
                    width: '768px',
                    widthMedia: '992px'
                },
                {
                    name: 'Mobile',
                    width: '375px',
                    widthMedia: '768px'
                }
            ]
        }
    });

    // Add custom blocks
    addCustomBlocks();
    
    // Setup auto-save
    setupAutoSave();
    
    console.log('GrapesJS Editor initialized successfully');
}

function addCustomBlocks() {
    const blockManager = editor.BlockManager;
    
    // Clear existing blocks
    blockManager.getAll().reset();

    // Hero Sections
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

    // Video Section
    blockManager.add('video-section', {
        label: 'Video Player',
        media: '<i class="fas fa-video"></i>',
        content: `
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="h3 fw-bold text-center mb-4">Product Demo Video</h2>
                            <div class="ratio ratio-16x9 rounded shadow">
                                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `,
        category: 'Media'
    });

    // Image Slider/Carousel
    blockManager.add('image-slider', {
        label: 'Image Slider',
        media: '<i class="fas fa-images"></i>',
        content: `
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
                                             class="d-block w-100" alt="Premium Headphones - Front View" style="height: 400px; object-fit: cover;">
                                        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                            <h5>Premium Wireless Headphones</h5>
                                            <p>Experience ultimate sound quality with active noise cancellation</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=400&fit=crop&crop=center" 
                                             class="d-block w-100" alt="Headphones - Side View" style="height: 400px; object-fit: cover;">
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
                                <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                    <span class="carousel-control-next-icon"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            
                            <!-- Thumbnail Navigation -->
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
            
            <script>
                // Thumbnail click handlers
                document.querySelectorAll('.carousel-thumb').forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        // Remove active class from all thumbnails
                        document.querySelectorAll('.carousel-thumb').forEach(t => t.classList.remove('active'));
                        // Add active class to clicked thumbnail
                        this.classList.add('active');
                    });
                });

                // Update active thumbnail when carousel slides
                document.getElementById('productCarousel').addEventListener('slid.bs.carousel', function(event) {
                    const activeIndex = event.to;
                    document.querySelectorAll('.carousel-thumb').forEach((thumb, index) => {
                        thumb.classList.toggle('active', index === activeIndex);
                    });
                });
            </script>
        `,
        category: 'Media'
    });

    // Image Gallery
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
                                     class="img-thumbnail gallery-thumb" style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;" alt="Thumb 1">
                                <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=100&h=100&fit=crop&crop=center" 
                                     class="img-thumbnail gallery-thumb" style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;" alt="Thumb 2">
                                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop&crop=center" 
                                     class="img-thumbnail gallery-thumb" style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;" alt="Thumb 3">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <script>
                document.querySelectorAll('.gallery-thumb').forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        const mainImg = document.querySelector('.main-image');
                        const newSrc = this.src.replace('w=100&h=100', 'w=600&h=400');
                        mainImg.src = newSrc;
                        
                        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('border-primary'));
                        this.classList.add('border-primary');
                    });
                });
            </script>
        `,
        category: 'Media'
    });

    // Product Description
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

    // Specifications
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

    // Customer Reviews
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

    // Product Variants
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
                                <select class="form-select" id="colorSelect">
                                    <option value="black">Matte Black</option>
                                    <option value="white">Pearl White</option>
                                    <option value="blue">Ocean Blue</option>
                                    <option value="red">Ruby Red</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Size</label>
                                <select class="form-select" id="sizeSelect">
                                    <option value="standard">Standard</option>
                                    <option value="large">Large (XL)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Package Options</label>
                                <select class="form-select" id="packageSelect" onchange="updatePrice()">
                                    <option value="single" data-price="4500">Single Unit - ৳4,500</option>
                                    <option value="combo" data-price="7500">Combo Pack (2 Units) - ৳7,500</option>
                                    <option value="family" data-price="10500">Family Pack (3 Units) - ৳10,500</option>
                                </select>
                            </div>
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <label class="form-label fw-semibold mb-0">Quantity:</label>
                                <button class="btn btn-outline-primary btn-sm" onclick="changeQuantity(-1)">-</button>
                                <input type="number" class="form-control text-center" value="1" min="1" max="10" style="width: 80px;" id="quantityInput" onchange="updatePrice()">
                                <button class="btn btn-outline-primary btn-sm" onclick="changeQuantity(1)">+</button>
                            </div>
                            <div class="alert alert-info">
                                <strong>Total Price: <span id="totalPrice">৳4,500</span></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <script>
                function changeQuantity(delta) {
                    const input = document.getElementById('quantityInput');
                    const newValue = parseInt(input.value) + delta;
                    if (newValue >= 1 && newValue <= 10) {
                        input.value = newValue;
                        updatePrice();
                    }
                }
                
                function updatePrice() {
                    const packageSelect = document.getElementById('packageSelect');
                    const quantityInput = document.getElementById('quantityInput');
                    const selectedOption = packageSelect.options[packageSelect.selectedIndex];
                    
                    const unitPrice = parseInt(selectedOption.getAttribute('data-price'));
                    const quantity = parseInt(quantityInput.value);
                    const total = unitPrice * quantity;
                    
                    document.getElementById('totalPrice').textContent = '৳' + total.toLocaleString();
                }
            </script>
        `,
        category: 'Product'
    });

    // Simple Checkout Form
    blockManager.add('checkout-form', {
        label: 'Simple Checkout',
        media: '<i class="fas fa-wpforms"></i>',
        content: `
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 mx-auto">
                            <h2 class="h3 fw-bold text-center mb-4">Order Information</h2>
                            <form id="orderForm">
                                <div class="mb-3">
                                    <label class="form-label">Full Name *</label>
                                    <input type="text" class="form-control" placeholder="Enter your full name" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Phone Number *</label>
                                    <input type="tel" class="form-control" placeholder="+880 1XXX-XXXXXX" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email Address</label>
                                    <input type="email" class="form-control" placeholder="your@email.com">
                                </div>
                                <div class="mb-4">
                                    <label class="form-label">Shipping Address *</label>
                                    <textarea class="form-control" rows="3" placeholder="House/Flat, Road, Area, City" required></textarea>
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
                                            <span>৳4,500</span>
                                        </div>
                                        <div class="d-flex justify-content-between mb-2">
                                            <span>Delivery (Inside Dhaka):</span>
                                            <span>৳60</span>
                                        </div>
                                        <hr>
                                        <div class="d-flex justify-content-between fw-bold fs-5">
                                            <span>Total:</span>
                                            <span class="text-primary">৳4,560</span>
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
            <script>
                document.getElementById('orderForm').addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Order submitted successfully! We will contact you within 24 hours.');
                });
            </script>
        `,
        category: 'Checkout'
    });

    // Advanced Multi-Product Checkout
    blockManager.add('advanced-checkout', {
        label: 'Multi-Product Checkout',
        media: '<i class="fas fa-shopping-bag"></i>',
        content: `
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <h2 class="h3 fw-bold text-center mb-5">Complete Your Order</h2>
                            
                            <!-- Product Selection -->
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0"><i class="fas fa-shopping-cart me-2"></i>Select Products</h5>
                                </div>
                                <div class="card-body">
                                    <div class="product-item mb-3 p-3 border rounded" data-price="4500">
                                        <div class="row align-items-center">
                                            <div class="col-md-1">
                                                <input type="checkbox" class="form-check-input product-checkbox" id="product1">
                                            </div>
                                            <div class="col-md-3">
                                                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=100&fit=crop" 
                                                     class="img-fluid rounded" alt="Wireless Headphones">
                                            </div>
                                            <div class="col-md-5">
                                                <h6 class="mb-1">Premium Wireless Headphones</h6>
                                                <p class="text-muted mb-0 small">Active Noise Cancellation, 30h Battery</p>
                                                <strong class="text-primary">৳4,500</strong>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="d-flex align-items-center gap-2">
                                                    <button class="btn btn-sm btn-outline-secondary qty-minus" disabled>-</button>
                                                    <input type="number" class="form-control form-control-sm text-center qty-input" 
                                                           value="1" min="1" max="10" style="width: 60px;" disabled>
                                                    <button class="btn btn-sm btn-outline-secondary qty-plus" disabled>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="product-item mb-3 p-3 border rounded" data-price="2800">
                                        <div class="row align-items-center">
                                            <div class="col-md-1">
                                                <input type="checkbox" class="form-check-input product-checkbox" id="product2">
                                            </div>
                                            <div class="col-md-3">
                                                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=100&fit=crop" 
                                                     class="img-fluid rounded" alt="Bluetooth Speaker">
                                            </div>
                                            <div class="col-md-5">
                                                <h6 class="mb-1">Portable Bluetooth Speaker</h6>
                                                <p class="text-muted mb-0 small">Waterproof, 360° Sound, 12h Battery</p>
                                                <strong class="text-primary">৳2,800</strong>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="d-flex align-items-center gap-2">
                                                    <button class="btn btn-sm btn-outline-secondary qty-minus" disabled>-</button>
                                                    <input type="number" class="form-control form-control-sm text-center qty-input" 
                                                           value="1" min="1" max="10" style="width: 60px;" disabled>
                                                    <button class="btn btn-sm btn-outline-secondary qty-plus" disabled>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="product-item mb-3 p-3 border rounded" data-price="1200">
                                        <div class="row align-items-center">
                                            <div class="col-md-1">
                                                <input type="checkbox" class="form-check-input product-checkbox" id="product3">
                                            </div>
                                            <div class="col-md-3">
                                                <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=150&h=100&fit=crop" 
                                                     class="img-fluid rounded" alt="Phone Case">
                                            </div>
                                            <div class="col-md-5">
                                                <h6 class="mb-1">Premium Phone Case</h6>
                                                <p class="text-muted mb-0 small">Shockproof, Clear Design, All Models</p>
                                                <strong class="text-primary">৳1,200</strong>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="d-flex align-items-center gap-2">
                                                    <button class="btn btn-sm btn-outline-secondary qty-minus" disabled>-</button>
                                                    <input type="number" class="form-control form-control-sm text-center qty-input" 
                                                           value="1" min="1" max="10" style="width: 60px;" disabled>
                                                    <button class="btn btn-sm btn-outline-secondary qty-plus" disabled>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-7">
                                    <!-- Customer Information -->
                                    <div class="card">
                                        <div class="card-header">
                                            <h5 class="mb-0"><i class="fas fa-user me-2"></i>Customer Information</h5>
                                        </div>
                                        <div class="card-body">
                                            <form id="advancedOrderForm">
                                                <div class="row">
                                                    <div class="col-md-6 mb-3">
                                                        <label class="form-label">First Name *</label>
                                                        <input type="text" class="form-control" placeholder="First name" required>
                                                    </div>
                                                    <div class="col-md-6 mb-3">
                                                        <label class="form-label">Last Name *</label>
                                                        <input type="text" class="form-control" placeholder="Last name" required>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Phone Number *</label>
                                                    <input type="tel" class="form-control" placeholder="+880 1XXX-XXXXXX" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Email Address</label>
                                                    <input type="email" class="form-control" placeholder="your@email.com">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Shipping Address *</label>
                                                    <textarea class="form-control" rows="3" placeholder="House/Flat, Road, Area, City" required></textarea>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Delivery Area</label>
                                                    <select class="form-select" id="deliveryArea" onchange="updateDeliveryCharge()">
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
                                    <!-- Order Summary -->
                                    <div class="card">
                                        <div class="card-header">
                                            <h5 class="mb-0"><i class="fas fa-receipt me-2"></i>Order Summary</h5>
                                        </div>
                                        <div class="card-body">
                                            <div id="selectedProducts">
                                                <p class="text-muted text-center">No products selected</p>
                                            </div>
                                            <hr>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Subtotal:</span>
                                                <span id="subtotalAmount">৳0</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Delivery Charge:</span>
                                                <span id="deliveryCharge">৳60</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2 text-success">
                                                <span>Discount:</span>
                                                <span id="discountAmount">৳0</span>
                                            </div>
                                            <hr>
                                            <div class="d-flex justify-content-between fw-bold fs-4">
                                                <span>Total:</span>
                                                <span class="text-primary" id="totalAmount">৳60</span>
                                            </div>
                                            
                                            <!-- Promo Code -->
                                            <div class="mt-3">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Promo code" id="promoCode">
                                                    <button class="btn btn-outline-secondary" onclick="applyPromoCode()">Apply</button>
                                                </div>
                                            </div>

                                            <button type="submit" class="btn btn-primary btn-lg w-100 mt-4" id="confirmOrderBtn" disabled>
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

            <script>
                // Product selection and calculation logic
                function initAdvancedCheckout() {
                    const checkboxes = document.querySelectorAll('.product-checkbox');
                    const confirmBtn = document.getElementById('confirmOrderBtn');
                    
                    checkboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', function() {
                            const productItem = this.closest('.product-item');
                            const qtyControls = productItem.querySelectorAll('.qty-minus, .qty-plus, .qty-input');
                            
                            qtyControls.forEach(control => {
                                control.disabled = !this.checked;
                            });
                            
                            updateOrderSummary();
                        });
                    });

                    // Quantity controls
                    document.querySelectorAll('.qty-minus').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const input = this.nextElementSibling;
                            if (input.value > 1) {
                                input.value = parseInt(input.value) - 1;
                                updateOrderSummary();
                            }
                        });
                    });

                    document.querySelectorAll('.qty-plus').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const input = this.previousElementSibling;
                            if (input.value < 10) {
                                input.value = parseInt(input.value) + 1;
                                updateOrderSummary();
                            }
                        });
                    });

                    document.querySelectorAll('.qty-input').forEach(input => {
                        input.addEventListener('change', updateOrderSummary);
                    });
                }

                function updateOrderSummary() {
                    const selectedProducts = document.getElementById('selectedProducts');
                    const subtotalElement = document.getElementById('subtotalAmount');
                    const totalElement = document.getElementById('totalAmount');
                    const confirmBtn = document.getElementById('confirmOrderBtn');
                    
                    let subtotal = 0;
                    let hasSelected = false;
                    let summaryHTML = '';

                    document.querySelectorAll('.product-checkbox:checked').forEach(checkbox => {
                        hasSelected = true;
                        const productItem = checkbox.closest('.product-item');
                        const price = parseInt(productItem.dataset.price);
                        const qty = parseInt(productItem.querySelector('.qty-input').value);
                        const productName = productItem.querySelector('h6').textContent;
                        const productTotal = price * qty;
                        
                        subtotal += productTotal;
                        
                        summaryHTML += \`
                            <div class="d-flex justify-content-between mb-1">
                                <span>\${productName} (×\${qty})</span>
                                <span>৳\${productTotal.toLocaleString()}</span>
                            </div>
                        \`;
                    });

                    if (hasSelected) {
                        selectedProducts.innerHTML = summaryHTML;
                        confirmBtn.disabled = false;
                    } else {
                        selectedProducts.innerHTML = '<p class="text-muted text-center">No products selected</p>';
                        confirmBtn.disabled = true;
                    }

                    subtotalElement.textContent = '৳' + subtotal.toLocaleString();
                    
                    const deliveryCharge = parseInt(document.getElementById('deliveryArea').value);
                    const discount = parseInt(document.getElementById('discountAmount').textContent.replace('৳', '').replace(',', '')) || 0;
                    const total = subtotal + deliveryCharge - discount;
                    
                    totalElement.textContent = '৳' + total.toLocaleString();
                }

                function updateDeliveryCharge() {
                    const deliveryArea = document.getElementById('deliveryArea');
                    const deliveryCharge = document.getElementById('deliveryCharge');
                    
                    deliveryCharge.textContent = '৳' + deliveryArea.value;
                    updateOrderSummary();
                }

                function applyPromoCode() {
                    const promoCode = document.getElementById('promoCode').value.toUpperCase();
                    const discountElement = document.getElementById('discountAmount');
                    
                    let discount = 0;
                    switch(promoCode) {
                        case 'SAVE10':
                            discount = 500;
                            alert('Promo code applied! ৳500 discount');
                            break;
                        case 'FIRST20':
                            discount = 1000;
                            alert('Promo code applied! ৳1000 discount');
                            break;
                        case 'BULK30':
                            discount = 1500;
                            alert('Promo code applied! ৳1500 discount');
                            break;
                        default:
                            alert('Invalid promo code');
                            return;
                    }
                    
                    discountElement.textContent = '৳' + discount.toLocaleString();
                    updateOrderSummary();
                }

                // Initialize when DOM loads
                document.addEventListener('DOMContentLoaded', function() {
                    if (document.getElementById('advancedOrderForm')) {
                        initAdvancedCheckout();
                    }
                });

                // Initialize immediately for dynamic content
                setTimeout(initAdvancedCheckout, 100);
            </script>
        `,
        category: 'Checkout'
    });

    // Social Order Buttons
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

    // Basic Elements
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

    console.log('Custom blocks added successfully');
}

function setupEventListeners() {
    // Template block click handlers
    document.querySelectorAll('.template-block').forEach(block => {
        block.addEventListener('click', function() {
            const blockId = this.dataset.block;
            addBlockToCanvas(blockId);
        });
    });

    // Image upload handler
    const imageUpload = document.getElementById('image-upload');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
}

function addBlockToCanvas(blockId) {
    if (!editor) {
        console.error('Editor not initialized');
        return;
    }

    const blockManager = editor.BlockManager;
    const block = blockManager.get(blockId);
    
    if (block) {
        editor.DomComponents.addComponent(block.get('content'));
        showMessage('Block added successfully!', 'success');
    } else {
        showMessage('Block not found: ' + blockId, 'error');
    }
}

function setupAutoSave() {
    let autoSaveTimer;
    
    editor.on('component:update storage:start storage:end', function() {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            const autoSaveData = {
                html: editor.getHtml(),
                css: editor.getCss(),
                components: editor.getProjectData(),
                timestamp: Date.now()
            };
            localStorage.setItem('pageBuilder_autoSave', JSON.stringify(autoSaveData));
            console.log('Auto-saved at:', new Date().toLocaleTimeString());
        }, 3000);
    });
}

// Tab Management
function switchTab(tabName) {
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

// Device Management
function setDevice(device) {
    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.device === device) {
            btn.classList.add('active');
        }
    });
    
    if (editor) {
        editor.setDevice(device);
    }
}

// Canvas Management
function clearCanvas() {
    if (confirm('Are you sure you want to clear the canvas? This will remove all content.')) {
        editor.DomComponents.clear();
        editor.CssComposer.clear();
        showMessage('Canvas cleared successfully!', 'success');
    }
}

// Export Functionality
function exportHTML() {
    if (!editor) {
        showMessage('Editor not initialized', 'error');
        return;
    }

    const html = editor.getHtml();
    const css = editor.getCss();
    
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
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ecommerce-page-' + Date.now() + '.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('Page exported successfully!', 'success');
}

// Preview Functionality
function previewPage() {
    if (!editor) {
        showMessage('Editor not initialized', 'error');
        return;
    }

    const html = editor.getHtml();
    const css = editor.getCss();
    
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
</body>
</html>`;

    const newWindow = window.open('', '_blank');
    newWindow.document.write(fullHTML);
    newWindow.document.close();
}

// Modal Management
function showSaveModal() {
    document.getElementById('save-modal').classList.add('show');
}

function showImportModal() {
    document.getElementById('import-modal').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Template Management
function saveTemplate() {
    const name = document.getElementById('template-name').value.trim();
    const description = document.getElementById('template-description').value.trim();
    
    if (!name) {
        showMessage('Please enter a template name', 'error');
        return;
    }
    
    const templateData = {
        id: Date.now().toString(),
        name: name,
        description: description,
        html: editor.getHtml(),
        css: editor.getCss(),
        components: editor.getProjectData(),
        created: new Date().toISOString()
    };
    
    try {
        // Save to localStorage
        const savedTemplates = JSON.parse(localStorage.getItem('pageBuilder_templates') || '{}');
        savedTemplates[templateData.id] = templateData;
        localStorage.setItem('pageBuilder_templates', JSON.stringify(savedTemplates));
        
        showMessage('Template saved successfully!', 'success');
        closeModal('save-modal');
        
        // Clear form
        document.getElementById('template-name').value = '';
        document.getElementById('template-description').value = '';
        
        // Update template list
        updateTemplateList();
    } catch (error) {
        showMessage('Error saving template: ' + error.message, 'error');
    }
}

function importTemplate() {
    const fileInput = document.getElementById('import-file');
    const textInput = document.getElementById('import-data');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const templateData = JSON.parse(e.target.result);
                loadTemplateData(templateData);
                closeModal('import-modal');
                showMessage('Template imported successfully!', 'success');
            } catch (error) {
                showMessage('Invalid JSON file', 'error');
            }
        };
        reader.readAsText(file);
    } else if (textInput.value.trim()) {
        try {
            const templateData = JSON.parse(textInput.value);
            loadTemplateData(templateData);
            closeModal('import-modal');
            showMessage('Template imported successfully!', 'success');
        } catch (error) {
            showMessage('Invalid JSON data', 'error');
        }
    } else {
        showMessage('Please select a file or paste JSON data', 'error');
    }
}

function loadTemplateData(templateData) {
    if (templateData.components) {
        editor.loadProjectData(templateData.components);
    } else if (templateData.html) {
        editor.setComponents(templateData.html);
        if (templateData.css) {
            editor.setStyle(templateData.css);
        }
    }
}

// Pre-defined Template Loaders
function loadCompleteTemplate() {
    if (!editor) {
        showMessage('Editor not initialized', 'error');
        return;
    }

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
                        <div class="ratio ratio-16x9 rounded shadow">
                            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
                        </div>
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
                                </div>
                                <div class="carousel-item">
                                    <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=400&fit=crop&crop=center" 
                                         class="d-block w-100" alt="Headphones Side View" style="height: 400px; object-fit: cover;">
                                </div>
                                <div class="carousel-item">
                                    <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=400&fit=crop&crop=center" 
                                         class="d-block w-100" alt="Audio Equipment" style="height: 400px; object-fit: cover;">
                                </div>
                                <div class="carousel-item">
                                    <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=400&fit=crop&crop=center" 
                                         class="d-block w-100" alt="Setup" style="height: 400px; object-fit: cover;">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>
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
                            <li><i class="fas fa-check text-success me-2"></i>Advanced Noise Cancellation</li>
                            <li><i class="fas fa-check text-success me-2"></i>30-Hour Battery Life</li>
                            <li><i class="fas fa-check text-success me-2"></i>Bluetooth 5.0 Connectivity</li>
                            <li><i class="fas fa-check text-success me-2"></i>Ergonomic Design</li>
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
                                    <tr><td class="fw-semibold" style="width: 40%;">Battery Life</td><td>30 hours</td></tr>
                                    <tr><td class="fw-semibold">Connectivity</td><td>Bluetooth 5.0</td></tr>
                                    <tr><td class="fw-semibold">Noise Cancellation</td><td>Active ANC</td></tr>
                                    <tr><td class="fw-semibold">Weight</td><td>250g</td></tr>
                                    <tr><td class="fw-semibold">Warranty</td><td>2 Years International</td></tr>
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
                <h2 class="h3 fw-bold text-center mb-5">Customer Reviews</h2>
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h6 class="card-title mb-0">Sarah Johnson</h6>
                                    <span class="text-warning">★★★★★</span>
                                </div>
                                <p class="card-text">"Amazing sound quality! The noise cancellation works perfectly and the battery lasts all day."</p>
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
                                <p class="card-text">"Great headphones for the price. Very comfortable and excellent build quality."</p>
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
                                <p class="card-text">"Love these headphones! Perfect for working from home. Crystal clear sound quality."</p>
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
                            <select class="form-select" id="colorSelect">
                                <option value="black">Matte Black</option>
                                <option value="white">Pearl White</option>
                                <option value="blue">Ocean Blue</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Package Options</label>
                            <select class="form-select" id="packageSelect">
                                <option value="single" data-price="4500">Single Unit - ৳4,500</option>
                                <option value="combo" data-price="7500">Combo Pack (2 Units) - ৳7,500</option>
                                <option value="family" data-price="10500">Family Pack (3 Units) - ৳10,500</option>
                            </select>
                        </div>
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <label class="form-label fw-semibold mb-0">Quantity:</label>
                            <button class="btn btn-outline-primary btn-sm">-</button>
                            <input type="number" class="form-control text-center" value="1" min="1" max="10" style="width: 80px;">
                            <button class="btn btn-outline-primary btn-sm">+</button>
                        </div>
                        <div class="alert alert-info">
                            <strong>Total Price: ৳4,500</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Advanced Checkout -->
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
                                        <span class="badge bg-primary">Qty: 1</span>
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
                                        <form>
                                            <div class="row">
                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label">First Name *</label>
                                                    <input type="text" class="form-control" placeholder="First name" required>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label">Last Name *</label>
                                                    <input type="text" class="form-control" placeholder="Last name" required>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Phone Number *</label>
                                                <input type="tel" class="form-control" placeholder="+880 1XXX-XXXXXX" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Email Address</label>
                                                <input type="email" class="form-control" placeholder="your@email.com">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Shipping Address *</label>
                                                <textarea class="form-control" rows="3" placeholder="House/Flat, Road, Area, City" required></textarea>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Social Order Buttons -->
        <section class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 mx-auto text-center">
                        <h2 class="h4 fw-bold mb-4">Quick Order via Social Media</h2>
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
                    </div>
                </div>
            </div>
        </section>
    `;
    
    editor.setComponents(completeTemplate);
    showMessage('Complete eCommerce template loaded with all sections!', 'success');
}

function loadMinimalTemplate() {
    if (!editor) {
        showMessage('Editor not initialized', 'error');
        return;
    }

    const minimalTemplate = `
        <!-- Minimal Hero -->
        <section class="py-5 bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto text-center">
                        <h1 class="h2 fw-bold mb-3">Simple. Elegant. Powerful.</h1>
                        <p class="lead text-muted mb-4">Discover our latest collection of premium audio products</p>
                        <button class="btn btn-primary btn-lg">Explore Products</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Product Showcase -->
        <section class="py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&crop=center" 
                             class="img-fluid rounded shadow" alt="Premium Headphones">
                    </div>
                    <div class="col-md-6">
                        <h2 class="h3 fw-bold mb-3">Premium Wireless Headphones</h2>
                        <p class="text-muted mb-4">Experience exceptional audio quality with our flagship headphones featuring advanced noise cancellation and 30-hour battery life.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i>Active Noise Cancellation</li>
                            <li><i class="fas fa-check text-success me-2"></i>30-Hour Battery Life</li>
                            <li><i class="fas fa-check text-success me-2"></i>Bluetooth 5.0</li>
                            <li><i class="fas fa-check text-success me-2"></i>Premium Build Quality</li>
                        </ul>
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <span class="h4 text-primary fw-bold mb-0">৳4,500</span>
                            <span class="text-muted text-decoration-line-through">৳6,000</span>
                            <span class="badge bg-danger">25% OFF</span>
                        </div>
                        <button class="btn btn-primary btn-lg">Add to Cart</button>
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
                                    <div class="text-warning mb-2">★★★★★</div>
                                    <p class="fst-italic">"Absolutely love these headphones! Best purchase I've made this year."</p>
                                    <small class="text-muted">- Sarah J.</small>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="text-center">
                                    <div class="text-warning mb-2">★★★★★</div>
                                    <p class="fst-italic">"Excellent sound quality and very comfortable to wear."</p>
                                    <small class="text-muted">- Mike C.</small>
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
                                <form>
                                    <div class="mb-3">
                                        <label class="form-label">Your Name</label>
                                        <input type="text" class="form-control" placeholder="Enter your name" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Phone Number</label>
                                        <input type="tel" class="form-control" placeholder="+880 1XXX-XXXXXX" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Delivery Address</label>
                                        <textarea class="form-control" rows="2" placeholder="Your address" required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <div class="d-flex justify-content-between">
                                            <span>Product Total:</span>
                                            <span>৳4,500</span>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <span>Delivery:</span>
                                            <span>৳60</span>
                                        </div>
                                        <hr>
                                        <div class="d-flex justify-content-between fw-bold">
                                            <span>Total:</span>
                                            <span>৳4,560</span>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100 btn-lg">
                                        Order Now
                                    </button>
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
                        <h3 class="mb-4">Need Help? Contact Us</h3>
                        <div class="row justify-content-center">
                            <div class="col-md-3 mb-3">
                                <a href="https://wa.me/8801XXXXXXXXX" target="_blank" class="btn btn-light">
                                    <i class="fab fa-whatsapp me-2"></i>WhatsApp
                                </a>
                            </div>
                            <div class="col-md-3 mb-3">
                                <a href="tel:+8801XXXXXXXXX" class="btn btn-light">
                                    <i class="fas fa-phone me-2"></i>Call Us
                                </a>
                            </div>
                            <div class="col-md-3 mb-3">
                                <a href="mailto:info@example.com" class="btn btn-light">
                                    <i class="fas fa-envelope me-2"></i>Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    editor.setComponents(minimalTemplate);
    showMessage('Minimal product template loaded!', 'success');
}

// Asset Management
function handleImageUpload(event) {
    const files = event.target.files;
    const assetGrid = document.getElementById('asset-manager');
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Add to GrapesJS asset manager
                editor.AssetManager.add({
                    src: e.target.result,
                    name: file.name,
                    type: 'image'
                });
                
                // Add to our asset grid
                const assetItem = document.createElement('div');
                assetItem.className = 'asset-item';
                assetItem.innerHTML = `<img src="${e.target.result}" alt="${file.name}" onclick="insertImage('${e.target.result}')">`;
                assetGrid.appendChild(assetItem);
            };
            reader.readAsDataURL(file);
        }
    });
    
    showMessage(`${files.length} image(s) uploaded successfully!`, 'success');
}

function insertImage(src) {
    const imageComponent = `<div class="container py-3"><div class="row"><div class="col-12 text-center"><img src="${src}" class="img-fluid rounded" alt="Uploaded Image"></div></div></div>`;
    editor.DomComponents.addComponent(imageComponent);
    showMessage('Image added to canvas!', 'success');
}

// Utility Functions
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    // Insert at top of sidebar content
    const sidebarContent = document.querySelector('.sidebar-content');
    sidebarContent.insertBefore(messageEl, sidebarContent.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 3000);
}

function updateTemplateList() {
    const templateList = document.getElementById('saved-templates');
    const savedTemplates = JSON.parse(localStorage.getItem('pageBuilder_templates') || '{}');
    
    // Clear existing items (except predefined ones)
    const predefinedItems = templateList.querySelectorAll('.template-item');
    
    // Add saved templates
    Object.values(savedTemplates).forEach(template => {
        const item = document.createElement('div');
        item.className = 'template-item';
        item.innerHTML = `
            <div class="template-name">${template.name}</div>
            <div class="template-description">${template.description}</div>
        `;
        item.onclick = () => loadTemplateData(template);
        templateList.appendChild(item);
    });
}

// Load sample template on startup
function loadSampleTemplate() {
    setTimeout(() => {
        if (editor) {
            loadCompleteTemplate();
        }
    }, 1000);
}

// Load auto-save on startup
window.addEventListener('load', function() {
    const autoSaveData = localStorage.getItem('pageBuilder_autoSave');
    if (autoSaveData && editor) {
        try {
            const data = JSON.parse(autoSaveData);
            if (data.components && confirm('Found auto-saved data. Do you want to restore it?')) {
                editor.loadProjectData(data.components);
                showMessage('Auto-saved data restored!', 'success');
            }
        } catch (error) {
            console.error('Error loading auto-save data:', error);
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                showSaveModal();
                break;
            case 'e':
                e.preventDefault();
                exportHTML();
                break;
            case 'p':
                e.preventDefault();
                previewPage();
                break;
        }
    }
});

console.log('Page Builder JavaScript loaded successfully');