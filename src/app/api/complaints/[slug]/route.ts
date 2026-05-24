import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const complaint = await db.complaint.findUnique({
      where: { slug },
      include: {
        products: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })

    if (!complaint) {
      return NextResponse.json(
        { success: false, error: 'Keluhan tidak ditemukan' },
        { status: 404 }
      )
    }

    const data = {
      ...complaint,
      products: complaint.products
        .filter((pc) => pc.product.isActive)
        .map((pc) => pc.product),
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching complaint:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data keluhan' },
      { status: 500 }
    )
  }
}
