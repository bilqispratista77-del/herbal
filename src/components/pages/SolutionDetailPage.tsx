'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore, type Complaint, type Product } from '@/store/useStore'
import { formatRupiah } from '@/lib/format'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  ShoppingBag,
  ChevronLeft,
  MessageCircle,
  Leaf,
  Phone,
  Stethoscope,
} from 'lucide-react'

export function SolutionDetailPage() {
  const { pageParams, navigateTo, addToCart } = useStore()
  const slug = pageParams.slug || ''
  const [complaint, setComplaint] = useState<Complaint | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const complaintRes = await fetch(`/api/complaints/${slug}`)
        if (complaintRes.ok) {
          const complaintData = await complaintRes.json()
          const c = complaintData.data || complaintData.complaint || complaintData
          setComplaint(c)

          // Products are already in the complaint data
          if (c?.products) {
            setProducts(c.products)
          }
        }
      } catch {
        setComplaint(null)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchData()
  }, [slug])

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Halo, saya ingin konsultasi mengenai keluhan ${complaint?.name || 'kesehatan'}.`
    )
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <section className="herbal-gradient text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-4 w-48 mb-4 bg-white/20" />
            <Skeleton className="h-10 w-64 bg-white/20 mb-2" />
            <Skeleton className="h-5 w-96 bg-white/20" />
          </div>
        </section>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Stethoscope className="size-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Keluhan Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-4">
            Maaf, data keluhan yang Anda cari tidak tersedia.
          </p>
          <Button onClick={() => navigateTo('solution')} variant="outline">
            Kembali ke Solusi
          </Button>
        </div>
      </div>
    )
  }

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
                <BreadcrumbLink
                  className="text-white/80 hover:text-white cursor-pointer"
                  onClick={() => navigateTo('solution')}
                >
                  Solusi
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">
                  {complaint.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-4xl font-bold">{complaint.name}</h1>
          <p className="text-white/80 mt-2 max-w-3xl">
            {complaint.description}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        {/* Back button */}
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-primary mb-6"
          onClick={() => navigateTo('solution')}
        >
          <ChevronLeft className="size-4" />
          Kembali ke Semua Keluhan
        </Button>

        {/* Education Section */}
        {complaint.education && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-herbal-lighter rounded-2xl p-6 md:p-8 mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-herbal/10 rounded-full flex items-center justify-center">
                <Leaf className="size-5 text-herbal" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-herbal-dark">
                Informasi Kesehatan
              </h2>
            </div>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {complaint.education}
            </div>
          </motion.div>
        )}

        {/* Recommended Products */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Produk Rekomendasi untuk{' '}
            <span className="text-herbal">{complaint.name}</span>
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-herbal-lighter/30 rounded-2xl">
              <ShoppingBag className="size-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Belum ada produk rekomendasi untuk keluhan ini.
              </p>
              <Button variant="outline" onClick={() => navigateTo('shop')}>
                Lihat Semua Produk
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:border-herbal-light h-full">
                    <div
                      className="aspect-square overflow-hidden cursor-pointer relative"
                      onClick={() => navigateTo('product-detail', { slug: product.slug })}
                    >
                      <img
                        src={product.image || `https://placehold.co/400x400/D8F3DC/2D6A4F?text=${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isBestSeller && (
                          <Badge className="bg-amber text-white text-[10px] px-2 py-0.5">
                            Best Seller
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge className="bg-herbal-light text-white text-[10px] px-2 py-0.5">
                            Baru
                          </Badge>
                        )}
                      </div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <Badge className="absolute top-2 right-2 bg-destructive text-white text-[10px] px-2 py-0.5">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      {product.category && (
                        <p className="text-xs text-herbal font-medium mb-1">
                          {product.category.name}
                        </p>
                      )}
                      <h3
                        className="font-semibold text-sm md:text-base leading-tight mb-1 cursor-pointer hover:text-herbal transition-colors line-clamp-2"
                        onClick={() => navigateTo('product-detail', { slug: product.slug })}
                      >
                        {product.name}
                      </h3>
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-herbal font-bold text-base md:text-lg">
                            {formatRupiah(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatRupiah(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="w-full bg-herbal hover:bg-herbal-dark text-white text-xs"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingBag className="size-3.5" />
                          Beli Sekarang
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-herbal-dark text-white rounded-2xl p-8 md:p-12 text-center"
        >
          <MessageCircle className="size-12 mx-auto mb-4 text-herbal-light" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Masih bingung pilih yang mana?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Tim ahli kami siap membantu Anda memilih produk herbal yang paling sesuai
            dengan kebutuhan kesehatan Anda. Konsultasi gratis!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber hover:bg-amber/90 text-white font-semibold"
              onClick={() => navigateTo('contact')}
            >
              <MessageCircle className="size-5" />
              Konsultasi Gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={handleWhatsApp}
            >
              <Phone className="size-5" />
              WhatsApp Kami
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
