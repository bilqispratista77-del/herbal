'use client'

import { useEffect, useState } from 'react'
import { Leaf, Phone, Mail, MapPin } from 'lucide-react'
import { useStore, type Category, type PageName } from '@/store/useStore'
import { Separator } from '@/components/ui/separator'

const quickLinks: { label: string; page: PageName }[] = [
  { label: 'Beranda', page: 'home' },
  { label: 'Produk', page: 'shop' },
  { label: 'Solusi', page: 'solution' },
  { label: 'Edukasi', page: 'education' },
  { label: 'Tentang Kami', page: 'about' },
  { label: 'Testimoni', page: 'testimonials' },
  { label: 'Kontak', page: 'contact' },
]

const legalLinks: { label: string; page: PageName }[] = [
  { label: 'Kebijakan Privasi', page: 'privacy' },
  { label: 'Syarat & Ketentuan', page: 'terms' },
  { label: 'Disclaimer Kesehatan', page: 'disclaimer' },
]

const defaultCategories = [
  'Herbal Pencernaan',
  'Herbal Stamina',
  'Herbal Imunitas',
  'Herbal Tidur',
  'Herbal Kulit',
  'Herbal Rematik',
]

export default function Footer() {
  const { navigateTo } = useStore()
  const [categories, setCategories] = useState<string[]>(defaultCategories)

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data.slice(0, 6).map((c: Category) => c.name))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="mt-auto bg-herbal-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-herbal-light">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                Herbal <span className="text-herbal-light">Nusantara</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              Menyediakan produk herbal alami berkualitas tinggi dari Nusantara.
              Terdaftar BPOM, 100% bahan alami untuk menjaga kesehatan Anda dan keluarga.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-herbal-light">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      navigateTo(link.page)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-herbal-light">
              Kategori
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigateTo('shop', { category: cat })}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-herbal-light">
              Hubungi Kami
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-herbal-light" />
                <div>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    +62 812-3456-7890
                  </a>
                  <p className="text-xs text-gray-400">WhatsApp (Senin-Sabtu)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-herbal-light" />
                <a
                  href="mailto:info@herbalnusantara.id"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  info@herbalnusantara.id
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-herbal-light" />
                <span className="text-sm text-gray-300">
                  Jakarta, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-herbal/30" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Herbal Nusantara. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((link, idx) => (
              <span key={link.page} className="flex items-center gap-4">
                <button
                  onClick={() => navigateTo(link.page)}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </button>
                {idx < legalLinks.length - 1 && (
                  <span className="hidden text-gray-600 sm:inline">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
