import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/initialProducts';
import { ProductCategory } from '../types';
import { 
  ArrowRight, MessageCircle, Sparkles, ShieldCheck, Video, 
  Truck, Star, Tag, Check, Award, HeartHandshake, PhoneCall 
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    setActivePage,
    setSelectedCategory,
    applyCoupon,
    getGeneralWhatsAppUrl
  } = useStore();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 4);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category as ProductCategory);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-[#24131B] text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy: 7 cols */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handcrafted Silks & 1-Gram Temple Gold Collection</span>
              </div>

              <h1 className="font-royal text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Timeless Indian Elegance, Handwoven For Your Celebrations
              </h1>

              <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                From curated bridal Kanjivarams and Banarasi weaves to heirloom-inspired 1-gram gold temple jewellery. Expand your wardrobe with authentic South Indian boutique craftsmanship.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setActivePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-[#2A1B22] font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="block font-royal text-xl sm:text-2xl font-bold text-[#D4AF37]">100%</span>
                  <span className="text-[11px] text-stone-300">Pure Handloom & Zari</span>
                </div>
                <div>
                  <span className="block font-royal text-xl sm:text-2xl font-bold text-[#D4AF37]">24K Micro</span>
                  <span className="text-[11px] text-stone-300">1-Gram Gold Plating</span>
                </div>
                <div>
                  <span className="block font-royal text-xl sm:text-2xl font-bold text-[#D4AF37]">15,000+</span>
                  <span className="text-[11px] text-stone-300">WhatsApp Patrons</span>
                </div>
              </div>
            </div>

            {/* Right Image Showcase: 5 cols */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl group">
                <img
                  src="/src/assets/images/hero_regal_boutique_1791904272171.jpg"
                  alt="Varam Vastra and Jewels boutique royal saree and temple jewellery showcase"
                  className="w-full aspect-4/3 lg:aspect-4/3 object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    Boutique Showcase
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Maharani Wedding Edition
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Kanjivaram Silk with Antique Lakshmi Temple Choker
                  </p>
                </div>
              </div>

              {/* Floating WhatsApp Video Shopping Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white text-[#2A1B22] p-3 rounded-xl shadow-xl border border-[#D4AF37]/50 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#58111A]">Live Video Shopping</p>
                  <p className="text-[11px] text-stone-500">View real saree drape on call</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Shortcuts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1.5 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C2E]">
            Curated Boutiques
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22]">
            Explore by Product Category
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Browse our specialized collections crafted for festive poojas, weddings, and classical functions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {CATEGORIES_LIST.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group bg-white rounded-2xl border border-[#E7D9C9] hover:border-[#D4AF37] p-3 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col text-center"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#FAF7F2] mb-3 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                  {cat.tag}
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-[#2A1B22] group-hover:text-[#7A1C2E] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                {cat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C2E]">
              Handcrafted Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22] mt-0.5">
              Featured Boutique Treasures
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Top curated silks and antique temple jewellery pieces loved by our patrons.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#7A1C2E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Festive Offer / Coupon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#58111A] via-[#7A1C2E] to-[#450C14] rounded-2xl p-6 sm:p-10 text-white border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Festive Wedding Special Offer
            </span>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold leading-tight">
              Get Flat 10% OFF On Your Entire Order
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Celebrate the season with pure Kanjivaram silks and 1-gram gold jewellery. Apply code at checkout or mention it in your WhatsApp order message.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-white/10 backdrop-blur-md border border-[#D4AF37]/50 rounded-xl px-4 py-2">
                <span className="text-xs text-stone-300 mr-2 font-medium">Coupon Code:</span>
                <span className="font-mono text-sm font-bold text-[#D4AF37] tracking-wider">VARAM10</span>
              </div>
              <button
                onClick={() => applyCoupon('VARAM10')}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C5A059] text-[#2A1B22] text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Apply Coupon Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E5B3C]">
              Fresh Off The Loom & Workshop
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22] mt-0.5">
              New Arrivals This Week
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Newly woven Katan and Chanderi sarees, festive Anarkalis, and floral kemp bangles.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#7A1C2E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All New</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. WhatsApp Boutique Story & Video Shopping Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E7D9C9] p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C2E]">
                From WhatsApp Status to Online Boutique
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22] leading-tight">
                Shopping with Us is Just Like Calling Family
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Varam Vastra & Jewels began as a passionate home-curated venture in Hyderabad. For over 3 years, our patrons selected their wedding sarees and temple jewellery through WhatsApp Status previews and personal 1-on-1 video calls.
              </p>
              <div className="space-y-2 pt-2 text-xs text-stone-700">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#1E5B3C] shrink-0" />
                  <span><strong>Live Daylight Video Calls:</strong> Request to view any saree or jewellery piece under natural light before confirming.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#1E5B3C] shrink-0" />
                  <span><strong>Custom Stitching Assistance:</strong> We assist with unstitched blouse tailoring, fall-pico, and custom bangle sizing.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#1E5B3C] shrink-0" />
                  <span><strong>Safe Delivery with Tracking:</strong> Insured pan-India dispatch with live tracking updates on WhatsApp.</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Connect With Owner on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-[#FAF7F2] hover:bg-[#F2EAE0] text-[#58111A] font-bold text-xs rounded-xl border border-[#D5C2B1] transition-colors"
                >
                  Read Our Full Story
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="aspect-3/4 rounded-xl overflow-hidden border border-[#E7D9C9] shadow-xs">
                <img
                  src="/src/assets/images/saree_crimson_kanjivaram_1791904272322.jpg"
                  alt="Kanjivaram Saree Pallu Weaving"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-3/4 rounded-xl overflow-hidden border border-[#E7D9C9] shadow-xs mt-6">
                <img
                  src="/src/assets/images/jewel_temple_choker_1791904273999.jpg"
                  alt="Temple Jewelry Choker Detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C2E]">
              Patron Favorites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22] mt-0.5">
              All-Time Boutique Bestsellers
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              The pieces that our customers repeatedly gift, recommend, and cherish.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#7A1C2E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 8. Patron Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C2E]">
            Client Stories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B22]">
            Words From Our Boutique Patrons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "Ordered the Maharani Crimson Kanjivaram for my daughter's wedding. The zari weight and drape exceeded my expectations. The video call consultation helped us choose with full confidence!"
            </p>
            <div className="pt-2 border-t border-stone-100">
              <strong className="block text-xs text-[#2A1B22]">Dr. Shanti Rao</strong>
              <span className="text-[11px] text-stone-500">Bengaluru, Karnataka</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "The Lakshmi Temple Choker set looks just like pure 22K gold! None of my relatives at the function could tell it was 1-gram micro gold. Packaging was exquisite."
            </p>
            <div className="pt-2 border-t border-stone-100">
              <strong className="block text-xs text-[#2A1B22]">Ananya Varma</strong>
              <span className="text-[11px] text-stone-500">Hyderabad, Telangana</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "Bought the Pattu Pavadai set for my 4-year-old niece for Varalakshmi Pooja. The cotton lining was so gentle on her skin, and the zari did not poke at all. Wonderful service!"
            </p>
            <div className="pt-2 border-t border-stone-100">
              <strong className="block text-xs text-[#2A1B22]">Meenakshi Sundaram</strong>
              <span className="text-[11px] text-stone-500">Chennai, Tamil Nadu</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
