import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerDetails, PaymentMethod } from '../types';
import { INDIAN_STATES } from '../data/initialProducts';
import { ShieldCheck, ArrowLeft, ArrowRight, QrCode, Banknote, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    cartDiscount,
    cartTotal,
    settings,
    createOrder,
    setActivePage
  } = useStore();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phoneNumber: '',
    altPhone: '',
    email: '',
    addressLine: '',
    landmark: '',
    city: '',
    state: 'Telangana',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-800 mb-2">No items to checkout</h2>
        <p className="text-sm text-stone-600 mb-6">Your shopping bag is empty. Please add items before proceeding to checkout.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-2.5 bg-[#7A1C2E] text-white font-semibold text-xs rounded-xl hover:bg-[#63101E]"
        >
          Browse Collections
        </button>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      newErrors.phoneNumber = 'Mobile number is required for delivery';
    } else if (cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.addressLine.trim()) {
      newErrors.addressLine = 'Flat / House No. and Street Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City / Town is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    const cleanPincode = formData.pincode.replace(/[^0-9]/g, '');
    if (!cleanPincode) {
      newErrors.pincode = 'PIN Code is required';
    } else if (cleanPincode.length !== 6) {
      newErrors.pincode = 'PIN Code must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    // Simulate swift boutique processing
    setTimeout(() => {
      createOrder(formData, paymentMethod, customerNotes);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Navigation Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setActivePage('cart')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#7A1C2E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping Bag
        </button>
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secure Boutique Checkout</span>
        </div>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22] mb-8">
        Delivery & Payment Details
      </h1>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Information */}
            <div className="bg-white rounded-2xl border border-[#EBE1D4] p-6 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#2A1B22] flex items-center gap-2 border-b border-[#F2EAE0] pb-3">
                <span className="w-6 h-6 rounded-full bg-[#7A1C2E] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                Contact & Recipient Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Smt. Lakshmi Priya Reddy"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm focus:outline-none focus:ring-1 ${
                      errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-[#D5C2B1] focus:ring-[#7A1C2E] focus:border-[#7A1C2E]'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number (for updates & delivery) <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-semibold text-stone-500">+91</span>
                    <input
                      id="phoneNumber"
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/[^0-9]/g, '') })}
                      className={`w-full pl-11 pr-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm font-mono focus:outline-none focus:ring-1 ${
                        errors.phoneNumber ? 'border-rose-500 focus:ring-rose-500' : 'border-[#D5C2B1] focus:ring-[#7A1C2E] focus:border-[#7A1C2E]'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-xs text-rose-600 mt-1">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label htmlFor="altPhone" className="block text-xs font-semibold text-stone-700 mb-1">
                    Alternative Phone (Optional)
                  </label>
                  <input
                    id="altPhone"
                    type="tel"
                    maxLength={10}
                    placeholder="Optional second number"
                    value={formData.altPhone || ''}
                    onChange={(e) => setFormData({ ...formData, altPhone: e.target.value.replace(/[^0-9]/g, '') })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-sm font-mono focus:outline-none focus:border-[#7A1C2E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address (for order receipt copy)
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-sm focus:outline-none focus:border-[#7A1C2E]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white rounded-2xl border border-[#EBE1D4] p-6 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#2A1B22] flex items-center gap-2 border-b border-[#F2EAE0] pb-3">
                <span className="w-6 h-6 rounded-full bg-[#7A1C2E] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                Indian Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="addressLine" className="block text-xs font-semibold text-stone-700 mb-1">
                    Flat / House No., Apartment & Street Address <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="addressLine"
                    rows={2}
                    placeholder="e.g. Flat 402, Sai Balaji Residency, Green Glen Layout, Outer Ring Road"
                    value={formData.addressLine}
                    onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm focus:outline-none focus:ring-1 ${
                      errors.addressLine ? 'border-rose-500 focus:ring-rose-500' : 'border-[#D5C2B1] focus:ring-[#7A1C2E] focus:border-[#7A1C2E]'
                    }`}
                  />
                  {errors.addressLine && <p className="text-xs text-rose-600 mt-1">{errors.addressLine}</p>}
                </div>

                <div>
                  <label htmlFor="landmark" className="block text-xs font-semibold text-stone-700 mb-1">
                    Famous Landmark (Optional)
                  </label>
                  <input
                    id="landmark"
                    type="text"
                    placeholder="e.g. Near Anjaneya Temple / Metro Pillar 140"
                    value={formData.landmark || ''}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-sm focus:outline-none focus:border-[#7A1C2E]"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-stone-700 mb-1">
                    City / Town <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="e.g. Hyderabad / Chennai / Bengaluru"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm focus:outline-none focus:ring-1 ${
                      errors.city ? 'border-rose-500 focus:ring-rose-500' : 'border-[#D5C2B1] focus:ring-[#7A1C2E] focus:border-[#7A1C2E]'
                    }`}
                  />
                  {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-xs font-semibold text-stone-700 mb-1">
                    State <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-sm focus:outline-none focus:border-[#7A1C2E]"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-xs font-semibold text-stone-700 mb-1">
                    6-Digit Postal PIN Code <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 500033"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/[^0-9]/g, '') })}
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm font-mono focus:outline-none focus:ring-1 ${
                      errors.pincode ? 'border-rose-500 focus:ring-rose-500' : 'border-[#D5C2B1] focus:ring-[#7A1C2E] focus:border-[#7A1C2E]'
                    }`}
                  />
                  {errors.pincode && <p className="text-xs text-rose-600 mt-1">{errors.pincode}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Packaging / Occasion Instructions (Optional)
                  </label>
                  <input
                    id="notes"
                    type="text"
                    placeholder="e.g. Wedding gift wrap, call before delivery, deliver after 4 PM"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-sm focus:outline-none focus:border-[#7A1C2E]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Preference */}
            <div className="bg-white rounded-2xl border border-[#EBE1D4] p-6 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#2A1B22] flex items-center gap-2 border-b border-[#F2EAE0] pb-3">
                <span className="w-6 h-6 rounded-full bg-[#7A1C2E] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                Payment Preference
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* UPI Option */}
                <label
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'upi'
                      ? 'border-[#7A1C2E] bg-[#FAF4EB]'
                      : 'border-[#EAE0D4] bg-white hover:border-[#D5C2B1]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <QrCode className="w-5 h-5 text-[#7A1C2E]" />
                      <span className="text-sm font-bold text-[#2A1B22]">UPI Payment</span>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#7A1C2E] mt-0.5"
                    />
                  </div>
                  <p className="text-xs text-stone-600 mt-2">
                    Pay via GPay, PhonePe, Paytm, or BHIM directly to store UPI ID. Zero extra fees.
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#EAE0D4] flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#58111A] bg-white px-2 py-0.5 rounded border border-[#E2D5C5]">
                      {settings.upiId}
                    </span>
                  </div>
                </label>

                {/* COD Option */}
                <label
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-[#7A1C2E] bg-[#FAF4EB]'
                      : 'border-[#EAE0D4] bg-white hover:border-[#D5C2B1]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <Banknote className="w-5 h-5 text-amber-700" />
                      <span className="text-sm font-bold text-[#2A1B22]">Cash on Delivery</span>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#7A1C2E] mt-0.5"
                    />
                  </div>
                  <p className="text-xs text-stone-600 mt-2">
                    Pay cash or courier QR scan upon doorstep delivery. Our boutique executive will call to verify.
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#EAE0D4]">
                    <span className="text-[11px] text-amber-800 font-medium">
                      Doorstep cash payment available
                    </span>
                  </div>
                </label>
              </div>

              {/* Informational Payment Notice */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EBE1D4] text-xs text-stone-600 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <p>
                  {paymentMethod === 'upi' ? (
                    <span>
                      <strong>UPI Instructions:</strong> Upon clicking "Place Order", your order reference will be generated. You can pay via UPI to <strong>{settings.upiId}</strong> or directly send your order confirmation on WhatsApp to complete payment.
                    </span>
                  ) : (
                    <span>
                      <strong>Cash on Delivery (COD):</strong> An executive from Varam Vastra & Jewels will reach out on WhatsApp / phone to confirm your address prior to dispatch.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right Summary: 5 cols */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#EBE1D4] p-6 shadow-xs sticky top-28 space-y-5">
              <h2 className="font-serif text-lg font-bold text-[#2A1B22] border-b border-[#F2EAE0] pb-3">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h2>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-stone-100">
                {cart.map((item) => (
                  <div key={item.id} className="pt-2.5 first:pt-0 flex gap-3 items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-md bg-[#FAF7F2] border border-[#F0E6D8] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#2A1B22] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        {item.selectedSize ? `Size: ${item.selectedSize} · ` : ''}
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#7A1C2E] tabular-nums">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Festive Discount</span>
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
                  <span>Total Payable</span>
                  <span className="text-[#7A1C2E] text-xl tabular-nums">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#7A1C2E] text-white font-semibold text-sm rounded-xl hover:bg-[#63101E] transition-all shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Order...</span>
                  ) : (
                    <>
                      <span>Place Order (₹{cartTotal.toLocaleString('en-IN')})</span>
                      <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust assurances */}
              <div className="text-[11px] text-stone-500 space-y-1.5 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Handcrafted Quality & Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Order copy sent instantly to your WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
