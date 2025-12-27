"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { signToken, verifyToken } from '@/lib/auth';
import { sendAuthEmail, sendRegistrationRequestEmail } from '@/lib/mail';
import { generateDemoData } from '@/lib/demoData';


// --- GLOBAL PRISMA ---
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// --- OBTENER USUARIO ACTUAL ---
export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;

    // 1. Verificar firma del token
    const payload = await verifyToken(token);
    if (!payload) return null;
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.id as string }
        });
        // Si no se encuentra el usuario en BD, retornamos null (inválido)
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }

    //return await verifyToken(token);
}

// --- CREAR USUARIO (Para el botón Admin) ---
export async function createNewUser(name: string, email: string, householdId: string) {
    const currentUser = await getCurrentUser();

    // Validación de seguridad básica: Solo User Master puede crear usuarios
    if (currentUser?.email !== process.env.GMAIL_USER) {
        return { success: false, message: 'No autorizado' };
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } });

        if (existing) return { success: false, message: 'El usuario ya existe.' };

        const existinHouseHold = await prisma.user.findMany({ where: { householdId } });
        if (existinHouseHold) {
            await prisma.account.createMany({
                data: [
                    { name: 'Dinero Efectivo', bank: 'Efectivo', type: 'wallet', owner: name, color: '#25ab28ff', householdId: householdId },
                    { name: 'Ahorro Global', bank: 'Ahorro', type: 'savings_virtual', owner: name, color: '#fba300ff', householdId: householdId }
                ]
            });
        }

        await prisma.user.create({
            data: {
                email,
                name,
                householdId,
                token: 'INIT', // Token inicial placeholder
            }
        });

        revalidatePath('/admin');
        return { success: true, message: 'Usuario creado exitosamente.' };
    } catch (error) {
        return { success: false, message: 'Error creando usuario en BD.' };
    }

}


// --- AUTENTICACIÓN: PASO 1 (SOLICITAR CÓDIGO) ---
export async function requestLoginCode(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return { success: false, message: 'Usuario no encontrado. Debes solicitar registro.' };
    }

    const digits = Math.floor(10000000 + Math.random() * 90000000).toString();
    const specials = "%#-/*@?!+_";
    const specialChar = specials.charAt(Math.floor(Math.random() * specials.length));
    const secureCode = digits + specialChar;

    await prisma.user.update({ where: { email }, data: { token: secureCode } });

    try {
        await sendAuthEmail(email, secureCode);
        return { success: true };
    } catch (error) {
        console.error("Error mailing:", error);
        return { success: false, message: 'Error enviando correo.' };
    }
}

// --- AUTENTICACIÓN: PASO 2 (LOGIN) ---
export async function loginAction(email: string, token: string) {
    const user = await prisma.user.findUnique({ where: { email } });


    if (!user || !user.token) return { success: false, message: 'Código incorrecto.' };

    const jwt = await signToken({
        id: user.id,
        email: user.email,
        householdId: user.householdId
    });

    const cookieStore = await cookies();
    cookieStore.set('auth_token', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
    });

    cookieStore.delete('is_demo_mode');
    return { success: true };
}

// --- REGISTRO (SOLICITUD) ---
export async function requestRegistration(email: string, name: string, familyName: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { success: false, message: 'Correo ya registrado.' };

    try {
        // Enviamos nombre, email y familia al correo
        await sendRegistrationRequestEmail(email, name, familyName);
        return { success: true, message: 'Solicitud enviada al administrador.' };
    } catch (e) {
        return { success: false, message: 'Error de conexión.' };
    }
}

// --- LOGOUT / DEMO ---
export async function setDemoModeAction() {
    const cookieStore = await cookies();

    // 1. Establecer cookie de Demo (Importante: path '/')
    cookieStore.set('is_demo_mode', 'true', {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 // 1 día
    });

    // 2. Borrar token anterior si existe para evitar conflictos
    cookieStore.delete('auth_token');

    return { success: true };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    cookieStore.delete('is_demo_mode');
    return { success: true };
}

