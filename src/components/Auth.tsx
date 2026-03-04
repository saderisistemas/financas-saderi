import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Card, Button } from './ui';

export function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [msg, setMsg] = useState<string | null>(null);

    useEffect(() => {
        // Check if user came from a password reset email link
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                setIsForgotPassword(true);
                setMsg("Digite a nova senha abaixo e clique em Redefinir.");
            }
        });
    }, []);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMsg(null);

        if (isForgotPassword) {
            // Either requesting a reset LINK or actually updating the password if already inside the flow
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                // User clicked the link and is logged in to change password
                const { error } = await supabase.auth.updateUser({ password });
                if (error) setError(error.message);
                else {
                    setMsg("Senha alterada com sucesso! Você já pode usar o app.");
                    setIsForgotPassword(false);
                }
            } else {
                // User is requesting the email link
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin,
                });
                if (error) setError(error.message);
                else setMsg("Link de recuperação enviado! Verifique seu e-mail.");
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    setError('Senha incorreta ou e-mail não cadastrado.');
                } else {
                    setError(error.message);
                }
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
            <Card glass className="w-full max-w-sm p-6 border-purple-500/30 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex flex-col items-center text-center mb-8">
                        <img src="/logo.png" alt="Saderi Sistemas" className="h-20 mb-4 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
                        <h1 className="text-xl font-bold text-white mb-1"><span className="p-1 px-2 rounded bg-red-600/20 text-red-500 text-lg uppercase tracking-widest">Resgate Financeiro</span></h1>
                        <p className="text-sm text-slate-400 mt-2">Faça login para continuar o plano de fuga.</p>
                    </div>
                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
                            {error}
                        </div>
                    )}

                    {msg && (
                        <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium text-center">
                            {msg}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[var(--color-surface)] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="casal@email.com"
                                required
                            />
                        </div>

                        {!isForgotPassword || (isForgotPassword && msg === "Digite a nova senha abaixo e clique em Redefinir.") ? (
                            <div className="space-y-1">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Senha</label>
                                    {!isForgotPassword && (
                                        <button type="button" onClick={() => { setIsForgotPassword(true); setError(null); setMsg(null) }} className="text-[10px] text-purple-400 hover:text-purple-300">
                                            Esqueceu?
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[var(--color-surface)] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        ) : null}

                        <Button type="submit" disabled={loading} className="w-full py-3.5 mt-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                            {loading ? 'Carregando...' : (isForgotPassword && msg !== "Digite a nova senha abaixo e clique em Redefinir." ? 'Enviar Link de Resgate' : isForgotPassword ? 'Salvar Nova Senha' : 'Entrar no Esquadrão')}
                        </Button>
                    </form>

                    <div className="mt-6 text-center space-y-3">
                        {isForgotPassword && (
                            <button type="button" onClick={() => { setIsForgotPassword(false); setMsg(null); setError(null) }} className="text-xs text-slate-400 hover:text-white transition-colors block w-full">Voltar para o Login</button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}
