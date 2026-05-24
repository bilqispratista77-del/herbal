'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import {
  Download,
  FileArchive,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Server,
  Globe,
  Box,
  Database,
  Leaf,
  Terminal,
  BookOpen,
} from 'lucide-react'

export function DownloadPage() {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setDownloading(true)
    setError(null)
    try {
      const response = await fetch('/api/download')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'herbal-nusantara.zip'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      setDownloaded(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download gagal')
    } finally {
      setDownloading(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="herbal-gradient text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="size-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Download Kode Sumber</h1>
            <p className="text-white/80 text-lg">
              Kode sumber lengkap Herbal Nusantara untuk deploy ke Vercel, cPanel, atau Docker.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Download Card */}
      <section className="container mx-auto px-4 py-16">
        <motion.div {...fadeInUp} className="max-w-xl mx-auto">
          <Card className="border-2 border-herbal/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-herbal-lighter rounded-2xl flex items-center justify-center shrink-0">
                  <FileArchive className="size-7 text-herbal" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">herbal-nusantara.zip</h2>
                  <p className="text-sm text-muted-foreground">2.3 MB — Source code, gambar, database</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-muted/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-herbal shrink-0" /><span>16 halaman + 18 komponen React</span></div>
                <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-herbal shrink-0" /><span>9 REST API + Database SQLite (65 records)</span></div>
                <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-herbal shrink-0" /><span>12 gambar produk + 6 gambar artikel + logo</span></div>
                <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-herbal shrink-0" /><span>DEPLOY.md — panduan Vercel, cPanel, Docker</span></div>
              </div>

              <Button
                size="lg"
                className={`w-full text-base font-semibold py-6 ${downloaded ? 'bg-green-600 hover:bg-green-600' : 'bg-herbal hover:bg-herbal/90'} text-white`}
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <><Loader2 className="size-5 animate-spin mr-2" />Mendownload...</>
                ) : downloaded ? (
                  <><CheckCircle2 className="size-5 mr-2" />Download Berhasil! Klik Ulang</>
                ) : (
                  <><Download className="size-5 mr-2" />Download herbal-nusantara.zip</>
                )}
              </Button>

              {error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive flex items-center gap-2"><AlertCircle className="size-4" />{error}</p>
                </div>
              )}

              {downloaded && !error && (
                <p className="mt-3 text-sm text-center text-muted-foreground">
                  Jika tidak otomatis, <a href="/api/download" className="underline text-herbal" download target="_blank" rel="noopener noreferrer">klik link ini</a>.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <Separator className="container mx-auto max-w-4xl" />

      {/* Quick Setup */}
      <section className="container mx-auto px-4 py-16">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-herbal rounded-full" />
            <h2 className="text-2xl font-bold">Cara Menjalankan</h2>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Ekstrak & Install', desc: 'Ekstrak ZIP, lalu jalankan:', cmd: 'npm install' },
              { title: 'Setup Database', desc: 'Generate Prisma client & seed data:', cmd: 'npx prisma generate && npx prisma db push && npx prisma db seed' },
              { title: 'Jalankan Server', desc: 'Start development server:', cmd: 'npm run dev' },
            ].map((step, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-herbal text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{step.desc}</p>
                    <div className="px-3 py-2 bg-muted rounded-lg overflow-x-auto"><code className="text-xs text-foreground font-mono">{step.cmd}</code></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="container mx-auto max-w-4xl" />

      {/* Deploy Platforms */}
      <section className="bg-herbal-lighter/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Platform Deployment</h2>
            <p className="text-muted-foreground">Pilih platform yang sesuai kebutuhan Anda</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Globe className="size-7 text-herbal" />, title: 'Vercel', desc: 'Upload ke GitHub, import di vercel.com. Gunakan database cloud (Neon/Turso) untuk production.' },
              { icon: <Server className="size-7 text-amber" />, title: 'cPanel', desc: 'Setup via Setup Node.js App di cPanel (v108+). Panduan lengkap di DEPLOY.md.' },
              { icon: <Box className="size-7 text-herbal" />, title: 'Docker', desc: 'Gunakan Dockerfile di DEPLOY.md. Build image & jalankan container.' },
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-3">{p.icon}</div>
                    <h3 className="font-bold text-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          <Card className="border-l-4 border-l-amber border-0">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-amber mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Database di Vercel</h3>
                  <p className="text-sm text-muted-foreground">Vercel bersifat serverless — SQLite tidak persist. Gunakan database cloud seperti <strong>Neon</strong> (PostgreSQL) atau <strong>Turso</strong> (SQLite Cloud). Lihat DEPLOY.md.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-herbal border-0">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <BookOpen className="size-5 text-herbal mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Dokumentasi Lengkap</h3>
                  <p className="text-sm text-muted-foreground">File <strong>DEPLOY.md</strong> berisi panduan deployment lengkap untuk Vercel, cPanel, dan Docker termasuk konfigurasi environment & troubleshooting.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
