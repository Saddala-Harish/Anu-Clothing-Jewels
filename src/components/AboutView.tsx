import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, MessageCircle, ShieldCheck, Heart, Users, MapPin, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setActivePage, setSelectedCategory, getGeneralWhatsAppUrl } = useStore();

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-[#24131B] text-[#FAF7F2] py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Boutique Heritage
          </span>
          <h1 className="font-royal text-3xl sm:text-5xl font-bold tracking-tight">
            The Story of Varam Vastra & Jewels
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            From intimate living room showcases and trusted WhatsApp Status previews to bringing royal Indian weaves and 1-gram gold temple jewelry to homes across the globe.
          </p>
        </div>
      </section>

      {/* 2. Boutique Journey */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-[#2A1B22] leading-tight">
              Rooted in Family Tradition & Authentic Weaves
            </h2>
            <p>
              <strong>Varam Vastra & Jewels</strong> was born out of a simple observation: modern women wanted authentic, pure Kanjivaram and Banarasi sarees and genuine temple jewelry, but dreaded the inflated retail showroom markups and artificial machine-made silks flood.
            </p>
            <p>
              In 2021, our founder began hand-selecting exclusive pieces straight from hereditary weaver clusters in Kanchipuram and master jewelry karigars in Coimbatore. We shared these through WhatsApp Status updates with close family and neighborhood friends in Hyderabad.
            </p>
            <p>
              Word spread organically. Women loved that they could jump on a 5-minute video call to inspect the real gold zari sheen, check the drape weight, and discuss blouse designs with someone who truly cared.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E7D9C9] shadow-md aspect-4/3 sm:aspect-square">
            <img
              src="/src/assets/images/hero_regal_boutique_1791904272171.jpg"
              alt="Varam Vastra boutique showroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3. The Pillars of Our Boutique */}
        <div className="pt-8 border-t border-[#EAE0D4]">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#2A1B22]">
              Why Patrons Trust Varam Vastra
            </h2>
            <p className="text-xs text-stone-500 mt-1">Our four unwavering commitments to every customer</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#7A1C2E] flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#2A1B22]">Pure Silk & Real Zari</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every saree is woven with certified pure mulberry silk and durable tested zari borders, preserving heritage Korvai craftsmanship.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#7A1C2E] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#2A1B22]">24K Micro-Plated Gold</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our 1-gram gold temple jewelry uses pure copper base metal and unheated kemp stones, identical in weight and feel to traditional 22K bridal gold.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#7A1C2E] flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#2A1B22]">Direct Weaver Support</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                By bypassing distributors, our artisan weavers receive equitable compensation, while our patrons get true boutique pricing.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#7A1C2E] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#2A1B22]">Personal WhatsApp Care</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                No automated bots. Chat directly with boutique stylists who help coordinate sarees with matching temple chokers and bangles.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Boutique Experience Banner */}
        <div className="bg-[#FAF4EB] rounded-2xl p-8 border border-[#E5D7C6] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-[#58111A]">
              Visit Our Hyderabad Boutique or Connect on Video Call
            </h3>
            <p className="text-xs text-stone-600 max-w-xl">
              Experience the tactile joy of traditional silks in our Jubilee Hills store or book a dedicated 1-on-1 virtual preview from anywhere in the world.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-[#7A1C2E] text-white text-xs font-semibold rounded-xl hover:bg-[#63101E] transition-colors"
            >
              Get Store Directions
            </button>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-xl hover:bg-[#1EBE5D] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
