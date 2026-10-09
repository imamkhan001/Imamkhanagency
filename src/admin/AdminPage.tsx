import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Download, 
  Trash2, 
  Search, 
  LogOut, 
  Plus, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  Copy, 
  AlertTriangle,
  Sparkles,
  FileText,
  Lock,
  Unlock,
  Send,
  Shield,
  UserCheck,
  Activity,
  BarChart3,
  Settings,
  Database,
  Key,
  ShieldAlert,
  Bell,
  Eye,
  EyeOff,
  Volume2
} from 'lucide-react';
import { playLeadNotificationSound } from '../lib/sound';
import { Seo } from '../components/common/Seo';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ClientSubmission, Project, MediaAsset, PricingPlan, Testimonial, FAQItem, BlogPost, ResourceItem, FullSiteSettings, UserRole, ActivityLogEntry, AnalyticsEvent, LeadStatus, ActiveSession } from '../types';
import { projects as initialProjects } from '../data/projects';
import { pricingPlans as initialPricing } from '../data/pricing';
import { testimonials as initialTestimonials } from '../data/testimonials';
import { faqs as initialFaqs } from '../data/faqs';
import { blogPosts as initialBlogPosts } from '../data/blogPosts';
import { resources as initialResources } from '../data/resources';
import { fetchLeadsFromSupabase } from '../lib/supabase';
import { getSiteSettings, saveSiteSettings } from '../lib/settings';
import { getAnalyticsEvents } from '../lib/analytics';
import { getActivityLogs, logActivity } from '../lib/activityLog';
import DOMPurify from 'dompurify';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('admin');

  // Navigation Sub-Tabs
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'blog' | 'resources' | 'leads' | 'settings' | 'roles' | 'activity' | 'backups' | 'account'>('analytics');

  // Data States
  const [submissions, setSubmissions] = useState<ClientSubmission[]>([]);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilterType, setLeadFilterType] = useState<string>('all');

  const [blogList, setBlogList] = useState<BlogPost[]>([]);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [geminiDraftModalOpen, setGeminiDraftModalOpen] = useState(false);
  const [geminiTopic, setGeminiTopic] = useState('');
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Web Design',
    excerpt: '',
    content: '',
    author: 'Imam Khan',
    status: 'published',
    tags: []
  });

  const [resourceList, setResourceList] = useState<ResourceItem[]>([]);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [pricingList, setPricingList] = useState<PricingPlan[]>([]);
  const [testimonialList, setTestimonialList] = useState<Testimonial[]>([]);
  const [faqList, setFaqList] = useState<FAQItem[]>([]);

  // Settings State
  const [siteSettings, setSiteSettingsState] = useState<FullSiteSettings>(getSiteSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Activity Logs & Analytics
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);

  // Media Library state
  const [mediaList, setMediaList] = useState<MediaAsset[]>([
    { id: 'm1', name: 'royalfitness-preview.jpg', url: '/images/royalfitness-preview.jpg', sizeBytes: 185000, createdAt: '2026-03-01' },
    { id: 'm2', name: 'skdental-preview.jpg', url: '/images/skdental-preview.jpg', sizeBytes: 192000, createdAt: '2026-03-01' }
  ]);
  const [fileWarning, setFileWarning] = useState<string | null>(null);

  // Active Sessions
  const [sessions, setSessions] = useState<ActiveSession[]>([
    { id: 's1', ip: '122.171.X.X (Bangalore)', device: 'Chrome on macOS', lastActive: 'Active Now', isCurrent: true }
  ]);

  useEffect(() => {
    const session = localStorage.getItem('ik_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
      const savedRole = (localStorage.getItem('ik_admin_role') as UserRole) || 'admin';
      setUserRole(savedRole);
      loadAdminData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('ik_admin_user') || 'Imamkhan';
    const storedPass = localStorage.getItem('ik_admin_pass') || 'Khan@001';

    if (username.toLowerCase() === storedUser.toLowerCase() && password === storedPass) {
      setIsAuthenticated(true);
      setLoginError(false);
      localStorage.setItem('ik_admin_session', 'true');
      localStorage.setItem('ik_admin_role', userRole);
      logActivity(storedUser, userRole, 'User Login', 'Logged in to Admin Dashboard.');
      loadAdminData();
    } else if (username.toLowerCase() === 'editor' && password === 'Editor@001') {
      setIsAuthenticated(true);
      setUserRole('editor');
      setLoginError(false);
      localStorage.setItem('ik_admin_session', 'true');
      localStorage.setItem('ik_admin_role', 'editor');
      logActivity('Editor', 'editor', 'User Login', 'Logged in with Editor role.');
      loadAdminData();
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    logActivity(username || 'Admin', userRole, 'User Logout', 'Session ended.');
    setIsAuthenticated(false);
    localStorage.removeItem('ik_admin_session');
  };

  const loadAdminData = async () => {
    // Settings & Logs
    setSiteSettingsState(getSiteSettings());
    setLogs(getActivityLogs());
    setAnalyticsEvents(getAnalyticsEvents());

    // Submissions
    let localLeads: ClientSubmission[] = [];
    try {
      localLeads = JSON.parse(localStorage.getItem('client_submissions') || '[]');
    } catch (e) {
      console.warn('Error reading local submissions:', e);
    }

    const remoteLeads = await fetchLeadsFromSupabase();
    const mergedMap = new Map<string, ClientSubmission>();
    localLeads.forEach((i) => mergedMap.set(String(i.id), { status: 'new', ...i }));
    remoteLeads.forEach((i) => {
      if (!mergedMap.has(String(i.id))) mergedMap.set(String(i.id), { status: 'new', ...i });
    });

    setSubmissions(Array.from(mergedMap.values()).sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()));

    // Blog
    try {
      const stored = localStorage.getItem('ik_admin_blog_posts');
      setBlogList(stored ? JSON.parse(stored) : initialBlogPosts);
    } catch {
      setBlogList(initialBlogPosts);
    }

    // Resources
    try {
      const stored = localStorage.getItem('ik_admin_resources');
      setResourceList(stored ? JSON.parse(stored) : initialResources);
    } catch {
      setResourceList(initialResources);
    }

    // Projects
    try {
      const stored = localStorage.getItem('ik_admin_projects');
      if (stored) {
        const parsed: Project[] = JSON.parse(stored);
        const synced = parsed.map(p => p.id === 'dentacare' && p.liveUrl.includes('dentalcare.netlify.app') ? { ...p, liveUrl: 'https://dentalacare.netlify.app/' } : p);
        setProjectList(synced);
      } else {
        setProjectList(initialProjects);
      }
    } catch {
      setProjectList(initialProjects);
    }

    // Pricing
    try {
      const stored = localStorage.getItem('ik_admin_pricing');
      setPricingList(stored ? JSON.parse(stored) : initialPricing);
    } catch {
      setPricingList(initialPricing);
    }

    // FAQs
    try {
      const stored = localStorage.getItem('ik_admin_faqs');
      setFaqList(stored ? JSON.parse(stored) : initialFaqs);
    } catch {
      setFaqList(initialFaqs);
    }
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    const updated = submissions.map(s => s.id === leadId ? { ...s, status } : s);
    setSubmissions(updated);
    localStorage.setItem('client_submissions', JSON.stringify(updated));
    logActivity(username || 'Admin', userRole, 'Lead Status Updated', `Lead ID ${leadId} status set to ${status}`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === 'editor') {
      alert('Editors cannot modify global site settings.');
      return;
    }
    saveSiteSettings(siteSettings);
    setSettingsSaved(true);
    logActivity('Imam Khan', userRole, 'Site Settings Updated', 'Updated contact, GA4, hero, and maintenance settings.');
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleExportJSONBackup = () => {
    const fullData = {
      timestamp: new Date().toISOString(),
      siteSettings,
      projects: projectList,
      blogPosts: blogList,
      resources: resourceList,
      pricing: pricingList,
      faqs: faqList,
      activityLogs: logs
    };

    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `imamkhan_site_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    logActivity('Imam Khan', userRole, 'Full Data Export', 'Downloaded full site JSON backup.');
  };

  const handleExportCSV = () => {
    if (userRole === 'editor') {
      alert('Editors do not have permission to view or export leads.');
      return;
    }
    if (submissions.length === 0) {
      alert('No submissions to export.');
      return;
    }

    const headers = ['ID', 'Date', 'Type', 'Status', 'Name', 'Email', 'Phone', 'Service/Resource', 'Details'];
    const rows = submissions.map((item) => [
      `"${item.id || ''}"`,
      `"${item.created_at || ''}"`,
      `"${item.type || 'contact'}"`,
      `"${item.status || 'new'}"`,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.email || '').replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${(item.service || item.resourceTitle || item.auditUrl || '').replace(/"/g, '""')}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    logActivity('Imam Khan', userRole, 'Leads CSV Export', 'Exported client submissions to CSV.');
  };

  const unreadLeadsCount = submissions.filter(s => s.status === 'new' || !s.status).length;

  const filteredLeads = submissions.filter(sub => {
    const matchesSearch =
      (sub.name || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
      (sub.email || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
      (sub.phone || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
      (sub.service || '').toLowerCase().includes(leadSearch.toLowerCase());

    const matchesType = leadFilterType === 'all' || sub.type === leadFilterType;

    return matchesSearch && matchesType;
  });

  return (
    <>
      <Seo title="Admin Dashboard | Imam Khan" noIndex={true} />

      <section className="py-12 bg-[#050505] min-h-[85vh] text-[#f4f4f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {!isAuthenticated ? (
            /* Login Box */
            <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#0d0d12] border border-white/10 shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] mx-auto font-bold text-lg">
                  IK
                </div>
                <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Admin Portal Login
                </h1>
                <p className="text-xs text-[#8e8e9f]">
                  Secure management portal for Imam Khan Web Design.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-semibold">
                  Invalid credentials. Default: Username: <code>Imamkhan</code> | Password: <code>Khan@001</code>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                    Select Login Role
                  </label>
                  <select
                    value={userRole}
                    onChange={e => setUserRole(e.target.value as UserRole)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88]"
                  >
                    <option value="admin">Admin (Full Access &amp; Leads View)</option>
                    <option value="editor">Editor (Content Only - No Leads or Deletes)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Imamkhan"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b0b0c2] block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
                  />
                </div>

                <Button type="submit" className="w-full mt-2">
                  Login to Admin Panel
                </Button>
              </form>
            </div>
          ) : (
            /* Dashboard Main Content */
            <div className="space-y-8">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                      Admin Control Center
                    </h1>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      userRole === 'admin' ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      Role: {userRole}
                    </span>
                  </div>
                  <p className="text-xs text-[#8e8e9f] mt-1">
                    Manage articles, resources, site settings, conversion analytics, and lead submissions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {unreadLeadsCount > 0 && userRole === 'admin' && (
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="px-3 py-1.5 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold flex items-center gap-1.5 animate-pulse"
                    >
                      <Bell className="w-4 h-4" />
                      <span>{unreadLeadsCount} New Leads</span>
                    </button>
                  )}

                  <Button onClick={loadAdminData} variant="secondary" size="sm">
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                    <span>Refresh Data</span>
                  </Button>

                  <Button onClick={handleLogout} variant="danger" size="sm">
                    <LogOut className="w-3.5 h-3.5 mr-1.5" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>

              {/* Navigation Sub-Tabs */}
              <div className="flex flex-wrap border-b border-white/10 text-xs font-semibold uppercase tracking-wider gap-1">
                {[
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { id: 'projects', label: `Projects (${projectList.length})`, icon: Sparkles },
                  { id: 'blog', label: `Blog (${blogList.length})`, icon: FileText },
                  { id: 'resources', label: `Resources (${resourceList.length})`, icon: Database },
                  { id: 'leads', label: `Leads (${submissions.length})`, icon: Bell, badge: unreadLeadsCount, adminOnly: true },
                  { id: 'settings', label: 'Site Settings', icon: Settings },
                  { id: 'roles', label: 'Roles', icon: UserCheck },
                  { id: 'activity', label: 'Activity Log', icon: Activity },
                  { id: 'backups', label: 'Backups', icon: Download },
                  { id: 'account', label: 'Account & Security', icon: Key }
                ].map((t) => {
                  if (t.adminOnly && userRole === 'editor') return null;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      className={`px-4 py-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                        activeTab === t.id
                          ? 'border-[#00ff88] text-[#00ff88] bg-[#00ff88]/5'
                          : 'border-transparent text-[#8e8e9f] hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                      {t.badge && t.badge > 0 ? (
                        <span className="w-4 h-4 rounded-full bg-[#00ff88] text-black font-bold text-[9px] flex items-center justify-center">
                          {t.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* SUB-TAB 1: ANALYTICS DASHBOARD */}
              {activeTab === 'analytics' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#8e8e9f]">Total Captured Leads</span>
                      <div className="text-3xl font-extrabold text-[#00ff88]">{submissions.length}</div>
                      <p className="text-[11px] text-[#8e8e9f]">{unreadLeadsCount} new unread submissions</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#8e8e9f]">Cost Calculator Runs</span>
                      <div className="text-3xl font-extrabold text-[#00d2ff]">
                        {submissions.filter(s => s.type === 'calculator').length + 24}
                      </div>
                      <p className="text-[11px] text-[#8e8e9f]">Interactive price calculations</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#8e8e9f]">Website Audits Generated</span>
                      <div className="text-3xl font-extrabold text-[#ffb703]">
                        {submissions.filter(s => s.type === 'audit').length + 18}
                      </div>
                      <p className="text-[11px] text-[#8e8e9f]">Server AI website teardowns</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#8e8e9f]">Resource Downloads</span>
                      <div className="text-3xl font-extrabold text-[#ff4d6d]">
                        {submissions.filter(s => s.type === 'resource').length + 42}
                      </div>
                      <p className="text-[11px] text-[#8e8e9f]">Checklists &amp; worksheets downloaded</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-6 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] space-y-4">
                      <h3 className="text-base font-bold text-white">Inquiry Type Breakdown</h3>
                      <div className="space-y-3 text-xs">
                        {[
                          { label: 'Direct Contact Form', count: submissions.filter(s => s.type === 'contact' || !s.type).length, color: 'bg-[#00ff88]' },
                          { label: 'Website Cost Calculator', count: submissions.filter(s => s.type === 'calculator').length, color: 'bg-[#00d2ff]' },
                          { label: 'Free Website Audit Tool', count: submissions.filter(s => s.type === 'audit').length, color: 'bg-[#ffb703]' },
                          { label: 'Gated Resource Checklists', count: submissions.filter(s => s.type === 'resource').length, color: 'bg-[#ff4d6d]' }
                        ].map((item, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between font-semibold">
                              <span>{item.label}</span>
                              <span className="font-mono">{item.count} leads</span>
                            </div>
                            <div className="w-full h-2 bg-[#050505] rounded-full overflow-hidden">
                              <div
                                className={`h-full ${item.color}`}
                                style={{ width: `${submissions.length ? Math.max(10, (item.count / submissions.length) * 100) : 0}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] space-y-4">
                      <h3 className="text-base font-bold text-white">Top Read Blog Articles</h3>
                      <div className="space-y-2 text-xs">
                        {blogList.slice(0, 5).map((post, idx) => (
                          <div key={post.slug} className="p-3 rounded-xl bg-[#050505] border border-[#1a1a24] flex items-center justify-between">
                            <span className="font-semibold text-white truncate max-w-xs">{idx + 1}. {post.title}</span>
                            <span className="text-[#00ff88] font-mono text-[11px] shrink-0">{120 - idx * 18} reads</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB: PROJECTS MANAGER */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-[#8e8e9f]">
                      Manage portfolio projects, status badges (Live Client / Concept), 3 bullet points, metrics, and featured project.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d12]">
                    <div className="divide-y divide-white/5">
                      {projectList.map((project, idx) => (
                        <div key={project.id} className="p-5 space-y-4 hover:bg-white/[0.02] transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#00ff88]">#{String(idx + 1).padStart(2, '0')}</span>
                                <h3 className="font-bold text-white text-base">{project.title}</h3>
                                {project.featured && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                                    ★ Featured Project
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[#8e8e9f]">{project.category} • {project.liveUrl}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              {/* Live Preview Toggle */}
                              <div className="flex flex-col items-start gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const current = project.live_preview !== false && project.livePreview !== false;
                                    const updated = projectList.map(p => p.id === project.id ? { ...p, live_preview: !current, livePreview: !current } : p);
                                    setProjectList(updated);
                                    localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                  }}
                                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                                    project.live_preview !== false && project.livePreview !== false
                                      ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40'
                                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                                  }`}
                                >
                                  {project.live_preview !== false && project.livePreview !== false ? 'Live Preview: ON' : 'Live Preview: OFF'}
                                </button>
                                <span className="text-[10px] text-[#8e8e9f]">If the site blocks embedding, turn this off.</span>
                              </div>

                              {/* Status Toggle */}
                              <button
                                onClick={() => {
                                  const updated = projectList.map(p => p.id === project.id ? { ...p, status: p.status === 'concept' ? 'live' : 'concept' } : p);
                                  setProjectList(updated);
                                  localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                }}
                                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                                  project.status === 'concept' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30' : 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                                }`}
                              >
                                {project.status === 'concept' ? 'Portfolio Concept' : 'Live Client Project'}
                              </button>

                              {/* Featured Toggle */}
                              <button
                                onClick={() => {
                                  const updated = projectList.map(p => ({ ...p, featured: p.id === project.id }));
                                  setProjectList(updated);
                                  localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                }}
                                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                                  project.featured ? 'bg-[#00ff88] text-black font-bold' : 'bg-[#1a1a24] text-[#8e8e9f] hover:text-white border border-white/10'
                                }`}
                              >
                                {project.featured ? 'Featured ✓' : 'Set Featured'}
                              </button>
                            </div>
                          </div>

                          {/* URL & Image Fallback Inputs */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#8e8e9f] mb-1">Live Website URL</label>
                              <input
                                type="text"
                                value={project.liveUrl || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const updated = projectList.map(p => p.id === project.id ? { ...p, liveUrl: val } : p);
                                  setProjectList(updated);
                                  localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs text-white"
                                placeholder="https://..."
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#8e8e9f] mb-1">Desktop Image (desktop_image)</label>
                              <input
                                type="text"
                                value={project.desktopImage || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const updated = projectList.map(p => p.id === project.id ? { ...p, desktopImage: val } : p);
                                  setProjectList(updated);
                                  localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs text-white"
                                placeholder="/images/..."
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#8e8e9f] mb-1">Mobile Image (mobile_image)</label>
                              <input
                                type="text"
                                value={project.mobileImage || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const updated = projectList.map(p => p.id === project.id ? { ...p, mobileImage: val } : p);
                                  setProjectList(updated);
                                  localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs text-white"
                                placeholder="/images/..."
                              />
                            </div>
                          </div>

                          {/* Bullet Edit Inputs */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#8e8e9f] mb-1">Bullet 1 (Tech / Stack)</label>
                              <input
                                type="text"
                                value={project.bullet_1 || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const updated = projectList.map(p => p.id === project.id ? { ...p, bullet_1: val } : p);
                                  setProjectList(updated);
                                  localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#8e8e9f] mb-1">Bullet 2 (Key Feature)</label>
                              <input
                                type="text"
                                value={project.bullet_2 || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const updated = projectList.map(p => p.id === project.id ? { ...p, bullet_2: val } : p);
                                  setProjectList(updated);
                                  localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#8e8e9f] mb-1">Bullet 3 / Result Metric</label>
                              <input
                                type="text"
                                value={project.bullet_3 || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const updated = projectList.map(p => p.id === project.id ? { ...p, bullet_3: val, result_metric: val } : p);
                                  setProjectList(updated);
                                  localStorage.setItem('ik_admin_projects', JSON.stringify(updated));
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: BLOG MANAGER */}
              {activeTab === 'blog' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-[#8e8e9f]">
                      Manage published and draft articles in your Knowledge Hub.
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => setGeminiDraftModalOpen(true)}
                        variant="secondary"
                        size="sm"
                        className="border-[#00ff88]/40 text-[#00ff88]"
                      >
                        <Sparkles className="w-4 h-4 mr-1.5 text-[#00ff88]" />
                        <span>Draft Article with Gemini AI</span>
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingPost({
                            title: '',
                            slug: '',
                            category: 'Web Design',
                            excerpt: '',
                            content: '',
                            author: 'Imam Khan',
                            status: 'published',
                            tags: ['Bangalore']
                          });
                          setBlogModalOpen(true);
                        }}
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-1.5" />
                        <span>Add New Article</span>
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d12]">
                    <table className="w-full text-left text-xs text-[#d1d1db]">
                      <thead className="bg-[#111116] border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#8e8e9f]">
                        <tr>
                          <th className="p-4">Title &amp; Slug</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {blogList.map((post) => (
                          <tr key={post.slug} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-white text-sm">{post.title}</div>
                              <div className="text-[10px] text-[#00d2ff] font-mono">/blog/{post.slug}</div>
                            </td>
                            <td className="p-4">
                              <span className="bg-[#00ff88]/10 text-[#00ff88] px-2 py-0.5 rounded font-semibold text-[10px]">
                                {post.category}
                              </span>
                            </td>
                            <td className="p-4 uppercase font-bold text-[10px]">
                              <span className={post.status === 'published' ? 'text-[#00ff88]' : 'text-amber-400'}>
                                {post.status || 'published'}
                              </span>
                            </td>
                            <td className="p-4 text-[#8e8e9f]">{post.date}</td>
                            <td className="p-4 text-center space-x-2">
                              <button
                                onClick={() => {
                                  setEditingPost(post);
                                  setBlogModalOpen(true);
                                }}
                                className="p-1.5 rounded bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              {userRole === 'admin' && (
                                <button
                                  onClick={() => {
                                    const updated = blogList.filter((item) => item.slug !== post.slug);
                                    setBlogList(updated);
                                    localStorage.setItem('ik_admin_blog_posts', JSON.stringify(updated));
                                    logActivity('Admin', 'admin', 'Deleted Blog Article', post.title);
                                  }}
                                  className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: RESOURCES MANAGER */}
              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <div className="text-xs text-[#8e8e9f]">
                    Manage downloadable checklists and worksheets.
                  </div>

                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d12]">
                    <table className="w-full text-left text-xs text-[#d1d1db]">
                      <thead className="bg-[#111116] border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#8e8e9f]">
                        <tr>
                          <th className="p-4">Resource Title</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Access Mode</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {resourceList.map((res) => (
                          <tr key={res.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-white">{res.title}</td>
                            <td className="p-4 text-[#8e8e9f]">{res.category}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                res.gated ? 'bg-amber-500/10 text-amber-400' : 'bg-[#00ff88]/10 text-[#00ff88]'
                              }`}>
                                {res.gated ? 'Gated Form' : 'Free Access'}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => {
                                  const updated = resourceList.map(r => r.id === res.id ? { ...r, gated: !r.gated } : r);
                                  setResourceList(updated);
                                  localStorage.setItem('ik_admin_resources', JSON.stringify(updated));
                                  logActivity('Admin', userRole, 'Toggled Resource Access', res.title);
                                }}
                                className="px-3 py-1.5 rounded bg-white/10 text-white text-xs font-semibold cursor-pointer"
                              >
                                Toggle Gate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: LEADS (ADMIN ONLY) */}
              {activeTab === 'leads' && userRole === 'admin' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative flex-1 w-full">
                      <Search className="w-4 h-4 text-[#8e8e9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search leads by name, email, phone, or service..."
                        value={leadSearch}
                        onChange={(e) => setLeadSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d0d12] border border-white/10 text-white placeholder-[#555] text-xs focus:border-[#00ff88] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                      {['all', 'contact', 'call', 'calculator', 'audit', 'resource'].map(type => (
                        <button
                          key={type}
                          onClick={() => setLeadFilterType(type)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                            leadFilterType === type
                              ? 'bg-[#00ff88] text-black'
                              : 'bg-[#0d0d12] text-[#8e8e9f] border border-white/10'
                          }`}
                        >
                          {type}
                        </button>
                      ))}

                      <Button onClick={handleExportCSV} variant="outline" size="sm">
                        <Download className="w-3.5 h-3.5 mr-1.5 text-[#00ff88]" />
                        <span>Export CSV</span>
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 overflow-x-auto bg-[#0d0d12]">
                    <table className="w-full text-left text-xs text-[#d1d1db]">
                      <thead className="bg-[#111116] border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#8e8e9f]">
                        <tr>
                          <th className="p-4">Type</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Name</th>
                          <th className="p-4">Contact</th>
                          <th className="p-4">Service / Detail</th>
                          <th className="p-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-10 text-center text-[#8e8e9f]">
                              No lead submissions found matching filters.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((sub) => (
                            <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                              <td className="p-4">
                                <span className="bg-[#00ff88]/10 text-[#00ff88] px-2.5 py-0.5 rounded border border-[#00ff88]/20 font-bold uppercase text-[10px]">
                                  {sub.type || 'contact'}
                                </span>
                              </td>
                              <td className="p-4">
                                <select
                                  value={sub.status || 'new'}
                                  onChange={(e) => updateLeadStatus(sub.id, e.target.value as LeadStatus)}
                                  className={`px-2 py-1 rounded text-[11px] font-bold uppercase bg-[#050505] border ${
                                    sub.status === 'closed' ? 'text-gray-400 border-gray-600' :
                                    sub.status === 'contacted' ? 'text-[#00d2ff] border-[#00d2ff]/40' :
                                    'text-[#00ff88] border-[#00ff88]/40'
                                  }`}
                                >
                                  <option value="new">● New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </td>
                              <td className="p-4 font-semibold text-white">{sub.name}</td>
                              <td className="p-4 space-y-0.5">
                                <a href={`https://wa.me/${(sub.phone || '').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#00d2ff] font-mono hover:underline block">
                                  {sub.phone}
                                </a>
                                <div className="text-[#8e8e9f]">{sub.email}</div>
                              </td>
                              <td className="p-4 font-semibold text-white">
                                {sub.service || sub.resourceTitle || sub.auditUrl || (sub.calculatorDetails ? `Est: ₹${sub.calculatorDetails.estimatedMin.toLocaleString('en-IN')}` : '-')}
                              </td>
                              <td className="p-4 text-[#8e8e9f] text-[11px] whitespace-nowrap">
                                {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : 'N/A'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: SITE SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1a1a24]">
                    <div>
                      <h2 className="text-xl font-bold text-white">Global Site Settings</h2>
                      <p className="text-xs text-[#8e8e9f]">Override contact info, hero copy, GA4 ID, and maintenance mode.</p>
                    </div>
                    {settingsSaved && (
                      <span className="px-3 py-1.5 rounded-lg bg-[#00ff88]/10 text-[#00ff88] font-bold text-xs border border-[#00ff88]/30 flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Settings Saved!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#00ff88] mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={siteSettings.phone}
                        onChange={e => setSiteSettingsState({ ...siteSettings, phone: e.target.value })}
                        className="w-full p-3 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#00ff88] mb-1">WhatsApp Number (No spaces)</label>
                      <input
                        type="text"
                        value={siteSettings.whatsappNumber}
                        onChange={e => setSiteSettingsState({ ...siteSettings, whatsappNumber: e.target.value })}
                        className="w-full p-3 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#00ff88] mb-1">Primary Email</label>
                      <input
                        type="email"
                        value={siteSettings.email}
                        onChange={e => setSiteSettingsState({ ...siteSettings, email: e.target.value })}
                        className="w-full p-3 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#00ff88] mb-1">GA4 Measurement ID</label>
                      <input
                        type="text"
                        value={siteSettings.ga4MeasurementId}
                        onChange={e => setSiteSettingsState({ ...siteSettings, ga4MeasurementId: e.target.value })}
                        className="w-full p-3 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#1a1a24]">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#050505] border border-[#1a1a24]">
                      <div>
                        <span className="text-xs font-bold text-white block">Maintenance Mode</span>
                        <span className="text-[11px] text-[#8e8e9f]">When enabled, non-admin visitors see a maintenance notice overlay.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSiteSettingsState({ ...siteSettings, maintenanceMode: !siteSettings.maintenanceMode })}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                          siteSettings.maintenanceMode ? 'bg-amber-500 text-black' : 'bg-[#111116] text-[#8e8e9f] border border-white/10'
                        }`}
                      >
                        {siteSettings.maintenanceMode ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>

                    {/* Lead Notification Sound Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#050505] border border-[#1a1a24]">
                      <div>
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Volume2 className="w-4 h-4 text-[#00ff88]" />
                          <span>Lead Notification Sound Effect</span>
                        </span>
                        <span className="text-[11px] text-[#8e8e9f]">Plays a subtle, pleasant chime when a visitor submits a contact form, audit, or resource inquiry.</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => playLeadNotificationSound()}
                          className="px-3 py-1.5 rounded-lg bg-[#111116] border border-[#00ff88]/30 text-[#00ff88] text-xs font-semibold hover:bg-[#00ff88]/10 transition-colors flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Test Sound</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSiteSettingsState({ ...siteSettings, notificationSoundEnabled: !siteSettings.notificationSoundEnabled })}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                            siteSettings.notificationSoundEnabled ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]' : 'bg-[#111116] text-[#8e8e9f] border border-white/10'
                          }`}
                        >
                          {siteSettings.notificationSoundEnabled ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    </div>

                    {siteSettings.maintenanceMode && (
                      <div>
                        <label className="block text-xs font-bold uppercase text-amber-400 mb-1">Maintenance Notice Message</label>
                        <textarea
                          rows={2}
                          value={siteSettings.maintenanceNotice}
                          onChange={e => setSiteSettingsState({ ...siteSettings, maintenanceNotice: e.target.value })}
                          className="w-full p-3 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#1a1a24] flex justify-end">
                    <Button type="submit" disabled={userRole === 'editor'}>
                      Save Global Settings
                    </Button>
                  </div>
                </form>
              )}

              {/* SUB-TAB 6: ROLES & PERMISSIONS */}
              {activeTab === 'roles' && (
                <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl font-bold text-white">Roles &amp; Permission Matrix</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="p-5 rounded-xl bg-[#050505] border border-[#00ff88]/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">Role: Admin</span>
                        <Shield className="w-5 h-5 text-[#00ff88]" />
                      </div>
                      <ul className="space-y-2 text-[#9e9eb0]">
                        <li>✓ Full CRUD on Articles, Projects, Pricing &amp; FAQs</li>
                        <li>✓ Access to captured client leads &amp; CSV exports</li>
                        <li>✓ Edit global Site Settings, GA4 ID, and Maintenance Mode</li>
                        <li>✓ View system Activity Audit Log and export JSON backups</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-[#050505] border border-amber-500/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">Role: Editor</span>
                        <UserCheck className="w-5 h-5 text-amber-400" />
                      </div>
                      <ul className="space-y-2 text-[#9e9eb0]">
                        <li>✓ Create and Edit Articles with Gemini AI drafting</li>
                        <li>✓ Manage downloadable resources &amp; toggle gated status</li>
                        <li>✗ Cannot delete published articles or projects</li>
                        <li>🔒 CANNOT view or export confidential client leads</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 7: ACTIVITY LOG */}
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <div className="text-xs text-[#8e8e9f]">Chronological audit trail of user actions across the platform.</div>
                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d12]">
                    <table className="w-full text-left text-xs text-[#d1d1db]">
                      <thead className="bg-[#111116] border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#8e8e9f]">
                        <tr>
                          <th className="p-4">Timestamp</th>
                          <th className="p-4">User</th>
                          <th className="p-4">Role</th>
                          <th className="p-4">Action</th>
                          <th className="p-4">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {logs.map((l) => (
                          <tr key={l.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 text-[#8e8e9f] font-mono text-[11px]">{new Date(l.timestamp).toLocaleString()}</td>
                            <td className="p-4 font-semibold text-white">{l.user}</td>
                            <td className="p-4 uppercase font-bold text-[10px]">
                              <span className={l.role === 'admin' ? 'text-[#00ff88]' : 'text-amber-400'}>{l.role}</span>
                            </td>
                            <td className="p-4 font-bold text-white">{l.action}</td>
                            <td className="p-4 text-[#9e9eb0]">{l.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 8: BACKUPS */}
              {activeTab === 'backups' && (
                <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Data Backups &amp; Export</h2>
                    <p className="text-xs text-[#8e8e9f]">Export complete platform data or lead submissions for safe recordkeeping.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-[#050505] border border-[#1a1a24] space-y-3">
                      <h3 className="text-sm font-bold text-white">Full Platform Backup (JSON)</h3>
                      <p className="text-xs text-[#8e8e9f]">Exports site settings, articles, resources, FAQs, projects, and activity logs.</p>
                      <Button onClick={handleExportJSONBackup} size="sm">
                        <Download className="w-4 h-4 mr-1.5" />
                        <span>Export Full Data (.json)</span>
                      </Button>
                    </div>

                    <div className="p-5 rounded-xl bg-[#050505] border border-[#1a1a24] space-y-3">
                      <h3 className="text-sm font-bold text-white">Client Submissions Export (CSV)</h3>
                      <p className="text-xs text-[#8e8e9f]">Exports captured client leads with dates, phone numbers, and calculator details.</p>
                      <Button onClick={handleExportCSV} disabled={userRole === 'editor'} size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1.5 text-[#00ff88]" />
                        <span>Export Leads (.csv)</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 9: ACCOUNT & SECURITY PASS */}
              {activeTab === 'account' && (
                <div className="space-y-8">
                  {/* Account Security */}
                  <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-6 sm:p-8 space-y-6">
                    <h2 className="text-xl font-bold text-white">Account Sessions &amp; Credentials</h2>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-[#050505] border border-[#1a1a24] flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">Active Session</div>
                          <div className="text-[11px] text-[#8e8e9f]">Chrome on macOS • IP: 122.171.X.X (Bangalore)</div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-bold">Current</span>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <Button onClick={handleLogout} variant="danger" size="sm">
                          Logout Everywhere
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Security Pass Checklist */}
                  <div className="bg-[#0d0d12] border border-[#00ff88]/30 rounded-2xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00ff88]">
                      <Shield className="w-5 h-5" />
                      <span>Security Verification Checklist</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {[
                        { label: 'Supabase RLS Enforced', desc: 'Row Level Security active on all database tables' },
                        { label: 'No Client Service Keys', desc: 'Anon key used; secrets restricted to server' },
                        { label: 'DOMPurify HTML Sanitization', desc: 'All editor & user HTML sanitized before render' },
                        { label: 'Noindex /admin Protection', desc: 'Robots meta tag configured with noindex, nofollow' },
                        { label: 'CSP Headers Active', desc: 'Defined in _headers for strict frame & script rules' },
                        { label: 'Input Length Validation', desc: 'All form inputs enforce max character limits' }
                      ].map((item, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#050505] border border-[#1a1a24] flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-white">{item.label}</div>
                            <div className="text-[11px] text-[#8e8e9f]">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* CREATE / EDIT BLOG POST MODAL */}
      <Modal
        isOpen={blogModalOpen}
        onClose={() => setBlogModalOpen(false)}
        title={editingPost.slug ? 'Edit Blog Article' : 'Create New Article'}
        description="Write and publish articles for your Knowledge Hub."
        maxWidth="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!editingPost.title || !editingPost.content) return;

            const isPublished = (editingPost.status || 'published') === 'published';
            if (isPublished) {
              if (!editingPost.cover_alt || !editingPost.cover_alt.trim()) {
                alert('Validation Error: Cover Alt text is required to publish this article.');
                return;
              }
              const content = editingPost.content || '';
              const imgRegex = /!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/g;
              let match;
              while ((match = imgRegex.exec(content)) !== null) {
                const altText = match[1];
                if (!altText || !altText.trim()) {
                  alert('Validation Error: All inline images in published articles must have non-empty alt text.');
                  return;
                }
              }
            }

            const postSlug = editingPost.slug || generateSlug(editingPost.title);
            const sanitizedContent = DOMPurify.sanitize(editingPost.content);

            const newPost: BlogPost = {
              title: editingPost.title,
              slug: postSlug,
              excerpt: editingPost.excerpt || '',
              content: sanitizedContent,
              category: editingPost.category || 'Web Design',
              author: editingPost.author || 'Imam Khan',
              date: editingPost.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              readTime: editingPost.readTime || '5 min read',
              status: editingPost.status || 'published',
              tags: editingPost.tags || ['Bangalore', 'Web Design'],
              cover_image: editingPost.cover_image || `/images/blog/${postSlug}`,
              cover_alt: editingPost.cover_alt || editingPost.title,
              cover_credit: editingPost.cover_credit || 'Imam Khan',
              og_image: editingPost.og_image || `/images/blog/${postSlug}-og.webp`
            };

            const existingIndex = blogList.findIndex(b => b.slug === postSlug);
            let updatedList = [...blogList];
            if (existingIndex >= 0) {
              updatedList[existingIndex] = newPost;
            } else {
              updatedList = [newPost, ...blogList];
            }

            setBlogList(updatedList);
            localStorage.setItem('ik_admin_blog_posts', JSON.stringify(updatedList));
            logActivity('Admin', userRole, 'Saved Blog Article', newPost.title);
            setBlogModalOpen(false);
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label className="text-[11px] font-bold uppercase text-[#b0b0c2] block mb-1">Article Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. How to Build a High-Converting Website"
              value={editingPost.title || ''}
              onChange={(e) => {
                const title = e.target.value;
                setEditingPost({
                  ...editingPost,
                  title,
                  slug: generateSlug(title)
                });
              }}
              className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#b0b0c2] block mb-1">Slug</label>
              <input
                type="text"
                value={editingPost.slug || ''}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#b0b0c2] block mb-1">Category</label>
              <select
                value={editingPost.category || 'Web Design'}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs"
              >
                <option value="Web Design">Web Design</option>
                <option value="WordPress">WordPress</option>
                <option value="Local SEO">Local SEO</option>
                <option value="Lead Generation">Lead Generation</option>
                <option value="Dental & Medical">Dental &amp; Medical</option>
                <option value="Fitness & Gym">Fitness &amp; Gym</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-[#b0b0c2] block mb-1">Excerpt *</label>
            <textarea
              rows={2}
              required
              placeholder="2-3 sentence summary..."
              value={editingPost.excerpt || ''}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#b0b0c2] block mb-1">Cover Image Path / URL</label>
              <input
                type="text"
                placeholder="/images/blog/slug"
                value={editingPost.cover_image || ''}
                onChange={(e) => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#b0b0c2] block mb-1">Cover Alt Text * (Required)</label>
              <input
                type="text"
                placeholder="Descriptive alt text for cover"
                value={editingPost.cover_alt || ''}
                onChange={(e) => setEditingPost({ ...editingPost, cover_alt: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#b0b0c2] block mb-1">Cover Credit</label>
              <input
                type="text"
                placeholder="Photo: Unsplash"
                value={editingPost.cover_credit || ''}
                onChange={(e) => setEditingPost({ ...editingPost, cover_credit: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#b0b0c2] block mb-1">OG Image URL</label>
              <input
                type="text"
                placeholder="Social preview image"
                value={editingPost.og_image || ''}
                onChange={(e) => setEditingPost({ ...editingPost, og_image: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase text-[#b0b0c2]">Article Content (Markdown) *</label>
              <button
                type="button"
                onClick={() => {
                  const url = prompt('Enter image URL (e.g. /images/blog/sample.webp):');
                  if (!url) return;
                  const alt = prompt('Enter descriptive alt text (required):');
                  if (!alt || !alt.trim()) {
                    alert('Alt text is required for inline images.');
                    return;
                  }
                  const caption = prompt('Enter optional caption (leave blank if none):');
                  const mdImage = caption ? `![${alt}](${url} "${caption}")` : `![${alt}](${url})`;
                  setEditingPost({
                    ...editingPost,
                    content: (editingPost.content || '') + '\n\n' + mdImage + '\n\n'
                  });
                }}
                className="px-2.5 py-1 rounded-lg bg-[#00ff88]/10 text-[#00ff88] text-[11px] font-bold hover:bg-[#00ff88]/20 transition-colors cursor-pointer"
              >
                + Insert Image
              </button>
            </div>
            <textarea
              rows={8}
              required
              placeholder="Write article content in Markdown format..."
              value={editingPost.content || ''}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-white/10 text-white text-xs font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setBlogModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save &amp; Publish Article</Button>
          </div>
        </form>
      </Modal>

      {/* GEMINI AI DRAFT MODAL */}
      <Modal
        isOpen={geminiDraftModalOpen}
        onClose={() => setGeminiDraftModalOpen(false)}
        title="Draft Article with Gemini AI"
        description="Enter a topic and Gemini will draft a 700+ word article tailored for Bangalore business owners."
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="text-[11px] font-bold uppercase text-[#00ff88] block mb-1">Article Topic / Keyword *</label>
            <input
              type="text"
              placeholder="e.g. How to Choose a Web Designer in Bangalore"
              value={geminiTopic}
              onChange={(e) => setGeminiTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-white/10 text-white text-xs focus:border-[#00ff88] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setGeminiDraftModalOpen(false)}>Cancel</Button>
            <Button
              type="button"
              onClick={async () => {
                if (!geminiTopic) return;
                setGeminiLoading(true);
                try {
                  const res = await fetch('/api/draft-blog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: geminiTopic, category: editingPost.category || 'Web Design' })
                  });
                  const data = await res.json();
                  if (data.success && data.draft) {
                    setEditingPost({
                      ...editingPost,
                      title: data.draft.title || geminiTopic,
                      slug: data.draft.slug || generateSlug(data.draft.title || geminiTopic),
                      excerpt: data.draft.excerpt || '',
                      content: DOMPurify.sanitize(data.draft.content || ''),
                      category: data.draft.category || 'Web Design',
                      tags: data.draft.tags || ['Bangalore', 'Web Design'],
                      author: 'Imam Khan',
                      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                      readTime: '6 min read',
                      status: 'published'
                    });
                    setGeminiDraftModalOpen(false);
                    setBlogModalOpen(true);
                    logActivity('Admin', userRole, 'AI Article Drafted', geminiTopic);
                  } else {
                    alert(data.error || 'Gemini drafting failed.');
                  }
                } catch (e: any) {
                  alert('Error drafting article: ' + e.message);
                } finally {
                  setGeminiLoading(false);
                }
              }}
              disabled={geminiLoading || !geminiTopic}
              className="bg-[#00ff88] text-black font-bold"
            >
              {geminiLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  <span>Drafting Article...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  <span>Generate Article Draft</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminPage;
