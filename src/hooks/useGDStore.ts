import { useState, useEffect, useCallback } from 'react';

export interface GDItem {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
}

const STORAGE_KEY = 'ai-club-gds';

const DEFAULT_GDS: GDItem[] = [
    {
        id: '1',
        title: 'AI Ethics & Bias',
        description: 'Explored the ethical implications of AI systems and how bias can creep into machine learning models. Discussed real-world examples and mitigation strategies.',
        image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop',
        date: '2025-10-15',
    },
    {
        id: '2',
        title: 'Future of LLMs',
        description: 'Deep dive into Large Language Models, their architecture evolution, and what the future holds for generative AI in production systems.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
        date: '2025-10-22',
    },
    {
        id: '3',
        title: 'Computer Vision Workshop',
        description: 'Hands-on session covering image classification, object detection, and the latest advances in vision transformers.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
        date: '2025-11-01',
    },
    {
        id: '4',
        title: 'Reinforcement Learning',
        description: 'From Q-learning to PPO — understanding how agents learn from interaction. We implemented a simple RL agent live during the session.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
        date: '2025-11-10',
    },
    {
        id: '5',
        title: 'Open Source Contributions',
        description: 'How to contribute to major AI/ML open-source projects. Walked through GitHub workflows, issue triage, and making your first PR.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
        date: '2025-11-18',
    },
];

function loadGDs(): GDItem[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch {
        // ignore parse errors
    }
    // First time — seed with defaults
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GDS));
    return DEFAULT_GDS;
}

function saveGDs(gds: GDItem[]): string | null {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gds));
        return null;
    } catch {
        return 'Storage quota exceeded. Try using image URLs instead of uploading files, or delete some GDs.';
    }
}

export function useGDStore() {
    const [gds, setGDs] = useState<GDItem[]>(loadGDs);
    const [storageError, setStorageError] = useState<string | null>(null);

    // Sync to localStorage whenever gds changes
    useEffect(() => {
        const err = saveGDs(gds);
        setStorageError(err);
    }, [gds]);

    const addGD = useCallback((gd: Omit<GDItem, 'id'>) => {
        setGDs(prev => [...prev, { ...gd, id: Date.now().toString() }]);
    }, []);

    const updateGD = useCallback((id: string, updates: Partial<Omit<GDItem, 'id'>>) => {
        setGDs(prev => prev.map(gd => gd.id === id ? { ...gd, ...updates } : gd));
    }, []);

    const deleteGD = useCallback((id: string) => {
        setGDs(prev => prev.filter(gd => gd.id !== id));
    }, []);

    return { gds, addGD, updateGD, deleteGD, storageError };
}
