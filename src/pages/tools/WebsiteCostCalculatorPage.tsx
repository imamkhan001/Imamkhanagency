import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Send, ShieldCheck, X } from 'lucide-react';
import { Seo } from '../../components/common/Seo';
import { playLeadNotificationSound } from '../../lib/sound';

export const WebsiteCostCalculatorPage: React.FC = () => {
  const [businessType, setBusinessType] = useState('Local Service');
  const [pages, setPages] = useState('3–5 Pages');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'WhatsApp Lead Integration',
    'Google Business Local SEO'
  ]);
  const [timeline, setTimeline] = useState('Standard (10–14 Days)');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Quote Form
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const businessOptions = [
    'Dental & Healthcare Clinic',
    'Gym & Fitness Studio',
    'Local Service Business',
    'E-Commerce & Retail Store',
    'Tech Startup & B2B',
    'Personal / Portfolio'
  ];

  const pageOptions = [
    '1 Page Landing',
    '3–5 Pages (Standard)',
    '6–10 Pages',
    '10+ Pages (Custom)'
  ];

  const featureOptions = [
    { name: 'WhatsApp Lead Integration', cost: 0, desc: 'Instant 1-tap WhatsApp consultation' },
    { name: 'Online Booking & Scheduling', cost: 5000, desc: 'Automated appointment slots' },
    { name: 'E-Commerce Online Store', cost: 15000, desc: 'Razorpay/UPI payments & cart' },
    { name: 'Blog & Content Hub', cost: 3000, desc: 'Articles & SEO content manager' },
    { name: 'Google Business Local SEO', cost: 4000, desc: 'LocalBusiness JSON-LD & Maps' },
    { name: 'Custom Admin Dashboard', cost: 8000, desc: 'Manage leads & media assets' }
  ];

  const timelineOptions = [
    { name: 'Urgent (< 7 Days)', multiplier: 1.2 },
    { name: 'Standard (10–14 Days)', multiplier: 1.0 },
    { name: 'Flexible (15–30 Days)', multiplier: 0.95 }
  ];

  const toggleFeature = (featName: string) => {
    if (selectedFeatures.includes(featName)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== featName));
    } else {
      setSelectedFeatures([...selectedFeatures, featName]);
    }
  };

  // Calculation Logic
  const calculation = useMemo(() => {
    let base = 15000;

    if (pages === '1 Page Landing') base = 15000;
    else if (pages === '3–5 Pages (Standard)') base = 22000;
    else if (pages === '6–10 Pages') base = 32000;
    else if (pages === '10+ Pages (Custom)') base = 48000;

    let featureTotal = 0;
    featureOptions.forEach(f => {
      if (selectedFeatures.includes(f.name)) {
        featureTotal += f.cost;
      }
    });

    const timeObj = timelineOptions.find(t => t.name === timeline);
    const mult = timeObj ? timeObj.multiplier : 1.0;

    const calculatedMin = Math.round((base + featureTotal) * mult / 1000) * 1000;
    const calculatedMax = Math.round(calculatedMin * 1.25 / 1000) * 1000;

    let recommendedPlan = 'Starter Landing Page (₹15,000)';
    if (calculatedMin >= 40000) recommendedPlan = 'E-Commerce Online Store (₹40,000)';
    else if (calculatedMin >= 22000) recommendedPlan = 'Professional Business Website (₹25,000)';

    return {
      min: calculatedMin,
      max: calculatedMax,
      recommendedPlan
    };
  }, [pages, selectedFeatures, timeline]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.phone) return;

    const newLead = {
      id: 'lead-calc-' + Date.now(),
      name: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone,
      type: 'calculator',
      calculatorDetails: {
        businessType,
        pages,
        features: selectedFeatures,
        timeline,
        estimatedMin: calculation.min,
        estimatedMax: calculation.max
      },
      message: leadForm.notes,
      created_at: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('client_submissions') || '[]');
    localStorage.setItem('client_submissions', JSON.stringify([newLead, ...existing]));

    playLeadNotificationSound();
    setSubmitted(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <Seo
        title="Website Cost Calculator Bangalore | Instant Price Estimate"
        description="Calculate the estimated cost for your business website in Bangalore. Get transparent INR quotes mapped to Starter, Professional, and E-Commerce plans."
        canonicalUrl="https://imamkhan.vercel.app/tools/website-cost-calculator"
      />

      <div className="py-12 bg-[#050505] text-[#f4f4f6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-4">
              <Calculator className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#00ff88]">
                Instant Project Estimator
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Website Cost Calculator (Bangalore 2026)
            </h1>
            <p className="text-[#9e9eb0] text-base sm:text-lg">
              Select your business requirements to calculate a realistic INR price range aligned with our standard packages.
            </p>
          </div>

          {/* Calculator Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Options Panel (7 cols) */}
            <div className="lg:col-span-7 bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-6 sm:p-8 space-y-8">
              
              {/* Step 1: Business Type */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#00ff88] block">
                  1. Select Your Business Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {businessOptions.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBusinessType(type)}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        businessType === type
                          ? 'bg-[#00ff88] text-black font-bold shadow-[0_0_15px_rgba(0,255,136,0.2)]'
                          : 'bg-[#050505] text-[#9e9eb0] border border-[#1a1a24] hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Page Count */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#00ff88] block">
                  2. Approximate Page Count
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {pageOptions.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPages(p)}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        pages === p
                          ? 'bg-[#00ff88] text-black font-bold shadow-[0_0_15px_rgba(0,255,136,0.2)]'
                          : 'bg-[#050505] text-[#9e9eb0] border border-[#1a1a24] hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Key Features */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#00ff88] block">
                  3. Key Features Needed
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featureOptions.map(f => {
                    const isSelected = selectedFeatures.includes(f.name);
                    return (
                      <button
                        key={f.name}
                        type="button"
                        onClick={() => toggleFeature(f.name)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#00ff88]/10 border-[#00ff88] text-white'
                            : 'bg-[#050505] border-[#1a1a24] text-[#9e9eb0] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={isSelected ? 'text-[#00ff88] font-bold' : 'text-white'}>
                            {f.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#00ff88]" />}
                        </div>
                        <span className="text-[10px] text-[#8e8e9f] block">{f.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Timeline */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#00ff88] block">
                  4. Desired Launch Timeline
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {timelineOptions.map(t => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setTimeline(t.name)}
                      className={`p-3 rounded-xl text-[11px] font-semibold text-center transition-all cursor-pointer ${
                        timeline === t.name
                          ? 'bg-[#00ff88] text-black font-bold shadow-[0_0_15px_rgba(0,255,136,0.2)]'
                          : 'bg-[#050505] text-[#9e9eb0] border border-[#1a1a24] hover:text-white'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Results Sidebar (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <div className="bg-gradient-to-b from-[#0d0d12] to-[#111118] border border-[#00ff88]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Sparkles className="w-32 h-32 text-[#00ff88]" />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8e8e9f] tracking-widest block mb-1">
                    Indicative Price Range
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#00ff88] tracking-tight">
                    ₹{calculation.min.toLocaleString('en-IN')} – ₹{calculation.max.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-[#8e8e9f] mt-1 block">
                    *Includes domain, hosting setup, SSL &amp; mobile optimization
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#1a1a24]">
                  <div className="text-xs font-semibold text-white">Recommended Matching Plan:</div>
                  <div className="p-3 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] font-bold text-xs">
                    {calculation.recommendedPlan}
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs text-[#9e9eb0]">
                  <div className="font-semibold text-white">Your Estimate Summary:</div>
                  <ul className="space-y-1.5 text-[11px]">
                    <li>• Business: {businessType}</li>
                    <li>• Scale: {pages}</li>
                    <li>• Selected Features: {selectedFeatures.length} active</li>
                    <li>• Timeline: {timeline}</li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full py-3.5 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,136,0.3)] transition-all cursor-pointer"
                >
                  <span>Get Exact Proposal &amp; Discount</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 justify-center text-[10px] text-[#8e8e9f]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>30-Day Money-Back Guarantee Included</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Proposal Request Modal */}
      {showQuoteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="calc-modal-title"
        >
          <div className="bg-[#0d0d12] border border-[#00ff88]/40 rounded-2xl p-6 sm:p-8 max-w-md w-full relative space-y-6 shadow-2xl">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-[#8e8e9f] hover:text-white p-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00ff88]"
              aria-label="Close quote modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <h3 id="calc-modal-title" className="text-xl font-bold text-white">Lock In Your Estimate</h3>
              <p className="text-xs text-[#a5a5b5]">
                We will send an itemized proposal to your email and WhatsApp for ₹{calculation.min.toLocaleString('en-IN')}.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-6 text-[#00ff88] font-bold text-sm space-y-2" role="alert" aria-live="polite">
                <Check className="w-8 h-8 mx-auto" />
                <p>Proposal Request Sent! Imam Khan will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label htmlFor="calc-name" className="block text-xs font-semibold text-white mb-1">Full Name *</label>
                  <input
                    id="calc-name"
                    type="text"
                    required
                    aria-required="true"
                    maxLength={100}
                    placeholder="Your Name"
                    value={leadForm.name}
                    onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <div>
                  <label htmlFor="calc-email" className="block text-xs font-semibold text-white mb-1">Email Address *</label>
                  <input
                    id="calc-email"
                    type="email"
                    required
                    aria-required="true"
                    maxLength={120}
                    placeholder="your@email.com"
                    value={leadForm.email}
                    onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <div>
                  <label htmlFor="calc-phone" className="block text-xs font-semibold text-white mb-1">WhatsApp Number *</label>
                  <input
                    id="calc-phone"
                    type="tel"
                    required
                    aria-required="true"
                    maxLength={30}
                    placeholder="+91 9876543210"
                    value={leadForm.phone}
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <div>
                  <label htmlFor="calc-notes" className="block text-xs font-semibold text-white mb-1">Project Notes (Optional)</label>
                  <textarea
                    id="calc-notes"
                    rows={2}
                    maxLength={1000}
                    placeholder="Any specific reference websites or requirements..."
                    value={leadForm.notes}
                    onChange={e => setLeadForm({ ...leadForm, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-pointer"
                >
                  <span>Send Proposal Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WebsiteCostCalculatorPage;
