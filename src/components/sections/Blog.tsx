import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { blogPosts } from '@/data/blog';

export function Blog() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                            Latest <span className="gradient-text">Insights</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Stay updated with the latest trends in technology
                        </p>
                    </div>
                    <a
                        href="#"
                        className="hidden md:inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        View All Articles
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="group bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <Badge className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90">
                                    {post.category}
                                </Badge>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Meta */}
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Read More */}
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                >
                                    Read More
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Mobile View All Link */}
                <div className="md:hidden text-center mt-8">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        View All Articles
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
