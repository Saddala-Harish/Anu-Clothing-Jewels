import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, ArrowRight, MessageCircle, ShoppingBag, ShieldCheck, Truck, Tag, ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    deliveryFee,
    cartDiscount,
    cartTotal,
    settings,
    couponCode,
    applyCoupon,
    removeCoupon,
    setActivePage,
    getDirectWhatsAppCartUrl
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  const freeShippingRemaining = Math.max(0, settings.freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb / Back */}
      <div className="mb-6">
        <button
          onClick={() => setActivePage('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#7A1C2E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
        <h1 className="font-serif text-3xl font-bold text-[#2A1B22] mt-2">
          Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EBE1D4] p-16 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-20 h-20 bg-[#FAF7F2] text-[#7A1C2E] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10 opacity-70" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-2">Your Bag is Empty</h2>
          <p className="text-sm text-stone-600 mb-6 max-w-md mx-auto">
            You haven't added any boutique pieces to your shopping bag yet. Discover our pure Kanjivarams, 1-gram gold temple jewellery, and festive collections.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A1C2E] text-white font-semibold text-sm rounded-xl hover:bg-[#63101E] transition-colors shadow-sm"
          >
            Explore Collections
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Alert Banner */}
            <div className="bg-[#FAF4EB] border border-[#E0D1BF] rounded-xl p-4 flex items-center gap-3 text-xs text-[#58111A]">
              <Truck className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <p>
                {freeShippingRemaining > 0 ? (
                  <>
                    Add items worth <strong className="text-[#7A1C2E]">₹{freeShippingRemaining.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE Shipping</strong> across India!
                  </>
                ) : (
                  <strong className="text-[#1E5B3C]">
                    🎉 You have unlocked Free Insured Delivery across India!
                  </strong>
                )}
              </p>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl border border-[#EBE1D4] shadow-xs divide-y divide-[#F2EAE0] overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="w-24 h-28 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#EBE1D4]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                            {item.product.category}
                          </span>
                          <h3 className="font-serif text-base font-bold text-[#2A1B22] mt-0.5">
                            {item.product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant & SKU */}
                      <div className="text-xs text-stone-600 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                        {item.selectedSize && <span>Size: <strong className="text-stone-800">{item.selectedSize}</strong></span>}
                        {item.selectedColor && <span>Color: <strong className="text-stone-800">{item.selectedColor}</strong></span>}
                        <span className="text-stone-400">SKU: {item.product.sku}</span>
                      </div>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-600">Quantity:</span>
                        <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-[#FAF7F2]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-xs font-bold text-stone-600 hover:bg-stone-200"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-bold text-stone-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-xs font-bold text-stone-600 hover:bg-stone-200"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold text-[#7A1C2E] tabular-nums">
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[11px] text-stone-400 tabular-nums">
                            ₹{item.unitPrice.toLocaleString('en-IN')} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-[#EBE1D4] flex items-center gap-2.5 text-xs text-stone-700">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>100% Quality Checked before packing</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#EBE1D4] flex items-center gap-2.5 text-xs text-stone-700">
                <Truck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Insured Pan-India Express Delivery</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#EBE1D4] flex items-center gap-2.5 text-xs text-stone-700">
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                <span>Video Call Support on WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#EBE1D4] p-6 shadow-xs sticky top-28 space-y-5">
              <h2 className="font-serif text-lg font-bold text-[#2A1B22] border-b border-[#F2EAE0] pb-3">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div className="space-y-2">
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>{couponCode} Applied (10% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (VARAM10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#D5C2B1] rounded-lg text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#7A1C2E]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-stone-800 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                    <button
                      type="button"
                      onClick={() => applyCoupon('VARAM10')}
                      className="text-[11px] text-[#7A1C2E] hover:underline font-semibold mt-1 flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" /> Tap to apply festive coupon: VARAM10
                    </button>
                  </div>
                )}
              </div>

              {/* Line items breakdown */}
              <div className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-[#1E5B3C] font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2A1B22] border-t border-stone-200 pt-3">
                  <span>Total Amount</span>
                  <span className="text-[#7A1C2E] text-lg tabular-nums">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => {
                    setActivePage('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#7A1C2E] text-white font-semibold text-sm rounded-xl hover:bg-[#63101E] transition-colors shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <a
                  href={getDirectWhatsAppCartUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold text-xs rounded-xl hover:bg-[#1EBE5D] transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order Directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
