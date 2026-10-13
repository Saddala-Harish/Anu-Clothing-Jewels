import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductCategory, CartItem, Order, StoreSettings, CustomerDetails, PaymentMethod } from '../types';
import { INITIAL_PRODUCTS, DEFAULT_STORE_SETTINGS } from '../data/initialProducts';

interface StoreContextType {
  // Navigation & Page State
  activePage: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'confirmation' | 'about' | 'contact' | 'admin';
  setActivePage: (page: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'confirmation' | 'about' | 'contact' | 'admin') => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  cartDiscount: number;
  cartTotal: number;
  couponCode: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders
  orders: Order[];
  lastOrder: Order | null;
  createOrder: (customer: CustomerDetails, paymentMethod: PaymentMethod, notes?: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Notifications
  notification: { message: string; type: 'success' | 'info' | 'error' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;

  // WhatsApp helpers
  getWhatsAppEnquiryUrl: (product: Product, selectedSize?: string, selectedColor?: string) => string;
  getWhatsAppOrderUrl: (order: Order) => string;
  getDirectWhatsAppCartUrl: () => string;
  getGeneralWhatsAppUrl: () => string;

  // Navigation helpers
  navigateToProduct: (productId: string) => void;
  navigateToCategory: (category: ProductCategory | 'All') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<StoreContextType['activePage']>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Notifications
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Products Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('vvj_products');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Settings Persistence
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('vvj_settings');
      if (saved) {
        return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Cart Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vvj_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [];
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState<string | null>(null);

  // Orders Persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('vvj_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
    }
    return [];
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('vvj_last_order');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load last order', e);
    }
    return null;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('vvj_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vvj_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('vvj_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vvj_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem('vvj_last_order', JSON.stringify(lastOrder));
    }
  }, [lastOrder]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Cart Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const cartDiscount = couponCode === 'VARAM10' ? Math.round(cartSubtotal * 0.1) : 0;
  const deliveryFee = cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0 ? 0 : settings.standardShippingFee;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + deliveryFee);

  const addToCart = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const chosenSize = size || (product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : undefined);
    const chosenColor = color || (product.availableColors && product.availableColors.length > 0 ? product.availableColors[0].name : undefined);
    const cartItemId = `${product.id}-${chosenSize || 'std'}-${chosenColor || 'std'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity,
          unitPrice: product.price
        }
      ];
    });

    showNotification(`Added "${product.name}" to your bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showNotification('Item removed from your bag', 'info');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'VARAM10') {
      setCouponCode('VARAM10');
      showNotification('Coupon VARAM10 applied! 10% discount added.', 'success');
      return { success: true, message: 'Festive 10% discount applied!' };
    }
    if (trimmed === 'FREESHIP') {
      showNotification('Free shipping is automatically applied above ₹1,999!', 'info');
      return { success: false, message: 'Free shipping automatically applies for orders above ₹1,999' };
    }
    showNotification('Invalid coupon code. Try VARAM10 for 10% off', 'error');
    return { success: false, message: 'Invalid coupon code. Try VARAM10' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    showNotification('Coupon removed', 'info');
  };

  // Orders
  const createOrder = (customer: CustomerDetails, paymentMethod: PaymentMethod, notes?: string): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `VVJ-${new Date().getFullYear()}-${randomSuffix}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}-${randomSuffix}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryCharge: deliveryFee,
      discount: cartDiscount,
      couponCode: couponCode || undefined,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      orderStatus: 'confirmed',
      customerNotes: notes
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setActivePage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showNotification(`Order status updated to ${status}`, 'success');
  };

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-custom-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    showNotification(`Product "${newProduct.name}" added to inventory`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showNotification('Product details updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification('Product removed from inventory', 'info');
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showNotification('Store settings saved successfully', 'success');
  };

  // WhatsApp Helpers
  const getWhatsAppEnquiryUrl = (product: Product, selectedSize?: string, selectedColor?: string) => {
    const number = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const variantInfo = [
      selectedSize ? `Size: ${selectedSize}` : '',
      selectedColor ? `Color: ${selectedColor}` : ''
    ].filter(Boolean).join(', ');

    const message = `Namaste *${settings.boutiqueName}*! 🙏\n\nI am interested in this piece from your collection:\n\n✨ *${product.name}*\n🏷️ SKU: ${product.sku}\n💰 Price: ₹${product.price.toLocaleString('en-IN')}${product.originalPrice ? ` (MRP ₹${product.originalPrice.toLocaleString('en-IN')})` : ''}\n📦 Category: ${product.category}${variantInfo ? `\n🎨 Variant: ${variantInfo}` : ''}\n\nCould you please confirm if this is currently available and share photos or video call details?\n\nThank you!`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  const getWhatsAppOrderUrl = (order: Order) => {
    const number = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const itemsList = order.items
      .map((item, idx) => `${idx + 1}. *${item.product.name}* ${item.selectedSize ? `(${item.selectedSize})` : ''} x ${item.quantity} = ₹${(item.unitPrice * item.quantity).toLocaleString('en-IN')}`)
      .join('\n');

    const message = `Namaste *${settings.boutiqueName}*! 🙏\n\nI have placed an order on your website:\n\n🛍️ *Order Reference:* ${order.orderNumber}\n📅 Date: ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n\n*Items Ordered:*\n${itemsList}\n\n💵 Subtotal: ₹${order.subtotal.toLocaleString('en-IN')}\n🚚 Delivery: ${order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}${order.discount > 0 ? `\n🏷️ Discount: -₹${order.discount}` : ''}\n💰 *Total Amount:* ₹${order.total.toLocaleString('en-IN')}\n💳 *Payment Mode:* ${order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : `UPI (${settings.upiId})`}\n\n*Delivery Address:*\n${order.customer.fullName}\nPhone: ${order.customer.phoneNumber}${order.customer.altPhone ? ` / ${order.customer.altPhone}` : ''}\n${order.customer.addressLine}${order.customer.landmark ? ` (Near ${order.customer.landmark})` : ''}\n${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n\nPlease confirm dispatch and tracking details. Thank you!`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  const getDirectWhatsAppCartUrl = () => {
    const number = settings.whatsappNumber.replace(/[^0-9]/g, '');
    if (cart.length === 0) {
      return `https://wa.me/${number}?text=${encodeURIComponent(`Namaste ${settings.boutiqueName}! I would like to explore your latest collection.`)}`;
    }
    const itemsList = cart
      .map((item, idx) => `${idx + 1}. *${item.product.name}* ${item.selectedSize ? `(${item.selectedSize})` : ''} x ${item.quantity} = ₹${(item.unitPrice * item.quantity).toLocaleString('en-IN')}`)
      .join('\n');

    const message = `Namaste *${settings.boutiqueName}*! 🙏\n\nI would like to place an order directly on WhatsApp for these items:\n\n${itemsList}\n\n💵 Subtotal: ₹${cartSubtotal.toLocaleString('en-IN')}\n🚚 Delivery: ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}${cartDiscount > 0 ? `\n🏷️ Discount: -₹${cartDiscount}` : ''}\n💰 *Estimated Total:* ₹${cartTotal.toLocaleString('en-IN')}\n\nPlease let me know how to proceed with payment and delivery. Thank you!`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  const getGeneralWhatsAppUrl = () => {
    const number = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = `Namaste *${settings.boutiqueName}*! 🙏\n\nI would like to know more about your latest Sarees and 1-Gram Gold Jewellery collection, and book a video-call shopping appointment.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  // Navigators
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category: ProductCategory | 'All') => {
    setSelectedCategory(category);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        cartDiscount,
        cartTotal,
        couponCode,
        applyCoupon,
        removeCoupon,
        orders,
        lastOrder,
        createOrder,
        updateOrderStatus,
        settings,
        updateSettings,
        notification,
        showNotification,
        getWhatsAppEnquiryUrl,
        getWhatsAppOrderUrl,
        getDirectWhatsAppCartUrl,
        getGeneralWhatsAppUrl,
        navigateToProduct,
        navigateToCategory
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
