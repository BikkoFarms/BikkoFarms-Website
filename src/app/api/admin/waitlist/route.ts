import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { isValidSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token ? isValidSessionToken(token) : false;
}

export async function GET(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, parseInt(searchParams.get('limit') ?? '50', 10));
    const search = searchParams.get('search')?.trim() ?? '';
    const role = searchParams.get('role') ?? '';
    const region = searchParams.get('region') ?? '';

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
          { phone: { contains: search } },
        ],
      }),
      ...(role && { role }),
      ...(region && { region }),
    };

    const [entries, total] = await Promise.all([
      prisma.waitlistEntry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.waitlistEntry.count({ where }),
    ]);

    // Summary stats
    const stats = await prisma.waitlistEntry.groupBy({
      by: ['role'],
      _count: { role: true },
    });

    return Response.json({
      entries,
      total,
      page,
      pages: Math.ceil(total / limit),
      stats,
    });
  } catch (error) {
    console.error('[admin/waitlist GET]', error);
    return Response.json({ error: 'Server error.' }, { status: 500 });
  }
}
