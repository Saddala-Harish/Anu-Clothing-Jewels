import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES_LIST } from '../data/initialProducts';
import { ProductCategory } from '../types';
import { MessageCircle, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActivePage, setSelectedCategory, getGeneralWhatsAppUrl } = useStore();

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName as ProductCategory);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F1218] text-[#FAF7F2] border-t border-[#D4AF37]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-xs">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#7A1C2E] text-[#D4AF37] flex items-center justify-center font-serif text-lg font-bold border border-[#D4AF37]/50">
                V
              </div>
              <span className="font-royal text-xl font-bold tracking-tight text-white">
                Varam Vastra <span className="text-[#D4AF37] font-serif font-normal">&</span> Jewels
              </span>
            </div>

            <p className="text-stone-300 leading-relaxed max-w-sm">
              An authentic Indian women's boutique curating pure Kanjivaram and Banarasi silk sarees, handcrafted girls' Pattu Pavadai, and heirloom 1-gram gold temple jewellery with personalized WhatsApp shopping assistance.
            </p>

            <div className="pt-1 flex flex-wrap gap-2.5">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authentic Weaves</span>
              </span>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] tracking-wider uppercase">
              Boutique Weaves
            </h4>
            <ul className="space-y-2 text-stone-300">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-white hover:underline transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support & Pages */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] tracking-wider uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Our Boutique Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Book Video Shopping
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Shipping & Return Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white hover:underline transition-colors text-stone-400"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Store Address */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] tracking-wider uppercase">
              Store Location
            </h4>
            <div className="space-y-2 text-stone-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{settings.storeAddress}, {settings.city}, {settings.state} - {settings.pincode}</span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{settings.displayPhone}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{settings.businessHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} {settings.boutiqueName}. Handcrafted in India. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-stone-400">Accepted Payments:</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-stone-200 font-bold">UPI / GPay</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-stone-200 font-bold">PhonePe</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-stone-200 font-bold">Paytm</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-stone-200 font-bold">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
