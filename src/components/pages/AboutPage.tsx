'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
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
  ShieldCheck,
  Award,
  Leaf,
  Users,
  Clock,
  Heart,
  ShoppingBag,
  ArrowRight,
  Eye,
  Target,
  Sparkles,
} from 'lucide-react'

const stats = [
  {
    icon: <Users className="size-7" />,
    value: '5000+',
    label: 'Pelanggan Puas',
    color: 'text-herbal',
    bg: 'bg-herbal-lighter',
  },
  {
    icon: <Leaf className="size-7" />,
    value: '50+',
    label: 'Produk Herbal',
    color: 'text-herbal',
    bg: 'bg-herbal-lighter',
  },
  {
    icon: <Clock className="size-7" />,
    value: '7+',
    label: 'Tahun Pengalaman',
    color: 'text-amber',
    bg: 'bg-amber-light',
  },
  {
    icon: <Sparkles className="size-7" />,
    value: '100%',
    label: 'Bahan Alami',
    color: 'text-herbal',
    bg: 'bg-herbal-lighter',
  },
]

const certifications = [
  {
    icon: <ShieldCheck className="size-10" />,
    title: 'BPOM',
    description: 'Terdaftar di Badan Pengawas Obat dan Makanan',
    color: 'text-herbal',
    bg: 'bg-herbal-lighter',
  },
  {
    icon: <Award className="size-10" />,
    title: 'Halal',
    description: 'Sertifikasi halal dari lembaga terakreditasi',
    color: 'text-amber',
    bg: 'bg-amber-light',
  },
  {
    icon: <ShieldCheck className="size-10" />,
    title: 'ISO',
    description: 'Standar manajemen mutu internasional',
    color: 'text-herbal',
    bg: 'bg-herbal-lighter',
  },
  {
    icon: <Award className="size-10" />,
    title: 'GMP',
    description: 'Good Manufacturing Practice bersertifikat',
    color: 'text-amber',
    bg: 'bg-amber-light',
  },
]

const missions = [
  'Menyediakan produk herbal berkualitas tinggi dengan bahan-bahan alami pilihan dari seluruh Nusantara.',
  'Mengembalikan kepercayaan masyarakat terhadap pengobatan tradisional Indonesia (jamu) melalui inovasi modern.',
  'Mengedukasi masyarakat tentang pentingnya gaya hidup sehat dan manfaat herbal dalam kesehatan sehari-hari.',
  'Membangun kemitraan yang adil dan berkelanjutan dengan petani lokal penyedia bahan baku herbal.',
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function AboutPage() {
  const { navigateTo } = useStore()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="herbal-gradient text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
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
                  Tentang Kami
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="size-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tentang Herbal Nusantara
            </h1>
            <p className="text-white/80 text-lg md:text-xl">
              Menghadirkan kearifan lokal Nusantara dalam setiap produk herbal
              untuk kesehatan dan kesejahteraan keluarga Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-herbal rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Cerita Kami
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Herbal Nusantara lahir dari kecintaan mendalam terhadap warisan pengobatan
              tradisional Indonesia. Didirikan oleh sekelompok pemuda yang memiliki visi
              untuk mengangkat kembali kejayaan jamu Nusantara ke era modern, kami percaya
              bahwa alam Indonesia menyimpan segudang manfaat yang belum sepenuhnya
              dimanfaatkan.
            </p>
            <p>
              Berawal dari riset sederhana di dapur pada tahun 2017, kami mulai
              meracik formula herbal berdasarkan resep turun-temurun yang dikombinasikan
              dengan pengetahuan ilmiah modern. Setiap produk kami dibuat dengan cermat
              menggunakan bahan-bahan berkualitas tinggi yang dipilih langsung dari petani
              lokal di berbagai penjuru Nusantara.
            </p>
            <p>
              Misi kami sederhana: membawa kearifan lokal dalam pengobatan herbal ke
              setiap rumah tangga Indonesia dengan standar kualitas modern. Kami berkomitmen
              untuk menjaga kemurnian setiap bahan, memproses dengan teknologi terkini,
              dan memastikan setiap produk yang sampai ke tangan Anda aman dan berkhasiat.
            </p>
            <p>
              Setiap produk Herbal Nusantara telah terdaftar di BPOM dan memiliki sertifikasi
              halal. Kami juga menerapkan standar GMP (Good Manufacturing Practice) dalam
              setiap proses produksi untuk menjamin kualitas yang konsisten. Karena
              kesehatan Anda adalah prioritas utama kami.
            </p>
          </div>
        </motion.div>
      </section>

      <Separator className="container mx-auto max-w-4xl" />

      {/* Vision & Mission */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div {...fadeInUp}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-herbal-lighter rounded-2xl flex items-center justify-center mb-5">
                  <Eye className="size-7 text-herbal" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Visi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi perusahaan herbal terdepan di Indonesia yang mengangkat
                  kearifan lokal Nusantara ke kancah nasional dan internasional,
                  serta menjadi pilihan utama masyarakat dalam menjaga kesehatan
                  secara alami.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission */}
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-amber-light rounded-2xl flex items-center justify-center mb-5">
                  <Target className="size-7 text-amber" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Misi</h3>
                <ol className="space-y-4">
                  {missions.map((mission, index) => (
                    <li key={index} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-herbal text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span>{mission}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-herbal-lighter/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Sertifikasi & Jaminan Kualitas
            </h2>
            <p className="text-muted-foreground">
              Kami berkomitmen untuk menjaga standar kualitas tertinggi
            </p>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${cert.bg} rounded-2xl flex items-center justify-center mx-auto mb-3 ${cert.color}`}>
                        {cert.icon}
                      </div>
                      <h3 className="font-bold text-foreground mb-1">{cert.title}</h3>
                      <p className="text-xs text-muted-foreground">{cert.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16">
        <motion.div {...fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="herbal-gradient text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Heart className="size-12 mx-auto mb-4 text-herbal-light" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memulai Perjalanan Herbal Anda?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Jelajahi koleksi produk herbal kami dan temukan solusi alami
              untuk kesehatan Anda dan keluarga.
            </p>
            <Button
              size="lg"
              className="bg-amber hover:bg-amber/90 text-white font-semibold text-base px-8"
              onClick={() => navigateTo('shop')}
            >
              <ShoppingBag className="size-5" />
              Jelajahi Produk
              <ArrowRight className="size-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
