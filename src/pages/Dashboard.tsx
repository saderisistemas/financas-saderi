import { Card, Badge, Button } from '../components/ui';
import { Sparkles, TrendingDown, Target, Wallet, AlertCircle } from 'lucide-react';
import { InfoTooltip } from '../components/InfoTooltip';
import { AvatarUpload } from '../components/AvatarUpload';
import { useTransactions } from '../hooks/useTransactions';

export function Dashboard() {
    const { transactions, loading } = useTransactions();
    return (
        <div className="flex flex-col space-y-6">

            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-white tracking-tight">Saderi Finanças</h1>
                    <p className="text-slate-400 text-sm font-medium mt-0.5">Visão de Ouro Mensal</p>
                </div>
                <AvatarUpload />
            </header>

            {/* Main KPI Card */}
            <Card glass className="relative overflow-hidden group border-red-500/30 bg-gradient-to-br from-[#1a1118] to-[#2d1216]">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Wallet size={80} className="text-red-500" />
                </div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-red-400">Saldo de Sobrevivência (Livre)</span>
                            <InfoTooltip
                                title="O que é o Saldo de Sobrevivência?"
                                content={
                                    <div className="space-y-2">
                                        <p>Em vez de focar no quanto você ganha, o aplicativo foca <b>apenas no que sobra</b> depois de pagar as dívidas prioritárias e gastos vitais do mês.</p>
                                        <p>Esse é o valor <b>real</b> que você tem hoje na conta (sempre em PIX ou Débito) para terminar o mês.</p>
                                        <p><b>Regra de Ouro:</b> Bateu zero? Não tem como gastar. O crédito não existe.</p>
                                    </div>
                                }
                            />
                        </div>
                        <Badge variant="danger" className="animate-pulse bg-red-900 border border-red-500 text-red-200">No Vermelho</Badge>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-white mb-1">R$ 145<span className="text-xl text-slate-400">,00</span></h2>
                    <p className="text-xs text-slate-400">Só no Pix/Débito. Restam 12 dias para virar o mês.</p>
                </div>
            </Card>

            {/* AI Coach Suggestion - The UAU factor */}
            <div className="bg-gradient-to-r from-[var(--color-surface-light)] to-[#2d1b4e] rounded-2xl p-[1px] shadow-lg animate-slide-up">
                <div className="bg-[var(--color-surface)] rounded-2xl p-4 flex gap-4 h-full items-start">
                    <div className="bg-[#2d1b4e]/50 p-2 rounded-xl text-purple-400 mt-1">
                        <Sparkles size={20} className="animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-purple-300 mb-1">Comandante IA</h3>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">Tropa, a situação é tensa mas tem saída! Vi que gastamos <b>R$ 55</b> com streaming. Cancelar essa Netflix paga 10% da fatura atrasada com o Banco. Vamos cortar?</p>
                        <div className="flex gap-2">
                            <Button variant="secondary" className="py-2 px-3 text-[11px] h-auto bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/40">Cortar e Pagar Dívida</Button>
                            <Button variant="ghost" className="py-2 px-3 text-[11px] h-auto">Manter Assinatura</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-2 gap-3">
                <Card className="flex flex-col p-4 bg-[var(--color-surface-light)]/30 border-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingDown size={14} className="text-emerald-400" />
                        <span className="text-xs text-slate-400 font-medium">Economia Total</span>
                    </div>
                    <span className="text-lg font-bold text-white">R$ 550,00</span>
                    <span className="text-[10px] text-emerald-400 font-medium mt-1">Meta: Atingida</span>
                </Card>

                <Card className="flex flex-col p-4 bg-[var(--color-surface-light)]/30 border-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Target size={14} className="text-[var(--color-primary)]" />
                        <span className="text-xs text-slate-400 font-medium">Meta 90 Dias</span>
                    </div>
                    <span className="text-lg font-bold text-white">35%</span>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                        <div className="bg-[var(--color-primary)] h-1.5 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                </Card>
            </div>

            {/* Recent Activity stub */}
            <div className="pt-2">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-slate-200">Últimos Lançamentos</h3>
                    <span className="text-xs text-[var(--color-primary)] font-medium">Ver todos</span>
                </div>

                <div className="space-y-3">
                    {loading ? (
                        <div className="text-center py-4 text-slate-500 text-sm">Carregando lançamentos...</div>
                    ) : transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-700/50 rounded-2xl">
                            <AlertCircle size={24} className="text-slate-500 mb-2" />
                            <p className="text-sm text-slate-400">Nenhum gasto lançado ainda.</p>
                            <p className="text-xs text-slate-500">Mantenha a guarda alta!</p>
                        </div>
                    ) : (
                        transactions.slice(0, 5).map(tx => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface)] border border-slate-700/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">
                                        {tx.category === 'Lazer' ? '🍔' : tx.category === 'Dívida' ? '🔥' : '🛒'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-200">{tx.description}</p>
                                        <p className="text-[10px] text-slate-500">{new Date(tx.date).toLocaleDateString()} • {tx.category}</p>
                                    </div>
                                </div>
                                <span className={`text-sm font-bold ${tx.type === 'expense' ? 'text-slate-300' : 'text-emerald-400'}`}>
                                    {tx.type === 'expense' ? '-' : '+'} R$ {Number(tx.amount).toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
