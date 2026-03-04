import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { AICoach } from './AICoach';

export function Layout() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-white w-full flex justify-center custom-scrollbar">
            <div className="w-full max-w-[500px] h-full min-h-screen bg-[#0f111a] shadow-2xl relative shadow-black/50 border-x border-white/5">

                {/* Main Content Area */}
                <main className="px-4 pb-24 pt-6 min-h-screen">
                    <Outlet />
                </main>

                <AICoach />
                <BottomNav />
            </div>
        </div>);
}
