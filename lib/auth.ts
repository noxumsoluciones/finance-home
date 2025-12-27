// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'secret-key');

// Definimos la interfaz exacta del usuario
export interface UserPayload {
  id: string;
  email: string;
  householdId: string;
  [key: string]: any;
}

export async function signToken(payload: UserPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d') 
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as UserPayload;
  } catch (error) {
    return null;
  }
}

// Corrección para Next.js 15: cookies() es asíncrono
export async function getSession() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}