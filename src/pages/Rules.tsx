import { Card, Badge, Button, Input, Select } from '../components/ui';
import { AlertTriangle, ShieldAlert, Plus } from 'lucide-react';
import { InfoTooltip } from '../components/InfoTooltip';
import { Modal } from '../components/Modal';
import { useState } from 'react';

export function Rules() {
    const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);

    const handleSaveRule = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddRuleOpen(false);
    };

    return (
        <div className="flex flex-col animate-fade-in pb-10">

            <header className="mb-6 flex justify-between items-center">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Cinto de Segurança</h1>
                        <p className="text-xs font-medium text-slate-400">Suas barreiras para sair do vermelho</p>
                    </div>
                    <InfoTooltip
                        title="Por que ter Regras?"
                        content={
                            <div className="space-y-2">
                                <p>O aplicativo não gasta dinheiro sozinho; quem passa o cartão (ou faz o PIX) é você.</p>
                                <p>O <b>Cinto de Segurança</b> existe para criar atritos comportamentais entre você e o gasto por impulso.</p>
                                <p>Toda vez que quiser "abrir uma exceção", venha ler as regras em voz alta.</p>
                            </div>
                        }
                    />
                </div>
                <Button
                    onClick={() => setIsAddRuleOpen(true)}
                    className="w-10 h-10 p-0 rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)]"
                >
                    <Plus size={20} />
                </Button>
            </header>

            <Modal isOpen={isAddRuleOpen} onClose={() => setIsAddRuleOpen(false)} title="Nova Regra">
                <form onSubmit={handleSaveRule} className="space-y-4">
                    <Input label="Name" placeholder="Nome da regra de barreira" required />
                    <Select label="Category" required>
                        <option value="">Selecione...</option>
                        <option value="envelope">Envelope</option>
                        <option value="conta">Conta Intocável</option>
                        <option value="gatilho">Gatilho de Prazo</option>
                    </Select>
                    <Input label="Threshold" type="number" step="0.01" placeholder="Limite Financeiro" />

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsAddRuleOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="flex-1">
                            Salvar Regra
                        </Button>
                    </div>
                </form>
            </Modal>

            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <AlertTriangle size={100} />
                </div>
                <div className="flex gap-3">
                    <div className="mt-1"><ShieldAlert size={20} className="text-red-400" /></div>
                    <div>
                        <h3 className="text-sm font-bold text-red-400 mb-1">A Regra do "Zero Crédito"</h3>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">"Nós operamos APENAS no trauma do saldo real. Ou tem o dinheiro no PIX agora, ou não se compra. Fim de papo."</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Envelopes & Contas</h2>

                <Card className="p-0 overflow-hidden border-slate-700/50">
                    <div className="p-4 flex items-center justify-between border-b border-slate-700/50">
                        <div>
                            <h3 className="font-bold text-slate-200">Reserva Intocável</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Nubank / Caixinha</p>
                        </div>
                        <Badge variant="success">Ativo</Badge>
                    </div>
                    <div className="bg-[var(--color-surface-light)]/20 p-4 flex justify-between items-center">
                        <span className="text-xs text-slate-400">Saldo Blindado</span>
                        <span className="font-bold text-white">R$ 5.400,00</span>
                    </div>
                </Card>

                <Card className="p-0 overflow-hidden border-slate-700/50">
                    <div className="p-4 flex items-center justify-between border-b border-slate-700/50">
                        <div>
                            <h3 className="font-bold text-slate-200">Viagem Chile</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Inter / Objetivos</p>
                        </div>
                        <Badge variant="success">Ativo</Badge>
                    </div>
                    <div className="bg-[var(--color-surface-light)]/20 p-4 flex justify-between items-center">
                        <span className="text-xs text-slate-400">Guardado até o momento</span>
                        <span className="font-bold text-[var(--color-primary)]">R$ 1.500,00</span>
                    </div>
                </Card>
            </div>

            <div className="mt-8 space-y-4">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Regras de Resgate</h2>

                <Card className="p-4 flex gap-4 border-slate-700/50">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">1</div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-200">Ataque à Maior Dor (Bola de Neve)</h4>
                        <p className="text-[11px] text-slate-400 mt-1">Qualquer dinheiro extra ou cortado (ex: cancelou a Netflix) vai IMEDIATAMENTE para matar a menor dívida primeiro e gerar fôlego.</p>
                    </div>
                </Card>

                <Card className="p-4 flex gap-4 border-slate-700/50">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">2</div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-200">A Espera das 48h</h4>
                        <p className="text-[11px] text-slate-400 mt-1">Viu promoção de algo não essencial? O dinheiro trava por 48h. A urgência passa e o dinheiro fica.</p>
                    </div>
                </Card>
            </div>

        </div>
    );
}
