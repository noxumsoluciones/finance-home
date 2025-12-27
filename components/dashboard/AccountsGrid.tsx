"use client";
import { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Camera, Save } from 'lucide-react';

export default function TransactionForm({ onClose }: { onClose?: () => void }) {
  const { addTransaction, accounts, categories } = useFinance();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [accountId, setAccountId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isFixed, setIsFixed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !accountId || !categoryId) return;

    addTransaction({
      amount: parseFloat(amount),
      type,
      accountId,
      categoryId,
      description: desc,
      date: new Date().toISOString(),
      isFixed,
      subCategoryId: desc // Simplificación para este demo
    });
    
    // Reset
    setAmount('');
    setDesc('');
    if (onClose) onClose();
  };

  const filteredCategories = categories.filter(c => 
    type === 'income' ? c.type === 'income' : c.type !== 'income'
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl"
    >
      <h3 className="text-lg font-bold text-white mb-4">Nuevo Movimiento</h3>
      
      <Tabs defaultValue="expense" onValueChange={(v) => setType(v as any)} className="w-full mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="income" className="data-[state=active]:bg-green-600">Ingreso</TabsTrigger>
          <TabsTrigger value="expense" className="data-[state=active]:bg-red-600">Gasto</TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-zinc-400">Monto</Label>
          <Input 
            type="number" 
            placeholder="$0.00" 
            className="text-2xl font-bold bg-black border-zinc-700 h-12"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-400">{type === 'income' ? 'Destino' : 'Origen'}</Label>
            <Select onValueChange={setAccountId}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Cuenta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map(acc => (
                  <SelectItem key={acc.id} value={acc.id}>{acc.bank} - {acc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400">Categoría</Label>
            <Select onValueChange={setCategoryId}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-400">Detalle / Subcategoría</Label>
          <Input 
            className="bg-zinc-800 border-zinc-700" 
            placeholder="Ej: Almuerzo, Uber..." 
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        {type === 'expense' && (
          <div className="flex items-center justify-between py-2">
            <Label className="text-zinc-400">¿Es Gasto Fijo?</Label>
            <Switch checked={isFixed} onCheckedChange={setIsFixed} />
          </div>
        )}

        {/* Simulador de foto (botón) */}
        <Button type="button" variant="outline" className="w-full border-dashed border-zinc-600 text-zinc-400">
          <Camera className="mr-2 h-4 w-4" /> Adjuntar Foto (Opcional)
        </Button>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg">
          <Save className="mr-2 h-5 w-5" /> Registrar
        </Button>
      </form>
    </motion.div>
  );
}