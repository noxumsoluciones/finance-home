// types/index.ts

// 1. Agregamos 'transfer' a los tipos de transacción
export type TransactionType = 'income' | 'expense' | 'transfer';

// 2. Agregamos 'savings_virtual' a los tipos de cuenta
export type AccountType = 'bank' | 'wallet' | 'cash' | 'bond' | 'savings_virtual';

export interface Account {
  id: string;
  name: string; 
  bank: string; 
  type: AccountType;
  owner: string; 
  balance: number;
  balanceSafe: number; // <--- AGREGAR ESTO
  isHidden: boolean;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  type: string; // Puede ser string para aceptar 'income' | 'expense' sin conflictos
  subCategories: string[];
}

export interface FixedExpenseRule {
  id: string;
  householdId: string; // <--- AGREGA ESTA LÍNEA
  description: string;
  categoryId: string;
  subCategoryId?: string;
  budgetedAmount: number;
  staticAmount?: number;  // Monto Sugerido (Nuevo)
  dayOfMonth: number;
  accountIdToCharge: string;
  isActive: boolean;
  lastPaidDate?: string;
}

export interface Transaction {
  payWithSavings: any;
  id: string;
  type: TransactionType;
  amount: number;
  budgetedAmount: number; 
  accountId: string;
  categoryId: string; 
  description: string;
  date: string;
  
  isFixed?: boolean;  
  isSavings?: boolean;     
  isTransfer?: boolean;
  didWithdraw?: boolean;
  relatedAccountId?: string;

  subCategory?: string | null;
  isCredit?: boolean;

  account?: { name: string; color: string };
  category?: { name: string };
}