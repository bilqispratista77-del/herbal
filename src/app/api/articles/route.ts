import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || ''
    const slug = searchParams.get('slug') || ''

    const where: Record<string, unknown> = {}

    if (category) {
      where.category = category
    }

    if (slug) {
      where.slug = slug
    }

    const articles = await db.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data artikel' },
      { status: 500 }
    )
  }
}
