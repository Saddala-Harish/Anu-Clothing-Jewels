import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, Menu, X, Shield, MessageCircle } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/initialProducts';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartOpen,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    getGeneralWhatsAppUrl
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (page: typeof activePage, category?: ProductCategory | 'All') => {
    setActivePage(page);
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('shop');
      setSearchOpen(false);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADFCF] transition-all">
      {/* Search Dropdown Strip if open */}
      {searchOpen && (
        <div className="bg-[#FAF7F2] border-b border-[#EADFCF] py-3 px-4 shadow-inner">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-[#7A1C2E] absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Kanjivaram sarees, 1-gram gold chokers, temple bangles, anarkalis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-24 py-2 bg-white text-sm text-[#2A1B22] border border-[#D5C2B1] rounded-full focus:outline-none focus:ring-1 focus:ring-[#7A1C2E] focus:border-[#7A1C2E]"
              />
              <button
                type="submit"
                className="absolute right-10 px-3 py-1 bg-[#7A1C2E] text-white text-xs font-medium rounded-full hover:bg-[#63101E] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single line, luxury display font) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#7A1C2E] text-[#D4AF37] flex items-center justify-center font-serif text-lg font-bold border border-[#D4AF37]/50 shadow-xs">
                V
              </div>
              <span className="font-royal text-xl sm:text-2xl font-bold tracking-tight text-[#58111A] group-hover:text-[#7A1C2E] transition-colors whitespace-nowrap">
                Varam Vastra <span className="text-[#D4AF37] font-serif font-normal">&</span> Jewels
              </span>
            </button>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A3B43]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#7A1C2E] transition-colors py-1 relative whitespace-nowrap shrink-0 ${
                activePage === 'home' ? 'text-[#7A1C2E] font-semibold' : ''
              }`}
            >
              Home
              {activePage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop', 'All')}
              className={`hover:text-[#7A1C2E] transition-colors py-1 relative whitespace-nowrap shrink-0 ${
                activePage === 'shop' ? 'text-[#7A1C2E] font-semibold' : ''
              }`}
            >
              Collections
              {activePage === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#7A1C2E] transition-colors py-1 relative whitespace-nowrap shrink-0 ${
                activePage === 'about' ? 'text-[#7A1C2E] font-semibold' : ''
              }`}
            >
              About Us
              {activePage === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#7A1C2E] transition-colors py-1 relative whitespace-nowrap shrink-0 ${
                activePage === 'contact' ? 'text-[#7A1C2E] font-semibold' : ''
              }`}
            >
              Contact & Visit
              {activePage === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1C2E] rounded-full" />
              )}
            </button>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1E5B3C] hover:text-[#16432C] hover:underline font-semibold whitespace-nowrap shrink-0 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              WhatsApp Orders
            </a>
          </nav>

          {/* Zone 3: Actions Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#4A3B43] hover:text-[#7A1C2E] hover:bg-[#F0E6D8] rounded-full transition-colors"
              title="Search store"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin Portal Key */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-full transition-colors ${
                activePage === 'admin'
                  ? 'text-[#7A1C2E] bg-[#F0E6D8]'
                  : 'text-[#6C5B64] hover:text-[#7A1C2E] hover:bg-[#F0E6D8]'
              }`}
              title="Admin Inventory Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#7A1C2E] text-white px-3.5 py-2 rounded-full hover:bg-[#63101E] transition-colors shadow-xs"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide uppercase">Bag</span>
              <span className="bg-[#D4AF37] text-[#58111A] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center -mr-1">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A3B43] hover:text-[#7A1C2E] rounded-lg transition-colors ml-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EADFCF] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activePage === 'home' ? 'bg-[#EFE6DA] text-[#7A1C2E] font-semibold' : 'text-[#4A3B43]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'All')}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activePage === 'shop' ? 'bg-[#EFE6DA] text-[#7A1C2E] font-semibold' : 'text-[#4A3B43]'
              }`}
            >
              All Collections
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activePage === 'about' ? 'bg-[#EFE6DA] text-[#7A1C2E] font-semibold' : 'text-[#4A3B43]'
              }`}
            >
              Our Boutique Story
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activePage === 'contact' ? 'bg-[#EFE6DA] text-[#7A1C2E] font-semibold' : 'text-[#4A3B43]'
              }`}
            >
              Contact & Video Shopping
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activePage === 'admin' ? 'bg-[#EFE6DA] text-[#7A1C2E] font-semibold' : 'text-[#4A3B43]'
              }`}
            >
              Admin Inventory & Orders
            </button>
          </div>

          {/* Quick Categories Bar */}
          <div className="pt-2 border-t border-[#EADFCF]">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2 px-3">
              Shop by Category
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleNavClick('shop', cat.name as ProductCategory)}
                  className="text-left px-3 py-2 bg-white rounded-lg border border-[#E5D7C6] text-xs font-medium text-[#58111A] hover:border-[#7A1C2E] transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Direct Contact Button in Mobile Drawer */}
          <div className="pt-2">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white font-semibold text-sm rounded-lg shadow-sm hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Chat Directly on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
