import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, MapPin, Check, PhoneCall } from 'lucide-react';
import { StylistAppointment } from '../types';

export const StylistBookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
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

  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-[#E6DDD0] shadow-2xl overflow-hidden my-8 p-6 sm:p-8 space-y-6">
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
                <label className="block font-semibold text-[#2B2220] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Radhika Sharma"
                  className="w-full px-3 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B2220] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
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
                <label className="block font-semibold text-[#2B2220] mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
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
              <label className="block font-semibold text-[#2B2220] mb-1">Space Requirements / Notes</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
