module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/actions.ts
/* __next_internal_action_entry_do_not_use__ [{"00039bbf824c6cf6f3f31d679e5454b7087aa83620":"getFinanceData","00f4ccd6feba2f51d8fdbe57d41f07dbd60b756342":"seedDatabase","402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06":"createFixedRule","402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a":"deleteSimulatorItem","407c575f36b6abf59084d90735f41e90aa840e68ec":"createCategory","40a3a35a0de80c6315f5b4b808492893738d32a019":"saveSimulatorItem","40a6494eb23e86774bbc4cd3b762988938ca6ab1f9":"createAccount","40d1d772545060c014e567ca1cc45ca81fa41e0879":"createTransaction","40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382":"deleteAccount"},"",""] */ __turbopack_context__.s([
    "createAccount",
    ()=>createAccount,
    "createCategory",
    ()=>createCategory,
    "createFixedRule",
    ()=>createFixedRule,
    "createTransaction",
    ()=>createTransaction,
    "deleteAccount",
    ()=>deleteAccount,
    "deleteSimulatorItem",
    ()=>deleteSimulatorItem,
    "getFinanceData",
    ()=>getFinanceData,
    "saveSimulatorItem",
    ()=>saveSimulatorItem,
    "seedDatabase",
    ()=>seedDatabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
// Evita instanciar múltiples clientes en desarrollo
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
async function getFinanceData() {
    const accounts = await prisma.account.findMany();
    const categories = await prisma.category.findMany();
    const transactions = await prisma.transaction.findMany({
        orderBy: {
            date: 'desc'
        }
    });
    const fixedRules = await prisma.fixedRule.findMany();
    const simulatorItems = await prisma.simulatorItem.findMany();
    // Convertimos datos complejos para que React los entienda (Fechas y JSON)
    const parsedCategories = categories.map((c)=>({
            ...c,
            subCategories: c.subCategories ? JSON.parse(c.subCategories) : []
        }));
    const parsedTransactions = transactions.map((t)=>({
            ...t,
            date: t.date.toISOString(),
            accountId: t.accountId,
            categoryId: t.categoryId
        }));
    return {
        accounts,
        categories: parsedCategories,
        transactions: parsedTransactions,
        fixedRules,
        simulatorItems
    };
}
async function createTransaction(data) {
    // Convertimos la fecha string a Date real para la DB
    await prisma.transaction.create({
        data: {
            type: data.type,
            amount: data.amount,
            budgetedAmount: data.budgetedAmount,
            accountId: data.accountId,
            categoryId: data.categoryId,
            description: data.description,
            date: new Date(data.date),
            isFixed: data.isFixed || false,
            isSavings: data.isSavings || false
        }
    });
    // Actualizar Saldo de la Cuenta
    const multiplier = data.type === 'income' ? 1 : -1;
    await prisma.account.update({
        where: {
            id: data.accountId
        },
        data: {
            balance: {
                increment: data.amount * multiplier
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/'); // Recarga la página automáticamente
}
async function createAccount(data) {
    await prisma.account.create({
        data
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function deleteAccount(id) {
    await prisma.account.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function createCategory(data) {
    await prisma.category.create({
        data: {
            name: data.name,
            type: data.type,
            subCategories: JSON.stringify(data.subCategories || [])
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function saveSimulatorItem(data) {
    // Si existe ID lo actualiza, si no, crea uno nuevo
    const existing = await prisma.simulatorItem.findUnique({
        where: {
            id: data.id
        }
    });
    if (existing) {
        await prisma.simulatorItem.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                amount: data.amount
            }
        });
    } else {
        await prisma.simulatorItem.create({
            data
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/simulator');
}
async function deleteSimulatorItem(id) {
    await prisma.simulatorItem.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/simulator');
}
async function createFixedRule(data) {
    await prisma.fixedRule.create({
        data
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function seedDatabase() {
    // 1. Crear Cuentas por defecto
    const acc1 = await prisma.account.create({
        data: {
            name: 'Davivienda',
            bank: 'Davivienda',
            type: 'bank',
            owner: 'Jhonattan',
            color: '#ef4444',
            balance: 0
        }
    });
    const acc2 = await prisma.account.create({
        data: {
            name: 'Efectivo',
            bank: 'Cartera',
            type: 'cash',
            owner: 'Jhonattan',
            color: '#22c55e',
            balance: 0
        }
    });
    // 2. Crear Categorías por defecto
    await prisma.category.create({
        data: {
            name: 'Salario',
            type: 'income',
            subCategories: JSON.stringify([
                'Nómina',
                'Extra'
            ])
        }
    });
    await prisma.category.create({
        data: {
            name: 'Alimentación',
            type: 'expense',
            subCategories: JSON.stringify([
                'Mercado',
                'Restaurante'
            ])
        }
    });
    await prisma.category.create({
        data: {
            name: 'Transporte',
            type: 'expense',
            subCategories: JSON.stringify([
                'Uber',
                'Bus',
                'Gasolina'
            ])
        }
    });
    // Categoría especial para Ahorros
    await prisma.category.create({
        data: {
            id: 'cat_sys_savings',
            name: 'Ahorro Automático',
            type: 'income',
            subCategories: '[]'
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getFinanceData,
    createTransaction,
    createAccount,
    deleteAccount,
    createCategory,
    saveSimulatorItem,
    deleteSimulatorItem,
    createFixedRule,
    seedDatabase
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFinanceData, "00039bbf824c6cf6f3f31d679e5454b7087aa83620", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTransaction, "40d1d772545060c014e567ca1cc45ca81fa41e0879", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAccount, "40a6494eb23e86774bbc4cd3b762988938ca6ab1f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAccount, "40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "407c575f36b6abf59084d90735f41e90aa840e68ec", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveSimulatorItem, "40a3a35a0de80c6315f5b4b808492893738d32a019", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSimulatorItem, "402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createFixedRule, "402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(seedDatabase, "00f4ccd6feba2f51d8fdbe57d41f07dbd60b756342", null);
}),
"[project]/Jth/Git Repository/Home/finance-home/.next-internal/server/app/simulator/page/actions.js { ACTIONS_MODULE0 => \"[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/Jth/Git Repository/Home/finance-home/.next-internal/server/app/simulator/page/actions.js { ACTIONS_MODULE0 => \"[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00039bbf824c6cf6f3f31d679e5454b7087aa83620",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFinanceData"],
    "402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createFixedRule"],
    "402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSimulatorItem"],
    "407c575f36b6abf59084d90735f41e90aa840e68ec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategory"],
    "40a3a35a0de80c6315f5b4b808492893738d32a019",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveSimulatorItem"],
    "40a6494eb23e86774bbc4cd3b762988938ca6ab1f9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAccount"],
    "40d1d772545060c014e567ca1cc45ca81fa41e0879",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"],
    "40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAccount"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f2e$next$2d$internal$2f$server$2f$app$2f$simulator$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Jth/Git Repository/Home/finance-home/.next-internal/server/app/simulator/page/actions.js { ACTIONS_MODULE0 => "[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3a6c4924._.js.map