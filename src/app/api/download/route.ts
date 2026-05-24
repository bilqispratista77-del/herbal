import { NextResponse } from 'next/server'
import { readFileSync, statSync } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'download', 'herbal-nusantara.zip')
    const fileBuffer = readFileSync(filePath)
    const stats = statSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Length': stats.size.toString(),
        'Content-Disposition': 'attachment; filename="herbal-nusantara.zip"',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'File tidak ditemukan' },
      { status: 404 }
    )
  }
}
