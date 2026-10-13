import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { 
  Star, ShoppingBag, MessageCircle, ShieldCheck, Truck, RefreshCw, 
  ArrowLeft, Check, Video, Sparkles, Heart, Share2, HelpCircle 
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    setActivePage,
    getWhatsAppEnquiryUrl,
    showNotification
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes?.[0] || ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors?.[0]?.name || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold">Product Not Found</h2>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-4 px-6 py-2 bg-[#7A1C2E] text-white rounded-lg text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Related products from same or complementary category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || (product.category === 'Sarees' && p.category === '1-Gram Gold')))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showNotification('Product link copied to clipboard!', 'info');
  };

  const isLowStock = product.inStock && product.stockCount > 0 && product.stockCount <= 4;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to Collections */}
      <button
        onClick={() => {
          setActivePage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#7A1C2E] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Collections
      </button>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Gallery (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-4/3 sm:aspect-4/3 w-full rounded-2xl overflow-hidden bg-white border border-[#E7D9C9] shadow-xs relative">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/src/assets/images/hero_regal_boutique_1791904272171.jpg';
              }}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.isBestseller && (
                <span className="bg-[#7A1C2E] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                  Boutique Bestseller
                </span>
              )}
              {product.isNewArrival && (
                <span className="bg-[#1E5B3C] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                  New Arrival
                </span>
              )}
            </div>

            {/* Share & Wishlist quick buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleCopyLink}
                className="p-2 bg-white/90 hover:bg-white text-stone-700 rounded-full shadow-sm backdrop-blur-xs transition-colors"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#7A1C2E] shadow-sm'
                      : 'border-[#EAE0D4] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Live Video Shopping Callout */}
          <div className="bg-[#FAF4EB] border border-[#E5D7C6] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#58111A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7A1C2E] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-sm text-[#2A1B22] font-serif">
                  Book a Live WhatsApp Video Shopping Session
                </strong>
                <p className="text-stone-600">
                  Inspect the saree drape, real zari shine, or jewellery weight in live natural daylight before purchasing.
                </p>
              </div>
            </div>
            <a
              href={getWhatsAppEnquiryUrl(product, selectedSize, selectedColor)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Video Call on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#EBE1D4] p-6 shadow-xs space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium mb-1.5">
                <span className="uppercase tracking-wider">{product.category} · {product.subCategory}</span>
                <span className="font-mono text-stone-400">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-700">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewsCount} boutique reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EBE1D4]">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-bold text-[#7A1C2E] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-stone-400 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-[#D4AF37]/20 text-[#7A1C2E] text-xs font-bold px-2 py-0.5 rounded">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Inclusive of all taxes · Free insured delivery across India above ₹1,999
              </p>
            </div>

            {/* Stock Level Banner */}
            {isLowStock ? (
              <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                ⚠️ Only {product.stockCount} piece(s) remaining in our Jubilee Hills boutique inventory!
              </div>
            ) : product.inStock ? (
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>In Stock & Ready for Express Dispatch</span>
              </div>
            ) : (
              <div className="text-xs font-semibold text-rose-800 bg-rose-50 px-3 py-2 rounded-lg border border-rose-200">
                Currently Out of Stock. Tap below to request custom pre-order on WhatsApp.
              </div>
            )}

            {/* Color Swatches */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Select Shade: <span className="text-stone-900 font-bold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.availableColors.map((col) => (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setSelectedColor(col.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedColor === col.name
                          ? 'border-[#7A1C2E] bg-white ring-1 ring-[#7A1C2E]'
                          : 'border-stone-200 bg-[#FAF7F2] text-stone-700'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-700">
                    Select Size / Drape Option:
                  </label>
                  <span className="text-[11px] text-[#7A1C2E] font-medium">Standard Boutique Sizing</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#7A1C2E] text-white border-[#7A1C2E]'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-[#7A1C2E]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between pt-2">
              <label className="text-xs font-semibold text-stone-700">Quantity</label>
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-xs font-bold text-stone-600 hover:bg-stone-200"
                >
                  -
                </button>
                <span className="px-3.5 text-xs font-bold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-3 py-1.5 text-xs font-bold text-stone-600 hover:bg-stone-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-3 border-t border-stone-100">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex items-center justify-center gap-2 py-3.5 bg-white text-[#7A1C2E] border-2 border-[#7A1C2E] rounded-xl text-xs font-bold hover:bg-[#FAF7F2] transition-colors shadow-2xs disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4 text-[#7A1C2E]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex items-center justify-center gap-2 py-3.5 bg-[#7A1C2E] text-white rounded-xl text-xs font-bold hover:bg-[#63101E] transition-colors shadow-sm disabled:opacity-50"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Prominent WhatsApp Enquiry Button */}
              <a
                href={getWhatsAppEnquiryUrl(product, selectedSize, selectedColor)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Enquire & Order via WhatsApp</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-2 border-t border-stone-100 space-y-1.5 text-[11px] text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Genuine Handcrafted Weave / Micro-Plated Gold</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Dispatches within 24-48 hours with live SMS tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Assistance available directly from boutique owner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Specifications Area */}
      <div className="mt-12 bg-white rounded-2xl border border-[#EBE1D4] p-6 sm:p-8 shadow-xs">
        <div className="flex border-b border-[#EAE0D4] gap-6 text-sm font-semibold mb-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'details' ? 'text-[#7A1C2E] font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Product Craftsmanship & Fabric
            {activeTab === 'details' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E]" />}
          </button>

          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'care' ? 'text-[#7A1C2E] font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Care Instructions
            {activeTab === 'care' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E]" />}
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'shipping' ? 'text-[#7A1C2E] font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Shipping & COD Policies
            {activeTab === 'shipping' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E]" />}
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
            <p>{product.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE1D4]">
                <strong className="block text-[#58111A] text-xs uppercase tracking-wider mb-0.5">Fabric & Texture</strong>
                <span>{product.fabric}</span>
              </div>
              {product.zariType && (
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE1D4]">
                  <strong className="block text-[#58111A] text-xs uppercase tracking-wider mb-0.5">Zari / Metal Finish</strong>
                  <span>{product.zariType}</span>
                </div>
              )}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE1D4]">
                <strong className="block text-[#58111A] text-xs uppercase tracking-wider mb-0.5">Occasion Suitability</strong>
                <span>{product.occasion}</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE1D4]">
                <strong className="block text-[#58111A] text-xs uppercase tracking-wider mb-0.5">Authenticity Certification</strong>
                <span>Handpicked and verified at Varam Vastra & Jewels Hyderabad Boutique</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl">
            <p className="font-semibold text-[#58111A]">Preserving your heirloom pieces:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>{product.careInstructions}</li>
              <li>For pure silks: Air dry in shade; never wring or expose to direct harsh afternoon sunlight.</li>
              <li>For 1-gram gold jewellery: Put on your jewellery AFTER perfume, hairspray, and body lotions have fully dried.</li>
              <li>Store jewellery in separate individual airtight zip pouches to prevent oxidation and scratches.</li>
            </ul>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl">
            <p className="font-semibold text-[#58111A]">Delivery Across India & Worldwide:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li><strong>Free Delivery:</strong> All orders of ₹1,999 and above enjoy free insured express shipping.</li>
              <li><strong>Dispatch Time:</strong> Orders are carefully inspected, bubble-wrapped, and dispatched within 24 to 48 hours.</li>
              <li><strong>Cash on Delivery (COD):</strong> Available across major PIN codes in India with verification call or WhatsApp message.</li>
              <li><strong>International Orders:</strong> NRI shipping to USA, UK, Canada, Australia, and UAE supported via WhatsApp enquiry.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C2E]">
                Handpicked Matches
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#2A1B22] mt-0.5">
                Complete Your Royal Look
              </h2>
            </div>
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#7A1C2E] hover:underline"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
