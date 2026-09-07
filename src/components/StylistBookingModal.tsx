import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, MapPin, Check, PhoneCall, AlertCircle } from 'lucide-react';
import { StylistAppointment } from '../types';
import { sanitizeText, sanitizePhone, rateLimiter } from '../lib/security';
import { atelierStore } from '../lib/store';
import { useBodyScrollLock } from '../lib/useBodyScrollLock';

export const StylistBookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const [formData, setFormData] = useState<StylistAppointment>({
    name: '',
    email: '',
    phone: '',
    city: 'Mumbai',
    consultationType: 'virtual',
    preferredDate: '',
    preferredTime: '11:00 AM',
    notes: '',
    roomType: 'Living Room',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const rateCheck = rateLimiter.isAllowed('stylist-booking', 3, 60000);
    if (!rateCheck.allowed) {
      setFormError(`Too many booking requests. Please wait ${rateCheck.waitSeconds} seconds before trying again.`);
      return;
    }

    const cleanName = sanitizeText(formData.name, 80);
    const cleanPhone = sanitizePhone(formData.phone, 20);
    const cleanNotes = sanitizeText(formData.notes, 500);

    if (!cleanName || cleanName.length < 2) {
      setFormError('Please enter a valid name (minimum 2 characters).');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 8) {
      setFormError('Please enter a valid phone number with area code.');
      return;
    }

    if (!formData.preferredDate) {
      setFormError('Please select a preferred consultation date.');
      return;
    }

    setFormData({
      ...formData,
      name: cleanName,
      phone: cleanPhone,
      notes: cleanNotes,
    });

    const bookingRecord = {
      id: `STYL-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: cleanName,
      phone: cleanPhone,
      roomType: formData.roomType,
      consultationType: formData.consultationType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      notes: cleanNotes,
      status: 'Confirmed & Scheduled' as const,
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    atelierStore.addStylistBooking(bookingRecord);
    setConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overscroll-contain animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl border border-[#E6DDD0] shadow-2xl overflow-y-auto max-h-[92vh] sm:max-h-[90vh] my-auto p-4 sm:p-8 space-y-4 sm:space-y-6 overscroll-contain touch-pan-y"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FAF6F0] hover:bg-[#2B2220] hover:text-white rounded-full transition-colors text-[#2B2220] cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C17D3C]/10 text-[#C17D3C] text-[11px] font-semibold uppercase tracking-widest">
            <Sparkles size={14} />
            <span>Complimentary Design Studio</span>
          </div>

          <h3 className="font-serif-brand text-2xl sm:text-3xl font-medium text-[#2B2220]">
            Book an Ochre Interior Stylist
          </h3>

          <p className="text-xs text-[#6B5B54]">
            Receive personalized moodboards, floorplan layouts, and material recommendations tailored to your floor dimensions.
          </p>
        </div>

        {formError && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-rose-600" />
            <span>{formError}</span>
          </div>
        )}

        {confirmed ? (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-[#C17D3C] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check size={32} />
            </div>

            <h4 className="font-serif-brand text-xl font-medium text-[#2B2220]">
              Consultation Scheduled!
            </h4>

            <p className="text-xs text-[#6B5B54]">
              Our lead interior consultant will reach out via WhatsApp / phone to confirm your 3D floor plan layout details.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#2B2220] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#C17D3C] transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-[#2B2220]">Your Name *</label>
                  <span className="text-[10px] text-[#9E8E87]">{formData.name.length}/80</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: sanitizeText(e.target.value, 80) })}
                  placeholder="Radhika Sharma"
                  className="w-full px-3 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-[#2B2220]">Phone Number *</label>
                  <span className="text-[10px] text-[#9E8E87]">{formData.phone.length}/20</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={20}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: sanitizePhone(e.target.value, 20) })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#2B2220] mb-1">Consultation Mode</label>
                <select
                  value={formData.consultationType}
                  onChange={(e) =>
                    setFormData({ ...formData, consultationType: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C] bg-white"
                >
                  <option value="virtual">Virtual Video Session</option>
                  <option value="in-store">Flagship Showroom Visit</option>
                  <option value="home-visit">At-Home Site Visit</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#2B2220] mb-1">Target Room</label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: sanitizeText(e.target.value, 50) })}
                  className="w-full px-3 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C] bg-white"
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Master Bedroom">Master Bedroom</option>
                  <option value="Full Apartment">Entire Home / Villa</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#2B2220] mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C] bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2220] mb-1">Preferred Time</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C] bg-white"
                >
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-[#2B2220]">Space Requirements / Notes</label>
                <span className="text-[10px] text-[#9E8E87]">{formData.notes.length}/500</span>
              </div>
              <textarea
                rows={2}
                maxLength={500}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: sanitizeText(e.target.value, 500) })}
                placeholder="Mention dimensions, preferred wood stains, or budget notes..."
                className="w-full px-3 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-xl font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall size={16} />
              <span>Confirm Free Consultation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
