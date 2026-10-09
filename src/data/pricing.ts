import { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Landing Page',
    price: '₹15,000',
    priceNum: 15000,
    subtext: 'Ideal for startups, product launches & local service campaigns',
    badge: 'Quick Launch',
    popular: false,
    features: [
      'High-Converting 1-Page Website Architecture',
      '100% Mobile & Tablet Responsive UI',
      'Direct WhatsApp & Call Lead Booking CTAs',
      'Fast 3–5 Business Day Delivery',
      'Google Search Console Indexing Setup',
      'Cloud Hosting & Free SSL Security',
      '30-Day Money-Back Guarantee'
    ],
    ctaText: 'Get Started'
  },
  {
    id: 'professional',
    name: 'Professional Website',
    price: '₹25,000',
    priceNum: 25000,
    subtext: 'Best for dental clinics, fitness gyms, & growing local businesses',
    badge: 'Most Popular Choice',
    popular: true,
    features: [
      '5–7 Custom Designed Pages',
      'WordPress Easy Content Management',
      'Custom Appointment & Inquiry Lead Forms',
      'Full Local SEO Optimization & Schema Markup',
      'Speed & Mobile Audit (Under 3s Load Time)',
      '30 Days Post-Launch Maintenance & Support',
      '12-Month Bug-Fix Guarantee'
    ],
    ctaText: 'Build Professional Site'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Online Store',
    price: '₹40,000',
    priceNum: 40000,
    subtext: 'Complete online store with payment gateway to sell products online',
    badge: 'Full Store',
    popular: false,
    features: [
      'WooCommerce Store Setup with Product Catalog',
      'Razorpay, UPI & Credit Card Payment Gateway',
      'Customer Accounts & Order Tracking Portal',
      'Mobile-Optimized Checkout Flow',
      'Product Schema & Search Engine Optimization',
      'Inventory & Stock Notification Alerts',
      '60 Days Dedicated Support & Staff Training'
    ],
    ctaText: 'Launch E-Commerce Store'
  }
];
