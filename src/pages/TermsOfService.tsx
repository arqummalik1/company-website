import { PageWrapper } from './PageWrapper';
import { Container } from '@/components/layout/Container';
import { motion } from 'framer-motion';

export default function TermsOfService() {
    return (
        <PageWrapper
            title="Terms of Service - Audentix"
            description="Terms of Service for Audentix. Read our terms and conditions for using our services."
            keywords="terms of service, tos, legal, audentix terms"
        >
            <section className="pt-32 pb-20 bg-[var(--bg-primary)]">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold font-display mb-8 text-[var(--text-primary)]">
                            Terms of Service
                        </h1>
                        <p className="text-[var(--text-secondary)] mb-12 text-lg">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>

                        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-[var(--text-secondary)]">
                            <section>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Agreement to Terms</h2>
                                <p>
                                    By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy.
                                    If you do not agree to these terms, please do not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Intellectual Property Components</h2>
                                <p>
                                    The Service and its original content, features, and functionality are and will remain the exclusive property of Audentix and its licensors.
                                    The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. User Responsibilities</h2>
                                <p>
                                    You are responsible for your use of the Service and for any consequences thereof. You may use the Service only in compliance with these Terms and all applicable local, state, national, and international laws, rules and regulations.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>You must not use the service for any illegal or unauthorized purpose.</li>
                                    <li>You must not violate any laws in your jurisdiction.</li>
                                    <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. Termination</h2>
                                <p>
                                    We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                    Upon termination, your right to use the Service will immediately cease.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Limitation of Liability</h2>
                                <p>
                                    In no event shall Audentix, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                                    including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">6. Changes to Terms</h2>
                                <p>
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                                    What constitutes a material change will be determined at our sole discretion.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">7. Contact Us</h2>
                                <p>
                                    If you have any questions about these Terms, please contact us at:
                                    <br />
                                    Email: audentix@gmail.com
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </PageWrapper>
    );
}