// --- OBTENER DATOS ---
export async function getFinanceData() {
    const cookieStore = await cookies();


    // --- DEMO DATA ---
    const isDemo = cookieStore.get('is_demo_mode')?.value === 'true';
    if (isDemo) {
        const demoData = generateDemoData();
        return {
            ...demoData,
            isDemo: true,
            currentUser: { email: 'Usuario Demo', householdId: 'demo' },
            unauthorized: false
        };
    }

    const user = await getCurrentUser();

    if (!user) {
        return { unauthorized: true };
    }

    // --- USER DATA ---
    const householdId = user.householdId;
    const accounts = await prisma.account.findMany({ where: { householdId } });
    const categories = await prisma.category.findMany({ where: { householdId } });
    const transactions = await prisma.transaction.findMany({
        where: { householdId },
        // NO poner aquí un filtro solo para 'expense'. 
        // Si tienes filtros de tipo, deben incluir 'income' para que se vea la entrada de la transferencia.
        orderBy: { date: 'desc' },
        include: {
            account: { select: { name: true, color: true } },
            category: { select: { name: true } }
        }
    });

    const fixedRules = await prisma.fixedRule.findMany({ where: { householdId } });
    const simulatorItems = await prisma.simulatorItem.findMany({ where: { householdId } });

    return {
        isDemo: false,
        unauthorized: false,
        currentUser: user,
        accounts,
        categories: categories.map(c => ({ ...c, subCategories: c.subCategories ? JSON.parse(c.subCategories) : [] })),
        transactions: transactions.map(t => ({ ...t, date: t.date.toISOString() })),
        fixedRules,
        simulatorItems
    };
}

