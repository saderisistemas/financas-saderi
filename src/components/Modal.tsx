import React from 'react';
import { X } from 'lucide-react';
import { Card, Button } from './ui';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <Card className="relative w-full max-w-lg shadow-2xl glass-card animate-fade-in z-10 border-slate-700/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <Button variant="ghost" onClick={onClose} className="p-2 h-auto rounded-full text-slate-400 hover:text-white">
                        <X size={20} />
                    </Button>
                </div>
                {children}
            </Card>
        </div>
    );
}
