import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { ClientSubmission } from '../../types';
import { submitLeadToSupabase } from '../../lib/supabase';
import { siteConfig } from '../../data/siteConfig';

export interface ContactFormProps {
  initialService?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService = '', className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    service: initialService,
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ClientSubmission | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: ClientSubmission = {
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: formData.name.trim().slice(0, 100),
      email: formData.email.trim().slice(0, 120),
      phone: formData.phone.trim().slice(0, 30),
      service: formData.businessType ? `${formData.service || 'Custom Website'} [${formData.businessType}]` : (formData.service || 'Custom Website'),
      businessType: formData.businessType,
      budget: formData.budget,
      message: formData.message.trim().slice(0, 1500),
      created_at: new Date().toISOString()
    };

    // Save locally
    try {
      const existing: ClientSubmission[] = JSON.parse(localStorage.getItem('ik_client_submissions') || '[]');
      existing.unshift(submission);
      localStorage.setItem('ik_client_submissions', JSON.stringify(existing));
    } catch (err) {
      console.warn('Failed to save submission locally:', err);
    }

    // Submit to Supabase
    await submitLeadToSupabase(submission);

    setIsSubmitting(false);
    setSubmittedData(submission);
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessType: '',
      service: '',
      budget: '',
      message: ''
    });
  };

  return (
    <div className={className}>
      {submittedData && (
        <div className="mb-6 p-6 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/50 shadow-[0_0_30px_rgba(0,255,136,0.15)] animate-in fade-in" role="alert" aria-live="polite">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#00ff88] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Inquiry Received, {submittedData.name}!
              </h4>
              <p className="text-xs sm:text-sm text-[#d1d1db] leading-relaxed">
                Thank you for your proposal request for <strong className="text-[#00ff88]">{submittedData.service}</strong> (Budget: <strong>{submittedData.budget}</strong>). Imam will contact you directly at <strong className="text-white font-mono">{submittedData.phone}</strong> within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Request A Free Strategy Call &amp; Quote
          </h3>
          <span className="text-[10px] uppercase font-bold text-[#00ff88] bg-[#00ff88]/10 px-2.5 py-1 rounded-full border border-[#00ff88]/20">
            24h Response
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1.5">
              Your Name *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              aria-required="true"
              maxLength={100}
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#00ff88] focus:outline-none focus:ring-1 focus:ring-[#00ff88]"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1.5">
              Email Address *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              aria-required="true"
              maxLength={120}
              placeholder="rahul@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#00ff88] focus:outline-none focus:ring-1 focus:ring-[#00ff88]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1.5">
              Phone / WhatsApp *
            </label>
            <input
              id="contact-phone"
              type="tel"
              required
              aria-required="true"
              maxLength={30}
              placeholder="+91 9632164784"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#00ff88] focus:outline-none focus:ring-1 focus:ring-[#00ff88]"
            />
          </div>

          <div>
            <label htmlFor="contact-business-type" className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1.5">
              Business Type *
            </label>
            <select
              id="contact-business-type"
              required
              aria-required="true"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white text-sm focus:border-[#00ff88] focus:outline-none cursor-pointer"
            >
              <option value="" disabled>Select Business Type</option>
              <option value="Gym / Fitness Center">Gym / Fitness Center</option>
              <option value="Clinic / Healthcare">Clinic / Healthcare</option>
              <option value="Local Service / Contractor">Local Service / Contractor</option>
              <option value="Automotive Business">Automotive Business</option>
              <option value="E-Commerce Store">E-Commerce Store</option>
              <option value="Corporate / Startup">Corporate / Startup</option>
              <option value="Other Industry">Other Industry</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-service" className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1.5">
              Website Requirement *
            </label>
            <select
              id="contact-service"
              required
              aria-required="true"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white text-sm focus:border-[#00ff88] focus:outline-none cursor-pointer"
            >
              <option value="" disabled>Select Requirement</option>
              <option value="Starter Landing Page (₹15,000)">Starter Landing Page (₹15,000)</option>
              <option value="Professional Website (₹25,000)">Professional Website (₹25,000)</option>
              <option value="E-Commerce Store (₹40,000)">E-Commerce Store (₹40,000)</option>
              <option value="Website Redesign & Modernization">Website Redesign &amp; Modernization</option>
              <option value="Custom Web App Portal (₹75,000+)">Custom Web App Portal (₹75,000+)</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-budget" className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1.5">
              Estimated Budget *
            </label>
            <select
              id="contact-budget"
              required
              aria-required="true"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white text-sm focus:border-[#00ff88] focus:outline-none cursor-pointer"
            >
              <option value="" disabled>Select Budget Range</option>
              <option value="₹15,000 - ₹25,000">₹15,000 – ₹25,000</option>
              <option value="₹25,000 - ₹40,000">₹25,000 – ₹40,000</option>
              <option value="₹40,000 - ₹75,000">₹40,000 – ₹75,000</option>
              <option value="₹75,000+">₹75,000+</option>
              <option value="Need Advice">Need Advice</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1.5">
            Project Goals &amp; Specifics
          </label>
          <textarea
            id="contact-message"
            rows={3}
            maxLength={1500}
            placeholder="Tell me about your business goals, target audience, preferred pages, or timeline..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#00ff88] focus:outline-none focus:ring-1 focus:ring-[#00ff88]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,136,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <span>{isSubmitting ? 'Submitting Proposal Request...' : 'Send Inquiry & Get Free Proposal →'}</span>
        </button>

        {/* Direct WhatsApp Option */}
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-[#00ff88]/10 hover:bg-[#00ff88]/20 border border-[#00ff88]/30 text-[#00ff88] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="w-4 h-4" />
          <span>Prefer WhatsApp? Chat Directly ({siteConfig.phone})</span>
        </a>

        <p className="text-[11px] text-[#a5a5b5] text-center pt-1">
          🔒 100% Confidential · Free Strategy Consultation · No Obligation
        </p>
      </form>
    </div>
  );
};
