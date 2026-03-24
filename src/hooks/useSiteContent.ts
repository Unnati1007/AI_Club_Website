import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://127.0.0.1:5001/api/site-content';

export interface SiteContent {
    _id: string;
    key: string;
    value: string;
    category: string;
}

export function useSiteContent() {
    const [content, setContent] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContent = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch site content');
            const data: SiteContent[] = await res.json();
            
            // Convert array to key-value record for easy access
            const contentMap: Record<string, string> = {};
            data.forEach(item => {
                contentMap[item.key] = item.value;
            });
            
            setContent(contentMap);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    return { content, isLoading, error, refresh: fetchContent };
}
