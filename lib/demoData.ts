// lib/demoData.ts
import { v4 as uuidv4 } from 'uuid';

export function generateDemoData() {
    const categories = [
        { id: 'd-c1', name: 'Salario Demo', type: 'income', subCategories: JSON.stringify(['Nómina']), householdId: 'demo' },
        { id: 'd-c2', name: 'Comida Demo', type: 'expense', subCategories: JSON.stringify(['Restaurante']), householdId: 'demo' },
        { id: 'd-c3', name: 'Transporte Demo', type: 'expense', subCategories: JSON.stringify(['Uber']), householdId: 'demo' },
        { id: 'cat_sys_savings', name: 'Ahorro Automático', type: 'income', subCategories: '[]', householdId: 'demo' }
    ];

    const accounts = [
        { id: 'd-a1', name: 'Banco Demo', bank: 'DemoBank', type: 'bank', owner: 'Usuario Demo', balance: 5000000, color: '#3b82f6', householdId: 'demo', isHidden: false },
        { id: 'd-a2', name: 'Efectivo Demo', bank: 'Cartera', type: 'cash', owner: 'Usuario Demo', balance: 200000, color: '#10b981', householdId: 'demo', isHidden: false },
    ];

    // Generamos 10 movimientos falsos
    const transactions = Array.from({ length: 10 }).map((_, i) => ({
        id: uuidv4(),
        type: i % 2 === 0 ? 'expense' : 'income',
        amount: (i + 1) * 50000,
        accountId: 'd-a1',
        categoryId: i % 2 === 0 ? 'd-c2' : 'd-c1',
        description: `Movimiento Demo ${i + 1}`,
        date: new Date().toISOString(),
        isFixed: false,
        isSavings: false,
        householdId: 'demo',
        didWithdraw: true
    }));

    return {
        accounts,
        categories: categories.map(c => ({...c, subCategories: JSON.parse(c.subCategories)})),
        transactions,
        fixedRules: [],
        simulatorItems: []
    };
}