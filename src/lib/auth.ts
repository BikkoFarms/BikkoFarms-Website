/**
 * Admin authentication helpers.
 * Uses a simple cookie-based session.
 * The admin password is stored in the ADMIN_PASSWORD env var.
 */

export const ADMIN_COOKIE_NAME = 'bikko_admin_session';
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export function isValidAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('[Auth] ADMIN_PASSWORD env var is not set.');
    return false;
  }
  return password === adminPassword;
}

export function makeSessionToken(): string {
  return Buffer.from(
    `${process.env.ADMIN_PASSWORD}:${Date.now()}`
  ).toString('base64');
}

export function isValidSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [password] = decoded.split(':');
    return password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}
