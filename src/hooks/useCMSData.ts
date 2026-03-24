import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://127.0.0.1:5001/api';

export function useCMSData<T>(endpoint: string) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/${endpoint}`);
            if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
            const result = await res.json();
            setData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refresh: fetchData };
}
