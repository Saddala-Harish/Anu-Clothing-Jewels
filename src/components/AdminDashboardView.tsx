import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, Order, StoreSettings } from '../types';
import { 
  Shield, Plus, Edit2, Trash2, CheckCircle2, Lock, KeyRound, 
  Package, ShoppingBag, Settings, MessageCircle, ExternalLink, X, Save 
} from 'lucide-react';

const ADMIN_PASSCODE = 'varam2026';

export const AdminDashboardView: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    orders,
    updateOrderStatus,
    settings,
    updateSettings,
    showNotification
  } = useStore();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: 'Sarees',
    subCategory: '',
    price: 1999,
    originalPrice: 2499,
    discountPercent: 20,
    description: '',
    fabric: '',
    zariType: '',
    careInstructions: 'Dry clean only.',
    occasion: 'Festive & Weddings',
    images: ['/src/assets/images/saree_crimson_kanjivaram_1791904272322.jpg'],
    inStock: true,
    stockCount: 10,
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 12,
    availableSizes: ['Free Size'],
    availableColors: [{ name: 'Traditional', hex: '#8B1E3F' }]
  });

  // Settings local state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>({ ...settings });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError('');
      showNotification('Welcome to Varam Boutique Admin Portal', 'success');
    } else {
      setAuthError(`Invalid passcode. Please use demo passcode: ${ADMIN_PASSCODE}`);
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      sku: `VVJ-NEW-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Sarees',
      subCategory: 'Silk Saree',
      price: 2499,
      originalPrice: 3299,
      discountPercent: 24,
      description: 'Handcrafted luxury piece selected from our master weavers.',
      fabric: 'Pure Silk / Art Silk Blend',
      zariType: 'Antique Gold Zari Weave',
      careInstructions: 'Dry clean only.',
      occasion: 'Weddings & Celebrations',
      images: ['/src/assets/images/saree_crimson_kanjivaram_1791904272322.jpg'],
      inStock: true,
      stockCount: 5,
      isFeatured: true,
      isBestseller: false,
      isNewArrival: true,
      rating: 4.9,
      reviewsCount: 5,
      availableSizes: ['Free Size (with Blouse)'],
      availableColors: [{ name: 'Royal Red', hex: '#8B1E3F' }]
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      showNotification('Please provide product title and price', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
    } else {
      addProduct(productForm as Omit<Product, 'id'>);
    }
    setProductModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const getCustomerWhatsAppMessage = (order: Order) => {
    const num = order.customer.phoneNumber.replace(/[^0-9]/g, '');
    const msg = `Namaste ${order.customer.fullName}! 🙏\n\nThis is from *${settings.boutiqueName}* regarding your order *${order.orderNumber}*. Your package is currently marked as *${order.orderStatus.toUpperCase()}*. Thank you for shopping with us!`;
    return `https://wa.me/91${num}?text=${encodeURIComponent(msg)}`;
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-2xl border border-[#EBE1D4] p-8 shadow-md text-center space-y-6">
          <div className="w-14 h-14 bg-[#FAF7F2] text-[#7A1C2E] border border-[#D5C2B1] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C2E]">
              Restricted Access
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#2A1B22] mt-1">
              Boutique Admin Portal
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Manage inventory, update stock, view incoming orders, and configure boutique settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Admin Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-sm focus:outline-none focus:border-[#7A1C2E]"
                />
              </div>
              {authError && <p className="text-xs text-rose-600 mt-1 font-medium">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#7A1C2E] text-white font-semibold text-xs rounded-xl hover:bg-[#63101E] transition-colors shadow-xs"
            >
              Sign In to Admin
            </button>

            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-center text-xs text-amber-800">
              Demo Access Passcode: <strong className="font-mono">{ADMIN_PASSCODE}</strong>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE0D4]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C2E]">
            Store Administration
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22]">
            {settings.boutiqueName} Management
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time control over products, orders, delivery fees, and WhatsApp numbers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-1.5 border border-stone-300 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Lock Dashboard
          </button>
          {activeTab === 'products' && (
            <button
              onClick={handleOpenAddProduct}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7A1C2E] text-white text-xs font-bold rounded-xl hover:bg-[#63101E] transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EAE0D4] gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 relative flex items-center gap-2 transition-colors ${
            activeTab === 'products' ? 'text-[#7A1C2E] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Inventory ({products.length})</span>
          {activeTab === 'products' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E]" />}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 relative flex items-center gap-2 transition-colors ${
            activeTab === 'orders' ? 'text-[#7A1C2E] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
          {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E]" />}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 relative flex items-center gap-2 transition-colors ${
            activeTab === 'settings' ? 'text-[#7A1C2E] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Boutique & WhatsApp Settings</span>
          {activeTab === 'settings' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E]" />}
        </button>
      </div>

      {/* Tab 1: Products Inventory */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-[#EBE1D4] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-stone-600 border-b border-[#EBE1D4] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price / MRP</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-14 object-cover rounded-lg bg-[#FAF7F2] border border-[#F0E6D8] shrink-0"
                        />
                        <div>
                          <p className="font-serif font-bold text-stone-900 line-clamp-1 max-w-xs">{prod.name}</p>
                          <p className="text-[11px] text-stone-400 font-mono">SKU: {prod.sku}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-stone-700">{prod.category}</span>
                      <span className="block text-[11px] text-stone-400">{prod.subCategory}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-[#7A1C2E] tabular-nums">₹{prod.price.toLocaleString('en-IN')}</span>
                      {prod.originalPrice > prod.price && (
                        <span className="block text-[11px] text-stone-400 line-through tabular-nums">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateProduct(prod.id, { stockCount: Math.max(0, prod.stockCount - 1) })}
                          className="w-5 h-5 rounded border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="font-bold tabular-nums min-w-5 text-center">{prod.stockCount}</span>
                        <button
                          onClick={() => updateProduct(prod.id, { stockCount: prod.stockCount + 1 })}
                          className="w-5 h-5 rounded border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStock(prod.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          prod.inStock
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        {prod.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 text-stone-600 hover:text-[#7A1C2E] hover:bg-stone-100 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${prod.name}"?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders & Customer Requests */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#EBE1D4] p-12 text-center text-stone-500">
              <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 mb-2" />
              <p className="font-semibold text-sm">No customer orders placed yet</p>
              <p className="text-xs text-stone-400 mt-1">Orders placed via web checkout will appear here.</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl border border-[#EBE1D4] p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div>
                    <span className="font-mono text-sm font-bold text-[#7A1C2E]">{ord.orderNumber}</span>
                    <span className="text-xs text-stone-400 ml-2">
                      {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-stone-500">Status:</span>
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['orderStatus'])}
                      className="bg-[#FAF7F2] border border-[#D5C2B1] rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-900"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing & Packing</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                    </select>

                    <a
                      href={getCustomerWhatsAppMessage(ord)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#25D366] text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-[#1EBE5D] transition-colors"
                      title="WhatsApp Customer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Customer & Address Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <strong className="block text-stone-900">Customer: {ord.customer.fullName}</strong>
                    <p className="text-stone-600 font-mono">Phone: +91 {ord.customer.phoneNumber}</p>
                    {ord.customer.altPhone && <p className="text-stone-500 font-mono">Alt: +91 {ord.customer.altPhone}</p>}
                    {ord.customer.email && <p className="text-stone-500">Email: {ord.customer.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-stone-900">Delivery Address:</strong>
                    <p className="text-stone-600">{ord.customer.addressLine}</p>
                    <p className="text-stone-600">{ord.customer.city}, {ord.customer.state} - {ord.customer.pincode}</p>
                    {ord.customerNotes && <p className="text-amber-800 font-medium italic mt-1">Note: "{ord.customerNotes}"</p>}
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EBE1D4] text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-stone-700 pb-1 border-b border-stone-200">
                    <span>Items Ordered</span>
                    <span>Total: ₹{ord.total.toLocaleString('en-IN')} ({ord.paymentMethod.toUpperCase()})</span>
                  </div>
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-stone-600">
                      <span>{item.product.name} {item.selectedSize ? `(${item.selectedSize})` : ''} x {item.quantity}</span>
                      <span className="font-medium text-stone-900 tabular-nums">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Store & WhatsApp Settings */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-[#EBE1D4] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2A1B22]">Storefront & Contact Configuration</h2>
              <p className="text-xs text-stone-500">Modify store phone numbers, WhatsApp, UPI IDs, address, and delivery thresholds</p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7A1C2E] text-white text-xs font-bold rounded-xl hover:bg-[#63101E] shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Boutique Name</label>
              <input
                type="text"
                value={settingsForm.boutiqueName}
                onChange={(e) => setSettingsForm({ ...settingsForm, boutiqueName: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">WhatsApp Store Number (digits only with country code)</label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Display Calling Phone</label>
              <input
                type="text"
                value={settingsForm.displayPhone}
                onChange={(e) => setSettingsForm({ ...settingsForm, displayPhone: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Store UPI ID</label>
              <input
                type="text"
                value={settingsForm.upiId}
                onChange={(e) => setSettingsForm({ ...settingsForm, upiId: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                value={settingsForm.freeShippingThreshold}
                onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs tabular-nums"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Standard Shipping Fee (₹)</label>
              <input
                type="number"
                value={settingsForm.standardShippingFee}
                onChange={(e) => setSettingsForm({ ...settingsForm, standardShippingFee: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs tabular-nums"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">Boutique Physical Address</label>
              <input
                type="text"
                value={settingsForm.storeAddress}
                onChange={(e) => setSettingsForm({ ...settingsForm, storeAddress: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">City & State</label>
              <input
                type="text"
                value={`${settingsForm.city}, ${settingsForm.state}`}
                onChange={(e) => {
                  const [city, state] = e.target.value.split(',');
                  setSettingsForm({ ...settingsForm, city: city?.trim() || '', state: state?.trim() || '' });
                }}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Store Timings</label>
              <input
                type="text"
                value={settingsForm.businessHours}
                onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">Top Announcement Banner Text</label>
              <input
                type="text"
                value={settingsForm.announcementText}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#7A1C2E] text-white text-xs font-bold rounded-xl hover:bg-[#63101E] shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Boutique Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* Product Add/Edit Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E7D9C9] shadow-2xl p-6 relative">
            <button
              onClick={() => setProductModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-xl font-bold text-[#2A1B22] mb-4">
              {editingProduct ? 'Edit Product Details' : 'Add New Boutique Item'}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productForm.name || ''}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
                  >
                    <option value="Sarees">Sarees</option>
                    <option value="1-Gram Gold">1-Gram Gold</option>
                    <option value="Women's Clothing">Women's Clothing</option>
                    <option value="Girls' Dresses">Girls' Dresses</option>
                    <option value="Bangles">Bangles</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Subcategory *</label>
                  <input
                    type="text"
                    required
                    value={productForm.subCategory || ''}
                    onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price || 0}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice || 0}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={productForm.stockCount || 0}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Fabric Details</label>
                <input
                  type="text"
                  value={productForm.fabric || ''}
                  onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description || ''}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured || false}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="accent-[#7A1C2E]"
                  />
                  <span>Featured Collection</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isBestseller || false}
                    onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                    className="accent-[#7A1C2E]"
                  />
                  <span>Bestseller</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock ?? true}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="accent-[#7A1C2E]"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-semibold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1C2E] text-white rounded-xl font-bold hover:bg-[#63101E]"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
