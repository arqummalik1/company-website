import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { Portfolio } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { Blog } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { CTA } from '@/components/sections/CTA';
import { TechStack } from '@/components/sections/TechStack';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { PremiumLoader } from '@/components/ui/ReverseLoader';

// Lazy load pages
const SinglePost = lazy(() => import('@/pages/SinglePost'));
const Products = lazy(() => import('@/pages/Products'));

function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <TechStack />
      <Features />
      <Portfolio />
      <Testimonials />
      <Blog />
      <CTA />
      <Contact />
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
          </Routes>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
