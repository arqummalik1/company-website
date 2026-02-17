import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { PremiumLoader } from '@/components/ui/ReverseLoader';
import { PromoBanner } from '@/components/sections/PromoBanner';

// Lazy load below-fold sections for faster initial load
const LazyFeatures = lazy(() => import('@/components/sections/Features').then(module => ({ default: module.Features })));
const LazyPortfolio = lazy(() => import('@/components/sections/Portfolio').then(module => ({ default: module.Portfolio })));
const LazyTestimonials = lazy(() => import('@/components/sections/Testimonials').then(module => ({ default: module.Testimonials })));
const LazyBlog = lazy(() => import('@/components/sections/Blog').then(module => ({ default: module.Blog })));
const LazyCTA = lazy(() => import('@/components/sections/CTA').then(module => ({ default: module.CTA })));
const LazyContact = lazy(() => import('@/components/sections/Contact').then(module => ({ default: module.Contact })));

// Lazy load pages
const SinglePost = lazy(() => import('@/pages/SinglePost'));
const Products = lazy(() => import('@/pages/Products'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const BlogPage = lazy(() => import('@/pages/Blog'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));

import { SEO } from '@/components/SEO/SEO';

import { Schema } from '@/components/SEO/Schema';

function HomePage() {
  return (
    <main>
      <SEO
        title="Audentix - Premium Software Development"
        description="Audentix is a premium custom software development company specializing in AI, SaaS, and enterprise solutions. We build scalable, secure, and beautiful software."
        keywords="software development, AI, SaaS, enterprise software, web development, mobile apps, specialized software"
      />
      <Schema data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Audentix",
        "url": "https://www.audentix.com",
        "logo": "https://www.audentix.com/faviconLogo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-555-5555", // Placeholder
          "contactType": "customer service"
        },
        "sameAs": [
          "https://twitter.com/audentix",
          "https://linkedin.com/company/audentix"
        ]
      }} />
      <Hero />
      <Services />
      <TechStack />
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
        <LazyFeatures />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
        <LazyPortfolio />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
        <LazyTestimonials />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
        <LazyBlog />
      </Suspense>
      <Suspense fallback={<div className="h-48 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
        <LazyCTA />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
        <LazyContact />
      </Suspense>
    </main>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Handle scroll-to-section when navigating from blog pages via navbar
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      // Wait for the DOM to be ready
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo!);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      // Clean up the state so it doesn't re-scroll on refresh
      window.history.replaceState({}, document.title);
    } else {
      // Scroll to top on route change
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      {isLoading && <PremiumLoader onComplete={() => setIsLoading(false)} />}

      <PromoBanner />

      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <CursorGlow />

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            } />
            <Route path="/blog/:slug" element={
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <SinglePost />
              </Suspense>
            } />
            <Route path="/products" element={
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <Navbar />
                <Products />
                <Footer />
              </Suspense>
            } />
            <Route path="/services" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
                <ServicesPage />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
                <AboutPage />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
                <ContactPage />
              </Suspense>
            } />
            <Route path="/blog" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
                <BlogPage />
              </Suspense>
            } />
            <Route path="/privacy-policy" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
                <PrivacyPolicy />
              </Suspense>
            } />
            <Route path="/terms-of-service" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>}>
                <TermsOfService />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <Navbar />
                <NotFound />
                <Footer />
              </Suspense>
            } />
          </Routes>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
