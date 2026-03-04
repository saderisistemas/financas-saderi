import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Button
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const baseClass = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 px-4 py-3 text-sm";

        const variants = {
            primary: "bg-[var(--color-primary)] text-white shadow-[0_0_15px_var(--color-primary-glow)] hover:brightness-110",
            secondary: "bg-[var(--color-surface-light)] text-white hover:bg-slate-600",
            danger: "bg-[var(--color-danger)] text-white hover:brightness-110",
            ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-slate-800"
        };

        return (
            <button ref={ref} className={cn(baseClass, variants[variant], className)} {...props} />
        );
    }
);
Button.displayName = 'Button';

// Card
export function Card({ className, children, glass = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { glass?: boolean }) {
    return (
        <div className={cn("p-5 rounded-2xl", glass ? "glass-card text-white" : "bg-[var(--color-surface)] border border-slate-700/50", className)} {...props}>
            {children}
        </div>
    );
}

// Input
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string }>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col space-y-1.5 w-full">
                {label && <label className="text-xs font-medium text-slate-400 ml-1">{label}</label>}
                <input
                    ref={ref}
                    className={cn(
                        "bg-[var(--color-surface-light)]/50 border border-slate-600 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder:text-slate-500",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <span className="text-[10px] text-red-400 ml-1">{error}</span>}
            </div>
        );
    }
);
Input.displayName = 'Input';

// Select
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string, error?: string }>(
    ({ className, label, error, children, ...props }, ref) => {
        return (
            <div className="flex flex-col space-y-1.5 w-full">
                {label && <label className="text-xs font-medium text-slate-400 ml-1">{label}</label>}
                <select
                    ref={ref}
                    className={cn(
                        "bg-[var(--color-surface-light)]/50 border border-slate-600 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all appearance-none",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                >
                    {children}
                </select>
                {error && <span className="text-[10px] text-red-400 ml-1">{error}</span>}
            </div>
        );
    }
);
Select.displayName = 'Select';

// Badge
export function Badge({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'danger', className?: string }) {
    const variants = {
        default: "bg-slate-700 text-slate-200",
        success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        danger: "bg-red-500/20 text-red-400 border border-red-500/30"
    };

    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider", variants[variant], className)}>
            {children}
        </span>
    );
}
