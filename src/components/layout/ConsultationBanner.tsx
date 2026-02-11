import { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { PopupModal } from 'react-calendly';
import { motion, AnimatePresence } from 'framer-motion';

export function ConsultationBanner() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-white/10 shadow-2xl py-4 px-4 md:px-8"
                    >
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-gray-900 dark:text-white font-medium text-lg">
                                    Transform your business with AI-driven solutions. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">Get a Free Consultation</span> today.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
                                >
                                    <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                    Book Consultation
                                </button>

                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                                    aria-label="Close banner"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <PopupModal
                url="https://calendly.com/arqummalik1/new-meeting"
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById("root")!}
            />
        </>
    );
}
