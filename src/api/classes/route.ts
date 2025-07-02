import { NextResponse } from 'next/server';
import { getAllClasses } from '@/services/class-service';

export async function GET() {
  const { classes, error } = await getAllClasses();
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ classes });
}
