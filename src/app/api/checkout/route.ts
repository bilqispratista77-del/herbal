import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, customerPhone, customerEmail, address, items, total, paymentMethod } = body

    if (!customerName || !customerPhone || !address || !items || !total || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Data pesanan tidak lengkap. Pastikan semua field wajib terisi.' },
        { status: 400 }
      )
    }

    const order = await db.order.create({
      data: {
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        address,
        items: typeof items === 'string' ? items : JSON.stringify(items),
        total: Number(total),
        paymentMethod,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Pesanan berhasil dibuat!',
      data: {
        orderId: order.id,
        customerName: order.customerName,
        total: order.total,
        paymentMethod: order.paymentMethod,
        status: order.status,
        createdAt: order.createdAt,
      },
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal membuat pesanan' },
      { status: 500 }
    )
  }
}
