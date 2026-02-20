import { useState, useCallback, useRef, useEffect } from 'react';

// Extend the Window interface to include webkitSpeechRecognition for Safari support
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSupported, setIsSupported] = useState(true);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event: any) => {
                    let currentTranscript = '';
                    for (let i = 0; i < event.results.length; ++i) {
                        currentTranscript += event.results[i][0].transcript;
                    }
                    setTranscript(currentTranscript);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Speech Recognition Error:", event.error);
                    if (event.error !== 'no-speech') {
                        setError(event.error);
                        setIsListening(false);
                    }
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            } else {
                setIsSupported(false);
            }
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            setTranscript('');
            setError(null);
            setIsListening(true);
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Recognition start error:", e);
            }
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    return {
        isListening,
        transcript,
        error,
        isSupported,
        startListening,
        stopListening,
        resetTranscript,
    };
};
