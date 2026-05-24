'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore, type Complaint } from '@/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import {
  Heart,
  Stethoscope,
  Activity,
  Thermometer,
  Brain,
  ShieldCheck,
  Leaf,
  ArrowRight,
  Info,
} from 'lucide-react'

const complaintIcons: Record<string, React.ReactNode> = {
  default: <Stethoscope className="size-6" />,
}

const iconList = [
  <Heart key="heart" className="size-6" />,
  <Stethoscope key="stethoscope" className="size-6" />,
  <Activity key="activity" className="size-6" />,
  <Thermometer key="thermo" className="size-6" />,
  <Brain key="brain" className="size-6" />,
  <ShieldCheck key="shield" className="size-6" />,
  <Leaf key="leaf" className="size-6" />,
]

const accentColors = [
  'bg-herbal-lighter text-herbal',
  'bg-amber-light text-amber',
  'bg-green-50 text-green-700',
  'bg-orange-50 text-orange-700',
  'bg-emerald-50 text-emerald-700',
  'bg-teal-50 text-teal-700',
  'bg-lime-50 text-lime-700',
]

export function SolutionPage() {
  const { navigateTo } = useStore()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchComplaints() {
      setLoading(true)
      try {
        const res = await fetch('/api/complaints')
        if (res.ok) {
          const json = await res.json()
          setComplaints(json.data || json.complaints || [])
        }
      } catch {
        setComplaints([])
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="herbal-gradient text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-white/80 hover:text-white cursor-pointer"
                  onClick={() => navigateTo('home')}
                >
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">
                  Solusi Penyakit
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-4xl font-bold">Solusi Berdasarkan Keluhan</h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Temukan herbal yang tepat untuk mengatasi masalah kesehatan Anda
          </p>
        </div>
      </section>

      {/* Complaints Grid */}
      <section className="container mx-auto px-4 py-10 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-herbal-lighter rounded-full flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="size-10 text-herbal" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Belum Ada Data Keluhan</h2>
            <p className="text-muted-foreground">
              Silakan kembali lagi nanti untuk melihat solusi herbal kami.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {complaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="group hover:shadow-lg hover:border-herbal-light transition-all duration-300 cursor-pointer h-full"
                  onClick={() => navigateTo('solution-detail', { slug: complaint.slug })}
                >
                  <CardContent className="p-6 flex gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${accentColors[index % accentColors.length]}`}>
                      {iconList[index % iconList.length]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-herbal transition-colors">
                        {complaint.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {complaint.description}
                      </p>
                      <Button
                        variant="link"
                        className="text-herbal p-0 h-auto mt-2 text-sm gap-1"
                      >
                        Lihat Solusi
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Educational Note */}
      <section className="bg-herbal-lighter/50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-herbal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="size-8 text-herbal" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-herbal-dark mb-3">
              Pendekatan Herbal
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Produk herbal kami dibuat dari bahan-bahan alami pilihan yang telah digunakan
              secara turun-temurun dalam pengobatan tradisional Indonesia. Setiap rekomendasi
              didasarkan pada penelitian dan pengalaman praktis. Namun, hasil dapat bervariasi
              pada setiap individu. Kami selalu menyarankan untuk berkonsultasi dengan
              tenaga medis profesional untuk kondisi kesehatan yang serius.
            </p>
            <Button
              variant="outline"
              className="mt-6 border-herbal text-herbal hover:bg-herbal hover:text-white"
              onClick={() => navigateTo('contact')}
            >
              Konsultasi Gratis
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
