import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Zap, Shield } from 'lucide-react';
import { PopupModal } from 'react-calendly';

export function ConsultationCard() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-6 px-4 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-blue-500/10 dark:border-blue-400/20 shadow-2xl dark:shadow-blue-900/20 p-8 text-center transition-all duration-500"
                >
                    {/* Animated Background Elements - Theme Adaptive */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-100/50 dark:bg-blue-600/10 rounded-full blur-[100px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                rotate: [0, -90, 0],
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-100/50 dark:bg-purple-600/10 rounded-full blur-[100px]"
                        />
                    </div>

                    {/* Floating Icons - Theme Adaptive */}
                    <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-8 left-8 md:left-16 text-blue-500 dark:text-blue-400 opacity-60 hidden md:block"
                    >
                        <Sparkles className="w-6 h-6" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [5, -5, 5] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-8 right-8 md:right-16 text-purple-500 dark:text-purple-400 opacity-60 hidden md:block"
                    >
                        <Zap className="w-6 h-6" />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-700/50 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-300">Limited Availability</span>
                        </motion.div>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white max-w-2xl leading-tight">
                            Scale Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Premium Software</span>
                        </h2>

                        <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mb-2">
                            Stop settling for average. Get high-performance, custom solutions designed for dominance.
                        </p>

                        <div className="relative group rounded-full p-[2px] overflow-hidden">
                            {/* Rotating Border Glow */}
                            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#fff_360deg)] animate-spin-slow opacity-70" />

                            <motion.button
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg shadow-blue-500/40 overflow-hidden text-sm font-bold w-full h-full"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Book Free Consultation
                                    <Calendar className="w-4 h-4" />
                                </span>
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer pointer-events-none" />

                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.button>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                                <Shield className="w-3 h-3" /> No Obligation
                            </span>
                            <span className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Free Strategy Session
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <PopupModal
                url="https://calendly.com/arqummalik1/new-meeting"
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById("root")!}
            />
        </section>
    );
}
