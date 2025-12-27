"use client";
import { useFinance } from '@/context/FinanceContext';
import { Account } from '@/types';
import { Wallet, Building2, Banknote, CreditCard, Lock , PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RealisticAccountCard({ account }: { account: Account }) {
  const { transactions } = useFinance();

  // 1. Traemos el ahorro de las cuentas
  const totalBalanceSafe = account.balanceSafe;
  // 2. El "Balance" que viene de la BD ya incluye todo (porque decidimos no restarlo).
  //    Así que el "Disponible" es el Total menos el Ahorro Reservado.
  const totalBalance = account.balance;
  const availableBalance = totalBalance - totalBalanceSafe;

  const Icon = account.type === 'wallet' ? Wallet : 
               account.type === 'savings_virtual' ? PiggyBank :
               account.type === 'cash' ? Banknote : 
               account.type === 'bond' ? CreditCard : Building2 ;

  const cardColor = account.color || '#66667aff';

  return (
    <div 
        className="relative overflow-hidden rounded-xl p-4 bg-zinc-900 border border-zinc-800 shadow-md transition-all hover:scale-[1.02]"
        style={{ borderLeft: `4px solid ${cardColor}`,borderRight: `4px solid ${cardColor}` , backgroundColor:`${cardColor}26`}}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: cardColor }} />
            <div>
                <h3 className="text-lg font-bold text-white leading-tight">{account.name}</h3>
                <p className="text-xs text-zinc-500 font-medium">
                   • {account.bank} • 
                </p>
            </div>
        </div>
        <Icon className="text-zinc-600 opacity-50" size={20} />
      </div>

      <div className="space-y-2">
         {/* Ahorro Reservado (Solo si hay) */}
         {totalBalanceSafe > 0 && (
            <div className="flex justify-between items-center bg-blue-900/20 px-2 py-1 rounded border border-blue-900/30">
                <div className="flex items-center gap-1 text-blue-400 text-xs">
                    <Lock size={10} /> <span>Reservado Ahorro</span>
                </div>
                <span className="text-blue-300 text-xs font-mono font-bold">${totalBalanceSafe.toLocaleString()}</span>
            </div>
         )}

         <div className="flex justify-between items-end border-t border-zinc-800 pt-2 mt-2">
             <div className="text-left">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Total Banco</p>
                <p className="text-xs text-zinc-400 font-mono">${totalBalance.toLocaleString()}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Disponible Real</p>
                <p className={cn(
                    "text-xl font-mono font-bold tracking-tight",
                    availableBalance >= 0 ? "text-emerald-400" : "text-rose-400"
                )}>
                    ${availableBalance.toLocaleString('es-CO')}
                </p>
             </div>
         </div>
      </div>
    </div>
  );
}