import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { label: 'Services', id: 'services' },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'Testimonials', id: 'testimonials' },
        { label: 'Blog', id: 'blog' }
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'glass shadow-lg' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                            Q
                        </div>
                        <span className="text-2xl font-display font-bold">
                            Qubit <span className="gradient-text">Technologies</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                        <Button onClick={() => scrollToSection('contact')} size="md">
                            Get a Quote
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass border-t border-white/20">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="block w-full text-left text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-2"
                            >
                                {link.label}
                            </button>
                        ))}
                        <Button onClick={() => scrollToSection('contact')} size="md" className="w-full">
                            Get a Quote
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
