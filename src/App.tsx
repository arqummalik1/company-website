import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyCTA } from '@/components/layout/StickyCTA';
import { Hero } from '@/components/sections/Hero';
import { TechStack } from '@/components/sections/TechStack';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { Blog } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { PremiumLoader } from '@/components/ui/ReverseLoader';
import SinglePost from '@/pages/SinglePost';

function HomePage() {
    return (
        <main>
            <Hero />
            <TechStack />
            <Services />
            <Portfolio />
            <Testimonials />
            <Blog />
            <Contact />
        </main>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Preload critical resources
        const preloadImages = () => {
            const images = document.querySelectorAll('img');
            const promises = Array.from(images).map((img) => {
                return new Promise((resolve) => {
                    if (img.complete) {
                        resolve(null);
                    } else {
                        img.onload = () => resolve(null);
                        img.onerror = () => resolve(null);
                    }
                });
            });
            return Promise.all(promises);
        };

        preloadImages();
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            {isLoading && <PremiumLoader onComplete={() => setIsLoading(false)} />}

            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
                <CursorGlow />

                <Routes>
                    <Route path="/" element={
                        <>
                            <Navbar />
                            <HomePage />
                            <Footer />
                            <StickyCTA />
                        </>
                    } />
                    <Route path="/blog/:slug" element={<SinglePost />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
