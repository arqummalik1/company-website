import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    onComplete?: () => void;
}

export function PremiumLoader({ onComplete }: LoaderProps) {
    const [progress, setProgress] = useState(100);
    const [isExiting, setIsExiting] = useState(false);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        const duration = 1250;
        const steps = 50;
        const interval = duration / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setIsExiting(true);
                    setTimeout(() => onCompleteRef.current?.(), 500);
                    return 0;
                }
                return prev - 2;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // Generate particle positions
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: i * 0.1,
        duration: 2 + Math.random() * 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden"
                >
                    {/* Animated background particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                                initial={{
                                    x: `${particle.x}%`,
                                    y: `${particle.y}%`,
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
                                    opacity: [0, 0.6, 0],
                                    scale: [0, 1, 0],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    delay: particle.delay,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Radial gradient glow */}
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />

                    {/* Main content container */}
                    <div className="relative z-10 text-center px-4">
                        {/* Logo with sophisticated animation */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotateY: 0,
                            }}
                            transition={{
                                duration: 1,
                                ease: [0.34, 1.56, 0.64, 1],
                                delay: 0.2
                            }}
                            className="mb-8 perspective-1000"
                        >
                            <div className="relative inline-block">
                                {/* Glow effect behind logo */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-50"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.7, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />

                                {/* Logo */}
                                <motion.div
                                    className="relative w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
                                    animate={{
                                        rotateY: [0, 360],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <span className="text-white font-bold text-lg">Q</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Brand name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-xl font-bold text-white mb-1 tracking-wider"
                        >
                            QUBIT
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-gray-400 text-xs mb-8 tracking-widest"
                        >
                            TECHNOLOGIES
                        </motion.p>

                        {/* Progress container */}
                        <div className="max-w-xs mx-auto">
                            {/* Percentage display with sophisticated animation */}
                            <motion.div
                                className="mb-6 relative"
                            >
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    {progress}
                                    <span className="text-2xl">%</span>
                                </div>
                            </motion.div>

                            {/* Progress bar with glass morphism */}
                            <div className="relative h-1.5 bg-white/5 backdrop-blur-sm rounded-full overflow-hidden border border-white/10 shadow-lg">
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{
                                        x: ['-100%', '200%'],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />

                                {/* Actual progress */}
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 relative overflow-hidden"
                                    initial={{ width: '100%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{
                                        duration: 0.025,
                                        ease: 'linear'
                                    }}
                                >
                                    {/* Glow effect on progress bar */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                        animate={{
                                            x: ['-100%', '200%'],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    />
                                </motion.div>
                            </div>

                            {/* Loading text with typing effect */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="mt-4 text-xs text-gray-400 tracking-wider"
                            >
                                <motion.span
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    Initializing premium experience
                                </motion.span>
                                <motion.span
                                    animate={{
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    ...
                                </motion.span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
