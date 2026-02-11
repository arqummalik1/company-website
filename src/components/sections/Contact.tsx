import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export function Contact() {
    const { ref, isVisible } = useScrollReveal();
    const [formData, setFormData] = useState({
        name: '',
        email: '',

        phone: '',
        subject: '',
        message: ''
    });
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Get EmailJS credentials from environment variables
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const ownerTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER;
            const customerTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_CUSTOMER;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            // Validate environment variables
            if (!serviceId || !ownerTemplateId || !customerTemplateId || !publicKey) {
                throw new Error('EmailJS configuration is missing. Please set up your environment variables.');
            }

            // Prepare template parameters
            const fullPhone = formData.phone || 'Not provided';
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: fullPhone,
                company: formData.subject || 'Not provided',
                message: formData.message,
                to_email: formData.email, // For customer thank you email
                submission_time: new Date().toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short'
                })
            };

            // Send email to owner (arqummalik1@gmail.com)
            await emailjs.send(
                serviceId,
                ownerTemplateId,
                templateParams,
                publicKey
            );

            // Send thank you email to customer
            await emailjs.send(
                serviceId,
                customerTemplateId,
                templateParams,
                publicKey
            );

            // Show success toast
            setToastType('success');
            setToastMessage('Thank you! Your message has been sent successfully. Check your email for confirmation.');
            setShowToast(true);

            // Reset form
            setFormData({
                name: '',
                email: '',

                phone: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            console.error('Email sending failed:', error);

            // Show error toast
            setToastType('error');
            setToastMessage(
                error instanceof Error && error.message.includes('configuration')
                    ? 'Email service not configured. Please contact us directly at arqummalik1@gmail.com'
                    : 'Failed to send message. Please try again or contact us directly at arqummalik1@gmail.com'
            );
            setShowToast(true);
        } finally {
            setIsSubmitting(false);

            // Hide toast after 7 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 7000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneChange = (value: string | undefined) => {
        setFormData({
            ...formData,
            phone: value || ''
        });
    };

    // Contact Information Data
    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'arqummalik1@gmail.com',
            color: 'text-blue-500'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+91 7006082958',
            color: 'text-purple-500'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Jammu, India',
            color: 'text-cyan-500'
        }
    ];

    const socialLinks = [
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Github, href: '#', label: 'GitHub' }
    ];

    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Info */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: -30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                            Let's Build Something{' '}
                            <span className="gradient-text">Amazing Together</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                            Ready to transform your ideas into reality? Get in touch with our team and let's discuss your project.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6 mb-8">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${info.color}`}>
                                        <info.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {info.label}
                                        </div>
                                        <div className="font-semibold">{info.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Follow us on social media
                            </p>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="glass p-3 rounded-full hover:bg-blue-500/20 transition-colors"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <Card className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Phone Number with Country Code */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <div className="phone-input-container">
                                        <PhoneInput
                                            international
                                            defaultCountry="US"
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed [&_.PhoneInputCountry]:mr-3 [&_.PhoneInputCountryIcon]:w-6 [&_.PhoneInputCountryIcon]:h-4 [&_.PhoneInputCountrySelect]:bg-transparent [&_input]:bg-transparent [&_input]:outline-none [&_input]:text-inherit [&_input]:placeholder-gray-400"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="What can we help you with?"
                                    />
                                </div>



                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    icon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-8 right-8 z-50 glass p-6 rounded-lg shadow-2xl max-w-md"
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
                                }`}>
                                {toastType === 'success' ? (
                                    <CheckCircle className="w-5 h-5 text-white" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-white" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    {toastType === 'success' ? 'Message Sent!' : 'Error Sending Message'}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {toastMessage}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
