import { NextResponse } from 'next/server';
import { mockClasses } from '../../data/mockClasses';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockClasses,
      count: mockClasses.length
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch classes' 
      },
      { status: 500 }
    );
  }
}
