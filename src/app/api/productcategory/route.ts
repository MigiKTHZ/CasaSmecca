// /app/api/users/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// Handler for GET requests
export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}
