'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  X,
  PackageSearch,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStore, type Product, type Category, type Complaint } from '@/store/useStore'
import { formatRupiah } from '@/lib/format'

const formOptions = [
  { value: 'kapsul', label: 'Kapsul' },
  { value: 'cair', label: 'Cair' },
  { value: 'serbuk', label: 'Serbuk' },
  { value: 'teh', label: 'Teh' },
]

const sortOptions = [
  { value: 'bestseller', label: 'Terlaris' },
  { value: 'new', label: 'Terbaru' },
  { value: 'price_asc', label: 'Harga Terendah' },
  { value: 'price_desc', label: 'Harga Tertinggi' },
]

export default function ShopPage() {
  const {
    navigateTo,
    addToCart,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filterByCategory,
    setFilterByCategory,
    filterByComplaint,
    setFilterByComplaint,
    filterByForm,
    setFilterByForm,
    pageParams,
  } = useStore()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

  // Set initial filter from page params
  useEffect(() => {
    if (pageParams?.category) {
      setFilterByCategory(pageParams.category as string)
    }
  }, [pageParams?.category, setFilterByCategory])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (filterByCategory) params.set('category', filterByCategory)
    if (filterByComplaint) params.set('complaint', filterByComplaint)
    if (filterByForm) params.set('form', filterByForm)
    if (sortBy) params.set('sort', sortBy)

    setLoading(true) // eslint-disable-line react-hooks/set-state-in-effect -- loading before async fetch

    fetch(`/api/products?${params.toString()}`, { signal })
      .then((r) => r.json())
      .then((json) => {
        const items = json.data || json
        if (!signal.aborted) setProducts(Array.isArray(items) ? items : [])
      })
      .catch(() => {
        if (!signal.aborted) setProducts([])
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, filterByCategory, filterByComplaint, filterByForm, sortBy])

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((json) => {
        const items = json.data || json
        setCategories(Array.isArray(items) ? items : [])
      })
      .catch(() => {})
    fetch('/api/complaints')
      .then((r) => r.json())
      .then((json) => {
        const items = json.data || json
        setComplaints(Array.isArray(items) ? items : [])
      })
      .catch(() => {})
  }, [])

  const activeFilterCount =
    (filterByCategory ? 1 : 0) +
    (filterByComplaint ? 1 : 0) +
    (filterByForm ? 1 : 0)

  const resetFilters = () => {
    setSearchQuery('')
    setSortBy('bestseller')
    setFilterByCategory(null)
    setFilterByComplaint(null)
    setFilterByForm(null)
  }

  const filterContent = (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Cari produk..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Separator />

      {/* Category Filter */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Kategori</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={filterByCategory === cat.slug}
                onCheckedChange={(checked) =>
                  setFilterByCategory(checked ? cat.slug : null)
                }
              />
              <span className="text-gray-600">
                {cat.name}{' '}
                <span className="text-gray-400">
                  ({cat._count?.products ?? 0})
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Complaint Filter */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Keluhan</h4>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
          {complaints.map((comp) => (
            <label
              key={comp.id}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={filterByComplaint === comp.slug}
                onCheckedChange={(checked) =>
                  setFilterByComplaint(checked ? comp.slug : null)
                }
              />
              <span className="text-gray-600">{comp.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Form Filter */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">
          Bentuk Produk
        </h4>
        <div className="flex flex-col gap-2">
          {formOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={filterByForm === opt.value}
                onCheckedChange={(checked) =>
                  setFilterByForm(checked ? opt.value : null)
                }
              />
              <span className="text-gray-600">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={resetFilters}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Filter ({activeFilterCount})
          </Button>
        </>
      )}
    </div>
  )

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
            <span className="font-medium text-herbal-dark">Produk</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-herbal-dark sm:text-3xl">
            Semua Produk
          </h1>
          <p className="mt-1 text-gray-500">
            Temukan produk herbal terbaik untuk kesehatan Anda
          </p>
        </div>

        {/* Active Filters Tags */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              className="mb-6 flex flex-wrap items-center gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className="text-sm text-gray-500">Filter aktif:</span>
              {filterByCategory && (
                <Badge
                  variant="secondary"
                  className="gap-1 cursor-pointer"
                  onClick={() => setFilterByCategory(null)}
                >
                  Kategori: {filterByCategory}
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {filterByComplaint && (
                <Badge
                  variant="secondary"
                  className="gap-1 cursor-pointer"
                  onClick={() => setFilterByComplaint(null)}
                >
                  Keluhan: {filterByComplaint}
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {filterByForm && (
                <Badge
                  variant="secondary"
                  className="gap-1 cursor-pointer"
                  onClick={() => setFilterByForm(null)}
                >
                  Bentuk: {filterByForm}
                  <X className="h-3 w-3" />
                </Badge>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold text-herbal-dark flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filter Produk
              </h3>
              {filterContent}
            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {/* Sort + Mobile Filter Toggle */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                  {activeFilterCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
                <span className="text-sm text-gray-500">
                  {products.length} produk ditemukan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-gray-500 sm:inline">
                  Urutkan:
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {mobileFiltersOpen && (
                <motion.div
                  className="mb-6 overflow-hidden rounded-xl border bg-white p-5 lg:hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {filterContent}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
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
            ) : products.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center rounded-xl bg-white p-16 text-center shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-herbal-lighter">
                  <PackageSearch className="h-10 w-10 text-herbal/40" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  Tidak ada produk ditemukan
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  Coba ubah filter atau kata kunci pencarian Anda
                </p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Filter
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Card
                      className="group cursor-pointer overflow-hidden border-none shadow-sm transition-shadow hover:shadow-lg"
                      onClick={() =>
                        navigateTo('product-detail', { slug: product.slug })
                      }
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
                        <div className="absolute left-3 top-3 flex flex-col gap-1">
                          {product.isBestSeller && (
                            <Badge className="bg-amber text-white text-xs">
                              Terlaris
                            </Badge>
                          )}
                          {product.isNew && (
                            <Badge className="bg-herbal text-white text-xs">
                              Baru
                            </Badge>
                          )}
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <Badge className="bg-red-500 text-white text-xs">
                                -
                                {Math.round(
                                  ((product.originalPrice - product.price) /
                                    product.originalPrice) *
                                    100
                                )}
                                %
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
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatRupiah(product.originalPrice)}
                              </span>
                            )}
                        </div>
                        <Button
                          size="sm"
                          className="mt-3 w-full bg-herbal text-white hover:bg-herbal-dark"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product)
                          }}
                        >
                          Beli Sekarang
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
