import { Linkedin, Twitter, Github, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import headerLogo from '@/assets/headerLogo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Custom Websites', href: '#services' },
      { label: 'Mobile Apps', href: '#services' },
      { label: 'Web Apps / SaaS', href: '#services' },
      { label: 'AI Solutions', href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#blog' },
      { label: 'Products', href: '/products' },
      { label: 'Contact', href: '#contact' },
    ],
    resources: [
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Case Studies', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'audentix@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 7006082958' },
    { icon: MapPin, label: 'Location', value: 'Jammu, India' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/audentix', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/audentix/audentix', label: 'GitHub' },
  ];

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={headerLogo}
                alt="Audentix"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
              Premium custom software development company building world-class digital solutions
              that transform businesses and deliver exceptional user experiences.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    'w-10 h-10 rounded-xl',
                    'flex items-center justify-center',
                    'bg-[var(--surface)] border border-[var(--border)]',
                    'text-[var(--text-muted)]',
                    'hover:text-[var(--accent)] hover:border-[var(--accent)]',
                    'transition-all duration-300'
                  )}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <info.icon className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">{info.label}</div>
                    <div className="text-sm text-[var(--text-secondary)]">{info.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-muted)] text-sm">
            © {currentYear} Audentix. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
