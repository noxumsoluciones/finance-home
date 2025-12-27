"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AccountsSidebar from '@/components/dashboard/AccountsSidebar';
import { Button } from '@/components/ui/button';
import { Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFinance } from '@/context/FinanceContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const { currentUser } = useFinance();

    // Estado del Sidebar
    // - true: Abierto (Visible en Desktop empujando contenido / Visible en Móvil como overlay)
    // - false: Cerrado (Oculto en ambos)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    if (isLoginPage) {
        return <main className="w-full min-h-screen bg-black">{children}</main>;
    }

    return (
        <div className="min-h-screen bg-black text-white relative">
            
            {/* SIDEBAR COMPONENTE */}
            {/* En Desktop: Si isSidebarOpen es falso, lo ocultamos visualmente (hidden md:hidden) para liberar espacio */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-[280px]", 
                !isSidebarOpen && "hidden" // Si está cerrado, lo quitamos del DOM visualmente
            )}>
                <AccountsSidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)} // Función para que el móvil pueda cerrarse solo
                />
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className={cn(
                "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
                // MARGEN DINÁMICO DESKTOP: Si el sidebar está abierto, dejamos 280px a la izquierda. Si no, 0.
                isSidebarOpen ? "md:pl-[280px]" : "md:pl-0"
            )}>
                
                {/* HEADER SUPERIOR (STICKY) */}
                <header className="sticky top-0 z-40 h-16 border-b border-zinc-800 bg-black/80 backdrop-blur flex items-center px-4 justify-between">
                    
                    <div className="flex items-center gap-3">
                        {/* BOTÓN TOGGLE (HAMBURGUESA / COLAPSAR) */}
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            {/* Icono cambia según estado */}
                            {isSidebarOpen ? <PanelLeftClose /> : <Menu />}
                        </Button>
                        
                        {/* TÍTULO MÓVIL (En desktop lo dice el sidebar) */}
                        <span className={cn(
                            "font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400",
                            isSidebarOpen ? "md:opacity-0" : "opacity-100" // Ocultar título en desktop si sidebar está abierto (ya lo tiene el sidebar)
                        )}>
                            Finance Home
                        </span>
                    </div>

                    {/* USUARIO (DERECHA) */}
                    {currentUser && (
                         <div className="text-xs text-zinc-500 font-mono">
                            {currentUser.householdId === 'demo' ? 'DEMO' : 'FAMILIA'}
                         </div>
                    )}
                </header>

                {/* AREA DE CONTENIDO REAL */}
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden w-full max-w-[1600px] mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}