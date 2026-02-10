import { useState, useEffect } from 'react';
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

function App() {
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <>
            {isLoading && <PremiumLoader onComplete={() => setIsLoading(false)} />}

            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
                <CursorGlow />
                <Navbar />
                <main>
                    <Hero />
                    <TechStack />
                    <Services />
                    <Portfolio />
                    <Testimonials />
                    <Blog />
                    <Contact />
                </main>
                <Footer />
                <StickyCTA />
            </div>
        </>
    );
}

export default App;
