import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, MessageCircle, Printer, ArrowRight, Package, Calendar, MapPin, CreditCard } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, setActivePage, getWhatsAppOrderUrl, settings } = useStore();

  if (!lastOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-800 mb-2">No active order found</h2>
        <p className="text-sm text-stone-600 mb-6">Explore our collections and place an order to view your confirmation.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-2.5 bg-[#7A1C2E] text-white font-semibold text-xs rounded-xl hover:bg-[#63101E]"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  const orderDate = new Date(lastOrder.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Hero Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#7A1C2E] font-bold">
          Thank you for choosing Varam Vastra & Jewels
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A1B22]">
          Order Confirmed!
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Your order has been recorded in our boutique system. Our team is preparing your handcrafted pieces with care.
        </p>

        {/* Order Reference Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-[#D5C2B1] shadow-xs mt-2">
          <span className="text-xs text-stone-500 font-medium">Order Reference:</span>
          <span className="text-base font-mono font-bold text-[#7A1C2E]">{lastOrder.orderNumber}</span>
        </div>
      </div>

      {/* Primary WhatsApp Share Callout */}
      <div className="bg-[#EBF7F0] border-2 border-[#25D366]/60 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageCircle className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#103D24]">
              Send Order Confirmation on WhatsApp
            </h3>
            <p className="text-xs text-[#1E5B3C]">
              Share this order with our boutique desk on WhatsApp to confirm delivery time or share UPI payment screenshot.
            </p>
          </div>
        </div>
        <a
          href={getWhatsAppOrderUrl(lastOrder)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl shadow-sm transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Send Order on WhatsApp</span>
        </a>
      </div>

      {/* Order Receipt Details Container */}
      <div className="bg-white rounded-2xl border border-[#EBE1D4] shadow-xs overflow-hidden print:border-none print:shadow-none mb-8">
        {/* Meta Bar */}
        <div className="p-5 bg-[#FAF7F2] border-b border-[#EBE1D4] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-stone-400 block font-medium">Date Placed</span>
            <span className="font-semibold text-stone-900">{orderDate}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Total Amount</span>
            <span className="font-bold text-[#7A1C2E] text-sm tabular-nums">
              ₹{lastOrder.total.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Payment Mode</span>
            <span className="font-semibold text-stone-900">
              {lastOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : `UPI (${settings.upiId})`}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Order Status</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
              Confirmed
            </span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="p-6 divide-y divide-stone-100">
          <h2 className="font-serif text-base font-bold text-[#2A1B22] mb-4">
            Items in this Order
          </h2>
          {lastOrder.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center gap-4 first:pt-0">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-14 h-16 object-cover rounded-lg bg-[#FAF7F2] border border-[#F0E6D8] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#2A1B22] truncate">
                  {item.product.name}
                </h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  {item.selectedSize && <span>Size: {item.selectedSize} · </span>}
                  {item.selectedColor && <span>Color: {item.selectedColor} · </span>}
                  <span>Qty: {item.quantity}</span>
                </div>
              </div>
              <span className="text-sm font-bold text-[#7A1C2E] tabular-nums">
                ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        {/* Financial Summary */}
        <div className="p-6 bg-[#FAF7F2] border-t border-[#EBE1D4] space-y-2 text-xs text-stone-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-stone-900 tabular-nums">
              ₹{lastOrder.subtotal.toLocaleString('en-IN')}
            </span>
          </div>
          {lastOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Festive Coupon Discount ({lastOrder.couponCode})</span>
              <span className="tabular-nums">-₹{lastOrder.discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="font-semibold text-stone-900 tabular-nums">
              {lastOrder.deliveryCharge === 0 ? <strong className="text-[#1E5B3C]">FREE</strong> : `₹${lastOrder.deliveryCharge}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold text-[#2A1B22] border-t border-stone-300 pt-2.5">
            <span>Final Total Paid / Payable</span>
            <span className="text-[#7A1C2E] text-lg tabular-nums">
              ₹{lastOrder.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Delivery Address Card */}
        <div className="p-6 border-t border-[#EBE1D4] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-700">
          <div className="space-y-1">
            <span className="font-semibold text-stone-900 block flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7A1C2E]" />
              Shipping Destination
            </span>
            <p className="font-bold text-stone-900 text-sm">{lastOrder.customer.fullName}</p>
            <p>{lastOrder.customer.addressLine}</p>
            {lastOrder.customer.landmark && <p>Near: {lastOrder.customer.landmark}</p>}
            <p>{lastOrder.customer.city}, {lastOrder.customer.state} - {lastOrder.customer.pincode}</p>
            <p className="font-medium text-stone-900 pt-1">Phone: +91 {lastOrder.customer.phoneNumber}</p>
            {lastOrder.customer.altPhone && <p className="text-stone-500">Alt: +91 {lastOrder.customer.altPhone}</p>}
          </div>

          <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-xl border border-[#EBE1D4]">
            <span className="font-semibold text-stone-900 block flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#7A1C2E]" />
              Dispatch Timeline & Tracking
            </span>
            <p className="text-stone-600">
              Orders are packaged in moisture-proof bridal boutique boxing. Express dispatch is completed within <strong>24 to 48 hours</strong>.
            </p>
            <p className="text-stone-600">
              Tracking details will be sent directly to your phone via SMS and WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs"
        >
          <Printer className="w-4 h-4 text-stone-500" />
          <span>Print / Save Receipt</span>
        </button>

        <button
          onClick={() => {
            setActivePage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A1C2E] hover:bg-[#63101E] text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
};
