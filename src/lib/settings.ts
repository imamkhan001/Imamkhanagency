import { FullSiteSettings } from '../types';
import { siteConfig } from '../data/siteConfig';

export const defaultSiteSettings: FullSiteSettings = {
  contactName: siteConfig.author,
  phone: siteConfig.phone,
  whatsappNumber: '919632164784',
  whatsappPrefillText: 'Hi Imam, I would like to discuss a website project for my business.',
  email: siteConfig.email,
  secondaryEmail: siteConfig.secondaryEmail,
  locationAddress: siteConfig.location,
  workingHours: 'Mo-Sa 09:00 - 21:00 IST',
  instagramUrl: siteConfig.instagram,
  linkedinUrl: siteConfig.linkedin,
  githubUrl: 'https://github.com/imamkhan',
  youtubeUrl: 'https://youtube.com',
  heroHeadline: 'Websites That Turn Visitors Into Customers',
  heroSubtext: 'A website should do more than look professional. I help local businesses, clinics, gyms, and service brands build digital trust, clearly explain their offer, and generate consistent daily inquiries.',
  ga4MeasurementId: 'G-XXXXXXXXXX',
  maintenanceMode: false,
  maintenanceNotice: '⚡ Scheduled maintenance in progress. We will be back online shortly. For urgent inquiries, WhatsApp +91 9632164784.',
  notificationSoundEnabled: true,
  defaultSeoTitle: siteConfig.title,
  defaultSeoDescription: siteConfig.description,
  statsWebsitesBuilt: siteConfig.stats.websitesBuilt,
  statsClientRating: siteConfig.stats.clientRating,
  statsAvgDeliveryDays: siteConfig.stats.avgDeliveryDays,
  statsGuaranteeDays: siteConfig.stats.guaranteeDays,
  announcementBar: {
    enabled: siteConfig.announcement.enabled,
    text: siteConfig.announcement.text,
    link: siteConfig.announcement.link,
    linkText: siteConfig.announcement.linkText
  }
};

export function getSiteSettings(): FullSiteSettings {
  try {
    const stored = localStorage.getItem('ik_site_settings');
    if (stored) {
      return { ...defaultSiteSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Error reading site settings:', e);
  }
  return defaultSiteSettings;
}

export function saveSiteSettings(settings: FullSiteSettings): void {
  try {
    localStorage.setItem('ik_site_settings', JSON.stringify(settings));
  } catch (e) {
    console.warn('Error saving site settings:', e);
  }
}
