'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, ShoppingCart, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { useStore, type PageName } from '@/store/useStore'

const navItems: { label: string; page: PageName }[] = [
  { label: 'Beranda', page: 'home' },
  { label: 'Produk', page: 'shop' },
  { label: 'Solusi', page: 'solution' },
  { label: 'Edukasi', page: 'education' },
  { label: 'Tentang Kami', page: 'about' },
  { label: 'Kontak', page: 'contact' },
]

export default function Header() {
  const {
    currentPage,
    navigateTo,
    getCartCount,
    setCartDrawerOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useStore()

  const cartCount = useStore((s) => s.cart.reduce((c, i) => c + i.quantity, 0))
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-herbal">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-herbal-dark sm:text-xl">
              Herbal <span className="text-herbal">Nusantara</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-herbal-lighter text-herbal-dark'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-herbal'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 hover:bg-herbal-lighter hover:text-herbal"
              onClick={() => setCartDrawerOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-white"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72">
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-2 text-herbal-dark">
              <Leaf className="h-5 w-5 text-herbal" />
              Herbal Nusantara
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-herbal-lighter text-herbal-dark'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-herbal'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

        </SheetContent>
      </Sheet>
    </motion.header>
  )
}
