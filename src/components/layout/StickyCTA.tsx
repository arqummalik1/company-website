import { useState } from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { PopupModal } from 'react-calendly';

export function StickyCTA() {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <>
            {/* Desktop CTA */}
            <div className="hidden lg:block fixed bottom-8 right-8 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="glass px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-all duration-300 hover:shadow-lg group"
                >
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Book Consultation</span>
                </button>
            </div>

            {/* Mobile FAB */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 animate-pulse"
                    aria-label="Contact us"
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                </button>
            </div>

            <PopupModal
                url="https://calendly.com/arqummalik1/new-meeting"
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById("root")!}
            />
        </>
    );
}
