import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot, Sparkles, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useChatViewModel } from '@/viewmodels/useChatViewModel';
import { ChatMessage } from './ChatMessage';

export function FloatingChatWidget() {
    const {
        isOpen,
        hasUnread,
        messages,
        input,
        handleInputChange,
        handleSubmit,
        toggleChat,
        messagesEndRef,
        isLoading,
        error,
        // Voice specific
        isListening,
        transcript,
        startListening,
        stopListening,
        isSpeechSupported,
        isVoiceMuted,
        toggleVoiceMute,
        isTTSSupported,
    } = useChatViewModel();

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all hover:shadow-cyan-500/40"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            className="relative"
                        >
                            <MessageSquare className="w-6 h-6" />
                            {hasUnread && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-0 right-0 top-0 left-0 sm:top-auto sm:left-auto sm:bottom-24 sm:right-6 z-[60] sm:w-[400px] sm:h-[600px] sm:max-h-[80vh] flex flex-col sm:rounded-2xl border-0 sm:border border-gray-200/50 dark:border-gray-700/50 shadow-2xl glass overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner backdrop-blur-md">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        Audentix AI <Sparkles className="w-4 h-4 text-yellow-300" />
                                    </h3>
                                    <p className="text-xs text-blue-100 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                        Online | Replies instantly
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {isTTSSupported && (
                                    <button
                                        onClick={toggleVoiceMute}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                        title={isVoiceMuted ? "Unmute AI Voice" : "Mute AI Voice"}
                                    >
                                        {isVoiceMuted ? <VolumeX className="w-5 h-5 text-white/80" /> : <Volume2 className="w-5 h-5 text-white/80" />}
                                    </button>
                                )}
                                <button onClick={toggleChat} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Close chat">
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col scroll-smooth">
                            {messages.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Bot className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Welcome to Audentix!</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            I'm your AI assistant. Type or speak to get started!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))
                            )}

                            {isLoading && (
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-4 italic">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    AI is typing...
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mt-4 border border-red-200 dark:border-red-800/50">
                                    <p className="font-semibold mb-1">Connection Error</p>
                                    <p>{error.message || 'Something went wrong while connecting to the AI helper. Please try again.'}</p>
                                </div>
                            )}

                            <div ref={messagesEndRef} className="h-4" />
                        </div>

                        {/* Input Area */}
                        <div className="p-2 sm:p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 shrink-0 pb-safe">
                            <form onSubmit={handleSubmit} className="flex gap-2 items-center relative">
                                {isSpeechSupported && (
                                    <button
                                        type="button"
                                        onClick={toggleListening}
                                        className={`w-11 h-11 rounded-full flex shrink-0 items-center justify-center transition-colors shadow-md ${isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
                                        title={isListening ? "Stop listening" : "Start Voice Input"}
                                    >
                                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                    </button>
                                )}

                                <input
                                    className="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                                    value={isListening ? (transcript || "Listening...") : (input || '')}
                                    onChange={handleInputChange}
                                    placeholder="Type your message..."
                                    disabled={isLoading || isListening}
                                />

                                <button
                                    type="submit"
                                    disabled={(!input?.trim() && !isListening) || isLoading}
                                    className="w-11 h-11 rounded-full bg-blue-600 text-white shrink-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    <Send className="w-5 h-5 ml-[-2px]" />
                                </button>
                            </form>
                            <div className="text-[10px] text-center text-gray-400 mt-2 hidden sm:block">
                                Powered by Audentix AI. Do not share sensitive information.
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
