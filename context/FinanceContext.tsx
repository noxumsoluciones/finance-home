// context/FinanceContext.tsx
"use client";
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Account, Category, Transaction, FixedExpenseRule } from '@/types';
// 1. IMPORTAR LAS NUEVAS ACCIONES
import {
    getFinanceData, createTransaction, createAccount, deleteAccount, createCategory,
    saveSimulatorItem, deleteSimulatorItem, createFixedRule,
    deleteCategory as deleteCategoryAction, updateCategory as updateCategoryAction,
    // Nuevas:
    deleteTransaction as deleteTransactionAction,
    updateAccount as updateAccountAction,
    updateFixedRule as updateFixedRuleAction,
    deleteFixedRule as deleteFixedRuleAction
} from '@/app/actions';
import { v4 as uuidv4 } from 'uuid';

import { generateDemoData } from '@/lib/demoData'; // Importa el generador

interface SimulatorItem {
    id: string;
    name: string;
    amount: number;
    type: 'income' | 'expense' | 'transfer';
    isFixed: boolean;
}

interface FinanceContextType {
    currentUser: { email: string; householdId: string } | null;
    accounts: Account[];
    transactions: Transaction[];
    categories: Category[];
    fixedRules: FixedExpenseRule[];
    simulatorItems: SimulatorItem[];

    addTransaction: (t: any) => Promise<void>;
    addAccount: (a: any) => Promise<void>;
    deleteAccountAction: (id: string) => Promise<void>;
    addCategory: (c: any) => Promise<void>;
    addFixedRule: (r: any) => Promise<void>;

    // Simulador
    addSimItem: (item: any) => Promise<void>;
    removeSimItem: (id: string) => Promise<void>;

    // Funciones COMPLETAS (Ya no vacías)
    updateTransaction: (t: any) => void;
    deleteTransaction: (id: string) => void;
    updateAccount: (a: any) => void;
    deleteCategory: (id: string) => void;
    addSubCategory: (id: string, sub: string) => void;
    removeSubCategory: (id: string, sub: string) => void;
    updateFixedRule: (r: any) => void;
    deleteFixedRule: (id: string) => void;
    markRuleAsPaid: (id: string, date: string) => void;

    refreshData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
    // 2. INICIALIZAR ROUTER
    const router = useRouter();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [fixedRules, setFixedRules] = useState<FixedExpenseRule[]>([]);
    const [simulatorItems, setSimulatorItems] = useState<SimulatorItem[]>([]);
    const [currentUser, setCurrentUser] = useState<{ email: string; householdId: string } | null>(null);
    // CARGAR DATOS
    useEffect(() => {
        const initData = async () => {
            try {
                const data = await getFinanceData();

                // CASO NO AUTORIZADO
                // @ts-ignore
                if (data.unauthorized) {
                    // Si estamos en /login no hacemos nada, si estamos dentro, el middleware o el usuario redirige
                    return;
                }

                // CASO DEMO o REAL (Ambos traen estructura similar ahora)
                // @ts-ignore
                setAccounts(data.accounts || []);
                // @ts-ignore
                setTransactions(data.transactions || []);
                // @ts-ignore
                setCategories(data.categories || []);
                // @ts-ignore
                setFixedRules(data.fixedRules || []);
                // @ts-ignore
                setSimulatorItems(data.simulatorItems || []);
                // @ts-ignore
                setCurrentUser(data.currentUser || null);

            } catch (e) { console.error(e); }
        };
        initData();
    }, []);



