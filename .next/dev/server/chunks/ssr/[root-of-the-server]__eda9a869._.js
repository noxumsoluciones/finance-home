module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/Jth/Git Repository/Home/finance-home/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/auth.ts
__turbopack_context__.s([
    "getSession",
    ()=>getSession,
    "signToken",
    ()=>signToken,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/jose/dist/webapi/jwt/sign.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'secret-key');
async function signToken(payload) {
    return await new __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignJWT"](payload).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setExpirationTime('30d').sign(SECRET_KEY);
}
async function verifyToken(token) {
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
}
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    return await verifyToken(token);
}
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/Jth/Git Repository/Home/finance-home/lib/mail.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/mail.ts
__turbopack_context__.s([
    "sendAuthEmail",
    ()=>sendAuthEmail,
    "sendRegistrationRequestEmail",
    ()=>sendRegistrationRequestEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/nodemailer/lib/nodemailer.js [app-rsc] (ecmascript)");
;
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
    }
});
async function sendAuthEmail(email, code) {
    const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid #333;">
      <h2 style="color: #6366f1; text-align: center; font-size: 24px; margin-bottom: 10px;">Finance Home 🏠</h2>
      <p style="text-align: center; color: #a1a1aa; font-size: 14px;">Acceso Seguro Familiar</p>
      
      <div style="background-color: #111; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; border: 1px solid #222;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 4px; color: #10b981; font-family: monospace;">${code}</span>
        <p style="color: #555; font-size: 12px; margin-top: 15px;">Este código expira en 15 minutos</p>
      </div>

      <p style="font-size: 14px; color: #71717a; text-align: center;">Si no solicitaste este código, ignora este mensaje.</p>
    </div>
  `;
    await transporter.sendMail({
        from: '"Finance Home Security" <no-reply@financehome.com>',
        to: email,
        subject: `🔐 Tu Código: ${code}`,
        html: htmlContent
    });
}
async function sendRegistrationRequestEmail(requestEmail, familyName) {
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc;">
      <h2 style="color: #d97706;">Nueva Solicitud de Registro 📝</h2>
      <p>Un usuario ha solicitado acceso a Finance Home:</p>
      <ul>
        <li><strong>Email:</strong> ${requestEmail}</li>
        <li><strong>Grupo Familiar:</strong> ${familyName}</li>
      </ul>
      <p>Para autorizarlo, debes agregarlo manualmente a la base de datos o usar el Seed de administración.</p>
    </div>
  `;
    await transporter.sendMail({
        from: '"Finance Home Admin" <system@financehome.com>',
        to: 'jhonattan.gonzalez.38@gmail.com',
        subject: `⚠️ Autorización Requerida: ${requestEmail}`,
        html: htmlContent
    });
}
}),
"[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/actions.ts
/* __next_internal_action_entry_do_not_use__ [{"00039bbf824c6cf6f3f31d679e5454b7087aa83620":"getFinanceData","00aa32fa93ed1f89f1ed78fb61e419d8a18ef3022c":"setDemoModeAction","00c8f5ca09e1a0fa4673050cc659a42b359dd9bc3e":"logoutAction","00f4ccd6feba2f51d8fdbe57d41f07dbd60b756342":"seedDatabase","40235ab7bf48351d601dd29c63317b315360906a50":"deleteFixedRule","402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06":"createFixedRule","402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a":"deleteSimulatorItem","40316778cb353211f011f5d54bf25a3dfbe3e909e1":"updateCategory","406c20e6a69942bace393f44cef982f40e5508fbfd":"deleteTransaction","4079df49fafe45a1ab1e12d9a3bd024a49017ff973":"deleteCategory","407c575f36b6abf59084d90735f41e90aa840e68ec":"createCategory","4086d78b4cf852eced4c082dd17fb545b408bf00c1":"updateFixedRule","40a3a35a0de80c6315f5b4b808492893738d32a019":"saveSimulatorItem","40a6494eb23e86774bbc4cd3b762988938ca6ab1f9":"createAccount","40d1d772545060c014e567ca1cc45ca81fa41e0879":"createTransaction","40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382":"deleteAccount","40f8ff2eb8230be2e90afdebebc50430d1370f14e4":"updateAccount","40ff56e5f4c027ed99b6bb2aac60ddf06c34b2ec28":"requestLoginCode","607e93ad86f2ec0d4a234a3fb252434105faa016dd":"loginAction","60d86761647383fef31e1d6d91eb088cf019729751":"requestRegistration"},"",""] */ __turbopack_context__.s([
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
    "loginAction",
    ()=>loginAction,
    "logoutAction",
    ()=>logoutAction,
    "requestLoginCode",
    ()=>requestLoginCode,
    "requestRegistration",
    ()=>requestRegistration,
    "saveSimulatorItem",
    ()=>saveSimulatorItem,
    "seedDatabase",
    ()=>seedDatabase,
    "setDemoModeAction",
    ()=>setDemoModeAction,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/headers.js [app-rsc] (ecmascript)");
// IMPORTANTE: Importamos UserPayload para corregir los errores rojos
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$mail$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/lib/mail.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
// --- UTILIDAD: OBTENER USUARIO ACTUAL (TIPADO CORRECTAMENTE) ---
async function getCurrentUser() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyToken"])(token);
}
async function requestLoginCode(email) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return {
            success: false,
            message: 'Usuario no encontrado. Debes registrarte primero.'
        };
    }
    // Generar código: 8 dígitos + 1 caracter especial
    const digits = Math.floor(10000000 + Math.random() * 90000000).toString();
    const specials = "%#-/*@";
    const specialChar = specials.charAt(Math.floor(Math.random() * specials.length));
    const secureCode = digits + specialChar;
    await prisma.user.update({
        where: {
            email
        },
        data: {
            token: secureCode
        }
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$mail$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendAuthEmail"])(email, secureCode);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error mailing:", error);
        return {
            success: false,
            message: 'Error enviando correo.'
        };
    }
}
async function loginAction(email, token) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user || user.token !== token) {
        return {
            success: false,
            message: 'Código incorrecto o expirado'
        };
    }
    const jwt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signToken"])({
        id: user.id,
        email: user.email,
        householdId: user.householdId
    });
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('auth_token', jwt, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
    });
    cookieStore.delete('is_demo_mode');
    return {
        success: true
    };
}
async function requestRegistration(email, familyName) {
    const existing = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (existing) {
        return {
            success: false,
            message: 'Correo ya registrado.'
        };
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$mail$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRegistrationRequestEmail"])(email, familyName);
        return {
            success: true,
            message: 'Solicitud enviada al administrador.'
        };
    } catch (e) {
        return {
            success: false,
            message: 'Error de conexión.'
        };
    }
}
async function setDemoModeAction() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('is_demo_mode', 'true', {
        path: '/'
    });
    cookieStore.delete('auth_token');
    return {
        success: true
    };
}
async function logoutAction() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('auth_token');
    cookieStore.delete('is_demo_mode');
    return {
        success: true
    };
}
async function getFinanceData() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const isDemo = cookieStore.get('is_demo_mode')?.value === 'true';
    // Si es Demo, devolvemos flag de demo
    if (isDemo) return {
        isDemo: true
    };
    const user = await getCurrentUser();
    // CORRECCIÓN AQUÍ: En lugar de 'throw new Error', devolvemos un objeto seguro
    if (!user) {
        return {
            unauthorized: true
        }; // <--- ESTO EVITA EL ERROR 500
    }
    const householdId = user.householdId;
    const accounts = await prisma.account.findMany({
        where: {
            householdId
        }
    });
    const categories = await prisma.category.findMany({
        where: {
            householdId
        }
    });
    const transactions = await prisma.transaction.findMany({
        where: {
            householdId
        },
        orderBy: {
            date: 'desc'
        }
    });
    const fixedRules = await prisma.fixedRule.findMany({
        where: {
            householdId
        }
    });
    const simulatorItems = await prisma.simulatorItem.findMany({
        where: {
            householdId
        }
    });
    return {
        isDemo: false,
        unauthorized: false,
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
    const user = await getCurrentUser();
    if (!user) return; // Si no hay usuario, cancelamos
    const householdId = user.householdId; // TypeScript ahora sabe que user existe aquí
    const date = new Date(data.date);
    if (data.type === 'transfer') {
        // Transferencia
        await prisma.transaction.create({
            data: {
                householdId,
                type: 'expense',
                amount: data.amount,
                accountId: data.accountId,
                description: `Transferencia a: ${data.destAccountName}`,
                date,
                isTransfer: true,
                relatedAccountId: data.relatedAccountId,
                didWithdraw: true
            }
        });
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
        await prisma.transaction.create({
            data: {
                householdId,
                type: 'income',
                amount: data.amount,
                accountId: data.relatedAccountId,
                description: `Recibido de: ${data.originAccountName}`,
                date,
                isTransfer: true,
                relatedAccountId: data.accountId,
                didWithdraw: false
            }
        });
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
        // Normal
        const shouldUpdateBalance = data.type === 'expense' ? data.didWithdraw : true;
        await prisma.transaction.create({
            data: {
                householdId,
                type: data.type,
                amount: data.amount,
                budgetedAmount: data.budgetedAmount,
                accountId: data.accountId,
                categoryId: data.categoryId,
                description: data.description,
                date,
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
        if (data.isSavings) {
            let savingsAcc = await prisma.account.findFirst({
                where: {
                    type: 'savings_virtual',
                    householdId
                }
            });
            if (!savingsAcc) {
                savingsAcc = await prisma.account.create({
                    data: {
                        householdId,
                        name: 'Bolsillo Ahorros Global',
                        bank: 'Sistema',
                        type: 'savings_virtual',
                        owner: 'Familia',
                        color: '#3b82f6'
                    }
                });
            }
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
    const user = await getCurrentUser();
    if (user) {
        await prisma.account.create({
            data: {
                ...data,
                householdId: user.householdId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    }
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
async function deleteAccount(id) {
    await prisma.account.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function createCategory(data) {
    const user = await getCurrentUser();
    if (user) {
        await prisma.category.create({
            data: {
                name: data.name,
                type: data.type,
                subCategories: JSON.stringify(data.subCategories || []),
                householdId: user.householdId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    }
}
async function updateCategory(data) {
    await prisma.category.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            type: data.type,
            subCategories: JSON.stringify(data.subCategories)
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
async function deleteTransaction(id) {
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
    if (tx.accountId && tx.didWithdraw && !tx.isTransfer) {
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
async function createFixedRule(data) {
    const user = await getCurrentUser();
    if (user) {
        await prisma.fixedRule.create({
            data: {
                ...data,
                householdId: user.householdId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    }
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
async function saveSimulatorItem(data) {
    const user = await getCurrentUser();
    if (user) {
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
                data: {
                    ...data,
                    householdId: user.householdId
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/simulator');
    }
}
async function deleteSimulatorItem(id) {
    await prisma.simulatorItem.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/simulator');
}
async function seedDatabase() {
    const familyId = "casita-jh-th";
    // Crear/Actualizar usuarios principales
    await prisma.user.upsert({
        where: {
            email: 'jhonattan.gonzalez.38@gmail.com'
        },
        update: {
            householdId: familyId
        },
        create: {
            email: 'jhonattan.gonzalez.38@gmail.com',
            token: 'INIT123',
            householdId: familyId
        }
    });
    await prisma.user.upsert({
        where: {
            email: 'marinthania13@gmail.com'
        },
        update: {
            householdId: familyId
        },
        create: {
            email: 'marinthania13@gmail.com',
            token: 'INIT123',
            householdId: familyId
        }
    });
    // Cuentas básicas solo si no hay nada
    const accCount = await prisma.account.count({
        where: {
            householdId: familyId
        }
    });
    if (accCount === 0) {
        await prisma.account.createMany({
            data: [
                {
                    name: 'Davivienda',
                    bank: 'Davivienda',
                    type: 'bank',
                    owner: 'Jhonattan',
                    color: '#ef4444',
                    householdId: familyId
                },
                {
                    name: 'Nequi',
                    bank: 'Nequi',
                    type: 'bond',
                    owner: 'Thannia',
                    color: '#ec4899',
                    householdId: familyId
                }
            ]
        });
        await prisma.category.createMany({
            data: [
                {
                    name: 'Salario',
                    type: 'income',
                    subCategories: JSON.stringify([
                        'Nómina'
                    ]),
                    householdId: familyId
                },
                {
                    name: 'Alimentación',
                    type: 'expense',
                    subCategories: JSON.stringify([
                        'Mercado'
                    ]),
                    householdId: familyId
                }
            ]
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    requestLoginCode,
    loginAction,
    requestRegistration,
    setDemoModeAction,
    logoutAction,
    getFinanceData,
    createTransaction,
    createAccount,
    updateAccount,
    deleteAccount,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteTransaction,
    createFixedRule,
    updateFixedRule,
    deleteFixedRule,
    saveSimulatorItem,
    deleteSimulatorItem,
    seedDatabase
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestLoginCode, "40ff56e5f4c027ed99b6bb2aac60ddf06c34b2ec28", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginAction, "607e93ad86f2ec0d4a234a3fb252434105faa016dd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestRegistration, "60d86761647383fef31e1d6d91eb088cf019729751", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setDemoModeAction, "00aa32fa93ed1f89f1ed78fb61e419d8a18ef3022c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutAction, "00c8f5ca09e1a0fa4673050cc659a42b359dd9bc3e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFinanceData, "00039bbf824c6cf6f3f31d679e5454b7087aa83620", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTransaction, "40d1d772545060c014e567ca1cc45ca81fa41e0879", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAccount, "40a6494eb23e86774bbc4cd3b762988938ca6ab1f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccount, "40f8ff2eb8230be2e90afdebebc50430d1370f14e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAccount, "40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "407c575f36b6abf59084d90735f41e90aa840e68ec", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCategory, "40316778cb353211f011f5d54bf25a3dfbe3e909e1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "4079df49fafe45a1ab1e12d9a3bd024a49017ff973", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTransaction, "406c20e6a69942bace393f44cef982f40e5508fbfd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createFixedRule, "402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateFixedRule, "4086d78b4cf852eced4c082dd17fb545b408bf00c1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteFixedRule, "40235ab7bf48351d601dd29c63317b315360906a50", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveSimulatorItem, "40a3a35a0de80c6315f5b4b808492893738d32a019", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSimulatorItem, "402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(seedDatabase, "00f4ccd6feba2f51d8fdbe57d41f07dbd60b756342", null);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__eda9a869._.js.map