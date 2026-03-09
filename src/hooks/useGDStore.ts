import { useState, useEffect, useCallback } from 'react';

export interface GDItem {
    _id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    link?: string;
}

const API_URL = 'http://127.0.0.1:5000/api/gds';

export function useGDStore() {
    const [gds, setGDs] = useState<GDItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch from backend API
    const fetchGDs = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        console.log('Fetching GDs from:', API_URL);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
            const data = await res.json();
            console.log('Fetched GDs:', data);
            setGDs(data);
        } catch (err: any) {
            console.error('Fetch corner error:', err);
            setError(err.message || 'An error occurred fetching GDs');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGDs();
    }, [fetchGDs]);

    const addGD = useCallback(async (gd: Omit<GDItem, '_id'>) => {
        setError(null);
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gd)
            });
            if (!res.ok) throw new Error('Failed to add GD');
            const newGD = await res.json();
            setGDs(prev => [newGD, ...prev]);
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    const updateGD = useCallback(async (id: string, updates: Partial<Omit<GDItem, '_id'>>) => {
        // Implementation for PUT
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed to update GD');
            const updatedGD = await res.json();
            setGDs(prev => prev.map(gd => gd._id === id ? updatedGD : gd));
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    const deleteGD = useCallback(async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete GD');
            setGDs(prev => prev.filter(gd => gd._id !== id));
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    return { gds, isLoading, error, addGD, updateGD, deleteGD, refresh: fetchGDs };
}
