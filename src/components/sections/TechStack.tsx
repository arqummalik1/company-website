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
        { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', category: 'Frontend', description: 'Progressive JavaScript framework for building modern, reactive user interfaces.' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', category: 'Frontend', description: 'React framework for production with server-side rendering and static generation.' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', category: 'Frontend', description: 'Utility-first CSS framework for rapidly building custom user interfaces.' },

        // Mobile App Development

        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', category: 'Mobile', description: 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop.' },
        { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg', category: 'Mobile', description: 'Apple\'s powerful programming language for iOS, macOS, and watchOS app development.' },
        { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg', category: 'Mobile', description: 'Modern programming language for Android development with concise and safe syntax.' },

        // Backend / APIs
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', category: 'Backend', description: 'JavaScript runtime built on Chrome\'s V8 engine for building scalable server-side applications.' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', category: 'Backend', description: 'Fast, unopinionated, minimalist web framework for Node.js applications.' },
        { name: 'NestJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg', category: 'Backend', description: 'Progressive Node.js framework for building efficient and scalable server-side applications.' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', category: 'Backend', description: 'High-level programming language known for its simplicity and versatility in web development and AI.' },
        { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', category: 'Backend', description: 'High-level Python web framework that encourages rapid development and clean design.' },
        { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', category: 'Backend', description: 'Modern, fast web framework for building APIs with Python based on standard type hints.' },
        { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg', category: 'Backend', description: 'Systems programming language focused on safety, speed, and concurrency for high-performance applications.' },
        { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg', category: 'Backend', description: 'Query language and runtime for APIs that gives clients the power to ask for exactly what they need.' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', category: 'Backend', description: 'Popular server-side scripting language designed for web development.' },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', category: 'Backend', description: 'PHP framework with expressive, elegant syntax for web application development.' },

        // Databases
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', category: 'Database', description: 'NoSQL document database designed for scalability and developer agility.' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', category: 'Database', description: 'Powerful, open-source object-relational database system with strong reliability.' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', category: 'Database', description: 'Open-source relational database management system widely used for web applications.' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', category: 'Database', description: 'In-memory data store used as database, cache, and message broker for ultra-fast performance.' },
        { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', category: 'Database', description: 'Open-source Firebase alternative with Postgres database, auth, and realtime subscriptions.' },

        // UI/UX Design
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', category: 'Design', description: 'Collaborative interface design tool for creating, prototyping, and sharing designs.' },
        { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg', category: 'Design', description: 'Vector-based design tool for creating user experiences for web and mobile apps.' },
        { name: 'Framer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', category: 'Design', description: 'Interactive design tool for creating high-fidelity prototypes and animations.' },

        // DevOps / Cloud
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', category: 'DevOps', description: 'Platform for developing, shipping, and running applications in containers.' },
        { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg', category: 'DevOps', description: 'Container orchestration platform for automating deployment, scaling, and management of apps.' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'Cloud', description: 'Amazon Web Services - comprehensive cloud computing platform with 200+ services.' },
        { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', category: 'Cloud', description: 'Cloud platform for frontend frameworks and static sites with instant global deployment.' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', category: 'Cloud', description: 'Google\'s platform for building web and mobile applications with backend services.' },

        // AI / Automation / Tools
        { name: 'OpenAI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg', category: 'AI', description: 'AI research company providing GPT models and APIs for natural language processing.' },
        { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', category: 'AI', description: 'Google\'s open-source machine learning framework for building and deploying ML models at scale.' },
        { name: 'LangChain', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', category: 'AI', description: 'Framework for building AI applications powered by large language models with chains and agents.' },
        { name: 'n8n', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg', category: 'Automation', description: 'Open-source workflow automation tool for connecting apps, APIs, and AI agents without code.' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', category: 'Tools', description: 'Platform for version control and collaboration using Git for software development.' },
        { name: 'Stripe', icon: 'https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg', category: 'Tools', description: 'Payment processing platform for online businesses and e-commerce applications.' },
        { name: 'Anthropic', icon: 'https://cdn.simpleicons.org/anthropic', category: 'AI', description: 'AI safety and research company, creators of Claude.' },
        { name: 'Mistral AI', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Mistral_AI_logo.svg', category: 'AI', description: 'Open-weight models and efficient AI solutions.' },
        { name: 'Hugging Face', icon: 'https://cdn.simpleicons.org/huggingface', category: 'AI', description: 'The platform where the machine learning community collaborates on models, datasets, and applications.' },
        { name: 'Zapier', icon: 'https://cdn.simpleicons.org/zapier', category: 'Automation', description: 'Easy automation for busy people. Connects your apps and automates workflows.' },
        { name: 'Make', icon: 'https://cdn.simpleicons.org/make', category: 'Automation', description: 'Visual platform to design, build, and automate anything without code.' },
        { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma', category: 'Database', description: 'Next-generation ORM for Node.js and TypeScript.' },
        { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite', category: 'Frontend', description: 'Next Generation Frontend Tooling. Instant Server Start.' },
        { name: 'Bun', icon: 'https://cdn.simpleicons.org/bun', category: 'Backend', description: 'Incredibly fast JavaScript runtime, bundler, test runner, and package manager.' },
        { name: 'Gemini', icon: 'https://cdn.simpleicons.org/googlegemini', category: 'AI', description: 'Google’s most capable and general AI model.' },
        { name: 'Midjourney', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg', category: 'AI', description: 'Generative artificial intelligence program and service for creating stunning visuals.' },
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
                        40+ cutting-edge technologies • Click any icon to learn more
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
                                            loading="lazy"
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
