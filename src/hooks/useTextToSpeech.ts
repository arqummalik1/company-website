import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const loadVoices = () => {
                setVoices(window.speechSynthesis.getVoices());
            };

            loadVoices();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        } else {
            setIsSupported(false);
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (!isSupported || !text || isMuted) return;

        window.speechSynthesis.cancel();

        // Slight delay to ensure cancel finishes
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);

            // Attempt to find a natural sounding English voice
            const preferredVoice =
                voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha') || (v.lang.startsWith('en') && v.name.includes('Female'))) ||
                voices.find(v => v.lang.startsWith('en')) ||
                voices[0];

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (e) => {
                console.error('TTS Error:', e);
                setIsSpeaking(false);
            };

            window.speechSynthesis.speak(utterance);
        }, 50);
    }, [isSupported, voices, isMuted]);

    const stop = useCallback(() => {
        if (isSupported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [isSupported]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            const newMuted = !prev;
            if (newMuted && isSupported) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            }
            return newMuted;
        });
    }, [isSupported]);

    return {
        speak,
        stop,
        isSpeaking,
        isSupported,
        isMuted,
        toggleMute
    };
};
