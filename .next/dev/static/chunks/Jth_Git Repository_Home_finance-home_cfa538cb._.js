(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Jth/Git Repository/Home/finance-home/context/FinanceContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinanceProvider",
    ()=>FinanceProvider,
    "useFinance",
    ()=>useFinance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/date-fns/startOfMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/date-fns/isSameMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/date-fns/setDate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
// DATOS INICIALES (Tus listas personalizadas y datos de ejemplo)
// NOTA: He actualizado los balances iniciales basado en tu imagen para que se vea real de entrada.
const INITIAL_ACCOUNTS = [
    {
        id: 'acc_dav_th',
        name: 'Davivienda TH',
        bank: 'Davivienda',
        owner: 'Thannia',
        balance: 0,
        isHidden: false,
        last4: '8901',
        colorTheme: 'from-red-700 to-red-900'
    },
    {
        id: 'acc_dav_jh',
        name: 'Davivienda JH',
        bank: 'Davivienda',
        owner: 'Jhonattan',
        balance: 0,
        isHidden: false,
        last4: '1234',
        colorTheme: 'from-red-700 to-red-900'
    },
    {
        id: 'acc_bdb_jh',
        name: 'BDB JH',
        bank: 'Banco de Bogotá',
        owner: 'Jhonattan',
        balance: 0,
        isHidden: false,
        last4: '5678',
        colorTheme: 'from-blue-800 to-blue-950'
    },
    {
        id: 'acc_neq_jh',
        name: 'Nequi JH',
        bank: 'Nequi',
        owner: 'Jhonattan',
        balance: 0,
        isHidden: false,
        last4: '3321',
        colorTheme: 'from-purple-600 to-pink-600'
    },
    {
        id: 'acc_neq_th',
        name: 'Nequi TH',
        bank: 'Nequi',
        owner: 'Thannia',
        balance: 0,
        isHidden: false,
        last4: '4455',
        colorTheme: 'from-purple-600 to-pink-600'
    },
    {
        id: 'acc_efec',
        name: 'Efectivo Casa',
        bank: 'Efectivo',
        owner: 'Casa',
        balance: 0,
        isHidden: false,
        colorTheme: 'from-green-700 to-emerald-900'
    },
    {
        id: 'acc_sodexo',
        name: 'Sodexo',
        bank: 'Sodexo',
        owner: 'Ambos',
        balance: 0,
        isHidden: false,
        colorTheme: 'from-blue-400 to-blue-600'
    }
];
// Categorías basadas en tus imágenes
const INITIAL_CATEGORIES = [
    {
        id: 'cat_ing_fijo',
        name: 'Ingreso Fijo (Salario/Aux)',
        type: 'income'
    },
    {
        id: 'cat_ing_extra',
        name: 'Ingreso Extra',
        type: 'income'
    },
    {
        id: 'cat_ahorro_meta',
        name: 'Ahorro Meta/Beneficiar',
        type: 'income'
    },
    {
        id: 'cat_servicios',
        name: 'Servicios Públicos',
        type: 'expense',
        isFixedExpenseCandidate: true,
        subCategories: [
            'Enel Codensa',
            'Acueducto',
            'Vanti',
            'Movistar + WOM',
            'Claro'
        ]
    },
    {
        id: 'cat_casita',
        name: 'Casita/Arriendo',
        type: 'expense',
        isFixedExpenseCandidate: true,
        subCategories: [
            'Arriendo',
            'Aseo mensual'
        ]
    },
    {
        id: 'cat_comida',
        name: 'Comida',
        type: 'expense',
        isFixedExpenseCandidate: true,
        subCategories: [
            'Mercado Mensual',
            'Gasto Comida Diario'
        ]
    },
    {
        id: 'cat_moto',
        name: 'Moto',
        type: 'expense',
        subCategories: [
            'Gasolina',
            'Taller',
            'Seguro'
        ]
    },
    {
        id: 'cat_deudas',
        name: 'Pagos/Deudas',
        type: 'payment',
        isFixedExpenseCandidate: true,
        subCategories: [
            'Banco de Bogotá',
            'Colsubsidio',
            'Sistecredito JH',
            'Sistecredito TH',
            'Addi JH'
        ]
    },
    {
        id: 'cat_varios',
        name: 'Gastos Varios/Ordinario',
        type: 'expense',
        subCategories: [
            'Hogar',
            'Gatos',
            'Universidad',
            'Regalos',
            'Otros'
        ]
    },
    // Categoría especial interna para ahorros automáticos
    {
        id: 'cat_sys_savings',
        name: 'Ahorro Automático por Superávit',
        type: 'income'
    }
];
const FinanceContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const FinanceProvider = ({ children })=>{
    _s();
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_ACCOUNTS);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_CATEGORIES);
    const [fixedRules, setFixedRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // --- PERSISTENCIA (Cargar y Guardar en localStorage) ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinanceProvider.useEffect": ()=>{
            const loadData = {
                "FinanceProvider.useEffect.loadData": ()=>{
                    const savedTx = localStorage.getItem('transactions');
                    const savedAcc = localStorage.getItem('accounts');
                    const savedCat = localStorage.getItem('categories');
                    const savedRules = localStorage.getItem('fixedRules');
                    if (savedTx) setTransactions(JSON.parse(savedTx));
                    // IMPORTANTE: Si ya hay cuentas guardadas, USARLAS, si no, usar las INITIAL con los saldos de tu imagen.
                    if (savedAcc) {
                        setAccounts(JSON.parse(savedAcc));
                    } else {
                        // Primera vez que corre la app, asegurar que los saldos iniciales sean los correctos
                        setAccounts(INITIAL_ACCOUNTS);
                    }
                    if (savedCat) setCategories(JSON.parse(savedCat));
                    if (savedRules) setFixedRules(JSON.parse(savedRules));
                    setIsInitialized(true);
                }
            }["FinanceProvider.useEffect.loadData"];
            loadData();
        }
    }["FinanceProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinanceProvider.useEffect": ()=>{
            if (!isInitialized) return; // No guardar hasta que haya cargado
            localStorage.setItem('transactions', JSON.stringify(transactions));
            localStorage.setItem('accounts', JSON.stringify(accounts));
            localStorage.setItem('categories', JSON.stringify(categories));
            localStorage.setItem('fixedRules', JSON.stringify(fixedRules));
        }
    }["FinanceProvider.useEffect"], [
        transactions,
        accounts,
        categories,
        fixedRules,
        isInitialized
    ]);
    // --- LÓGICA CENTRAL: Actualizar Saldos ---
    // Recalcula los saldos de las cuentas basado en TODAS las transacciones. Es más seguro que sumar/restar.
    const recalculateBalances = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FinanceProvider.useCallback[recalculateBalances]": (currentTransactions, currentAccounts)=>{
            const newAccountsMap = new Map(currentAccounts.map({
                "FinanceProvider.useCallback[recalculateBalances]": (acc)=>[
                        acc.id,
                        {
                            ...acc,
                            balance: 0
                        }
                    ]
            }["FinanceProvider.useCallback[recalculateBalances]"])); // Reiniciar a 0 para recalcular
        // 1. Restaurar saldos iniciales "base" (Esto es un truco porque no tenemos DB real.
        // En un sistema real, el saldo es la suma de inputs y outputs históricos.
        // Para este prototipo, usaremos los saldos de INITIAL_ACCOUNTS como punto de partida si no hay transacciones, 
        // pero esto es complejo sin una tabla de "saldos iniciales". 
        // SIMPLIFICACIÓN PARA PROTOTIPO: El saldo es simplemente la suma algebraica de todas las transacciones.
        // NOTA: Para que esto funcione bien, deberías crear transacciones de "Saldo Inicial" el primer día.
        // POR AHORA: Usaremos una lógica incremental que funciona bien para el uso diario.
        }
    }["FinanceProvider.useCallback[recalculateBalances]"], []);
    // --- LÓGICA DE NEGOCIO PRINCIPAL ---
    // 1. Agregar Transacción (Manual o Automática)
    const addTransaction = (t)=>{
        const newTx = {
            ...t,
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            hasGeneratedSavings: false
        };
        // LÓGICA DE AHORRO AUTOMÁTICO: Si es un gasto fijo y pagué MENOS de lo presupuestado.
        if (newTx.type === 'expense' && newTx.isFixed && newTx.budgetedAmount && newTx.amount < newTx.budgetedAmount) {
            const savingsAmount = newTx.budgetedAmount - newTx.amount;
            // Crear automáticamente la transacción de ingreso al ahorro
            const savingsTx = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: 'income',
                amount: savingsAmount,
                accountId: 'acc_dav_th',
                categoryId: 'cat_sys_savings',
                description: `Ahorro automático por superávit en: ${newTx.description}`,
                date: newTx.date,
                isFixed: false
            };
            setTransactions((prev)=>[
                    newTx,
                    savingsTx,
                    ...prev
                ]);
            // Actualizar saldos (Pago del gasto Y entrada del ahorro)
            updateAccountBalance(newTx.accountId, -newTx.amount);
            updateAccountBalance(savingsTx.accountId, savingsTx.amount);
            newTx.hasGeneratedSavings = true; // Marcar para no duplicar si se edita
        } else {
            // Transacción normal
            setTransactions((prev)=>[
                    newTx,
                    ...prev
                ]);
            const multiplier = newTx.type === 'income' ? 1 : -1;
            updateAccountBalance(newTx.accountId, newTx.amount * multiplier);
        }
    };
    // Helper simple para actualizar saldos de forma incremental
    const updateAccountBalance = (accountId, amountChange)=>{
        setAccounts((prevAccounts)=>prevAccounts.map((acc)=>acc.id === accountId ? {
                    ...acc,
                    balance: acc.balance + amountChange
                } : acc));
    };
    // 2. Función para generar gastos fijos al inicio del mes
    const generateMonthlyFixedExpenses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FinanceProvider.useCallback[generateMonthlyFixedExpenses]": ()=>{
            if (!isInitialized || fixedRules.length === 0) return;
            const now = new Date();
            const startOfCurrentMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(now);
            // Verificar si ya se corrió este proceso este mes
            const alreadyGenerated = transactions.some({
                "FinanceProvider.useCallback[generateMonthlyFixedExpenses].alreadyGenerated": (tx)=>tx.isFixed && tx.fixedRuleId && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameMonth"])(new Date(tx.date), now)
            }["FinanceProvider.useCallback[generateMonthlyFixedExpenses].alreadyGenerated"]);
            if (alreadyGenerated) return;
            console.log("Generando gastos fijos del mes...");
            const newTransactions = fixedRules.map({
                "FinanceProvider.useCallback[generateMonthlyFixedExpenses].newTransactions": (rule)=>{
                    // Crear la fecha para este mes en el día configurado
                    const txDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDate"])(startOfCurrentMonth, rule.dayOfMonth);
                    return {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: 'expense',
                        amount: 0,
                        budgetedAmount: rule.budgetedAmount,
                        accountId: rule.accountIdToCharge,
                        categoryId: rule.categoryId,
                        subCategoryId: rule.subCategoryId,
                        description: `${rule.description} (Proyectado)`,
                        date: txDate.toISOString(),
                        isFixed: true,
                        fixedRuleId: rule.id
                    };
                }
            }["FinanceProvider.useCallback[generateMonthlyFixedExpenses].newTransactions"]);
            // Agregamos en lote y NO actualizamos saldos porque el amount real es 0.
            setTransactions({
                "FinanceProvider.useCallback[generateMonthlyFixedExpenses]": (prev)=>[
                        ...newTransactions,
                        ...prev
                    ]
            }["FinanceProvider.useCallback[generateMonthlyFixedExpenses]"]);
        }
    }["FinanceProvider.useCallback[generateMonthlyFixedExpenses]"], [
        isInitialized,
        fixedRules,
        transactions
    ]);
    // Ejecutar la generación de gastos fijos cuando carga la app y el contexto está listo
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinanceProvider.useEffect": ()=>{
            if (isInitialized) {
                generateMonthlyFixedExpenses();
            }
        }
    }["FinanceProvider.useEffect"], [
        isInitialized,
        generateMonthlyFixedExpenses
    ]);
    // --- FUNCIONES CRUD (Simplificadas para el ejemplo, se pueden expandir) ---
    // NOTA IMPORTANTE: Para un sistema de producción real, editar una transacción vieja
    // debería recalcular todos los saldos desde esa fecha. Aquí usamos una aproximación simple.
    const updateTransaction = (updatedTx)=>{
        setTransactions((prev)=>prev.map((tx)=>tx.id === updatedTx.id ? updatedTx : tx));
        // NOTA: Aquí falta una lógica compleja para revertir el saldo anterior y aplicar el nuevo.
        // Para este prototipo, es mejor borrar y volver a crear si el monto cambia drásticamente.
        // Se implementará una versión simple: calcular la diferencia.
        const oldTx = transactions.find((t)=>t.id === updatedTx.id);
        if (!oldTx) return;
        const oldEffect = oldTx.type === 'income' ? oldTx.amount : -oldTx.amount;
        const newEffect = updatedTx.type === 'income' ? updatedTx.amount : -updatedTx.amount;
        if (oldTx.accountId === updatedTx.accountId) {
            // Misma cuenta, solo ajustar la diferencia
            updateAccountBalance(updatedTx.accountId, newEffect - oldEffect);
        } else {
            // Cambio de cuenta: revertir en la vieja, aplicar en la nueva
            updateAccountBalance(oldTx.accountId, -oldEffect);
            updateAccountBalance(updatedTx.accountId, newEffect);
        }
        // REVISAR LÓGICA DE AHORRO AL EDITAR (Si ahora sobra dinero y antes no)
        if (updatedTx.type === 'expense' && updatedTx.isFixed && updatedTx.budgetedAmount && !updatedTx.hasGeneratedSavings) {
            if (updatedTx.amount < updatedTx.budgetedAmount) {
                const savingsAmount = updatedTx.budgetedAmount - updatedTx.amount;
                const savingsTx = {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                    type: 'income',
                    amount: savingsAmount,
                    accountId: 'acc_dav_th',
                    categoryId: 'cat_sys_savings',
                    description: `Ahorro automático (corrección): ${updatedTx.description}`,
                    date: new Date().toISOString(),
                    isFixed: false
                };
                setTransactions((prev)=>[
                        savingsTx,
                        ...prev
                    ]);
                updateAccountBalance(savingsTx.accountId, savingsTx.amount);
                // Marcar la original como que ya generó ahorro
                setTransactions((prev)=>prev.map((tx)=>tx.id === updatedTx.id ? {
                            ...tx,
                            hasGeneratedSavings: true
                        } : tx));
            }
        }
    };
    const deleteTransaction = (id)=>{
        const txToDelete = transactions.find((tx)=>tx.id === id);
        if (!txToDelete) return;
        // Revertir saldo
        const multiplier = txToDelete.type === 'income' ? -1 : 1; // Inverso para borrar
        updateAccountBalance(txToDelete.accountId, txToDelete.amount * multiplier);
        setTransactions((prev)=>prev.filter((tx)=>tx.id !== id));
    };
    // Admin functions placeholders
    const addCategory = (c)=>setCategories((prev)=>[
                ...prev,
                c
            ]);
    const updateCategory = (c)=>setCategories((prev)=>prev.map((cat)=>cat.id === c.id ? c : cat));
    const addAccount = (a)=>setAccounts((prev)=>[
                ...prev,
                a
            ]);
    const updateAccount = (a)=>setAccounts((prev)=>prev.map((acc)=>acc.id === a.id ? a : acc));
    const addFixedRule = (r)=>setFixedRules((prev)=>[
                ...prev,
                r
            ]);
    const updateFixedRule = (r)=>setFixedRules((prev)=>prev.map((rule)=>rule.id === r.id ? r : rule));
    const deleteFixedRule = (id)=>setFixedRules((prev)=>prev.filter((rule)=>rule.id !== id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FinanceContext.Provider, {
        value: {
            accounts,
            transactions,
            categories,
            fixedRules,
            addTransaction,
            updateTransaction,
            deleteTransaction,
            addCategory,
            updateCategory,
            addAccount,
            updateAccount,
            addFixedRule,
            updateFixedRule,
            deleteFixedRule
        },
        children: isInitialized ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-center",
            children: "Cargando finanzas..."
        }, void 0, false, {
            fileName: "[project]/Jth/Git Repository/Home/finance-home/context/FinanceContext.tsx",
            lineNumber: 274,
            columnNumber: 35
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Jth/Git Repository/Home/finance-home/context/FinanceContext.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(FinanceProvider, "DQnF36xB83AZkCkhyosLCwq3maI=");
_c = FinanceProvider;
const useFinance = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(FinanceContext);
    if (!context) throw new Error("useFinance must be used within FinanceProvider");
    return context;
};
_s1(useFinance, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "FinanceProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Jth/Git Repository/Home/finance-home/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/dashboard/RealisticAccountCard.tsx
__turbopack_context__.s([
    "default",
    ()=>RealisticAccountCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/landmark.js [app-client] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/banknote.js [app-client] (ecmascript) <export default as Banknote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/lib/utils.ts [app-client] (ecmascript)");
;
;
;
function RealisticAccountCard({ account }) {
    // Elegir icono según el tipo de "banco"
    const Icon = account.bank === 'Efectivo' ? __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"] : account.bank === 'Nequi' || account.bank === 'DaviPlata' ? __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"] : account.bank === 'Sodexo' ? __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"] : __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative overflow-hidden rounded-xl p-4 text-white shadow-lg transition-transform hover:scale-[1.02]", "bg-gradient-to-br", account.colorTheme || "from-zinc-700 to-zinc-900", account.balance === 0 ? "opacity-75 grayscale-[50%]" : "" // Efecto visual si está en 0
        ),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none",
                style: {
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
                }
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex flex-col h-full justify-between min-h-[100px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold text-sm opacity-90",
                                        children: account.bank
                                    }, void 0, false, {
                                        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                                        lineNumber: 26,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs opacity-75",
                                        children: [
                                            account.name,
                                            " (",
                                            account.owner,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                                        lineNumber: 27,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "opacity-80",
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs opacity-75 mb-1",
                                children: "Saldo Disponible"
                            }, void 0, false, {
                                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                                lineNumber: 33,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-mono font-bold tracking-tight",
                                children: [
                                    "$",
                                    account.balance.toLocaleString('es-CO')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                                lineNumber: 34,
                                columnNumber: 12
                            }, this),
                            account.last4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs opacity-60 text-right mt-1",
                                children: [
                                    "**** ",
                                    account.last4
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                                lineNumber: 37,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = RealisticAccountCard;
var _c;
__turbopack_context__.k.register(_c, "RealisticAccountCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Jth/Git Repository/Home/finance-home/components/dashboard/AccountsSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/dashboard/AccountsSidebar.tsx
__turbopack_context__.s([
    "default",
    ()=>AccountsSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$context$2f$FinanceContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/context/FinanceContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$components$2f$dashboard$2f$RealisticAccountCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/components/dashboard/RealisticAccountCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AccountsSidebar({ className }) {
    _s();
    const { accounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$context$2f$FinanceContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFinance"])();
    const visibleAccounts = accounts.filter((a)=>!a.isHidden);
    const totalBalance = visibleAccounts.reduce((sum, acc)=>sum + acc.balance, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: `bg-zinc-900/50 border-l border-zinc-800 p-4 overflow-y-auto ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-bold mb-4 text-zinc-300",
                children: "Mis Cuentas"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/AccountsSidebar.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-zinc-950 rounded-lg border border-zinc-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-zinc-500",
                        children: "Saldo Total Global"
                    }, void 0, false, {
                        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/AccountsSidebar.tsx",
                        lineNumber: 15,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-bold text-emerald-400",
                        children: [
                            "$",
                            totalBalance.toLocaleString('es-CO')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/AccountsSidebar.tsx",
                        lineNumber: 16,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/AccountsSidebar.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: visibleAccounts.map((acc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$components$2f$dashboard$2f$RealisticAccountCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        account: acc
                    }, acc.id, false, {
                        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/AccountsSidebar.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/AccountsSidebar.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/dashboard/AccountsSidebar.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(AccountsSidebar, "yokKCQdLeHjRmCQn/Pi4G7/sR40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$context$2f$FinanceContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFinance"]
    ];
});
_c = AccountsSidebar;
var _c;
__turbopack_context__.k.register(_c, "AccountsSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CircleCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as InfoIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/octagon-x.js [app-client] (ecmascript) <export default as OctagonXIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as TriangleAlertIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const Toaster = ({ ...props })=>{
    _s();
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        icons: {
            success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__["CircleCheckIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 21,
                columnNumber: 18
            }, void 0),
            info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__["InfoIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 22,
                columnNumber: 15
            }, void 0),
            warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__["TriangleAlertIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 23,
                columnNumber: 18
            }, void 0),
            error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__["OctagonXIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 24,
                columnNumber: 16
            }, void 0),
            loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__["Loader2Icon"], {
                className: "size-4 animate-spin"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 25,
                columnNumber: 18
            }, void 0)
        },
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)"
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Toaster, "EriOrahfenYKDCErPq+L6926Dw4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Jth_Git%20Repository_Home_finance-home_cfa538cb._.js.map