'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore, type Article } from '@/store/useStore'
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Calendar, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

const ARTICLE_CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'Tips Sehat', label: 'Tips Sehat' },
  { value: 'Info Herbal', label: 'Info Herbal' },
  { value: 'Gaya Hidup Sehat', label: 'Gaya Hidup Sehat' },
]

const categoryBadgeColors: Record<string, string> = {
  'Tips Sehat': 'bg-emerald-100 text-emerald-800',
  'Info Herbal': 'bg-herbal-lighter text-herbal',
  'Gaya Hidup Sehat': 'bg-amber-light text-amber',
}

export function EducationPage() {
  const { navigateTo } = useStore()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      try {
        const params = activeCategory !== 'all' ? `?category=${encodeURIComponent(activeCategory)}` : ''
        const res = await fetch(`/api/articles${params}`)
        if (res.ok) {
          const json = await res.json()
          setArticles(json.data || json.articles || [])
        }
      } catch {
        setArticles([])
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [activeCategory])

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'd MMMM yyyy', { locale: localeId })
    } catch {
      return dateStr
    }
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
                <BreadcrumbPage className="text-white font-medium">
                  Edukasi Herbal
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-4xl font-bold">Edukasi Herbal</h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Pelajari lebih lanjut tentang manfaat herbal dan gaya hidup sehat
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-4 py-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex flex-wrap h-auto gap-2 bg-herbal-lighter/50 p-1">
            {ARTICLE_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="data-[state=active]:bg-herbal data-[state=active]:text-white text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-herbal-lighter rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="size-10 text-herbal" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Belum Ada Artikel</h2>
            <p className="text-muted-foreground">
              {activeCategory !== 'all'
                ? 'Belum ada artikel dalam kategori ini.'
                : 'Artikel edukasi akan segera tersedia.'}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Card
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
                  onClick={() => navigateTo('education-detail', { slug: article.slug })}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={
                        article.image ||
                        `https://placehold.co/600x340/D8F3DC/2D6A4F?text=${encodeURIComponent(article.title.substring(0, 30))}`
                      }
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-5">
                    {article.category && (
                      <Badge
                        className={`text-xs mb-2 ${categoryBadgeColors[article.category] || 'bg-secondary text-secondary-foreground'}`}
                      >
                        {article.category}
                      </Badge>
                    )}
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-herbal transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="size-3.5" />
                        {formatDate(article.createdAt)}
                      </div>
                      <span className="text-herbal text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Baca
                        <ArrowRight className="size-3.5" />
                      </span>
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
