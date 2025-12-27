"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogFooter, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Trash2, Plus, Save, Wallet, Building2, Banknote, CreditCard, Palette, RefreshCw, MinusCircle } from 'lucide-react';
import { Account, Category, AccountType, TransactionType } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { seedDatabase } from '@/app/actions'; // Importa la acción
import { Database, UserPlus } from 'lucide-react'; // Agregamos UserPlus para el icono
import { createNewUser } from '@/app/actions';



export default function AdminPage() {
    const {
        accounts, 
        categories, 
        fixedRules,
        addAccount,
        deleteAccountAction: deleteAccount,
        updateAccount,
        addCategory, 
        deleteCategory,
        addSubCategory, 
        removeSubCategory,
        addFixedRule, // <--- Importante traer esta función del contexto
        updateFixedRule, 
        deleteFixedRule,
        currentUser // <--- 1. IMPORTANTE: Extraemos el usuario actual
    } = useFinance();

    // --- ESTADOS PARA MODALES ---
    const [helpOpen, setHelpOpen] = useState(false);

    // Nuevo Usuario
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newFamily, setNewFamily] = useState('');

    // Nueva Cuenta
    const [accName, setAccName] = useState('');
    const [accBank, setAccBank] = useState('');
    const [accOwner, setAccOwner] = useState('Jhonattan');
    const [accType, setAccType] = useState<AccountType>('bank');
    const [accColor, setAccColor] = useState('#3b82f6'); // Azul default
    const [isAccModalOpen, setIsAccModalOpen] = useState(false);

    // Nueva Categoría
    const [catName, setCatName] = useState('');
    const [catType, setCatType] = useState<TransactionType>('expense');
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);

    // --- NUEVOS ESTADOS: MODAL REGLA FIJA ---
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
    const [ruleDesc, setRuleDesc] = useState('');
    const [ruleAmount, setRuleAmount] = useState(''); // Monto Sugerido
    const [ruleBudget, setRuleBudget] = useState(''); // Valor Destinado
    const [ruleDay, setRuleDay] = useState('1');
    const [ruleAccount, setRuleAccount] = useState('');
    const [ruleCategory, setRuleCategory] = useState('');

    const handleCreateAccount = () => {
        if (!accName || !accBank) return;
        const newAcc: Account = {
            id: uuidv4(), name: accName, bank: accBank,
            type: accType, owner: accOwner, balance: 0, isHidden: false, color: accColor
        };
        addAccount(newAcc);
        setAccName(''); setAccBank(''); setIsAccModalOpen(false);
    };

    const handleCreateCategory = () => {
        if (!catName) return;
        const newCat: Category = { id: uuidv4(), name: catName, type: catType, subCategories: [] };
        addCategory(newCat);
        setCatName(''); setIsCatModalOpen(false);
    };
    // Handler Crear Regla Manual
    const handleCreateRule = () => {
        if (!ruleDesc || !ruleBudget || !ruleAccount || !ruleCategory) return;
        addFixedRule({
            id: uuidv4(),
            householdId: currentUser?.householdId || 'demo',
            description: ruleDesc,
            categoryId: ruleCategory,
            accountIdToCharge: ruleAccount,
            dayOfMonth: parseInt(ruleDay),
            budgetedAmount: parseFloat(ruleBudget), // Destinado (Obligatorio)
            staticAmount: ruleAmount ? parseFloat(ruleAmount) : null, // Monto Fijo (Opcional)
            isActive: true
        });
        // Limpiar y cerrar
        setRuleDesc(''); setRuleAmount(''); setRuleBudget(''); setRuleDay('1'); setRuleAccount(''); setRuleCategory('');
        setIsRuleModalOpen(false);
    };
    const handleManualAddUser = async () => {
        const res = await createNewUser(newName, newEmail, newFamily);
        alert(res.message);
    };

    const addUser = () => {


        return (
            <>
                <div className="space-y-4 text-white">
                    <div className="space-y-1 col-span-1"><Label>Nombre</Label><Input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="bg-black border-zinc-700" /></div>
                    <div className="space-y-1 col-span-1"><Label>Correo</Label><Input type="email" required value={newEmail} onChange={e => setNewEmail(e.target.value)} className="bg-black border-zinc-700" /></div>
                    <div className="space-y-1 col-span-1"><Label>Familia</Label><Input type="text" required value={newFamily} onChange={e => setNewFamily(e.target.value)} className="bg-black border-zinc-700" /></div>
                    <DialogTrigger asChild><Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20" onClick={handleManualAddUser}><UserPlus className="mr-2 h-4 w-4" />Añadir</Button></DialogTrigger>
                </div>
            </>
        )
    }

    // Componente interno para editar una regla (evita re-render de toda la lista al escribir)
    const RuleRow = ({ rule }: { rule: any }) => {
        const [desc, setDesc] = useState(rule.description);
        const [amount, setAmount] = useState(rule.budgetedAmount);
        const [day, setDay] = useState(rule.dayOfMonth);
        const [hasChanges, setHasChanges] = useState(false);

        const handleSave = () => {
            updateFixedRule({ ...rule, description: desc, budgetedAmount: parseFloat(amount), dayOfMonth: parseInt(day) });
            setHasChanges(false);
        };

        return (
            <div className="flex flex-col md:flex-row gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-lg items-center">
                <div className="flex-1 w-full space-y-1">
                    <Label className="text-[10px] text-zinc-500">Descripción</Label>
                    <Input value={desc} onChange={e => { setDesc(e.target.value); setHasChanges(true); }} className="bg-zinc-900 h-8 text-sm" />
                </div>
                <div className="w-full md:w-32 space-y-1">
                    <Label className="text-[10px] text-zinc-500">Monto</Label>
                    <Input type="number" value={amount} onChange={e => { setAmount(e.target.value); setHasChanges(true); }} className="bg-zinc-900 h-8 text-sm" />
                </div>
                <div className="w-full md:w-20 space-y-1">
                    <Label className="text-[10px] text-zinc-500">Día Pago</Label>
                    <Input type="number" max="31" value={day} onChange={e => { setDay(e.target.value); setHasChanges(true); }} className="bg-zinc-900 h-8 text-sm text-center" />
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                    {hasChanges && (
                        <Button size="icon" className="h-8 w-8 bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
                            <Save className="h-4 w-4" />
                        </Button>
                    )}
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-900/20" onClick={() => deleteFixedRule(rule.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    return (

        <div className="container mx-auto p-4 max-w-4xl space-y-6 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="outline" size="icon" className="rounded-full border-zinc-700 hover:bg-zinc-800">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">Configuración</h1>
            </div>
            {/* --- 2. NUEVO BLOQUE: SUPER ADMIN (SOLO TU CORREO) --- */}
            {currentUser?.email === 'jhonattan.gonzalez.38@gmail.com' && (
                <>
                    <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-4">
                        <div>
                            <h3 className="font-bold text-indigo-400 flex items-center gap-2">
                                Panel Super Admin
                                <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/50">Jhonattan</span>
                            </h3>
                            <p className="text-xs text-indigo-200">Acciones privilegiadas de sistema.</p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild><Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20"><UserPlus className="mr-2 h-4 w-4" /> Agregar Usuario</Button></DialogTrigger>
                            <DialogContent className="bg-zinc-950 border-zinc-800"><DialogTitle>Nueva Transacción</DialogTitle>{addUser()}</DialogContent>
                        </Dialog>
                    </div>
                    {/* BOTÓN DE EMERGENCIA PARA CARGAR DATOS */}
                    <div className="p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-yellow-500">Base de Datos</h3>
                            <p className="text-xs text-yellow-200">Si acabas de reiniciar el sistema, usa esto para crear cuentas base.</p>
                        </div>
                        <Button
                            onClick={async () => {
                                await seedDatabase();
                                window.location.reload(); // Recarga para ver los datos
                            }}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                            <Database className="mr-2 h-4 w-4" /> Cargar Datos Iniciales
                        </Button>
                    </div>
                </>
            )}


            <Tabs defaultValue="categories" className="space-y-4">
                <TabsList className="bg-zinc-900 border border-zinc-800 w-full justify-start">
                    <TabsTrigger value="categories">Categorías</TabsTrigger>
                    <TabsTrigger value="accounts">Cuentas</TabsTrigger>
                    <TabsTrigger value="fixed">Recurrentes</TabsTrigger>
                </TabsList>

                {/* --- CATEGORÍAS --- */}
                <TabsContent value="categories">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Categorías y Listas</CardTitle>
                                <CardDescription>Define conceptos de ingresos y gastos.</CardDescription>
                            </div>
                            {/* MODAL CREAR CATEGORÍA */}
                            <Dialog open={isCatModalOpen} onOpenChange={setIsCatModalOpen}>
                                <DialogTrigger asChild><Button className="bg-indigo-600"><Plus className="mr-2 h-4 w-4" /> Nueva</Button></DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800">
                                    <DialogTitle>Nueva Categoría</DialogTitle>
                                    <DialogDescription>Crea un agrupador para tus movimientos.</DialogDescription>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label>Nombre</Label>
                                            <Input value={catName} onChange={e => setCatName(e.target.value)} placeholder="Ej: Viajes" className="bg-black border-zinc-800" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Tipo de Movimiento</Label>
                                            <Select value={catType} onValueChange={(v: any) => setCatType(v)}>
                                                <SelectTrigger className="bg-black border-zinc-800"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="income">Ingreso (Dinero entra)</SelectItem>
                                                    <SelectItem value="expense">Gasto (Dinero sale)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter><Button onClick={handleCreateCategory} className="bg-indigo-600">Crear</Button></DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {categories.map(cat => (
                                    <AccordionItem key={cat.id} value={cat.id} className="border-zinc-800">
                                        <AccordionTrigger className="hover:no-underline px-2 hover:bg-zinc-800/50 rounded">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${cat.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                {cat.name} <span className="text-xs text-zinc-500 ml-2">({cat.subCategories?.length || 0} items)</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-4 bg-black/30 space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-xs text-zinc-500 uppercase">{cat.type === 'income' ? 'Ingreso' : 'Gasto'}</span>
                                                <Button variant="ghost" size="sm" onClick={() => deleteCategory(cat.id)} className="text-red-500 h-6"><Trash2 className="h-3 w-3 mr-1" /> Eliminar</Button>
                                            </div>
                                            <div className="space-y-2 pl-2 border-l border-zinc-800">
                                                {cat.subCategories?.map(sub => (
                                                    <div key={sub} className="flex justify-between items-center text-sm p-1 hover:bg-zinc-900 rounded">
                                                        <span>{sub}</span>
                                                        <Trash2 className="h-3 w-3 text-zinc-600 cursor-pointer hover:text-red-400" onClick={() => removeSubCategory(cat.id, sub)} />
                                                    </div>
                                                ))}
                                                <div className="flex gap-2 mt-2">
                                                    <Input id={`in-${cat.id}`} placeholder="Nuevo sub-item..." className="h-8 bg-zinc-900 border-zinc-800 text-xs"
                                                        onKeyDown={(e) => { if (e.key === 'Enter') { addSubCategory(cat.id, e.currentTarget.value); e.currentTarget.value = ''; } }} />
                                                    <Button size="sm" variant="secondary" className="h-8" onClick={() => {
                                                        const el = document.getElementById(`in-${cat.id}`) as HTMLInputElement;
                                                        if (el.value) { addSubCategory(cat.id, el.value); el.value = ''; }
                                                    }}>Add</Button>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- CUENTAS --- */}
                <TabsContent value="accounts">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Mis Cuentas</CardTitle>
                            {/* MODAL CREAR CUENTA */}
                            <Dialog open={isAccModalOpen} onOpenChange={setIsAccModalOpen}>
                                <DialogTrigger asChild><Button className="bg-indigo-600"><Plus className="mr-2 h-4 w-4" /> Nueva</Button></DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800">
                                    <DialogTitle>Nueva Cuenta</DialogTitle>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Nombre Cuenta (Grande)</Label><Input value={accName} onChange={e => setAccName(e.target.value)} placeholder="Ej: Ahorros Nequi" className="bg-black" /></div>
                                            <div className="space-y-2"><Label>Banco (Pequeño)</Label><Input value={accBank} onChange={e => setAccBank(e.target.value)} placeholder="Ej: Nequi" className="bg-black" /></div>
                                        </div>
                                        <div className="space-y-2"><Label>Dueño</Label><Input value={accOwner} onChange={e => setAccOwner(e.target.value)} placeholder="Ej: Thannia" className="bg-black" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Tipo</Label>
                                                <Select value={accType} onValueChange={(v: any) => setAccType(v)}>
                                                    <SelectTrigger className="bg-black"><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="bank">Banco</SelectItem>
                                                        <SelectItem value="wallet">Billetera</SelectItem>
                                                        <SelectItem value="cash">Efectivo</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Color Tarjeta</Label>
                                                <div className="flex gap-2 items-center">
                                                    <Input type="color" value={accColor} onChange={e => setAccColor(e.target.value)} className="w-12 h-10 p-1 bg-black" />
                                                    <span className="text-xs text-zinc-500">{accColor}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter><Button onClick={handleCreateAccount} className="bg-indigo-600">Guardar</Button></DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {accounts.map(acc => (
                                <div key={acc.id} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-10 rounded-full" style={{ backgroundColor: acc.color }}></div>
                                        <div>
                                            <p className="font-bold text-zinc-200">{acc.name}</p>
                                            <p className="text-xs text-zinc-500">{acc.bank} • {acc.owner}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500" onClick={() => deleteAccount(acc.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- CORRECCIÓN EN FIXED RULES --- */}
                <TabsContent value="fixed">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-white">Gastos Recurrentes</h3>
                                <p className="text-zinc-500 text-sm">Edita las fechas y montos base de tus pagos fijos.</p>
                            </div>
                            {/* BOTÓN NUEVA REGLA */}
                            <Dialog open={isRuleModalOpen} onOpenChange={setIsRuleModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-indigo-600"><Plus className="mr-2 h-4 w-4" /> Nueva Regla</Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800">
                                    <DialogHeader>
                                        <DialogTitle>Nuevo Gasto Recurrente</DialogTitle>
                                        <DialogDescription>Crea un recordatorio de pago mensual.</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2"><Label>Descripción</Label><Input placeholder="Ej: Arriendo, Internet" value={ruleDesc} onChange={e => setRuleDesc(e.target.value)} className="bg-black border-zinc-800" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label className="text-emerald-400">Valor Destinado</Label><Input type="number" placeholder="Presupuesto" value={ruleBudget} onChange={e => setRuleBudget(e.target.value)} className="bg-black border-emerald-500/30" /></div>
                                            <div className="space-y-2"><Label className="text-indigo-400">Monto Sugerido (Opc)</Label><Input type="number" placeholder="Lo que pagas" value={ruleAmount} onChange={e => setRuleAmount(e.target.value)} className="bg-black border-indigo-500/30" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label>Día del Mes</Label><Input type="number" min="1" max="31" value={ruleDay} onChange={e => setRuleDay(e.target.value)} className="bg-black border-zinc-800" /></div>
                                            <div className="space-y-2"><Label>Cuenta Paga</Label><Select onValueChange={setRuleAccount}><SelectTrigger className="bg-black border-zinc-800"><SelectValue placeholder="Selecciona" /></SelectTrigger><SelectContent>{accounts.filter(a => !a.isHidden).map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                        <div className="space-y-2"><Label>Categoría</Label><Select onValueChange={setRuleCategory}><SelectTrigger className="bg-black border-zinc-800"><SelectValue placeholder="Selecciona" /></SelectTrigger><SelectContent>{categories.filter(c => c.type === 'expense').map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                                    </div>
                                    <DialogFooter><Button onClick={handleCreateRule} className="bg-indigo-600">Guardar Regla</Button></DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="space-y-2">
                            {fixedRules.length === 0 && <p className="text-zinc-600 text-center py-8">No hay reglas definidas.</p>}
                            {fixedRules.map(rule => (
                                <RuleRow key={rule.id} rule={rule} />
                            ))}
                        </div>

                        <div className="bg-blue-900/10 border border-blue-500/20 p-3 rounded text-xs text-blue-300 flex gap-2">
                            <RefreshCw className="h-4 w-4 shrink-0" />
                            <p>
                                Estos cambios afectan al autocompletado del formulario y a las alertas de retraso. No cambian transacciones pasadas.
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}