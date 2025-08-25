import React, { useState, useEffect, createContext, useContext, useRef } from 'react';

// --- SVG Icon Components (Replaces react-icons) ---
const FaBoxArchive = ({ className }) => (<svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 32H0v448h512V32H48zm336 213.46l-128 128-128-128h76V136h104v109.46h76z"></path></svg>);
const FaHeadset = ({ className }) => (<svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zM496 208v144c0 17.67-14.33 32-32 32h-16c-35.35 0-64-28.65-64-64v-48c0-35.35 28.65-64 64-64h16c17.67 0 32 14.33 32 32zM320 288c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V320c0-17.67-14.33-32-32-32h-64zM128 288c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V320c0-17.67-14.33-32-32-32h-64z"></path></svg>);
const FaUserCircle = ({ className }) => (<svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.2 7.1.5 23.7 3.3 47.6 5.5 70.9 5.5s47.2-2.2 70.9-5.5c2.3-.3 4.7-.5 7.1-.5 42.9 0 79.7 24.4 98.5 59.8-35.2 41.6-87.8 68.2-146.5 68.2z"></path></svg>);
const FaShoppingCart = ({ className }) => (<svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.99c-11.046 0-21.402 5.669-27.41 14.591L4.54 320.482c-1.313 2.143-.491 5.011 1.652 6.324l43.379 26.469C52.34 354.91 56.943 352 61.88 352h286.86c-4.493 12.655-7.261 26.538-7.261 41.296 0 53.024 42.976 96 96 96s96-42.976 96-96c0-14.758-2.767-28.641-7.261-41.296h41.261c4.937 0 9.54-2.91 12.279-7.22l47.273-79.184c1.313-2.143.491-5.011-1.652-6.324l-43.379-26.469c-2.737-1.67-6.279-1.04-8.021 1.486zM464 416c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm-288-48c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48z"></path></svg>);
const FaChevronDown = ({ className }) => (<svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>);

// --- MOCK DATA & CONFIG ---
const productsData = [ { id: 1, name: 'Amul Taaza Milk (1L)', price: 80, image: 'https://www.bbassets.com/media/uploads/p/l/306926_4-amul-homogenised-toned-milk.jpg', category: 'Dairy & Breakfast' },
     { id: 13, name: 'Amul Gold Full Cream Milk', price: 35, image: 'https://www.bbassets.com/media/uploads/p/l/40090893_8-amul-amul-gold.jpg', category: 'Dairy & Breakfast' }, 
     { id: 2, name: 'Britannia Brown Bread', price: 55, image: 'https://www.bbassets.com/media/uploads/p/l/40092241_8-britannia-brown-bread-with-goodness-of-wheat-enriched-with-vitamins.jpg', category: 'Dairy & Breakfast' },
      { id: 3, name: 'Table White Eggs', price: 90, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/4bf10560-0335-4667-b125-5c7b1c653c60.png', category: 'Dairy & Breakfast' }, 
      { id: 4, name: 'Amul Butter', price: 60, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1689327694', category: 'Dairy & Breakfast' }, 
      { id: 7, name: 'Nestle a+ Yoghurt', price: 45, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/e0eacedd-2df0-4668-b783-a721ab4422e5.jpg', category: 'Dairy & Breakfast' }, 
      { id: 8, name: 'Amul Cheese Slices', price: 150, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/170a.jpg?ts=1688463540', category: 'Dairy & Breakfast' }, 
      { id: 5, name: 'Royal Gala Apples', price: 170, image: 'https://www.jiomart.com/images/product/original/590000005/apple-royal-gala-1-kg-product-images-o590000005-p590000005-0-202409171905.jpg?im=Resize=(1000,1000)', category: 'Fruits & Vegetables' }, 
      { id: 6, name: 'Robusta Bananas', price: 70, image: 'https://www.bbassets.com/media/uploads/p/xl/10000025_32-fresho-banana-robusta.jpg', category: 'Fruits & Vegetables' }, 
      { id: 14, name: 'Onion (1kg)', price: 40, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/f53c1ea1-cfa0-438b-a14c-b4f5ebeed7dd.png', category: 'Fruits & Vegetables' }, 
      { id: 15, name: 'Tomato (1kg)', price: 30, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/assets/products/sliding_images/jpeg/97bf8544-963b-420e-86f2-45ebbbc2f5f1.jpg?ts=1710754025', category: 'Fruits & Vegetables' },
       { id: 9, name: 'Lays Potato Chips', price: 20, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/8e5438e8-e529-4053-bd0a-06674fb8394a.jpg', category: 'Snacks & Munchies' }, 
       { id: 10, name: 'Bingo! Mad Angles', price: 20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRso9ALCes4fZuV8hdt8RAZ4NJucFgTTljN2Q&s', category: 'Snacks & Munchies' }, 
       { id: 16, name: 'Unibic Choco Chip Cookies', price: 120, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/aa70456f-2b91-450f-bedb-b38f976e2327.jpg', category: 'Snacks & Munchies' }, 
       { id: 19, name: 'Cadbury Dairy Milk Silk', price: 200, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/ac3334a6-922c-4f62-b3aa-ffd15bc98066.jpg', category: 'Snacks & Munchies' }, 
       { id: 21, name: 'Maggi', price: 20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqbslEYZSZ4qUBQXaAzarrQdY3edbvE8hYA&s', category: 'Snacks & Munchies' }, 
       { id: 11, name: 'Coca Cola', price: 40, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/81348814-1a2d-45e1-b51b-7f32883c730b.jpg', category: 'Cold Drinks & Juices' },
        { id: 12, name: 'Tropicana Orange Juice', price: 130, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/6f16146c-ee58-4555-8df2-a22dac7d66f2.jpg', category: 'Cold Drinks & Juices' }, 
        { id: 20, name: 'Thumbs Up', price: 40, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/20066a93-b442-4fd4-94ca-652ba3afd357.jpg', category: 'Cold Drinks & Juices' }, 
        { id: 17, name: 'Colgate MaxFresh Toothpaste', price: 95, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/0669548e-f0c7-4538-b868-056779ff66fc.jpg', category: 'Personal Care' }, { id: 18, name: 'Dove Soap Bar', price: 60, image: 'https://cdn.grofers.com/da/cms-assets/cms/product/0637027a-317f-4194-ae02-a28a0faa2a96.jpg?ts=1739519508', category: 'Personal Care' }];
const categories = ['All', ...new Set(productsData.map(p => p.category))];
const BACKEND_URL = 'http://localhost:5000';
const deliveryPartners = ["Rohan", "Priya", "Amit", "Lakshay", "Vikram"];

// --- CONTEXT for Global State Management ---
const AppContext = createContext();

// --- App Provider Component ---
const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [cart, setCart] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    
    // State for the single active order being tracked
    const [activeOrder, setActiveOrder] = useState(null);
    const [activeOrderStatus, setActiveOrderStatus] = useState('Placed');
    const [activeOrderMessage, setActiveOrderMessage] = useState('');
    const [activeOrderProgress, setActiveOrderProgress] = useState(0);
    const [activeOrderTimer, setActiveOrderTimer] = useState(600);

    useEffect(() => {
        const token = localStorage.getItem('quickyToken');
        const user = JSON.parse(localStorage.getItem('quickyUser'));
        const savedAddresses = JSON.parse(localStorage.getItem('quickyAddresses'));
        if (token && user) {
            setCurrentUser({ token, user });
            if (savedAddresses) {
                setAddresses(savedAddresses);
            }
        }
    }, []);

    // This effect runs the entire order processing flow in the background
    useEffect(() => {
        if (!activeOrder) return;

        const updateOrderStatusAPI = async (orderId, newStatus) => {
            try {
                await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}` },
                    body: JSON.stringify({ status: newStatus }),
                });
            } catch (error) { console.error(`Failed to update status:`, error); }
        };

        const assignDeliveryPartnerAPI = async (orderId) => {
            const partnerName = deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)];
            try {
                const res = await fetch(`${BACKEND_URL}/api/orders/assign-partner`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}` },
                    body: JSON.stringify({ orderId, partnerName }),
                });
                const result = await res.json();
                if (result.success) {
                    setActiveOrderMessage(`${result.order.deliveryPartner} is preparing your order.`);
                } else {
                    setTimeout(() => assignDeliveryPartnerAPI(orderId), 5000);
                }
            } catch (error) { console.error('Failed to assign partner:', error); }
        };

        // Initialize state for a new order
        setActiveOrderStatus('Placed');
        setActiveOrderProgress(0);
        setActiveOrderMessage('We have received your order.');
        setActiveOrderTimer(600);

        const confirmTimeout = setTimeout(() => {
            setActiveOrderStatus('Confirmed');
            setActiveOrderProgress(33);
            setActiveOrderMessage('Your order is confirmed.');
            updateOrderStatusAPI(activeOrder._id, 'Confirmed');
            assignDeliveryPartnerAPI(activeOrder._id);
        }, 30000); // 30 seconds

        const deliveryTimeout = setTimeout(() => {
            setActiveOrderStatus('Out for Delivery');
            setActiveOrderProgress(66);
            setActiveOrderMessage(`Your delivery partner is on the way!`);
            updateOrderStatusAPI(activeOrder._id, 'Out for Delivery');
        }, 120000); // 2 minutes

        return () => {
            clearTimeout(confirmTimeout);
            clearTimeout(deliveryTimeout);
        };
    }, [activeOrder, currentUser]);

    // This effect runs the 10-minute countdown timer
    useEffect(() => {
        let interval;
        if (activeOrderStatus === 'Confirmed' || activeOrderStatus === 'Out for Delivery') {
            interval = setInterval(() => {
                setActiveOrderTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setActiveOrderStatus('Delivered');
                        setActiveOrderProgress(100);
                        setActiveOrderMessage('Enjoy your items!');
                        if (activeOrder) {
                           updateOrderStatusAPI(activeOrder._id, 'Delivered');
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [activeOrderStatus, activeOrder]);


    const login = (userData) => {
        localStorage.setItem('quickyToken', userData.token);
        localStorage.setItem('quickyUser', JSON.stringify(userData.user));
        setCurrentUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('quickyToken');
        localStorage.removeItem('quickyUser');
        localStorage.removeItem('quickyAddresses');
        setCurrentUser(null);
        setAddresses([]);
    };

    const addAddress = (newAddress) => {
        const updatedAddresses = [...addresses, { ...newAddress, id: Date.now() }];
        setAddresses(updatedAddresses);
        localStorage.setItem('quickyAddresses', JSON.stringify(updatedAddresses));
    };

    const deleteAddress = (addressId) => {
        const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
        setAddresses(updatedAddresses);
        localStorage.setItem('quickyAddresses', JSON.stringify(updatedAddresses));
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart[product.id];
            if (existingItem) {
                return { ...prevCart, [product.id]: { ...existingItem, quantity: existingItem.quantity + 1 } };
            }
            return { ...prevCart, [product.id]: { ...product, quantity: 1 } };
        });
    };

    const updateQuantity = (productId, amount) => {
        setCart(prevCart => {
            const existingItem = prevCart[productId];
            if (!existingItem) return prevCart;
            const newQuantity = existingItem.quantity + amount;
            if (newQuantity <= 0) {
                const { [productId]: _, ...rest } = prevCart;
                return rest;
            }
            return { ...prevCart, [productId]: { ...existingItem, quantity: newQuantity } };
        });
    };
    
    const clearCart = () => setCart({});

    const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AppContext.Provider value={{
            currentUser, login, logout,
            cart, addToCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartCount, cartTotal,
            activeOrder, setActiveOrder, activeOrderStatus, activeOrderMessage, activeOrderProgress, activeOrderTimer,
            addresses, addAddress, deleteAddress
        }}>
            {children}
        </AppContext.Provider>
    );
};

// --- Custom Hook for easier context access ---
const useAppContext = () => useContext(AppContext);

// --- Reusable Components ---
const Header = ({ setPage }) => {
    const { currentUser, logout, cartCount, setIsCartOpen } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <header className="bg-white sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <button onClick={() => setPage('home')} className="flex-shrink-0">
                        <h1 className="text-3xl font-extrabold text-gray-900">Quicky</h1>
                    </button>
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <button onClick={() => setPage('orders')} className="hidden sm:flex items-center text-gray-600 hover:text-green-600 transition-colors">
                            <FaBoxArchive className="text-xl" />
                            <span className="ml-2 text-sm font-medium">My Orders</span>
                        </button>
                        <button onClick={() => setPage('support')} className="hidden sm:flex items-center text-gray-600 hover:text-green-600 transition-colors">
                            <FaHeadset className="text-xl" />
                            <span className="ml-2 text-sm font-medium">Support</span>
                        </button>
                        {currentUser ? (
                            <div className="relative" ref={menuRef}>
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center text-gray-700">
                                    <span className="text-sm font-medium">Hi, {currentUser.user.name.split(' ')[0]}</span>
                                    <FaChevronDown className={`ml-2 text-xs transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        <button onClick={() => { setPage('profile'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</button>
                                        <button onClick={() => { setPage('orders'); setIsMenuOpen(false); }} className="block sm:hidden w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</button>
                                        <button onClick={() => { setPage('support'); setIsMenuOpen(false); }} className="block sm:hidden w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support</button>
                                        <button onClick={() => { logout(); setPage('home'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={() => setPage('login')} className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
                                <FaUserCircle className="text-2xl" />
                                <span className="ml-2 text-sm font-medium">Login</span>
                            </button>
                        )}
                        <button onClick={() => setIsCartOpen(true)} className="relative flex items-center text-gray-600 hover:text-green-600 transition-colors">
                            <FaShoppingCart className="text-2xl" />
                            {cartCount > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

const ProductCard = ({ product }) => {
    const { cart, addToCart, updateQuantity } = useAppContext();
    const cartItem = cart[product.id];
    return (
        <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col group border hover:shadow-md transition-all duration-300">
            <div className="aspect-square w-full overflow-hidden rounded-md mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/e2e8f0/4a5568?text=Image+Not+Found'; }} />
            </div>
            <div className="flex-grow flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 flex-grow">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-900 font-bold text-base sm:text-lg">₹{product.price.toFixed(2)}</p>
                    {cartItem ? (
                         <div className="flex items-center justify-between w-24 h-10 bg-green-600 text-white rounded-lg font-semibold shadow-sm">
                            <button onClick={() => updateQuantity(product.id, -1)} className="px-3 py-2 hover:bg-green-700 rounded-l-lg transition-colors">-</button>
                            <span className="text-sm">{cartItem.quantity}</span>
                            <button onClick={() => updateQuantity(product.id, 1)} className="px-3 py-2 hover:bg-green-700 rounded-r-lg transition-colors">+</button>
                        </div>
                    ) : (
                        <button onClick={() => addToCart(product)} className="w-24 h-10 bg-white border-2 border-green-600 text-green-600 py-1 rounded-lg font-bold hover:bg-green-600 hover:text-white transition-colors duration-300">Add</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const CartSidebar = ({ setPage }) => {
    const { isCartOpen, setIsCartOpen, cart, updateQuantity, cartTotal, cartCount, currentUser } = useAppContext();

    const handleCheckout = () => {
        if (!currentUser) {
            alert("Please log in to proceed to checkout.");
            setPage('login');
        } else {
            setPage('checkout');
        }
        setIsCartOpen(false);
    };
    
    return (
        <>
            <div className={`fixed inset-0 bg-black z-40 transition-opacity ${isCartOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)}></div>
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-500 text-3xl hover:text-gray-800 transition-colors">&times;</button>
                </div>
                <div className="p-4 flex-grow overflow-y-auto">
                    {cartCount === 0 ? (
                        <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
                    ) : (
                        Object.values(cart).map(item => (
                            <div key={item.id} className="flex items-center mb-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-md border mr-4"/>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-600">₹{item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center justify-center border border-gray-300 rounded-lg w-24 mx-2">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-gray-600 font-bold hover:bg-gray-100 rounded-l-lg">-</button>
                                    <span className="px-2 text-sm">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-gray-600 font-bold hover:bg-gray-100 rounded-r-lg">+</button>
                                </div>
                                <p className="w-1/6 text-right font-semibold text-sm text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="border-t p-4 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-xl font-semibold text-gray-800">Total:</p>
                        <p className="text-xl font-bold text-gray-900">₹{cartTotal.toFixed(2)}</p>
                    </div>
                    <button onClick={handleCheckout} disabled={cartCount === 0} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-300 transition-all duration-300 transform hover:scale-105">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </>
    );
};

// --- Page Components ---
const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const filteredProducts = selectedCategory === 'All' ? productsData : productsData.filter(p => p.category === selectedCategory);
    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 -mx-4 px-4">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex-shrink-0 ${selectedCategory === cat ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </main>
    );
};

const LoginPage = ({ setPage }) => {
    const { login } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            login(data);
            setPage('home');
        } catch (err) {
            setError(err.message || 'Login failed.');
        }
    };
    return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <button onClick={() => setPage('home')} className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">Quicky</h1>
            </button>
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300">Login</button>
                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account? <button onClick={() => setPage('register')} className="font-medium text-green-600 hover:underline">Sign up</button>
                </p>
            </div>
        </div>
    );
};

const RegisterPage = ({ setPage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, phone }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            alert('Registration successful! Please log in.');
            setPage('login');
        } catch (err) {
            setError(err.message || 'Registration failed.');
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 py-12">
            <button onClick={() => setPage('home')} className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">Quicky</h1>
            </button>
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300">Create Account</button>
                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account? <button onClick={() => setPage('login')} className="font-medium text-green-600 hover:underline">Log in</button>
                </p>
            </div>
        </div>
    );
};

const OrderDetailPage = ({ order, onBack }) => {
    if (!order) return null;
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <button onClick={onBack} className="text-green-600 font-semibold mb-4">&larr; Back to all orders</button>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold">Order ID: {order.razorpay_order_id.replace('order_', '')}</h2>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.orderDate).toLocaleString()}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">{order.status}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p className="text-sm text-gray-600">{order.customerDetails?.name}</p>
                    <p className="text-sm text-gray-600">{order.customerDetails?.address}</p>
                    <p className="text-sm text-gray-600">{order.customerDetails?.phone}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Delivery Partner</h3>
                    <p className="text-sm text-gray-600">{order.deliveryPartner || 'Not assigned yet'}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Payment Summary</h3>
                    <p className="text-lg font-bold text-green-600">Total: ₹{order.totalAmount.toFixed(2)}</p>
                </div>
            </div>
            <div className="border-t mt-4 pt-4">
                <h3 className="font-semibold mb-2">Items in this order</h3>
                <div className="space-y-2">
                    {order.items?.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name} x {item.quantity}</span>
                            <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const OrdersPage = ({ setPage }) => {
    const { currentUser } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            setPage('login');
            return;
        }
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/orders`, {
                    headers: { 'Authorization': `Bearer ${currentUser.token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch orders.');
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [currentUser, setPage]);

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {selectedOrder ? (
                <OrderDetailPage order={selectedOrder} onBack={() => setSelectedOrder(null)} />
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">My Order History</h1>
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="divide-y divide-gray-200">
                            {loading && <p className="text-center p-8">Loading your orders...</p>}
                            {error && <p className="text-red-500 text-center p-8">{error}</p>}
                            {!loading && orders.length === 0 && <p className="text-center text-gray-500 p-8">You have no past orders.</p>}
                            {orders.map(order => (
                                <button key={order._id} onClick={() => setSelectedOrder(order)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-gray-800">Order ID: {order.razorpay_order_id.replace('order_', '')}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-green-600">₹{order.totalAmount.toFixed(2)}</p>
                                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">{order.status}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

const SupportPage = ({ setPage }) => {
    const { currentUser } = useAppContext();
    const chatTree = {
        'start': {
            message: "Hi there! How can I help you today?",
            options: { 'order_issue': "Issue with a recent order", 'payment_issue': "Payment & refund queries", 'account_issue': "Account questions", 'other': "Other queries" }
        },
        'order_issue': {
            message: "Let me fetch your recent orders. Please select the one you have an issue with.",
            action: 'fetch_orders'
        },
        'no_orders': {
            message: "You have no recent orders. Is there anything else I can help with?",
            options: { 'payment_issue': "Payment queries", 'other': "Other queries", 'back_to_start': "Start Over" }
        },
        'order_selected': {
            message: "Thanks. What is the issue with this order?",
            options: { 'item_issue': "Problem with an item", 'cancel_order': "I want to cancel this order", 'delivery_status': "Where is my order?", 'back_to_start': "Go back" }
        },
        'payment_issue': {
            message: "What is your payment query?",
            options: { 'refund_status': "Refund status?", 'payment_failed': "Payment failed but money was debited", 'promo_code': "Promo code not working", 'back_to_start': "Go back" }
        },
        'account_issue': {
            message: "What is your account question?",
            options: { 'change_password': "How to change password?", 'update_address': "How to update address?", 'back_to_start': "Go back" }
        },
        'item_issue': { message: "I see. Could you please specify the problem?", options: { 'wrong_item': "Wrong/Damaged item", 'missing_item': "Missing item", 'quality_issue': "Item quality is not good" } },
        'cancel_order': { message: "Cancellation is only possible before the order is out for delivery. Our team will review your request.", options: { 'back_to_start': "Okay, thank you" } },
        'wrong_item': { message: "We are very sorry. Please contact our call center at 1800-123-4567 with your Order ID to arrange a replacement or refund.", options: { 'back_to_start': "Thank you" } },
        'missing_item': { message: "Our apologies. We will process an immediate refund for the missing item. It should reflect in your account in 5-7 business days.", options: { 'back_to_start': "Thank you" } },
        'quality_issue': { message: "We're sorry to hear that. Please contact our call center at 1800-123-4567 to resolve this.", options: { 'back_to_start': "Thank you" } },
        'delivery_status': { message: "You can see the live status of your current order on the 'My Orders' page.", options: { 'back_to_start': "Okay, thanks" } },
        'refund_status': { message: "Refunds are typically processed within 5-7 business days.", options: { 'back_to_start': "Go back" } },
        'payment_failed': { message: "If money was debited, it should be automatically refunded by your bank within 24-48 hours.", options: { 'back_to_start': "Go back" } },
        'promo_code': { message: "Please ensure the promo code is valid and entered correctly. Some codes are for first-time users only.", options: { 'back_to_start': "Go back" } },
        'change_password': { message: "Currently, password changes can only be done through our customer service. Please call 1800-123-4567.", options: { 'back_to_start': "Go back" } },
        'update_address': { message: "You can add, edit, or delete your saved addresses on the 'My Profile' page.", options: { 'back_to_start': "Go back" } },
        'other': { message: "For other queries, please contact our customer service at 1800-123-4567.", options: { 'back_to_start': "Go back" } },
        'back_to_start': { redirect: 'start' }
    };

    const [currentNodeKey, setCurrentNodeKey] = useState('start');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(true);
    const [dynamicOptions, setDynamicOptions] = useState(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        // Initial greeting from the bot
        setTimeout(() => {
            setMessages([{ sender: 'bot', text: chatTree.start.message }]);
            setIsTyping(false);
        }, 1000);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);
    
    const addMessage = (message) => {
        setMessages(prev => [...prev, message]);
    };

    const handleOptionClick = async (key, text) => {
        addMessage({ sender: 'user', text });
        setDynamicOptions(null);
        setIsTyping(true);

        let nextNodeKey = key;
        let nextNode = chatTree[key];

        if (nextNode?.redirect) {
            nextNodeKey = nextNode.redirect;
            nextNode = chatTree[nextNodeKey];
        }
        
        setCurrentNodeKey(nextNodeKey);

        setTimeout(async () => {
            if (nextNode?.action === 'fetch_orders') {
                if (!currentUser) {
                    addMessage({ sender: 'bot', text: "Please log in to see your orders." });
                    setPage('login');
                    setIsTyping(false);
                    return;
                }
                try {
                    const res = await fetch(`${BACKEND_URL}/api/orders`, { headers: { 'Authorization': `Bearer ${currentUser.token}` } });
                    const orders = await res.json();
                    if (orders.length > 0) {
                        addMessage({ sender: 'bot', text: nextNode.message });
                        const orderOptions = orders.slice(0, 3).reduce((acc, order) => {
                            acc[`order_${order._id}`] = `Order ...${order.razorpay_order_id.slice(-6)} on ${new Date(order.orderDate).toLocaleDateString()}`;
                            return acc;
                        }, {});
                        orderOptions['no_issue'] = "My issue is not with these orders";
                        setDynamicOptions(orderOptions);
                    } else {
                        addMessage({ sender: 'bot', text: chatTree.no_orders.message });
                        setCurrentNodeKey('no_orders');
                    }
                } catch (err) {
                    addMessage({ sender: 'bot', text: "Sorry, I couldn't fetch your orders right now." });
                    setCurrentNodeKey('start');
                }
            } else if (key.startsWith('order_')) {
                addMessage({ sender: 'bot', text: chatTree.order_selected.message });
                setCurrentNodeKey('order_selected');
            } else if (key === 'no_issue') {
                addMessage({ sender: 'bot', text: "I see. For older orders or other issues, please contact our call center." });
                setCurrentNodeKey('other');
            }
            else if (nextNode) {
                addMessage({ sender: 'bot', text: nextNode.message });
            }
            setIsTyping(false);
        }, 1000);
    };

    const currentNode = chatTree[currentNodeKey];
    const options = dynamicOptions || currentNode?.options;

    return (
        <main className="container mx-auto p-4 sm:p-6 lg:px-8 py-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg h-[70vh] flex flex-col">
                <div className="flex items-center p-4 border-b bg-green-600 text-white rounded-t-lg">
                    <h2 className="text-xl font-bold">Quicky Support Assistant</h2>
                </div>
                <div className="p-4 flex-grow overflow-y-auto bg-gray-50 flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && <div className="flex justify-start"><div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-500 rounded-bl-none">Typing...</div></div>}
                    <div ref={chatEndRef} />
                </div>
                <div className="p-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {!isTyping && options && Object.entries(options).map(([key, text]) => (
                        <button key={key} onClick={() => handleOptionClick(key, text)} className="w-full text-left p-3 border rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
                            {text}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
};

const CheckoutPage = ({ setPage }) => {
    const { currentUser, cart, cartTotal, clearCart, setActiveOrder, addresses, addAddress } = useAppContext();
    const [name, setName] = useState(currentUser?.user?.name || '');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [saveAddress, setSaveAddress] = useState(true);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress.address);
        setPhone(selectedAddress.phone);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        }
    }, []);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setError('');
        try {
            const orderResponse = await fetch(`${BACKEND_URL}/api/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: cartTotal, currency: 'INR' }),
            });
            if (!orderResponse.ok) throw new Error('Failed to create payment order.');
            const razorpayOrder = await orderResponse.json();
            const options = {
                key: "rzp_test_vYUIMG7QTjsC9i",
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Quicky",
                order_id: razorpayOrder.id,
                handler: async (response) => {
                    const data = {
                        razorpayDetails: response,
                        orderDetails: {
                            customerDetails: { name, phone, address },
                            items: Object.values(cart),
                            totalAmount: cartTotal,
                        },
                    };
                    const verificationRes = await fetch(`${BACKEND_URL}/api/payment-verification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${currentUser.token}`,
                        },
                        body: JSON.stringify(data),
                    });
                    const result = await verificationRes.json();
                    if (result.success) {
                        if (saveAddress) {
                            const addressExists = addresses.some(addr => addr.address === address && addr.phone === phone);
                            if (!addressExists) {
                                addAddress({
                                    label: `Saved on ${new Date().toLocaleDateString()}`,
                                    address,
                                    phone
                                });
                            }
                        }
                        setActiveOrder(result.order);
                        clearCart();
                        setPage('orderStatus');
                    } else {
                        throw new Error(result.message || 'Payment verification failed.');
                    }
                },
                prefill: { name, contact: phone },
                theme: { color: "#60A917" },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                    {addresses.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Select a saved address</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {addresses.map(addr => (
                                    <button key={addr.id} onClick={() => handleAddressSelect(addr)} className="text-left border p-4 rounded-md hover:border-green-500 hover:bg-green-50">
                                        <p className="font-bold">{addr.label}</p>
                                        <p className="text-sm text-gray-600">{addr.address}</p>
                                        <p className="text-sm text-gray-600">{addr.phone}</p>
                                    </button>
                                ))}
                            </div>
                            <p className="text-center my-4 text-gray-500">OR</p>
                        </div>
                    )}
                    <form onSubmit={handlePlaceOrder}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                            <textarea rows="3" value={address} onChange={e => setAddress(e.target.value)} className="block w-full border-gray-300 rounded-md p-3 shadow-sm focus:ring-green-500 focus:border-green-500" required />
                        </div>
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input type="checkbox" checked={saveAddress} onChange={e => setSaveAddress(e.target.checked)} className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                                <span className="ml-2 text-sm text-gray-600">Save this address for future orders</span>
                            </label>
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                        <button type="submit" disabled={isProcessing} className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400">
                            {isProcessing ? 'Processing...' : `Proceed to Payment (₹${cartTotal.toFixed(2)})`}
                        </button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        {Object.values(cart).map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t my-4"></div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

const OrderStatusPage = ({ setPage }) => {
    const { activeOrder, activeOrderStatus, activeOrderMessage, activeOrderProgress, activeOrderTimer } = useAppContext();
    
    if (!activeOrder) {
        return (
            <main className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold">No active order is being tracked.</h1>
                <button onClick={() => setPage('home')} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg">Go to Home</button>
            </main>
        );
    }
    
    const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    const steps = ['Placed', 'Confirmed', 'Out for Delivery', 'Delivered'];
    const currentStepIndex = steps.indexOf(activeOrderStatus);

    return (
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-2">{activeOrderStatus === 'Delivered' ? 'Order Delivered!' : 'Tracking Your Order'}</h1>
                <p className="text-gray-600 mb-8">{activeOrderMessage}</p>

                <div className="relative w-full my-12">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-green-500 -translate-y-1/2 transition-all duration-500" style={{ width: `${activeOrderProgress}%` }}></div>
                    <div className="flex justify-between">
                        {steps.map((step, index) => (
                            <div key={step} className="relative z-10 text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-colors duration-500 ${index <= currentStepIndex ? 'bg-green-500 border-2 border-white ring-4 ring-green-500' : 'bg-gray-200'}`}>
                                    {index <= currentStepIndex && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                                <p className={`mt-2 text-xs font-semibold ${index <= currentStepIndex ? 'text-green-600' : 'text-gray-500'}`}>{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {(activeOrderStatus === 'Confirmed' || activeOrderStatus === 'Out for Delivery') && (
                    <div className="my-10 p-4 rounded-lg bg-green-50">
                        <p className="text-sm text-gray-500">Estimated Arrival</p>
                        <p className="text-4xl font-bold text-green-800 tracking-wider">{formatTime(activeOrderTimer)}</p>
                    </div>
                )}

                <button onClick={() => setPage('home')} className="mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    Continue Shopping
                </button>
            </div>
        </main>
    );
};

const ProfilePage = ({ setPage }) => {
    const { currentUser, addresses, addAddress, deleteAddress } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [label, setLabel] = useState('');
    const [address, setAddressValue] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddAddress = (e) => {
        e.preventDefault();
        addAddress({ label, address, phone });
        setShowForm(false);
        setLabel('');
        setAddressValue('');
        setPhone('');
    };

    if (!currentUser) {
        useEffect(() => setPage('login'), [setPage]);
        return null;
    }

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-2">{currentUser.user.name}</h2>
                <p className="text-gray-600">{currentUser.user.email}</p>
                <p className="text-gray-600 mt-1">Mobile: {currentUser.user.phone || <span className="text-gray-400">Not provided</span>}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    <button onClick={() => setShowForm(!showForm)} className="text-green-600 font-semibold">{showForm ? 'Cancel' : '+ Add New Address'}</button>
                </div>

                {showForm && (
                    <form onSubmit={handleAddAddress} className="mb-6 p-4 border rounded-md">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Label (e.g., Home, Work)</label>
                            <input type="text" value={label} onChange={e => setLabel(e.target.value)} className="block w-full border-gray-300 rounded-md p-2 shadow-sm" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                            <textarea value={address} onChange={e => setAddressValue(e.target.value)} className="block w-full border-gray-300 rounded-md p-2 shadow-sm" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="block w-full border-gray-300 rounded-md p-2 shadow-sm" required />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">Save Address</button>
                    </form>
                )}

                <div className="space-y-4">
                    {addresses.length > 0 ? (
                        addresses.map(addr => (
                            <div key={addr.id} className="border p-4 rounded-md flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{addr.label}</p>
                                    <p className="text-sm text-gray-600">{addr.address}</p>
                                    <p className="text-sm text-gray-600">{addr.phone}</p>
                                </div>
                                <button onClick={() => deleteAddress(addr.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">You have no saved addresses.</p>
                    )}
                </div>
            </div>
        </main>
    );
};


// --- Main App Component ---
function App() {
    const [page, setPage] = useState('home');

    const renderPage = () => {
        switch (page) {
            case 'login': return <LoginPage setPage={setPage} />;
            case 'register': return <RegisterPage setPage={setPage} />;
            case 'orders': return <OrdersPage setPage={setPage} />;
            case 'support': return <SupportPage setPage={setPage} />;
            case 'checkout': return <CheckoutPage setPage={setPage} />;
            case 'orderStatus': return <OrderStatusPage setPage={setPage} />;
            case 'profile': return <ProfilePage setPage={setPage} />;
            case 'home':
            default: return <HomePage />;
        }
    };

    return (
        <AppProvider>
            <div className="font-sans bg-gray-100 min-h-screen">
                {page !== 'login' && page !== 'register' && <Header setPage={setPage} />}
                {renderPage()}
                <CartSidebar setPage={setPage} />
            </div>
        </AppProvider>
    );
}

export default App;
