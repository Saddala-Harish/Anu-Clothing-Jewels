import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Tag, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  const freeShippingRemaining = Math.max(0, settings.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / settings.freeShippingThreshold) * 100);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E5D7C6] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E5D7C6] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7A1C2E]" />
              <h2 className="font-serif text-lg font-bold text-[#2A1B22]">
                Your Boutique Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#FAF4EB] px-5 py-2.5 border-b border-[#EADFCF] text-xs">
            <div className="flex items-center justify-between font-medium text-stone-700 mb-1">
              <div className="flex items-center gap-1.5 text-[#58111A]">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                {freeShippingRemaining > 0 ? (
                  <span>
                    Add <strong className="text-[#7A1C2E]">₹{freeShippingRemaining.toLocaleString('en-IN')}</strong> more for <strong>FREE Delivery</strong>!
                  </span>
                ) : (
                  <span className="text-[#1E5B3C] font-semibold">
                    🎉 Congratulations! You have unlocked FREE Delivery Across India!
                  </span>
                )}
              </div>
            </div>
            <div className="w-full h-1.5 bg-[#E2D5C5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7A1C2E] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 bg-[#F2EAE0] rounded-full flex items-center justify-center mx-auto text-[#7A1C2E]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our handpicked collection of Kanjivaram silk sarees, 1-gram gold jewellery, and festive wear.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#7A1C2E] text-white text-xs font-semibold rounded-lg hover:bg-[#63101E] transition-colors"
                >
                  Browse Collections
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white p-3 rounded-xl border border-[#EBE1D4] shadow-2xs relative"
                >
                  {/* Item Image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#F0E6D8]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#2A1B22] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Info */}
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {item.selectedSize ? `Size: ${item.selectedSize}` : ''}
                        {item.selectedSize && item.selectedColor ? ' · ' : ''}
                        {item.selectedColor ? `Color: ${item.selectedColor}` : ''}
                      </p>

                      <p className="text-xs font-bold text-[#7A1C2E] mt-1 tabular-nums">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        {item.quantity > 1 && (
                          <span className="text-[10px] font-normal text-stone-500 ml-1">
                            (₹{item.unitPrice.toLocaleString('en-IN')} each)
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-stone-300 rounded-md bg-[#FAF7F2] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold text-stone-600 hover:bg-stone-200"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-stone-600 hover:bg-stone-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E5D7C6] bg-white space-y-3.5 shadow-lg">
              {/* Coupon Code Input */}
              <div className="space-y-1.5">
                {couponCode ? (
                  <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Coupon <strong>{couponCode}</strong> applied (10% OFF)</span>
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
                        placeholder="Have a coupon? Try VARAM10"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-lg text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#7A1C2E]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-stone-800 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                    <button
                      type="button"
                      onClick={() => applyCoupon('VARAM10')}
                      className="text-[11px] text-[#7A1C2E] hover:underline font-semibold mt-1 flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" /> Click here to apply festive code: VARAM10 (10% OFF)
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-2.5">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Festive Discount</span>
                    <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-[#1E5B3C] font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2A1B22] border-t border-stone-200 pt-2">
                  <span>Total Amount</span>
                  <span className="text-[#7A1C2E] text-base tabular-nums">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 text-center">
                  Includes all applicable GST & boutique quality guarantee
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* Standard Web Checkout */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#7A1C2E] text-white font-semibold text-sm rounded-xl hover:bg-[#63101E] transition-colors shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                {/* Direct WhatsApp Ordering */}
                <a
                  href={getDirectWhatsAppCartUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white font-semibold text-xs rounded-xl hover:bg-[#1EBE5D] transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
