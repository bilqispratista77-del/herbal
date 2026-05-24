import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, complaint, message } = body

    if (!name || !phone || !complaint) {
      return NextResponse.json(
        { success: false, error: 'Nama, nomor telepon, dan keluhan wajib diisi' },
        { status: 400 }
      )
    }

    const consultation = await db.consultation.create({
      data: {
        name,
        phone,
        email: email || null,
        complaint,
        message: message || null,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Konsultasi berhasil dikirim. Tim kami akan segera menghubungi Anda.',
      data: consultation,
    })
  } catch (error) {
    console.error('Error creating consultation:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengirim konsultasi' },
      { status: 500 }
    )
  }
}
