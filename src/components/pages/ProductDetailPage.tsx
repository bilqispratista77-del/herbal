'use client'

import { useEffect, useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  ShoppingCart,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useStore, type Product, type Testimonial } from '@/store/useStore'
import { formatRupiah } from '@/lib/format'

export default function ProductDetailPage() {
  const { pageParams, navigateTo, addToCart, goBack } = useStore()
  const slug = pageParams?.slug

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [, startTransition] = useTransition()

  useEffect(() => {
    if (!slug) return
    startTransition(() => {
      setLoading(true)
      setQuantity(1)
    })

    Promise.allSettled([
      fetch(`/api/products/${slug}`).then((r) => r.json()),
      fetch(`/api/testimonials?productId=${slug}`).then((r) => r.json()),
    ]).then(([prodRes, testRes]) => {
      if (prodRes.status === 'fulfilled' && prodRes.value && !prodRes.value.error) {
        const p = (prodRes.value.data || prodRes.value) as Product
        setProduct(p)
        // Fetch related products by category
        if (p.categoryId) {
          fetch(`/api/products?category=${p.categoryId}&sort=bestseller`)
            .then((r) => r.json())
            .then((json) => {
              const items = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : []
              const related = items.filter(
                (rp: Product) => rp.id !== p.id
              )
              setRelatedProducts(related.slice(0, 4))
            })
            .catch(() => {})
        }
      }
      if (testRes.status === 'fulfilled') {
        const items = testRes.value?.data
        setTestimonials(Array.isArray(items) ? items : [])
      }
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="mb-6 h-5 w-48" />
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h2 className="mb-2 text-xl font-bold text-gray-700">
            Produk Tidak Ditemukan
          </h2>
          <p className="mb-6 text-gray-500">
            Produk yang Anda cari tidak tersedia
          </p>
          <Button
            className="bg-herbal hover:bg-herbal-dark"
            onClick={() => navigateTo('shop')}
          >
            Kembali ke Produk
          </Button>
        </div>
      </div>
    )
  }

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price
  const allTestimonials =
    testimonials.length > 0
      ? testimonials
      : product.testimonials || []

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigateTo('checkout')
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-herbal-lighter/40">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-herbal"
            >
              Beranda
            </button>
            <span>/</span>
            <button
              onClick={() => navigateTo('shop')}
              className="hover:text-herbal"
            >
              Produk
            </button>
            <span>/</span>
            <span className="font-medium text-herbal-dark line-clamp-1">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-gray-500 hover:text-herbal"
          onClick={goBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        {/* Product Main Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            className="overflow-hidden rounded-xl bg-white shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-square">
              <img
                src={
                  product.image ||
                  `https://placehold.co/600x600/D8F3DC/2D6A4F?text=${encodeURIComponent(product.name.slice(0, 15))}`
                }
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Badges */}
            <div className="mb-3 flex flex-wrap gap-2">
              {product.isBestSeller && (
                <Badge className="bg-amber text-white">Terlaris</Badge>
              )}
              {product.isNew && (
                <Badge className="bg-herbal text-white">Baru</Badge>
              )}
              {product.category && (
                <Badge variant="secondary">{product.category.name}</Badge>
              )}
            </div>

            {/* Name */}
            <h1 className="mb-2 text-2xl font-bold text-herbal-dark sm:text-3xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-herbal-dark">
                {formatRupiah(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {formatRupiah(product.originalPrice!)}
                </span>
              )}
              {hasDiscount && (
                <Badge className="bg-red-500 text-white">
                  Hemat{' '}
                  {Math.round(
                    ((product.originalPrice! - product.price) /
                      product.originalPrice!) *
                      100
                  )}
                  %
                </Badge>
              )}
            </div>

            {/* Short Description */}
            <p className="mb-6 text-gray-600 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Complaints tags */}
            {product.complaints && product.complaints.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Cocok untuk:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.complaints.map((pc) => (
                    <Badge key={pc.complaint.id} variant="outline" className="text-herbal border-herbal/30">
                      {pc.complaint.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator className="mb-6" />

            {/* Quantity */}
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-gray-700">Jumlah</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 bg-herbal text-white hover:bg-herbal-dark"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Beli Sekarang
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-herbal text-herbal hover:bg-herbal-lighter"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Tambah ke Keranjang
              </Button>
            </div>

            <Button
              size="lg"
              className="mt-3 w-full bg-green-500 text-white hover:bg-green-600 sm:w-auto"
              asChild
            >
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya tertarik dengan produk ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat WhatsApp
              </a>
            </Button>

            {/* Trust */}
            <div className="mt-6 flex items-center gap-3 rounded-lg bg-herbal-lighter/60 p-3">
              <ShieldCheck className="h-5 w-5 text-herbal" />
              <span className="text-sm text-gray-600">
                Produk terdaftar BPOM & dijamin keasliannya
              </span>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Tabs defaultValue="deskripsi" className="w-full">
            <TabsList className="mb-6 flex w-full flex-wrap justify-start bg-white">
              <TabsTrigger value="deskripsi">Deskripsi Produk</TabsTrigger>
              <TabsTrigger value="komposisi">Komposisi</TabsTrigger>
              <TabsTrigger value="penggunaan">Cara Penggunaan</TabsTrigger>
              <TabsTrigger value="izin">Izin Edar</TabsTrigger>
              <TabsTrigger value="testimoni">Testimoni</TabsTrigger>
              {product.faqs && product.faqs.length > 0 && (
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="deskripsi">
              <Card>
                <CardContent className="p-6">
                  <div
                    className="prose prose-sm max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: product.description?.replace(/\n/g, '<br/>') || 'Tidak ada deskripsi.',
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="komposisi">
              <Card>
                <CardContent className="p-6">
                  {product.composition ? (
                    <div
                      className="prose prose-sm max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: product.composition.replace(/\n/g, '<br/>'),
                      }}
                    />
                  ) : (
                    <p className="text-gray-500">
                      Informasi komposisi belum tersedia
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="penggunaan">
              <Card>
                <CardContent className="p-6">
                  {product.dosage ? (
                    <div
                      className="prose prose-sm max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: product.dosage.replace(/\n/g, '<br/>'),
                      }}
                    />
                  ) : (
                    <p className="text-gray-500">
                      Informasi cara penggunaan belum tersedia
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="izin">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    {product.bpomNumber && (
                      <div className="flex items-center gap-3 rounded-lg bg-herbal-lighter/60 p-4">
                        <ShieldCheck className="h-6 w-6 text-herbal" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Nomor BPOM
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            {product.bpomNumber}
                          </Badge>
                        </div>
                      </div>
                    )}
                    {product.pirtNumber && (
                      <div className="flex items-center gap-3 rounded-lg bg-amber-light p-4">
                        <ShieldCheck className="h-6 w-6 text-amber" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Nomor PIRT
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            {product.pirtNumber}
                          </Badge>
                        </div>
                      </div>
                    )}
                    {!product.bpomNumber && !product.pirtNumber && (
                      <p className="text-gray-500">
                        Informasi izin edar belum tersedia
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testimoni">
              <Card>
                <CardContent className="p-6">
                  {allTestimonials.length === 0 ? (
                    <div className="py-8 text-center">
                      <Star className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                      <p className="text-gray-500">
                        Belum ada testimoni untuk produk ini
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {allTestimonials.map((t) => (
                        <div
                          key={t.id}
                          className="rounded-lg border p-4"
                        >
                          <div className="mb-2 flex gap-1">
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
                          <p className="mb-3 text-sm italic text-gray-600">
                            &ldquo;{t.content}&rdquo;
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-herbal-lighter text-xs font-bold text-herbal">
                              {t.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {t.name}
                              </p>
                              {t.location && (
                                <p className="text-xs text-gray-400">
                                  {t.location}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {product.faqs && product.faqs.length > 0 && (
              <TabsContent value="faq">
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {product.faqs
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((faq, idx) => (
                          <AccordionItem key={faq.id} value={`faq-${idx}`}>
                            <AccordionTrigger className="text-left text-sm font-medium text-gray-700">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-gray-600">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-xl font-bold text-herbal-dark">
              Produk Terkait
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {relatedProducts.map((rp) => (
                <Card
                  key={rp.id}
                  className="group cursor-pointer overflow-hidden border-none shadow-sm transition-shadow hover:shadow-md"
                  onClick={() =>
                    navigateTo('product-detail', { slug: rp.slug })
                  }
                >
                  <div className="aspect-square overflow-hidden bg-herbal-lighter">
                    <img
                      src={
                        rp.image ||
                        `https://placehold.co/300x300/D8F3DC/2D6A4F?text=${encodeURIComponent(rp.name.slice(0, 8))}`
                      }
                      alt={rp.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="line-clamp-1 text-sm font-semibold text-gray-700 group-hover:text-herbal-dark">
                      {rp.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-herbal-dark">
                      {formatRupiah(rp.price)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Health Disclaimer */}
        <div className="mt-12 rounded-xl border border-amber/30 bg-amber-light p-6">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Disclaimer Kesehatan
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Produk herbal ini bukan pengganti obat dokter. Konsultasikan
                dengan tenaga medis sebelum penggunaan. Hasil dapat bervariasi
                pada setiap individu. Hentikan penggunaan jika terjadi efek
                samping yang tidak diinginkan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
