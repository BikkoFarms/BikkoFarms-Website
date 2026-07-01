import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { isValidSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import type { NextRequest } from 'next/server';
import * as XLSX from 'xlsx';

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

  const format = request.nextUrl.searchParams.get('format') ?? 'csv';

  try {
    const entries = await prisma.waitlistEntry.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        region: true,
        createdAt: true,
      },
    });

    const rows = entries.map((e) => ({
      ID: e.id,
      Name: e.name,
      Phone: e.phone ?? '',
      Email: e.email ?? '',
      Role: e.role,
      Region: e.region ?? '',
      'Joined At': e.createdAt.toISOString(),
    }));

    if (format === 'csv') {
      const header = Object.keys(rows[0] ?? {}).join(',');
      const body = rows
        .map((row) =>
          Object.values(row)
            .map((v) => `"${String(v).replace(/"/g, '""')}"`)
            .join(',')
        )
        .join('\n');
      const csv = `${header}\n${body}`;

      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="bikkochain-waitlist-${Date.now()}.csv"`,
        },
      });
    }

    if (format === 'excel') {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(rows);
      // Column widths
      ws['!cols'] = [
        { wch: 28 }, // ID
        { wch: 22 }, // Name
        { wch: 18 }, // Phone
        { wch: 28 }, // Email
        { wch: 14 }, // Role
        { wch: 20 }, // Region
        { wch: 22 }, // Joined At
      ];
      XLSX.utils.book_append_sheet(wb, ws, 'Waitlist');
      const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

      return new Response(buf, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="bikkochain-waitlist-${Date.now()}.xlsx"`,
        },
      });
    }

    if (format === 'json') {
      return Response.json(rows);
    }

    return Response.json({ error: 'Invalid format. Use csv, excel, or json.' }, { status: 400 });
  } catch (error) {
    console.error('[admin/export GET]', error);
    return Response.json({ error: 'Export failed.' }, { status: 500 });
  }
}
