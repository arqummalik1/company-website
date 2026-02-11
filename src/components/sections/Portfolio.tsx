import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { projects } from '@/data/portfolio';

export function Portfolio() {
    const { ref } = useScrollReveal();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState<string>('All');

    const categories = ['All', 'SaaS', 'AI/ML', 'E-commerce', 'Fintech'];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category === activeFilter);

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

    return (
        <section id="portfolio" className="py-24 bg-gray-50 dark:bg-gray-800" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div ref={ref} className="text-center mb-12 reveal">
                    <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                        Featured <span className="text-gradient">Work</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore our portfolio of successful projects across various industries
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 reveal stagger-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`filter-btn px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === category
                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => {
                            const staggerClass = `stagger-${(index % 3) + 1}`;

                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className={`portfolio-item group rounded-2xl bg-white dark:bg-gray-700 shadow-lg overflow-hidden reveal ${staggerClass}`}
                                >
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 mix-blend-multiply`} />

                                        {/* Overlay - matching index.html portfolio-overlay */}
                                        <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 flex items-end p-6">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <Badge className="mb-3">{project.category}</Badge>
                                                <h3 className="text-2xl font-bold text-white mb-2">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-200 text-sm mb-4">
                                                    {project.description}
                                                </p>
                                                <button
                                                    className="inline-flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
                                                >
                                                    View Case Study
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content (visible on mobile) */}
                                    <div className="p-6 lg:hidden">
                                        <Badge className="mb-3">{project.category}</Badge>
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                            {project.description}
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                                        >
                                            View Case Study
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
