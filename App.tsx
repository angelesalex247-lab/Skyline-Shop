import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import AIChatBot from './components/AIChatBot';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, ViewState } from './types';
import { ArrowLeft, CheckCircle, ChevronRight, Truck, ShieldCheck, RefreshCw, Upload, Image as ImageIcon, Plus } from 'lucide-react';

const App: React.FC = () => {
  // Application State
  const [view, setView] = useState<ViewState>('home');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Dynamic Product State
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  
  // User State - Hardcoded for demo
  const userEmail = "princtariqmirani@gmail.com";

  // Upload Form State
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: 'Electronics',
    description: '',
    image: ''
  });

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, products]);

  // Cart Actions
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Upload Actions
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewProduct({ ...newProduct, image: reader.result as string });
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newProduct.title || !newProduct.price || !newProduct.image) {
          alert("Please fill in all required fields");
          return;
      }

      const productToAdd: Product = {
          id: Date.now(),
          title: newProduct.title,
          price: parseFloat(newProduct.price),
          description: newProduct.description,
          category: newProduct.category,
          image: newProduct.image,
          rating: { rate: 0, count: 0 } // New products start with 0 rating
      };

      setProducts([productToAdd, ...products]);
      setNewProduct({ title: '', price: '', category: 'Electronics', description: '', image: '' });
      setView('home');
      setActiveCategory('All'); // Switch to all to see new product
      window.scrollTo(0, 0);
  };

  // Navigation Handlers
  const handleProductClick = (product: Product) => {
    setActiveProduct(product);
    setView('product_details');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setView('home');
    setActiveProduct(null);
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    setCartItems([]);
    setView('order_success');
    window.scrollTo(0, 0);
  };

  // Render Views
  const renderProductDetails = () => {
    if (!activeProduct) return null;
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded shadow-sm p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Image Gallery Side */}
            <div className="md:col-span-5 flex flex-col gap-4">
                 <div className="aspect-square bg-white border border-gray-100 rounded flex items-center justify-center p-8 relative overflow-hidden">
                    <img 
                        src={activeProduct.image} 
                        alt={activeProduct.title} 
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
            </div>

            {/* Product Info Side */}
            <div className="md:col-span-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{activeProduct.category}</span>
                <h1 className="text-xl font-bold text-gray-900 mb-2 mt-1 leading-snug">{activeProduct.title}</h1>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>Model Number: {activeProduct.id}ABX-2024</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center text-green-700 font-bold">
                        {activeProduct.rating.rate || 'New'} <span className="text-xs ml-1">★</span>
                    </span>
                    <span className="ml-1">({activeProduct.rating.count} ratings)</span>
                </div>

                <div className="border-t border-b border-gray-100 py-4 my-4">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-sm text-gray-500">AED</span>
                        <span className="text-3xl font-bold text-gray-900">{activeProduct.price.toFixed(2)}</span>
                        {activeProduct.rating.count > 0 && (
                            <>
                                <span className="text-sm text-gray-400 line-through">AED {(activeProduct.price * 1.2).toFixed(2)}</span>
                                <span className="text-sm text-green-600 font-bold">20% OFF</span>
                            </>
                        )}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                        Inclusive of VAT
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                     <div className="bg-[#ff3399] px-1.5 py-0.5 rounded-sm flex items-center shadow-sm">
                        <span className="text-[10px] font-black italic text-white uppercase tracking-tighter">SKYLINE</span>
                        <span className="text-[10px] font-bold text-gray-800 ml-1 uppercase bg-white/90 px-1 rounded-[1px]">express</span>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 space-y-2 mb-6">
                    <p className="font-bold text-gray-900">Free Delivery</p>
                    <p>Tomorrow, Order in next 4 hrs</p>
                </div>
                
                 <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {activeProduct.description}
                </p>
            </div>

            {/* Add to Cart / Buy Side */}
            <div className="md:col-span-3">
                <div className="border border-gray-200 rounded p-4 shadow-sm sticky top-24">
                     <div className="flex items-baseline space-x-1 mb-4">
                        <span className="text-xs text-gray-500">AED</span>
                        <span className="text-2xl font-bold text-gray-900">{activeProduct.price.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={() => addToCart(activeProduct)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors mb-3 shadow-sm"
                    >
                        Add to cart
                    </button>
                     <div className="flex justify-center space-x-4 mt-4 border-t border-gray-100 pt-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-2 bg-gray-100 rounded-full mb-1">
                                <ShieldCheck className="h-5 w-5 text-gray-600" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">1 Year<br/>Warranty</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                             <div className="p-2 bg-gray-100 rounded-full mb-1">
                                <RefreshCw className="h-5 w-5 text-gray-600" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">Free<br/>Returns</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                             <div className="p-2 bg-gray-100 rounded-full mb-1">
                                <Truck className="h-5 w-5 text-gray-600" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">Trusted<br/>Shipping</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  };

  const renderCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3">1</span>
                            Contact Information
                        </h2>
                         <input type="email" value={userEmail} disabled className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50" placeholder="Email address" />
                    </div>
                    
                    <div className="bg-white p-6 rounded shadow-sm">
                         <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3">2</span>
                            Shipping Address
                        </h2>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                             <div className="col-span-2">
                                <input type="text" placeholder="Address" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <input type="text" placeholder="City" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                             <div>
                                <input type="text" placeholder="Postal Code" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                         </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded shadow-sm h-fit">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-3">
                                <img src={item.image} alt={item.title} className="h-16 w-16 object-contain border border-gray-100 rounded" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium line-clamp-2 text-gray-800">{item.title}</p>
                                    <div className="flex justify-between mt-1">
                                         <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                         <p className="text-sm font-bold text-gray-900">AED {(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>AED {total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4 mt-4 mb-6">
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                            <span>Total</span>
                            <span>AED {total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-right">Inclusive of VAT</p>
                    </div>
                    
                    <button 
                        onClick={handlePlaceOrder}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition-colors uppercase tracking-wide"
                    >
                        Place Order
                    </button>
                    <button onClick={goHome} className="w-full mt-3 text-sm text-blue-600 font-medium hover:underline">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
  };

  const renderUploadProduct = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
        <div className="flex items-center mb-6">
            <button onClick={goHome} className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors">
                <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Sell a Product</h1>
        </div>

        <div className="bg-white rounded shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Upload Section */}
                <div className="flex flex-col">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                    <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8 bg-gray-50 hover:bg-gray-100 transition-colors relative">
                        {newProduct.image ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img 
                                    src={newProduct.image} 
                                    alt="Preview" 
                                    className="max-h-64 object-contain rounded"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setNewProduct({...newProduct, image: ''})}
                                    className="absolute top-0 right-0 p-1 bg-white rounded-full shadow hover:bg-red-50 text-red-600"
                                >
                                    <Upload className="h-4 w-4 rotate-45" /> {/* Use rotate to simulate close/cancel if needed or just replace logic */}
                                </button>
                            </div>
                        ) : (
                            <>
                                <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-sm text-gray-500 font-medium mb-2">Click to upload image</p>
                                <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                            </>
                        )}
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
                        <input 
                            type="text" 
                            required
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                            placeholder="e.g. Wireless Headphones"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Price (AED)</label>
                            <input 
                                type="number" 
                                required
                                min="0"
                                step="0.01"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                placeholder="0.00"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                             <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                             <select 
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                             >
                                 {CATEGORIES.filter(c => c !== 'All').map(cat => (
                                     <option key={cat} value={cat}>{cat}</option>
                                 ))}
                             </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                        <textarea 
                            rows={4}
                            required
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                            placeholder="Describe your product..."
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        />
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-[#ff3399] text-white font-bold py-3 px-4 rounded hover:bg-pink-400 transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            List Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );

  const renderOrderSuccess = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 text-center px-4 py-12">
      <div className="bg-green-100 p-6 rounded-full mb-6 animate-in zoom-in duration-500">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Thank you, PrincTariq. Your order has been confirmed and will be shipped to your address shortly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={goHome}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition-colors uppercase"
        >
          Continue Shopping
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded hover:bg-gray-50 transition-colors uppercase">
          View Orders
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Navbar 
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={goHome}
        onSellClick={() => { setView('upload_product'); window.scrollTo(0,0); }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        userEmail={userEmail}
      />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <main className="flex-grow">
        {view === 'home' && (
            <>
                {/* Hero Banner Area */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Main Banner */}
                        <div className="md:col-span-2 relative bg-[#ff3399] h-48 md:h-80 w-full overflow-hidden flex items-center justify-between px-8 md:px-16 cursor-pointer group">
                           <div className="z-10 relative">
                                <span className="inline-block bg-black text-[#ff3399] px-3 py-1 text-xs font-bold uppercase mb-4">Mega Sale</span>
                                <h2 className="text-3xl md:text-5xl font-black text-black mb-4 uppercase tracking-tight">
                                    Pink <br/> Friday
                                </h2>
                                <p className="text-black font-medium mb-6">Up to 70% off electronics</p>
                                <button className="bg-black text-white px-6 py-2 text-sm font-bold uppercase hover:bg-gray-800 transition-colors">
                                    Shop Now
                                </button>
                           </div>
                           <img 
                            src="https://picsum.photos/400/400?random=20" 
                            alt="Sale" 
                            className="absolute right-0 bottom-0 h-full w-auto object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-500"
                           />
                        </div>

                        {/* Side Banners */}
                        <div className="hidden md:flex flex-col gap-4">
                            <div className="flex-1 bg-white p-6 flex flex-col justify-center items-start border border-gray-100 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="z-10">
                                    <span className="text-xs font-bold text-blue-600 uppercase mb-2 block">New Arrivals</span>
                                    <h3 className="text-xl font-bold text-gray-900">Fashion for All</h3>
                                </div>
                                <img src="https://picsum.photos/200/200?random=5" className="absolute bottom-0 right-0 h-32 w-auto mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500" alt="Fashion" />
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-center items-start border border-gray-100 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="z-10">
                                    <span className="text-xs font-bold text-orange-600 uppercase mb-2 block">Clearance</span>
                                    <h3 className="text-xl font-bold text-gray-900">Home Essentials</h3>
                                </div>
                                <img src="https://picsum.photos/200/200?random=7" className="absolute bottom-0 right-0 h-32 w-auto mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500" alt="Home" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Title */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-4">
                     <div className="flex items-center justify-between">
                         <h2 className="text-xl font-bold text-gray-900">
                             {activeCategory === 'All' ? 'Recommended for you' : activeCategory}
                         </h2>
                         <button 
                            className="px-4 py-1 text-sm font-bold border border-gray-300 rounded hover:bg-gray-50 uppercase"
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                         >
                            View All
                         </button>
                     </div>
                </div>

                {/* Product Grid */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onAddToCart={addToCart}
                                onClick={handleProductClick}
                            />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-md mt-4">
                            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                            <button 
                                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                 {/* Marketing Banner Bottom */}
                 <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                     <div className="bg-gray-200 rounded p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                         <div>
                             <h3 className="text-2xl font-bold text-gray-800 mb-2">Sell on Skyline Shop</h3>
                             <p className="text-gray-600">Start selling your products to millions of customers today.</p>
                         </div>
                         <button 
                            onClick={() => { setView('upload_product'); window.scrollTo(0,0); }}
                            className="bg-black text-white px-6 py-2 font-bold uppercase hover:bg-gray-800"
                        >
                             Start Selling
                         </button>
                     </div>
                 </div>
            </>
        )}

        {view === 'product_details' && renderProductDetails()}
        {view === 'checkout' && renderCheckout()}
        {view === 'order_success' && renderOrderSuccess()}
        {view === 'upload_product' && renderUploadProduct()}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto pt-10 pb-6">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-10">
                <div className="col-span-2">
                    <h4 className="font-bold text-sm text-gray-900 mb-4 uppercase">We're Always Here To Help</h4>
                    <p className="text-sm text-gray-500 mb-4">Reach out to us through any of these support channels</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase">Help Center</span>
                            <span className="text-sm font-bold">help.skylineshop.com</span>
                        </div>
                         <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase">Email Support</span>
                            <span className="text-sm font-bold">care@skylineshop.com</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-xs text-gray-900 mb-4 uppercase">Electronics</h4>
                    <ul className="space-y-2 text-xs text-gray-500">
                        <li className="hover:underline cursor-pointer">Mobiles</li>
                        <li className="hover:underline cursor-pointer">Tablets</li>
                        <li className="hover:underline cursor-pointer">Laptops</li>
                        <li className="hover:underline cursor-pointer">Home Appliances</li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-bold text-xs text-gray-900 mb-4 uppercase">Fashion</h4>
                     <ul className="space-y-2 text-xs text-gray-500">
                        <li className="hover:underline cursor-pointer">Women's Fashion</li>
                        <li className="hover:underline cursor-pointer">Men's Fashion</li>
                        <li className="hover:underline cursor-pointer">Girls' Fashion</li>
                        <li className="hover:underline cursor-pointer">Boys' Fashion</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xs text-gray-900 mb-4 uppercase">Home & Kitchen</h4>
                    <ul className="space-y-2 text-xs text-gray-500">
                        <li className="hover:underline cursor-pointer">Kitchen & Dining</li>
                        <li className="hover:underline cursor-pointer">Furniture</li>
                        <li className="hover:underline cursor-pointer">Home Decor</li>
                        <li className="hover:underline cursor-pointer">Bedding & Bath</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xs text-gray-900 mb-4 uppercase">Beauty</h4>
                    <ul className="space-y-2 text-xs text-gray-500">
                        <li className="hover:underline cursor-pointer">Fragrance</li>
                        <li className="hover:underline cursor-pointer">Make-Up</li>
                        <li className="hover:underline cursor-pointer">Haircare</li>
                        <li className="hover:underline cursor-pointer">Skincare</li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <div className="mb-4 md:mb-0">
                    &copy; 2024 Skyline Shop. All rights reserved.
                </div>
                <div className="flex gap-4">
                    <span className="hover:underline cursor-pointer">Careers</span>
                    <span className="hover:underline cursor-pointer">Warranty Policy</span>
                    <span onClick={() => { setView('upload_product'); window.scrollTo(0,0); }} className="hover:underline cursor-pointer">Sell with us</span>
                    <span className="hover:underline cursor-pointer">Terms of Use</span>
                    <span className="hover:underline cursor-pointer">Privacy Policy</span>
                </div>
            </div>
         </div>
      </footer>

      <AIChatBot />
    </div>
  );
};

export default App;