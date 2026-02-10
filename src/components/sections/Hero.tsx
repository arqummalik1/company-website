import { useEffect, useRef } from 'react';
import { ArrowRight, PlayCircle, ChevronDown } from 'lucide-react';

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Trigger reveal animations for hero elements after mount
        const timer = setTimeout(() => {
            const reveals = sectionRef.current?.querySelectorAll('.reveal');
            reveals?.forEach(el => el.classList.add('active'));
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const stats = [
        { value: '150+', label: 'Projects Delivered' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '12+', label: 'Years Experience' },
        { value: '24/7', label: 'Support Available' }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center pt-20 hero-bg overflow-hidden"
        >
            {/* Animated Background Elements - matching index.html */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" />
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: '2s' }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                {/* Badge */}
                <div className="reveal">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 border border-blue-200 dark:border-blue-800">
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        Trusted by 100+ Companies Worldwide
                    </div>
                </div>

                {/* Headline - matching index.html structure */}
                <h1 className="reveal stagger-1 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
                    We Build{' '}
                    <span className="text-gradient">Digital</span>
                    <br />
                    <span className="relative">
                        Excellence
                        <svg
                            className="absolute -bottom-2 left-0 w-full h-3 text-blue-500 opacity-60"
                            viewBox="0 0 200 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.00025 6.99997C25.7509 9.37499 117.248 8.62499 197.501 2.00002"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="reveal stagger-2 mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                    Premium custom software solutions that transform businesses. From AI-powered applications to scalable SaaS platforms, we bring your vision to life.
                </p>

                {/* CTAs - matching index.html button styles */}
                <div className="reveal stagger-3 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get a Quote
                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button
                        onClick={() => scrollToSection('portfolio')}
                        className="px-8 py-4 glass rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2 group"
                    >
                        View Our Work
                        <PlayCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Stats - matching index.html */}
                <div className="reveal stagger-4 mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-gradient font-display">
                                {stat.value}
                            </div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator - matching index.html */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <button
                    onClick={() => scrollToSection('services')}
                    className="cursor-pointer"
                    aria-label="Scroll down"
                >
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                </button>
            </div>
        </section>
    );
}