// --- CREACIONES Y UPDATES TRANSACTIONS ---
export async function createTransaction(data: any) {
    const user = await getCurrentUser();
    if (!user) return;
    const householdId = user.householdId;
    const date = new Date(data.date);
    // 1. TRANSFERENCIA: CREA DOS MOVIMIENTOS
    if (data.type === 'transfer') {
        // Buscar/Crear categoría
        let transferCat = await prisma.category.findFirst({ where: { householdId, name: 'Transferencia Propia' } });
        if (!transferCat) {
            transferCat = await prisma.category.create({ data: { householdId, name: 'Transferencia Propia', type: 'transfer', subCategories: JSON.stringify([]) } });
        }

        // A. SALIDA (Gasto - Cuenta Origen)
        await prisma.transaction.create({
            data: {
                householdId, type: 'expense', amount: data.amount,
                accountId: data.accountId,
                categoryId: transferCat.id,
                description: `Transferencia a: ${data.destAccountName}`, // TEXTO EXACTO
                date, isTransfer: true, relatedAccountId: data.relatedAccountId, didWithdraw: true
            }
        });
        await prisma.account.update({ where: { id: data.accountId }, data: { balance: { decrement: data.amount } } });

        // B. ENTRADA (Ingreso - Cuenta Destino)
        await prisma.transaction.create({
            data: {
                householdId, type: 'income', amount: data.amount,
                accountId: data.relatedAccountId,
                categoryId: transferCat.id,
                description: `Recibido de: ${data.originAccountName}`, // TEXTO EXACTO
                date, isTransfer: true, relatedAccountId: data.accountId, didWithdraw: false
            }
        });
        await prisma.account.update({ where: { id: data.relatedAccountId }, data: { balance: { increment: data.amount } } });
    }

    // 2. GASTO / INGRESO NORMAL
    else {

        const shouldUpdateBalance = data.type === 'expense' ? data.didWithdraw : true;

        // --- GASTO NORMAL ---
        await prisma.transaction.create({
            data: {
                householdId, type: data.type, amount: data.amount, budgetedAmount: data.budgetedAmount,
                accountId: data.accountId, categoryId: data.categoryId, description: data.description, date,
                isFixed: data.isFixed || false,
                isSavings: data.isSavings || false,
                payWithSavings: data.payWithSavings || false,
                didWithdraw: data.payWithSavings ? true : (data.didWithdraw ?? true)
            }
        });

        /*if (shouldUpdateBalance) {
            const multiplier = data.type === 'income' ? 1 : -1;
            await prisma.account.update({ where: { id: data.accountId }, data: { balance: { increment: data.amount * multiplier } } });
        }*/



        // --- LÓGICA DE SALDOS ---

        // A. CASO "GASTAR DE AHORRO" (Expense + payWithSavings)
        if (data.payWithSavings && data.type === 'expense') {
            // Restamos del balance total Y del balanceSafe de la cuenta
            await prisma.account.update({
                where: { id: data.accountId },
                data: {
                    balance: { decrement: data.amount },
                    balanceSafe: { decrement: data.amount }
                }
            });
            // Restamos también del Ahorro Global (Cuenta Virtual)
            let savingsAcc = await prisma.account.findFirst({ where: { type: 'savings_virtual', householdId } });
            if (savingsAcc) {
                await prisma.account.update({ where: { id: savingsAcc.id }, data: { balance: { decrement: data.amount } } });
            }
        }

        // B. CASO "ES AHORRO" (Guardar dinero)
        else if (data.isSavings) {
            // 1. Si es INGRESO y es ahorro: Sube Balance Total y Sube BalanceSafe
            if (data.type === 'income') {
                await prisma.account.update({
                    where: { id: data.accountId },
                    data: {
                        balance: { increment: data.amount },
                        balanceSafe: { increment: data.amount }
                    }
                });
                let savingsAcc = await prisma.account.findFirst({ where: { type: 'savings_virtual', householdId } });
                if (savingsAcc) await prisma.account.update({ where: { id: savingsAcc.id }, data: { balance: { increment: data.amount } } });

            }
            // 2. Si es GASTO (Sacar del bolsillo diario para guardar): El balance total NO cambia (el dinero sigue en la cuenta), pero sube el BalanceSafe
            // NOTA: Si el usuario quiere que "salga" de la cuenta, debería usar Transferencia. Asumimos que "Gasto -> Es Ahorro" es apartar dinero.
            else if (data.type === 'expense') {
                /*await prisma.account.update({ 
                   where: { id: data.accountId }, 
                   data: { 
                       // No tocamos balance total porque el dinero no se ha ido del banco, solo cambió de "estado"
                       balanceSafe: { increment: data.amount } 
                   } 
               });*/
                // ---> NUEVA LÓGICA: RETIRO FÍSICO PARA AHORRO <---
                if (data.didWithdraw) {
                    // a. Restamos de la cuenta origen (Banco)
                    await prisma.account.update({
                        where: { id: data.accountId },
                        data: { balance: { decrement: data.amount } } // Solo decrementa balance total, no balanceSafe, porque salió del banco
                    });

                    // b. Buscamos (o creamos) la cuenta "Dinero Efectivo"
                    let cashAccount = await prisma.account.findFirst({
                        where: { householdId, name: 'Dinero Efectivo' } // Buscamos por nombre o tipo 'wallet'
                    });

                    if (!cashAccount) {
                        // Necesitamos el nombre del usuario para el 'owner'
                        const fullUser = await prisma.user.findUnique({ where: { id: user.id } });
                        const userName = fullUser?.name || 'Usuario';

                        cashAccount = await prisma.account.create({
                            data: {
                                householdId,
                                name: 'Dinero Efectivo',
                                bank: 'Efectivo',
                                type: 'wallet',
                                owner: userName,
                                color: '#25ab28ff',
                                balance: 0, // Inicia en 0 y le sumamos abajo
                                balanceSafe: 0
                            }
                        });
                    }

                    // c. Sumamos a "Dinero Efectivo" como Ahorro (BalanceSafe)
                    // Aquí el dinero entra físicamente y se marca como reservado
                    await prisma.account.update({
                        where: { id: cashAccount.id },
                        data: {
                            balance: { increment: data.amount },
                            balanceSafe: { increment: data.amount }
                        }
                    });

                } else {
                    // ---> LÓGICA ANTIGUA: AHORRO VIRTUAL (No sale del banco) <---
                    await prisma.account.update({
                        where: { id: data.accountId },
                        data: { balanceSafe: { increment: data.amount } }
                    });
                }

                // En AMBOS casos, el "Ahorro Global" (Espejo) aumenta
                let savingsAcc = await prisma.account.findFirst({ where: { type: 'savings_virtual', householdId } });
                if (!savingsAcc) savingsAcc = await prisma.account.create({ data: { householdId, name: 'Bolsillo Ahorros Global', bank: 'Sistema', type: 'savings_virtual', owner: 'Familia', color: '#3b82f6' } });
                await prisma.account.update({ where: { id: savingsAcc.id }, data: { balance: { increment: data.amount } } });
            }


        }

        // C. CASO NORMAL (Gasto corriente o Ingreso corriente)
        else {
            const shouldUpdateBalance = data.type === 'expense' ? data.didWithdraw : true;
            if (shouldUpdateBalance) {
                const multiplier = data.type === 'income' ? 1 : -1;
                await prisma.account.update({ where: { id: data.accountId }, data: { balance: { increment: data.amount * multiplier } } });
            }
        }

        // Reglas Fijas y Crédito (Igual que antes)
        if (data.createFixedRule && data.type === 'expense') {
            await prisma.fixedRule.create({
                data: { householdId, description: data.description, categoryId: data.categoryId, budgetedAmount: data.budgetedAmount ? parseFloat(data.budgetedAmount) : data.amount, accountIdToCharge: data.accountId, dayOfMonth: data.dayOfMonth || date.getDate(), isActive: true }
            });
        }
        if (data.type === 'income' && data.isCredit && data.creditQuotaValue) {
            let debtCat = await prisma.category.findFirst({ where: { householdId, type: 'expense', name: { contains: 'Deuda' } } });
            if (!debtCat) debtCat = await prisma.category.create({ data: { householdId, name: 'Pago Deudas', type: 'expense', subCategories: JSON.stringify(['Cuota Crédito']) } });
            await prisma.fixedRule.create({ data: { householdId, description: `Cuota: ${data.description}`, categoryId: debtCat.id, budgetedAmount: parseFloat(data.creditQuotaValue), accountIdToCharge: data.accountId, dayOfMonth: data.dayOfMonth || new Date().getDate(), isActive: true } });
        }
    }
    revalidatePath('/');
    revalidatePath('/admin');


    // Lógica de Ahorro Global (Sumar o Restar)

    /*
    if (data.isSavings) {
        let savingsAcc = await prisma.account.findFirst({ where: { type: 'savings_virtual', householdId } });
        if (!savingsAcc) savingsAcc = await prisma.account.create({ data: { householdId, name: 'Bolsillo Ahorros Global', bank: 'Sistema', type: 'savings_virtual', owner: 'Familia', color: '#3b82f6' } });
        await prisma.account.update({ where: { id: savingsAcc.id }, data: { balance: { increment: data.amount } } });
    }
    if (data.payWithSavings) {
        let savingsAcc = await prisma.account.findFirst({ where: { type: 'savings_virtual', householdId } });
        if (savingsAcc) await prisma.account.update({ where: { id: savingsAcc.id }, data: { balance: { decrement: data.amount } } });
    }

    // Regla Fija
    if (data.createFixedRule && data.type === 'expense') {
        await prisma.fixedRule.create({
            data: { 
                householdId, 
                description: data.description, 
                categoryId: data.categoryId, 
                
                budgetedAmount: data.budgetedAmount ? parseFloat(data.budgetedAmount) : data.amount, 
                accountIdToCharge: data.accountId, 
                dayOfMonth: data.dayOfMonth || date.getDate(), 
                isActive: true }
        });
    }


    // --- CRÉDITO AUTOMÁTICO ---
    if (data.type === 'income' && data.isCredit && data.creditQuotaValue) {
         let debtCat = await prisma.category.findFirst({ where: { householdId, type: 'expense', name: { contains: 'Deuda' } } });
         if (!debtCat) debtCat = await prisma.category.create({ data: { householdId, name: 'Pago Deudas', type: 'expense', subCategories: JSON.stringify(['Cuota Crédito']) } });
         await prisma.fixedRule.create({ data: { householdId, description: `Cuota: ${data.description}`, categoryId: debtCat.id, budgetedAmount: parseFloat(data.creditQuotaValue), accountIdToCharge: data.accountId, dayOfMonth: data.dayOfMonth || new Date().getDate(), isActive: true } });
    }
}
revalidatePath('/');
revalidatePath('/admin');*/
}