    // --- TRANSACCIONES ---
    const addTransaction = async (t: any) => {
        // CASO 1: TRANSFERENCIA (Crear 2 Movimientos visuales)
        if (t.type === 'transfer') {
            const txExpense = {
                ...t,
                id: uuidv4(),
                type: 'expense',
                description: `Transferencia a: ${t.destAccountName}`, // Mismo texto que Actions
                isTransfer: true,
                didWithdraw: true
            };
            const txIncome = {
                ...t,
                id: uuidv4(),
                type: 'income',
                accountId: t.relatedAccountId,
                relatedAccountId: t.accountId,
                description: `Recibido de: ${t.originAccountName}`, // Mismo texto que Actions
                isTransfer: true,
                didWithdraw: false
            };

            // Agregamos AMBOS al estado
            setTransactions(prev => [txExpense, txIncome, ...prev]);

            // Actualizar saldos
            setAccounts(prev => prev.map(acc => {
                if (acc.id === t.accountId) return { ...acc, balance: acc.balance - t.amount };
                if (acc.id === t.relatedAccountId) return { ...acc, balance: acc.balance + t.amount };
                return acc;
            }));
        }

        // CASO 2: GASTO / INGRESO NORMAL
        else {
            const tempId = uuidv4();
            const optimisticTx = { ...t, id: tempId };
            setTransactions(prev => [optimisticTx, ...prev]);

            /*
            const shouldUpdateBalance = t.type === 'expense' && t.isSavings ? t.didWithdraw : true;
            if (shouldUpdateBalance) {
                const multiplier = t.type === 'income' ? 1 : -1;
                setAccounts(prev => prev.map(acc => {
                    if (acc.id === t.accountId) return { ...acc, balance: acc.balance + (t.amount * multiplier) };
                    return acc;
                }));
            }

            // Optimista Ahorro (Suma)
            if (t.isSavings) {
                setAccounts(prev => {
                    const hasVirtual = prev.some(a => a.type === 'savings_virtual');
                    if (hasVirtual) return prev.map(a => a.type === 'savings_virtual' ? { ...a, balance: a.balance + t.amount } : a);
                    return prev;
                });
            }
            // Optimista Gastar de Ahorro (Resta) -> NUEVO
            if (t.payWithSavings) {
                setAccounts(prev => {
                    const hasVirtual = prev.some(a => a.type === 'savings_virtual');
                    if (hasVirtual) return prev.map(a => a.type === 'savings_virtual' ? { ...a, balance: a.balance - t.amount } : a);
                    return prev;
                });
            }

            // Optimista Regla Fija
            if (t.createFixedRule && t.type === 'expense') {
                const newOptimisticRule: FixedExpenseRule = {
                    id: uuidv4(),
                    householdId: currentUser?.householdId || 'demo',
                    description: t.description,
                    categoryId: t.categoryId,
                    budgetedAmount: t.amount,
                    accountIdToCharge: t.accountId,
                    dayOfMonth: t.dayOfMonth || new Date().getDate(),
                    isActive: true
                };
                setFixedRules(prev => [...prev, newOptimisticRule]);
            }*/

            // Lógica de Saldos Visuales
            setAccounts(prev => prev.map(acc => {
                // A. Si es Gasto de Ahorro: Restamos Balance y Restamos BalanceSafe de la cuenta real
                if (t.payWithSavings && t.type === 'expense' && acc.id === t.accountId) {
                    return {
                        ...acc,
                        balance: acc.balance - t.amount,
                        balanceSafe: (acc.balanceSafe || 0) - t.amount
                    };
                }

                // B. Si es Guardar Ahorro (Expense): Solo sube BalanceSafe, Balance total igual
                if (t.isSavings && t.type === 'expense' && acc.id === t.accountId) {
                    return { ...acc, balanceSafe: (acc.balanceSafe || 0) + t.amount };
                }

                // C. Si es Ingreso Ahorro: Suben ambos
                if (t.isSavings && t.type === 'income' && acc.id === t.accountId) {
                    return { ...acc, balance: acc.balance + t.amount, balanceSafe: (acc.balanceSafe || 0) + t.amount };
                }

                // D. Gasto/Ingreso Normal
                if (!t.isSavings && !t.payWithSavings && acc.id === t.accountId) {
                    const multiplier = t.type === 'income' ? 1 : -1;
                    // Solo si didWithdraw es true (o undefined que asume true)
                    if (t.didWithdraw !== false) {
                        return { ...acc, balance: acc.balance + (t.amount * multiplier) };
                    }
                }

                // E. Actualizar Cuenta Virtual Global (Ahorro)
                if (acc.type === 'savings_virtual') {
                    if (t.isSavings) return { ...acc, balance: acc.balance + t.amount };
                    if (t.payWithSavings) return { ...acc, balance: acc.balance - t.amount };
                }

                return acc;
            }));
            // 2. NUEVO: Actualización optimista de Reglas Fijas (Admin)
            // Si marcamos "Guardar como recurrente", lo agregamos visualmente a la lista de reglas
            if (t.createFixedRule && t.type === 'expense') {
                const newOptimisticRule: FixedExpenseRule = {
                    id: uuidv4(), // ID temporal hasta recargar
                    householdId: currentUser?.householdId || 'demo',
                    description: t.description,
                    categoryId: t.categoryId,
                    budgetedAmount: t.amount,
                    accountIdToCharge: t.accountId,
                    dayOfMonth: t.dayOfMonth || new Date().getDate(),
                    isActive: true
                };
                setFixedRules(prev => [...prev, newOptimisticRule]);
            }
        }



        // 3. Llamada al Servidor
        await createTransaction(t);
        await refreshData();
    };


    const deleteTransaction = async (id: string) => {
        // 1. Optimistic UI
        const tx = transactions.find(t => t.id === id);
        setTransactions(prev => prev.filter(t => t.id !== id));

        // Revertir saldo visualmente (básico)
        if (tx && tx.type !== 'transfer') {
            const multiplier = tx.type === 'income' ? -1 : 1; // Inverso para borrar
            setAccounts(prev => prev.map(a => a.id === tx.accountId ? { ...a, balance: a.balance + (tx.amount * multiplier) } : a));
        }
        // 2. Server Action
        await deleteTransactionAction(id);
    };

