# eCommerce Page Builder Setup Guide

## 📁 File Structure
```
project-folder/
├── index.html              (Main page builder interface)
├── pagebuilder.css         (All styling for the page builder)
├── js/                     (JavaScript modules)
│   ├── utils.js           (Utility functions and helpers)
│   ├── main.js            (Main PageBuilder class)
│   ├── components.js      (Component interactions & events)
│   ├── blocks.js          (GrapesJS block definitions)
│   └── templates.js       (Template management)
└── README.md              (This file)
```

## 🚀 Quick Start

1. **Create the folder structure** as shown above
2. **Download all files** and place them in the correct locations
3. **Open `index.html`** in your web browser
4. **Start building!** Click components to add them to the canvas

## ✨ Recent Fixes

### 🔧 **Product Variants Component**
- **Fixed**: Total price calculation now works correctly
- **Fixed**: +/- buttons properly update totals
- **Fixed**: Package selection changes update prices
- **Fixed**: Multiple price extraction methods for robustness

### 🛒 **Multi-Product Checkout Component**  
- **Fixed**: +/- buttons now work properly for all products
- **Fixed**: Total calculation includes delivery charges correctly
- **Fixed**: Checkbox enables/disables quantity controls properly
- **Fixed**: Real-time updates for subtotal + delivery + discount = total
- **Fixed**: Visual feedback when buttons are enabled/disabled

### 🎬 **Video Component Editing**
- **Double-click any video** to change the YouTube URL
- **Hover over videos** to see edit overlay
- **Paste any YouTube URL** or just the video ID
- **Real-time preview** of the new video

### ⚡ **Enhanced Quantity Controls**
- **Working +/- buttons** in all components (Multi-Product Checkout AND Product Variants)
- **Real-time price calculations** as you change quantities
- **Smart validation** (min/max limits)
- **Auto-updates** order totals instantly
- **Package selection** updates prices automatically

### 🗂️ **Modular JavaScript Architecture**
- **utils.js**: Currency formatting, validation, storage helpers
- **main.js**: Core PageBuilder class and initialization
- **components.js**: All component interactions and calculations
- **blocks.js**: GrapesJS block definitions
- **templates.js**: Template loading and management

## 🎯 **How to Use New Features**

