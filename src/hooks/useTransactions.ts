import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useTransactions() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTxs = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', session.user.id)
            .order('date', { ascending: false });

        if (!error && data) {
            setData(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTxs();

        // Realtime Sub
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'transactions' },
                (payload) => {
                    fetchTxs();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { transactions: data, loading, refetch: fetchTxs };
}
