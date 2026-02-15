import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
    const { ref } = useScrollReveal();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    // Reveal animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const reveals = sectionRef.current?.querySelectorAll('.reveal');
        reveals?.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const clientLogos = ['TechCorp', 'InnovateLabs', 'GlobalRetail', 'FintechPro', 'DataSystems'];

    return (
        <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div ref={ref} className="text-center mb-8 md:mb-12 reveal">
                    <h2 className="text-3xl sm:text-4xl sm:text-5xl font-display font-bold mb-4">
                        Client <span className="text-gradient">Testimonials</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Hear what our clients say about working with us
                    </p>
                </div>

                {/* Client Logos */}
                <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60 reveal stagger-1">
                    {clientLogos.map((logo) => (
                        <div
                            key={logo}
                            className="text-2xl font-bold text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                        >
                            {logo}
                        </div>
                    ))}
                </div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto reveal stagger-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-8 md:p-12">
                                <Quote className="w-12 h-12 text-blue-500 mb-6" />

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                                    "{testimonials[currentIndex].content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                        {testimonials[currentIndex].avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg">
                                            {testimonials[currentIndex].name}
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-400">
                                            {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-16 glass p-2.5 sm:p-3 rounded-full hover:bg-blue-500/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-16 glass p-2.5 sm:p-3 rounded-full hover:bg-blue-500/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 bg-blue-500'
                                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
