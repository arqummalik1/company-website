import { Linkedin, Twitter, Github } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        services: [
            { label: 'Custom Websites', href: '#' },
            { label: 'Mobile Apps', href: '#' },
            { label: 'Web Apps / SaaS', href: '#' },
            { label: 'AI Chatbots', href: '#' }
        ],
        company: [
            { label: 'About Us', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Contact', href: '#' },
            { label: 'Blog', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Github, href: '#', label: 'GitHub' }
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                                Q
                            </div>
                            <span className="text-2xl font-display font-bold text-white">
                                Qubit <span className="gradient-text">Technologies</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Premium custom software development company building world-class digital solutions.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="glass p-2 rounded-full hover:bg-blue-500/20 transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Services</h3>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Empty column for spacing */}
                    <div />
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Qubit Technologies. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
