import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

interface InfoTooltipProps {
    title: string;
    content: string | React.ReactNode;
}

export function InfoTooltip({ title, content }: InfoTooltipProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/40 transition-colors ml-2 flex-shrink-0"
                aria-label={`Ajuda sobre ${title}`}
            >
                <Info size={12} strokeWidth={3} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.95 }}
                            className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:pb-4"
                        >
                            <div className="bg-[#1a1118] border border-indigo-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                                {/* Decoration */}
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl"></div>

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <h3 className="font-bold text-lg text-white pr-6">{title}</h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors absolute right-[-8px] top-[-8px]"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="text-slate-300 text-sm leading-relaxed relative z-10">
                                    {content}
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full mt-6 py-3 bg-[var(--color-surface)] border border-slate-700/50 rounded-xl text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-colors relative z-10"
                                >
                                    Entendi
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
