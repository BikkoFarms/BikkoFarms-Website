import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, role, region } = body;

    // Validation
    if (!name?.trim()) {
      return Response.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!phone?.trim() && !email?.trim()) {
      return Response.json({ error: 'Phone number or email is required.' }, { status: 400 });
    }

    // Check for duplicate (same phone or email already registered)
    if (phone?.trim()) {
      const existing = await prisma.waitlistEntry.findFirst({
        where: { phone: phone.trim() },
      });
      if (existing) {
        return Response.json(
          { success: true, message: 'You are already on the waitlist!', duplicate: true },
          { status: 200 }
        );
      }
    }

    const entry = await prisma.waitlistEntry.create({
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        email: email?.trim().toLowerCase() || null,
        role: role || 'farmer',
        region: region || null,
      },
    });

    return Response.json(
      { success: true, message: 'Welcome to the BikkoChain waitlist!', id: entry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[waitlist POST]', error);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
