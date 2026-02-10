import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Tech {
    name: string;
    icon: string;
    category: string;
    description: string;
}

export function TechStack() {
    const [selectedTech, setSelectedTech] = useState<Tech | null>(null);

    // 30 technologies organized by category with descriptions
    const techStack: Tech[] = [
        // Frontend (Web)
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', category: 'Frontend', description: 'The standard markup language for creating web pages and web applications.' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', category: 'Frontend', description: 'Style sheet language used for describing the presentation of web pages.' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', category: 'Frontend', description: 'High-level programming language that powers interactive web experiences.' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', category: 'Frontend', description: 'Strongly typed superset of JavaScript that compiles to plain JavaScript.' },
        { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'Frontend', description: 'JavaScript library for building user interfaces with reusable components.' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', category: 'Frontend', description: 'React framework for production with server-side rendering and static generation.' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', category: 'Frontend', description: 'Utility-first CSS framework for rapidly building custom user interfaces.' },

        // Mobile App Development
        { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'Mobile', description: 'Framework for building native mobile apps using React and JavaScript.' },
        { name: 'Expo', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'Mobile', description: 'Platform for making universal native apps with React that run on Android, iOS, and web.' },
        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', category: 'Mobile', description: 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop.' },

        // Backend / APIs
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', category: 'Backend', description: 'JavaScript runtime built on Chrome\'s V8 engine for building scalable server-side applications.' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', category: 'Backend', description: 'Fast, unopinionated, minimalist web framework for Node.js applications.' },
        { name: 'NestJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg', category: 'Backend', description: 'Progressive Node.js framework for building efficient and scalable server-side applications.' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', category: 'Backend', description: 'High-level programming language known for its simplicity and versatility in web development and AI.' },
        { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', category: 'Backend', description: 'High-level Python web framework that encourages rapid development and clean design.' },
        { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', category: 'Backend', description: 'Modern, fast web framework for building APIs with Python based on standard type hints.' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', category: 'Backend', description: 'Popular server-side scripting language designed for web development.' },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', category: 'Backend', description: 'PHP framework with expressive, elegant syntax for web application development.' },

        // Databases
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', category: 'Database', description: 'NoSQL document database designed for scalability and developer agility.' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', category: 'Database', description: 'Powerful, open-source object-relational database system with strong reliability.' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', category: 'Database', description: 'Open-source relational database management system widely used for web applications.' },

        // UI/UX Design
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', category: 'Design', description: 'Collaborative interface design tool for creating, prototyping, and sharing designs.' },
        { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg', category: 'Design', description: 'Vector-based design tool for creating user experiences for web and mobile apps.' },
        { name: 'Framer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', category: 'Design', description: 'Interactive design tool for creating high-fidelity prototypes and animations.' },

        // DevOps / Cloud
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', category: 'DevOps', description: 'Platform for developing, shipping, and running applications in containers.' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'Cloud', description: 'Amazon Web Services - comprehensive cloud computing platform with 200+ services.' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', category: 'Cloud', description: 'Google\'s platform for building web and mobile applications with backend services.' },

        // AI / Tools
        { name: 'OpenAI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg', category: 'AI', description: 'AI research company providing GPT models and APIs for natural language processing.' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', category: 'Tools', description: 'Platform for version control and collaboration using Git for software development.' },
        { name: 'Stripe', icon: 'https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg', category: 'Tools', description: 'Payment processing platform for online businesses and e-commerce applications.' },
    ];

    // Duplicate for seamless infinite scroll
    const duplicatedTechStack = [...techStack, ...techStack];

    return (
        <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                        Technologies <span className="gradient-text">We Use</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Click any technology to learn more about what we build with it
                    </p>
                </motion.div>

                {/* Marquee Container */}
                <div className="relative">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

                    {/* Marquee Track */}
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex gap-8 py-8"
                            animate={{
                                x: [0, -50 * techStack.length],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    duration: 40,
                                    ease: 'linear',
                                },
                            }}
                        >
                            {duplicatedTechStack.map((tech, index) => (
                                <button
                                    key={`${tech.name}-${index}`}
                                    onClick={() => setSelectedTech(tech)}
                                    className="flex-shrink-0 group cursor-pointer"
                                    style={{ width: '80px' }}
                                    aria-label={`Learn about ${tech.name}`}
                                    title={tech.name}
                                >
                                    <div className="flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110">
                                        {/* Icon container - transparent background */}
                                        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300 p-2 group-hover:shadow-lg group-hover:bg-gray-100/50 dark:group-hover:bg-gray-800/50">
                                            <img
                                                src={tech.icon}
                                                alt={tech.name}
                                                className="w-full h-full object-contain filter dark:brightness-100"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mt-12"
                >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        30+ cutting-edge technologies • Click any icon to learn more
                    </p>
                </motion.div>
            </div>

            {/* Modal for Tech Details */}
            <AnimatePresence>
                {selectedTech && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTech(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
                        >
                            <div className="glass rounded-2xl p-8 shadow-2xl">
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedTech(null)}
                                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className="w-24 h-24 flex items-center justify-center p-4">
                                        <img
                                            src={selectedTech.icon}
                                            alt={selectedTech.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-2">{selectedTech.name}</h3>
                                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
                                        {selectedTech.category}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {selectedTech.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
