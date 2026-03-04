import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Goal {
    id: string;
    user_id: string;
    title: string;
    target_amount: number;
    deadline_weeks: number;
    icon: string;
    motivation: string;
    status: 'active' | 'completed' | 'abandoned';
    created_at: string;
}

export function useGoals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchGoals = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setGoals(data as Goal[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchGoals();

        const subscription = supabase
            .channel('goals_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'goals' },
                () => {
                    fetchGoals();
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { goals, loading, fetchGoals };
}
