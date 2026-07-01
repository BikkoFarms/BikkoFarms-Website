import { cookies } from 'next/headers';
import { isValidAdminPassword, isValidSessionToken, makeSessionToken, ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!password) {
      return Response.json({ error: 'Password required.' }, { status: 400 });
    }

    if (!isValidAdminPassword(password)) {
      return Response.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    const token = makeSessionToken();
    const cookieStore = await cookies();

    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_COOKIE_MAX_AGE,
      path: '/',
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('[admin/login POST]', error);
    return Response.json({ error: 'Server error.' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return Response.json({ success: true });
}
