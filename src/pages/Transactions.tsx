import { Card, Button, Badge } from '../components/ui';
import { Plus, Search, Filter } from 'lucide-react';

export function Transactions() {
    return (
        <div className="flex flex-col h-full animate-fade-in">

            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Gastos & Cortes</h1>
                    <p className="text-xs font-medium text-emerald-400">Objetivo: Cortar R$ 500 / mês</p>
                </div>
                <Button className="w-10 h-10 p-0 rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)]">
                    <Plus size={20} />
                </Button>
            </header>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder="Busque gastos (ex: Ifood, Netflix...)"
                    className="w-full bg-[var(--color-surface)] border border-slate-700/50 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[var(--color-primary)] transition-colors"
                />
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={18} />
            </div>

            {/* Filtros em Pílulas */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">Todos</button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-[var(--color-surface)] border border-slate-700 text-[10px] font-bold text-slate-300">Apenas Assinaturas</button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-[var(--color-surface)] border border-slate-700 text-[10px] font-bold text-slate-300">Pendentes</button>
            </div>

            <div className="space-y-3 pb-8">

                {/* Item de Lista Complexo */}
                <Card className="p-4 flex flex-col gap-3 group border-slate-700/50">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-900/20 border border-red-500/10 flex items-center justify-center text-xl">🍿</div>
                            <div>
                                <h3 className="font-bold text-slate-200">Netflix Premium</h3>
                                <div className="flex gap-2 items-center mt-0.5">
                                    <Badge variant="default">Lazer</Badge>
                                    <span className="text-[10px] text-slate-500">Recorrente</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg text-white">R$ 55,90</p>
                            <div className="flex items-center gap-1 justify-end mt-1">
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Pendente</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-slate-800 my-1"></div>

                    <div className="flex gap-2">
                        <Button variant="danger" className="flex-1 py-2 text-xs">Cancelar Conta</Button>
                        <Button variant="secondary" className="flex-1 py-2 text-xs">Mudar Plano</Button>
                    </div>
                </Card>

                <Card className="p-4 flex flex-col gap-3 border-slate-700/50">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-900/20 border border-blue-500/10 flex items-center justify-center text-xl">🌐</div>
                            <div>
                                <h3 className="font-bold text-slate-200">Plano Internet Vivo</h3>
                                <div className="flex gap-2 items-center mt-0.5">
                                    <Badge variant="default">Essencial</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-400 line-through decoration-red-500 decoration-2 mb-0.5">R$ 120,00</p>
                            <p className="font-bold text-lg text-emerald-400">R$ 89,90</p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-slate-800 my-1"></div>

                    <div className="flex bg-emerald-500/10 p-2 rounded-lg items-center justify-between border border-emerald-500/20">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">Renegociado</span>
                        <span className="text-xs text-emerald-300 font-bold font-mono">+ R$ 30,10 / mês</span>
                    </div>
                </Card>

            </div>
        </div>
    );
}
