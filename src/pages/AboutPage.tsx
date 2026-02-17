import { PageWrapper } from './PageWrapper';
import { Hero } from '@/components/sections/Hero';
import { TechStack } from '@/components/sections/TechStack';
import { Container } from '@/components/layout/Container';
import { motion } from 'framer-motion';
import { CheckCircle2, Rocket, Users, Globe } from 'lucide-react';

export default function AboutPage() {
    const stats = [
        { label: "Projects Delivered", value: "50+" },
        { label: "Client Satisfaction", value: "100%" },
        { label: "Global Reach", value: "10+" },
        { label: "Team Experts", value: "15+" }
    ];

    const values = [
        {
            icon: Rocket,
            title: "Innovation First",
            description: "We constantly push boundaries with AI and modern tech stacks."
        },
        {
            icon: Users,
            title: "Client Centric",
            description: "Your vision is our blueprint. We build with your success in mind."
        },
        {
            icon: Globe,
            title: "Global Standards",
            description: "World-class code quality, security, and performance standards."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <PageWrapper
            title="About Audentix - Premium Software Development"
            description="Leading the future of digital transformation. Audentix builds scalable, high-performance software solutions."
            keywords="about audentix, software agency, AI development, tech team"
        >
            <Hero />

            {/* Mission Section */}
            <section className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/5 to-transparent opacity-50" />
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={itemVariants} className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                                Crafting the <span className="text-gradient">Digital Future</span>
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                                Audentix is a premium software development agency tailored for ambitious brands.
                                We don't just write code; we engineer experiences that drive growth, efficiency, and innovation.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300">
                                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                                    <div className="text-sm text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-[var(--bg-primary)]">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:shadow-glow transition-all duration-500 group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <value.icon className="w-7 h-7 text-[var(--accent)]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-[var(--bg-secondary)]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold font-display mb-8">Why leading companies choose Audentix?</h2>
                            <div className="space-y-6">
                                {[
                                    "Enterprise-grade Security & Scalability",
                                    "Agile Development Methodology",
                                    "Transparent Communication & Reporting",
                                    "Post-launch Support & Maintenance",
                                    "Cutting-edge Tech Stack (React, AI, Cloud)"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        </div>
                                        <span className="text-lg text-[var(--text-secondary)]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)] to-[var(--cyan)] rounded-3xl blur-3xl opacity-20" />
                            <div className="relative bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-12">
                                <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
                                <p className="text-[var(--text-secondary)] mb-8">
                                    Ready to transform your business? Let's build something extraordinary together.
                                </p>
                                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] text-white font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                    Get in Touch
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            <TechStack />
        </PageWrapper>
    );
}
