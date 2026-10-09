import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Phone, MessageCircle, X } from 'lucide-react';

// Official WhatsApp Logo Component
const WhatsAppIcon = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const WhatsAppFloatingBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [waNumber, setWaNumber] = useState('919311050670');
  const containerRef = useRef(null);

  // Fetch live WhatsApp number from site settings
  useEffect(() => {
    const fetchWa = async () => {
      try {
        const res = await fetch('/api/site-settings');
        if (res.ok) {
          const data = await res.json();
          const phone = data?.data?.topBar?.phone || data?.topBar?.phone || data?.data?.socialLinks?.whatsapp;
          if (phone) {
            const clean = phone.replace(/\D/g, '');
            if (clean.length >= 10) {
              setWaNumber(clean.startsWith('91') ? clean : `91${clean}`);
            }
          }
        }
      } catch (err) {}
    };
    fetchWa();
  }, []);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenChat = (topic = '') => {
    let msg = 'Hello Aayush Institute, I would like to inquire about course admissions, fee structures and batches.';
    if (topic) {
      msg = `Hello Aayush Institute, I need details regarding: ${topic}. Please guide me.`;
    }
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 md:bottom-8 right-4 sm:right-6 z-[999] flex flex-col items-end pointer-events-auto select-none"
    >
      {/* ── Quick Help Popup Menu ── */}
      {isOpen && (
        <div className="mb-3 w-[290px] sm:w-[320px] bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.18)] border border-emerald-200/90 p-3.5 sm:p-4 space-y-2.5 animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-emerald-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                <WhatsAppIcon className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">Aayush Support Hub</h4>
                <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • Typically replies in 5 min
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Options */}
          <div className="space-y-1.5">
            <button
              onClick={() => handleOpenChat('Admission & Batch Timings')}
              className="w-full p-2.5 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100 text-left border border-emerald-200/60 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0">
                  💬
                </span>
                <div>
                  <span className="text-xs font-semibold text-slate-800 block leading-tight">Chat with Counsellor</span>
                  <span className="text-[10.5px] text-slate-500 font-normal">Ask about batches, fees &amp; syllabus</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => handleOpenChat('Course Guidance & Syllabus')}
              className="w-full p-2.5 rounded-2xl bg-blue-50/80 hover:bg-blue-100 text-left border border-blue-200/60 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs shrink-0">
                  🎓
                </span>
                <div>
                  <span className="text-xs font-semibold text-slate-800 block leading-tight">Course Guidance</span>
                  <span className="text-[10.5px] text-slate-500 font-normal">Know the right tech or university course</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => handleOpenChat('Free Career Consultation')}
              className="w-full p-2.5 rounded-2xl bg-amber-50/80 hover:bg-amber-100 text-left border border-amber-200/60 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs shrink-0">
                  📋
                </span>
                <div>
                  <span className="text-xs font-semibold text-slate-800 block leading-tight">Free Career Advice</span>
                  <span className="text-[10.5px] text-slate-500 font-normal">1-on-1 personalized counselling</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>

          {/* Footer Direct WhatsApp Link */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-normal">
            <span>Direct WhatsApp</span>
            <button
              onClick={() => handleOpenChat()}
              className="text-emerald-600 font-semibold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Chat Now</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Circular WhatsApp Trigger Button (Exact Image 3 match) ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_10px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_30px_rgba(37,211,102,0.65)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer group"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Chat & Support"
      >
        {/* Subtle Outer Ping Wave */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* Centered White WhatsApp SVG Icon */}
        <WhatsAppIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 relative z-10 text-white drop-shadow-xs" />

        {/* Online Notification Beacon Dot on Top-Right (matching Image 3) */}
        <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-3.5 w-3.5 z-20 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-80" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#6ee7b7] border-2 border-white shadow-xs" />
        </span>
      </button>
    </div>
  );
};

export default WhatsAppFloatingBtn;
