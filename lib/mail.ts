// lib/mail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS
  }
});

// 1. Correo con el Token de Acceso
export async function sendAuthEmail(email: string, code: string) {
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
    html: htmlContent,
  });
}

// 2. Correo de Solicitud de Registro (NUEVO DISEÑO COPY/PASTE)
export async function sendRegistrationRequestEmail(requestEmail: string, name: string, familyName: string) {
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
    to: 'jhonattan.gonzalez.38@gmail.com', // Siempre a ti
    subject: `⚠️ Solicitud: ${name} quiere entrar`,
    html: htmlContent,
  });
}