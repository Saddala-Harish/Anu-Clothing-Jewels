import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, X, MessageCircle } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings, updateSettings, getGeneralWhatsAppUrl } = useStore();

  if (!settings.showAnnouncement) return null;

  return (
    <div className="bg-[#58111A] text-[#FAF7F2] text-xs font-medium py-2 px-4 transition-all relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <p className="truncate">
            {settings.announcementText}
          </p>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[#D4AF37] hover:underline shrink-0 font-semibold ml-2"
          >
            <MessageCircle className="w-3 h-3" />
            WhatsApp Us
          </a>
        </div>
        <button
          onClick={() => updateSettings({ showAnnouncement: false })}
          className="text-stone-300 hover:text-white shrink-0 p-0.5 rounded transition-colors"
          title="Dismiss announcement"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
