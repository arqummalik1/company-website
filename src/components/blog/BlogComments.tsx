import { useState, useEffect } from 'react';
import { MessageCircle, Send, User as UserIcon } from 'lucide-react';

interface Comment {
    id: string;
    name: string;
    email: string;
    content: string;
    date: string;
}

interface BlogCommentsProps {
    postSlug: string;
}

export function BlogComments({ postSlug }: BlogCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const storageKey = `blog-comments-${postSlug}`;

    // Load comments from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            try {
                setComments(JSON.parse(stored));
            } catch {
                setComments([]);
            }
        }
    }, [storageKey]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !content.trim()) return;

        setIsSubmitting(true);

        const newComment: Comment = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim(),
            content: content.trim(),
            date: new Date().toISOString(),
        };

        const updated = [newComment, ...comments];
        setComments(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));

        setName('');
        setEmail('');
        setContent('');
        setIsSubmitting(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="max-w-3xl mx-auto mt-16">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200 dark:border-white/10">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                    Comments ({comments.length})
                </h2>
            </div>

            {/* Comments List */}
            {comments.length > 0 ? (
                <div className="space-y-6 mb-12">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-white dark:bg-gray-800/30 rounded-2xl p-6 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {getInitials(comment.name)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    {/* Name & Date */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-semibold text-gray-900 dark:text-white">{comment.name}</span>
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {new Date(comment.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    {/* Comment Content */}
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 mb-8">
                    <UserIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No comments yet.</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Be the first to share your thoughts!</p>
                </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave a Comment</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="comment-name" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                            Name *
                        </label>
                        <input
                            id="comment-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="comment-email" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                            Email *
                        </label>
                        <input
                            id="comment-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="comment-content" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Comment *
                    </label>
                    <textarea
                        id="comment-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your thoughts..."
                        required
                        rows={4}
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 dark:text-gray-500">Your email will not be published.</p>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </div>

                {success && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl text-green-700 dark:text-green-400 text-sm">
                        ✅ Comment posted successfully!
                    </div>
                )}
            </form>
        </div>
    );
}
