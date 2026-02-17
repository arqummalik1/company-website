export const PROMO_CONFIG = {
    STORAGE_KEY: 'audentix_promo_dismissed',
    DELAY_MS: 30000,
    TARGET_DATE: '2026-03-01T00:00:00',
    CONTACT_SECTION_ID: 'contact'
} as const;

export const PROMO_TEXT = {
    HEADLINE: "Dominate Your Market.",
    SUBTEXT: "Your website is your 24/7 sales engine. Build trust, automate leads, and scale your revenue.",
    CTA_CLAIM: "Start My Growth",
    CTA_DISMISS: "I'm okay with slow growth",
    PRICE_CURRENT: "₹4,999",
    PRICE_ORIGINAL: "₹15,999",
    OFFER_LABEL: "Business Setup",
    OFFER_SUB_LABEL: "Offer ends Feb 28",
    BENEFITS: [
        { label: "Global Reach", icon: "Globe" },
        { label: "Build Trust", icon: "ShieldCheck" },
        { label: "Fast Growth", icon: "Zap" },
    ]
} as const;
