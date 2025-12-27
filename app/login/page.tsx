"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginAction, setDemoModeAction, requestLoginCode, requestRegistration, seedDatabase } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Lock, Eye, Mail, ArrowRight, UserPlus, Info, Terminal, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export default function LoginPage() {
    const [welcomeOpen, setWelcomeOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // --- NUEVO ESTADO PARA ERROR ---
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        seedDatabase().catch(() => { });
        // Abrir modal de bienvenida al montar
        setWelcomeOpen(true);
    }, []);

    // ... (Resto de funciones handleRequestCode, handleLogin, etc. IGUALES) ...
    const handleRequestCode = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); const res = await requestLoginCode(email); setLoading(false); if (res.success) setStep(2); else alert(res.message); };
    const handleLogin = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); const res = await loginAction(email, token); if (res.success) window.location.href = '/'; else { alert("Código incorrecto"); setLoading(false); } };
    const handleRegister = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); const res = await requestRegistration(email, name, familyName); setLoading(false); if (res.success) alert("✅ Solicitud enviada."); else alert("Error: " + res.message); };
    const handleDemo = async () => { setLoading(true); await setDemoModeAction(); window.location.href = '/'; };


    // --- NUEVA FUNCIÓN PARA EL BOTÓN ---
    const handleCreateAdmin = async () => {
        setLoading(true);
        try {
            const res = await seedDatabase();
            if (res?.success) {
                alert("✅ Usuario Jhonattan creado/restaurado con éxito.");
                // Opcional: Autocompletar el correo para entrar rápido
                setEmail('jhonattan.gonzalez.38@gmail.com');
                setStep(1);
            } else {
                alert("Hubo un problema creando los datos semilla.");
            }
        } catch (error) {
            alert("Error de conexión.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* MODAL BIENVENIDA */}
            <Dialog open={welcomeOpen} onOpenChange={setWelcomeOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-800 max-w-sm">
                    <DialogHeader>
                        <div className="mx-auto bg-indigo-900/20 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                            <Terminal className="h-8 w-8 text-indigo-400" />
                        </div>
                        <DialogTitle className="text-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                            Noxum Soluciones
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-400">
                            Bienvenido a <strong>Finance Home</strong>.
                            <br />
                            Tu plataforma integral de gestión financiera familiar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 text-sm text-zinc-500 text-center py-2">
                        <p>✨ Control de Ingresos y Gastos</p>
                        <p>📊 Proyecciones y Ahorros</p>
                        <p>🤖 Automatización Inteligente</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setWelcomeOpen(false)} className="w-full bg-indigo-600 hover:bg-indigo-700">Comenzar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ... (RESTO DEL FORMULARIO DE LOGIN - COPIAR CODIGO ANTERIOR) ... */}
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl z-10">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-900/30 text-indigo-400 mb-4"><Lock className="w-6 h-6" /></div>
                    <h1 className="text-2xl font-bold text-white">Bienvenido</h1>
                    <p className="text-zinc-500 text-sm">Gestión Financiera Familiar</p>
                </div>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-zinc-950 mb-6"><TabsTrigger value="login">Ingresar</TabsTrigger><TabsTrigger value="register">Solicitar</TabsTrigger></TabsList>
                    <TabsContent value="login">
                        {step === 1 ? (
                            <form onSubmit={handleRequestCode} className="space-y-4">
                                <div className="space-y-2"><label className="text-xs text-zinc-400 ml-1">Correo</label><Input type="email" placeholder="ejemplo@gmail.com" className="bg-black border-zinc-800 h-12 text-white" value={email} onChange={e => setEmail(e.target.value)} required /></div>
                                <Button type="submit" disabled={loading} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 font-bold">{loading ? 'Enviando...' : 'Siguiente'} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            </form>
                        ) : (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="text-center text-zinc-400 text-sm mb-2">Ingresa el código enviado a <span className="text-white">{email}</span></div>
                                <Input type="text" placeholder="TOKEN" autoFocus className="bg-black border-zinc-800 h-14 text-center text-2xl tracking-widest text-emerald-400 font-mono" value={token} onChange={e => setToken(e.target.value)} required />
                                <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 font-bold">{loading ? 'Validando...' : 'Entrar'}</Button>
                                <button type="button" onClick={() => setStep(1)} className="text-xs text-indigo-400 w-full mt-2 hover:underline">Corregir correo</button>
                            </form>
                        )}
                    </TabsContent>
                    <TabsContent value="register">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <Input className="bg-black border-zinc-800" placeholder="Nombre Completo" required value={name} onChange={e => setName(e.target.value)} />
                            <Input className="bg-black border-zinc-800" type="email" placeholder="Correo" required value={email} onChange={e => setEmail(e.target.value)} />
                            <Input className="bg-black border-zinc-800" placeholder="Nombre Grupo Familiar" required value={familyName} onChange={e => setFamilyName(e.target.value)} />
                            <Button type="submit" disabled={loading} className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"><UserPlus className="mr-2 h-4 w-4" /> Solicitar Acceso</Button>
                        </form>
                    </TabsContent>
                </Tabs>
                <div className="mt-8 pt-6 border-t border-zinc-800">
                    <Button variant="outline" onClick={handleDemo} className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300"><Eye className="mr-2 h-4 w-4" /> Ver Demo</Button>
                    {/* --- BOTÓN PARA CREAR TU USUARIO (SOLO DEV) --- 
                    <Button variant="ghost" onClick={handleCreateAdmin} disabled={loading} className="w-full text-xs text-zinc-600 hover:text-zinc-300 hover:bg-transparent">
                        <Database className="mr-2 h-3 w-3" /> Restaurar Mi Usuario (Jhonattan)
                    </Button>*/}
                </div>
            </div>
        </div>
    );
}