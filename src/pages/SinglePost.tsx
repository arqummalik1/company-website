import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor, BlogPost, isSanityConfigured } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogComments } from '@/components/blog/BlogComments';

const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null;
            return (
                <figure className="my-8">
                    <img
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || ' '}
                        className="w-full h-auto rounded-xl shadow-lg"
                        loading="lazy"
                    />
                    {value.caption && (
                        <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">{value.caption}</figcaption>
                    )}
                </figure>
            );
        },
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-4xl md:text-5xl font-display font-bold mt-12 mb-6 text-gray-900 dark:text-white">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-10 mb-5 text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-3">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-display font-semibold mt-8 mb-4 text-gray-800 dark:text-white">{children}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-xl font-display font-semibold mt-6 mb-3 text-gray-700 dark:text-gray-200">{children}</h4>
        ),
        normal: ({ children }: any) => (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5 text-lg">{children}</p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 dark:bg-blue-500/5 rounded-r-lg italic text-gray-600 dark:text-gray-300">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
        em: ({ children }: any) => <em className="italic text-gray-700 dark:text-gray-200">{children}</em>,
        code: ({ children }: any) => (
            <code className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-sm font-mono">{children}</code>
        ),
        link: ({ children, value }: any) => (
            <a
                href={value.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc list-inside space-y-2 my-5 text-gray-600 dark:text-gray-300 text-lg pl-4">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal list-inside space-y-2 my-5 text-gray-600 dark:text-gray-300 text-lg pl-4">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => <li className="text-gray-600 dark:text-gray-300 leading-relaxed">{children}</li>,
        number: ({ children }: any) => <li className="text-gray-600 dark:text-gray-300 leading-relaxed">{children}</li>,
    },
};

export default function SinglePost() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        if (!isSanityConfigured() || !client) {
            setLoading(false);
            return;
        }

        const query = `*[slug.current == $slug][0]{
            title,
            slug,
            publishedAt,
            mainImage,
            body,
            author->{
                name,
                image
            },
            categories[]->{
                title
            }
        }`;

        client.fetch(query, { slug })
            .then((data: BlogPost) => {
                setPost(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-gray-900 dark:text-white">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {!isSanityConfigured()
                        ? 'Blog backend (Sanity) is not configured yet.'
                        : 'This article could not be found.'}
                </p>
                <Link to="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 selection:bg-blue-500/30">
            <Navbar />

            <main className="pt-32 pb-20">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>

                        {post.categories && post.categories.length > 0 && (
                            <div className="flex justify-center mb-6">
                                <span className="px-4 py-1.5 text-sm font-semibold bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-500/20">
                                    {post.categories[0].title}
                                </span>
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </time>
                            </div>
                            {post.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{post.author.name}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-12" />

                    {/* Featured Image */}
                    {post.mainImage && (
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl dark:shadow-blue-500/10">
                            <img
                                src={urlFor(post.mainImage).width(1200).height(675).url()}
                                alt={post.mainImage.alt || post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="max-w-3xl mx-auto">
                        <PortableText value={post.body} components={ptComponents} />
                    </div>

                    {/* Comments Section */}
                    <BlogComments postSlug={slug || ''} />

                    {/* Bottom Divider */}
                    <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-white/10 text-center">
                        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to All Articles
                        </Link>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
