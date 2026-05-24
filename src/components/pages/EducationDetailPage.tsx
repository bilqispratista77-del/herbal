'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore, type Article } from '@/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  Calendar,
  ChevronLeft,
  ArrowRight,
  Phone,
  BookOpen,
} from 'lucide-react'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

const categoryBadgeColors: Record<string, string> = {
  'Tips Sehat': 'bg-emerald-100 text-emerald-800',
  'Info Herbal': 'bg-herbal-lighter text-herbal',
  'Gaya Hidup Sehat': 'bg-amber-light text-amber',
}

export function EducationDetailPage() {
  const { pageParams, navigateTo } = useStore()
  const slug = pageParams.slug || ''
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true)
      try {
        const res = await fetch(`/api/articles?slug=${encodeURIComponent(slug)}`)
        if (res.ok) {
          const json = await res.json()
          const a = json.data?.[0] || json.article || json
          setArticle(a)

          // Fetch related articles from same category
          if (a?.category) {
            const relatedRes = await fetch(
              `/api/articles?category=${encodeURIComponent(a.category)}`
            )
            if (relatedRes.ok) {
              const relatedJson = await relatedRes.json()
              const allRelated = relatedJson.data || relatedJson.articles || []
              // Filter out current article, take max 3
              setRelatedArticles(
                allRelated.filter((r: Article) => r.id !== a.id).slice(0, 3)
              )
            }
          }
        }
      } catch {
        setArticle(null)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchArticle()
  }, [slug])

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'd MMMM yyyy', { locale: localeId })
    } catch {
      return dateStr
    }
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Halo, saya tertarik dengan artikel "${article?.title}" di Herbal Nusantara.`
    )
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-4 w-48 mb-4" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-48 mb-8" />
          <Skeleton className="aspect-video w-full rounded-2xl mb-8" />
          <div className="space-y-4 max-w-3xl mx-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="size-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Artikel Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-4">
            Artikel yang Anda cari tidak tersedia.
          </p>
          <Button onClick={() => navigateTo('education')} variant="outline">
            Kembali ke Edukasi
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="container mx-auto px-4 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-pointer"
                onClick={() => navigateTo('home')}
              >
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-pointer"
                onClick={() => navigateTo('education')}
              >
                Edukasi
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium max-w-[200px] sm:max-w-none truncate">
                {article.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-primary mb-6"
          onClick={() => navigateTo('education')}
        >
          <ChevronLeft className="size-4" />
          Kembali ke Edukasi
        </Button>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {article.category && (
            <Badge
              className={`mb-3 ${categoryBadgeColors[article.category] || 'bg-secondary text-secondary-foreground'}`}
            >
              {article.category}
            </Badge>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-4" />
            <span className="text-sm">{formatDate(article.createdAt)}</span>
          </div>
        </motion.div>

        {/* Article Image */}
        {article.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 rounded-2xl overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>
        )}

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none"
        >
          <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed text-base md:text-lg">
            {article.content}
          </div>
        </motion.div>

        {/* Share & WhatsApp */}
        <Separator className="my-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Tertarik dengan informasi ini? Bagikan ke teman Anda!
          </p>
          <Button
            variant="outline"
            className="gap-2 border-green-600 text-green-700 hover:bg-green-50"
            onClick={handleWhatsApp}
          >
            <Phone className="size-4" />
            Tanya via WhatsApp
          </Button>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-herbal-lighter/30 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Card
                  key={related.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigateTo('education-detail', { slug: related.slug })}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={
                        related.image ||
                        `https://placehold.co/400x225/D8F3DC/2D6A4F?text=${encodeURIComponent(related.title.substring(0, 20))}`
                      }
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    {related.category && (
                      <Badge
                        className={`text-xs mb-2 ${categoryBadgeColors[related.category] || 'bg-secondary text-secondary-foreground'}`}
                      >
                        {related.category}
                      </Badge>
                    )}
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-herbal transition-colors">
                      {related.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(related.createdAt)}
                      </span>
                      <ArrowRight className="size-3.5 text-herbal opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
