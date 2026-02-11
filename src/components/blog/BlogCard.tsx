import { Link } from 'react-router-dom';
import { BlogPost, urlFor } from '@/lib/sanity';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="group relative flex flex-col h-full bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                {post.mainImage && (
                    <img
                        src={urlFor(post.mainImage).width(800).height(600).url()}
                        alt={post.mainImage.alt || post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-gray-900 to-transparent opacity-60" />

                {/* Category Badge */}
                {post.categories && post.categories.length > 0 && (
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-600/90 text-white rounded-full backdrop-blur-md">
                            {post.categories[0].title}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </time>
                    </div>
                    {post.author && (
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author.name}</span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link to={`/blog/${post.slug.current}`}>
                        {post.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <Link
                        to={`/blog/${post.slug.current}`}
                        className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all"
                    >
                        Read Article <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
