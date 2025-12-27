module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/actions.ts
/* __next_internal_action_entry_do_not_use__ [{"00039bbf824c6cf6f3f31d679e5454b7087aa83620":"getFinanceData","00f4ccd6feba2f51d8fdbe57d41f07dbd60b756342":"seedDatabase","40235ab7bf48351d601dd29c63317b315360906a50":"deleteFixedRule","402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06":"createFixedRule","402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a":"deleteSimulatorItem","40316778cb353211f011f5d54bf25a3dfbe3e909e1":"updateCategory","406c20e6a69942bace393f44cef982f40e5508fbfd":"deleteTransaction","4079df49fafe45a1ab1e12d9a3bd024a49017ff973":"deleteCategory","407c575f36b6abf59084d90735f41e90aa840e68ec":"createCategory","4086d78b4cf852eced4c082dd17fb545b408bf00c1":"updateFixedRule","40a3a35a0de80c6315f5b4b808492893738d32a019":"saveSimulatorItem","40a6494eb23e86774bbc4cd3b762988938ca6ab1f9":"createAccount","40d1d772545060c014e567ca1cc45ca81fa41e0879":"createTransaction","40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382":"deleteAccount","40f8ff2eb8230be2e90afdebebc50430d1370f14e4":"updateAccount"},"",""] */ __turbopack_context__.s([
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
    "deleteCategory",
    ()=>deleteCategory,
    "deleteFixedRule",
    ()=>deleteFixedRule,
    "deleteSimulatorItem",
    ()=>deleteSimulatorItem,
    "deleteTransaction",
    ()=>deleteTransaction,
    "getFinanceData",
    ()=>getFinanceData,
    "saveSimulatorItem",
    ()=>saveSimulatorItem,
    "seedDatabase",
    ()=>seedDatabase,
    "updateAccount",
    ()=>updateAccount,
    "updateCategory",
    ()=>updateCategory,
    "updateFixedRule",
    ()=>updateFixedRule
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
        categories: categories.map((c)=>({
                ...c,
                subCategories: c.subCategories ? JSON.parse(c.subCategories) : []
            })),
        transactions: transactions.map((t)=>({
                ...t,
                date: t.date.toISOString()
            })),
        fixedRules,
        simulatorItems
    };
}
async function createTransaction(data) {
    const date = new Date(data.date);
    // CASO 1: TRANSFERENCIA ENTRE CUENTAS
    if (data.type === 'transfer') {
        // 1. Salida (Gasto) de Cuenta A
        await prisma.transaction.create({
            data: {
                type: 'expense',
                amount: data.amount,
                accountId: data.accountId,
                description: `Transferencia a: ${data.destAccountName}`,
                date: date,
                isTransfer: true,
                relatedAccountId: data.relatedAccountId,
                didWithdraw: true
            }
        });
        // Restar de Origen
        await prisma.account.update({
            where: {
                id: data.accountId
            },
            data: {
                balance: {
                    decrement: data.amount
                }
            }
        });
        // 2. Entrada (Ingreso) a Cuenta B
        await prisma.transaction.create({
            data: {
                type: 'income',
                amount: data.amount,
                accountId: data.relatedAccountId,
                description: `Recibido de: ${data.originAccountName}`,
                date: date,
                isTransfer: true,
                relatedAccountId: data.accountId,
                didWithdraw: false // Irrelevante en ingreso, pero por consistencia
            }
        });
        // Sumar a Destino
        await prisma.account.update({
            where: {
                id: data.relatedAccountId
            },
            data: {
                balance: {
                    increment: data.amount
                }
            }
        });
    } else {
        // Si es "Ahorro que NO se retira", no descontamos saldo
        const shouldUpdateBalance = data.type === 'expense' ? data.didWithdraw : true;
        await prisma.transaction.create({
            data: {
                type: data.type,
                amount: data.amount,
                budgetedAmount: data.budgetedAmount,
                accountId: data.accountId,
                categoryId: data.categoryId,
                description: data.description,
                date: date,
                isFixed: data.isFixed || false,
                isSavings: data.isSavings || false,
                didWithdraw: data.didWithdraw ?? true
            }
        });
        if (shouldUpdateBalance) {
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
        }
        // CASO ESPECIAL: Ahorro (se retire o no) -> Sumar a la "Cartera de Ahorro" virtual
        // Buscamos o creamos una cuenta virtual de ahorro para llevar el registro
        if (data.isSavings) {
            // Buscamos una cuenta tipo 'savings_virtual'
            let savingsAcc = await prisma.account.findFirst({
                where: {
                    type: 'savings_virtual'
                }
            });
            if (!savingsAcc) {
                savingsAcc = await prisma.account.create({
                    data: {
                        name: 'Bolsillo Ahorros Global',
                        bank: 'Sistema',
                        type: 'savings_virtual',
                        owner: 'Todos',
                        color: '#3b82f6'
                    }
                });
            }
            // Sumamos el valor a esa cuenta virtual (siempre suma, nunca resta)
            await prisma.account.update({
                where: {
                    id: savingsAcc.id
                },
                data: {
                    balance: {
                        increment: data.amount
                    }
                }
            });
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
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
async function deleteCategory(id) {
    await prisma.category.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function updateCategory(data) {
    // Si vienen subcategorías, asegúrate de stringificarlas si es necesario, 
    // pero como Prisma espera string, asumiremos que ya lo manejas o lo convertimos aquí.
    await prisma.category.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            type: data.type,
            subCategories: JSON.stringify(data.subCategories) // Guardamos el array como texto
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
            bank: 'Bolsillo',
            type: 'cash',
            owner: 'Jhonattan',
            color: '#22c55e',
            balance: 0
        }
    });
    // 2. Crear Categorías por defecto
    await prisma.category.create({
        data: {
            name: 'Efectivo',
            type: 'income',
            subCategories: JSON.stringify([
                'Retiro'
            ])
        }
    });
    // 2. Categorías Básicas
    const catCount = await prisma.category.count();
    if (catCount === 0) {
        await prisma.category.createMany({
            data: [
                {
                    name: 'Efectivo',
                    type: 'income',
                    subCategories: JSON.stringify([
                        'Retiro'
                    ])
                }
            ]
        });
    }
    // 3. Categoría Especial de Ahorro (Esta era la que fallaba)
    // Usamos upsert: Si existe no hace nada (update vacío), si no existe, la crea.
    await prisma.category.upsert({
        where: {
            id: 'cat_sys_savings'
        },
        update: {},
        create: {
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
async function updateAccount(data) {
    await prisma.account.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            bank: data.bank,
            type: data.type,
            color: data.color
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function deleteTransaction(id) {
    // Primero obtenemos la transacción para saber cuánto devolver a la cuenta
    const tx = await prisma.transaction.findUnique({
        where: {
            id
        }
    });
    if (!tx) return;
    await prisma.transaction.delete({
        where: {
            id
        }
    });
    // Revertimos el saldo
    // Si era Ingreso (sumó), ahora restamos. Si era Gasto (restó), ahora sumamos.
    // OJO: Si era transferencia o ahorro virtual la lógica se complica, 
    // pero para gastos/ingresos simples esto funciona:
    if (tx.accountId) {
        const multiplier = tx.type === 'income' ? -1 : 1;
        await prisma.account.update({
            where: {
                id: tx.accountId
            },
            data: {
                balance: {
                    increment: tx.amount * multiplier
                }
            }
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function updateFixedRule(data) {
    await prisma.fixedRule.update({
        where: {
            id: data.id
        },
        data: {
            description: data.description,
            budgetedAmount: data.budgetedAmount,
            dayOfMonth: data.dayOfMonth,
            isActive: data.isActive
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function deleteFixedRule(id) {
    await prisma.fixedRule.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getFinanceData,
    createTransaction,
    createAccount,
    deleteAccount,
    createCategory,
    deleteCategory,
    updateCategory,
    saveSimulatorItem,
    deleteSimulatorItem,
    createFixedRule,
    seedDatabase,
    updateAccount,
    deleteTransaction,
    updateFixedRule,
    deleteFixedRule
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFinanceData, "00039bbf824c6cf6f3f31d679e5454b7087aa83620", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTransaction, "40d1d772545060c014e567ca1cc45ca81fa41e0879", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAccount, "40a6494eb23e86774bbc4cd3b762988938ca6ab1f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAccount, "40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "407c575f36b6abf59084d90735f41e90aa840e68ec", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "4079df49fafe45a1ab1e12d9a3bd024a49017ff973", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCategory, "40316778cb353211f011f5d54bf25a3dfbe3e909e1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveSimulatorItem, "40a3a35a0de80c6315f5b4b808492893738d32a019", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSimulatorItem, "402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createFixedRule, "402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(seedDatabase, "00f4ccd6feba2f51d8fdbe57d41f07dbd60b756342", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccount, "40f8ff2eb8230be2e90afdebebc50430d1370f14e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTransaction, "406c20e6a69942bace393f44cef982f40e5508fbfd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateFixedRule, "4086d78b4cf852eced4c082dd17fb545b408bf00c1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteFixedRule, "40235ab7bf48351d601dd29c63317b315360906a50", null);
}),
"[project]/Jth/Git Repository/Home/finance-home/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
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
;
;
;
;
;
;
;
}),
"[project]/Jth/Git Repository/Home/finance-home/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00039bbf824c6cf6f3f31d679e5454b7087aa83620",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFinanceData"],
    "00f4ccd6feba2f51d8fdbe57d41f07dbd60b756342",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seedDatabase"],
    "40235ab7bf48351d601dd29c63317b315360906a50",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteFixedRule"],
    "402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createFixedRule"],
    "402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSimulatorItem"],
    "40316778cb353211f011f5d54bf25a3dfbe3e909e1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCategory"],
    "406c20e6a69942bace393f44cef982f40e5508fbfd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTransaction"],
    "4079df49fafe45a1ab1e12d9a3bd024a49017ff973",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCategory"],
    "407c575f36b6abf59084d90735f41e90aa840e68ec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategory"],
    "4086d78b4cf852eced4c082dd17fb545b408bf00c1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateFixedRule"],
    "40a3a35a0de80c6315f5b4b808492893738d32a019",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveSimulatorItem"],
    "40a6494eb23e86774bbc4cd3b762988938ca6ab1f9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAccount"],
    "40d1d772545060c014e567ca1cc45ca81fa41e0879",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"],
    "40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAccount"],
    "40f8ff2eb8230be2e90afdebebc50430d1370f14e4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAccount"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Jth/Git Repository/Home/finance-home/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__248c5b85._.js.map