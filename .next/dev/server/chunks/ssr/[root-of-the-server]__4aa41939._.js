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
async function sendRegistrationRequestEmail(requestEmail, name, familyName) {
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f4f4f5;">
      <div style="max-width: 500px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #d97706; text-align: center;">Nueva Solicitud de Registro 📝</h2>
        <p style="text-align: center; color: #555;">Un usuario ha solicitado unirse.</p>
        
        <p style="font-size: 12px; color: #777; margin-bottom: 5px; font-weight: bold;">DATOS PARA COPIAR:</p>
        
        <div style="background-color: #18181b; color: #e4e4e7; padding: 20px; border-radius: 8px; border: 1px solid #3f3f46; font-family: monospace; font-size: 14px;">
          <div style="margin-bottom: 10px;">
            <span style="color: #a1a1aa;">Nombre:</span> <br>
            <strong style="color: #fff; font-size: 16px;">${name}</strong>
          </div>
          <div style="margin-bottom: 10px;">
            <span style="color: #a1a1aa;">Email:</span> <br>
            <strong style="color: #fff; font-size: 16px;">${requestEmail}</strong>
          </div>
          <div>
            <span style="color: #a1a1aa;">Household ID:</span> <br>
            <strong style="color: #818cf8; font-size: 16px;">${familyName}</strong>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
           Ve a tu Admin Panel > Agregar Usuario y pega estos datos.
        </p>
      </div>
    </div>
  `;
    await transporter.sendMail({
        from: '"Finance Home Admin" <system@financehome.com>',
        to: 'jhonattan.gonzalez.38@gmail.com',
        subject: `⚠️ Solicitud: ${name} quiere entrar`,
        html: htmlContent
    });
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/Jth/Git Repository/Home/finance-home/lib/demoData.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/demoData.ts
__turbopack_context__.s([
    "generateDemoData",
    ()=>generateDemoData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/uuid/dist-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
;
function generateDemoData() {
    const categories = [
        {
            id: 'd-c1',
            name: 'Salario Demo',
            type: 'income',
            subCategories: JSON.stringify([
                'Nómina'
            ]),
            householdId: 'demo'
        },
        {
            id: 'd-c2',
            name: 'Comida Demo',
            type: 'expense',
            subCategories: JSON.stringify([
                'Restaurante'
            ]),
            householdId: 'demo'
        },
        {
            id: 'd-c3',
            name: 'Transporte Demo',
            type: 'expense',
            subCategories: JSON.stringify([
                'Uber'
            ]),
            householdId: 'demo'
        },
        {
            id: 'cat_sys_savings',
            name: 'Ahorro Automático',
            type: 'income',
            subCategories: '[]',
            householdId: 'demo'
        }
    ];
    const accounts = [
        {
            id: 'd-a1',
            name: 'Banco Demo',
            bank: 'DemoBank',
            type: 'bank',
            owner: 'Usuario Demo',
            balance: 5000000,
            color: '#3b82f6',
            householdId: 'demo',
            isHidden: false
        },
        {
            id: 'd-a2',
            name: 'Efectivo Demo',
            bank: 'Cartera',
            type: 'cash',
            owner: 'Usuario Demo',
            balance: 200000,
            color: '#10b981',
            householdId: 'demo',
            isHidden: false
        }
    ];
    // Generamos 10 movimientos falsos
    const transactions = Array.from({
        length: 10
    }).map((_, i)=>({
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
        categories: categories.map((c)=>({
                ...c,
                subCategories: JSON.parse(c.subCategories)
            })),
        transactions,
        fixedRules: [],
        simulatorItems: []
    };
}
}),
"[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00039bbf824c6cf6f3f31d679e5454b7087aa83620":"getFinanceData","00704d34bab23236c26034f700b64bf62a18f0fcf5":"getCurrentUser","00aa32fa93ed1f89f1ed78fb61e419d8a18ef3022c":"setDemoModeAction","00c8f5ca09e1a0fa4673050cc659a42b359dd9bc3e":"logoutAction","00f4ccd6feba2f51d8fdbe57d41f07dbd60b756342":"seedDatabase","40235ab7bf48351d601dd29c63317b315360906a50":"deleteFixedRule","402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06":"createFixedRule","402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a":"deleteSimulatorItem","40316778cb353211f011f5d54bf25a3dfbe3e909e1":"updateCategory","406c20e6a69942bace393f44cef982f40e5508fbfd":"deleteTransaction","4079df49fafe45a1ab1e12d9a3bd024a49017ff973":"deleteCategory","407c575f36b6abf59084d90735f41e90aa840e68ec":"createCategory","4086d78b4cf852eced4c082dd17fb545b408bf00c1":"updateFixedRule","40a3a35a0de80c6315f5b4b808492893738d32a019":"saveSimulatorItem","40a6494eb23e86774bbc4cd3b762988938ca6ab1f9":"createAccount","40d1d772545060c014e567ca1cc45ca81fa41e0879":"createTransaction","40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382":"deleteAccount","40f8ff2eb8230be2e90afdebebc50430d1370f14e4":"updateAccount","40ff56e5f4c027ed99b6bb2aac60ddf06c34b2ec28":"requestLoginCode","607e93ad86f2ec0d4a234a3fb252434105faa016dd":"loginAction","7063ab8307a907387a61779bb232c30d79ff0e72e4":"createNewUser","70d86761647383fef31e1d6d91eb088cf019729751":"requestRegistration"},"",""] */ __turbopack_context__.s([
    "createAccount",
    ()=>createAccount,
    "createCategory",
    ()=>createCategory,
    "createFixedRule",
    ()=>createFixedRule,
    "createNewUser",
    ()=>createNewUser,
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
    "getCurrentUser",
    ()=>getCurrentUser,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$mail$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/lib/mail.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$demoData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/lib/demoData.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
// --- GLOBAL PRISMA ---
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
async function getCurrentUser() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    // 1. Verificar firma del token
    const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyToken"])(token);
    if (!payload) return null;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        });
        // Si no se encuentra el usuario en BD, retornamos null (inválido)
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
//return await verifyToken(token);
}
async function createNewUser(name, email, householdId) {
    const currentUser = await getCurrentUser();
    // Validación de seguridad básica: Solo User Master puede crear usuarios
    if (currentUser?.email !== process.env.GMAIL_USER) {
        return {
            success: false,
            message: 'No autorizado'
        };
    }
    try {
        const existing = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (existing) return {
            success: false,
            message: 'El usuario ya existe.'
        };
        const existinHouseHold = await prisma.user.findMany({
            where: {
                householdId
            }
        });
        if (!existinHouseHold) {
            await prisma.account.createMany({
                data: [
                    {
                        name: 'Dinero Efectivo',
                        bank: 'Efectivo',
                        type: 'wallet',
                        owner: name,
                        color: '#25ab28ff',
                        householdId: householdId
                    },
                    {
                        name: 'Ahorro Global',
                        bank: 'Ahorro',
                        type: 'savings_virtual',
                        owner: name,
                        color: '#fba300ff',
                        householdId: householdId
                    }
                ]
            });
        }
        await prisma.user.create({
            data: {
                email,
                name,
                householdId,
                token: 'INIT'
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
        return {
            success: true,
            message: 'Usuario creado exitosamente.'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error creando usuario en BD.'
        };
    }
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
            message: 'Usuario no encontrado. Debes solicitar registro.'
        };
    }
    const digits = Math.floor(10000000 + Math.random() * 90000000).toString();
    const specials = "%#-/*@?!+_";
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
    if (!user || !user.token) return {
        success: false,
        message: 'Código incorrecto.'
    };
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
async function requestRegistration(email, name, familyName) {
    const existing = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (existing) return {
        success: false,
        message: 'Correo ya registrado.'
    };
    try {
        // Enviamos nombre, email y familia al correo
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$mail$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRegistrationRequestEmail"])(email, name, familyName);
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
    // 1. Establecer cookie de Demo (Importante: path '/')
    cookieStore.set('is_demo_mode', 'true', {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 // 1 día
    });
    // 2. Borrar token anterior si existe para evitar conflictos
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
    // --- DEMO DATA ---
    const isDemo = cookieStore.get('is_demo_mode')?.value === 'true';
    if (isDemo) {
        const demoData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$lib$2f$demoData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateDemoData"])();
        return {
            ...demoData,
            isDemo: true,
            currentUser: {
                email: 'Usuario Demo',
                householdId: 'demo'
            },
            unauthorized: false
        };
    }
    const user = await getCurrentUser();
    if (!user) {
        return {
            unauthorized: true
        };
    }
    // --- USER DATA ---
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
        // NO poner aquí un filtro solo para 'expense'. 
        // Si tienes filtros de tipo, deben incluir 'income' para que se vea la entrada de la transferencia.
        orderBy: {
            date: 'desc'
        },
        include: {
            account: {
                select: {
                    name: true,
                    color: true
                }
            },
            category: {
                select: {
                    name: true
                }
            }
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
        currentUser: user,
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
    if (!user) return;
    const householdId = user.householdId;
    const date = new Date(data.date);
    // 1. TRANSFERENCIA: CREA DOS MOVIMIENTOS
    if (data.type === 'transfer') {
        // Buscar/Crear categoría
        let transferCat = await prisma.category.findFirst({
            where: {
                householdId,
                name: 'Transferencia Propia'
            }
        });
        if (!transferCat) {
            transferCat = await prisma.category.create({
                data: {
                    householdId,
                    name: 'Transferencia Propia',
                    type: 'transfer',
                    subCategories: JSON.stringify([])
                }
            });
        }
        // A. SALIDA (Gasto - Cuenta Origen)
        await prisma.transaction.create({
            data: {
                householdId,
                type: 'expense',
                amount: data.amount,
                accountId: data.accountId,
                categoryId: transferCat.id,
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
        // B. ENTRADA (Ingreso - Cuenta Destino)
        await prisma.transaction.create({
            data: {
                householdId,
                type: 'income',
                amount: data.amount,
                accountId: data.relatedAccountId,
                categoryId: transferCat.id,
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
        const shouldUpdateBalance = data.type === 'expense' ? data.didWithdraw : true;
        // --- GASTO NORMAL ---
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
                payWithSavings: data.payWithSavings || false,
                didWithdraw: data.payWithSavings ? true : data.didWithdraw ?? true
            }
        });
        /*if (shouldUpdateBalance) {
            const multiplier = data.type === 'income' ? 1 : -1;
            await prisma.account.update({ where: { id: data.accountId }, data: { balance: { increment: data.amount * multiplier } } });
        }*/ // --- LÓGICA DE SALDOS ---
        // A. CASO "GASTAR DE AHORRO" (Expense + payWithSavings)
        if (data.payWithSavings && data.type === 'expense') {
            // Restamos del balance total Y del balanceSafe de la cuenta
            await prisma.account.update({
                where: {
                    id: data.accountId
                },
                data: {
                    balance: {
                        decrement: data.amount
                    },
                    balanceSafe: {
                        decrement: data.amount
                    }
                }
            });
            // Restamos también del Ahorro Global (Cuenta Virtual)
            let savingsAcc = await prisma.account.findFirst({
                where: {
                    type: 'savings_virtual',
                    householdId
                }
            });
            if (savingsAcc) {
                await prisma.account.update({
                    where: {
                        id: savingsAcc.id
                    },
                    data: {
                        balance: {
                            decrement: data.amount
                        }
                    }
                });
            }
        } else if (data.isSavings) {
            // 1. Si es INGRESO y es ahorro: Sube Balance Total y Sube BalanceSafe
            if (data.type === 'income') {
                await prisma.account.update({
                    where: {
                        id: data.accountId
                    },
                    data: {
                        balance: {
                            increment: data.amount
                        },
                        balanceSafe: {
                            increment: data.amount
                        }
                    }
                });
                let savingsAcc = await prisma.account.findFirst({
                    where: {
                        type: 'savings_virtual',
                        householdId
                    }
                });
                if (savingsAcc) await prisma.account.update({
                    where: {
                        id: savingsAcc.id
                    },
                    data: {
                        balance: {
                            increment: data.amount
                        }
                    }
                });
            } else if (data.type === 'expense') {
                /*await prisma.account.update({ 
                    where: { id: data.accountId }, 
                    data: { 
                        // No tocamos balance total porque el dinero no se ha ido del banco, solo cambió de "estado"
                        balanceSafe: { increment: data.amount } 
                    } 
                });*/ // ---> NUEVA LÓGICA: RETIRO FÍSICO PARA AHORRO <---
                if (data.didWithdraw) {
                    // a. Restamos de la cuenta origen (Banco)
                    await prisma.account.update({
                        where: {
                            id: data.accountId
                        },
                        data: {
                            balance: {
                                decrement: data.amount
                            }
                        } // Solo decrementa balance total, no balanceSafe, porque salió del banco
                    });
                    // b. Buscamos (o creamos) la cuenta "Dinero Efectivo"
                    let cashAccount = await prisma.account.findFirst({
                        where: {
                            householdId,
                            name: 'Dinero Efectivo'
                        } // Buscamos por nombre o tipo 'wallet'
                    });
                    if (!cashAccount) {
                        cashAccount = await prisma.account.create({
                            data: {
                                householdId,
                                name: 'Dinero Efectivo',
                                bank: 'Efectivo',
                                type: 'wallet',
                                color: '#10b981',
                                owner: 'Casa'
                            }
                        });
                    }
                    // c. Sumamos a "Dinero Efectivo" como Ahorro (BalanceSafe)
                    // Aquí el dinero entra físicamente y se marca como reservado
                    await prisma.account.update({
                        where: {
                            id: cashAccount.id
                        },
                        data: {
                            balance: {
                                increment: data.amount
                            },
                            balanceSafe: {
                                increment: data.amount
                            }
                        }
                    });
                } else {
                    // ---> LÓGICA ANTIGUA: AHORRO VIRTUAL (No sale del banco) <---
                    await prisma.account.update({
                        where: {
                            id: data.accountId
                        },
                        data: {
                            balanceSafe: {
                                increment: data.amount
                            }
                        }
                    });
                }
                // En AMBOS casos, el "Ahorro Global" (Espejo) aumenta
                let savingsAcc = await prisma.account.findFirst({
                    where: {
                        type: 'savings_virtual',
                        householdId
                    }
                });
                if (!savingsAcc) savingsAcc = await prisma.account.create({
                    data: {
                        householdId,
                        name: 'Bolsillo Ahorros Global',
                        bank: 'Sistema',
                        type: 'savings_virtual',
                        owner: 'Familia',
                        color: '#3b82f6'
                    }
                });
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
        } else {
            const shouldUpdateBalance = data.type === 'expense' ? data.didWithdraw : true;
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
        }
        // Reglas Fijas y Crédito (Igual que antes)
        if (data.createFixedRule && data.type === 'expense') {
            await prisma.fixedRule.create({
                data: {
                    householdId,
                    description: data.description,
                    categoryId: data.categoryId,
                    budgetedAmount: data.budgetedAmount ? parseFloat(data.budgetedAmount) : data.amount,
                    accountIdToCharge: data.accountId,
                    dayOfMonth: data.dayOfMonth || date.getDate(),
                    isActive: true
                }
            });
        }
        if (data.type === 'income' && data.isCredit && data.creditQuotaValue) {
            let debtCat = await prisma.category.findFirst({
                where: {
                    householdId,
                    type: 'expense',
                    name: {
                        contains: 'Deuda'
                    }
                }
            });
            if (!debtCat) debtCat = await prisma.category.create({
                data: {
                    householdId,
                    name: 'Pago Deudas',
                    type: 'expense',
                    subCategories: JSON.stringify([
                        'Cuota Crédito'
                    ])
                }
            });
            await prisma.fixedRule.create({
                data: {
                    householdId,
                    description: `Cuota: ${data.description}`,
                    categoryId: debtCat.id,
                    budgetedAmount: parseFloat(data.creditQuotaValue),
                    accountIdToCharge: data.accountId,
                    dayOfMonth: data.dayOfMonth || new Date().getDate(),
                    isActive: true
                }
            });
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
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
    revalidatePath('/admin');*/ }
async function createAccount(data) {
    const user = await getCurrentUser();
    if (user) await prisma.account.create({
        data: {
            ...data,
            householdId: user.householdId
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
async function createCategory(data) {
    const user = await getCurrentUser();
    if (user) await prisma.category.create({
        data: {
            id: data.id,
            name: data.name,
            type: data.type,
            subCategories: JSON.stringify(data.subCategories || []),
            householdId: user.householdId
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
    if (user) await prisma.fixedRule.create({
        data: {
            ...data,
            description: data.description,
            categoryId: data.categoryId,
            accountIdToCharge: data.accountIdToCharge,
            dayOfMonth: parseInt(data.dayOfMonth),
            householdId: user.householdId,
            budgetedAmount: parseFloat(data.budgetedAmount || '0'),
            staticAmount: data.staticAmount ? parseFloat(data.staticAmount) : null,
            isActive: true
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function updateFixedRule(data) {
    await prisma.fixedRule.update({
        where: {
            id: data.id
        },
        data: {
            description: data.description,
            // Actualizamos ambos
            //staticAmount: data.staticAmount ? parseFloat(data.staticAmount) : null,
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
    if (!user) return;
    const householdId = user.householdId;
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
                householdId
            }
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
async function seedDatabase() {
    const familyId = "familia-gonzalez-marin";
    await prisma.user.upsert({
        where: {
            email: 'jhonattan.gonzalez.38@gmail.com'
        },
        update: {
            householdId: familyId,
            name: 'Jhonattan'
        },
        create: {
            email: 'jhonattan.gonzalez.38@gmail.com',
            token: 'INIT',
            householdId: familyId,
            name: 'Jhonattan'
        }
    });
    await prisma.user.upsert({
        where: {
            email: 'marinthania13@gmail.com'
        },
        update: {
            householdId: familyId,
            name: 'Thannia'
        },
        create: {
            email: 'marinthania13@gmail.com',
            token: 'INIT',
            householdId: familyId,
            name: 'Thannia'
        }
    });
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
    getCurrentUser,
    createNewUser,
    requestLoginCode,
    loginAction,
    requestRegistration,
    setDemoModeAction,
    logoutAction,
    getFinanceData,
    createTransaction,
    createAccount,
    deleteAccount,
    updateAccount,
    createCategory,
    deleteCategory,
    updateCategory,
    deleteTransaction,
    createFixedRule,
    updateFixedRule,
    deleteFixedRule,
    saveSimulatorItem,
    deleteSimulatorItem,
    seedDatabase
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCurrentUser, "00704d34bab23236c26034f700b64bf62a18f0fcf5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createNewUser, "7063ab8307a907387a61779bb232c30d79ff0e72e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestLoginCode, "40ff56e5f4c027ed99b6bb2aac60ddf06c34b2ec28", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginAction, "607e93ad86f2ec0d4a234a3fb252434105faa016dd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestRegistration, "70d86761647383fef31e1d6d91eb088cf019729751", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setDemoModeAction, "00aa32fa93ed1f89f1ed78fb61e419d8a18ef3022c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutAction, "00c8f5ca09e1a0fa4673050cc659a42b359dd9bc3e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFinanceData, "00039bbf824c6cf6f3f31d679e5454b7087aa83620", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTransaction, "40d1d772545060c014e567ca1cc45ca81fa41e0879", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAccount, "40a6494eb23e86774bbc4cd3b762988938ca6ab1f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAccount, "40e0cc86317e5bbbc92ce5488fd0aca39cbd2bb382", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccount, "40f8ff2eb8230be2e90afdebebc50430d1370f14e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "407c575f36b6abf59084d90735f41e90aa840e68ec", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "4079df49fafe45a1ab1e12d9a3bd024a49017ff973", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCategory, "40316778cb353211f011f5d54bf25a3dfbe3e909e1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTransaction, "406c20e6a69942bace393f44cef982f40e5508fbfd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createFixedRule, "402b83f4bbc7ae16a5a9b415e2c3ecca947aeffc06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateFixedRule, "4086d78b4cf852eced4c082dd17fb545b408bf00c1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteFixedRule, "40235ab7bf48351d601dd29c63317b315360906a50", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveSimulatorItem, "40a3a35a0de80c6315f5b4b808492893738d32a019", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSimulatorItem, "402bf14f37e0dac638b5f9d2f991f72f4f1a9b331a", null);
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
    "00c8f5ca09e1a0fa4673050cc659a42b359dd9bc3e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAction"],
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f2e$next$2d$internal$2f$server$2f$app$2f$simulator$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Jth/Git Repository/Home/finance-home/.next-internal/server/app/simulator/page/actions.js { ACTIONS_MODULE0 => "[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Jth$2f$Git__Repository$2f$Home$2f$finance$2d$home$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Jth/Git Repository/Home/finance-home/app/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4aa41939._.js.map