    const updateTransaction = async (t: any) => {
        // Implementación futura si deseas editar montos
        console.log("Edit not implemented yet");
    };

    // --- CUENTAS ---
    const addAccount = async (a: any) => {
        setAccounts(prev => [...prev, a]);
        await createAccount(a);
    };

    const deleteAccountAction = async (id: string) => {
        setAccounts(prev => prev.filter(x => x.id !== id));
        await deleteAccount(id);
    };

    const updateAccount = async (a: any) => {
        setAccounts(prev => prev.map(acc => acc.id === a.id ? a : acc));
        await updateAccountAction(a);
    };

    // --- CATEGORÍAS ---
    const addCategory = async (c: any) => {
        setCategories(prev => [...prev, c]);
        await createCategory(c);
    };

    const deleteCategory = async (id: string) => {
        setCategories(prev => prev.filter(c => c.id !== id));
        await deleteCategoryAction(id);
    };

    const addSubCategory = async (catId: string, subName: string) => {
        if (!subName) return;
        const categoryToUpdate = categories.find(c => c.id === catId);
        if (!categoryToUpdate) return;
        const newSubCategories = [...(categoryToUpdate.subCategories || []), subName];
        setCategories(prev => prev.map(c => c.id === catId ? { ...c, subCategories: newSubCategories } : c));
        await updateCategoryAction({ ...categoryToUpdate, subCategories: newSubCategories });
    };

    const removeSubCategory = async (catId: string, subName: string) => {
        const categoryToUpdate = categories.find(c => c.id === catId);
        if (!categoryToUpdate) return;
        const newSubCategories = categoryToUpdate.subCategories.filter(s => s !== subName);
        setCategories(prev => prev.map(c => c.id === catId ? { ...c, subCategories: newSubCategories } : c));
        await updateCategoryAction({ ...categoryToUpdate, subCategories: newSubCategories });
    };

    // --- REGLAS FIJAS ---
    const addFixedRule = async (r: any) => {
        setFixedRules(prev => [...prev, r]);
        await createFixedRule(r);
    };

    const updateFixedRule = async (r: any) => {
        setFixedRules(prev => prev.map(rule => rule.id === r.id ? r : rule));
        await updateFixedRuleAction(r);
    };

    const deleteFixedRule = async (id: string) => {
        setFixedRules(prev => prev.filter(r => r.id !== id));
        await deleteFixedRuleAction(id);
    };

    const markRuleAsPaid = (id: string, date: string) => {
        // Implementación opcional visual
        console.log("Rule marked as paid", id);
    };

    // --- SIMULADOR ---
    const addSimItem = async (item: any) => {
        setSimulatorItems(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) return prev.map(i => i.id === item.id ? item : i);
            return [...prev, item];
        });
        await saveSimulatorItem(item);
    };

    const removeSimItem = async (id: string) => {
        setSimulatorItems(prev => prev.filter(i => i.id !== id));
        await deleteSimulatorItem(id);
    };

    const refreshData = async () => {
        try {
            const data = await getFinanceData();

            // Verificamos si data existe y no es no autorizado
            if (data && !(data as any).unauthorizeds) {

                // --- CORRECCIÓN AQUÍ: DOBLE CASTING ---
                // Usamos 'as unknown as Account[]' para forzar la conversión
                // ignorando que Prisma aún no "ve" el campo balanceSafe en sus tipos automáticos.
                setAccounts((data.accounts || []) as unknown as Account[]);

                setTransactions((data.transactions || []) as unknown as Transaction[]);
                setCategories((data.categories || []) as unknown as Category[]);

                if (data.fixedRules) {
                    setFixedRules((data.fixedRules || []) as unknown as FixedExpenseRule[]);
                }
                if (data.simulatorItems) {
                    setSimulatorItems((data.simulatorItems || []) as unknown as SimulatorItem[]);
                }
                if (data.currentUser) {
                    setCurrentUser(data.currentUser as any);
                }
                router.push('/login'); // <--- TE MANDA AL LOGIN
                return;
            }
        } catch (error) {
            console.error("Error recargando datos:", error);
        }
    };
    useEffect(() => {
        refreshData();
    }, []);

    return (
        <FinanceContext.Provider value={{
            currentUser, accounts, transactions, categories, fixedRules, simulatorItems,
            addTransaction, addAccount, deleteAccountAction, addCategory, addFixedRule,
            addSimItem, removeSimItem, deleteCategory, addSubCategory, removeSubCategory,
            // AHORA SÍ PASAMOS LAS IMPLEMENTACIONES REALES
            updateTransaction,
            deleteTransaction,
            updateAccount,
            updateFixedRule,
            deleteFixedRule,
            markRuleAsPaid,
            refreshData
        }}>
            {children}
        </FinanceContext.Provider>
    );



};

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) throw new Error("useFinance Error");
    return context;
};