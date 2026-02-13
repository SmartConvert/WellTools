import React, { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([
        { id: 1, user: 'Sarah M.', date: '2 days ago', text: 'This was incredibly helpful! I never realized how much protein timing mattered.' },
        { id: 2, user: 'David K.', date: '3 days ago', text: 'Great breakdown of the formulas. Thank you for the references.' }
    ]);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        // Simulate network delay for realism
        setTimeout(() => {
            setComments([
                { id: Date.now(), user: 'You', date: 'Just now', text: newComment },
                ...comments
            ]);
            setNewComment('');
            setIsSubmitting(false);
        }, 800);
    };

    return (
        <div className="mt-16 pt-16 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-emerald-500" />
                Community Discussion
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts or questions..."
                    className="w-full p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all min-h-[100px] mb-4 text-gray-700 dark:text-gray-300"
                />
                <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 ml-auto"
                >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                    <Send className="w-4 h-4" />
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="shrink-0 w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="grow">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-bold text-gray-900 dark:text-white">{comment.user}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-4 rounded-b-xl rounded-r-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                {comment.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
