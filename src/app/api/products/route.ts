import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const complaint = searchParams.get('complaint') || ''
    const form = searchParams.get('form') || ''
    const sort = searchParams.get('sort') || 'newest'
    const bestseller = searchParams.get('bestseller') === 'true'
    const isNew = searchParams.get('new') === 'true'

    const where: Record<string, unknown> = { isActive: true }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { shortDesc: { contains: search } },
        { description: { contains: search } },
      ]
    }

    if (category) {
      where.category = { slug: category }
    }

    if (complaint) {
      where.complaints = {
        some: { complaint: { slug: complaint } },
      }
    }

    if (form) {
      where.form = form
    }

    if (bestseller) {
      where.isBestSeller = true
    }

    if (isNew) {
      where.isNew = true
    }

    const orderBy: Record<string, string> =
      sort === 'bestseller'
        ? { isBestSeller: 'desc' }
        : sort === 'newest'
          ? { createdAt: 'desc' }
          : sort === 'price-asc'
            ? { price: 'asc' }
            : sort === 'price-desc'
              ? { price: 'desc' }
              : { createdAt: 'desc' }

    const products = await db.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        complaints: {
          include: { complaint: true },
        },
      },
    })

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data produk' },
      { status: 500 }
    )
  }
}
