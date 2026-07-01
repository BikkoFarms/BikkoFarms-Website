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
    const status = searchParams.get('status') ?? '';

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
      ...(status && { status }),
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

    // Summary stats (by role)
    const roleStats = await prisma.waitlistEntry.groupBy({
      by: ['role'],
      _count: { role: true },
    });

    // Summary stats (by status)
    const statusStats = await prisma.waitlistEntry.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    // Summary stats (by region)
    const regionStats = await prisma.waitlistEntry.groupBy({
      by: ['region'],
      _count: { region: true },
    });

    return Response.json({
      entries,
      total,
      page,
      pages: Math.ceil(total / limit),
      stats: roleStats,
      statusStats,
      regionStats,
    });
  } catch (error) {
    console.error('[admin/waitlist GET]', error);
    return Response.json({ error: 'Server error.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await verifyAdmin())) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return Response.json({ error: 'ID and Status are required.' }, { status: 400 });
    }

    const updated = await prisma.waitlistEntry.update({
      where: { id },
      data: { status },
    });

    return Response.json({ success: true, entry: updated });
  } catch (error) {
    console.error('[admin/waitlist PATCH]', error);
    return Response.json({ error: 'Failed to update status.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    let id = searchParams.get('id');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return Response.json({ error: 'ID is required.' }, { status: 400 });
    }

    await prisma.waitlistEntry.delete({
      where: { id },
    });

    return Response.json({ success: true, message: 'Entry deleted successfully.' });
  } catch (error) {
    console.error('[admin/waitlist DELETE]', error);
    return Response.json({ error: 'Failed to delete entry.' }, { status: 500 });
  }
}
