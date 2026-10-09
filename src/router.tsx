import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Lazy-loaded route components
const HomePage = lazy(() => import('./pages/HomePage'));
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

// Route loading fallback with refined skeleton
const RouteLoader = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 space-y-4 max-w-2xl mx-auto">
    <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] font-bold text-lg animate-pulse">
      IK
    </div>
    <div className="w-48 h-3 rounded-full bg-white/10 animate-pulse" />
    <div className="w-32 h-2 rounded-full bg-white/5 animate-pulse" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <HomePage />
          </Suspense>
        )
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <AboutPage />
          </Suspense>
        )
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ServicesPage />
          </Suspense>
        )
      },
      {
        path: 'services/:slug',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ServiceDetailPage />
          </Suspense>
        )
      },
      {
        path: 'portfolio',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <PortfolioPage />
          </Suspense>
        )
      },
      {
        path: 'portfolio/*',
        element: <Navigate to="/portfolio" replace />
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <PricingPage />
          </Suspense>
        )
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <BlogPage />
          </Suspense>
        )
      },
      {
        path: 'blog/:slug',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <BlogPostPage />
          </Suspense>
        )
      },
      {
        path: 'resources',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ResourcesPage />
          </Suspense>
        )
      },
      {
        path: 'tools/website-cost-calculator',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <WebsiteCostCalculatorPage />
          </Suspense>
        )
      },
      {
        path: 'tools/free-website-audit',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <FreeWebsiteAuditPage />
          </Suspense>
        )
      },
      {
        path: 'faq',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <FaqPage />
          </Suspense>
        )
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ContactPage />
          </Suspense>
        )
      },
      {
        path: 'book-a-call',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <BookCallPage />
          </Suspense>
        )
      },
      {
        path: 'thank-you',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ThankYouPage />
          </Suspense>
        )
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <PrivacyPolicyPage />
          </Suspense>
        )
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <TermsPage />
          </Suspense>
        )
      },
      // Bangalore location routes from sitemap
      {
        path: 'web-designer-bangalore',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <LocationPage />
          </Suspense>
        )
      },
      {
        path: 'website-design-indiranagar',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <LocationPage />
          </Suspense>
        )
      },
      {
        path: 'web-design-whitefield',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <LocationPage />
          </Suspense>
        )
      },
      {
        path: 'wordpress-developer-koramangala',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <LocationPage />
          </Suspense>
        )
      },
      // Admin dashboard
      {
        path: 'admin',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <AdminPage />
          </Suspense>
        )
      },
      // 404 Catch-All
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteLoader />}>
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
