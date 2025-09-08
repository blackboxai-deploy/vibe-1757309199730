import { SignJWT, jwtVerify } from 'jose';
import { User } from '@/types';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function signToken(payload: { userId: string; email: string; role: string }): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ userId: string; email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; email: string; role: string };
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  // For production, use bcrypt or similar
  // This is a simple implementation for demo purposes
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hashedInput = await hashPassword(password);
  return hashedInput === hashedPassword;
}

export function getAuthUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('neurovox_user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function setAuthUser(user: User, token: string): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('neurovox_user', JSON.stringify(user));
  localStorage.setItem('neurovox_token', token);
}

export function clearAuthUser(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('neurovox_user');
  localStorage.removeItem('neurovox_token');
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('neurovox_token');
}