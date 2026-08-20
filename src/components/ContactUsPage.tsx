import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { sanitizeText, sanitizeEmail, sanitizePhone, isValidEmail, rateLimiter } from '../lib/security';

export const ContactUsPage: React.FC<{
  onOpenStylistModal?: () => void;
  onSelectTab?: (tab: any) => void;
}> = ({ onOpenStylistModal, onSelectTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    message: '',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Rate limiting check
    const rateCheck = rateLimiter.isAllowed('contact-inquiry', 3, 60000);
    if (!rateCheck.allowed) {
      setFormError(`Too many inquiries submitted. Please wait ${rateCheck.waitSeconds} seconds before submitting again.`);
      return;
    }

    const cleanName = sanitizeText(formData.name, 80);
    const cleanEmail = sanitizeEmail(formData.email, 100);
    const cleanPhone = sanitizePhone(formData.phone, 20);
    const cleanMessage = sanitizeText(formData.message, 1000);

    if (!cleanName || cleanName.length < 2) {
      setFormError('Please enter a valid full name (minimum 2 characters).');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      setFormError('Please enter a detailed message (minimum 10 characters).');
      return;
    }

    setFormData({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      inquiryType: formData.inquiryType,
      message: cleanMessage,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-[#2B2220] text-[#FAF6F0] rounded-3xl p-8 sm:p-12 border border-[#423430] shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-white font-serif-brand text-9xl pointer-events-none select-none">
          Ochre
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C17D3C]/20 border border-[#C17D3C]/40 text-[#C17D3C] text-xs font-bold uppercase tracking-wider">
            <MessageSquare size={14} />
            <span>Dedicated Client Care & Design Studio</span>
          </div>
          <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            We're Here to Assist Your Living Space Vision
          </h1>
          <p className="text-sm sm:text-base text-[#D8CEBD] leading-relaxed">
            Have questions about custom solid wood dimensions, fabric swatches, order delivery, or warranty support? Speak directly with our master craftsmen and interior stylists in Rajasthan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E6DDD0] p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="font-serif-brand text-xl font-bold text-[#2B2220]">Get in Touch</h2>

            <div className="space-y-5 text-xs sm:text-sm text-[#2B2220]">
              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0]">
                <div className="p-3 bg-[#C17D3C]/10 text-[#C17D3C] rounded-full shrink-0 mt-0.5">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B2220]">Client Helpline & WhatsApp</h3>
                  <p className="text-[#6B5B54] mt-0.5">+91 (1800) 425-9898 / +91 98765 43210</p>
                  <p className="text-[11px] text-[#C17D3C] font-semibold mt-1">Direct connect with Rajasthan Workshop</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0]">
                <div className="p-3 bg-[#C17D3C]/10 text-[#C17D3C] rounded-full shrink-0 mt-0.5">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B2220]">Email Support</h3>
                  <p className="text-[#6B5B54] mt-0.5">care@ochrelifestyle.com</p>
                  <p className="text-[#6B5B54]">customs@ochrelifestyle.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0]">
                <div className="p-3 bg-[#C17D3C]/10 text-[#C17D3C] rounded-full shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B2220]">Flagship Studio & Experience Center</h3>
                  <p className="text-[#6B5B54] mt-0.5">
                    Plot 42, Artisan Handicraft Estate, Boranada Industrial Zone, Jodhpur, Rajasthan 342012, India
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0]">
                <div className="p-3 bg-[#C17D3C]/10 text-[#C17D3C] rounded-full shrink-0 mt-0.5">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B2220]">Studio Working Hours</h3>
                  <p className="text-[#6B5B54] mt-0.5">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                  <p className="text-[#6B5B54]">Sunday: Closed for Artisan Rest</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stylist Box */}
          <div className="bg-[#FAF6F0] rounded-2xl border border-[#E6DDD0] p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#C17D3C] font-bold text-xs uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Complimentary Service</span>
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-[#2B2220]">Need 1-on-1 Interior Styling Advice?</h3>
            <p className="text-xs text-[#6B5B54] leading-relaxed">
              Schedule a virtual session with an Ochre interior stylist to match wood tones, plan layout blueprints, or select stain fabric pairings for your home.
            </p>
            {onOpenStylistModal && (
              <button
                onClick={onOpenStylistModal}
                className="w-full bg-[#2B2220] text-white py-3 rounded-xl text-xs font-semibold hover:bg-[#C17D3C] transition-colors cursor-pointer"
              >
                Book Virtual Stylist Consultation
              </button>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-[#E6DDD0] p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif-brand text-2xl font-bold text-[#2B2220]">Send Us a Message</h2>
              <p className="text-xs text-[#6B5B54] mt-1">
                Fill in your details below and our client care team will respond within 4 business hours.
              </p>
            </div>

            {formError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            {submitted ? (
              <div className="p-8 bg-[#FAF6F0] rounded-2xl border border-[#E6DDD0] text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif-brand text-2xl font-bold text-[#2B2220]">Message Received!</h3>
                <p className="text-xs text-[#6B5B54] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry regarding <strong>{formData.inquiryType}</strong> has been assigned to a senior Ochre client advisor. We will reach out to you shortly at <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', inquiryType: 'General Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 bg-[#2B2220] text-white rounded-xl text-xs font-bold hover:bg-[#C17D3C] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-[#2B2220]">Full Name *</label>
                      <span className="text-[10px] text-[#9E8E87]">{formData.name.length}/80</span>
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: sanitizeText(e.target.value, 80) })}
                      className="w-full p-3 rounded-xl border border-[#E6DDD0] bg-[#FAF6F0] text-[#2B2220] focus:outline-none focus:border-[#C17D3C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-[#2B2220]">Email Address *</label>
                      <span className="text-[10px] text-[#9E8E87]">{formData.email.length}/100</span>
                    </div>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      placeholder="e.g. ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: sanitizeEmail(e.target.value, 100) })}
                      className="w-full p-3 rounded-xl border border-[#E6DDD0] bg-[#FAF6F0] text-[#2B2220] focus:outline-none focus:border-[#C17D3C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-[#2B2220]">Phone Number</label>
                      <span className="text-[10px] text-[#9E8E87]">{formData.phone.length}/20</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={20}
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: sanitizePhone(e.target.value, 20) })}
                      className="w-full p-3 rounded-xl border border-[#E6DDD0] bg-[#FAF6F0] text-[#2B2220] focus:outline-none focus:border-[#C17D3C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#2B2220]">Inquiry Subject</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: sanitizeText(e.target.value, 50) })}
                      className="w-full p-3 rounded-xl border border-[#E6DDD0] bg-[#FAF6F0] text-[#2B2220] focus:outline-none focus:border-[#C17D3C]"
                    >
                      <option>General Inquiry</option>
                      <option>Custom Furniture Blueprints</option>
                      <option>Order & Transit Status</option>
                      <option>Swatch Kit Request</option>
                      <option>Warranty & Transit Claim</option>
                      <option>Interior Stylist Booking</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#2B2220]">Your Message *</label>
                    <span className="text-[10px] text-[#9E8E87]">{formData.message.length}/1000</span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    maxLength={1000}
                    placeholder="Tell us about your room space requirements, dimensions, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: sanitizeText(e.target.value, 1000) })}
                    className="w-full p-3 rounded-xl border border-[#E6DDD0] bg-[#FAF6F0] text-[#2B2220] focus:outline-none focus:border-[#C17D3C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2B2220] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#C17D3C] transition-all cursor-pointer shadow-md"
                >
                  <Send size={16} />
                  <span>Send Inquiry to Ochre Studio</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
