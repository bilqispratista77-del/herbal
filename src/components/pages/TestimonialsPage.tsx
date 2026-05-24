'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore, type Testimonial, type Product } from '@/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
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
  Star,
  Quote,
  MessageCircle,
  Phone,
  MapPin,
} from 'lucide-react'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? 'fill-amber text-amber'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsPage() {
  const { navigateTo, pageParams } = useStore()
  const productId = pageParams.productId
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(productId || null)

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedProduct) {
          params.set('productId', selectedProduct)
        }
        const res = await fetch(`/api/testimonials?${params.toString()}`)
        if (res.ok) {
          const json = await res.json()
          setTestimonials(json.data || json.testimonials || [])
        }
      } catch {
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const json = await res.json()
          setProducts(json.data || json.products || [])
        }
      } catch {
        // ignore
      }
    }

    fetchTestimonials()
    fetchProducts()
  }, [selectedProduct, productId])

  // Calculate average rating
  const avgRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 0

  // Rating distribution
  const ratingDist = Array.from({ length: 5 }, (_, i) => {
    const count = testimonials.filter((t) => t.rating === 5 - i).length
    const pct = testimonials.length > 0 ? (count / testimonials.length) * 100 : 0
    return { stars: 5 - i, count, pct }
  })

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Halo, saya ingin berbagi pengalaman menggunakan produk Herbal Nusantara.'
    )
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
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
                  Testimoni
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-4xl font-bold">Testimoni Pelanggan</h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Dengarkan cerita mereka yang telah merasakan manfaat herbal kami
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 md:py-16">
        {/* Stats Summary */}
        {!loading && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-herbal-lighter/50 rounded-2xl p-6 md:p-8 mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold text-herbal mb-1">
                  {avgRating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(avgRating)} />
                <p className="text-sm text-muted-foreground mt-2">
                  Berdasarkan {testimonials.length} testimoni
                </p>
              </div>
              <div className="space-y-2">
                {ratingDist.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-8 text-right shrink-0">
                      {r.stars}
                    </span>
                    <Star className="size-3 fill-amber text-amber shrink-0" />
                    <div className="flex-1 h-2.5 bg-herbal-lighter rounded-full overflow-hidden">
                      <div
                        className="h-full bg-herbal rounded-full transition-all duration-500"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 shrink-0">
                      {r.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter by Product */}
        {products.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedProduct === null ? 'default' : 'outline'}
                size="sm"
                className={
                  selectedProduct === null
                    ? 'bg-herbal text-white hover:bg-herbal-dark'
                    : 'border-herbal/30 text-herbal hover:bg-herbal-lighter'
                }
                onClick={() => setSelectedProduct(null)}
              >
                Semua Produk
              </Button>
              {products.slice(0, 5).map((product) => (
                <Button
                  key={product.id}
                  variant={selectedProduct === product.id ? 'default' : 'outline'}
                  size="sm"
                  className={
                    selectedProduct === product.id
                      ? 'bg-herbal text-white hover:bg-herbal-dark'
                      : 'border-herbal/30 text-herbal hover:bg-herbal-lighter'
                  }
                  onClick={() => setSelectedProduct(product.id)}
                >
                  {product.name.length > 20
                    ? product.name.substring(0, 20) + '...'
                    : product.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-xl" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-herbal-lighter rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="size-10 text-herbal" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Belum Ada Testimoni</h2>
            <p className="text-muted-foreground">
              Jadilah yang pertama berbagi pengalaman!
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-sm">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="size-8 text-herbal-light mb-3 shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                      {testimonial.content}
                    </p>
                    <StarRating rating={testimonial.rating} />
                    <Separator className="my-4" />
                    <div className="flex items-center gap-3">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-herbal-lighter flex items-center justify-center">
                          <span className="text-herbal font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {testimonial.name}
                        </p>
                        {testimonial.location && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3" />
                            {testimonial.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-herbal-lighter/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="size-10 text-herbal mx-auto mb-3" />
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Ingin berbagi pengalaman?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Kami sangat senang mendengar cerita Anda tentang pengalaman
              menggunakan produk herbal kami.
            </p>
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50 gap-2"
              onClick={handleWhatsApp}
            >
              <Phone className="size-4" />
              Bagikan via WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
