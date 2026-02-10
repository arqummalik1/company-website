import { useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { services } from '@/data/services';
import { features } from '@/data/features';
import { Check } from 'lucide-react';

const iconMap: Record<string, any> = {
    Globe: Icons.Globe,
    Smartphone: Icons.Smartphone,
    Layers: Icons.Layers,
    Bot: Icons.Bot,
    Palette: Icons.Palette,
    Rocket: Icons.Rocket,
    Cpu: Icons.Cpu,
    Layers3: Icons.Layers3,
    Gauge: Icons.Gauge,
    ShieldCheck: Icons.ShieldCheck
};

const colorMap: Record<string, { bg: string; text: string; darkBg: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', darkBg: 'dark:bg-blue-900/30' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', darkBg: 'dark:bg-purple-900/30' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', darkBg: 'dark:bg-cyan-900/30' },
    green: { bg: 'bg-green-100', text: 'text-green-600', darkBg: 'dark:bg-green-900/30' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', darkBg: 'dark:bg-orange-900/30' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-600', darkBg: 'dark:bg-pink-900/30' },
};

const gradientOverlays: Record<string, string> = {
    blue: 'from-blue-500/5 to-purple-500/5',
    purple: 'from-purple-500/5 to-pink-500/5',
    cyan: 'from-cyan-500/5 to-blue-500/5',
    green: 'from-green-500/5 to-emerald-500/5',
    orange: 'from-orange-500/5 to-yellow-500/5',
    pink: 'from-pink-500/5 to-rose-500/5',
};

export function Services() {
    const { ref } = useScrollReveal();
    const sectionRef = useRef<HTMLDivElement>(null);

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
        <section id="services" className="py-24 relative bg-white dark:bg-gray-900" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div ref={ref} className="text-center mb-16 reveal">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Our <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        End-to-end software development services tailored to your business needs
                    </p>
                </div>

                {/* Services Grid - matching index.html service-card pattern */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon];
                        const colors = colorMap[service.color] || colorMap.blue;
                        const gradient = gradientOverlays[service.color] || gradientOverlays.blue;
                        const staggerClass = `stagger-${(index % 3) + 1}`;

                        return (
                            <div
                                key={service.id}
                                className={`service-card group relative p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden reveal ${staggerClass}`}
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                <div className="relative">
                                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.darkBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        {IconComponent && <IconComponent className={`w-7 h-7 ${colors.text}`} />}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 font-display">{service.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Features Highlight - Why Choose Qubitt */}
                <div className="mt-20 reveal">
                    <h3 className="text-3xl font-display font-bold text-center mb-12">
                        Why Choose <span className="text-gradient">Qubitt</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {features.map((feature, index) => {
                            const IconComponent = iconMap[feature.icon];
                            const staggerClass = `stagger-${(index % 4) + 1}`;

                            return (
                                <div
                                    key={index}
                                    className={`text-center reveal ${staggerClass}`}
                                >
                                    <div className={`w-12 h-12 mx-auto mb-3 ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                        {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                                    </div>
                                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
