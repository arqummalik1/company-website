import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, TrendingUp, Globe, ShieldCheck, Zap } from 'lucide-react';

export const PromoBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('audentix_promo_dismissed') === 'true';
        }
        return false;
    });

    const calculateTimeLeft = () => {
        const targetDate = new Date('2026-03-01T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // Ad temporarily hidden as per request
        /*
        // Show after 30 seconds only if not dismissed
        if (isDismissed) return;

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 30000); // 30 seconds

        return () => clearTimeout(timer);
        */
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        sessionStorage.setItem('audentix_promo_dismissed', 'true');
    };

    const handleClaim = () => {
        handleDismiss();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Update countdown every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 font-sans">
                    {/* Backdrop with Blur Transition */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        onClick={handleDismiss}
                        className="absolute inset-0 bg-black/40 z-0"
                    />

                    {/* Modal Content - Apple Style Glass */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                            mass: 0.8
                        }}
                        className="relative w-[90%] max-w-sm md:max-w-md overflow-hidden rounded-[24px] md:rounded-[32px] z-10 shadow-2xl"
                        style={{
                            boxShadow: "0 40px 80px -12px rgba(0, 0, 0, 0.5)"
                        }}
                    >
                        {/* The "Liquid" Background Layer */}
                        <div className="absolute inset-0 z-0">
                            {/* Glass Base: Light Mode (White) vs Dark Mode (Slate) */}
                            <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl saturate-150 transition-colors duration-300" />

                            {/* Moving Orbs */}
                            <motion.div
                                animate={{
                                    x: [0, 50, 0],
                                    y: [0, 30, 0],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-20 -left-20 w-40 h-40 md:w-64 md:h-64 bg-cyan-500/30 rounded-full blur-[60px] md:blur-[80px]"
                            />
                            <motion.div
                                animate={{
                                    x: [0, -30, 0],
                                    y: [0, 50, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-20 -right-20 w-40 h-40 md:w-64 md:h-64 bg-blue-600/30 rounded-full blur-[60px] md:blur-[80px]"
                            />

                            {/* Noise Texture */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </div>

                        {/* Top Highlights (Reflection) */}
                        <div className="absolute inset-0 z-10 pointer-events-none rounded-[24px] md:rounded-[32px] ring-1 ring-black/5 dark:ring-white/10 ring-inset">
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/40 to-transparent opacity-50" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 md:top-5 md:right-5 p-1.5 md:p-2 rounded-full bg-black/5 dark:bg-black/20 text-slate-500 dark:text-white/70 hover:bg-black/10 dark:hover:bg-black/40 hover:text-slate-900 dark:hover:text-white transition-all backdrop-blur-md border border-black/5 dark:border-white/5 z-20 group"
                        >
                            <X size={16} className="md:w-[18px] md:h-[18px] group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="p-6 md:p-8 relative z-10 text-center">
                            {/* Hero Icon */}
                            <motion.div
                                initial={{ y: 0, rotate: 0 }}
                                animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="mx-auto w-14 h-14 md:w-16 md:h-16 rounded-[20px] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 dark:from-cyan-500/20 dark:to-blue-600/20 backdrop-blur-md border border-black/5 dark:border-white/10 flex items-center justify-center mb-5 md:mb-6 shadow-xl shadow-cyan-500/10 dark:shadow-cyan-900/20"
                            >
                                <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-cyan-600 dark:text-cyan-400 drop-shadow-sm" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight leading-tight">
                                    Dominate Your Market.
                                </h3>
                                <p className="text-slate-600 dark:text-blue-100/70 mb-6 text-xs md:text-sm leading-relaxed max-w-[90%] mx-auto">
                                    A professional website works 24/7 to build trust, automate leads, and scale your revenue.
                                </p>
                            </motion.div>

                            {/* Benefits Grid */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-3 gap-2 mb-6"
                            >
                                {[
                                    { icon: Globe, label: "Global Reach" },
                                    { icon: ShieldCheck, label: "Build Trust" },
                                    { icon: Zap, label: "Fast Growth" },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 backdrop-blur-sm">
                                        <item.icon size={16} className="text-cyan-600 dark:text-cyan-400" />
                                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">{item.label}</span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Price */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mb-6 p-1 rounded-2xl bg-gradient-to-br from-white/40 via-white/20 to-transparent dark:from-white/10 dark:to-white/5 border border-white/40 dark:border-white/10 shadow-inner"
                            >
                                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3 backdrop-blur-sm flex items-center justify-between px-5">
                                    <div className="text-left">
                                        <div className="text-[10px] font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-0.5">Business Setup</div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Offer ends Feb 28</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-sm text-slate-400 dark:text-white/40 line-through decoration-slate-400/30 dark:decoration-white/30">₹15,999</span>
                                        <span className="block text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">₹4,999</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Countdown Grid */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="grid grid-cols-4 gap-2 mb-6"
                            >
                                {[
                                    { label: 'Days', value: timeLeft.days },
                                    { label: 'Hrs', value: timeLeft.hours },
                                    { label: 'Min', value: timeLeft.minutes },
                                    { label: 'Sec', value: timeLeft.seconds }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/40 dark:bg-white/5 rounded-lg p-2 text-center border border-white/20 dark:border-white/5 backdrop-blur-sm ring-1 ring-black/5 dark:ring-transparent">
                                        <div className="text-sm md:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">{String(item.value).padStart(2, '0')}</div>
                                        <div className="text-[8px] text-slate-500 dark:text-blue-200/60 uppercase tracking-wider font-semibold">{item.label}</div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-3"
                            >
                                <button
                                    onClick={handleClaim}
                                    className="relative overflow-hidden w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start My Growth
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="w-full py-2 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white transition-colors text-xs font-medium"
                                >
                                    I'm okay with slow growth
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
