import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationCard } from '@/components/layout/ConsultationCard';
import { Hero } from '@/components/sections/Hero';
import { TechStack } from '@/components/sections/TechStack';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { Blog } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { PremiumLoader } from '@/components/ui/ReverseLoader';

// Lazy load the SinglePost page (only needed when navigating to a blog post)
const SinglePost = lazy(() => import('@/pages/SinglePost'));

function HomePage() {
    return (
        <main>
            <Hero />
            <TechStack />
            <Services />
            <Portfolio />
            <Testimonials />
            <ConsultationCard />
            <Blog />
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

            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
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
                                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            }>
                                <SinglePost />
                            </Suspense>
                        } />
                    </Routes>
                </ErrorBoundary>
            </div>
        </>
    );
}


export default App;
