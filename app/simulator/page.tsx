"use client";
import { useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function SimulatorPage() {
  const { fixedRules, simulatorItems, addSimItem, removeSimItem } = useFinance();

  // Función para reiniciar el simulador con datos base de tus reglas fijas
  const loadBaseData = () => {
    // 1. Limpiar simulador (opcional, aquí solo agregamos)
    
    // 2. Traer reglas fijas reales
    fixedRules.forEach(rule => {
        addSimItem({
            id: uuidv4(),
            name: rule.description,
            amount: rule.budgetedAmount || 0,
            type: 'expense',
            isFixed: true
        });
    });

    // 3. Ingreso base
    addSimItem({
        id: uuidv4(),
        name: 'Ingreso Estimado Mes',
        amount: 0,
        type: 'income',
        isFixed: false
    });
  };

  const totalIncome = simulatorItems.filter(i => i.type === 'income').reduce((acc, c) => acc + c.amount, 0);
  const totalExpense = simulatorItems.filter(i => i.type === 'expense').reduce((acc, c) => acc + c.amount, 0);
  const projectedBalance = totalIncome - totalExpense;

  const handleAddItem = (type: 'income' | 'expense') => {
      addSimItem({
          id: uuidv4(),
          name: type === 'income' ? 'Ingreso Extra' : 'Gasto Nuevo',
          amount: 0,
          type,
          isFixed: false
      });
  };

  const handleUpdate = (item: any, field: string, value: any) => {
      addSimItem({ ...item, [field]: value });
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl space-y-6 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Simulador Mensual
            </h1>
            <p className="text-zinc-400 text-sm">Planifica tu mes antes de que suceda.</p>
        </div>
        <Button variant="outline" onClick={loadBaseData} className="border-zinc-700 hover:bg-zinc-800">
            <RefreshCw className="mr-2 h-4 w-4" /> Importar Fijos Reales
        </Button>
      </div>
      
      {/* Resumen Superior */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Total Entradas</p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">${totalIncome.toLocaleString()}</p>
            </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Total Salidas</p>
                <p className="text-3xl font-bold text-rose-400 mt-2">${totalExpense.toLocaleString()}</p>
            </CardContent>
        </Card>
        <Card className="bg-zinc-950 border-zinc-700 shadow-2xl relative overflow-hidden">
             <div className={`absolute top-0 left-0 w-1 h-full ${projectedBalance >= 0 ? 'bg-indigo-500' : 'bg-red-500'}`} />
            <CardContent className="p-6 text-center">
                <p className="text-zinc-400 text-xs uppercase font-bold">Saldo Final Disponible</p>
                <p className={`text-4xl font-extrabold mt-2 ${projectedBalance >= 0 ? 'text-indigo-400' : 'text-red-500'}`}>
                    ${projectedBalance.toLocaleString()}
                </p>
            </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna Ingresos */}
        <div className="space-y-4">
            <div className="flex justify-between items-center p-2 bg-emerald-950/20 rounded-lg border border-emerald-900/50">
                <h3 className="text-lg font-bold text-emerald-500 pl-2">Entradas</h3>
                <Button size="sm" onClick={() => handleAddItem('income')} className="bg-emerald-600 hover:bg-emerald-700 text-white border-none h-8">
                    <Plus className="h-4 w-4 mr-1" /> Nuevo
                </Button>
            </div>
            <div className="space-y-2">
                {simulatorItems.filter(i => i.type === 'income').map(item => (
                    <div key={item.id} className="flex gap-2 items-center bg-zinc-900 p-2 rounded border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <Input 
                            value={item.name} 
                            onChange={(e) => handleUpdate(item, 'name', e.target.value)}
                            className="bg-transparent border-none focus-visible:ring-0 text-zinc-300 h-8"
                        />
                        <div className="relative w-32">
                            <span className="absolute left-2 top-1 text-zinc-500 text-sm">$</span>
                            <Input 
                                type="number"
                                value={item.amount} 
                                onChange={(e) => handleUpdate(item, 'amount', Number(e.target.value))}
                                className="bg-black border-zinc-800 pl-5 text-right font-mono text-emerald-400 h-8 text-sm focus-visible:ring-1 focus-visible:ring-emerald-900"
                            />
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => removeSimItem(item.id)} className="text-zinc-600 hover:text-red-500 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                {simulatorItems.filter(i => i.type === 'income').length === 0 && <p className="text-zinc-600 text-sm italic text-center py-4">Agrega un ingreso...</p>}
            </div>
        </div>

        {/* Columna Gastos */}
        <div className="space-y-4">
            <div className="flex justify-between items-center p-2 bg-rose-950/20 rounded-lg border border-rose-900/50">
                <h3 className="text-lg font-bold text-rose-500 pl-2">Salidas</h3>
                <Button size="sm" onClick={() => handleAddItem('expense')} className="bg-rose-600 hover:bg-rose-700 text-white border-none h-8">
                    <Plus className="h-4 w-4 mr-1" /> Nuevo
                </Button>
            </div>
            <div className="space-y-2">
                {simulatorItems.filter(i => i.type === 'expense').map(item => (
                    <div key={item.id} className={`flex gap-2 items-center p-2 rounded border transition-colors ${item.isFixed ? 'bg-indigo-950/20 border-indigo-900/30' : 'bg-zinc-900 border-zinc-800'}`}>
                        <div className="flex-1">
                             <Input 
                                value={item.name} 
                                onChange={(e) => handleUpdate(item, 'name', e.target.value)}
                                className="bg-transparent border-none focus-visible:ring-0 text-zinc-300 h-8 p-0"
                            />
                             {item.isFixed && <span className="text-[9px] bg-indigo-900 text-indigo-200 px-1.5 py-0.5 rounded uppercase tracking-wider">Fijo</span>}
                        </div>

                        <div className="relative w-32">
                            <span className="absolute left-2 top-1 text-zinc-500 text-sm">$</span>
                            <Input 
                                type="number"
                                value={item.amount} 
                                onChange={(e) => handleUpdate(item, 'amount', Number(e.target.value))}
                                className="bg-black border-zinc-800 pl-5 text-right font-mono text-rose-400 h-8 text-sm focus-visible:ring-1 focus-visible:ring-rose-900"
                            />
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => removeSimItem(item.id)} className="text-zinc-600 hover:text-red-500 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                 {simulatorItems.filter(i => i.type === 'expense').length === 0 && <p className="text-zinc-600 text-sm italic text-center py-4">Agrega gastos...</p>}
            </div>
        </div>
      </div>
    </div>
  );
}