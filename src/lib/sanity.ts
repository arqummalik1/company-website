import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Replace 'your-project-id' with your actual Sanity project ID after setup
const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';

// Only create client if project ID is configured
export const client = SANITY_PROJECT_ID
    ? createClient({
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        useCdn: true,
        apiVersion: '2023-05-03',
    })
    : null;

const builder = SANITY_PROJECT_ID
    ? imageUrlBuilder(client!)
    : null;

export function urlFor(source: any) {
    if (!builder) return { width: () => ({ height: () => ({ url: () => '' }), url: () => '' }), url: () => '' };
    return builder.image(source);
}

export const isSanityConfigured = () => !!SANITY_PROJECT_ID;

// Type definitions for our blog schema
export interface BlogPost {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    mainImage: {
        asset: {
            _ref: string;
        };
        alt?: string;
    } | null;
    publishedAt: string;
    body: any; // Portable Text content
    author: {
        name: string;
        image: any;
    };
    categories: {
        title: string;
    }[];
    excerpt?: string;
}
