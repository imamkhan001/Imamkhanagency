import React, { useState, useEffect } from 'react';
import { Download, CheckSquare, Search, FileText, ClipboardList, Lock, Sparkles, Check, Printer, RefreshCw, X, Send } from 'lucide-react';
import { resources } from '../data/resources';
import { Seo } from '../components/common/Seo';
import { playLeadNotificationSound } from '../lib/sound';

export const ResourcesPage: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [activeResourceId, setActiveResourceId] = useState<string | null>(null);
  const [showGateModal, setShowGateModal] = useState(false);
  const [selectedResourceToUnlock, setSelectedResourceToUnlock] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Interactive Checklist State for Launch Checklist (Resource 1)
  const launchChecklistItems = [
    { id: 'dns', cat: 'Domain & Hosting', text: 'Domain DNS records pointed to high-speed hosting' },
    { id: 'ssl', cat: 'Domain & Hosting', text: 'SSL HTTPS Certificate installed and forcing HTTPS' },
    { id: 'mobile', cat: 'Responsive & Speed', text: 'Tested on mobile 360px, 390px, and 768px viewports' },
    { id: 'speed', cat: 'Responsive & Speed', text: 'Images converted to WebP under 200KB' },
    { id: 'wa', cat: 'Leads & Forms', text: 'Floating WhatsApp CTA button tested on mobile' },
    { id: 'forms', cat: 'Leads & Forms', text: 'Contact forms tested with confirmation emails' },
    { id: 'seo', cat: 'SEO & Schema', text: 'Google Search Console and XML sitemap submitted' },
    { id: 'gbp', cat: 'SEO & Schema', text: 'LocalBusiness JSON-LD schema injected with Bangalore NAP' },
    { id: 'analytics', cat: 'Analytics & Tracking', text: 'Google Analytics 4 event tracking configured' },
    { id: 'legal', cat: 'Legal & Security', text: 'Privacy Policy and Terms of Service pages published' }
  ];

  const [checkedLaunchItems, setCheckedLaunchItems] = useState<Record<string, boolean>>({});

  // Interactive Checklist State for Local SEO (Resource 2)
  const localSeoItems = [
    { id: 'gbp_claim', text: 'Google Business Profile claimed and phone verified' },
    { id: 'nap_sync', text: 'Address & Phone format matches website footer exactly' },
    { id: 'geo_keywords', text: 'H1 tags include neighborhood keywords (e.g. Indiranagar, Whitefield)' },
    { id: 'reviews', text: 'Minimum 10 verified Google 5-star reviews with location comments' },
    { id: 'map_embed', text: 'Interactive Google Map embedded on Contact page' }
  ];
  const [checkedLocalSeo, setCheckedLocalSeo] = useState<Record<string, boolean>>({});

  // Interactive Worksheet State (Resource 4)
  const [worksheetData, setWorksheetData] = useState({
    brandName: '',
    servicesList: '',
    targetAudience: '',
    competitorUrls: '',
    budgetTarget: '₹25,000 – ₹35,000'
  });

  useEffect(() => {
    const isUnlocked = localStorage.getItem('ik_resources_unlocked') === 'true';
    if (isUnlocked) {
      setUnlocked(true);
    }
  }, []);

  const handleOpenResource = (resId: string) => {
    if (unlocked) {
      setActiveResourceId(resId);
    } else {
      setSelectedResourceToUnlock(resId);
      setShowGateModal(true);
    }
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    // Store lead in localStorage
    const newLead = {
      id: 'lead-' + Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: 'resource',
      resourceTitle: selectedResourceToUnlock ? resources.find(r => r.id === selectedResourceToUnlock)?.title : 'All Resources',
      created_at: new Date().toISOString()
    };

    const existingLeads = JSON.parse(localStorage.getItem('client_submissions') || '[]');
    localStorage.setItem('client_submissions', JSON.stringify([newLead, ...existingLeads]));

    localStorage.setItem('ik_resources_unlocked', 'true');
    setUnlocked(true);
    setSubmitted(true);
    playLeadNotificationSound();

    setTimeout(() => {
      setShowGateModal(false);
      if (selectedResourceToUnlock) {
        setActiveResourceId(selectedResourceToUnlock);
      }
    }, 1200);
  };

  const toggleLaunchItem = (id: string) => {
    setCheckedLaunchItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLocalSeoItem = (id: string) => {
    setCheckedLocalSeo(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const launchProgress = Math.round(
    (Object.values(checkedLaunchItems).filter(Boolean).length / launchChecklistItems.length) * 100
  );

  return (
    <>
      <Seo
        title="Free Downloadable Resources & Checklists for Business Owners"
        description="Download free website launch checklists, local SEO guides, and website preparation worksheets by Imam Khan."
        canonicalUrl="https://imamkhan.vercel.app/resources"
      />

      <div className="py-12 bg-[#050505] text-[#f4f4f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-4">
              <Sparkles className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#00ff88]">
                Free Business Growth Assets
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Interactive Checklists &amp; Worksheets
            </h1>
            <p className="text-[#9e9eb0] text-base sm:text-lg">
              Practical assets to audit your web presence, prepare for a new website launch, and dominate local search in Bangalore.
            </p>
          </div>

          {/* Resources Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {resources.map(res => (
              <div
                key={res.id}
                className={`bg-[#0d0d12] border rounded-2xl p-6 flex flex-col justify-between transition-all ${
                  activeResourceId === res.id
                    ? 'border-[#00ff88] shadow-[0_0_25px_rgba(0,255,136,0.15)]'
                    : 'border-[#1a1a24] hover:border-[#00ff88]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#00ff88]/10 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
                      {res.category}
                    </span>
                    {unlocked ? (
                      <span className="text-xs text-[#00ff88] font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-xs text-[#8e8e9f] flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Free Access
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {res.title}
                  </h3>

                  <p className="text-xs text-[#9e9eb0] leading-relaxed mb-6">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1a1a24] flex items-center justify-between">
                  <span className="text-xs text-[#8e8e9f]">
                    {res.downloadCount}+ downloads
                  </span>
                  <button
                    onClick={() => handleOpenResource(res.id)}
                    className="px-4 py-2 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{unlocked ? 'View Interactive Tool' : 'Access Free Tool'}</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Active Interactive Tool Viewer Area (Rendered when unlocked and selected) */}
          {unlocked && activeResourceId && (
            <div className="bg-[#0d0d12] border border-[#00ff88]/30 rounded-2xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
              
              {/* Tool 1: Interactive Website Launch Checklist */}
              {activeResourceId === 'res-1' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#1a1a24]">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Interactive Website Launch Checklist</h2>
                      <p className="text-xs text-[#9e9eb0]">Tick off items as you verify your website before pointing live DNS.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="px-3.5 py-2 rounded-xl bg-[#111116] border border-[#1a1a24] text-white hover:border-[#00ff88] text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#00ff88]" />
                        <span>Print Checklist</span>
                      </button>
                      <button
                        onClick={() => setCheckedLaunchItems({})}
                        className="px-3.5 py-2 rounded-xl bg-[#111116] border border-[#1a1a24] text-[#9e9eb0] hover:text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#00ff88]">Launch Readiness: {launchProgress}%</span>
                      <span className="text-[#8e8e9f]">
                        {Object.values(checkedLaunchItems).filter(Boolean).length} of {launchChecklistItems.length} items completed
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[#111116] rounded-full overflow-hidden border border-[#1a1a24]">
                      <div
                        className="h-full bg-gradient-to-r from-[#00ff88] to-[#00d2ff] transition-all duration-300"
                        style={{ width: `${launchProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {launchChecklistItems.map(item => (
                      <label
                        key={item.id}
                        className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                          checkedLaunchItems[item.id]
                            ? 'bg-[#00ff88]/10 border-[#00ff88]/40 text-white'
                            : 'bg-[#050505] border-[#1a1a24] text-[#9e9eb0] hover:border-[#1a1a36]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedLaunchItems[item.id]}
                          onChange={() => toggleLaunchItem(item.id)}
                          className="mt-1 w-4 h-4 accent-[#00ff88]"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#00ff88] block">
                            {item.cat}
                          </span>
                          <span className="text-xs font-medium text-white">{item.text}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Tool 2: Local SEO Bangalore Checklist */}
              {activeResourceId === 'res-2' && (
                <div className="space-y-6">
                  <div className="pb-6 border-b border-[#1a1a24]">
                    <h2 className="text-2xl font-bold text-white">Local SEO Checklist for Bangalore Businesses</h2>
                    <p className="text-xs text-[#9e9eb0]">Master local search rankings in Indiranagar, Koramangala, and Whitefield.</p>
                  </div>

                  <div className="space-y-3">
                    {localSeoItems.map(item => (
                      <label
                        key={item.id}
                        className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                          checkedLocalSeo[item.id]
                            ? 'bg-[#00ff88]/10 border-[#00ff88]/40 text-white'
                            : 'bg-[#050505] border-[#1a1a24] text-[#9e9eb0]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedLocalSeo[item.id]}
                          onChange={() => toggleLocalSeoItem(item.id)}
                          className="w-4 h-4 accent-[#00ff88]"
                        />
                        <span className="text-xs font-semibold text-white">{item.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Tool 3: Dental Clinic & Gym Website Checklists */}
              {activeResourceId === 'res-3' && (
                <div className="space-y-6">
                  <div className="pb-6 border-b border-[#1a1a24]">
                    <h2 className="text-2xl font-bold text-white">Dental Clinic &amp; Gym Website Growth Checklists</h2>
                    <p className="text-xs text-[#9e9eb0]">Essential features required for healthcare and fitness portals.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-[#050505] border border-[#1a1a24] space-y-3">
                      <h3 className="text-base font-bold text-[#00ff88]">Dental Clinic Essentials</h3>
                      <ul className="space-y-2 text-xs text-[#9e9eb0]">
                        <li>✓ Doctor degrees, MDS specialization &amp; photo profile</li>
                        <li>✓ 1-tap WhatsApp appointment booking form</li>
                        <li>✓ Transparent indicative treatment pricing guide</li>
                        <li>✓ Verified Google patient reviews &amp; before/after smile gallery</li>
                        <li>✓ Sterilization &amp; hygiene standards section</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-[#050505] border border-[#1a1a24] space-y-3">
                      <h3 className="text-base font-bold text-[#00d2ff]">Gym &amp; Fitness Essentials</h3>
                      <ul className="space-y-2 text-xs text-[#9e9eb0]">
                        <li>✓ Free 1-Day Trial Pass lead form</li>
                        <li>✓ Membership tier comparison (Monthly, Quarterly, Annual)</li>
                        <li>✓ Virtual gym photo tour &amp; workout equipment list</li>
                        <li>✓ Certified coach profiles (ACE/K11 certified)</li>
                        <li>✓ Member body transformation stories &amp; results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tool 4: Pre-Hiring Preparation Worksheet */}
              {activeResourceId === 'res-4' && (
                <div className="space-y-6">
                  <div className="pb-6 border-b border-[#1a1a24] flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Web Designer Hiring Preparation Worksheet</h2>
                      <p className="text-xs text-[#9e9eb0]">Organize your brand details before starting your website project.</p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-[#00ff88] text-black font-bold text-xs uppercase"
                    >
                      Print Worksheet
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#00ff88] mb-1">Brand Name &amp; Business Tagline</label>
                      <input
                        type="text"
                        placeholder="e.g. SK Dental Clinic - Modern Oral Care in Indiranagar"
                        value={worksheetData.brandName}
                        onChange={e => setWorksheetData({ ...worksheetData, brandName: e.target.value })}
                        className="w-full p-3 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#00ff88] mb-1">List of Key Services Offered</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Root Canal, Teeth Whitening, Invisible Aligners, Dental Implants"
                        value={worksheetData.servicesList}
                        onChange={e => setWorksheetData({ ...worksheetData, servicesList: e.target.value })}
                        className="w-full p-3 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#00ff88] mb-1">Target Customer Profile</label>
                      <input
                        type="text"
                        placeholder="e.g. Working professionals and families in Indiranagar & Domlur"
                        value={worksheetData.targetAudience}
                        onChange={e => setWorksheetData({ ...worksheetData, targetAudience: e.target.value })}
                        className="w-full p-3 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      {/* Access Gate Modal */}
      {showGateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0d0d12] border border-[#00ff88]/40 rounded-2xl p-6 sm:p-8 max-w-md w-full relative space-y-6 shadow-2xl">
            <button
              onClick={() => setShowGateModal(false)}
              className="absolute top-4 right-4 text-[#8e8e9f] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center mx-auto border border-[#00ff88]/30">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Unlock Free Growth Assets</h3>
              <p className="text-xs text-[#9e9eb0]">
                Enter your details to instantly unlock all interactive checklists and downloadable worksheets.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-6 text-[#00ff88] font-bold text-sm space-y-2">
                <Check className="w-8 h-8 mx-auto" />
                <p>Unlocked! Loading your interactive tool...</p>
              </div>
            ) : (
              <form onSubmit={handleGateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                >
                  <span>Unlock Interactive Tools Now</span>
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

export default ResourcesPage;
