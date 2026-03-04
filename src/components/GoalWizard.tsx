import { useState } from 'react';
import { Card, Button } from './ui';
import { Target, Plane, Home, Car, Heart, DollarSign, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ICONS = [
    { id: 'plane', icon: Plane, label: 'Viagem', color: 'blue' },
    { id: 'home', icon: Home, label: 'Casa', color: 'emerald' },
    { id: 'car', icon: Car, label: 'Veículo', color: 'purple' },
    { id: 'heart', icon: Heart, label: 'Saúde', color: 'red' },
    { id: 'money', icon: DollarSign, label: 'Reserva', color: 'amber' },
    { id: 'target', icon: Target, label: 'Outro', color: 'slate' },
];

export function GoalWizard({ onClose, onSave }: { onClose: () => void, onSave: () => void }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        target_amount: '',
        deadline_weeks: '12',
        icon: 'target',
        motivation: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        const { error } = await supabase.from('goals').insert({
            user_id: session.user.id,
            title: formData.title,
            target_amount: parseFloat(formData.target_amount.replace(/\./g, '').replace(',', '.')),
            deadline_weeks: parseInt(formData.deadline_weeks),
            icon: formData.icon,
            motivation: formData.motivation,
            status: 'active'
        });

        setLoading(false);
        if (!error) onSave();
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#1a1118]/95 backdrop-blur-md flex flex-col p-4 pt-12 animate-fade-in overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Nova Meta</h2>
                    <p className="text-slate-400 text-sm">Passo {step} de 3</p>
                </div>
                <button onClick={onClose} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1">
                {step === 1 && (
                    <div className="space-y-6 animate-slide-up">
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">O que você quer conquistar?</label>
                            <input
                                type="text"
                                placeholder="Ex: Viagem para o Chile"
                                className="w-full bg-[var(--color-surface)] border-2 border-slate-700 rounded-xl p-4 text-white font-bold text-xl focus:border-[var(--color-primary)] outline-none"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Escolha um Ícone</label>
                            <div className="grid grid-cols-3 gap-3">
                                {ICONS.map(i => {
                                    const IconNode = i.icon;
                                    const isSelected = formData.icon === i.id;
                                    return (
                                        <button
                                            key={i.id}
                                            onClick={() => setFormData({ ...formData, icon: i.id })}
                                            className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${isSelected ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-[var(--color-surface)] border-transparent text-slate-400'}`}
                                        >
                                            <IconNode size={24} />
                                            <span className="text-xs font-semibold">{i.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <Button className="w-full mt-8 py-4" onClick={() => setStep(2)} disabled={!formData.title}>
                            Continuar
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-slide-up">
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">De quanto você precisa?</label>
                            <input
                                type="text"
                                placeholder="R$ 0,00"
                                className="w-full bg-[var(--color-surface)] border-2 border-slate-700 rounded-xl p-4 text-white font-bold text-3xl focus:border-[var(--color-primary)] outline-none"
                                value={formData.target_amount}
                                onChange={e => setFormData({ ...formData, target_amount: e.target.value })}
                            />
                            <p className="text-xs text-slate-500 mt-2">Dica: Se for muito alto, quebre em etapas menores.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Prazo (em Semanas)</label>
                            <select
                                className="w-full bg-[var(--color-surface)] border-2 border-slate-700 rounded-xl p-4 text-white font-bold text-lg focus:border-[var(--color-primary)] outline-none appearance-none"
                                value={formData.deadline_weeks}
                                onChange={e => setFormData({ ...formData, deadline_weeks: e.target.value })}
                            >
                                <option value="4">4 Semanas (Ciclo Curto)</option>
                                <option value="12">12 Semanas (90 Dias - Recomendado)</option>
                                <option value="24">24 Semanas</option>
                            </select>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <Button variant="ghost" className="py-4" onClick={() => setStep(1)}>Voltar</Button>
                            <Button className="flex-1 py-4" onClick={() => setStep(3)} disabled={!formData.target_amount}>Continuar</Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-slide-up">
                        <div>
                            <label className="block text-sm font-bold text-emerald-400 mb-2 uppercase tracking-widest">Sua Motivação Pessoal</label>
                            <p className="text-sm text-slate-300 mb-4">A IA vai usar isso para te dar broncas e conselhos na hora que você quiser cometer um deslize financeiro.</p>
                            <textarea
                                placeholder="Ex: Eu quero levar minha família nessa viagem para provar que vencemos as dívidas e porque merecemos um tempo em paz."
                                className="w-full bg-[var(--color-surface)] border-2 border-emerald-500/30 rounded-xl p-4 text-white text-sm focus:border-emerald-500 outline-none h-32"
                                value={formData.motivation}
                                onChange={e => setFormData({ ...formData, motivation: e.target.value })}
                            />
                        </div>

                        <Card className="bg-[var(--color-surface)] border-dashed border-slate-600 p-4">
                            <p className="text-xs text-slate-400 mb-2 text-center">Resumo da Missão</p>
                            <h3 className="text-lg font-bold text-center text-white">{formData.title}</h3>
                            <p className="text-center font-bold text-[var(--color-primary)] mt-1">R$ {formData.target_amount} em {formData.deadline_weeks} semanas</p>
                        </Card>

                        <div className="flex gap-3 mt-8">
                            <Button variant="ghost" className="py-4" onClick={() => setStep(2)}>Voltar</Button>
                            <Button className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white" onClick={handleSave} disabled={loading}>
                                {loading ? 'Salvando...' : 'Lançar Missão'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
