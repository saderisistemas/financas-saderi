import { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { Calendar, CheckCircle2, Sparkles, Target } from 'lucide-react';
import { InfoTooltip } from '../components/InfoTooltip';
import { GoalWizard } from '../components/GoalWizard';

export function Goals() {
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    return (
        <div className="flex flex-col animate-fade-in pb-10">

            <header className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Metas de Resgate</h1>
                        <p className="text-xs font-medium text-slate-400">Pequenas vitórias diárias</p>
                    </div>
                    <InfoTooltip
                        title="Metas de Resgate"
                        content={
                            <div className="space-y-2">
                                <p>Sair das dívidas é uma maratona, não um sprint. Se você focar só no "buraco total", vai desistir.</p>
                                <p><b>Por isso, quebramos tudo em ciclos de 90 Dias ou menos.</b></p>
                                <p>A cada semana que você cumpre sua micro-meta de depósito, a IA destrava uma nova conquista psicológica.</p>
                            </div>
                        }
                    />
                </div>
                <Button
                    variant="secondary"
                    className="p-2 h-auto text-xs flex gap-1 items-center"
                    onClick={() => setIsWizardOpen(true)}
                >
                    <Target size={14} /> Nova Meta
                </Button>
            </header>

            {/* Main Goal Card */}
            <Card glass className="p-0 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-[#2A3F54] to-[var(--color-surface)] p-6">
                    <div className="flex justify-between items-start mb-4">
                        <Badge variant="success" className="bg-emerald-500/30">Em Andamento</Badge>
                        <div className="flex gap-1 items-center text-slate-300">
                            <Calendar size={14} />
                            <span className="text-[10px] font-medium uppercase">Semana 4 de 12</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white mb-1">Viagem para o Chile</h2>
                    <p className="text-sm text-slate-400 mb-6">R$ 5.000 necessários</p>

                    <div className="flex items-end justify-between mb-2">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Acumulado</span>
                        <span className="text-2xl font-bold text-[var(--color-primary)]">R$ 1.500<span className="text-lg text-slate-500">,00</span></span>
                    </div>
                    <div className="w-full bg-slate-900/50 rounded-full h-2">
                        <div className="bg-[var(--color-primary)] h-2 rounded-full shadow-[0_0_10px_var(--color-primary-glow)]" style={{ width: '30%' }}></div>
                    </div>
                </div>
            </Card>

            {/* AI Personalization Motivation */}
            <div className="mb-6 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-4">
                <div className="flex gap-3">
                    <div className="mt-1"><Sparkles size={20} className="text-emerald-400 animate-pulse" /></div>
                    <div>
                        <h3 className="text-sm font-bold text-emerald-400 mb-1">Motivação do Comandante</h3>
                        <p className="text-xs text-slate-300 leading-relaxed italic">"Saderi, você já garantiu 30% da viagem. Toda vez que você diz não para um gasto bobo, você está dizendo sim para o Chile. Faltam só R$ 3.500. Vamos pra cima!"</p>
                        <button className="text-[10px] text-emerald-500 mt-2 font-bold uppercase hover:underline">Pedir Conselho Tático</button>
                    </div>
                </div>
            </div>

            {/* Checklist Semanal */}
            <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Progresso Semanal (Depositos)</h3>
                <div className="space-y-3">
                    {[
                        { w: 1, val: 'R$ 416,00', done: true, extra: '' },
                        { w: 2, val: 'R$ 500,00', done: true, extra: '+ R$84' },
                        { w: 3, val: 'R$ 584,00', done: true, extra: 'Economias Uber' },
                        { w: 4, val: 'R$ 416,00', done: false, extra: 'Meta desta semana' },
                    ].map((wk) => (
                        <div key={wk.w} className={`flex items-center justify-between p-4 rounded-xl border ${wk.done ? 'bg-[var(--color-surface-light)]/10 border-slate-700/30' : 'bg-[var(--color-surface)] border-[var(--color-primary)]/50'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${wk.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                                    {wk.done ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{wk.w}</span>}
                                </div>
                                <div>
                                    <p className={`font-bold ${wk.done ? 'text-slate-300' : 'text-white'}`}>Semana {wk.w}</p>
                                    <p className="text-[10px] text-slate-500">{wk.extra}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${wk.done ? 'text-emerald-400' : 'text-slate-300'}`}>{wk.val}</p>
                                {!wk.done && <Button className="mt-2 py-1 px-3 text-[10px] h-auto">Finalizar</Button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isWizardOpen && (
                <GoalWizard
                    onClose={() => setIsWizardOpen(false)}
                    onSave={() => {
                        setIsWizardOpen(false);
                        // Trigger a refetch here if hook was implemented
                    }}
                />
            )}
        </div>
    );
}
