import { UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';

export function ChatMessage({ message }: { message: UIMessage }) {
    const isAI = message.role === 'assistant';
    const isToolCall = (message as any).toolInvocations && (message as any).toolInvocations.length > 0;

    if (isToolCall) {
        // Show a minimal UI when the AI is executing a tool
        return (
            <div className="flex gap-3 mb-4 last:mb-0 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-gray-100 dark:bg-gray-800 text-[var(--text-primary)] relative border border-gray-200/50 dark:border-gray-700/50 shadow-sm opacity-70">
                    <div className="text-sm italic">
                        {(message as any).toolInvocations?.map((tool: any) => (
                            <span key={tool.toolCallId}>Submitting contact form...</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex gap-3 mb-4 last:mb-0 ${isAI ? 'justify-start' : 'justify-end'}`}>
            {isAI && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                    <Bot className="w-5 h-5 text-white" />
                </div>
            )}

            <div
                className={`px-4 py-3 rounded-2xl max-w-[85%] shadow-sm overflow-hidden 
          ${isAI
                        ? 'rounded-tl-sm bg-white dark:bg-gray-800 text-[var(--text-primary)] border border-gray-200/50 dark:border-gray-700/50'
                        : 'rounded-tr-sm bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                    }`}
            >
                <div className={`prose prose-sm max-w-none ${isAI ? 'dark:prose-invert' : 'prose-invert'} prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {(message as any).content}
                    </ReactMarkdown>
                </div>
            </div>

            {!isAI && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
            )}
        </div>
    );
}