// Funciones CRUD estándar
export async function createAccount(data: any) { const user = await getCurrentUser(); if (user) await prisma.account.create({ data: { ...data, householdId: user.householdId } }); revalidatePath('/'); }
export async function deleteAccount(id: string) { await prisma.account.delete({ where: { id } }); revalidatePath('/'); }
export async function updateAccount(data: any) { await prisma.account.update({ where: { id: data.id }, data: { name: data.name, bank: data.bank, type: data.type, color: data.color } }); revalidatePath('/'); }
export async function createCategory(data: any) { const user = await getCurrentUser(); if (user) await prisma.category.create({ data: { id: data.id, name: data.name, type: data.type, subCategories: JSON.stringify(data.subCategories || []), householdId: user.householdId } }); revalidatePath('/'); }
export async function deleteCategory(id: string) { await prisma.category.delete({ where: { id } }); revalidatePath('/'); }
export async function updateCategory(data: any) { await prisma.category.update({ where: { id: data.id }, data: { name: data.name, type: data.type, subCategories: JSON.stringify(data.subCategories) } }); revalidatePath('/'); }
export async function deleteTransaction(id: string) { const tx = await prisma.transaction.findUnique({ where: { id } }); if (!tx) return; await prisma.transaction.delete({ where: { id } }); if (tx.accountId && tx.didWithdraw && !tx.isTransfer) { const multiplier = tx.type === 'income' ? -1 : 1; await prisma.account.update({ where: { id: tx.accountId }, data: { balance: { increment: tx.amount * multiplier } } }); } revalidatePath('/'); }
export async function createFixedRule(data: any) {
    const user = await getCurrentUser(); if (user) await prisma.fixedRule.create({
        data: {
            ...data,
            description: data.description,
            categoryId: data.categoryId,
            accountIdToCharge: data.accountIdToCharge,
            dayOfMonth: parseInt(data.dayOfMonth), householdId: user.householdId, budgetedAmount: parseFloat(data.budgetedAmount || '0'), staticAmount: data.staticAmount ? parseFloat(data.staticAmount) : null, isActive: true
        }
    }); revalidatePath('/admin'); revalidatePath('/');
}
export async function updateFixedRule(data: any) {
    await prisma.fixedRule.update({
        where: { id: data.id }, data: {
            description: data.description,
            // Actualizamos ambos
            //staticAmount: data.staticAmount ? parseFloat(data.staticAmount) : null,
            budgetedAmount: data.budgetedAmount, dayOfMonth: data.dayOfMonth, isActive: data.isActive
        }
    }); revalidatePath('/');
}
export async function deleteFixedRule(id: string) { await prisma.fixedRule.delete({ where: { id } }); revalidatePath('/'); }
export async function saveSimulatorItem(data: any) { const user = await getCurrentUser(); if (!user) return; const householdId = user.householdId; const existing = await prisma.simulatorItem.findUnique({ where: { id: data.id } }); if (existing) { await prisma.simulatorItem.update({ where: { id: data.id }, data: { name: data.name, amount: data.amount } }); } else { await prisma.simulatorItem.create({ data: { ...data, householdId } }); } revalidatePath('/simulator'); }
export async function deleteSimulatorItem(id: string) { await prisma.simulatorItem.delete({ where: { id } }); revalidatePath('/simulator'); }

