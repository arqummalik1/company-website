import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import { RainbowBorderButton } from '@/components/ui/RainbowBorderButton';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showQuoteButton, setShowQuoteButton] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
          setShowQuoteButton(scrollY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [location.pathname, navigate]);

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Blog', id: 'blog' },
    { label: 'Products', id: 'products', route: '/products' }
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'bg-[var(--surface)]/80 backdrop-blur-[var(--glass-blur)] border-b border-[var(--border)] shadow-lg'
            : 'bg-transparent border-transparent'
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center text-white font-bold text-xl">
                Q
              </div>
              <span className="text-xl md:text-2xl font-display font-bold text-[var(--text-primary)]">
                Qubit <span className="gradient-text">Technologies</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.route) {
                      navigate(link.route);
                    } else {
                      scrollToSection(link.id);
                    }
                  }}
                  className="relative text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group font-medium"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  'p-2.5 rounded-xl',
                  'bg-[var(--surface)] border border-[var(--border)]',
                  'hover:border-[var(--accent)] hover:shadow-glow',
                  'transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2'
                )}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
              </button>
              
              {/* Get Quote Button */}
              <div className={cn(
                "transition-all duration-300 transform",
                showQuoteButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              )}>
                <RainbowBorderButton
                  onClick={() => scrollToSection('contact')}
                  className="text-sm"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </RainbowBorderButton>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-1">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  'p-2.5 rounded-xl min-w-[48px] min-h-[48px]',
                  'flex items-center justify-center',
                  'hover:bg-[var(--surface)]',
                  'transition-all duration-300'
                )}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
              </button>
              
              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'p-2.5 rounded-xl min-w-[48px] min-h-[48px]',
                  'flex items-center justify-center',
                  'hover:bg-[var(--surface)]',
                  'transition-all duration-300'
                )}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[var(--text-primary)]" />
                ) : (
                  <Menu className="w-6 h-6 text-[var(--text-primary)]" />
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-t border-[var(--border)]"
            >
              <div className="px-4 py-4 space-y-2 bg-[var(--surface)]/90 backdrop-blur-[var(--glass-blur)]">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      if (link.route) {
                        navigate(link.route);
                        setIsMobileMenuOpen(false);
                      } else {
                        scrollToSection(link.id);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="block w-full text-left text-lg text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors py-3 px-4 font-medium min-h-[48px] flex items-center"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-2">
                  <RainbowBorderButton 
                    onClick={() => scrollToSection('contact')} 
                    className="w-full min-h-[48px]"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </RainbowBorderButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Spacer for fixed navbar */}
      <div className="h-18" />
    </>
  );
}

export default Navbar;
