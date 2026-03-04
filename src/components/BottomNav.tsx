import { Link, useLocation } from 'react-router-dom';
import { Home, ReceiptText, PieChart, ShieldCheck, Target } from 'lucide-react';
import { cn } from './ui';

export function BottomNav() {
    const location = useLocation();

    const links = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/gastos', label: 'Gastos', icon: ReceiptText },
        { to: '/orcamento', label: 'Orçamento', icon: PieChart },
        { to: '/protecao', label: 'Regras', icon: ShieldCheck },
        { to: '/metas', label: 'Metas', icon: Target },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 glass-panel border-t-0 pb-safe z-50">
            <div className="max-w-md mx-auto flex justify-around items-center h-[72px] px-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.to;

                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300",
                                isActive ? "text-[var(--color-primary)] -translate-y-1" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <div className={cn(
                                "p-1.5 rounded-xl transition-all duration-300",
                                isActive ? "bg-[var(--color-primary)]/10 shadow-[0_0_10px_var(--color-primary-glow)]" : ""
                            )}>
                                <Icon size={22} className={isActive ? "stroke-[2.5px]" : "stroke-2"} />
                            </div>
                            <span className={cn(
                                "text-[9px] font-semibold tracking-wide transition-all",
                                isActive ? "opacity-100" : "opacity-70"
                            )}>
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
