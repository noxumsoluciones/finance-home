"use client";
import { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfYear, endOfYear, eachMonthOfInterval, isSameMonth, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ComplexFinanceChart({ transactions, period, currentDate }: any) {
    // --- 2. ESTADO PARA HOVER ---
    const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);

    // 1. Etiqueta del día seleccionado
    const selectedLabel = useMemo(() => {
        if (!currentDate) return null;
        if (period === 'year') {
            const label = format(currentDate, 'MMM', { locale: es });
            return label.charAt(0).toUpperCase() + label.slice(1);
        } else {
            return format(currentDate, 'd', { locale: es });
        }
    }, [currentDate, period]);

    const data = useMemo(() => {
        let intervalPoints: Date[] = [];
        let dateFormat = 'd';
        let startDateOfChart: Date;

        // Definimos los puntos de tiempo y la fecha de inicio de la gráfica
        if (period === 'year') {
             startDateOfChart = startOfYear(currentDate);
             intervalPoints = eachMonthOfInterval({ start: startDateOfChart, end: endOfYear(currentDate) });
             dateFormat = 'MMM';
        } else {
             startDateOfChart = startOfMonth(currentDate);
             intervalPoints = eachDayOfInterval({ start: startDateOfChart, end: endOfMonth(currentDate) });
             dateFormat = 'd';
        }

        // --- CORRECCIÓN CLAVE: CALCULAR EL SALDO INICIAL ---
        // Sumamos todo lo que ocurrió ANTES de que empiece esta gráfica
        const initialBalance = transactions
            .filter((t: any) => isBefore(new Date(t.date), startDateOfChart))
            .reduce((acc: number, t: any) => {
                const amount = t.amount || 0;
                if (t.type === 'income') return acc + amount;
                if (t.type === 'expense'){
                    if (t.payWithSavings) return acc;
                    return acc - amount;
                } //|| (t.type === 'savings' || t.isSavings)) return acc - amount;
                
                // Si se fue a ahorro, sale del flujo diario
                if (t.isSavings) return acc - amount;

                return acc;
            }, 0);

        // Inicializamos el acumulado con el saldo histórico, no con 0
        let cumulative = initialBalance; 

        return intervalPoints.map(point => {
            // Filtramos transacciones que ocurren EXACTAMENTE en este punto (día o mes)
            const pointTx = transactions.filter((t: any) => {
                const tDate = new Date(t.date);
                if (period === 'year') return isSameMonth(tDate, point);
                return isSameDay(tDate, point);
            });
            // Ingresos
            const income = pointTx.filter((t: any) => t.type === 'income').reduce((sum: number, t: any) => sum + t.amount, 0);
            // --- 2. LÓGICA GASTOS ---
            // A. Gasto TOTAL (Para visualizar en Rojo): Incluye todo
            const expenseTotal = pointTx
                .filter((t: any) => t.type === 'expense' && !t.isSavings)
                .reduce((sum: number, t: any) => sum + t.amount, 0);

            // B. Gasto OPERATIVO (Para calcular Restante): Excluye pagos con ahorro
            const expenseOperational = pointTx
                .filter((t: any) => t.type === 'expense' && !t.isSavings && !t.payWithSavings)
                .reduce((sum: number, t: any) => sum + t.amount, 0);

            // --- 3. LÓGICA AHORRO ---
            // Ahorro Entrante (Guardado)
            const savingsIn = pointTx.filter((t: any) => t.isSavings).reduce((sum: number, t: any) => sum + t.amount, 0);
            // Ahorro Saliente (Gastado)
            const savingsOut = pointTx.filter((t: any) => t.payWithSavings).reduce((sum: number, t: any) => sum + t.amount, 0);

            // Ahorro Neto Visual (Puede ser negativo si gastaste más ahorro del que guardaste ese día)
            const savingsVisual = savingsIn - savingsOut;
            
            // --- 4. CÁLCULO DE RESTANTE ---
            // Usamos expenseOperational para que el gasto de ahorro NO baje la línea morada
            const netFlow = income - expenseOperational - savingsIn; 
            
            cumulative += netFlow; 

            let labelX = format(point, dateFormat, { locale: es });
            if (period === 'year') {
                labelX = labelX.charAt(0).toUpperCase() + labelX.slice(1);
            }

            return {
                label: labelX,
                fullDate: format(point, 'PPP', { locale: es }),
                Ingreso: income,
                Gasto: expenseTotal, // Muestra el gasto total (incluyendo el de ahorros)
                Ahorro: savingsVisual, // Muestra el efecto neto en ahorros (se verá negativo si gastaste)
                Restante: cumulative
            };
            /*
            const income = pointTx.filter((t: any) => t.type === 'income').reduce((sum: number, t: any) => sum + t.amount, 0);
            
            // Ajuste: Aseguramos que el ahorro reste si es un gasto o tipo ahorro explícito
            const expense = pointTx.filter((t: any) => t.type === 'expense' && !t.isSavings).reduce((sum: number, t: any) => sum + t.amount, 0);
            const savings = pointTx.filter((t: any) => t.isSavings || t.type === 'savings').reduce((sum: number, t: any) => sum + t.amount, 0);
            
            const netFlow = income - expense - savings; 
            
            // Sumamos al acumulado histórico
            cumulative += netFlow; 

            let labelX = format(point, dateFormat, { locale: es });
            if (period === 'year') {
                labelX = labelX.charAt(0).toUpperCase() + labelX.slice(1);
            }

            return {
                label: labelX,
                fullDate: format(point, 'PPP', { locale: es }),
                Ingreso: income,
                Gasto: expense,
                Ahorro: savings,
                Restante: cumulative // Ahora esto incluye el saldo del mes pasado
            };*/
        });
    }, [transactions, period, currentDate]);

    const formatMoneyAxis = (val: number) => {
        if (Math.abs(val) >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        if (Math.abs(val) >= 1000) return `$${(val / 1000).toFixed(0)}k`;
        return `$${val}`;
    };

    // 3. FUNCIÓN PARA CONTROLAR OPACIDAD
    const getOpacity = (seriesName: string) => {
        return hoveredSeries && hoveredSeries !== seriesName ? 0.1 : 1;
    };

    return (
        <div className="h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorIng" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSav" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/><stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    
                    <XAxis 
                        dataKey="label" 
                        stroke="#52525b" 
                        tickLine={false} 
                        axisLine={false} 
                        interval={period === 'year' ? 0 : 'preserveStartEnd'} 
                        minTickGap={10}
                    />
                    
                    <YAxis 
                        stroke="#52525b" 
                        tickLine={false} 
                        axisLine={false} 
                        width={60}
                        tickFormatter={formatMoneyAxis} 
                        allowDataOverflow={false}
                    />
                    
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
                        formatter={(val: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val)}
                        labelStyle={{ color: '#a1a1aa', marginBottom: '0.5rem' }}
                    />
                    
                    {selectedLabel && (
                        <ReferenceLine 
                            x={selectedLabel} 
                            stroke="#fbbf24" 
                            strokeDasharray="3 3" 
                            strokeOpacity={0.8}
                        />
                    )}

                    {/* 4. LEYENDA CON INTERACCIÓN */}
                    <Legend 
                        wrapperStyle={{ paddingTop: '10px', cursor: 'pointer' }} 
                        onMouseEnter={(e) => setHoveredSeries(e.dataKey ? String(e.dataKey) : null)}
                        onMouseLeave={() => setHoveredSeries(null)}
                    />
                    
                    {/* 5. APLICAR OPACIDAD CONDICIONAL */}
                    <Area type="monotone" dataKey="Ingreso" stroke="#10b981" fill="url(#colorIng)" strokeWidth={2} strokeOpacity={getOpacity('Ingreso')} fillOpacity={getOpacity('Ingreso')} />
                    <Area type="monotone" dataKey="Gasto" stroke="#f43f5e" fill="url(#colorGas)" strokeWidth={2} strokeOpacity={getOpacity('Gasto')} fillOpacity={getOpacity('Gasto')} />
                    <Area type="monotone" dataKey="Ahorro" stroke="#3b82f6" fill="url(#colorSav)" strokeWidth={2} strokeDasharray="4 4" strokeOpacity={getOpacity('Ahorro')} fillOpacity={getOpacity('Ahorro')} />
                    <Area type="monotone" dataKey="Restante" stroke="#a855f7" fill="url(#colorRes)" strokeWidth={3} strokeDasharray="4 4" strokeOpacity={getOpacity('Restante')} fillOpacity={getOpacity('Restante')} />
                </AreaChart>
            </ResponsiveContainer>
            
            <div className="absolute top-2 right-2 bg-zinc-900/80 border border-zinc-700 px-2 py-1 rounded text-[10px] text-zinc-400 pointer-events-none">
                {period === 'year' ? 'Vista Anual' : 'Vista Mensual'}
            </div>
        </div>
    );
}