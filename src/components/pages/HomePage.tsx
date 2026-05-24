'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Leaf,
  ShieldCheck,
  MessageCircle,
  Truck,
  Star,
  ArrowRight,
  Phone,
  Heart,
  Flower2,
  Droplets,
  Pill,
  Bean,
  Stethoscope,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore, type Product, type Category, type Complaint, type Testimonial, type Article } from '@/store/useStore'
import { formatRupiah } from '@/lib/format'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function HomePage() {
  const { navigateTo, addToCart } = useStore()
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [bestRes, catRes, compRes, testRes, artRes] = await Promise.allSettled([
          fetch('/api/products?bestseller=true').then((r) => r.json()),
          fetch('/api/categories').then((r) => r.json()),
          fetch('/api/complaints').then((r) => r.json()),
          fetch('/api/testimonials?featured=true').then((r) => r.json()),
          fetch('/api/articles').then((r) => r.json()),
        ])

        const extract = (res: PromiseSettledResult<any>): any[] => {
          if (res.status !== 'fulfilled') return []
          const d = res.value?.data
          return Array.isArray(d) ? d : []
        }

        setBestSellers(extract(bestRes).slice(0, 6))
        setCategories(extract(catRes))
        setComplaints(extract(compRes))
        setTestimonials(extract(testRes).slice(0, 3))
        setArticles(extract(artRes).slice(0, 3))
      } catch {
        // Silently fail with empty data
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-herbal-dark via-herbal to-herbal-light">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute top-1/4 right-10 h-40 w-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-white/5" />
          <div className="absolute top-20 right-1/4 opacity-10">
            <Leaf className="h-32 w-32 rotate-45 text-white" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-10">
            <Flower2 className="h-24 w-24 -rotate-12 text-white" />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Badge className="mb-6 bg-amber/90 text-white hover:bg-amber">
              <Heart className="mr-1 h-3 w-3" /> 100% Alami & Terdaftar BPOM
            </Badge>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Solusi Herbal Alami{' '}
              <span className="text-amber-light">untuk Kesehatan Anda</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
              Temukan keajaiban herbal Nusantara yang telah terbukti membantu ribuan orang
              menjaga kesehatan secara alami
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-amber text-white hover:bg-amber/90 min-w-[180px]"
                onClick={() => navigateTo('shop')}
              >
                Jelajahi Produk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                className="min-w-[180px] bg-white/10 text-white border-2 border-white hover:bg-white hover:text-herbal-dark font-semibold"
                onClick={() => navigateTo('contact')}
              >
                <Phone className="mr-2 h-4 w-4" />
                Konsultasi Gratis
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="-mt-6 relative z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {[
              { text: 'BPOM Terdaftar', icon: ShieldCheck },
              { text: '100% Alami', icon: Leaf },
              { text: 'Halal', icon: Heart },
              { text: 'Gratis Konsultasi', icon: MessageCircle },
            ].map((badge, i) => (
              <motion.div
                key={badge.text}
                variants={fadeInUp}
                custom={i}
              >
                <div className="flex items-center justify-center gap-2 rounded-xl bg-white p-3 shadow-md sm:p-4">
                  <badge.icon className="h-5 w-5 shrink-0 text-herbal" />
                  <span className="text-xs font-semibold text-gray-700 sm:text-sm">
                    {badge.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BENEFITS SECTION ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-herbal-dark sm:text-3xl">
              Mengapa Memilih Herbal Nusantara?
            </h2>
            <p className="mt-3 text-gray-500">
              Kami berkomitmen memberikan yang terbaik untuk kesehatan Anda
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Leaf,
                title: '100% Bahan Alami',
                desc: 'Diproduksi dari bahan-bahan herbal pilihan tanpa bahan kimia berbahaya',
                color: 'bg-herbal-lighter text-herbal',
              },
              {
                icon: ShieldCheck,
                title: 'Terdaftar BPOM',
                desc: 'Semua produk telah terdaftar dan lolos uji keamanan Badan POM Indonesia',
                color: 'bg-emerald-50 text-emerald-600',
              },
              {
                icon: MessageCircle,
                title: 'Gratis Konsultasi',
                desc: 'Tim ahli herbal kami siap membantu Anda memilih produk yang tepat',
                color: 'bg-amber-light text-amber',
              },
              {
                icon: Truck,
                title: 'Pengiriman Cepat',
                desc: 'Pengiriman ke seluruh Indonesia dengan packing aman dan terjamin',
                color: 'bg-orange-50 text-orange-600',
              },
            ].map((benefit, i) => (
              <motion.div key={benefit.title} variants={fadeInUp} custom={i}>
                <Card className="h-full border-none shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${benefit.color}`}
                    >
                      <benefit.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-800">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="bg-herbal-lighter/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 flex items-end justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-2xl font-bold text-herbal-dark sm:text-3xl">
                Produk Terlaris
              </h2>
              <p className="mt-2 text-gray-500">
                Pilihan terbaik yang paling banyak dipesan
              </p>
            </div>
            <Button
              variant="ghost"
              className="hidden text-herbal hover:text-herbal-dark sm:inline-flex"
              onClick={() => navigateTo('shop')}
            >
              Lihat Semua
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="overflow-hidden">
                  <Skeleton className="h-56 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="mb-2 h-5 w-3/4" />
                    <Skeleton className="mb-3 h-4 w-full" />
                    <Skeleton className="h-6 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : bestSellers.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <Leaf className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">Belum ada produk terlaris</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {bestSellers.map((product, i) => (
                <motion.div key={product.id} variants={fadeInUp} custom={i}>
                  <ProductCard
                    product={product}
                    onClick={() =>
                      navigateTo('product-detail', { slug: product.slug })
                    }
                    onAddToCart={() => addToCart(product)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button
              variant="outline"
              className="text-herbal"
              onClick={() => navigateTo('shop')}
            >
              Lihat Semua Produk
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-herbal-dark sm:text-3xl">
              Kategori Herbal
            </h2>
            <p className="mt-2 text-gray-500">
              Temukan produk berdasarkan kebutuhan kesehatan Anda
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <Skeleton key={n} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <Leaf className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">Belum ada kategori</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories.map((cat, i) => (
                <motion.div key={cat.id} variants={fadeInUp} custom={i}>
                  <button
                    onClick={() => navigateTo('shop', { category: cat.slug })}
                    className="group flex w-full flex-col items-center gap-3 rounded-xl border bg-white p-6 shadow-sm transition-all hover:border-herbal hover:shadow-md"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-herbal-lighter text-herbal transition-colors group-hover:bg-herbal group-hover:text-white">
                      {cat.icon === 'kapsul' && <Pill className="h-7 w-7" />}
                      {cat.icon === 'cair' && <Droplets className="h-7 w-7" />}
                      {cat.icon === 'serbuk' && <Bean className="h-7 w-7" />}
                      {cat.icon === 'teh' && <Leaf className="h-7 w-7" />}
                      {!['kapsul', 'cair', 'serbuk', 'teh'].includes(cat.icon || '') && (
                        <Stethoscope className="h-7 w-7" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-herbal-dark">
                        {cat.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {cat._count?.products ?? 0} produk
                      </p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== SOLUTIONS BY COMPLAINT ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-herbal-dark sm:text-3xl">
              Solusi Berdasarkan Keluhan
            </h2>
            <p className="mt-2 text-gray-500">
              Temukan herbal yang tepat untuk masalah kesehatan Anda
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-28 rounded-xl" />
              ))}
            </div>
          ) : complaints.length === 0 ? (
            <div className="rounded-xl bg-herbal-lighter/50 p-12 text-center">
              <Heart className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">Belum ada keluhan tersedia</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {complaints.slice(0, 6).map((complaint, i) => (
                <motion.div key={complaint.id} variants={fadeInUp} custom={i}>
                  <button
                    onClick={() =>
                      navigateTo('solution-detail', { slug: complaint.slug })
                    }
                    className="group flex w-full items-start gap-4 rounded-xl border bg-white p-5 text-left shadow-sm transition-all hover:border-herbal hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-herbal-lighter text-herbal transition-colors group-hover:bg-herbal group-hover:text-white">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 group-hover:text-herbal-dark">
                        {complaint.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                        {complaint.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-herbal" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-herbal-lighter/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-herbal-dark sm:text-3xl">
              Apa Kata Mereka?
            </h2>
            <p className="mt-2 text-gray-500">
              Testimoni nyata dari pelanggan kami
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-56 rounded-xl" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <Star className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">Belum ada testimoni</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((t, i) => (
                <motion.div key={t.id} variants={fadeInUp} custom={i}>
                  <Card className="h-full border-none shadow-sm">
                    <CardContent className="p-6">
                      {/* Stars */}
                      <div className="mb-3 flex gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`h-4 w-4 ${
                              idx < t.rating
                                ? 'fill-amber text-amber'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-gray-600 italic">
                        &ldquo;{t.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-herbal-lighter text-sm font-bold text-herbal">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">
                            {t.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {t.location || 'Indonesia'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== EDUCATION / ARTICLES ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 flex items-end justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-2xl font-bold text-herbal-dark sm:text-3xl">
                Artikel Kesehatan
              </h2>
              <p className="mt-2 text-gray-500">
                Tips dan informasi seputar kesehatan herbal
              </p>
            </div>
            <Button
              variant="ghost"
              className="hidden text-herbal hover:text-herbal-dark sm:inline-flex"
              onClick={() => navigateTo('education')}
            >
              Lihat Semua
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="overflow-hidden">
                  <Skeleton className="h-44 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="mb-2 h-5 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">Belum ada artikel</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {articles.map((article, i) => (
                <motion.div key={article.id} variants={fadeInUp} custom={i}>
                  <Card
                    className="group cursor-pointer overflow-hidden shadow-sm transition-shadow hover:shadow-md"
                    onClick={() =>
                      navigateTo('education-detail', { slug: article.slug })
                    }
                  >
                    <div className="aspect-video overflow-hidden bg-herbal-lighter">
                      <img
                        src={
                          article.image ||
                          `https://placehold.co/400x225/D8F3DC/2D6A4F?text=${encodeURIComponent(article.title.slice(0, 10))}`
                        }
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="mb-1 text-xs text-gray-400">
                        {article.category || 'Kesehatan'} &bull;{' '}
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <h3 className="mb-2 line-clamp-2 font-semibold text-gray-800 group-hover:text-herbal-dark">
                        {article.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-500">
                        {article.excerpt}
                      </p>
                      <span className="mt-3 inline-flex items-center text-sm font-medium text-herbal">
                        Baca Selengkapnya
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button
              variant="outline"
              className="text-herbal"
              onClick={() => navigateTo('education')}
            >
              Lihat Semua Artikel
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="herbal-gradient py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Masih Ragu? Konsultasikan Gratis!
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Tim ahli kami siap membantu Anda menemukan herbal yang tepat untuk
              kebutuhan kesehatan Anda. Konsultasi gratis, tanpa komitmen.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-amber text-white hover:bg-amber/90 min-w-[200px]"
                onClick={() => navigateTo('contact')}
              >
                Konsultasi Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

/* ===== Reusable Product Card ===== */
function ProductCard({
  product,
  onClick,
  onAddToCart,
}: {
  product: Product
  onClick: () => void
  onAddToCart: () => void
}) {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-none shadow-sm transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-herbal-lighter">
        <img
          src={
            product.image ||
            `https://placehold.co/400x400/D8F3DC/2D6A4F?text=${encodeURIComponent(product.name.slice(0, 10))}`
          }
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isBestSeller && (
            <Badge className="bg-amber text-white text-xs">Terlaris</Badge>
          )}
          {product.isNew && (
            <Badge className="bg-herbal text-white text-xs">Baru</Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-red-500 text-white text-xs">
              -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 line-clamp-1 font-semibold text-gray-800 group-hover:text-herbal-dark">
          {product.name}
        </h3>
        <p className="mb-2 line-clamp-2 text-xs text-gray-500">
          {product.shortDesc}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-herbal-dark">
            {formatRupiah(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatRupiah(product.originalPrice!)}
            </span>
          )}
        </div>
        <Button
          size="sm"
          className="mt-3 w-full bg-herbal text-white hover:bg-herbal-dark"
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart()
          }}
        >
          Beli Sekarang
        </Button>
      </CardContent>
    </Card>
  )
}
