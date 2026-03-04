import { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { Calendar, Sparkles, Target } from 'lucide-react';
import { InfoTooltip } from '../components/InfoTooltip';
import { GoalWizard } from '../components/GoalWizard';
import { useGoals } from '../hooks/useGoals';
import type { Goal } from '../hooks/useGoals';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export function Goals() {
    const { goals, loading } = useGoals();
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    // Group goals
    const shortTermGoals = goals.filter(g => g.deadline_weeks <= 24);
    const longTermGoals = goals.filter(g => g.deadline_weeks > 24);

    const GoalCard = ({ goal }: { goal: Goal }) => {
        // Mock current progress logic (since we don't have deposits yet)
        const currentSaved = 0;
        const progress = Math.min((currentSaved / goal.target_amount) * 100, 100);

        return (
            <Card glass className="p-0 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-[#2A3F54] to-[var(--color-surface)] p-6">
                    <div className="flex justify-between items-start mb-4">
                        <Badge variant="success" className="bg-emerald-500/30">Em Andamento</Badge>
                        <div className="flex gap-1 items-center text-slate-300">
                            <Calendar size={14} />
                            <span className="text-[10px] font-medium uppercase">
                                {goal.deadline_weeks > 24 ? `${goal.deadline_weeks} Semanas (Longo Prazo)` : `${goal.deadline_weeks} Semanas`}
                            </span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white mb-1">{goal.title}</h2>
                    <p className="text-sm text-slate-400 mb-6">{formatCurrency(goal.target_amount)} necessários</p>

                    <div className="flex items-end justify-between mb-2">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Acumulado</span>
                        <span className="text-2xl font-bold text-[var(--color-primary)]">{formatCurrency(currentSaved)}</span>
                    </div>
                    <div className="w-full bg-slate-900/50 rounded-full h-2">
                        <div className="bg-[var(--color-primary)] h-2 rounded-full shadow-[0_0_10px_var(--color-primary-glow)]" style={{ width: `${progress}%` }}></div>
                    </div>

                    {goal.motivation && (
                        <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 rounded-xl p-4">
                            <div className="flex gap-3">
                                <div className="mt-1"><Sparkles size={20} className="text-emerald-400 animate-pulse" /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-emerald-400 mb-1">Por que lutar:</h3>
                                    <p className="text-xs text-slate-300 leading-relaxed italic">"{goal.motivation}"</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    return (
        <div className="flex flex-col animate-fade-in pb-10">

            <header className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Metas de Resgate</h1>
                        <p className="text-xs font-medium text-slate-400">Curto e Longo Prazo</p>
                    </div>
                    <InfoTooltip
                        title="Metas de Resgate"
                        content={
                            <div className="space-y-2">
                                <p>Sair das dívidas é uma maratona, não um sprint. Se você focar só no "buraco total", vai desistir.</p>
                                <p><b>Metas de Curto Prazo (Até 6 Meses):</b> Foco agressivo para estancar sangramentos.</p>
                                <p><b>Metas de Longo Prazo (Acima de 6 Meses):</b> Visão de futuro, como quitar a casa ou montar reserva de ouro.</p>
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

            {loading ? (
                <div className="text-center p-10 text-slate-400">Carregando metas...</div>
            ) : goals.length === 0 ? (
                <Card className="text-center py-12 px-6 border-dashed border-slate-700 bg-slate-900/50">
                    <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Nenhuma Meta Definida</h3>
                    <p className="text-sm text-slate-400 mb-6">Criar metas visíveis é o primeiro passo para o sucesso financeiro.</p>
                    <Button onClick={() => setIsWizardOpen(true)}>Criar Primeira Meta</Button>
                </Card>
            ) : (
                <>
                    {shortTermGoals.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Ações de Curto/Médio Prazo</h3>
                            {shortTermGoals.map(g => <GoalCard key={g.id} goal={g} />)}
                        </div>
                    )}

                    {longTermGoals.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest mb-4">Visão de Longo Prazo (1 a 2 Anos)</h3>
                            {longTermGoals.map(g => <GoalCard key={g.id} goal={g} />)}
                        </div>
                    )}
                </>
            )}

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
