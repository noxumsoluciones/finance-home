"use client";
import { useFinance } from '@/context/FinanceContext';
import RealisticAccountCard from './RealisticAccountCard';
import { X, Wallet, Home, Calculator, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname,useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/app/actions';

interface Props {
    isOpen: boolean;
    onClose: () => void; // Para cerrar en móvil
    className?: string;
}

export default function AccountsSidebar({ isOpen, onClose, className }: Props) {
    const { accounts, currentUser } = useFinance();
    const visibleAccounts = accounts.filter(a => !a.isHidden);

    // 1. Patrimonio Total (Suma de todos los balances brutos)
    const totalPatrimony = visibleAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    
    // 2. Total Ahorrado (Suma de los balanceSafe de cada cuenta)
    const totalReservedSavings = visibleAccounts.reduce((sum, acc) => sum + (acc.balanceSafe || 0), 0);

    
    //const totalPatrimony = visibleAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalAvailable = totalPatrimony - totalReservedSavings;

    const pathname = usePathname();
    const navClass = (path: string) => cn(
        "flex items-center gap-3 p-3 rounded-lg transition-colors font-medium text-sm",
        pathname === path ? "bg-indigo-900/50 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
    );

    return (
        <>
            {/* FONDO OSCURO (SOLO MÓVIL) - Cierra el menú al hacer click afuera */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/80 z-40 md:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* SIDEBAR REAL */}
            <aside className={cn(
                "fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-zinc-950 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl",
                // En móvil: Se mueve dentro/fuera de la pantalla. En Desktop: Siempre visible si el padre lo dice.

                isOpen
                    ? "translate-x-0"
                    : (pathname === '/' ? "-translate-x-full" : "-translate-x-full md:translate-x-0"),

                className
            )}>

                {/* CABECERA SIDEBAR */}
                <div className="p-4 border-b border-zinc-900 flex justify-between items-center h-16">
                    <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">
                        Finance Home
                    </div>
                    {/* Botón Cerrar (SOLO MÓVIL) */}
                    <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden text-zinc-400">
                        <X size={20} />
                    </Button>
                </div>

                {/* CONTENIDO SCROLLABLE */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">

                    {/* USUARIO */}
                    {currentUser && (
                        <div className="px-4 py-6 text-center border-b border-zinc-900/50">
                            <div className="w-12 h-12 bg-indigo-900/30 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                                {currentUser.email.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-xs text-zinc-500 truncate px-4">{currentUser.email}</p>
                            {currentUser.householdId === 'demo' && <span className="text-[10px] text-yellow-500 font-bold tracking-wider">MODO DEMO</span>}
                        </div>
                    )}

                    {/* BALANCE TOTAL */}
                    <div className="p-4">
                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50 text-center">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Disponible</p>
                            <p className={cn("text-2xl font-extrabold mt-1", totalAvailable >= 0 ? "text-emerald-400" : "text-rose-400")}>
                                ${totalAvailable.toLocaleString('es-CO')}
                            </p>
                            {totalReservedSavings > 0 && (
                                <div className="mt-2 text-[10px] text-blue-400 bg-blue-900/10 py-1 px-2 rounded-full inline-block">
                                    🔒 Ahorro: ${totalReservedSavings.toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* NAVEGACIÓN */}
                    <nav className="px-4 space-y-1 mb-6">
                        <Link href="/" onClick={() => window.innerWidth < 768 && onClose()} className={navClass('/')}>
                            <Home size={18} /> Resumen
                        </Link>
                        <Link href="/simulator" onClick={() => window.innerWidth < 768 && onClose()} className={navClass('/simulator')}>
                            <Calculator size={18} /> Simulador
                        </Link>
                        <Link href="/admin" onClick={() => window.innerWidth < 768 && onClose()} className={navClass('/admin')}>
                            <Settings size={18} /> Configuración
                        </Link>
                    </nav>

                    {/* LISTA DE CUENTAS */}
                    <div className="px-4 pb-20">
                        <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3 px-2">Mis Cuentas</h3>
                        <div className="space-y-3">
                            {visibleAccounts.length === 0 && <p className="text-center text-xs text-zinc-600">Sin cuentas.</p>}
                            {visibleAccounts.map(acc => (
                                <RealisticAccountCard key={acc.id} account={acc} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER FIXED */}
                <div className="p-4 border-t border-zinc-900 bg-zinc-950">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-zinc-500 hover:text-red-400 hover:bg-red-950/10"
                        onClick={async () => { await logoutAction(); window.location.href = '/login'; }}
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                    </Button>
                </div>
            </aside>
        </>
    );
}