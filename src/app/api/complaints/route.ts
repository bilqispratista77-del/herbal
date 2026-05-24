import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const complaints = await db.complaint.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    const data = complaints.map((c) => ({
      ...c,
      productCount: c._count.products,
    }))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching complaints:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data keluhan' },
      { status: 500 }
    )
  }
}
