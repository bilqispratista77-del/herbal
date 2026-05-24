import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const productId = searchParams.get('productId') || ''

    const where: Record<string, unknown> = {}

    if (featured) {
      where.isFeatured = true
    }

    if (productId) {
      where.productId = productId
    }

    const testimonials = await db.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          select: { name: true, slug: true },
        },
      },
    })

    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data testimoni' },
      { status: 500 }
    )
  }
}
