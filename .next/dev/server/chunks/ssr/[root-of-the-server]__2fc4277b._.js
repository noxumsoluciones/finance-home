module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"use client";
;
;
const FinanceContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// DATOS INICIALES (Tus listas personalizadas)
const INITIAL_ACCOUNTS = [
    {
        id: '1',
        name: 'Thannia',
        bank: 'Davivienda',
        owner: 'Thannia',
        balance: 0,
        isHidden: false,
        last4: '8901'
    },
    {
        id: '2',
        name: 'Jhonattan',
        bank: 'Davivienda',
        owner: 'Jhonattan',
        balance: 0,
        isHidden: false,
        last4: '1234'
    },
    {
        id: '3',
        name: 'Jhonattan',
        bank: 'Banco de Bogotá',
        owner: 'Jhonattan',
        balance: 0,
        isHidden: false,
        last4: '5678'
    },
    {
        id: '4',
        name: 'Jhonattan',
        bank: 'Nequi',
        owner: 'Jhonattan',
        balance: 0,
        isHidden: false,
        last4: '3321'
    },
    {
        id: '5',
        name: 'Thannia',
        bank: 'Nequi',
        owner: 'Thannia',
        balance: 0,
        isHidden: false,
        last4: '4455'
    },
    {
        id: '6',
        name: 'Thannia',
        bank: 'DaviPlata',
        owner: 'Thannia',
        balance: 0,
        isHidden: false,
        last4: '9988'
    }
];
const INITIAL_CATEGORIES = [
    {
        id: 'inc1',
        name: 'MFC',
        type: 'income'
    },
    {
        id: 'inc2',
        name: 'Katatek',
        type: 'income'
    },
    {
        id: 'inc3',
        name: 'Noxum Soluciones',
        type: 'income'
    },
    {
        id: 'inc4',
        name: 'Prima',
        type: 'income'
    },
    {
        id: 'exp1',
        name: 'Casa',
        type: 'expense',
        subCategories: [
            'Ahorro',
            'Servicios',
            'Comida',
            'Moto'
        ]
    },
    {
        id: 'exp2',
        name: 'Ordinario',
        type: 'expense',
        subCategories: [
            'Universidad',
            'Web Cam',
            'Gasto Comida',
            'Hogar',
            'Otros'
        ]
    },
    {
        id: 'pay1',
        name: 'Pagos Bancarios',
        type: 'expense',
        subCategories: [
            'Banco de Bogota',
            'Colsubsidio',
            'Sistecredito JH',
            'Sistecredito TH',
            'Addi JH'
        ]
    }
];
const FinanceProvider = ({ children })=>{
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INITIAL_ACCOUNTS);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INITIAL_CATEGORIES);
    // Cargar de localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedTx = localStorage.getItem('transactions');
        const savedAcc = localStorage.getItem('accounts');
        if (savedTx) setTransactions(JSON.parse(savedTx));
        if (savedAcc) setAccounts(JSON.parse(savedAcc));
    }, []);
    // Guardar cambios
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }, [
        transactions,
        accounts
    ]);
    const addTransaction = (t)=>{
        const newTx = {
            ...t,
            id: crypto.randomUUID()
        };
        setTransactions((prev)=>[
                newTx,
                ...prev
            ]);
        // Actualizar saldo de cuenta automáticamente
        setAccounts((prev)=>prev.map((acc)=>{
                if (acc.id === t.accountId) {
                    return {
                        ...acc,
                        balance: t.type === 'income' ? acc.balance + t.amount : acc.balance - t.amount
                    };
                }
                return acc;
            }));
    };
    const updateAccountBalance = (id, newBalance)=>{
        setAccounts((prev)=>prev.map((acc)=>acc.id === id ? {
                    ...acc,
                    balance: newBalance
                } : acc));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinanceContext.Provider, {
        value: {
            accounts,
            transactions,
            categories,
            addTransaction,
            updateAccountBalance
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Jth/Git Repository/Home/finance-home/context/FinanceContext.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useFinance = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(FinanceContext);
    if (!context) throw new Error("useFinance must be used within FinanceProvider");
    return context;
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2fc4277b._.js.map