### Editing Videos
1. **Add a video component** to your page
2. **Double-click the video** or hover and click "Change Video"
3. **Paste YouTube URL** (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
4. **Or just the video ID** (e.g., dQw4w9WgXcQ)
5. **Click "Update Video"** to apply changes

### Using Quantity Controls
1. **Add Product Variants** or **Advanced Checkout** components
2. **Click +/- buttons** to change quantities
3. **Change package options** to see different prices
4. **Watch prices update** automatically
5. **All calculations work**: subtotal, delivery, total

### Multi-Product Checkout
1. **Add "Multi-Product Checkout"** component
2. **Check products** you want to include
3. **Adjust quantities** with +/- buttons
4. **Try promo codes**: SAVE10, FIRST20, BULK30, WELCOME, STUDENT
5. **Change delivery area** to see different charges

## 📋 **Component Features**

### 🎬 Video Components
- **Editable YouTube videos**: Double-click to change URL
- **URL validation**: Ensures valid YouTube links
- **Multiple formats supported**: Full URLs or video IDs
- **Responsive player**: Works on all devices

### 🛒 Advanced Checkout System
- **Multi-product selection**: Checkboxes for each product
- **Smart quantity controls**: +/- buttons with validation
- **Real-time calculations**: Auto-updates as you select/change
- **Promo code system**: 5 working discount codes
- **Delivery zones**: Different rates for different areas
- **Order summary**: Live preview of cart contents

### 🖼️ Image Components
- **Image Slider**: 4-slide carousel with thumbnails
- **Image Gallery**: Clickable thumbnails that change main image
- **High-quality images**: Professional product photos
- **Mobile responsive**: Touch-friendly controls

### 📱 Responsive Design
- **Mobile-first approach**: Optimized for smartphones
- **Bootstrap 5 grid**: Professional responsive layout
- **Touch-friendly**: Large buttons and easy navigation
- **Cross-browser compatible**: Works on all modern browsers

## 🔧 **JavaScript Module Details**

### utils.js - Utility Functions
```javascript
Utils.formatCurrency(4500)           // Returns: ৳4,500
Utils.showMessage('Success!', 'success')  // Shows notification
Utils.getYouTubeVideoId(url)        // Extracts video ID
Utils.storage.set('key', data)      // Local storage helper
```

### components.js - Interactive Features
```javascript
Components.initializeAll()          // Initialize all components
Components.handleQuantityChange()   // Handle +/- buttons
Components.updateCalculations()     // Update prices
Components.applyPromoCode()         // Apply discount codes
```

### blocks.js - Component Definitions
```javascript
Blocks.addAllBlocks(editor)         // Add all blocks to editor
Blocks.addHeroBlocks()              // Add hero sections
Blocks.addMediaBlocks()             // Add video/gallery blocks
Blocks.addCheckoutBlocks()          // Add checkout components
```

### templates.js - Template Management
```javascript
Templates.loadCompleteTemplate()    // Load full eCommerce page
Templates.loadMinimalTemplate()     // Load simple product page
Templates.saveTemplate()            // Save custom template
Templates.importTemplate()          // Import template from JSON
```

## 🎨 **Working Promo Codes**
Try these codes in the advanced checkout:
- **SAVE10**: ৳500 discount
- **FIRST20**: ৳1,000 discount  
- **BULK30**: ৳1,500 discount
- **WELCOME**: ৳300 discount
- **STUDENT**: ৳800 discount

## 🛠️ **Debug Tools**

If you ever need to troubleshoot components, open browser console and run:

```javascript
// Reinitialize all components
reinitializeComponents();

// Debug advanced checkout
debugAdvancedCheckout();

// Debug product variants
debugProductVariants();

// Test all calculations manually
testCalculations();

// Force complete reinitialization
forceReinitialize();
```

These tools will help you diagnose any issues with quantity controls or calculations.

### Video URL Validation
- Supports full YouTube URLs
- Accepts short youtu.be links
- Works with just video IDs
- Real-time validation feedback

### Smart Calculations
- **Real-time updates** as you change quantities
- **Multi-product support** in advanced checkout
- **Delivery zone pricing** (Inside Dhaka: ৳60, Outside: ৳120, Remote: ৳150)
- **Promo code discounts** with validation
- **Currency formatting** with Bengali numerals

### Template System
- **Complete eCommerce template**: Hero, video, slider, description, specs, reviews, variants, checkout, social
- **Minimal template**: Clean, simple product showcase
- **Custom template saving**: Save your own designs
- **Import/Export**: JSON-based template sharing

## 🌐 **Browser Support**
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📱 **Mobile Features**
- **Touch-optimized controls**: Easy to use on phones
- **Responsive layouts**: Perfect on any screen size
- **Fast loading**: Optimized images and code
- **Swipe gestures**: Natural mobile interactions

## 🚀 **Performance Optimizations**
- **Modular loading**: Only load what you need
- **Debounced calculations**: Smooth performance
- **Efficient DOM updates**: Fast interactions
- **Optimized images**: Quick loading times

## 🔄 **Development Ready**
- **Clean code structure**: Easy to extend
- **Documented functions**: Clear comments throughout
- **Error handling**: Graceful failure recovery
- **API ready**: Structured for backend integration

## 📞 **Advanced Support Features**
The page builder now includes:
- ✅ **Editable video components** (double-click to change)
- ✅ **Working quantity controls** in Product Variants (with total price calculation)
- ✅ **Working quantity controls** in Multi-Product Checkout (with delivery charges)
- ✅ **Real-time price calculations** for all components
- ✅ **Multi-product checkout** with smart cart management and delivery pricing
- ✅ **Product variants** with package selection and automatic total updates
- ✅ **Promo code system** with 5 working codes
- ✅ **Delivery zone pricing** with area selection (৳60/৳120/৳150)
- ✅ **Professional templates** with real content
- ✅ **Modular JavaScript** for easy maintenance
- ✅ **Mobile-first design** with touch support
- ✅ **Export functionality** with working JavaScript included

## 🎯 **Getting Started Tips**

1. **Start with templates**: Load a complete template first
2. **Customize content**: Edit text, images, and colors
3. **Test interactions**: Try the +/- buttons and video editing
4. **Preview often**: Use the preview button to test
5. **Export when ready**: Download complete HTML pages

Your professional eCommerce page builder is now fully functional with advanced features! 🎉 slider with controls
✅ **Form Validation**: Required field checking
✅ **Promo Code System**: Working discount codes
✅ **Multi-Product Cart**: Checkbox selection system
✅ **Mobile Responsive**: Perfect on all devices
✅ **Professional Design**: Clean, modern interface

## 🛒 **Advanced Checkout Demo**
Try these promo codes in the multi-product checkout:
- **SAVE10**: ৳500 discount
- **FIRST20**: ৳1000 discount  
- **BULK30**: ৳1500 discount

## 📞 **Support**
The page builder is fully functional with:
- ✅ Working drag & drop
- ✅ Real image galleries and sliders
- ✅ Functional multi-product checkout
- ✅ Price calculations with promo codes
- ✅ Complete ready templates
- ✅ Export/import functionality
- ✅ Mobile responsive design
- ✅ Professional eCommerce components

Start building your professional eCommerce pages now! 🚀