export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system' | 'data';
    content: string;
}

export interface ChatInteractionState {
    isOpen: boolean;
    hasUnread: boolean;
}
