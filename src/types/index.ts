export interface ImpactPillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  highlights: string[];
  metric: string;
}

export interface ProjectStoryData {
  challenge: string;
  solution: string;
  results: string[];
  clientName?: string;
  clientRole?: string;
  clientCompany?: string;
  quote?: string;
  outcomeBadge?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  categories: string[];
  tagline: string;
  description: string;
  features: string[];
  tags: string[];
  liveUrl: string;
  previewGradient: string;
  accentColor: string;
  desktopImage?: string;
  mobileImage?: string;
  story?: ProjectStoryData;
  featured?: boolean;
  published?: boolean;
  order?: number;
  status?: 'live' | 'concept' | 'showcase' | string;
  bullet_1?: string;
  bullet_2?: string;
  bullet_3?: string;
  result_metric?: string;
  seoTitle?: string;
  seoDescription?: string;
  live_preview?: boolean;
  livePreview?: boolean;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  sizeBytes: number;
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  subtext: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  projectUrl?: string;
  quote: string;
  outcomeBadge: string;
  stars: number;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface GuaranteeItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  benefits: string[];
  deliverables: string[];
  targetAudience: string;
}

export interface LocationItem {
  slug: string;
  name: string;
  area: string;
  title: string;
  description: string;
  popularServices: string[];
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  cover_image?: string;
  cover_alt?: string;
  cover_credit?: string;
  og_image?: string;
  author: string;
  featured?: boolean;
  status?: 'published' | 'draft' | 'scheduled';
  seoTitle?: string;
  seoDescription?: string;
  scheduledDate?: string;
}

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  type: 'checklist' | 'worksheet' | 'template';
  gated: boolean;
  downloadCount?: number;
  iconName: string;
  fileUrl?: string;
}

export interface AuditPoint {
  category: string;
  score: number;
  status: 'good' | 'warning' | 'critical';
  findings: string;
  recommendation: string;
}

export interface AuditReport {
  overallScore: number;
  summary: string;
  points: AuditPoint[];
  topActionItem: string;
}

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'closed';

export interface ClientSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  type?: 'contact' | 'call' | 'resource' | 'calculator' | 'audit';
  status?: LeadStatus;
  service?: string;
  businessType?: string;
  budget?: string;
  message?: string;
  resourceTitle?: string;
  calculatorDetails?: {
    businessType: string;
    pages: string;
    features: string[];
    timeline: string;
    estimatedMin: number;
    estimatedMax: number;
  };
  auditUrl?: string;
  created_at: string;
}

export type UserRole = 'admin' | 'editor';

export interface FullSiteSettings {
  contactName: string;
  phone: string;
  whatsappNumber: string;
  whatsappPrefillText: string;
  email: string;
  secondaryEmail: string;
  locationAddress: string;
  workingHours: string;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  youtubeUrl: string;
  heroHeadline: string;
  heroSubtext: string;
  ga4MeasurementId: string;
  maintenanceMode: boolean;
  maintenanceNotice: string;
  notificationSoundEnabled: boolean;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  statsWebsitesBuilt: string;
  statsClientRating: string;
  statsAvgDeliveryDays: string;
  statsGuaranteeDays: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string;
    linkText?: string;
  };
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  details: string;
}

export interface AnalyticsEvent {
  id: string;
  type: 'whatsapp_click' | 'phone_click' | 'form_submit' | 'calculator_use' | 'audit_use' | 'resource_view';
  page: string;
  timestamp: string;
  metadata?: string;
}

export interface ActiveSession {
  id: string;
  ip: string;
  device: string;
  lastActive: string;
  isCurrent: boolean;
}
