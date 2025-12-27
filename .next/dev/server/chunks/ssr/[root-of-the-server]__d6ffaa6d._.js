module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/Jth/Git Repository/Home/finance-home/context/FinanceContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinanceProvider",
    ()=>FinanceProvider,
    "useFinance",
    ()=>useFinance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/date-fns/startOfMonth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/date-fns/isSameMonth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/date-fns/setDate.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/uuid/dist-node/v4.js [app-ssr] (ecmascript) <export default as v4>");
"use client";
;
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
        balance: 1168800,
        isHidden: false,
        last4: '8901',
        colorTheme: 'from-red-700 to-red-900'
    },
    {
        id: 'acc_dav_jh',
        name: 'Davivienda JH',
        bank: 'Davivienda',
        owner: 'Jhonattan',
        balance: 520000,
        isHidden: false,
        last4: '1234',
        colorTheme: 'from-red-700 to-red-900'
    },
    {
        id: 'acc_bdb_jh',
        name: 'BDB JH',
        bank: 'Banco de Bogotá',
        owner: 'Jhonattan',
        balance: 4801431,
        isHidden: false,
        last4: '5678',
        colorTheme: 'from-blue-800 to-blue-950'
    },
    {
        id: 'acc_neq_jh',
        name: 'Nequi JH',
        bank: 'Nequi',
        owner: 'Jhonattan',
        balance: 240000,
        isHidden: false,
        last4: '3321',
        colorTheme: 'from-purple-600 to-pink-600'
    },
    {
        id: 'acc_neq_th',
        name: 'Nequi TH',
        bank: 'Nequi',
        owner: 'Thannia',
        balance: 9000,
        isHidden: false,
        last4: '4455',
        colorTheme: 'from-purple-600 to-pink-600'
    },
    {
        id: 'acc_efec',
        name: 'Efectivo Casa',
        bank: 'Efectivo',
        owner: 'Casa',
        balance: 200000,
        isHidden: false,
        colorTheme: 'from-green-700 to-emerald-900'
    },
    {
        id: 'acc_sodexo',
        name: 'Sodexo',
        bank: 'Sodexo',
        owner: 'Ambos',
        balance: 66896,
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
const FinanceContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const FinanceProvider = ({ children })=>{
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INITIAL_ACCOUNTS);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INITIAL_CATEGORIES);
    const [fixedRules, setFixedRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // --- PERSISTENCIA (Cargar y Guardar en localStorage) ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadData = ()=>{
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
        };
        loadData();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isInitialized) return; // No guardar hasta que haya cargado
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('accounts', JSON.stringify(accounts));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('fixedRules', JSON.stringify(fixedRules));
    }, [
        transactions,
        accounts,
        categories,
        fixedRules,
        isInitialized
    ]);
    // --- LÓGICA CENTRAL: Actualizar Saldos ---
    // Recalcula los saldos de las cuentas basado en TODAS las transacciones. Es más seguro que sumar/restar.
    const recalculateBalances = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((currentTransactions, currentAccounts)=>{
        const newAccountsMap = new Map(currentAccounts.map((acc)=>[
                acc.id,
                {
                    ...acc,
                    balance: 0
                }
            ])); // Reiniciar a 0 para recalcular
    // 1. Restaurar saldos iniciales "base" (Esto es un truco porque no tenemos DB real.
    // En un sistema real, el saldo es la suma de inputs y outputs históricos.
    // Para este prototipo, usaremos los saldos de INITIAL_ACCOUNTS como punto de partida si no hay transacciones, 
    // pero esto es complejo sin una tabla de "saldos iniciales". 
    // SIMPLIFICACIÓN PARA PROTOTIPO: El saldo es simplemente la suma algebraica de todas las transacciones.
    // NOTA: Para que esto funcione bien, deberías crear transacciones de "Saldo Inicial" el primer día.
    // POR AHORA: Usaremos una lógica incremental que funciona bien para el uso diario.
    }, []);
    // --- LÓGICA DE NEGOCIO PRINCIPAL ---
    // 1. Agregar Transacción (Manual o Automática)
    const addTransaction = (t)=>{
        const newTx = {
            ...t,
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            hasGeneratedSavings: false
        };
        // LÓGICA DE AHORRO AUTOMÁTICO: Si es un gasto fijo y pagué MENOS de lo presupuestado.
        if (newTx.type === 'expense' && newTx.isFixed && newTx.budgetedAmount && newTx.amount < newTx.budgetedAmount) {
            const savingsAmount = newTx.budgetedAmount - newTx.amount;
            // Crear automáticamente la transacción de ingreso al ahorro
            const savingsTx = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
    const generateMonthlyFixedExpenses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!isInitialized || fixedRules.length === 0) return;
        const now = new Date();
        const startOfCurrentMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startOfMonth"])(now);
        // Verificar si ya se corrió este proceso este mes
        const alreadyGenerated = transactions.some((tx)=>tx.isFixed && tx.fixedRuleId && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$isSameMonth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSameMonth"])(new Date(tx.date), now));
        if (alreadyGenerated) return;
        console.log("Generando gastos fijos del mes...");
        const newTransactions = fixedRules.map((rule)=>{
            // Crear la fecha para este mes en el día configurado
            const txDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDate"])(startOfCurrentMonth, rule.dayOfMonth);
            return {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
        });
        // Agregamos en lote y NO actualizamos saldos porque el amount real es 0.
        setTransactions((prev)=>[
                ...newTransactions,
                ...prev
            ]);
    }, [
        isInitialized,
        fixedRules,
        transactions
    ]);
    // Ejecutar la generación de gastos fijos cuando carga la app y el contexto está listo
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isInitialized) {
            generateMonthlyFixedExpenses();
        }
    }, [
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
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinanceContext.Provider, {
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
        children: isInitialized ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
const useFinance = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(FinanceContext);
    if (!context) throw new Error("useFinance must be used within FinanceProvider");
    return context;
};
}),
"[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CircleCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as InfoIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/octagon-x.js [app-ssr] (ecmascript) <export default as OctagonXIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as TriangleAlertIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        icons: {
            success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__["CircleCheckIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 21,
                columnNumber: 18
            }, void 0),
            info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__["InfoIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 22,
                columnNumber: 15
            }, void 0),
            warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__["TriangleAlertIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 23,
                columnNumber: 18
            }, void 0),
            error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__["OctagonXIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Jth/Git Repository/Home/finance-home/components/ui/sonner.tsx",
                lineNumber: 24,
                columnNumber: 16
            }, void 0),
            loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__["Loader2Icon"], {
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
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d6ffaa6d._.js.map