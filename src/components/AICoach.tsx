import { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { Card } from './ui';
import { askFinancialCoach } from '../lib/ai';

export function AICoach() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
        { role: 'ai', text: 'Oi! Sou seu Coach Financeiro. Vai comprar algo que não deveria hoje? 🤨' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userText = input;
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setIsLoading(true);

        // Mocking an ongoing context for the AI
        const fakeContext = {
            budget_left: "R$ 1.240",
            goal: "Viagem Chile (30% concluída)"
        };

        const aiRes = await askFinancialCoach(userText, fakeContext);

        setMessages(prev => [...prev, { role: 'ai', text: aiRes }]);
        setIsLoading(false);
    };

    return (
        <>
            {/* FAB (Floating Action Button) */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 flex items-center justify-center text-white transition-transform hover:scale-105 ${isOpen ? 'scale-0' : 'scale-100'}`}
            >
                <Sparkles size={24} className="animate-pulse" />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] md:w-96 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                <Card className="flex flex-col h-[60vh] md:h-[500px] border-purple-500/30 shadow-2xl overflow-hidden p-0 bg-[#0f111a]/95 backdrop-blur-xl">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-4 flex items-center justify-between border-b border-purple-500/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Coach Financeiro</h3>
                                <p className="text-[10px] text-purple-300 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-2"><X size={20} /></button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user'
                                    ? 'bg-[var(--color-primary)] text-white rounded-tr-sm'
                                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 border border-slate-700 text-slate-400 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Box */}
                    <div className="p-3 bg-slate-900 border-t border-slate-800">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Vou comprar uma pizza..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 outline-none focus:border-purple-500/50 transition-colors"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-1.5 w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white disabled:opacity-50 disabled:bg-slate-700"
                            >
                                <Send size={16} className="-ml-0.5" />
                            </button>
                        </div>
                    </div>

                </Card>
            </div>
        </>
    );
}
