import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Seo } from '../components/common/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { submitLeadToSupabase } from '../lib/supabase';
import { ClientSubmission } from '../types';
import { siteConfig } from '../data/siteConfig';

export const BookCallPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '11:00 AM',
    businessType: 'Local Business',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ClientSubmission | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: ClientSubmission = {
      id: 'call_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: `Strategy Call Booking [${formData.preferredDate} @ ${formData.preferredTime}]`,
      businessType: formData.businessType,
      budget: 'Strategy Call',
      message: formData.message ? `Preferred Slot: ${formData.preferredDate} at ${formData.preferredTime}. Notes: ${formData.message}` : `Preferred Slot: ${formData.preferredDate} at ${formData.preferredTime}`,
      created_at: new Date().toISOString()
    };

    try {
      const existing: ClientSubmission[] = JSON.parse(localStorage.getItem('ik_client_submissions') || '[]');
      existing.unshift(submission);
      localStorage.setItem('ik_client_submissions', JSON.stringify(existing));
    } catch (err) {
      console.warn('Error saving local booking:', err);
    }

    await submitLeadToSupabase(submission);

    setIsSubmitting(false);
    setSubmitted(submission);
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '11:00 AM',
      businessType: 'Local Business',
      message: ''
    });
  };

  return (
    <>
      <Seo
        title="Book a Free Strategy Call | Imam Khan Bangalore"
        description="Schedule a 1-on-1 website strategy call with Imam Khan to discuss your business goals, website requirements, and custom proposal."
        canonicalUrl="/book-a-call"
      />

      <div className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Book a Strategy Call' }]} />
      </div>

      <section className="py-12 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            eyebrow="1-on-1 Consultation"
            title="Schedule Your Free"
            highlightText="Website Strategy Call"
            description="Pick a convenient day and time slot. We will discuss your business goals, competitor analysis in Bangalore, and project timeline."
          />

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/40 shadow-2xl text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#00ff88] mx-auto" />
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Strategy Call Request Confirmed!
              </h3>
              <p className="text-sm text-[#d1d1db] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{submitted.name}</strong>. Imam Khan will confirm your requested slot via WhatsApp/Phone at <strong className="text-white font-mono">{submitted.phone}</strong>.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Button href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="w-4 h-4 mr-2" />
                  <span>Message on WhatsApp Now</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Call Details Side (5 cols) */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-6">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  What We Cover on the Call:
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-[#d1d1db]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                    <span>In-depth review of your current website or new project goals</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                    <span>Analysis of top local competitors in Bangalore</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                    <span>Clear breakdown of recommended features, timeline &amp; budget</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                    <span>Direct Q&amp;A with lead web designer Imam Khan</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-white/10 text-xs text-[#8e8e9f] space-y-1">
                  <div>⏰ Call Duration: 15 to 20 Minutes</div>
                  <div>📍 Mode: Phone Call or WhatsApp Audio</div>
                </div>
              </div>

              {/* Form (7 cols) */}
              <form onSubmit={handleSubmit} className="md:col-span-7 p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ankit Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9632164784"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
                    >
                      <option value="10:00 AM">10:00 AM - Morning</option>
                      <option value="11:30 AM">11:30 AM - Late Morning</option>
                      <option value="02:30 PM">02:30 PM - Afternoon</option>
                      <option value="05:00 PM">05:00 PM - Evening</option>
                      <option value="07:30 PM">07:30 PM - Late Evening</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ankit@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                    Brief Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="What is your current website URL or main business goal?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full py-3.5">
                  <span>{isSubmitting ? 'Reserving Call Slot...' : 'Reserve Free Strategy Call Slot →'}</span>
                </Button>
              </form>
            </div>
          )}

        </div>
      </section>
    </>
  );
};
export default BookCallPage;
