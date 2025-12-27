"use client";
import { useState, useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import AccountsSidebar from '@/components/dashboard/AccountsSidebar';
import TransactionForm from '@/components/forms/TransactionForm';
import ComplexFinanceChart from '@/components/dashboard/ComplexFinanceChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogFooter, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle, CalendarIcon, Download, Settings, Menu, HelpCircle, Trash2 } from 'lucide-react';
import { isSameMonth, isSameYear, isSameDay, format, getYear, setMonth, setYear, isBefore, startOfMonth, startOfYear, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { cn } from '@/lib/utils';

export default function Dashboard() {
    const { transactions, categories, accounts, deleteTransaction } = useFinance();
    const [period, setPeriod] = useState('month');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [helpOpen, setHelpOpen] = useState(false);

    // --- ESTADO PARA EL SIDEBAR ---
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // --- ESTADOS PARA EXPORTAR ---
    const [exportStart, setExportStart] = useState('');
    const [exportEnd, setExportEnd] = useState('');
    const [exportTypes, setExportTypes] = useState<string[]>(['income', 'expense', 'savings', 'transfer']);
    const [exportAccountIds, setExportAccountIds] = useState<string[]>([]);

    // --- LOGICA FECHAS ---
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
    const months = Array.from({ length: 12 }, (_, i) => i);




    // Selector de Fecha Inteligente
    const DateSelector = () => {
        if (period === 'day') {
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-[220px] justify-start text-left font-normal bg-zinc-950 border-zinc-700")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(selectedDate, "PPP", { locale: es })}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="end">
                        <Calendar mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)} initialFocus className="p-3" />
                    </PopoverContent>
                </Popover>
            );
        } else if (period === 'month') {
            return (
                <div className="flex gap-2">
                    <Select value={selectedDate.getMonth().toString()} onValueChange={(m) => setSelectedDate(setMonth(selectedDate, parseInt(m)))}>
                        <SelectTrigger className="w-[140px] bg-zinc-950 border-zinc-700"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {months.map(m => <SelectItem key={m} value={m.toString()}>{format(new Date(2024, m, 1), 'MMMM', { locale: es })}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={getYear(selectedDate).toString()} onValueChange={(y) => setSelectedDate(setYear(selectedDate, parseInt(y)))}>
                        <SelectTrigger className="w-[100px] bg-zinc-950 border-zinc-700"><SelectValue /></SelectTrigger>
                        <SelectContent>{years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            );
        } else {
            return (
                <Select value={getYear(selectedDate).toString()} onValueChange={(y) => setSelectedDate(setYear(selectedDate, parseInt(y)))}>
                    <SelectTrigger className="w-[120px] bg-zinc-950 border-zinc-700"><SelectValue /></SelectTrigger>
                    <SelectContent>{years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                </Select>
            );
        }
    };

    // --- FILTRO PRINCIPAL (DASHBOARD) ---
    const filteredTx = useMemo(() => {
        return transactions.filter(t => {
            const tDate = new Date(t.date);
            if (period === 'day') return isSameDay(tDate, selectedDate);
            if (period === 'month') return isSameMonth(tDate, selectedDate);
            if (period === 'year') return isSameYear(tDate, selectedDate);
            return true;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, period, selectedDate]);


    // --- 1. PREPARAR DATOS (KPI GLOBAL DE AHORRO) ---
    // --- KPI GLOBAL SAFE ---
    const globalSavingsAccount = accounts.find(a => a.type === 'savings_virtual');


    // --- KPIS DEL PERIODO ACTUAL ---
    const incomeReal = filteredTx.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expenseReal = filteredTx.filter(t => t.type === 'expense' && !t.isSavings).reduce((acc, curr) => acc + curr.amount, 0);
    //const savingsReal = filteredTx.filter(t => t.isSavings).reduce((acc, curr) => acc + curr.amount, 0);
    const expenseOperational = filteredTx
        .filter(t => t.type === 'expense' && !t.isSavings && !t.payWithSavings)
        .reduce((acc, curr) => acc + curr.amount, 0);


    const savingsFlowIn = filteredTx.filter(t => t.isSavings).reduce((acc, curr) => acc + curr.amount, 0);
    const savingsFlowOut = filteredTx.filter(t => t.payWithSavings).reduce((acc, curr) => acc + curr.amount, 0);
    const savingsReal = savingsFlowIn - savingsFlowOut;//const savingsReal = globalSavingsAccount ? globalSavingsAccount.balance : 0;

    const currentFlow = incomeReal - expenseOperational - savingsFlowIn;



    const savingsDepositedThisMonth = filteredTx
        .filter(t => t.isSavings)
        .reduce((acc, curr) => acc + curr.amount, 0);


    /*
    // Flujo neto SOLO de este mes (sin histórico)
    const currentFlow = incomeReal - expenseReal - savingsReal;
    const currentPeriodFlow = incomeReal - expenseOperational - savingsDepositedThisMonth;
    // --- CORRECCIÓN: CÁLCULO DEL SALDO ACUMULADO HISTÓRICO ---
    const historicalBalance = useMemo(() => {
        // Definimos la fecha de corte
        let startDate;
        if (period === 'year') startDate = startOfYear(selectedDate);
        else if (period === 'month') startDate = startOfMonth(selectedDate);
        else startDate = startOfDay(selectedDate);

        return transactions
            .filter(t => isBefore(new Date(t.date), startDate))
            .reduce((acc, t) => {
                const amount = t.amount;
                
                // 1. Sumamos ingresos
                if (t.type === 'income') return acc + amount;
                
                // 2. Restamos gastos (Solo si NO se pagaron con ahorro)
                if (t.type === 'expense') {
                    if (t.payWithSavings) return acc; // IGNORAR
                    return acc - amount;
                }

                // 3. Restamos lo que se fue a ahorro
                if (t.isSavings) return acc - amount;
                
                return acc;
            }, 0);
    }, [transactions, period, selectedDate]);

    // RESTANTE TOTAL = Lo que traía acumulado + Lo que pasó este mes
    const totalRemaining = historicalBalance + currentPeriodFlow;
*/

    // --- CÁLCULO DEL SALDO ACUMULADO HISTÓRICO ---
    const historicalBalance = useMemo(() => {
        let startDate;
        if (period === 'year') startDate = startOfYear(selectedDate);
        else if (period === 'month') startDate = startOfMonth(selectedDate);
        else startDate = startOfDay(selectedDate);

        return transactions
            .filter(t => isBefore(new Date(t.date), startDate))
            .reduce((acc, t) => {
                const amount = t.amount;

                // 1. Sumamos ingresos
                if (t.type === 'income') return acc + amount;

                // 2. Restamos gastos (Solo si NO se pagaron con ahorro)
                if (t.type === 'expense') {
                    if (t.payWithSavings) return acc; // IGNORAR
                    return acc - amount;
                }

                // 3. Restamos lo que se fue a ahorro
                if (t.isSavings) return acc - amount;

                return acc;
            }, 0);
    }, [transactions, period, selectedDate]);

    // RESTANTE TOTAL = Lo que traía acumulado + Lo que pasó este mes
    const totalRemaining = historicalBalance + currentFlow;

    // Porcentajes (basados en el ingreso del mes actual para medir rendimiento del mes)
    const expensePct = incomeReal > 0 ? (expenseReal / incomeReal) * 100 : 0;
    const savingsPct = incomeReal > 0 ? (savingsReal / incomeReal) * 100 : 0;

    // Nota: El porcentaje del restante lo dejamos basado en el flujo del mes 
    // para saber cuánto de TU INGRESO ACTUAL te sobró, aunque el valor en $ muestre el total acumulado.
    const remainingPct = incomeReal > 0 ? (totalRemaining / incomeReal) * 100 : 0;


    // --- LÓGICA DE EXPORTACIÓN ---
    const handleExport = () => {
        let dataToExport = transactions.filter(t => {
            const tDate = new Date(t.date);

            // 1. Filtro de Fechas
            if (exportStart && exportEnd) {
                const start = new Date(exportStart + 'T00:00:00');
                const end = new Date(exportEnd + 'T23:59:59');
                if (tDate < start || tDate > end) return false;
            } else {
                const matchDate = period === 'day' ? isSameDay(tDate, selectedDate) :
                    period === 'month' ? isSameMonth(tDate, selectedDate) : isSameYear(tDate, selectedDate);
                if (!matchDate) return false;
            }

            // 2. Filtro de Cuentas
            if (exportAccountIds.length > 0 && !exportAccountIds.includes(t.accountId)) return false;

            // 3. Filtro de Tipos
            if (t.isTransfer) return exportTypes.includes('transfer');
            if (t.isSavings) return exportTypes.includes('savings');
            if (t.type === 'income') return exportTypes.includes('income');
            if (t.type === 'expense') return exportTypes.includes('expense');
            return true;
        });

        if (dataToExport.length === 0) {
            alert("No hay datos para exportar con estos filtros.");
            return;
        }

        const ws = XLSX.utils.json_to_sheet(dataToExport.map(t => ({
            Fecha: format(new Date(t.date), 'yyyy-MM-dd HH:mm'),
            Tipo: t.isTransfer ? 'Transferencia' : t.isSavings ? 'Ahorro' : t.type === 'income' ? 'Ingreso' : 'Gasto',
            Monto: t.amount,
            Cuenta: accounts.find(a => a.id === t.accountId)?.name || 'N/A',
            Categoria: categories.find(c => c.id === t.categoryId)?.name || 'N/A',
            Detalle: t.description
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Movimientos");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, `Reporte_Financiero_${format(new Date(), 'yyyyMMdd')}.xlsx`);
    };

    return (
        <div className="space-y-6 pb-24 relative">
            {/* Modal de Ayuda */}
            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-800">
                    <DialogHeader>
                        <DialogTitle>Guía del Dashboard</DialogTitle>
                        <DialogDescription>¿Cómo usar esta pantalla?</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 text-sm text-zinc-400">
                        <p>📅 <strong>Filtros de Tiempo:</strong> Usa las pestañas Día/Mes/Año para ver tus finanzas en diferentes periodos.</p>
                        <p>📊 <strong>Gráfica:</strong> Muestra el flujo de dinero. Si filtras por mes, verás los días. Si filtras por año, verás los meses.</p>
                        <p>💾 <strong>Exportar:</strong> Descarga tus movimientos en Excel. Puedes filtrar por fechas y cuentas específicas.</p>
                        <p>🟣 <strong>Transferencias:</strong> Se registran doble (Salida y Entrada) para mantener la contabilidad exacta.</p>
                    </div>
                    <DialogFooter><Button onClick={() => setHelpOpen(false)}>Entendido</Button></DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Sidebar */}
            <AccountsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* BOTÓN HAMBURGUESA PARA MÓVIL */}
                    <Button variant="ghost" size="icon" className="md:hidden text-zinc-400" onClick={() => setIsSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </Button>

                    <div>
                        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex items-center gap-2">
                            HOME FINANCE
                            <HelpCircle className="h-5 w-5 text-zinc-600 cursor-pointer hover:text-zinc-300" onClick={() => setHelpOpen(true)} />
                        </h1>
                        <p className="text-sm text-zinc-400 capitalize">
                            {period === 'day' ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: es }) :
                                period === 'month' ? format(selectedDate, "MMMM yyyy", { locale: es }) : format(selectedDate, "yyyy")}
                        </p>
                    </div>

                    {/* Config Desktop */}
                    <Link href="/admin" className="hidden md:block ml-auto">
                        <Button variant="outline" size="icon" className="border-zinc-700 bg-zinc-900"><Settings className="h-5 w-5" /></Button>
                    </Link>
                </div>

                {/* Config Móvil */}
                <Link href="/admin" className="md:hidden absolute top-0 right-0 p-4">
                    <Button variant="outline" size="icon" className="border-zinc-700 bg-zinc-900"><Settings className="h-5 w-5" /></Button>
                </Link>

                <div className="flex gap-2 w-full md:w-auto flex-wrap mt-2 md:mt-0">
                    {/* BOTÓN EXPORTAR */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="flex-1 md:flex-none"><Download className="mr-2 h-4 w-4" /> Exportar</Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-950 border-zinc-800">
                            <DialogTitle>Exportar Reporte</DialogTitle>
                            <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Desde</Label>
                                        <Input type="date" className="bg-black border-zinc-800" value={exportStart} onChange={(e) => setExportStart(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Hasta</Label>
                                        <Input type="date" className="bg-black border-zinc-800" value={exportEnd} onChange={(e) => setExportEnd(e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Tipos</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {['income', 'expense', 'transfer', 'savings'].map(type => (
                                            <div key={type}
                                                onClick={() => setExportTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])}
                                                className={`cursor-pointer px-3 py-1 rounded border text-xs uppercase ${exportTypes.includes(type) ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-400'}`}
                                            >
                                                {type === 'income' ? 'Ingresos' : type === 'expense' ? 'Gastos' : type === 'transfer' ? 'Transferencias' : 'Ahorros'}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Cuentas (Opcional)</Label>
                                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 bg-black border border-zinc-800 rounded">
                                        {accounts.map(acc => (
                                            <div key={acc.id} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`exp-${acc.id}`}
                                                    checked={exportAccountIds.includes(acc.id)}
                                                    onCheckedChange={(checked) => {
                                                        setExportAccountIds(prev => checked ? [...prev, acc.id] : prev.filter(id => id !== acc.id));
                                                    }}
                                                />
                                                <label htmlFor={`exp-${acc.id}`} className="text-sm text-zinc-300 cursor-pointer truncate">{acc.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleExport} className="bg-emerald-600 w-full">Descargar Excel</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild><Button className="flex-1 bg-emerald-600"><PlusCircle className="mr-2 h-4 w-4" /> Ingreso</Button></DialogTrigger>
                        <DialogContent className="bg-zinc-950 border-zinc-800"><DialogTitle>Nueva Transacción</DialogTitle><TransactionForm defaultType="income" /></DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild><Button className="flex-1 bg-rose-600"><MinusCircle className="mr-2 h-4 w-4" /> Gasto</Button></DialogTrigger>
                        <DialogContent className="bg-zinc-950 border-zinc-800"><DialogTitle>Nueva Transacción</DialogTitle><TransactionForm defaultType="expense" /></DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* GRÁFICA */}
            <Card className="bg-zinc-900/50 border-zinc-800 shadow-xl">
                <CardHeader className="pb-2"><CardTitle>Flujo de Dinero</CardTitle></CardHeader>
                <CardContent>
                    <ComplexFinanceChart transactions={transactions} period={period} currentDate={selectedDate} />
                </CardContent>
            </Card>

            {/* TABS Y LISTA */}
            <Tabs value={period} onValueChange={(v) => setPeriod(v)} className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800">
                    <TabsList className="bg-purple-950 border border-zinc-800">
                        <TabsTrigger value="day">Día</TabsTrigger>
                        <TabsTrigger value="month">Mes</TabsTrigger>
                        <TabsTrigger value="year">Año</TabsTrigger>
                    </TabsList>
                    <DateSelector />
                </div>

                <TabsContent value={period} className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <KPICard title="Ingresos" value={incomeReal} color="text-emerald-400" />
                        <KPICard title="Gastos" value={expenseReal} color="text-rose-400" pct={expensePct} />
                        <KPICard title="Ahorro" value={savingsReal} color="text-blue-400" pct={savingsPct} />
                        {/* AQUÍ USAMOS totalRemaining (ACUMULADO) */}
                        <KPICard title="Restante" value={totalRemaining} color="text-indigo-400" pct={remainingPct} />
                    </div>

                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-0">
                            <div className="divide-y divide-zinc-800">
                                {filteredTx.map(tx => {
                                    let colorClass = 'bg-gray-500';
                                    let textClass = 'text-gray-400';
                                    let sign = '';

                                    if (tx.isTransfer) {
                                        colorClass = 'bg-indigo-500';
                                        textClass = 'text-indigo-400';
                                        sign = tx.type === 'income' ? '+' : '-';
                                    } else if (tx.isSavings) {
                                        colorClass = 'bg-blue-500';
                                        textClass = 'text-blue-400';
                                        sign = '+';
                                    }
                                    else if (tx.isCredit) {
                                        colorClass = 'bg-orange-500';
                                        textClass = 'text-orange-400';
                                        sign = '+';
                                    }
                                    else if (tx.type === 'income') {
                                        colorClass = 'bg-emerald-500';
                                        textClass = 'text-emerald-400';
                                        sign = '+';
                                    } else {
                                        colorClass = 'bg-rose-500';
                                        textClass = 'text-rose-400';
                                        sign = '-';
                                    }

                                    // 5. LÓGICA DE RESTRICCIÓN DE ELIMINACIÓN
                                    // Verificamos si la transacción pertenece al MES ACTUAL
                                    const isCurrentMonth = isSameMonth(new Date(tx.date), new Date());
                                    
                                    return (
                                        <div key={tx.id} className="flex justify-between items-center p-4 hover:bg-zinc-950/50 transition-colors border-b border-zinc-900 last:border-0">
                                            <div className="flex gap-3 items-center">
                                                <div className={`w-1 h-8 rounded-full ${colorClass}`} />
                                                <div>
                                                    <p className="font-bold text-zinc-200">{tx.description}</p>
                                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                        <span>{format(new Date(tx.date), 'dd MMM HH:mm')}</span>
                                                        <span>•</span>
                                                        <span className="capitalize">{categories.find(c => c.id === tx.categoryId)?.name || 'General'}</span>
                                                        {tx.subCategory && <span>• {tx.subCategory}</span>}

                                                        {tx.isTransfer && <span className="bg-indigo-900/50 text-indigo-300 px-1.5 rounded text-[10px] border border-indigo-800">TRANSF</span>}
                                                        {tx.isSavings && <span className="bg-blue-900/50 text-blue-300 px-1.5 rounded text-[10px] border border-blue-800">AHORRO</span>}
                                                        {tx.isCredit && <span className="bg-orange-900/50 text-orange-300 px-1.5 rounded text-[10px] border border-orange-800">CRÉDITO</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right flex items-center gap-4">
                                                <div>
                                                    <p className={`font-mono font-bold text-lg ${textClass}`}>
                                                        {sign} ${tx.amount.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-zinc-600">
                                                        {accounts.find(a => a.id === tx.accountId)?.name}
                                                    </p>
                                                </div>
                                                {/* 6. BOTÓN ELIMINAR CON RESTRICCIÓN */}
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className={`
                                                        opacity-0 group-hover:opacity-100 transition-all 
                                                        ${isCurrentMonth ? 'text-red-500 hover:bg-red-900/20' : 'text-zinc-700 cursor-not-allowed'}
                                                    `}
                                                    onClick={() => isCurrentMonth && deleteTransaction(tx.id)}
                                                    title={isCurrentMonth ? "Eliminar" : "Solo puedes eliminar movimientos del mes actual"}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className = 'opacity-0 group-hover:opacity-100 transition-all text-red-500 hover:bg-red-900/20'
                                                    onClick={() => isCurrentMonth && deleteTransaction(tx.id)}
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                {/* 6. BOTÓN ELIMINAR (SIEMPRE VISIBLE) */}
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className={`
                                                        transition-all 
                                                        ${isCurrentMonth 
                                                            ? 'text-zinc-200 hover:text-red-500 hover:bg-red-900/20' // Mes actual: Gris -> Rojo
                                                            : 'text-zinc-600 cursor-not-allowed' // Mes pasado: Gris oscuro (deshabilitado)
                                                        }
                                                    `}
                                                    onClick={() => isCurrentMonth && deleteTransaction(tx.id)}
                                                    disabled={!isCurrentMonth} // Bloqueo nativo del botón
                                                    title={isCurrentMonth ? "Eliminar" : "Solo puedes eliminar movimientos del mes actual"}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            

                                        </div>
                                    );
                                })}
                                {filteredTx.length === 0 && <p className="text-center text-zinc-500 py-6">No hay movimientos.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function KPICard({ title, value, color, pct }: any) {
    return (
        <Card className="bg-zinc-900 border-zinc-800 relative overflow-hidden group">
            <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{title}</p>
                        <p className={`text-2xl lg:text-3xl font-extrabold tracking-tight mt-1 ${color}`}>${value.toLocaleString()}</p>
                        {pct !== undefined && (
                            <div className="text-right">
                                <p className="text-3xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors">{pct.toFixed(0)}%</p>
                            </div>
                        )}
                    </div>
                </div>
                {pct !== undefined && (
                    <div className="mt-4 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${color.replace('text-', 'bg-')}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}