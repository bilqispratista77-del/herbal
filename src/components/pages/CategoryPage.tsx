'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore, type Product } from '@/store/useStore'
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
import { ShoppingBag, ChevronLeft, Star } from 'lucide-react'
import Link from 'next/link'

export function CategoryPage() {
  const { pageParams, navigateTo, addToCart } = useStore()
  const categorySlug = pageParams.categorySlug || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(categorySlug)}`)
        if (res.ok) {
          const json = await res.json()
          const products = json.data || json.products || []
          setProducts(products)
          // Try to extract category name from first product
          if (products?.[0]?.category?.name) {
            setCategoryName(products[0].category.name)
          } else {
            setCategoryName(categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
          }
        }
      } catch {
        setProducts([])
        setCategoryName(categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
      } finally {
        setLoading(false)
      }
    }
    if (categorySlug) fetchProducts()
  }, [categorySlug])

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
                  onClick={() => navigateTo('shop')}
                >
                  Produk
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">
                  {categoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-4xl font-bold">{categoryName}</h1>
          <p className="text-white/80 mt-2">
            {loading ? '' : `Menampilkan ${products.length} produk`}
          </p>
        </div>
      </section>

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-primary"
          onClick={() => navigateTo('shop')}
        >
          <ChevronLeft className="size-4" />
          Kembali ke Semua Produk
        </Button>
      </div>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-herbal-lighter rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="size-10 text-herbal" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Belum Ada Produk
            </h2>
            <p className="text-muted-foreground mb-6">
              Maaf, belum ada produk dalam kategori ini.
            </p>
            <Button onClick={() => navigateTo('shop')} variant="outline">
              Jelajahi Semua Produk
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                    {product.shortDesc && (
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                        {product.shortDesc}
                      </p>
                    )}
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
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-herbal hover:bg-herbal-dark text-white text-xs"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingBag className="size-3.5" />
                          Beli Sekarang
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  )
}
