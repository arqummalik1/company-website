import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { client, isSanityConfigured, BlogPost } from '@/lib/sanity';
import { BlogCard } from '@/components/blog/BlogCard';

// Fallback dummy data while Sanity is being set up
const dummyPosts: BlogPost[] = [
    {
        _id: '1',
        title: 'The Future of AI in Software Development',
        slug: { current: 'future-of-ai' },
        publishedAt: new Date().toISOString(),
        author: { name: 'Arqum Malik', image: null },
        categories: [{ title: 'Technology' }],
        excerpt: 'How Artificial Intelligence is transforming the way we build and deploy software applications.',
        mainImage: null,
        body: []
    },
    {
        _id: '2',
        title: 'Building Scalable SaaS Applications',
        slug: { current: 'scalable-saas' },
        publishedAt: new Date().toISOString(),
        author: { name: 'Arqum Malik', image: null },
        categories: [{ title: 'Development' }],
        excerpt: 'Key strategies and patterns for creating robust, enterprise-grade SaaS platforms.',
        mainImage: null,
        body: []
    }
];

export function Blog() {
    const { ref, isVisible } = useScrollReveal();
    const [posts, setPosts] = useState<BlogPost[]>(dummyPosts);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isSanityConfigured() || !client) {
            // Sanity not configured yet, use dummy data
            return;
        }

        setLoading(true);
        const query = `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            publishedAt,
            mainImage,
            excerpt,
            author->{
                name,
                image
            },
            categories[]->{
                title
            }
        }`;

        client.fetch(query)
            .then((data: BlogPost[]) => {
                setPosts(data.length > 0 ? data : dummyPosts);
                setLoading(false);
            })
            .catch((err: Error) => {
                console.error('Sanity fetch error:', err);
                setPosts(dummyPosts);
                setLoading(false);
            });
    }, []);

    return (
        <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                            Latest <span className="gradient-text">Insights</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                            Stay updated with our latest thoughts on technology, design, and innovation.
                        </p>
                    </div>
                </motion.div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
