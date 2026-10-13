import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, MessageCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    navigateToProduct,
    getWhatsAppEnquiryUrl
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || (quickViewProduct.availableSizes?.[0] || '');
  const currentColor = selectedColor || (quickViewProduct.availableColors?.[0]?.name || '');

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentSize, currentColor, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    navigateToProduct(quickViewProduct.id);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E7D9C9] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 rounded-full transition-colors shadow-sm"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left: Gallery */}
          <div className="space-y-3">
            <div className="aspect-4/3 sm:aspect-square w-full rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#EBE1D4]">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#7A1C2E]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium mb-1">
                <span>{quickViewProduct.category} · {quickViewProduct.subCategory}</span>
                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl font-bold text-[#2A1B22] leading-tight mb-2">
                {quickViewProduct.name}
              </h2>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-[#7A1C2E] tabular-nums">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {quickViewProduct.discountPercent && (
                  <span className="bg-[#D4AF37]/20 text-[#7A1C2E] text-xs font-bold px-2 py-0.5 rounded">
                    {quickViewProduct.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                {quickViewProduct.description}
              </p>

              {/* Fabric & Zari specs */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EBE1D4] text-xs space-y-1 mb-4">
                <div><span className="font-semibold text-[#58111A]">Fabric:</span> {quickViewProduct.fabric}</div>
                {quickViewProduct.zariType && (
                  <div><span className="font-semibold text-[#58111A]">Zari:</span> {quickViewProduct.zariType}</div>
                )}
              </div>

              {/* Size Selection */}
              {quickViewProduct.availableSizes && quickViewProduct.availableSizes.length > 0 && (
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Select Option / Size:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
                          currentSize === size
                            ? 'bg-[#7A1C2E] text-white border-[#7A1C2E]'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-[#7A1C2E]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-4">
                <label className="text-xs font-semibold text-stone-700">Quantity:</label>
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-sm font-semibold text-stone-600 hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(quickViewProduct.stockCount, quantity + 1))}
                    className="px-2.5 py-1 text-sm font-semibold text-stone-600 hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-stone-500">
                  ({quickViewProduct.stockCount} available)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#F2EAE0]">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!quickViewProduct.inStock}
                  className="flex items-center justify-center gap-2 py-2.5 bg-[#7A1C2E] text-white rounded-xl text-xs font-semibold hover:bg-[#63101E] transition-colors disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  Add to Bag
                </button>
                <a
                  href={getWhatsAppEnquiryUrl(quickViewProduct, currentSize, currentColor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] text-white rounded-xl text-xs font-semibold hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Ask on WhatsApp
                </a>
              </div>

              <button
                type="button"
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-semibold text-[#7A1C2E] hover:underline py-1"
              >
                View Full Specifications & Care Guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
