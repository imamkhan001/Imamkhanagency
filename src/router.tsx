import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import { LoadingScreen } from './components/ui/LoadingScreen';

// Lazy-loaded route components (admin, tools, and secondary pages)
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const WebsiteCostCalculatorPage = lazy(() => import('./pages/tools/WebsiteCostCalculatorPage'));
const FreeWebsiteAuditPage = lazy(() => import('./pages/tools/FreeWebsiteAuditPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const BookCallPage = lazy(() => import('./pages/BookCallPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminPage = lazy(() => import('./admin/AdminPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <AboutPage />
          </Suspense>
        )
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ServicesPage />
          </Suspense>
        )
      },
      {
        path: 'services/:slug',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ServiceDetailPage />
          </Suspense>
        )
      },
      {
        path: 'portfolio',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PortfolioPage />
          </Suspense>
        )
      },
      // Redirect legacy/individual case study URLs to the portfolio page
      {
        path: 'portfolio/*',
        element: <Navigate to="/portfolio" replace />
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PricingPage />
          </Suspense>
        )
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <BlogPage />
          </Suspense>
        )
      },
      {
        path: 'blog/:slug',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <BlogPostPage />
          </Suspense>
        )
      },
      {
        path: 'resources',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ResourcesPage />
          </Suspense>
        )
      },
      {
        path: 'tools/website-cost-calculator',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <WebsiteCostCalculatorPage />
          </Suspense>
        )
      },
      {
        path: 'tools/free-website-audit',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <FreeWebsiteAuditPage />
          </Suspense>
        )
      },
      {
        path: 'faq',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <FaqPage />
          </Suspense>
        )
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ContactPage />
          </Suspense>
        )
      },
      {
        path: 'book-call',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <BookCallPage />
          </Suspense>
        )
      },
      {
        path: 'thank-you',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ThankYouPage />
          </Suspense>
        )
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PrivacyPolicyPage />
          </Suspense>
        )
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <TermsPage />
          </Suspense>
        )
      },
      // City/neighborhood landing pages (e.g. /web-designer-in-indiranagar)
      {
        path: 'web-designer-in-:areaSlug',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LocationPage />
          </Suspense>
        )
      },
      // Admin dashboard
      {
        path: 'admin',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <AdminPage />
          </Suspense>
        )
      },
      // 404 Catch-All
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <NotFoundPage />
          </Suspense>
        )
      }
    ]
  }
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
