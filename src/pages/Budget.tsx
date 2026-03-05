import { Card, Button, Input } from '../components/ui';
import { Settings2, PiggyBank, BriefcaseMedical, Coffee, CreditCard } from 'lucide-react';
import { InfoTooltip } from '../components/InfoTooltip';
import { Modal } from '../components/Modal';
import { useState } from 'react';

export function Budget() {
    const [isBudgetOpen, setIsBudgetOpen] = useState(false);

    const handleSaveBudget = (e: React.FormEvent) => {
        e.preventDefault();
        setIsBudgetOpen(false);
    };

    return (
        <div className="flex flex-col animate-fade-in pb-10">

            <header className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Proteção</h1>
                        <p className="text-xs font-medium text-slate-400">Suas trincheiras financeiras</p>
                    </div>
                    <InfoTooltip
                        title="Divisão do Exército (Orçamento)"
                        content={
                            <div className="space-y-2">
                                <p>No <b>Modo Sobrevivência</b>, seu dinheiro é seu exército. Ele precisa ser alocado nas trincheiras certas todo mês para que você não sangre (gaste mais) e consiga derrotar o inimigo (Dívidas).</p>
                                <p><b>50% Essencial</b>: Aluguel, Comida (Mercado base), Luz, Água.</p>
                                <p><b>30% Dívidas</b>: Foco total em pagar atrasados (Snowball).</p>
                                <p><b>20% Lazer / Extra</b>: O mínimo possível para manter a sanidade, mas se puder ir para as dívidas, melhor.</p>
                            </div>
                        }
                    />
                </div>
                <Button variant="ghost" className="p-2" onClick={() => setIsBudgetOpen(true)}>
                    <Settings2 size={24} className="text-slate-400" />
                </Button>
            </header>

            <Modal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} title="Configurar Orçamento">
                <form onSubmit={handleSaveBudget} className="space-y-4">
                    <Input label="Renda do Mês (R$)" type="number" step="0.01" placeholder="Sua renda" required />
                    <Input label="Teto Essencial (R$)" type="number" step="0.01" placeholder="Gastos fixos" required />

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsBudgetOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="flex-1">
                            Salvar Orçamento
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Renda Setup */}
            <Card glass className="mb-8 flex justify-between items-center bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-surface)] border-[var(--color-primary)]/30">
                <div>
                    <p className="text-xs text-[var(--color-primary)] font-bold uppercase tracking-wider mb-1">Renda do Mês</p>
                    <h2 className="text-3xl font-extrabold text-white">R$ 15.000</h2>
                </div>
                <Button variant="secondary" className="px-3 py-1.5 text-xs h-auto" onClick={() => setIsBudgetOpen(true)}>Alterar</Button>
            </Card>

            <div className="space-y-5">

                {/* Categoria: Pagar-se Primeiro */}
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <div className="bg-emerald-500/20 p-1.5 rounded-lg text-emerald-400"><PiggyBank size={18} /></div>
                            <h3 className="font-bold text-slate-200">Pagar-se (10%)</h3>
                        </div>
                        <span className="text-sm font-bold text-emerald-400">R$ 1.500 / 1.500</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                        <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-[10px] text-right text-slate-500">Separado e protegido</p>
                </div>

                {/* Categoria: Essencial */}
                <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-500/20 p-1.5 rounded-lg text-blue-400"><BriefcaseMedical size={18} /></div>
                            <h3 className="font-bold text-slate-200">Essencial (50%)</h3>
                        </div>
                        <span className="text-sm font-bold text-blue-400">R$ 4.200 / 7.500</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full relative" style={{ width: '56%' }}></div>
                    </div>
                    <p className="text-[10px] text-right text-slate-500">Restam R$ 3.300</p>
                </div>

                {/* Categoria: Estilo de Vida */}
                <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <div className="bg-purple-500/20 p-1.5 rounded-lg text-purple-400"><Coffee size={18} /></div>
                            <h3 className="font-bold text-slate-200">Estilo de Vida (30%)</h3>
                        </div>
                        <span className="text-sm font-bold text-purple-400">R$ 1.200 / 4.500</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '26%' }}></div>
                    </div>
                    <p className="text-[10px] text-right text-slate-500">Restam R$ 3.300</p>
                </div>

                {/* Categoria: Dívidas */}
                <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <div className="bg-red-500/20 p-1.5 rounded-lg text-red-400"><CreditCard size={18} /></div>
                            <h3 className="font-bold text-slate-200">Dívidas (10%)</h3>
                        </div>
                        <span className="text-sm font-bold text-red-400">R$ 1.500 / 1.500</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                        <div className="bg-red-500 h-3 rounded-full relative" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-[10px] text-right text-slate-500">Faturas Pagas</p>
                </div>

            </div>
        </div>
    );
}
