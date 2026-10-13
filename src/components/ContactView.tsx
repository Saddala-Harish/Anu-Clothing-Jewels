import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, MessageCircle, Mail, MapPin, Clock, Video, 
  Send, CheckCircle2, Sparkles, Calendar 
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, getGeneralWhatsAppUrl, showNotification } = useStore();

  const [messageForm, setMessageForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const [videoCallForm, setVideoCallForm] = useState({
    name: '',
    phone: '',
    preferredDate: '',
    preferredSlot: 'Morning (11:00 AM - 1:00 PM)',
    interestedCategory: 'Bridal Kanjivaram Sarees'
  });

  const [messageSent, setMessageSent] = useState(false);
  const [videoSlotBooked, setVideoSlotBooked] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageForm.name || !messageForm.phone || !messageForm.message) {
      showNotification('Please fill in your name, phone, and message', 'error');
      return;
    }
    setMessageSent(true);
    showNotification('Thank you! Your message has been sent to our boutique team.', 'success');
  };

  const handleVideoCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoCallForm.name || !videoCallForm.phone || !videoCallForm.preferredDate) {
      showNotification('Please provide your name, phone, and preferred date', 'error');
      return;
    }
    setVideoSlotBooked(true);
    showNotification('Video shopping appointment requested! We will confirm on WhatsApp.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#7A1C2E] font-bold">
          We Would Love to Assist You
        </span>
        <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#2A1B22]">
          Visit Our Boutique or Chat Online
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Whether you're shopping for your dream wedding saree, need styling advice for temple jewellery, or want to visit our Jubilee Hills store, we're here for you.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Phone */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#7A1C2E] flex items-center justify-center mb-3">
            <Phone className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h3 className="font-serif text-sm font-bold text-[#2A1B22]">Boutique Calling Line</h3>
          <p className="text-xs text-stone-600 font-mono font-medium">
            {settings.displayPhone}
          </p>
          <a
            href={`tel:${settings.displayPhone.replace(/[^0-9+]/g, '')}`}
            className="text-xs text-[#7A1C2E] font-bold hover:underline block pt-1"
          >
            Call Now →
          </a>
        </div>

        {/* WhatsApp */}
        <div className="bg-white p-5 rounded-2xl border border-[#25D366]/40 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center mb-3">
            <MessageCircle className="w-5 h-5 fill-[#25D366]" />
          </div>
          <h3 className="font-serif text-sm font-bold text-[#2A1B22]">WhatsApp Store Desk</h3>
          <p className="text-xs text-stone-600 font-mono font-medium">
            +{settings.whatsappNumber}
          </p>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#1E5B3C] font-bold hover:underline block pt-1"
          >
            Open WhatsApp Chat →
          </a>
        </div>

        {/* Store Address */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#7A1C2E] flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h3 className="font-serif text-sm font-bold text-[#2A1B22]">Boutique Location</h3>
          <p className="text-xs text-stone-600 leading-snug">
            {settings.storeAddress}, {settings.city}, {settings.state} - {settings.pincode}
          </p>
        </div>

        {/* Hours */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBE1D4] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#7A1C2E] flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h3 className="font-serif text-sm font-bold text-[#2A1B22]">Store Timings</h3>
          <p className="text-xs text-stone-600 leading-snug">
            {settings.businessHours}
          </p>
        </div>
      </div>

      {/* Two Interactive Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: General Message Form (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#EBE1D4] shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#2A1B22] mb-1">
            Send an Enquiry to Our Stylist
          </h2>
          <p className="text-xs text-stone-500 mb-6">
            Leave a note regarding bulk wedding orders, customized blouse stitching, or specific weaves.
          </p>

          {messageSent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-900">Message Received!</h3>
              <p className="text-xs text-emerald-700">
                Our customer relationship team will get back to you on phone/WhatsApp within 2 business hours.
              </p>
              <button
                onClick={() => setMessageSent(false)}
                className="mt-3 text-xs text-emerald-800 underline font-semibold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smt. Kavitha Sundar"
                  value={messageForm.name}
                  onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={messageForm.phone}
                    onChange={(e) => setMessageForm({ ...messageForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="kavitha@example.com"
                    value={messageForm.email}
                    onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enquiry Subject
                </label>
                <select
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Bridal Wedding Package">Bridal Wedding Package</option>
                  <option value="Custom Jewelry Sizing">Custom Jewellery Sizing</option>
                  <option value="International NRI Shipping">International NRI Shipping</option>
                  <option value="Order Tracking">Existing Order Tracking</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Message Details <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you are looking for, color requirements, or date of function..."
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#7A1C2E] hover:bg-[#63101E] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Submit Boutique Enquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Book Live Video Shopping Session (6 cols) */}
        <div className="lg:col-span-6 bg-[#FAF4EB] p-6 sm:p-8 rounded-2xl border border-[#E5D7C6] shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A1C2E] mb-1">
            <Video className="w-4 h-4 text-[#7A1C2E]" />
            <span>Virtual Personal Shopping</span>
          </div>
          <h2 className="font-serif text-xl font-bold text-[#2A1B22] mb-1">
            Book a 1-on-1 WhatsApp Video Consultation
          </h2>
          <p className="text-xs text-stone-600 mb-6">
            View sarees in natural daylight, inspect temple choker craftsmanship, and get matched recommendations live with our boutique founders.
          </p>

          {videoSlotBooked ? (
            <div className="p-6 bg-white border border-[#D4AF37]/50 rounded-xl text-center space-y-2 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-[#1E5B3C] mx-auto" />
              <h3 className="text-sm font-bold text-stone-900">Session Requested!</h3>
              <p className="text-xs text-stone-600">
                Our team will confirm your video call slot on WhatsApp at <strong>{videoCallForm.phone}</strong>.
              </p>
              <div className="pt-2">
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  Connect Immediately on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVideoCallSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smt. Radhika Rao"
                  value={videoCallForm.name}
                  onChange={(e) => setVideoCallForm({ ...videoCallForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Mobile Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210 (For WhatsApp Video Call)"
                  value={videoCallForm.phone}
                  onChange={(e) => setVideoCallForm({ ...videoCallForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Date <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={videoCallForm.preferredDate}
                    onChange={(e) => setVideoCallForm({ ...videoCallForm, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={videoCallForm.preferredSlot}
                    onChange={(e) => setVideoCallForm({ ...videoCallForm, preferredSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                  >
                    <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:30 PM - 8:00 PM)">Evening (5:30 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Items of Interest to Preview
                </label>
                <select
                  value={videoCallForm.interestedCategory}
                  onChange={(e) => setVideoCallForm({ ...videoCallForm, interestedCategory: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5C2B1] rounded-xl text-xs focus:outline-none focus:border-[#7A1C2E]"
                >
                  <option value="Bridal Kanjivaram Sarees">Bridal Kanjivaram Sarees</option>
                  <option value="Banarasi & Chanderi Sarees">Banarasi & Chanderi Silk Sarees</option>
                  <option value="1-Gram Temple Jewellery Chokers">1-Gram Gold Temple Chokers & Harams</option>
                  <option value="Temple Kemp Bangles Set">Temple Kemp & Kada Bangles Set</option>
                  <option value="Designer Anarkalis & Lehengas">Designer Anarkalis & Lehengas</option>
                  <option value="Girls Pattu Pavadai">Girls' Traditional Pattu Pavadai</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1E5B3C] hover:bg-[#16432C] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Confirm Video Call Appointment</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
