import { useState, useEffect, useCallback } from 'react';

export interface EventItem {
    _id: string;
    title: string;
    type: string;
    date: string;
    time?: string;
    location?: string;
    speaker?: string;
    description: string;
    registrationLink?: string;
    image?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || '';
const API_URL = `${BASE_URL}/api/events`;

export function useEventStore() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
            const data = await res.json();
            setEvents(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred fetching events');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const addEvent = useCallback(async (event: Omit<EventItem, '_id'>) => {
        setError(null);
        try {
            const token = sessionStorage.getItem("ai-club-admin-token");
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || ''}`
                },
                body: JSON.stringify(event)
            });
            if (!res.ok) throw new Error('Failed to add event');
            const newEvent = await res.json();
            setEvents(prev => [newEvent, ...prev]);
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    const updateEvent = useCallback(async (id: string, updates: Partial<Omit<EventItem, '_id'>>) => {
        setError(null);
        try {
            const token = sessionStorage.getItem("ai-club-admin-token");
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || ''}`
                },
                body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed to update event');
            const updatedEvent = await res.json();
            setEvents(prev => prev.map(ev => ev._id === id ? updatedEvent : ev));
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    const deleteEvent = useCallback(async (id: string) => {
        setError(null);
        try {
            const token = sessionStorage.getItem("ai-club-admin-token");
            const res = await fetch(`${API_URL}/${id}`, { 
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token || ''}`
                }
            });
            if (!res.ok) throw new Error('Failed to delete event');
            setEvents(prev => prev.filter(ev => ev._id !== id));
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    return { events, isLoading, error, addEvent, updateEvent, deleteEvent, refresh: fetchEvents };
}
