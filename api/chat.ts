import { streamText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export const config = {
    runtime: 'edge', // Use edge runtime for best performance on Vercel
};

const SYSTEM_PROMPT = `You are the official AI Assistant for Audentix (audentix.com), a premium custom software development company based in Jammu, India. Your primary goal is to welcome website visitors, answer their questions about our services, and help them start a project with us.

COMPANY KNOWLEDGE BASE:
- Tagline: We Build Digital Excellence.
- Services: Custom Websites, Mobile Apps (iOS/Android), Web Apps & SaaS platforms, AI Chatbots/Assistants, UI/UX Design.
- Experience: 50+ projects delivered, 100+ happy clients, 98% client satisfaction, 4+ years of industry expertise.
- Tech Stack: React, Next.js, Vue, Node.js, Python, Supabase, AWS, Docker, OpenAI, Gemini, LangChain, n8n, and 30+ more.
- Contact Info: Email: audentix@gmail.com | Phone: +91 7006082958 | Location: Jammu, India.
- Key Value Propositions: AI-First Development, Scalable Architecture, Lightning-Fast Performance (95+ Lighthouse), Enterprise Security, and Clean Code Standards.
- Portfolio Highlights: Analytics Dashboard Pro (SaaS), NLP Customer Support Chatbot, Luxury Fashion Marketplace (E-commerce), Payment Gateway API (Fintech).

YOUR BEHAVIOR:
1. Be professional, innovative, and highly helpful.
2. If a user asks about technologies, confirm that we use modern stacks (mention specific tools from our list if relevant).
3. If a user wants to start a project, get a quote, or schedule a consultation, offer to collect their details right in the chat.
4. To submit a lead, you MUST ask for their Name, Email, and a brief Message (Phone and Subject are optional). Once you have the required info, use the \`submit_contact_form\` tool to send it to our team. Do NOT ask for all details at once if the user is just browsing, be conversational.
5. Keep responses concise and formatted cleanly with markdown.`;

export default async function req(request: Request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { messages } = await request.json();

        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: SYSTEM_PROMPT,
            messages,
            tools: {
                submit_contact_form: tool({
                    description: "Submits the user's contact information and project inquiry to the Audentix sales team.",
                    parameters: z.object({
                        name: z.string().describe("The full name of the visitor."),
                        email: z.string().email().describe("The email address of the visitor."),
                        phone: z.string().optional().describe("The phone number of the visitor, including country code if provided."),
                        subject: z.string().optional().describe("A short subject line summarizing the inquiry."),
                        message: z.string().describe("The detailed message or project description from the visitor.")
                    }),
                    execute: async ({ name, email, phone, subject, message }: any) => {
                        console.log('Tool called: submit_contact_form', { name, email, phone, subject, message });

                        // Execute the exact EmailJS logic on the server via standard fetch REST API
                        const serviceId = process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
                        const ownerTemplateId = process.env.VITE_EMAILJS_TEMPLATE_OWNER || process.env.EMAILJS_TEMPLATE_OWNER;
                        const customerTemplateId = process.env.VITE_EMAILJS_TEMPLATE_CUSTOMER || process.env.EMAILJS_TEMPLATE_CUSTOMER;
                        const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;

                        if (!serviceId || !ownerTemplateId || !customerTemplateId || !publicKey) {
                            console.error("Missing EmailJS credentials on the server.");
                            return { success: false, error: "Email configuration missing." };
                        }

                        const sendEmail = async (templateId: string, params: Record<string, string>) => {
                            const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    service_id: serviceId,
                                    template_id: templateId,
                                    user_id: publicKey,
                                    template_params: params
                                })
                            });
                            if (!res.ok) {
                                const text = await res.text();
                                throw new Error(`EmailJS API Error: ${text}`);
                            }
                            return res;
                        };

                        const commonParams = {
                            from_name: name,
                            from_email: email,
                            email: email,
                            reply_to: email,
                            phone: phone || 'Not provided',
                            company: subject || 'Not provided',
                            service: subject || 'General Inquiry (Via AI Agent)',
                            message: message,
                            submission_time: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })
                        };

                        try {
                            // 1. Send email to owner
                            await sendEmail(ownerTemplateId, {
                                ...commonParams,
                                to_email: 'audentix@gmail.com',
                            });

                            // 2. Send thank you email to customer
                            await sendEmail(customerTemplateId, {
                                ...commonParams,
                                to_email: email,
                                reply_to: 'audentix@gmail.com',
                            });

                            return {
                                success: true,
                                message: "Form successfully submitted to the Audentix team!"
                            };
                        } catch (error: any) {
                            console.error("EmailJS Error:", error);
                            return {
                                success: false,
                                error: error.message || "Failed to submit form."
                            };
                        }
                    },
                }),
            },
        });

        return result.toDataStreamResponse?.() || result.toTextStreamResponse?.() || new Response(result.textStream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
