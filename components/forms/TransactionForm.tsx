"use client";
import { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRightLeft, CalendarClock, AlertTriangle, CheckCircle2, AlertCircle, PiggyBank, CreditCard, Banknote, Target } from 'lucide-react';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation'; // <--- 2. Importar Router

interface Props {
    onClose?: () => void;
    defaultType?: 'income' | 'expense' | 'transfer';
}

const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
};

export default function TransactionForm({ onClose, defaultType = 'expense' }: Props) {
    const router = useRouter();
    const { addTransaction, accounts, categories, fixedRules } = useFinance();

    const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
    const [mode, setMode] = useState<'income' | 'expense' | 'transfer'>(defaultType);
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [dateHour, setDateHour] = useState(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds())

    // Categorías y SubCategorías
    const [accountId, setAccountId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategory, setSubCategory] = useState('');
    // --- NUEVO: VALOR DESTINADO (PRESUPUESTADO) ---
    const [budgetedAmount, setBudgetedAmount] = useState('');

    // Estados Recurrente
    const [isFixedMode, setIsFixedMode] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState('');
    const [daysLate, setDaysLate] = useState<number | null>(null);
    const [createRuleFromTx, setCreateRuleFromTx] = useState(false);
    const [newRuleDay, setNewRuleDay] = useState<string>('1');

    // Estados Crédito
    const [isCredit, setIsCredit] = useState(false);
    const [creditQuotaValue, setCreditQuotaValue] = useState('');

    // Estados Ahorro
    const [isSavings, setIsSavings] = useState(false);
    const [didWithdraw, setDidWithdraw] = useState(true);

    // Estado Pagar CON Ahorro
    const [payWithSavings, setPayWithSavings] = useState(false);
    const [targetAccountId, setTargetAccountId] = useState('');

    // 1. OBTENER SALDO AHORRO GLOBAL (Para validar)
    const savingsAccount = accounts.find(a => a.type === 'savings_virtual');
    const savingsBalance = savingsAccount ? savingsAccount.balance : 0;
    const currentAmount = parseFloat(amount) || 0;

    // 2. Condición: Hay ahorros globales >= gasto
    const canPayWithSavings = savingsAccount && savingsBalance >= currentAmount && currentAmount > 0;

    // FILTRO DE CUENTAS REALES (Ocultar Bolsillo Virtual del Dropdown)
    const realAccounts = accounts.filter(a => a.type !== 'savings_virtual' && !a.isHidden);
    const filteredCategories = categories.filter(c => mode === 'income' ? c.type === 'income' : c.type !== 'income');

    // Obtener subcategorías de la categoría seleccionada
    const selectedCategoryObj = categories.find(c => c.id === categoryId);
    const availableSubCategories = selectedCategoryObj?.subCategories || [];


    const { refreshData } = useFinance(); // <--- 3. Obtener la función

    useEffect(() => {
        if (step === 'success') {
            const timer = setTimeout(() => { if (onClose) onClose(); }, 2500);
            return () => clearTimeout(timer);
        }
    }, [step, onClose]);

    useEffect(() => { if (isSavings) setPayWithSavings(false); }, [isSavings]);
    useEffect(() => { if (payWithSavings) setIsSavings(false); }, [payWithSavings]);

    useEffect(() => {
        if (isFixedMode && selectedRuleId) {
            const rule = fixedRules.find(r => r.id === selectedRuleId);
            if (rule) {
                // LÓGICA MEJORADA:
                // Si hay un monto fijo sugerido, úsalo. Si no, usa el presupuestado como sugerencia inicial (o déjalo vacío si prefieres escribirlo siempre).
                // Aquí usaré staticAmount si existe, sino budgetedAmount.
                const suggestedAmount = rule.staticAmount ? rule.staticAmount.toString() : rule.budgetedAmount.toString();

                if (!amount) setAmount(suggestedAmount);

                setBudgetedAmount(rule.budgetedAmount.toString()); // El destinado SIEMPRE es el budgetedAmount
                setDesc(rule.description);
                setCategoryId(rule.categoryId);
                setAccountId(rule.accountIdToCharge);
            }
        }
    }, [selectedRuleId, isFixedMode, fixedRules]);

    useEffect(() => {
        if (isFixedMode && selectedRuleId) {
            const rule = fixedRules.find(r => r.id === selectedRuleId);
            if (rule) {
                const selectedDay = parseInt(date.split('-')[2]);
                const ruleDay = rule.dayOfMonth;
                if (selectedDay > ruleDay) setDaysLate(selectedDay - ruleDay);
                else setDaysLate(null);
            }
        } else setDaysLate(null);
    }, [date, selectedRuleId, isFixedMode, fixedRules]);


    const handlePreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount) return;
        // Si paga con ahorro, NECESITAMOS accountId (la cuenta real de donde sale la plata)
        if (mode !== 'transfer' && !accountId) return;
        if (mode === 'transfer' && (!accountId || !targetAccountId)) return;
        setStep('confirm');
    };

    const handleFinalSubmit = async () => {
        const numAmount = parseFloat(amount);
        const safeDate = new Date(`${date} ${dateHour}`).toISOString();
        const finalAccountId = accountId;
        let finalDesc = desc;
        if (payWithSavings) finalDesc += " (De Ahorros)";
        if (isCredit) finalDesc += " (Desembolso Crédito)";
        // Nombres para historial
        const originAcc = accounts.find(a => a.id === accountId);
        const targetAcc = accounts.find(a => a.id === targetAccountId);

        if (mode === 'transfer') {
            await addTransaction({
                type: 'transfer',
                amount: numAmount,
                accountId,
                relatedAccountId: targetAccountId,
                originAccountName: originAcc?.name, destAccountName: targetAcc?.name,
                date: safeDate, description: desc || 'Transferencia'
            });
        } else {
            await addTransaction({
                type: mode, amount: numAmount, accountId: finalAccountId, categoryId, subCategory, description: finalDesc, date: safeDate,
                isFixed: isFixedMode, isSavings: mode === 'expense' && isSavings, isCredit: mode === 'income' && isCredit,
                didWithdraw: mode === 'expense' && isSavings ? didWithdraw : true, payWithSavings,
                createFixedRule: createRuleFromTx, creditQuotaValue: isCredit ? creditQuotaValue : null, dayOfMonth: parseInt(newRuleDay),

                // Enviamos el valor destinado si existe
                budgetedAmount: budgetedAmount ? parseFloat(budgetedAmount) : null
            });
        }
        setStep('success');
    };

    if (step === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in-95 duration-300">
                <div className="rounded-full bg-emerald-900/30 p-4 mb-4 ring-2 ring-emerald-500/50"><CheckCircle2 className="w-16 h-16 text-emerald-400" /></div>
                <h2 className="text-2xl font-bold text-white mb-2">¡Movimiento Agregado!</h2>
                <Button variant="ghost" onClick={onClose} className="text-zinc-500 hover:text-white">Cerrar ahora</Button>
            </div>
        );
    }

    if (step === 'confirm') {
        const numAmount = parseFloat(amount);
        const accName = accounts.find(a => a.id === accountId)?.name;
        const numBudgeted = budgetedAmount ? parseFloat(budgetedAmount) : 0;
        const diff = numBudgeted > 0 ? numBudgeted - numAmount : 0;

        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-400"><AlertCircle className="w-6 h-6" /></div>
                    <DialogTitle className="text-xl text-white">¿Confirmar Movimiento?</DialogTitle>
                    <DialogDescription className="text-zinc-400">Verifica los detalles.</DialogDescription>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-3 text-sm">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                        <span className="text-zinc-500">Tipo:</span>
                        <span className={`font-bold uppercase ${mode === 'income' ? 'text-emerald-400' : mode === 'expense' ? 'text-rose-400' : 'text-blue-400'}`}>
                            {mode === 'income' ? 'Ingreso' : mode === 'transfer' ? 'Transferencia' : 'Gasto'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Monto:</span>
                        <span className="text-xl font-bold text-white">{formatMoney(numAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Cuenta:</span>
                        <span className="text-zinc-300">{accName}</span>
                    </div>
                    {payWithSavings && (
                        <div className="bg-blue-900/20 text-blue-300 p-2 rounded text-xs text-center border border-blue-500/20 font-bold">
                            💎 Se restará de {accName} y también de tus Ahorros Globales.
                        </div>
                    )}
                    {/* --- ALERTA DE PRESUPUESTO --- */}
                    {numBudgeted > 0 && mode === 'expense' && (
                        <div className={`p-2 rounded text-xs text-center border font-bold ${diff >= 0 ? 'bg-emerald-900/20 text-emerald-300 border-emerald-500/20' : 'bg-orange-900/20 text-orange-300 border-orange-500/20'}`}>
                            {diff >= 0
                                ? `🎉 ¡Ahorraste ${formatMoney(diff)} respecto a lo destinado!`
                                : `⚠️ Gastaste ${formatMoney(Math.abs(diff))} MÁS de lo destinado.`}
                        </div>
                    )}
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep('form')} className="flex-1 border-zinc-700 hover:bg-zinc-800 text-zinc-300">Corregir</Button>
                    <Button onClick={handleFinalSubmit} className={`flex-1 font-bold ${mode === 'income' ? 'bg-emerald-600' : 'bg-indigo-600'}`}><CheckCircle2 className="w-4 h-4 mr-2" /> Confirmar</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 text-white">
            <Tabs value={mode} onValueChange={(v: any) => { setMode(v); setIsSavings(false); setIsFixedMode(false); setPayWithSavings(false); }} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
                    <TabsTrigger value="income" className="data-[state=active]:bg-green-600">Ingreso</TabsTrigger>
                    <TabsTrigger value="expense" className="data-[state=active]:bg-red-600">Gasto</TabsTrigger>
                    <TabsTrigger value="transfer" className="data-[state=active]:bg-blue-600">Transferir</TabsTrigger>
                </TabsList>
            </Tabs>

            <form onSubmit={handlePreSubmit} className="space-y-4 mt-4">
                {/* --- OPCIÓN CRÉDITO (SOLO INGRESO) --- */}
                {mode === 'income' && (
                    <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2"><Banknote className="h-4 w-4 text-orange-400" /><Label className="cursor-pointer">¿Es un Crédito / Préstamo?</Label></div>
                            <Switch checked={isCredit} onCheckedChange={setIsCredit} className="data-[state=checked]:bg-orange-500" />
                        </div>
                        {isCredit && (
                            <div className="animate-in slide-in-from-top-2 pt-2 border-t border-zinc-800 grid grid-cols-2 gap-3">
                                <div className="col-span-2 text-xs text-zinc-400 mb-1">Se creará un gasto recurrente automáticamente.</div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Valor Cuota Mensual</Label>
                                    <Input type="number" required placeholder="$0" className="bg-black border-zinc-700 h-9" value={creditQuotaValue} onChange={e => setCreditQuotaValue(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Día de Pago</Label>
                                    <Input type="number" min="1" max="31" className="bg-black border-zinc-700 h-9 text-center" value={newRuleDay} onChange={e => setNewRuleDay(e.target.value)} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {mode === 'expense' && (
                    <div className="space-y-4">
                        <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-indigo-400" /><Label className="cursor-pointer">¿Es un Gasto Recurrente?</Label></div>
                                <Switch checked={isFixedMode} onCheckedChange={(v) => { setIsFixedMode(v); if (v) { setIsSavings(false); setPayWithSavings(false); } }} className="data-[state=checked]:bg-indigo-500" />
                            </div>
                            {isFixedMode && (
                                <div className="animate-in slide-in-from-top-2 pt-2 border-t border-zinc-800">
                                    <Label className="text-xs text-zinc-400 mb-1 block">Seleccionar regla existente</Label>
                                    <Select onValueChange={setSelectedRuleId} value={selectedRuleId}>
                                        <SelectTrigger className="bg-zinc-950 border-zinc-700"><SelectValue placeholder="-- Selecciona pago --" /></SelectTrigger>
                                        <SelectContent>{fixedRules.map(rule => (<SelectItem key={rule.id} value={rule.id}>{rule.description} (Día {rule.dayOfMonth})</SelectItem>))}</SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                        {!payWithSavings && !isFixedMode && (
                            <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><PiggyBank className="h-4 w-4 text-emerald-400" /><Label className="cursor-pointer">¿Es para AHORRAR?</Label></div>
                                    <Switch checked={isSavings} onCheckedChange={setIsSavings} className="data-[state=checked]:bg-emerald-500" />
                                </div>
                                {isSavings && (
                                    <div className="mt-3 pt-3 border-t border-zinc-800 animate-in slide-in-from-top-2">
                                        <Label className="block mb-2 text-yellow-500 text-xs">¿Retirar el dinero de la cuenta origen?</Label>
                                        <div className="flex gap-4">
                                            <div onClick={() => setDidWithdraw(true)} className={`flex-1 p-2 rounded text-center cursor-pointer border ${didWithdraw ? 'bg-red-900/50 border-red-500 text-white' : 'bg-zinc-800 border-transparent text-zinc-500'}`}>SI <span className="text-[10px] block opacity-70">(- Saldo)</span></div>
                                            <div onClick={() => setDidWithdraw(false)} className={`flex-1 p-2 rounded text-center cursor-pointer border ${!didWithdraw ? 'bg-blue-900/50 border-blue-500 text-white' : 'bg-zinc-800 border-transparent text-zinc-500'}`}>NO <span className="text-[10px] block opacity-70">(= Saldo)</span></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1 col-span-1"><Label>Fecha</Label><Input type="date" required onChange={e => setDate(e.target.value)} className="bg-black border-zinc-700" /></div>
                    <div className="space-y-1 col-span-2">
                        <Label className="font-bold">Monto</Label>
                        {/* AVISO DECIMALES */}
                        <span className="text-[10px] text-yellow-500 flex items-center gap-1 bg-yellow-900/10 px-2 py-0.5 rounded border border-yellow-800/30">
                            <AlertCircle className="h-3 w-3" /> No uses comas ni puntos (enteros)
                        </span>
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                        <Input
                            type="number"
                            required
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="pl-7 bg-zinc-800 border-zinc-700 text-lg font-bold"
                            placeholder="0"
                        />
                    </div>
                </div>

                {mode === 'expense' && !payWithSavings && !isSavings && (
                    <div className="space-y-1 animate-in fade-in">
                        <Label className="flex items-center gap-2 text-xs text-zinc-400"><Target className="h-3 w-3" /> Valor Destinado / Presupuestado (Opcional)</Label>
                        <Input type="number" placeholder="Ej: Lo que planeabas gastar..." className="bg-zinc-900 border-zinc-800 h-9 text-zinc-300" value={budgetedAmount} onChange={e => setBudgetedAmount(e.target.value)} />
                    </div>
                )}

                {/* SELECTORES (Usamos realAccounts para filtrar) */}
                {mode !== 'transfer' && (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Cuenta</Label>
                                <Select onValueChange={setAccountId} value={accountId} required>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                    <SelectContent>
                                        {realAccounts.map(acc =>
                                            <SelectItem key={acc.id} value={acc.id}>
                                                {acc.name}
                                                {/* Opcional: Mostrar saldo safe en el select para guiar */}
                                                {acc.balanceSafe > 0 && <span className="text-xs text-blue-400 ml-2">(Sav: ${acc.balanceSafe.toLocaleString()})</span>}
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* GASTAR DE AHORRO */}
                            {(() => {
                                // Buscamos la cuenta seleccionada para ver su saldo SAFE
                                const selectedAccObj = realAccounts.find(a => a.id === accountId);
                                const currentAmount = parseFloat(amount || '0');
                                const canAffordWithSavings = selectedAccObj ? (selectedAccObj.balanceSafe >= currentAmount) : false;

                                // Solo mostramos si es Gasto, No es para ahorrar, es modo normal, hay cuenta seleccionada Y tiene saldo suficiente
                                if (mode === 'expense' && !isSavings && !isFixedMode && accountId && canAffordWithSavings) {
                                    return (
                                        <div className="animate-in fade-in bg-blue-900/10 border border-blue-500/30 p-3 rounded-lg flex items-center justify-between col-span-2 md:col-span-1">
                                            <div className="space-y-1">
                                                <Label className="text-blue-200 flex items-center gap-2 cursor-pointer" htmlFor="paySavings">
                                                    <CreditCard className="h-4 w-4" /> Gastar de Ahorro
                                                </Label>
                                                <p className="text-[10px] text-blue-400">
                                                    Disponible en cuenta: ${selectedAccObj?.balanceSafe.toLocaleString()}
                                                </p>
                                            </div>
                                            <Switch id="paySavings" checked={payWithSavings} onCheckedChange={setPayWithSavings} className="data-[state=checked]:bg-blue-500" />
                                        </div>
                                    );
                                }
                                return null;
                            })()}
                            {/*
                            {mode === 'expense' && !isSavings && !isFixedMode && canPayWithSavings && (
                                <div className="animate-in fade-in bg-blue-900/10 border border-blue-500/30 p-3 rounded-lg flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-blue-200 flex items-center gap-2 cursor-pointer" htmlFor="paySavings"><CreditCard className="h-4 w-4" /> Gastar de Ahorro</Label>
                                        <p className="text-[10px] text-blue-400">Ahorro Global: {formatMoney(savingsBalance)}</p>
                                    </div>
                                    <Switch id="paySavings" checked={payWithSavings} onCheckedChange={setPayWithSavings} className="data-[state=checked]:bg-blue-500" />
                                </div>
                            )} */}
                            <div className="space-y-2">
                                <Label>Categoría</Label>
                                <Select onValueChange={setCategoryId} value={categoryId} required>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                    <SelectContent>{filteredCategories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                        </div>
                        {/* --- INPUT SUBCATEGORÍA (Aparece si la categoría tiene hijas) --- */}
                        {availableSubCategories.length > 0 && (
                            <div className="space-y-2 animate-in fade-in">
                                <Label>Subcategoría</Label>
                                <Select onValueChange={setSubCategory} value={subCategory}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue placeholder="Opcional: Detalle..." /></SelectTrigger>
                                    <SelectContent>
                                        {availableSubCategories.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                )}

                {/* --- TRANSFERENCIA DE CUENTAS --- */}
                {mode === 'transfer' && (
                    <div className="grid grid-cols-2 gap-4 bg-zinc-900 p-3 rounded-lg">
                        <div className="space-y-2"><Label>Desde</Label><Select onValueChange={setAccountId} required><SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue placeholder="Origen" /></SelectTrigger><SelectContent>{realAccounts.map(acc => <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>)}</SelectContent></Select></div>
                        <div className="space-y-2"><Label>Hacia</Label><Select onValueChange={setTargetAccountId} required><SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue placeholder="Destino" /></SelectTrigger><SelectContent>{realAccounts.filter(a => a.id !== accountId).map(acc => <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>)}</SelectContent></Select></div>
                    </div>
                )}

                <div className="space-y-2"><Label>Descripción</Label><Input className="bg-zinc-800 border-zinc-700" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descripción..." /></div>

                {/* --- CREAR GASTO RECURRENTE --- */}
                {mode === 'expense' && !isFixedMode && !payWithSavings && !isSavings && (
                    <div className="flex items-start gap-2 pt-2 bg-zinc-900/30 p-2 rounded border border-zinc-800/50">
                        <Checkbox id="create-rule" checked={createRuleFromTx} onCheckedChange={(c: any) => setCreateRuleFromTx(c)} className="mt-1 border-zinc-500 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                        <div className="grid gap-1.5 leading-none w-full">
                            <label htmlFor="create-rule" className="text-sm font-medium cursor-pointer text-indigo-300">Guardar como Gasto Recurrente</label>
                            {createRuleFromTx && (
                                <div className="flex items-center gap-2 mt-2 animate-in fade-in">
                                    <Label className="text-xs whitespace-nowrap">Día del pago:</Label>
                                    <Input type="number" min="1" max="31" className="w-16 h-8 bg-black border-zinc-700 text-center font-bold text-indigo-400" value={newRuleDay} onChange={e => setNewRuleDay(e.target.value)} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <Button type="submit" className={`w-full h-12 text-lg ${mode === 'income' ? 'bg-green-600' : mode === 'transfer' ? 'bg-blue-600' : 'bg-red-600'}`}>{mode === 'income' ? 'Siguiente' : mode === 'transfer' ? 'Siguiente' : 'Siguiente'} <ArrowRightLeft className="ml-2 h-4 w-4" /></Button>
            </form>
        </div>
    );
}