// --- SEED ---
export async function seedDatabase() {
    const familyId = "familia-gonzalez-marin";

    await prisma.user.upsert({
        where: { email: 'jhonattan.gonzalez.38@gmail.com' },
        update: { householdId: familyId, name: 'Jhonattan Gonzalez' },
        create: { email: 'jhonattan.gonzalez.38@gmail.com', token: 'INIT', householdId: familyId, name: 'Jhonattan Gonzalez' }
    });

    const accCount = await prisma.account.count({ where: { householdId: familyId } });
    if (accCount === 0) {
        await prisma.account.createMany({
            data: [
                { name: 'Dinero Efectivo', bank: 'Efectivo', type: 'wallet', owner: 'Familia', color: '#25ab28ff', householdId: familyId },
                { name: 'Ahorro Global', bank: 'Ahorro', type: 'savings_virtual', owner: 'Familia', color: '#fba300ff', householdId: familyId }
            ]
        });
        await prisma.category.createMany({
            data: [
                { name: 'Salario', type: 'income', subCategories: JSON.stringify(['Nómina']), householdId: familyId },
                { name: 'Casa', type: 'expense', subCategories: JSON.stringify(['Agua', 'Luz', 'Internet', 'Arriendo', 'Gas', 'Moto']), householdId: familyId }
            ]
        });
    }
    revalidatePath('/');
    return { success: true };
}

