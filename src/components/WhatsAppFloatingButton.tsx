import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { getGeneralWhatsAppUrl, settings } = useStore();
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <aside aria-label="Customer Support" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Informative Tooltip */}
      {!tooltipDismissed && (
        <div className="bg-white border border-[#25D366]/40 shadow-xl rounded-2xl p-3 max-w-xs text-xs text-stone-800 animate-fadeIn relative">
          <button
            onClick={() => setTooltipDismissed(true)}
            className="absolute top-2 right-2 text-stone-400 hover:text-stone-700 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <strong className="text-[#103D24] text-[11px] uppercase tracking-wider font-bold">
              Boutique Online
            </strong>
          </div>
          <p className="text-[11px] text-stone-600 leading-snug pr-4">
            Need help choosing a saree or checking 1-gram jewellery size? Chat with us on WhatsApp!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Chat with boutique owner on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white shrink-0" />
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          WhatsApp Store
        </span>
      </a>
    </aside>
  );
};
