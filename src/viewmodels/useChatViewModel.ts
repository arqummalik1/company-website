import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export function useChatViewModel() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState('');

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        isSupported: isSpeechSupported,
    } = useSpeechRecognition();

    const {
        speak,
        stop: stopSpeaking,
        isSpeaking,
        isMuted: isVoiceMuted,
        toggleMute: toggleVoiceMute,
        isSupported: isTTSSupported,
    } = useTextToSpeech();

    const {
        messages,
        error,
        stop: stopGenerating,
        sendMessage,
        status,
    } = useChat({
        // @ts-ignore - API exists in Vercel AI SDK, typing mismatch
        api: '/api/chat',
        onError: (err) => {
            console.error('Chat error:', err);
        },
        onFinish: ({ message }) => {
            if (!isOpen && message.role === 'assistant') {
                setHasUnread(true);
            }
            if (message.role === 'assistant' && !isVoiceMuted && isOpen) {
                if (typeof (message as any).content === 'string' && (message as any).content) {
                    speak((message as any).content);
                } else if ((message as any).text) {
                    speak((message as any).text);
                } else if ((message as any).parts) {
                    const textParts = (message as any).parts.filter((p: any) => p.type === 'text');
                    if (textParts.length > 0) {
                        speak(textParts.map((p: any) => p.text).join(' '));
                    }
                }
            }
        }
    });

    const isLoading = status === 'submitted' || status === 'streaming';

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput(e.target.value);
    }, []);

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading) return;

        // Stop any current speaking when user sends a new message manually
        stopSpeaking();
        if (isListening) stopListening();

        sendMessage({ role: 'user', content: input.trim() } as any);
        setInput('');
    };

    // Auto submit transcript when listening stops and we have a transcript
    useEffect(() => {
        if (!isListening && transcript.trim().length > 0) {
            sendMessage({
                role: 'user',
                content: transcript.trim(),
            } as any);
            resetTranscript();
        }
    }, [isListening, transcript, sendMessage, resetTranscript]);

    const toggleChat = () => {
        const nextState = !isOpen;
        setIsOpen(nextState);
        if (nextState) {
            setHasUnread(false);
        } else {
            stopSpeaking();
            if (isListening) stopListening();
        }
    };

    const clearUnread = () => setHasUnread(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isListening, transcript]);

    const startConsultation = () => {
        sendMessage({
            role: 'user',
            content: 'I would like to start a project consultation.',
        } as any);
        setIsOpen(true);
    };

    return {
        isOpen,
        hasUnread,
        messages,
        input,
        setInput,
        isLoading,
        error,
        messagesEndRef,
        handleInputChange,
        handleSubmit,
        toggleChat,
        clearUnread,
        startConsultation,
        stopGenerating,
        // Voice specific
        isListening,
        transcript,
        startListening,
        stopListening,
        isSpeechSupported,
        isSpeaking,
        isVoiceMuted,
        toggleVoiceMute,
        isTTSSupported,
    };
}
